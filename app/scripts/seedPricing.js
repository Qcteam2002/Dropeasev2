/**
 * SEED SCRIPT: Initialize Pricing Modules & Features
 * Run this script để populate database với pricing configuration
 * 
 * Usage: node app/scripts/seedPricing.js
 */

import prisma from "../db.server.js";
import { PRICING_PLANS, FEATURE_KEYS, PLAN_IDS } from "../config/pricing.js";

async function seedPricingModules() {
  console.log("🌱 Starting pricing seed...\n");

  try {
    // 1. Create/Update Pricing Features
    console.log("📦 Creating pricing features...");
    
    const features = [
      {
        id: FEATURE_KEYS.PRODUCTS_LIMIT,
        name: "Products can be optimized",
        description: "Maximum number of products that can be optimized",
        cycle: 30, // days
      },
      {
        id: FEATURE_KEYS.AI_GENERATIONS,
        name: "AI generations per month",
        description: "Number of AI content generations per month",
        cycle: 30,
      },
      {
        id: FEATURE_KEYS.AI_SEGMENTATION,
        name: "AI Segmentation",
        description: "Access to AI-powered customer segmentation",
        cycle: 30,
      },
      {
        id: FEATURE_KEYS.BULK_OPTIMIZATION,
        name: "Bulk Optimization",
        description: "Ability to optimize multiple products at once",
        cycle: 30,
      },
      {
        id: FEATURE_KEYS.SUPPORT_LEVEL,
        name: "Support Level",
        description: "Customer support response time and priority",
        cycle: 30,
      },
    ];

    for (const feature of features) {
      await prisma.pricingFeature.upsert({
        where: { id: feature.id },
        update: {
          name: feature.name,
          description: feature.description,
          cycle: feature.cycle,
          is_active: true,
        },
        create: feature,
      });
      console.log(`  ✅ ${feature.name}`);
    }

    // 2. Create/Update Pricing Modules
    console.log("\n💰 Creating pricing modules...");
    
    const intervals = ["monthly", "yearly"];
    
    for (const [planId, plan] of Object.entries(PRICING_PLANS)) {
      if (planId === PLAN_IDS.FREE) {
        // Free plan doesn't have Shopify billing
        const moduleKey = `${planId}_free`;
        const module = await prisma.pricingModule.upsert({
          where: { id: 1 }, // Free plan always ID 1
          update: {
            name: plan.name,
            key: moduleKey,
            price: 0,
            is_default: true,
            available: true,
          },
          create: {
            id: 1,
            name: plan.name,
            key: moduleKey,
            price: 0,
            is_default: true,
            available: true,
          },
        });

        // Create feature relationships
        for (const [featureKey, featureConfig] of Object.entries(plan.features)) {
          const limit = featureConfig.limit !== undefined ? featureConfig.limit : 0;
          
          await prisma.pricingModuleFeature.upsert({
            where: {
              moduleId_featureId: {
                moduleId: module.id,
                featureId: featureKey,
              },
            },
            update: {
              limit_quantity: limit,
              cycle: featureConfig.cycle || 30,
            },
            create: {
              moduleId: module.id,
              featureId: featureKey,
              limit_quantity: limit,
              cycle: featureConfig.cycle || 30,
            },
          });
        }

        console.log(`  ✅ ${plan.name} - Free`);
        continue;
      }

      // Paid plans - create for both monthly and yearly
      for (const interval of intervals) {
        const moduleKey = `${planId}_${interval}`;
        const price = plan.price[interval];
        const moduleName = plan.shopifyPlanName[interval];

        const module = await prisma.pricingModule.upsert({
          where: { key: moduleKey },
          update: {
            name: moduleName,
            price: price,
            is_default: false,
            available: true,
          },
          create: {
            name: moduleName,
            key: moduleKey,
            price: price,
            is_default: false,
            available: true,
          },
        });

        // Create feature relationships
        for (const [featureKey, featureConfig] of Object.entries(plan.features)) {
          const limit = featureConfig.limit !== undefined ? featureConfig.limit : 0;
          
          await prisma.pricingModuleFeature.upsert({
            where: {
              moduleId_featureId: {
                moduleId: module.id,
                featureId: featureKey,
              },
            },
            update: {
              limit_quantity: limit,
              cycle: featureConfig.cycle || 30,
            },
            create: {
              moduleId: module.id,
              featureId: featureKey,
              limit_quantity: limit,
              cycle: featureConfig.cycle || 30,
            },
          });
        }

        console.log(`  ✅ ${plan.name} - ${interval}`);
      }
    }

    console.log("\n✨ Pricing seed completed successfully!\n");
    
    // Print summary
    const moduleCount = await prisma.pricingModule.count();
    const featureCount = await prisma.pricingFeature.count();
    const relationCount = await prisma.pricingModuleFeature.count();
    
    console.log("📊 Summary:");
    console.log(`   Modules: ${moduleCount}`);
    console.log(`   Features: ${featureCount}`);
    console.log(`   Relationships: ${relationCount}`);
    console.log("");

  } catch (error) {
    console.error("❌ Error seeding pricing:", error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPricingModules()
    .then(() => {
      console.log("✅ Done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seed failed:", error);
      process.exit(1);
    });
}

export default seedPricingModules;

