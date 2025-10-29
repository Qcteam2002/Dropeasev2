/**
 * WEBHOOK HANDLER: Shopify App Subscriptions
 * Handles webhook events từ Shopify khi subscription status changes
 */

import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export const action = async ({ request }) => {
  try {
    const { topic, shop, session, admin, payload } = await authenticate.webhook(request);

    console.log("Received billing webhook:", { topic, shop });

    switch (topic) {
      case "APP_SUBSCRIPTIONS_UPDATE":
        await handleSubscriptionUpdate(payload, shop);
        break;
      
      case "APP_SUBSCRIPTIONS_APPROACHING_CAPPED_AMOUNT":
        await handleApproachingCappedAmount(payload, shop);
        break;
      
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("Error processing billing webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
};

/**
 * Handle subscription update event
 * 🔥 ENHANCED: Tạo quotas khi subscription ACTIVE
 */
async function handleSubscriptionUpdate(payload, shop) {
  const subscriptionId = payload.app_subscription?.admin_graphql_api_id;
  const status = payload.app_subscription?.status;

  console.log(`📥 Webhook received: ${status} for ${subscriptionId}`);

  if (!subscriptionId) {
    console.log("No subscription ID in webhook payload");
    return;
  }

  // Find subscription in database
  const subscription = await prisma.subscription.findFirst({
    where: {
      external_subscription_id: subscriptionId,
    },
    include: {
      module: true,
    },
  });

  if (!subscription) {
    console.log("Subscription not found in database:", subscriptionId);
    return;
  }

  // Map Shopify status to our status
  let dbStatus = status.toUpperCase();
  if (status === "ACTIVE") {
    dbStatus = "ACTIVE";
  } else if (status === "CANCELLED" || status === "EXPIRED" || status === "FROZEN") {
    dbStatus = "CANCELLED";
  } else if (status === "PENDING") {
    dbStatus = "PENDING";
  }

  // Update subscription
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: dbStatus,
      start_time: status === "ACTIVE" ? new Date() : subscription.start_time,
      updatedAt: new Date(),
    },
  });

  // 🔥 Create quotas nếu subscription vừa ACTIVE
  if (status === "ACTIVE") {
    console.log("✅ Creating subscription quotas via webhook...");
    
    try {
      // Import BillingService - note: can't use class directly in webhook
      // So we'll duplicate the quota creation logic here
      
      // Get module features
      const moduleFeatures = await prisma.pricingModuleFeature.findMany({
        where: { moduleId: subscription.moduleId },
        include: { feature: true },
      });
      
      console.log(`Found ${moduleFeatures.length} features for module ${subscription.module.name}`);
      
      // Create quotas
      for (const mf of moduleFeatures) {
        // Check if quota already exists
        const existing = await prisma.subscriptionQuota.findFirst({
          where: {
            userId: subscription.userId,
            feature_id: mf.featureId,
          },
        });
        
        if (existing) {
          console.log(`  ⚠️ Quota already exists for ${mf.featureId}`);
          continue;
        }
        
        await prisma.subscriptionQuota.create({
          data: {
            userId: subscription.userId,
            feature_id: mf.featureId,
            limit_quantity: mf.limit_quantity,
            used_quantity: 0,
            cycle_start: new Date(),
            cycle_end: null,
          },
        });
        
        console.log(`  ✅ Created quota: ${mf.featureId} = ${mf.limit_quantity}`);
      }
      
      console.log("✅ Quotas created successfully via webhook!");
    } catch (error) {
      console.error("❌ Error creating quotas:", error.message);
    }
  }

  // Log event
  await prisma.paymentLog.create({
    data: {
      userId: subscription.userId,
      action: `SUBSCRIPTION_${status.toUpperCase()}`,
      status: "COMPLETED",
      external_transaction_id: subscriptionId,
      amount: subscription.amount,
      details: {
        webhookPayload: payload,
        shop: shop,
      },
    },
  });

  console.log(`Subscription ${subscriptionId} updated to ${dbStatus}`);
}

/**
 * Handle approaching capped amount warning
 */
async function handleApproachingCappedAmount(payload, shop) {
  console.log("Subscription approaching capped amount:", payload);
  
  // TODO: Send notification to merchant
  // This is useful nếu bạn có usage-based billing
}

export const loader = async () => {
  return new Response("Method not allowed", { status: 405 });
};

