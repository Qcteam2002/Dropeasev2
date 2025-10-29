import { json } from "@remix-run/node";

const API_BASE_URL = 'http://localhost:3001';

// Support GET request for testing
export async function loader() {
  return json({
    message: "This endpoint requires POST request",
    usage: "POST /api/generate-image-result with JSON body",
    requiredFields: ["prompt", "originalImageUrl", "style"]
  });
}

export async function action({ request }) {
  try {
    const requestData = await request.json();
    
    console.log('=== GENERATE IMAGE RESULT API REQUEST ===');
    console.log('Style:', requestData.style);
    console.log('Original Image URL:', requestData.originalImageUrl);
    console.log('Prompt length:', requestData.prompt?.length || 0);
    console.log('Tech Settings:', requestData.techSettings);

    // Validate required fields
    if (!requestData.prompt || !requestData.originalImageUrl) {
      return json({
        success: false,
        error: 'Missing required fields: prompt or originalImageUrl'
      }, { status: 400 });
    }

    // Call external API to generate final image
    const response = await fetch(`${API_BASE_URL}/api/product-optimize/generate-image-result`, {
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
    console.log('Generated Image URL length:', data.data?.generatedImage?.length || 0);
    console.log('Style:', data.data?.style);

    if (!data.success || !data.data || !data.data.generatedImage) {
      throw new Error(data.error || 'Failed to generate image');
    }

    return json({
      success: true,
      data: {
        generatedImage: data.data.generatedImage,
        style: data.data.style,
        originalImageUrl: data.data.originalImageUrl,
        prompt: data.data.prompt,
        techSettings: data.data.techSettings,
        timestamp: data.data.timestamp
      }
    });

  } catch (error) {
    console.error('Generate image result API error:', error);
    
    return json({
      success: false,
      error: error.message || 'Failed to generate image'
    }, { status: 500 });
  }
}

