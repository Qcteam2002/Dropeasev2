import { json } from "@remix-run/node";

const API_BASE_URL = 'http://localhost:3001';

export async function action({ request }) {
  // Declare variables outside try block for catch block access
  let title = "Product Title";
  let description = "";
  let segmentation = null;
  
  try {
    const formData = await request.formData();
    title = formData.get("title") || title;
    description = formData.get("description") || description;
    const productId = formData.get("productId");
    const language = formData.get("language") || "en-US";
    const targetMarket = formData.get("targetMarket") || "us";
    
    // Get segmentation data
    const segmentationData = formData.get("segmentation");
    
    try {
      segmentation = JSON.parse(segmentationData);
    } catch (error) {
      return json({ 
        error: "Invalid segmentation data format" 
      }, { status: 400 });
    }

    if (!title || !segmentation) {
      return json({ 
        error: "Title and segmentation are required" 
      }, { status: 400 });
    }

    // Process images array
    const images = [];
    let index = 0;
    while (formData.get(`images[${index}]`)) {
      const imageUrl = formData.get(`images[${index}]`);
      if (imageUrl && imageUrl.trim() !== '') {
        images.push(imageUrl);
      }
      index++;
    }

    // Prepare request data for external API
    const requestData = {
      title: title,
      description: description || null,
      images: images.slice(0, 3), // Max 3 images
      segmentation: segmentation,
      targetMarket: targetMarket,
      language: language
    };

    // Debug: Log request data
    console.log('=== GENERATE CONTENT SEGMENTATION API REQUEST ===');
    console.log('Title:', title);
    console.log('Description:', description?.substring(0, 100) + '...');
    console.log('Product ID:', productId);
    console.log('Language:', language);
    console.log('Target Market:', targetMarket);
    console.log('Images count:', images.length);
    console.log('Segmentation name:', segmentation.name);
    console.log('Segmentation winRate:', segmentation.winRate);

    // Call external API for content generation
    const response = await fetch(`${API_BASE_URL}/api/product-optimize/generate-content-from-segmentation`, {
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
    
    // Debug: Log the actual API response structure
    console.log('=== API RESPONSE DEBUG ===');
    console.log('Response status:', data.success);
    console.log('Generated title length:', data.data?.title?.length || 0);
    console.log('Generated description length:', data.data?.description?.length || 0);

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.data || !data.data.title || !data.data.description) {
      throw new Error('Invalid response format: missing title or description');
    }

    // Return the generated content
    const transformedData = {
      success: true,
      data: {
        title: data.data.title,
        description: data.data.description,
        segmentation: {
          name: segmentation.name,
          winRate: segmentation.winRate,
          toneType: segmentation.toneType,
          voiceGuideline: segmentation.voiceGuideline
        }
      }
    };

    console.log('Transformed response:', {
      success: transformedData.success,
      titleLength: transformedData.data.title.length,
      descriptionLength: transformedData.data.description.length,
      segmentationName: transformedData.data.segmentation.name
    });

    return json(transformedData);

  } catch (error) {
    console.error('Generate content segmentation API error:', error);
    
    // Return fallback content if API fails
    // Note: Using variables already extracted at the beginning of the function
    
    console.log('Returning fallback content due to API error');
    const fallbackData = {
      success: true,
      data: {
        title: title || "Product Title",
        description: description ? 
          `<div class="product-description">
            <div class="hero-section">
              <h2>✨ ${title}</h2>
              <p>${description}</p>
            </div>
            <div class="benefits-section">
              <h3>🌟 Key Features:</h3>
              <ul class="benefits-list">
                <li>✅ High quality materials</li>
                <li>✅ Perfect for daily use</li>
                <li>✅ Great value for money</li>
              </ul>
            </div>
          </div>` : 
          `<div class="product-description">
            <div class="hero-section">
              <h2>✨ ${title}</h2>
              <p>Discover this amazing product that combines quality and style.</p>
            </div>
          </div>`,
        segmentation: {
          name: "Fallback",
          winRate: 0.5,
          toneType: "Friendly",
          voiceGuideline: "Use friendly and approachable tone"
        }
      }
    };
    
    return json(fallbackData);
  }
}
