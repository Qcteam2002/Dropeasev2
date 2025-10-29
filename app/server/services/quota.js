/**
 * QUOTA MIDDLEWARE & HELPER
 * Check và track usage của features theo subscription
 */

import prisma from "../db.server.js";
import { PRICING_PLANS, PLAN_IDS, FEATURE_KEYS } from "../config/pricing.js";

export class QuotaService {
  constructor(userId) {
    this.userId = userId;
  }

  /**
   * Check nếu user có thể sử dụng feature
   * @param {string} featureKey - Key của feature (products_limit, ai_generations, etc.)
   * @param {number} quantity - Số lượng muốn sử dụng (default 1)
   * @returns {Promise<{allowed: boolean, remaining: number, limit: number}>}
   */
  async checkQuota(featureKey, quantity = 1) {
    // Get current subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: this.userId,
        status: "ACTIVE",
      },
      include: {
        module: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let planId = PLAN_IDS.FREE;
    let featureConfig = null;

    if (subscription) {
      // Extract plan ID from module key (e.g., "pro_monthly" -> "pro")
      planId = subscription.module.key.split("_")[0];
    }

    const plan = PRICING_PLANS[planId];
    featureConfig = plan.features[featureKey];

    if (!featureConfig) {
      console.error(`Feature ${featureKey} not found in plan ${planId}`);
      return {
        allowed: false,
        remaining: 0,
        limit: 0,
        error: "Feature not found",
      };
    }

    // Check if feature has limit
    const limit = featureConfig.limit;
    
    // -1 means unlimited
    if (limit === -1) {
      return {
        allowed: true,
        remaining: -1,
        limit: -1,
        unlimited: true,
      };
    }

    // Get or create quota
    let quota = await prisma.subscriptionQuota.findFirst({
      where: {
        userId: this.userId,
        feature_id: featureKey,
      },
    });

    if (!quota) {
      // Create quota if not exists
      const feature = await this.getOrCreateFeature(featureKey, featureConfig);
      
      quota = await prisma.subscriptionQuota.create({
        data: {
          userId: this.userId,
          feature_id: featureKey,
          limit_quantity: limit,
          used_quantity: 0,
          type: "SUBSCRIPTION",
        },
      });
    }

    // Check if enough quota
    const remaining = quota.limit_quantity - quota.used_quantity;
    const allowed = remaining >= quantity;

    return {
      allowed,
      remaining,
      limit: quota.limit_quantity,
      used: quota.used_quantity,
    };
  }

  /**
   * Consume quota khi user sử dụng feature
   * @param {string} featureKey
   * @param {number} quantity
   */
  async consumeQuota(featureKey, quantity = 1) {
    const check = await this.checkQuota(featureKey, quantity);

    if (!check.allowed && !check.unlimited) {
      throw new Error(`Quota exceeded for ${featureKey}. Remaining: ${check.remaining}, Required: ${quantity}`);
    }

    // If unlimited, just log usage without updating quota
    if (check.unlimited) {
      await prisma.usageLog.create({
        data: {
          userId: this.userId,
          feature_id: featureKey,
          used_quantity: quantity,
        },
      });
      return {
        success: true,
        remaining: -1,
        unlimited: true,
      };
    }

    // Update quota
    const quota = await prisma.subscriptionQuota.findFirst({
      where: {
        userId: this.userId,
        feature_id: featureKey,
      },
    });

    if (!quota) {
      throw new Error(`Quota not found for ${featureKey}`);
    }

    const updatedQuota = await prisma.subscriptionQuota.update({
      where: { id: quota.id },
      data: {
        used_quantity: {
          increment: quantity,
        },
      },
    });

    // Log usage
    await prisma.usageLog.create({
      data: {
        userId: this.userId,
        feature_id: featureKey,
        used_quantity: quantity,
      },
    });

    return {
      success: true,
      remaining: updatedQuota.limit_quantity - updatedQuota.used_quantity,
      used: updatedQuota.used_quantity,
      limit: updatedQuota.limit_quantity,
    };
  }

