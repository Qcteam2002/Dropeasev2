import { json } from "@remix-run/node";
import { authenticate, getUser } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const action = async ({ request, params }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);
    const productId = params.id;

    if (!user || !productId) {
      return json({ error: "Missing user or product ID" }, { status: 400 });
    }

    // Get product from database
    const dbProduct = await prisma.platformProduct.findFirst({
      where: {
        id: BigInt(productId),
        userId: user.id,
      },
    });

    if (!dbProduct) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    // Fetch fresh data from Shopify
    const query = `
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          title
          handle
          descriptionHtml
          vendor
          productType
          tags
          status
          publishedAt
          onlineStoreUrl
          featuredImage {
            id
            url
            altText
            width
            height
          }
          images(first: 20) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          media(first: 20) {
            edges {
              node {
                ... on MediaImage {
                  id
                  image {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
                ... on Video {
                  id
                  sources {
                    url
                    mimeType
                  }
                }
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
                sku
                inventoryQuantity
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `;

    // Fix potential duplicate GID issue
    const shopifyProductId = dbProduct.platformId.includes('gid://shopify/Product/') 
      ? dbProduct.platformId 
      : `gid://shopify/Product/${dbProduct.platformId}`;

    console.log("🔄 Re-syncing product:", shopifyProductId);

    const response = await admin.graphql(query, {
      variables: { id: shopifyProductId }
    });

    const { data, errors } = await response.json();

    if (errors) {
      console.error("GraphQL errors:", errors);
      return json({ error: "Failed to fetch from Shopify", details: errors }, { status: 500 });
    }

    if (!data?.product) {
      return json({ error: "Product not found in Shopify" }, { status: 404 });
    }

    const shopifyProduct = data.product;

    // Prepare updated data
    const updateData = {
      title: shopifyProduct.title,
      handle: shopifyProduct.handle,
      descriptionHtml: shopifyProduct.descriptionHtml || "",
      featuredMedia: shopifyProduct.featuredImage?.url || null,
      vendor: shopifyProduct.vendor || null,
      productType: shopifyProduct.productType || null,
      tags: shopifyProduct.tags?.join(', ') || null,
      status: shopifyProduct.status || "DRAFT",
      publishedAt: shopifyProduct.publishedAt ? new Date(shopifyProduct.publishedAt) : null,
      onlineStoreUrl: shopifyProduct.onlineStoreUrl || null,
      images: shopifyProduct.images?.edges?.map(edge => ({
        id: edge.node.id,
        url: edge.node.url,
        altText: edge.node.altText || "",
        width: edge.node.width,
        height: edge.node.height,
      })) || [],
      media: shopifyProduct.media?.edges?.map(edge => ({
        id: edge.node.id,
        type: edge.node.__typename,
        url: edge.node.image?.url || edge.node.sources?.[0]?.url,
        altText: edge.node.image?.altText || ""
      })) || [],
      variants: shopifyProduct.variants?.edges?.map(edge => ({
        id: edge.node.id,
        title: edge.node.title,
        price: parseFloat(edge.node.price),
        compareAtPrice: edge.node.compareAtPrice ? parseFloat(edge.node.compareAtPrice) : null,
        sku: edge.node.sku,
        inventoryQuantity: edge.node.inventoryQuantity || 0,
        availableForSale: edge.node.availableForSale,
        selectedOptions: edge.node.selectedOptions
      })) || [],
    };

    // Update product in database
    await prisma.platformProduct.update({
      where: { id: BigInt(productId) },
      data: updateData,
    });

    console.log("✅ Product re-synced successfully");
    console.log("📸 New images count:", updateData.images.length);

    return json({ 
      success: true, 
      message: `Product re-synced successfully. Found ${updateData.images.length} images.`,
      imagesCount: updateData.images.length,
      images: updateData.images
    });

  } catch (error) {
    console.error("Error re-syncing product:", error);
    return json({ error: error.message }, { status: 500 });
  }
};
