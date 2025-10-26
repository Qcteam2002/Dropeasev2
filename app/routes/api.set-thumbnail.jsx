import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const action = async ({ request }) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    
    const formData = await request.formData();
    const productId = formData.get('productId');
    const thumbnailUrl = formData.get('thumbnailUrl');
    const variantId = formData.get('variantId');

    console.log('🖼️ Setting thumbnail:', {
      productId,
      thumbnailUrl: thumbnailUrl?.substring(0, 50) + '...',
      variantId
    });

    // Get product from database
    const product = await prisma.platformProduct.findUnique({
      where: { id: BigInt(productId) }
    });

    if (!product) {
      throw new Error(`Product not found: ${productId}`);
    }

    // Prepare the Shopify product GID
    const productGid = product.platformId.startsWith('gid://') 
      ? product.platformId 
      : `gid://shopify/Product/${product.platformId}`;

    console.log('📦 Product GID:', productGid);

    // For MVP, we'll update the featured image in Shopify
    // In production, you would:
    // 1. Upload the generated image to Shopify
    // 2. Set it as the product's featured image
    
    // TODO: Implement actual image upload to Shopify
    /*
    // Step 1: Upload image to Shopify
    const uploadMutation = `
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters {
              name
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const uploadResponse = await admin.graphql(uploadMutation, {
      variables: {
        input: [{
          resource: "IMAGE",
          filename: `thumbnail-${variantId}.jpg`,
          mimeType: "image/jpeg",
          httpMethod: "POST"
        }]
      }
    });

    const uploadData = await uploadResponse.json();
    
    // Step 2: Create product image
    const createImageMutation = `
      mutation productCreateMedia($media: [CreateMediaInput!]!, $productId: ID!) {
        productCreateMedia(media: $media, productId: $productId) {
          media {
            id
            alt
            ... on MediaImage {
              image {
                url
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const createImageResponse = await admin.graphql(createImageMutation, {
      variables: {
        productId: productGid,
        media: [{
          originalSource: thumbnailUrl,
          alt: product.title,
          mediaContentType: "IMAGE"
        }]
      }
    });
    */

    // For now, just save the thumbnail URL to the database
    await prisma.productsOptimized.upsert({
      where: { productId: BigInt(productId) },
      update: {
        optimizedThumbnail: thumbnailUrl,
        optimizedThumbnailVariantId: variantId,
        updatedAt: new Date(),
      },
      create: {
        productId: BigInt(productId),
        optimizedThumbnail: thumbnailUrl,
        optimizedThumbnailVariantId: variantId,
        optimizedTitle: '',
        optimizedDescription: '',
        gridView: {},
      },
    });

    console.log('✅ Thumbnail saved to database');

    return json({
      success: true,
      message: 'Thumbnail updated successfully',
      data: {
        productId: productId,
        thumbnailUrl: thumbnailUrl,
      },
    });

  } catch (error) {
    console.error('❌ Error setting thumbnail:', error);
    return json(
      {
        success: false,
        error: error.message || 'Failed to set thumbnail',
      },
      { status: 500 }
    );
  }
};

export const loader = async () => {
  return json(
    { error: "Method not allowed" },
    { status: 405 }
  );
};


