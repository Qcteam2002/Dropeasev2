/**
 * API ENDPOINT: Get Current Subscription & Usage
 * GET /app/api/billing/current
 */

import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { BillingService } from "../server/services/billing";
import { PRICING_PLANS, PLAN_IDS } from "../config/pricing";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  try {
    const billingService = new BillingService(admin, session);
    
    // Get current subscription and usage
    const usage = await billingService.getSubscriptionUsage();
    
    // Get plan info
    const planId = usage.planId || PLAN_IDS.FREE;
    const plan = PRICING_PLANS[planId];

    // Format quotas để match với UI
    const formattedQuotas = {};
    usage.quotas.forEach(quota => {
      formattedQuotas[quota.feature_id] = {
        name: quota.feature?.name || quota.feature_id,
        limit: quota.limit_quantity,
        used: quota.used_quantity || 0,
        unlimited: quota.limit_quantity === -1,
      };
    });

    return json({
      success: true,
      currentPlan: {
        planId: planId,
        planName: plan.name,
        tier: plan.tier,
        price: plan.price.monthly,
        billingCycle: usage.subscription?.external_subscription_id ? "monthly" : "free",
        status: usage.subscription?.status || "free",
        features: formattedQuotas,
        subscription: usage.subscription ? {
          id: usage.subscription.id,
          externalId: usage.subscription.external_subscription_id,
          startTime: usage.subscription.start_time,
          nextBillingTime: usage.subscription.next_billing_time,
          amount: usage.subscription.amount,
        } : null,
      },
    });
  } catch (error) {
    console.error("Error getting current subscription:", error);
    return json(
      {
        success: false,
        error: error.message || "Failed to get subscription",
      },
      { status: 500 }
    );
  }
};

export const action = async () => {
  return json({ error: "Method not allowed" }, { status: 405 });
};

