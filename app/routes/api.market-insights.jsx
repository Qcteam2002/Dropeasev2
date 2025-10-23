import { json } from "@remix-run/node";

const API_BASE_URL = 'http://localhost:3001';

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const productTitle = formData.get("productTitle");
    const productDescription = formData.get("productDescription");
    const productId = formData.get("productId");
    const targetMarket = formData.get("targetMarket");
    const languageOutput = formData.get("languageOutput");

    if (!productTitle || !productDescription) {
      return json({ 
        error: "Product title and description are required" 
      }, { status: 400 });
    }

    // Prepare request data according to new API structure
    const requestData = {
      product_title: productTitle,
      product_description: productDescription,
      product_id: productId || undefined,
      target_market: targetMarket || "us",
      languageOutput: languageOutput || "en-US",
      market_insight_date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
    };

    // Debug: Log request data
    console.log('=== MARKET INSIGHTS API REQUEST ===');
    console.log('Request data:', {
      product_title: productTitle,
      product_description: productDescription?.substring(0, 100) + '...',
      product_id: productId,
      target_market: targetMarket,
      languageOutput: languageOutput,
      market_insight_date: requestData.market_insight_date
    });

    // Call tikminer API for market insights
    const response = await fetch(`${API_BASE_URL}/api/product-optimize/suggest-data`, {
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
    console.log('Keywords structure:', {
      informational: data.keywords?.informational?.length || 0,
      transactional: data.keywords?.transactional?.length || 0,
      comparative: data.keywords?.comparative?.length || 0,
      painpoint_related: data.keywords?.painpoint_related?.length || 0
    });
    console.log('Sample keywords from each type:');
    console.log('Informational:', data.keywords?.informational?.[0]);
    console.log('Transactional:', data.keywords?.transactional?.[0]);
    console.log('Comparative:', data.keywords?.comparative?.[0]);
    console.log('Painpoint:', data.keywords?.painpoint_related?.[0]);

    // Transform the data to match our UI needs with metrics
    const transformedData = {
      keywords: [
        ...(data.keywords?.informational || []).map(k => ({
          keyword: k.keyword,
          type: 'informational',
          metrics: {
            volume: k.volume,
            cpc: k.cpc,
            competition: k.competition
          }
        })),
        ...(data.keywords?.transactional || []).map(k => ({
          keyword: k.keyword,
          type: 'transactional',
          metrics: {
            volume: k.volume,
            cpc: k.cpc,
            competition: k.competition
          }
        })),
        ...(data.keywords?.comparative || []).map(k => ({
          keyword: k.keyword,
          type: 'comparative',
          metrics: {
            volume: k.volume,
            cpc: k.cpc,
            competition: k.competition
          }
        })),
        ...(data.keywords?.painpoint_related || []).map(k => ({
          keyword: k.keyword,
          type: 'painpoint_related',
          metrics: {
            volume: k.volume,
            cpc: k.cpc,
            competition: k.competition
          }
        }))
      ],
      personas: (data.target_customers || []).map(customer => ({
        name: customer.name,
        description: customer.description || `${customer.age_range || ''} | ${customer.location || ''}`,
        demographics: customer.demographics,
        location: customer.location,
        age_range: customer.age_range,
        interests: customer.interests,
        behavior: customer.behavior
      })),
      painpoints: (data.target_customers || [])
        .flatMap(customer => customer.common_painpoints || [])
        .filter((painpoint, index, array) => array.indexOf(painpoint) === index) // Remove duplicates
    };

    // Debug: Log transformed data
    console.log('=== TRANSFORMED DATA DEBUG ===');
    console.log('Total keywords:', transformedData.keywords.length);
    console.log('Keywords by type:', {
      informational: transformedData.keywords.filter(k => k.type === 'informational').length,
      transactional: transformedData.keywords.filter(k => k.type === 'transactional').length,
      comparative: transformedData.keywords.filter(k => k.type === 'comparative').length,
      painpoint_related: transformedData.keywords.filter(k => k.type === 'painpoint_related').length
    });
    console.log('Sample transformed keywords:', transformedData.keywords.slice(0, 5));

    return json({ 
      success: true, 
      data: transformedData,
      rawData: data // Keep original data for debugging
    });

  } catch (error) {
    console.error('Market insights API error:', error);
    return json({ 
      error: "Failed to get market insights",
      details: error.message 
    }, { status: 500 });
  }
}
