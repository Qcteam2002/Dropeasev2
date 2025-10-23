import { json } from "@remix-run/node";
import { authenticate, getUser } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);
    
    if (!user) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const productId = formData.get("productId");
    const settings = JSON.parse(formData.get("settings") || "{}");
    
    if (!productId) {
      return json({ error: "Product ID is required" }, { status: 400 });
    }

    // Get product images from Shopify
    const query = `
      query getProductImages($id: ID!) {
        product(id: $id) {
          id
          title
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
        }
      }
    `;

    const shopifyProductId = productId.includes('gid://shopify/Product/') 
      ? productId 
      : `gid://shopify/Product/${productId}`;

    const response = await admin.graphql(query, {
      variables: { id: shopifyProductId }
    });

    const { data, errors } = await response.json();
    
    if (errors) {
      console.error("GraphQL errors:", errors);
      return json({ error: "Failed to fetch product images" }, { status: 500 });
    }

    const product = data?.product;
    if (!product) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    const images = product.images?.edges?.map(edge => edge.node) || [];
    
    // Generate alt text suggestions for each image
    const altTexts = generateAltTextSuggestions(product, images, settings);
    
    return json({ 
      success: true, 
      altTexts,
      totalImages: images.length
    });

  } catch (error) {
    console.error("Alt text generation error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};

const generateAltTextSuggestions = (product, images, settings) => {
  const { primaryKeyword, tone, optionalKeywords } = settings;
  const productTitle = product.title;
  const keywords = optionalKeywords ? optionalKeywords.split(',').map(k => k.trim()) : [];
  
  const altTexts = {};
  
  images.forEach((img, index) => {
    let altText = '';
    
    switch (tone) {
      case 'friendly':
        altText = `${productTitle} - ${primaryKeyword} product image ${index + 1}`;
        if (keywords.length > 0) {
          altText += ` featuring ${keywords.slice(0, 2).join(' and ')}`;
        }
        break;
      case 'professional':
        altText = `Professional ${primaryKeyword} - ${productTitle} product view ${index + 1}`;
        if (keywords.length > 0) {
          altText += ` with ${keywords[0]} features`;
        }
        break;
      case 'luxury':
        altText = `Premium ${primaryKeyword} - ${productTitle} luxury product ${index + 1}`;
        if (keywords.length > 0) {
          altText += ` showcasing ${keywords[0]}`;
        }
        break;
      case 'minimal':
        altText = `${productTitle} ${primaryKeyword}`;
        break;
      case 'technical':
        altText = `${productTitle} - ${primaryKeyword} technical specifications image ${index + 1}`;
        if (keywords.length > 0) {
          altText += ` showing ${keywords[0]} details`;
        }
        break;
      case 'playful':
        altText = `Fun ${primaryKeyword} - ${productTitle} awesome product ${index + 1}`;
        if (keywords.length > 0) {
          altText += ` with cool ${keywords[0]} features`;
        }
        break;
      default:
        altText = `${productTitle} - ${primaryKeyword} image ${index + 1}`;
        if (keywords.length > 0) {
          altText += ` featuring ${keywords[0]}`;
        }
    }
    
    altTexts[img.id] = altText;
  });
  
  return altTexts;
};
