import { json } from "@remix-run/node";
import { authenticate, getUser } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ API để sync products từ Shopify store
export const action = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);

    if (!user) {
      return json({ error: "User not found" }, { status: 400 });
    }

    // GraphQL query để lấy products từ Shopify
    const query = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
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
                url
                altText
              }
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              media(first: 10) {
                edges {
                  node {
                    ... on MediaImage {
                      id
                      image {
                        url
                        altText
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
              options {
                id
                name
                values
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
              collections(first: 10) {
                edges {
                  node {
                    id
                    title
                    handle
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    // Fetch products từ Shopify (lấy 50 products đầu tiên)
    const response = await admin.graphql(query, {
      variables: { first: 50 }
    });

    const { data } = await response.json();

    if (!data?.products?.edges) {
      return json({ error: "No products found" }, { status: 404 });
    }

    const products = data.products.edges;
    let syncedCount = 0;
    let errors = [];

    // Sync từng product vào database
    for (const { node: product } of products) {
      try {
        // Extract product ID từ GraphQL ID
        const platformId = product.id.split('/').pop();
        
        // Prepare data
        const productData = {
          platformId,
          userId: user.id,
          title: product.title,
          handle: product.handle,
          descriptionHtml: product.descriptionHtml || "",
          featuredMedia: product.featuredImage?.url || null,
          vendor: product.vendor || null,
          productType: product.productType || null,
          tags: product.tags?.join(', ') || null,
          status: product.status || "DRAFT",
          publishedAt: product.publishedAt ? new Date(product.publishedAt) : null,
          onlineStoreUrl: product.onlineStoreUrl || null,
          images: product.images?.edges?.map(edge => ({
            url: edge.node.url,
            altText: edge.node.altText
          })) || [],
          media: product.media?.edges?.map(edge => ({
            id: edge.node.id,
            type: edge.node.__typename,
            url: edge.node.image?.url || edge.node.sources?.[0]?.url,
            altText: edge.node.image?.altText
          })) || [],
          options: product.options || [],
          variants: product.variants?.edges?.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            price: parseFloat(edge.node.price),
            compareAtPrice: edge.node.compareAtPrice ? parseFloat(edge.node.compareAtPrice) : null,
            sku: edge.node.sku,
            inventoryQuantity: edge.node.inventoryQuantity || 0,
            availableForSale: edge.node.availableForSale,
            selectedOptions: edge.node.selectedOptions
          })) || [],
          collections: product.collections?.edges?.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            handle: edge.node.handle
          })) || []
        };

        // Upsert product vào database
        await prisma.platformProduct.upsert({
          where: {
            userId_platformId: {
              userId: user.id,
              platformId: platformId
            }
          },
          update: productData,
          create: productData
        });

        syncedCount++;
      } catch (error) {
        console.error(`Error syncing product ${product.id}:`, error);
        errors.push({
          productId: product.id,
          title: product.title,
          error: error.message
        });
      }
    }

    return json({
      success: true,
      message: `Successfully synced ${syncedCount} products`,
      syncedCount,
      totalProducts: products.length,
      errors: errors.length > 0 ? errors : undefined,
      hasNextPage: data.products.pageInfo.hasNextPage
    });

  } catch (error) {
    console.error("Sync products error:", error);
    return json({ 
      error: "Failed to sync products", 
      details: error.message 
    }, { status: 500 });
  }
};
