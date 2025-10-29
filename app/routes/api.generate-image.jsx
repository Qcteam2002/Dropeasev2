import { json } from "@remix-run/node";

const API_BASE_URL = 'http://localhost:3001';

// Support GET request for testing
export async function loader() {
  return json({
    message: "This endpoint requires POST request",
    usage: "POST /api/generate-image with JSON body",
    requiredFields: ["productTitle", "productImages"],
    optionalFields: ["language", "market", "segmentation", "keywords", "persona", "painpoints", "tone"]
  });
}

export async function action({ request }) {
  try {
    const requestData = await request.json();
    
    console.log('=== GENERATE IMAGE PROMPTS API REQUEST ===');
    console.log('Product Title:', requestData.productTitle);
    console.log('Product Images count:', requestData.productImages?.length || 0);
    console.log('Language:', requestData.language);
    console.log('Market:', requestData.market);
    console.log('Requested Style:', requestData.requestedStyle);
    
    // Check if using segmentation
    if (requestData.segmentation) {
      console.log('Using Segmentation:', requestData.segmentation.name);
    } else {
      console.log('Using Manual Settings:', {
        keywords: requestData.keywords?.length || 0,
        persona: requestData.persona ? 'Yes' : 'No',
        painpoints: requestData.painpoints?.length || 0,
        tone: requestData.tone || 'N/A'
      });
    }

    // Call external API to generate image prompts for all 6 styles
    const response = await fetch(`${API_BASE_URL}/api/product-optimize/generate-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      
      // Check if response is HTML (error page)
      if (contentType && contentType.includes("text/html")) {
        console.error('External API returned HTML error page instead of JSON');
        throw new Error(`External API server at ${API_BASE_URL} is not responding correctly. Please check if the server is running.`);
      }
      
      const errorText = await response.text();
      console.error('External API error:', response.status, errorText);
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('=== API RESPONSE ===');
    console.log('Success:', data.success);
    console.log('Best Image URL:', data.data?.bestImageUrl);
    console.log('Styles generated:', Object.keys(data.data?.styles || {}).join(', '));

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to generate image prompts');
    }

    return json({
      success: true,
      data: {
        product: data.data.product,
        analysis: data.data.analysis,
        bestImageUrl: data.data.bestImageUrl,
        imageSelectionReason: data.data.imageSelectionReason,
        styles: data.data.styles,
        tech_settings: data.data.tech_settings
      }
    });

  } catch (error) {
    console.error('Generate image prompts API error:', error);
    
    // Return fallback response with basic prompts if API fails
    console.log('Returning fallback prompts due to API error');
    
    const productTitle = requestData?.productTitle || 'Product';
    const productImages = requestData?.productImages || [];
    const bestImageUrl = productImages && productImages.length > 0 ? productImages[0] : null;
    
    return json({
      success: true,
      data: {
        product: productTitle,
        analysis: `Product analysis for ${productTitle}`,
        bestImageUrl: bestImageUrl,
        imageSelectionReason: "Selected first image as fallback due to API connection issue",
        styles: {
          studio: `Use the provided image as the exact product reference. Keep the product identical — same structure, material, color, and geometry. Place the product centered on a white-to-light gray seamless background under soft balanced studio lighting. Emphasize realistic highlights and reflections for a premium look. photorealistic, commercial eCommerce ready.`,
          lifestyle: `Use the provided image as the exact product reference. Keep the product identical — same structure, material, and proportions. Remove current background and place the product in a natural lifestyle setting with appropriate props and natural lighting. photorealistic, commercial-ready.`,
          infographic: `Use the provided image as the exact product reference. Keep product identical in color, shape, and design. Center the product on a clean light background with soft shadow. Add minimalist infographic text and icons around it describing key features. Use clean typography and subtle design elements.`,
          ugc: `Use the provided image as the exact product reference. Keep the product unchanged. Place it naturally in a user context with authentic lighting and slightly imperfect framing like a genuine smartphone photo. Emphasize authenticity and natural tones to build trust.`,
          closeup: `Use the provided image as the exact product reference. Keep same texture, structure, and details. Zoom closely on key features to show craftsmanship, material quality, and texture. Light source angled to reveal natural reflections and depth. photorealistic macro lens look.`,
          motion: `Use the provided image as the exact product reference. Keep the product identical. Create a 360° rotating animation on a soft reflective base with smooth transitions and accurate perspective. Maintain consistent lighting and reflections across all frames. photorealistic rendering.`
        },
        tech_settings: {
          img2img_strength: 0.3,
          cfg_scale: 9,
          lighting: "natural daylight or balanced studio light",
          style: "photorealistic commercial product photography"
        }
      }
    });
  }
}
