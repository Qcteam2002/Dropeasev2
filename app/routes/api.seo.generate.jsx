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

    // Get product data from Shopify
    const query = `
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          title
          descriptionHtml
          handle
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
      return json({ error: "Failed to fetch product data" }, { status: 500 });
    }

    const product = data?.product;
    if (!product) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    // Generate SEO suggestions based on settings
    const suggestions = generateSEOSuggestions(product, settings);
    
    return json({ 
      success: true, 
      suggestions,
      product: {
        title: product.title,
        description: product.descriptionHtml?.replace(/<[^>]*>/g, '') || '',
        handle: product.handle
      }
    });

  } catch (error) {
    console.error("SEO generation error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};

const generateSEOSuggestions = (product, settings) => {
  const { primaryKeyword, tone, targetMarket, optionalKeywords } = settings;
  const baseTitle = product.title;
  const baseDesc = product.descriptionHtml?.replace(/<[^>]*>/g, '') || '';
  
  const suggestions = [];
  const keywords = optionalKeywords ? optionalKeywords.split(',').map(k => k.trim()) : [];

  // Generate 3 different suggestions based on tone
  switch (tone) {
    case 'friendly':
      suggestions.push(
        {
          id: 1,
          title: `${baseTitle} - Best ${primaryKeyword} | Free Shipping & Great Reviews!`,
          description: `Discover the perfect ${primaryKeyword} with our ${baseTitle}. High-quality, affordable, and loved by customers. Free shipping available! ${keywords.join(', ')}`
        },
        {
          id: 2,
          title: `Amazing ${baseTitle} - Top Rated ${primaryKeyword} for Everyone`,
          description: `Get the best ${primaryKeyword} experience with our ${baseTitle}. Easy to use, reliable, and backed by our satisfaction guarantee.`
        },
        {
          id: 3,
          title: `${baseTitle} - Your Perfect ${primaryKeyword} Solution`,
          description: `Transform your ${primaryKeyword} game with our premium ${baseTitle}. Quality you can trust, price you'll love.`
        }
      );
      break;
    case 'professional':
      suggestions.push(
        {
          id: 1,
          title: `Professional ${baseTitle} - Industry Leading ${primaryKeyword}`,
          description: `Enterprise-grade ${primaryKeyword} solution. Our ${baseTitle} delivers professional results with advanced features and reliable performance.`
        },
        {
          id: 2,
          title: `${baseTitle} - Professional ${primaryKeyword} for Business`,
          description: `Optimize your ${primaryKeyword} workflow with our professional ${baseTitle}. Built for efficiency and reliability.`
        },
        {
          id: 3,
          title: `Advanced ${baseTitle} - Professional ${primaryKeyword} Tools`,
          description: `Professional ${primaryKeyword} solution featuring our ${baseTitle}. Designed for experts who demand quality and performance.`
        }
      );
      break;
    case 'luxury':
      suggestions.push(
        {
          id: 1,
          title: `Premium ${baseTitle} - Luxury ${primaryKeyword} Collection`,
          description: `Indulge in the finest ${primaryKeyword} experience with our exclusive ${baseTitle}. Crafted with premium materials and attention to detail.`
        },
        {
          id: 2,
          title: `${baseTitle} - Exquisite ${primaryKeyword} for Discerning Taste`,
          description: `Elevate your ${primaryKeyword} with our luxury ${baseTitle}. Sophisticated design meets uncompromising quality.`
        },
        {
          id: 3,
          title: `Elite ${baseTitle} - Premium ${primaryKeyword} Experience`,
          description: `Experience the pinnacle of ${primaryKeyword} luxury with our ${baseTitle}. Where elegance meets exceptional performance.`
        }
      );
      break;
    case 'minimal':
      suggestions.push(
        {
          id: 1,
          title: `${baseTitle} - ${primaryKeyword}`,
          description: `${baseTitle}. ${primaryKeyword}. Quality design.`
        },
        {
          id: 2,
          title: `${baseTitle} - Clean ${primaryKeyword} Design`,
          description: `Minimalist ${primaryKeyword} solution. ${baseTitle} delivers essential functionality with elegant simplicity.`
        },
        {
          id: 3,
          title: `${baseTitle} - Simple ${primaryKeyword}`,
          description: `Essential ${primaryKeyword} features in a clean, simple design. ${baseTitle}.`
        }
      );
      break;
    case 'technical':
      suggestions.push(
        {
          id: 1,
          title: `${baseTitle} - Technical ${primaryKeyword} Specifications`,
          description: `Advanced ${primaryKeyword} technology. Our ${baseTitle} features cutting-edge specifications and professional-grade performance.`
        },
        {
          id: 2,
          title: `${baseTitle} - Expert ${primaryKeyword} Solution`,
          description: `Technical ${primaryKeyword} implementation with ${baseTitle}. Professional specifications and advanced features.`
        },
        {
          id: 3,
          title: `${baseTitle} - Professional ${primaryKeyword} Technology`,
          description: `High-performance ${primaryKeyword} solution. ${baseTitle} delivers technical excellence and reliability.`
        }
      );
      break;
    case 'playful':
      suggestions.push(
        {
          id: 1,
          title: `${baseTitle} - Fun ${primaryKeyword} for Everyone! 😊`,
          description: `Get ready for some awesome ${primaryKeyword} fun with our ${baseTitle}! Super easy to use and totally amazing! 🎉`
        },
        {
          id: 2,
          title: `Awesome ${baseTitle} - Cool ${primaryKeyword} Vibes`,
          description: `Dive into the coolest ${primaryKeyword} experience with our ${baseTitle}! You're gonna love it! ✨`
        },
        {
          id: 3,
          title: `${baseTitle} - Epic ${primaryKeyword} Adventure`,
          description: `Join the ${primaryKeyword} adventure with our amazing ${baseTitle}! Fun, exciting, and totally worth it! 🚀`
        }
      );
      break;
    default:
      suggestions.push(
        {
          id: 1,
          title: `${baseTitle} - Quality ${primaryKeyword}`,
          description: `High-quality ${primaryKeyword} solution. Our ${baseTitle} provides reliable performance and great value.`
        }
      );
  }

  return suggestions;
};
