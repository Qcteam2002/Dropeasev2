import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const productUrl = url.searchParams.get('url');
    
    if (!productUrl) {
      return json({ 
        success: false, 
        error: "Product URL is required" 
      }, { status: 400 });
    }

    // Extract product handle from URL
    const urlParts = productUrl.split('/');
    const productHandle = urlParts[urlParts.length - 1];
    
    if (!productHandle) {
      return json({ 
        success: false, 
        error: "Could not extract product handle from URL" 
      }, { status: 400 });
    }

    // Get shop domain from URL
    const shopDomain = urlParts[2]; // e.g., "tatetsdropeaseapr1.myshopify.com"
    
    // Use Shopify Storefront API to get product images
    const query = `
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          images(first: 20) {
            nodes {
              id
              url
              altText
              width
              height
            }
          }
          media(first: 20) {
            nodes {
              id
              alt
              mediaContentType
              preview {
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    `;

    // Try to get storefront access token from environment or use a default
    const storefrontToken = process.env.STOREFRONT_ACCESS_TOKEN || 'your-storefront-token';
    
    const response = await fetch(`https://${shopDomain}/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({
        query,
        variables: { handle: productHandle }
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return json({ 
        success: false, 
        error: "Failed to fetch product data: " + result.errors[0].message 
      }, { status: 500 });
    }

    const product = result.data?.product;
    if (!product) {
      return json({ 
        success: false, 
        error: "Product not found" 
      }, { status: 404 });
    }

    // Combine images and media
    const allImages = [];
    
    // Add regular images
    if (product.images?.nodes) {
      product.images.nodes.forEach(img => {
        allImages.push({
          id: img.id,
          url: img.url,
          altText: img.altText,
          width: img.width,
          height: img.height,
          type: 'image'
        });
      });
    }

    // Add media images
    if (product.media?.nodes) {
      product.media.nodes.forEach(media => {
        if (media.mediaContentType === 'IMAGE' && media.preview?.image) {
          allImages.push({
            id: media.id,
            url: media.preview.image.url,
            altText: media.alt || media.preview.image.altText,
            width: media.preview.image.width,
            height: media.preview.image.height,
            type: 'media'
          });
        }
      });
    }

    // Remove duplicates based on URL
    const uniqueImages = allImages.filter((img, index, self) => 
      index === self.findIndex(i => i.url === img.url)
    );

    return json({
      success: true,
      product: {
        id: product.id,
        title: product.title,
        handle: product.handle
      },
      images: uniqueImages
    });

  } catch (error) {
    console.error('Error fetching product images:', error);
    return json({ 
      success: false, 
      error: "Internal server error: " + error.message 
    }, { status: 500 });
  }
};
