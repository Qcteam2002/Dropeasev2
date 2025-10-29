/**
 * PRICING CONFIGURATION
 * Định nghĩa các pricing plans, features và quotas cho app
 */

export const PLAN_IDS = {
  FREE: "free",
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

export const BILLING_INTERVALS = {
  MONTHLY: "EVERY_30_DAYS",
  YEARLY: "ANNUAL",
};

export const FEATURE_KEYS = {
  PRODUCTS_LIMIT: "products_limit",
  AI_GENERATIONS: "ai_generations",
  AI_SEGMENTATION: "ai_segmentation",
  BULK_OPTIMIZATION: "bulk_optimization",
  SUPPORT_LEVEL: "support_level",
};

// Định nghĩa các pricing plans theo cấu trúc Shopify App Billing
export const PRICING_PLANS = {
  [PLAN_IDS.FREE]: {
    id: PLAN_IDS.FREE,
    name: "Free",
    tier: "Beginner",
    description: "For new users trying the app",
    price: {
      monthly: 0,
      yearly: 0,
    },
    trialDays: 0,
    features: {
      [FEATURE_KEYS.PRODUCTS_LIMIT]: {
        name: "Products can be optimized",
        limit: 10,
        cycle: 30, // days
      },
      [FEATURE_KEYS.AI_GENERATIONS]: {
        name: "AI generations per month",
        limit: 20,
        cycle: 30,
      },
      [FEATURE_KEYS.AI_SEGMENTATION]: {
        name: "AI Segmentation",
        enabled: false,
        level: "none",
      },
      [FEATURE_KEYS.BULK_OPTIMIZATION]: {
        name: "Bulk Optimization",
        enabled: false,
      },
      [FEATURE_KEYS.SUPPORT_LEVEL]: {
        name: "Support",
        level: "community",
      },
    },
    shopifyPlanName: null, // Free plan không tạo charge trên Shopify
    badge: null,
  },
  
  [PLAN_IDS.STARTER]: {
    id: PLAN_IDS.STARTER,
    name: "Starter",
    tier: "Basic",
    description: "For small stores and dropshippers",
    price: {
      monthly: 9.0,
      yearly: 86.4, // $7.2/month * 12 = 20% discount
    },
    trialDays: 7,
    features: {
      [FEATURE_KEYS.PRODUCTS_LIMIT]: {
        name: "Products can be optimized",
        limit: 50,
        cycle: 30,
      },
      [FEATURE_KEYS.AI_GENERATIONS]: {
        name: "AI generations per month",
        limit: 100,
        cycle: 30,
      },
      [FEATURE_KEYS.AI_SEGMENTATION]: {
        name: "AI Segmentation",
        enabled: true,
        level: "preview", // Preview only - tạo FOMO
      },
      [FEATURE_KEYS.BULK_OPTIMIZATION]: {
        name: "Bulk Optimization",
        enabled: false,
      },
      [FEATURE_KEYS.SUPPORT_LEVEL]: {
        name: "Support",
        level: "standard",
        responseTime: "48h",
      },
    },
    shopifyPlanName: {
      monthly: "Starter Plan - Monthly",
      yearly: "Starter Plan - Yearly",
    },
    badge: null,
  },
  
  [PLAN_IDS.PRO]: {
    id: PLAN_IDS.PRO,
    name: "Pro",
    tier: "Growth",
    description: "For growing stores needing insights",
    price: {
      monthly: 19.9,
      yearly: 190.8, // $15.9/month * 12 = 20% discount
    },
    trialDays: 7,
    features: {
      [FEATURE_KEYS.PRODUCTS_LIMIT]: {
        name: "Products can be optimized",
        limit: 250,
        cycle: 30,
      },
      [FEATURE_KEYS.AI_GENERATIONS]: {
        name: "AI generations per month",
        limit: 500,
        cycle: 30,
      },
      [FEATURE_KEYS.AI_SEGMENTATION]: {
        name: "AI Segmentation",
        enabled: true,
        level: "full", // Full access
      },
      [FEATURE_KEYS.BULK_OPTIMIZATION]: {
        name: "Bulk Optimization",
        enabled: false,
      },
      [FEATURE_KEYS.SUPPORT_LEVEL]: {
        name: "Support",
        level: "priority",
        responseTime: "24h",
      },
    },
    shopifyPlanName: {
      monthly: "Pro Plan - Monthly",
      yearly: "Pro Plan - Yearly",
    },
    badge: "Most Popular",
    recommended: true,
  },
  
  [PLAN_IDS.BUSINESS]: {
    id: PLAN_IDS.BUSINESS,
    name: "Business",
    tier: "Enterprise",
    description: "For large stores and agencies",
    price: {
      monthly: 49.9,
      yearly: 478.8, // $39.9/month * 12 = 20% discount
    },
    trialDays: 7,
    features: {
      [FEATURE_KEYS.PRODUCTS_LIMIT]: {
        name: "Products can be optimized",
        limit: 1000,
        cycle: 30,
      },
      [FEATURE_KEYS.AI_GENERATIONS]: {
        name: "AI generations per month",
        limit: -1, // -1 = unlimited
      },
      [FEATURE_KEYS.AI_SEGMENTATION]: {
        name: "AI Segmentation",
        enabled: true,
        level: "full",
      },
      [FEATURE_KEYS.BULK_OPTIMIZATION]: {
        name: "Bulk Optimization",
        enabled: true,
      },
      [FEATURE_KEYS.SUPPORT_LEVEL]: {
        name: "Support",
        level: "premium",
        responseTime: "Live chat",
      },
    },
    shopifyPlanName: {
      monthly: "Business Plan - Monthly",
      yearly: "Business Plan - Yearly",
    },
    badge: null,
  },
};

/**
 * Helper functions
 */

export const getPlanById = (planId) => {
  return PRICING_PLANS[planId] || PRICING_PLANS[PLAN_IDS.FREE];
};

export const getPlanPrice = (planId, interval = "monthly") => {
  const plan = getPlanById(planId);
  return plan.price[interval];
};

export const getPlanFeature = (planId, featureKey) => {
  const plan = getPlanById(planId);
  return plan.features[featureKey];
};

export const getAllPlans = () => {
  return Object.values(PRICING_PLANS);
};

export const getUpgradablePlans = (currentPlanId) => {
  const planOrder = [PLAN_IDS.FREE, PLAN_IDS.STARTER, PLAN_IDS.PRO, PLAN_IDS.BUSINESS];
  const currentIndex = planOrder.indexOf(currentPlanId);
  
  return planOrder
    .slice(currentIndex + 1)
    .map(planId => PRICING_PLANS[planId]);
};

export const getDowngradablePlans = (currentPlanId) => {
  const planOrder = [PLAN_IDS.FREE, PLAN_IDS.STARTER, PLAN_IDS.PRO, PLAN_IDS.BUSINESS];
  const currentIndex = planOrder.indexOf(currentPlanId);
  
  return planOrder
    .slice(0, currentIndex)
    .map(planId => PRICING_PLANS[planId])
    .reverse();
};

export const canUpgrade = (currentPlanId, targetPlanId) => {
  const planOrder = [PLAN_IDS.FREE, PLAN_IDS.STARTER, PLAN_IDS.PRO, PLAN_IDS.BUSINESS];
  const currentIndex = planOrder.indexOf(currentPlanId);
  const targetIndex = planOrder.indexOf(targetPlanId);
  
  return targetIndex > currentIndex;
};

export const canDowngrade = (currentPlanId, targetPlanId) => {
  const planOrder = [PLAN_IDS.FREE, PLAN_IDS.STARTER, PLAN_IDS.PRO, PLAN_IDS.BUSINESS];
  const currentIndex = planOrder.indexOf(currentPlanId);
  const targetIndex = planOrder.indexOf(targetPlanId);
  
  return targetIndex < currentIndex && targetIndex >= 0;
};

export default PRICING_PLANS;

