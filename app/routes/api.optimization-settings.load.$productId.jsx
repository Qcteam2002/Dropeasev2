import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function loader({ params }) {
  try {
    const { productId } = params;
    
    if (!productId) {
      return json({ 
        success: false, 
        error: "Product ID is required" 
      }, { status: 400 });
    }

    const settings = await prisma.productOptimizationSettings.findUnique({
      where: { productId: BigInt(productId) },
    });

    if (!settings) {
      return json({ 
        success: true, 
        data: null,
        message: "No saved settings found" 
      });
    }

    console.log('✅ Loaded optimization settings from database:', {
      productId,
      hasKeywords: !!settings.keywords,
      hasMarketInsights: !!settings.marketInsights,
      hasSegmentations: !!settings.segmentations,
      selectedSegment: settings.selectedSegment,
    });

    return json({ 
      success: true, 
      data: {
        id: settings.id.toString(),
        keywords: settings.keywords,
        persona: settings.persona,
        painpoints: settings.painpoints,
        tone: settings.tone,
        targetMarket: settings.targetMarket,
        languageOutput: settings.languageOutput,
        optimizationType: settings.optimizationType,
        marketInsights: settings.marketInsights,
        segmentations: settings.segmentations,
        selectedSegment: settings.selectedSegment,
        updatedAt: settings.updatedAt.toISOString(),
      }
    });

  } catch (error) {
    console.error('❌ Error loading optimization settings:', error);
    return json({ 
      success: false, 
      error: error.message || "Failed to load settings" 
    }, { status: 500 });
  }
}

