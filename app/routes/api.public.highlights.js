import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');
    
    if (!shop) {
      return json({ error: "Shop parameter required" }, { status: 400 });
    }
    
    // Mock content for testing
    const mockContent = [
      {
        id: 1,
        title: "Premium Quality Materials",
        description: "Made with the finest materials for lasting durability and comfort. This product features high-quality construction that ensures long-term satisfaction and exceptional value.",
        icon: "⭐"
      },
      {
        id: 2,
        title: "Perfect Fit & Style",
        description: "Designed to flatter your figure with a comfortable, tailored fit that works for any occasion. The versatile design adapts to your lifestyle seamlessly.",
        icon: "👕"
      },
      {
        id: 3,
        title: "Easy Care & Maintenance",
        description: "Machine washable and wrinkle-resistant for effortless maintenance and long-lasting beauty. Spend less time caring and more time enjoying your purchase.",
        icon: "🧺"
      }
    ];
    
    console.log('🌐 Public API called for shop:', shop);
    
    return json({ 
      success: true, 
      content: mockContent,
      layout: "multirow",
      shop: shop,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error in public highlights API:", error);
    return json({ 
      success: false, 
      error: "Internal server error" 
    }, { status: 500 });
  }
};















