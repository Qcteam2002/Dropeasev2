/**
 * BILLING SERVICE
 * Quản lý Shopify App Billing API và subscriptions
 */

import prisma from "../../db.server.js";
import { PRICING_PLANS, PLAN_IDS, BILLING_INTERVALS } from "../../config/pricing.js";

export class BillingService {
  constructor(admin, session) {
    this.admin = admin;
    this.session = session;
    this.shop = session.shop;
  }

  /**
   * Tạo Shopify recurring application charge
   * @param {string} planId - ID của plan (starter, pro, business)
   * @param {string} interval - monthly hoặc yearly
   * @param {string} returnUrl - URL để redirect sau khi charge thành công
   * @param {boolean} isTest - Set true để tạo test charge (không charge tiền thật)
   */
  async createRecurringCharge(planId, interval = "monthly", returnUrl, isTest = null) {
    const plan = PRICING_PLANS[planId];
    
    if (!plan || planId === PLAN_IDS.FREE) {
      throw new Error("Invalid plan for billing");
    }

    const price = plan.price[interval];
    const planName = plan.shopifyPlanName[interval];
    const billingInterval = interval === "yearly" 
      ? BILLING_INTERVALS.YEARLY 
      : BILLING_INTERVALS.MONTHLY;

    // Auto-detect test mode nếu không được set explicit
    // Development store hoặc NODE_ENV !== production → test mode
    if (isTest === null) {
      const isDevelopment = process.env.NODE_ENV !== "production";
      const isDevStore = this.shop.includes(".myshopify.com") || this.shop.includes("dev-");
      isTest = isDevelopment || isDevStore;
    }

    // Tạo recurring application charge theo Shopify API
    const mutation = `
      mutation CreateRecurringCharge($name: String!, $price: Decimal!, $returnUrl: URL!, $trialDays: Int, $test: Boolean) {
        appSubscriptionCreate(
          name: $name
          returnUrl: $returnUrl
          trialDays: $trialDays
          test: $test
          lineItems: [{
            plan: {
              appRecurringPricingDetails: {
                price: { amount: $price, currencyCode: USD }
                interval: ${billingInterval}
              }
            }
          }]
        ) {
          appSubscription {
            id
            name
            status
            trialDays
            currentPeriodEnd
            lineItems {
              id
              plan {
                pricingDetails {
                  ... on AppRecurringPricing {
                    price {
                      amount
                    }
                    interval
                  }
                }
              }
            }
          }
          confirmationUrl
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      name: planName,
      price: price.toString(),
      returnUrl: returnUrl,
      trialDays: plan.trialDays,
      test: isTest,
    };

    console.log(`Creating ${isTest ? 'TEST' : 'PRODUCTION'} charge for ${planName}`);

    try {
      const response = await this.admin.graphql(mutation, {
        variables,
      });

      const data = await response.json();

      if (data.data?.appSubscriptionCreate?.userErrors?.length > 0) {
        throw new Error(
          `Shopify billing error: ${data.data.appSubscriptionCreate.userErrors[0].message}`
        );
      }

      const appSubscription = data.data.appSubscriptionCreate.appSubscription;
      const confirmationUrl = data.data.appSubscriptionCreate.confirmationUrl;

      // Lưu pending subscription vào database
      await this.savePendingSubscription(
        planId,
        interval,
        appSubscription.id,
        price,
        appSubscription,
        isTest
      );

      return {
        confirmationUrl,
        subscriptionId: appSubscription.id,
      };
    } catch (error) {
      console.error("Error creating recurring charge:", error);
      throw error;
    }
  }

  /**
   * Lưu pending subscription vào database
   */
  async savePendingSubscription(planId, interval, subscriptionId, amount, subscriptionData, isTest = false) {
    const user = await this.getOrCreateUser();
    
    // Tìm hoặc tạo pricing module
    const pricingModule = await this.getOrCreatePricingModule(planId, interval);

    // Tạo subscription record với status PENDING
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        moduleId: pricingModule.id,
        external_subscription_id: subscriptionId,
        status: "PENDING",
        amount: amount,
        start_time: new Date(),
        sessionId: this.session.id,
        is_test: isTest,
      },
    });

    // Log payment
    await prisma.paymentLog.create({
      data: {
        userId: user.id,
        action: "SUBSCRIPTION_CREATED",
        status: "CREATED",
        external_transaction_id: subscriptionId,
        amount: amount,
        details: {
          planId,
          interval,
          subscriptionData,
          isTest,
        },
      },
    });

    return subscription;
  }

  /**
   * Activate subscription sau khi user confirm trên Shopify
   */
  async activateSubscription(subscriptionId) {
    console.log("🔄 Activating subscription:", subscriptionId);
    
    try {
      // Query Shopify để check status của subscription
      const query = `
        query GetSubscription($id: ID!) {
          node(id: $id) {
            ... on AppSubscription {
              id
              name
              status
              currentPeriodEnd
              trialDays
              lineItems {
                id
                plan {
                  pricingDetails {
                    ... on AppRecurringPricing {
                      price {
                        amount
                      }
                      interval
                    }
                  }
                }
              }
            }
          }
        }
      `;

      // Retry logic: Shopify cần vài giây để activate subscription
      let appSubscription = null;
      let retries = 3;
      
      while (retries > 0) {
        const response = await this.admin.graphql(query, {
          variables: { id: subscriptionId },
        });

        const data = await response.json();
        
        if (retries === 3) {
          console.log("📥 Shopify response:", JSON.stringify(data, null, 2));
        }
        
        appSubscription = data.data?.node;

        if (!appSubscription) {
          console.error("❌ Subscription not found in Shopify");
          throw new Error("Subscription not found in Shopify");
        }

        console.log("📊 Subscription status:", appSubscription.status, `(attempt ${4 - retries}/3)`);
        
        // Nếu đã ACTIVE, break khỏi retry loop
        if (appSubscription.status === "ACTIVE") {
          console.log("✅ Subscription is ACTIVE!");
          break;
        }
        
        // Nếu DECLINED hoặc CANCELLED, không retry
        if (appSubscription.status === "DECLINED" || appSubscription.status === "CANCELLED") {
          console.log("❌ Subscription status:", appSubscription.status, "- stopping retries");
          break;
        }
        
        // Nếu vẫn PENDING, retry
        retries--;
        if (retries > 0) {
          console.log(`⏳ Subscription still ${appSubscription.status}, waiting 2 seconds... (${retries} retries left)`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Nếu status là ACTIVE, update database
      if (appSubscription.status === "ACTIVE") {
        console.log("✅ Subscription is ACTIVE, updating database...");
        
        const subscription = await prisma.subscription.findFirst({
          where: {
            external_subscription_id: subscriptionId,
          },
        });

        console.log("🔍 Found subscription in DB:", subscription ? `ID: ${subscription.id}` : "NOT FOUND");

        if (!subscription) {
          console.error("❌ Subscription not found in database");
          console.log("Looking for external_subscription_id:", subscriptionId);
          throw new Error("Subscription not found in database");
        }

        // Update subscription status
        const updatedSubscription = await prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: "ACTIVE",
            start_time: new Date(),
            next_billing_time: appSubscription.currentPeriodEnd 
              ? new Date(appSubscription.currentPeriodEnd)
              : null,
          },
        });

        // Cancel all other active subscriptions của user
        await prisma.subscription.updateMany({
          where: {
            userId: subscription.userId,
            id: { not: subscription.id },
            status: { in: ["ACTIVE", "PENDING"] },
          },
          data: {
            status: "CANCELLED",
          },
        });

        // Initialize quotas cho user
        console.log("🎯 Initializing quotas for user:", subscription.userId, "module:", subscription.moduleId);
        await this.initializeQuotas(subscription.userId, subscription.moduleId);
        console.log("✅ Quotas initialized successfully");

        // Update payment log
        await prisma.paymentLog.create({
          data: {
            userId: subscription.userId,
            action: "SUBSCRIPTION_ACTIVATED",
            status: "COMPLETED",
            external_transaction_id: subscriptionId,
            amount: subscription.amount,
            details: {
              subscriptionData: appSubscription,
            },
          },
        });

        console.log("🎉 Subscription activated successfully!");
        return updatedSubscription;
      } else if (appSubscription.status === "DECLINED" || appSubscription.status === "CANCELLED") {
        console.log("❌ Subscription status:", appSubscription.status);
        // Update subscription to failed
        await prisma.subscription.updateMany({
          where: {
            external_subscription_id: subscriptionId,
          },
          data: {
            status: "CANCELLED",
          },
        });

        throw new Error(`Subscription ${appSubscription.status.toLowerCase()}`);
      }

      console.log("⏳ Subscription status is:", appSubscription.status, "- returning null (not yet active)");
      return null;
    } catch (error) {
      console.error("💥 Error activating subscription:", error.message);
      console.error("Stack:", error.stack);
      throw error;
    }
  }

  /**
   * Get current active subscription của user
   */
  async getCurrentSubscription() {
    const user = await this.getOrCreateUser();
    
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: "ACTIVE",
      },
      include: {
        module: {
          include: {
            features: {
              include: {
                feature: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return subscription;
  }

  /**
   * Get subscription quotas và usage
   */
  async getSubscriptionUsage() {
    const user = await this.getOrCreateUser();
    const subscription = await this.getCurrentSubscription();

    if (!subscription) {
      // Return free plan quotas
      return this.getFreePlanUsage(user.id);
    }

    // Get quotas
    const quotas = await prisma.subscriptionQuota.findMany({
      where: {
        userId: user.id,
      },
      include: {
        feature: true,
      },
    });

    // Map database module key to PRICING_PLANS key
    // Database: "pro_monthly" → PRICING_PLANS: "pro"
    let planId = subscription.module.key;
    if (planId.includes("_")) {
      planId = planId.split("_")[0]; // "pro_monthly" → "pro"
    }
    
    return {
      subscription,
      quotas,
      planId: planId,
    };
  }

  /**
   * 🔥 Check pending subscriptions và activate chúng
   * Gọi method này mỗi khi load pricing page
   * (Shopify redirects về /app thay vì callback nên cần polling)
   */
  async checkAndActivatePendingSubscriptions() {
    const user = await this.getOrCreateUser();
    
    // Find all PENDING subscriptions for this user
    const pendingSubscriptions = await prisma.subscription.findMany({
      where: {
        userId: user.id,
        status: "PENDING",
      },
      include: {
        module: true,
      },
    });
    
    if (pendingSubscriptions.length === 0) {
      console.log("✅ No pending subscriptions");
      return;
    }
    
    console.log(`🔍 Found ${pendingSubscriptions.length} pending subscription(s)`);
    
    for (const sub of pendingSubscriptions) {
      try {
        console.log(`🔄 Checking status of ${sub.external_subscription_id}...`);
        
        // Query Shopify để check status thực tế
        const query = `
          query GetSubscription($id: ID!) {
            node(id: $id) {
              ... on AppSubscription {
                id
                name
                status
                currentPeriodEnd
                lineItems {
                  id
                }
              }
            }
          }
        `;
        
        const response = await this.admin.graphql(query, {
          variables: {
            id: sub.external_subscription_id,
          },
        });
        
        const result = await response.json();
        const subscription = result?.data?.node;
        
        if (!subscription) {
          console.log(`❌ Subscription not found on Shopify: ${sub.external_subscription_id}`);
          continue;
        }
        
        console.log(`📊 Shopify status: ${subscription.status}`);
        
        // Nếu status là ACTIVE trên Shopify, activate trong DB
        if (subscription.status === "ACTIVE") {
          console.log(`✅ Activating subscription ${sub.external_subscription_id}...`);
          
          // Update status
          await prisma.subscription.update({
            where: { id: sub.id },
            data: {
              status: "ACTIVE",
              start_time: new Date(),
              next_billing_time: subscription.currentPeriodEnd 
                ? new Date(subscription.currentPeriodEnd) 
                : null,
              updatedAt: new Date(),
            },
          });
          
          // Create quotas
          await this.createSubscriptionQuotas(user.id, sub.moduleId);
          
          console.log(`✅ Subscription activated successfully!`);
        } else if (subscription.status === "CANCELLED" || subscription.status === "EXPIRED") {
          // 🔥 Update DB để không check lại nữa
          console.log(`❌ Subscription ${subscription.status} - updating DB`);
          await prisma.subscription.update({
            where: { id: sub.id },
            data: {
              status: "CANCELLED",
              updatedAt: new Date(),
            },
          });
        } else {
          console.log(`⏳ Subscription still ${subscription.status}, not activating yet`);
        }
      } catch (error) {
        console.error(`❌ Error checking subscription ${sub.external_subscription_id}:`, error.message);
      }
    }
  }

  /**
   * Get free plan usage
   */
  async getFreePlanUsage(userId) {
    const freePlan = PRICING_PLANS[PLAN_IDS.FREE];
    
    // Tính usage từ UsageLog
    const usageLogs = await prisma.usageLog.groupBy({
      by: ["feature_id"],
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      _sum: {
        used_quantity: true,
      },
    });

    const usageMap = {};
    usageLogs.forEach(log => {
      usageMap[log.feature_id] = log._sum.used_quantity || 0;
    });

    return {
      subscription: null,
      planId: PLAN_IDS.FREE,
      quotas: Object.entries(freePlan.features).map(([key, feature]) => ({
        feature_id: key,
        feature: { name: feature.name },
        limit_quantity: feature.limit || -1,
        used_quantity: usageMap[key] || 0,
      })),
    };
  }

  /**
   * Initialize quotas khi activate subscription
   */
  async initializeQuotas(userId, moduleId) {
    // Get module features
    const module = await prisma.pricingModule.findUnique({
      where: { id: moduleId },
      include: {
        features: {
          include: {
            feature: true,
          },
        },
      },
    });

    if (!module) {
      throw new Error("Pricing module not found");
    }

    // Delete old quotas
    await prisma.subscriptionQuota.deleteMany({
      where: {
        userId: userId,
      },
    });

    // Create new quotas
    const quotasData = module.features.map(mf => ({
      userId: userId,
      feature_id: mf.featureId,
      limit_quantity: mf.limit_quantity,
      used_quantity: 0,
      type: "SUBSCRIPTION",
    }));

    await prisma.subscriptionQuota.createMany({
      data: quotasData,
    });
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId) {
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    // Cancel on Shopify
    const mutation = `
      mutation CancelSubscription($id: ID!) {
        appSubscriptionCancel(id: $id) {
          appSubscription {
            id
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    try {
      const response = await this.admin.graphql(mutation, {
        variables: { id: subscription.external_subscription_id },
      });

      const data = await response.json();

      if (data.data?.appSubscriptionCancel?.userErrors?.length > 0) {
        throw new Error(
          `Shopify billing error: ${data.data.appSubscriptionCancel.userErrors[0].message}`
        );
      }

      // Update database
      await prisma.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: "CANCELLED",
        },
      });

      // Log payment
      await prisma.paymentLog.create({
        data: {
          userId: subscription.userId,
          action: "SUBSCRIPTION_CANCELLED",
          status: "COMPLETED",
          external_transaction_id: subscription.external_subscription_id,
          amount: 0,
          details: {
            cancelledAt: new Date(),
          },
        },
      });

      return true;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      throw error;
    }
  }

  /**
   * Helper: Get hoặc create user
   */
  async getOrCreateUser() {
    let user = await prisma.user.findUnique({
      where: {
        sessionId: this.session.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          sessionId: this.session.id,
          email: this.session.email,
        },
      });
    }

    return user;
  }

  /**
   * Helper: Get hoặc create pricing module
   */
  async getOrCreatePricingModule(planId, interval) {
    const plan = PRICING_PLANS[planId];
    const moduleKey = `${planId}_${interval}`;
    const price = plan.price[interval];

    let module = await prisma.pricingModule.findFirst({
      where: {
        key: moduleKey,
      },
    });

    if (!module) {
      module = await prisma.pricingModule.create({
        data: {
          name: plan.shopifyPlanName[interval],
          key: moduleKey,
          price: price,
          is_default: planId === PLAN_IDS.FREE,
          available: true,
        },
      });
    }

    return module;
  }
}

export default BillingService;

