import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const settings = formData.get("settings");
    
    if (!productId || !settings) {
      return json({ 
        success: false, 
        error: "Product ID and settings are required" 
      }, { status: 400 });
    }

    const parsedSettings = JSON.parse(settings);
    
    // Upsert optimization settings
    const savedSettings = await prisma.productOptimizationSettings.upsert({
      where: { productId: BigInt(productId) },
      update: {
        keywords: parsedSettings.keywords || null,
        persona: parsedSettings.persona || null,
        painpoints: parsedSettings.painpoints || null,
        tone: parsedSettings.tone || null,
        targetMarket: parsedSettings.targetMarket || null,
        languageOutput: parsedSettings.languageOutput || null,
        optimizationType: parsedSettings.optimizationType || null,
        marketInsights: parsedSettings.marketInsights || null,
        segmentations: parsedSettings.segmentations || null,
        selectedSegment: parsedSettings.selectedSegment || null,
        updatedAt: new Date(),
      },
      create: {
        productId: BigInt(productId),
        keywords: parsedSettings.keywords || null,
        persona: parsedSettings.persona || null,
        painpoints: parsedSettings.painpoints || null,
        tone: parsedSettings.tone || null,
        targetMarket: parsedSettings.targetMarket || null,
        languageOutput: parsedSettings.languageOutput || null,
        optimizationType: parsedSettings.optimizationType || null,
        marketInsights: parsedSettings.marketInsights || null,
        segmentations: parsedSettings.segmentations || null,
        selectedSegment: parsedSettings.selectedSegment || null,
      },
    });

    console.log('✅ Optimization settings saved to database:', {
      productId,
      hasKeywords: !!parsedSettings.keywords,
      hasMarketInsights: !!parsedSettings.marketInsights,
      hasSegmentations: !!parsedSettings.segmentations,
      selectedSegment: parsedSettings.selectedSegment,
    });

    return json({ 
      success: true, 
      message: "Settings saved successfully",
      data: {
        id: savedSettings.id.toString(),
        updatedAt: savedSettings.updatedAt.toISOString(),
      }
    });

  } catch (error) {
    console.error('❌ Error saving optimization settings:', error);
    return json({ 
      success: false, 
      error: error.message || "Failed to save settings" 
    }, { status: 500 });
  }
}

