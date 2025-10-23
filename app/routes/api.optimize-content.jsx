import { json } from "@remix-run/node";

const API_BASE_URL = 'http://localhost:3001';

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const productTitle = formData.get("productTitle");
    const productDescription = formData.get("productDescription");
    const productId = formData.get("productId");
    const productImages = formData.get("productImages"); // JSON string array
    const optimizationType = formData.get("type"); // 'keyword', 'pas', 'aida', 'professional'
    const keywords = formData.get("keywords"); // JSON string array
    const persona = formData.get("persona");
    const painpoints = formData.get("painpoints"); // JSON string array
    const tone = formData.get("tone") || 'friendly';
    const languageOutput = formData.get("languageOutput") || 'en-US';
    const targetMarket = formData.get("targetMarket") || 'US';

    if (!productTitle || !productDescription) {
      return json({ 
        error: "Product title and description are required" 
      }, { status: 400 });
    }

    // Parse arrays from JSON strings
    const imagesArray = productImages ? JSON.parse(productImages) : [];
    const keywordsArray = keywords ? JSON.parse(keywords) : [];
    const painpointsArray = painpoints ? JSON.parse(painpoints) : [];
    
    // Debug: Log received data
    console.log('=== OPTIMIZE CONTENT API DEBUG ===');
    console.log('Received data:', {
      productTitle,
      productDescription: productDescription?.substring(0, 100) + '...',
      productId,
      productImages: imagesArray,
      optimizationType,
      keywords: keywordsArray,
      persona,
      painpoints: painpointsArray,
      tone,
      languageOutput,
      targetMarket
    });
    
    // Prepare request data according to API documentation
    const requestData = {
      type: optimizationType,
      productTitle: productTitle,
      productDescription: productDescription,
      productId: productId,
      productImages: imagesArray,
      keywords: keywordsArray,
      tone: tone,
      languageOutput: languageOutput,
      targetMarket: targetMarket
    };

    // Add optional fields if provided
    if (persona) {
      requestData.persona = persona;
    }
    if (painpointsArray.length > 0) {
      requestData.painpoints = painpointsArray;
    }
    
    console.log('Sending to external API:', JSON.stringify(requestData, null, 2));
    
    // Call tikminer API for content optimization
    const response = await fetch(`${API_BASE_URL}/api/product-optimize/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();

    return json({ 
      success: true, 
      new_title: data.new_title,
      new_description: data.new_description,
      rawData: data // Keep original data for debugging
    });

  } catch (error) {
    console.error('Content optimization API error:', error);
    return json({ 
      error: "Failed to optimize content",
      details: error.message 
    }, { status: 500 });
  }
}