  /**
   * Check if user có thể access feature (for gated features)
   */
  async canAccessFeature(featureKey) {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: this.userId,
        status: "ACTIVE",
      },
      include: {
        module: true,
      },
    });

    let planId = PLAN_IDS.FREE;
    if (subscription) {
      planId = subscription.module.key.split("_")[0];
    }

    const plan = PRICING_PLANS[planId];
    const feature = plan.features[featureKey];

    if (!feature) {
      return {
        canAccess: false,
        reason: "Feature not found",
      };
    }

    // Check if feature is enabled
    if (feature.enabled === false) {
      return {
        canAccess: false,
        reason: `This feature is not available in ${plan.name} plan`,
        requiredPlan: this.getMinimumPlanForFeature(featureKey),
      };
    }

    // Check feature level (for AI Segmentation)
    if (featureKey === FEATURE_KEYS.AI_SEGMENTATION) {
      const level = feature.level || "none";
      
      if (level === "none") {
        return {
          canAccess: false,
          reason: "AI Segmentation is not available in Free plan",
          requiredPlan: "starter",
        };
      } else if (level === "preview") {
        return {
          canAccess: true,
          level: "preview",
          reason: "You can preview segments but cannot use them. Upgrade to Pro for full access.",
          requiredPlan: "pro",
        };
      } else if (level === "full") {
        return {
          canAccess: true,
          level: "full",
        };
      }
    }

    return {
      canAccess: true,
    };
  }

  /**
   * Get minimum plan required for a feature
   */
  getMinimumPlanForFeature(featureKey) {
    const planOrder = [PLAN_IDS.FREE, PLAN_IDS.STARTER, PLAN_IDS.PRO, PLAN_IDS.BUSINESS];
    
    for (const planId of planOrder) {
      const plan = PRICING_PLANS[planId];
      const feature = plan.features[featureKey];
      
      if (feature && feature.enabled !== false) {
        return planId;
      }
    }
    
    return PLAN_IDS.BUSINESS;
  }

  /**
   * Reset quotas (called monthly by cron job)
   */
  async resetQuotas() {
    await prisma.subscriptionQuota.updateMany({
      where: {
        userId: this.userId,
      },
      data: {
        used_quantity: 0,
      },
    });

    console.log(`Quotas reset for user ${this.userId}`);
  }

  /**
   * Get or create feature in database
   */
  async getOrCreateFeature(featureKey, featureConfig) {
    let feature = await prisma.pricingFeature.findUnique({
      where: { id: featureKey },
    });

    if (!feature) {
      feature = await prisma.pricingFeature.create({
        data: {
          id: featureKey,
          name: featureConfig.name || featureKey,
          description: featureConfig.name || featureKey,
          cycle: featureConfig.cycle || 30,
          is_active: true,
        },
      });
    }

    return feature;
  }

  /**
   * Get quota summary for dashboard
   */
  async getQuotaSummary() {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: this.userId,
        status: "ACTIVE",
      },
      include: {
        module: true,
      },
    });

    let planId = PLAN_IDS.FREE;
    if (subscription) {
      planId = subscription.module.key.split("_")[0];
    }

    const plan = PRICING_PLANS[planId];
    const quotas = await prisma.subscriptionQuota.findMany({
      where: {
        userId: this.userId,
      },
      include: {
        feature: true,
      },
    });

    const summary = {
      planId,
      planName: plan.name,
      quotas: [],
    };

    for (const [featureKey, featureConfig] of Object.entries(plan.features)) {
      const quota = quotas.find(q => q.feature_id === featureKey);
      
      summary.quotas.push({
        featureKey,
        featureName: featureConfig.name || featureKey,
        limit: featureConfig.limit || 0,
        used: quota?.used_quantity || 0,
        remaining: featureConfig.limit === -1 ? -1 : (featureConfig.limit || 0) - (quota?.used_quantity || 0),
        unlimited: featureConfig.limit === -1,
      });
    }

    return summary;
  }
}

/**
 * Middleware helper để check quota trong API routes
 */
export const requireQuota = async (userId, featureKey, quantity = 1) => {
  const quotaService = new QuotaService(userId);
  const check = await quotaService.checkQuota(featureKey, quantity);

  if (!check.allowed && !check.unlimited) {
    throw new Error(
      `You have reached your quota limit for ${featureKey}. ` +
      `Used: ${check.used}/${check.limit}. ` +
      `Please upgrade your plan to continue.`
    );
  }

  return check;
};

/**
 * Middleware helper để check feature access
 */
export const requireFeatureAccess = async (userId, featureKey) => {
  const quotaService = new QuotaService(userId);
  const access = await quotaService.canAccessFeature(featureKey);

  if (!access.canAccess) {
    throw new Error(
      access.reason || `You do not have access to ${featureKey}. ` +
      `Please upgrade to ${access.requiredPlan} plan or higher.`
    );
  }

  return access;
};

export default QuotaService;

