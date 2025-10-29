/**
 * API ENDPOINT: Initiate Subscription Upgrade
 * POST /app/api/billing/subscribe
 */

import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { BillingService } from "../server/services/billing";

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { planId, interval = "monthly", isTest } = body;

    if (!planId) {
      return json(
        { error: "planId is required" },
        { status: 400 }
      );
    }

    // Validate plan
    const validPlans = ["starter", "pro", "business"];
    if (!validPlans.includes(planId)) {
      return json(
        { error: "Invalid planId. Must be starter, pro, or business" },
        { status: 400 }
      );
    }

    // Create billing service
    const billingService = new BillingService(admin, session);

    // Get current subscription để check xem có đang active không
    const currentSubscription = await billingService.getCurrentSubscription();
    
    if (currentSubscription && currentSubscription.module.key.includes(planId)) {
      return json(
        { error: "You are already subscribed to this plan" },
        { status: 400 }
      );
    }

    // Create return URL - Shopify sẽ redirect về đây sau khi user confirm
    // Must include shop and host parameters for proper redirect
    const appUrl = process.env.SHOPIFY_APP_URL || "";
    const host = request.headers.get("host") || new URL(appUrl).host;
    const returnUrl = `${appUrl}/app/billing/callback?planId=${planId}&interval=${interval}&shop=${session.shop}&host=${btoa(`${session.shop}/admin`)}`;

    console.log("🔗 RETURN URL for Shopify:", returnUrl);

    // Force test mode via environment variable
    const forceTestMode = process.env.BILLING_TEST_MODE === "true";
    const testMode = isTest !== undefined ? isTest : (forceTestMode ? true : null);

    // Create recurring charge
    const { confirmationUrl, subscriptionId } = await billingService.createRecurringCharge(
      planId,
      interval,
      returnUrl,
      testMode
    );

    console.log("✅ Shopify confirmation URL:", confirmationUrl);
    console.log("📊 Subscription ID:", subscriptionId);

    return json({
      success: true,
      confirmationUrl,
      subscriptionId,
      message: "Please confirm your subscription on Shopify",
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return json(
      {
        error: error.message || "Failed to create subscription",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
};

export const loader = async () => {
  return json({ error: "Method not allowed" }, { status: 405 });
};

