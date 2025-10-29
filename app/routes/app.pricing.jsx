import React, { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher, useNavigate } from "@remix-run/react";
import {
  AppProvider,
  Page,
  Card,
  Text,
  Button,
  Badge,
  Box,
  BlockStack,
  InlineStack,
  Icon,
  ProgressBar,
  Divider as PolarisDiv,
  Banner,
  Spinner,
} from "@shopify/polaris";
import { CheckIcon } from "@shopify/polaris-icons";
import enTranslations from "@shopify/polaris/locales/en.json";
import { authenticate } from "../shopify.server";
import { BillingService } from "../server/services/billing";
import { PRICING_PLANS, PLAN_IDS } from "../config/pricing";

// LOADER: Fetch current subscription data
// 🔥 CRITICAL: Check pending subscriptions FIRST (Shopify redirects to /app, not callback!)
export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  
  console.log("📄 Pricing page loaded");
  
  try {
    const billingService = new BillingService(admin, session);
    
    // 🔥 Check for pending subscriptions and activate them
    console.log("🔍 Checking for pending subscriptions...");
    await billingService.checkAndActivatePendingSubscriptions();
    
    console.log("📦 Fetching current subscription from database...");
    const usage = await billingService.getSubscriptionUsage();
    
    const planId = usage.planId || PLAN_IDS.FREE;
    const plan = PRICING_PLANS[planId];
    
    // Safety check: If plan not found, fallback to FREE
    if (!plan) {
      console.error("❌ Plan not found for planId:", planId);
      console.log("Available plans:", Object.keys(PRICING_PLANS));
      throw new Error(`Plan "${planId}" not found in PRICING_PLANS`);
    }
    
    console.log("✅ Current plan:", plan.name);
    
    // Format data for UI (🔥 Convert BigInt to String to avoid JSON serialization error)
    const currentPlan = {
      accountName: session.shop,
      planId: planId,
      planName: plan.name,
      tier: plan.tier,
      billingCycle: usage.subscription ? "monthly" : "free",
      price: planId === PLAN_IDS.FREE ? "$0" : `$${plan.price.monthly}`,
      usage: {
        productsOptimized: usage.quotas.find(q => q.feature_id === "products_limit")?.used_quantity || 0,
        productsLimit: plan.features.products_limit?.limit || 0,
        aiGenerations: usage.quotas.find(q => q.feature_id === "ai_generations")?.used_quantity || 0,
        aiGenerationsLimit: plan.features.ai_generations?.limit || 0,
      },
      renewalDate: usage.subscription?.next_billing_time 
        ? new Date(usage.subscription.next_billing_time).toLocaleDateString()
        : "N/A",
      // 🔥 Serialize subscription (convert BigInt to String)
      subscription: usage.subscription ? {
        id: usage.subscription.id,
        userId: usage.subscription.userId.toString(), // BigInt → String
        status: usage.subscription.status,
        amount: usage.subscription.amount,
        external_subscription_id: usage.subscription.external_subscription_id,
        start_time: usage.subscription.start_time,
        next_billing_time: usage.subscription.next_billing_time,
      } : null,
    };

    return json({ 
      currentPlan,
      activationResult: null,
      justActivated: false,
    });
  } catch (error) {
    console.error("Error loading subscription:", error);
    
    // Return free plan as fallback
    const freePlan = PRICING_PLANS[PLAN_IDS.FREE];
    return json({
      currentPlan: {
        accountName: session.shop,
        planId: PLAN_IDS.FREE,
        planName: freePlan.name,
        tier: freePlan.tier,
        billingCycle: "free",
        price: "$0",
        usage: {
          productsOptimized: 0,
          productsLimit: 10,
          aiGenerations: 0,
          aiGenerationsLimit: 20,
        },
        renewalDate: "N/A",
        subscription: null,
      },
      activationResult: null,
      justActivated: false,
    });
  }
};

export default function PricingPage() {
  const { currentPlan, activationResult, justActivated } = useLoaderData();
  const [view, setView] = useState("current");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isUpgrading, setIsUpgrading] = useState(false);
  const fetcher = useFetcher();
  const navigate = useNavigate();

  // Auto scroll to top và clean URL khi có activation result
  useEffect(() => {
    if (justActivated) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Clean URL sau 3 giây (remove query params)
      const timer = setTimeout(() => {
        navigate('/app/pricing', { replace: true });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [justActivated, navigate]);

  const getSavings = (monthlyPrice) => {
    return (monthlyPrice * 12 * 0.2).toFixed(0);
  };

  const plans = [
    {
      id: "free",
      tier: "Beginner",
      name: "Free",
      description: "For new users trying the app",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "Optimize up to 10 products",
        "20 AI generations / month",
        "Manual optimization settings",
        "1-click Shopify sync",
        "Community support",
      ],
      cta: "Start Free",
      primary: false,
      badge: null,
    },
    {
      id: "starter",
      tier: "Basic",
      name: "Starter",
      description: "For small stores and dropshippers",
      monthlyPrice: 9,
      yearlyPrice: 7.2,
      features: [
        "Optimize up to 50 products",
        "100 AI generations / month",
        "AI Segmentation (preview only)",
        "Standard support (48h response)",
      ],
      cta: "Select Starter",
      primary: false,
      badge: null,
    },
    {
      id: "pro",
      tier: "Growth",
      name: "Pro",
      description: "For growing stores needing insights",
      monthlyPrice: 19.9,
      yearlyPrice: 15.9,
      features: [
        "Optimize up to 250 products",
        "500 AI generations / month",
        "AI Segmentation (Full Access)",
        "View & select customer segments",
        "Priority support (24h response)",
      ],
      cta: "Select Pro",
      primary: true,
      badge: "Most Popular",
    },
    {
      id: "business",
      tier: "Enterprise",
      name: "Business",
      description: "For large stores and agencies",
      monthlyPrice: 49.9,
      yearlyPrice: 39.9,
      features: [
        "Optimize up to 1,000 products",
        "Unlimited AI generations",
        "Bulk Optimization (time-saver)",
        "Premium support (Live chat)",
      ],
      cta: "Select Business",
      primary: false,
      badge: null,
    },
  ];

  const getCurrentPrice = (plan) => {
    if (plan.id === "free") return "$0";
    const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    return `$${price}`;
  };

  const getPriceSubtext = (plan) => {
    if (plan.id === "free") return "";
    if (billingCycle === "yearly") {
      const savings = getSavings(plan.monthlyPrice);
      return `$${(plan.monthlyPrice * 12).toFixed(2)}/year ($${savings} off)`;
    }
    return "";
  };

  // Handle upgrade button click
  const handleUpgrade = async (planId) => {
    if (planId === "free" || planId === currentPlan.planId) {
      return;
    }

    setIsUpgrading(true);

    try {
      const response = await fetch("/api/billing/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: planId,
          interval: billingCycle,
        }),
      });

      const data = await response.json();

      if (data.success && data.confirmationUrl) {
        // Redirect to Shopify billing page
        window.top.location.href = data.confirmationUrl;
      } else {
        alert(data.error || "Failed to initiate subscription");
        setIsUpgrading(false);
      }
    } catch (error) {
      console.error("Error upgrading:", error);
      alert("Failed to initiate subscription. Please try again.");
      setIsUpgrading(false);
    }
  };

  // Calculate usage percentage
  const productsPercentage = (currentPlan.usage.productsOptimized / currentPlan.usage.productsLimit) * 100;
  const aiGenerationsPercentage = (currentPlan.usage.aiGenerations / currentPlan.usage.aiGenerationsLimit) * 100;

  // Check if plan is current
  const isPlanCurrent = (planId) => {
    return planId === currentPlan.planId;
  };

  // Render Current Plan View
  const renderCurrentPlanView = () => (
    <Page
      title="Billing"
      subtitle="Manage your subscription and billing details"
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Show activation success banner */}
        {justActivated && !activationResult?.error && (
          <Box paddingBlockEnd="400">
            <Banner
              title="🎉 Subscription activated successfully!"
              tone="success"
            >
              <p>
                Your <strong>{currentPlan.planName}</strong> plan is now active. 
                You can start using all the features included in your plan.
              </p>
            </Banner>
          </Box>
        )}
        
        {/* Show activation error banner */}
        {activationResult?.error && (
          <Box paddingBlockEnd="400">
            <Banner
              title="Subscription activation pending"
              tone="warning"
            >
              <p>
                Your payment was processed but subscription activation is pending. 
                Please refresh the page in a few moments.
              </p>
            </Banner>
          </Box>
        )}
        
        {/* Show current subscription info */}
        {currentPlan.subscription && !justActivated && (
          <Box paddingBlockEnd="400">
            <Banner
              title="Your subscription is active"
              tone="info"
            >
              <p>
                You are currently subscribed to the <strong>{currentPlan.planName}</strong> plan.
              </p>
            </Banner>
          </Box>
        )}

        {/* Current Billing Cycle Card */}
        <Card>
          <Box padding="500">
            <BlockStack gap="500">
              {/* Header */}
              <InlineStack align="space-between" blockAlign="start">
                <BlockStack gap="200">
                  <Text variant="headingLg" as="h2" fontWeight="semibold">
                    Current billing cycle
                  </Text>
                  <InlineStack gap="200" blockAlign="center">
                    <Text variant="bodyMd" tone="subdued">
                      {currentPlan.billingCycle === "monthly" ? "Monthly billing" : currentPlan.billingCycle === "yearly" ? "Annual billing" : "Free plan"}
                    </Text>
                    <Badge tone={currentPlan.planId === "free" ? "info" : "success"}>
                      {currentPlan.planName}
                    </Badge>
                  </InlineStack>
                </BlockStack>
                <BlockStack gap="100" align="end">
                  <Text variant="bodySm" tone="subdued">
                    Running total
                  </Text>
                  <Text variant="heading2xl" as="p" fontWeight="bold">
                    {currentPlan.price}
                  </Text>
                </BlockStack>
              </InlineStack>

              <PolarisDiv />

              {/* Usage Section */}
              <BlockStack gap="400">
                {/* Products Usage */}
                <InlineStack gap="400" blockAlign="center" wrap={false}>
                  <div style={{ minWidth: "180px" }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      Products optimized
                    </Text>
                  </div>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <BlockStack gap="100">
                      <ProgressBar 
                        progress={productsPercentage} 
                        size="small"
                        tone={productsPercentage > 80 ? "critical" : productsPercentage > 50 ? "attention" : "success"}
                      />
                      <Text variant="bodySm" tone="subdued" alignment="end">
                        {currentPlan.usage.productsOptimized} of {currentPlan.usage.productsLimit}
                      </Text>
                    </BlockStack>
                  </div>
                </InlineStack>

                {/* AI Generations Usage */}
                <InlineStack gap="400" blockAlign="center" wrap={false}>
                  <div style={{ minWidth: "180px" }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      AI generations
                    </Text>
                  </div>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <BlockStack gap="100">
                      <ProgressBar 
                        progress={aiGenerationsPercentage} 
                        size="small"
                        tone={aiGenerationsPercentage > 80 ? "critical" : aiGenerationsPercentage > 50 ? "attention" : "success"}
                      />
                      <Text variant="bodySm" tone="subdued" alignment="end">
                        {currentPlan.usage.aiGenerations} of {currentPlan.usage.aiGenerationsLimit === -1 ? "Unlimited" : currentPlan.usage.aiGenerationsLimit}
                      </Text>
                    </BlockStack>
                  </div>
                </InlineStack>
              </BlockStack>

              <PolarisDiv />

              {/* Action */}
              <InlineStack gap="200" align="start">
                <Text variant="bodyMd" tone="subdued">
                  To make changes to your plan,
                </Text>
                <Button variant="plain" onClick={() => setView("select")}>
                  visit plan settings
                </Button>
              </InlineStack>
            </BlockStack>
          </Box>
        </Card>

        {/* Plan Summary Card */}
        <Box paddingBlockStart="400">
          <Card>
            <Box padding="500">
              <InlineStack align="space-between" blockAlign="center">
                <BlockStack gap="200">
                  <Text variant="bodyMd" fontWeight="semibold">
                    {currentPlan.accountName}
                  </Text>
                  <Text variant="bodySm" tone="subdued">
                    {currentPlan.planName} plan • {currentPlan.price}/month
                  </Text>
                </BlockStack>
                <Button onClick={() => setView("select")}>
                  Change plan
                </Button>
              </InlineStack>
            </Box>
          </Card>
        </Box>
      </div>
    </Page>
  );

  // Render Select Plan View
  const renderSelectPlanView = () => (
    <Page
      title="Select a plan"
      subtitle="Choose the perfect plan for your business needs"
      backAction={{
        content: "Back to billing",
        onAction: () => setView("current"),
      }}
    >
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto",
      }}>
        {isUpgrading && (
          <Box paddingBlockEnd="400">
            <Banner title="Redirecting to Shopify...">
              <BlockStack gap="200">
                <Text variant="bodyMd">
                  Please wait while we redirect you to Shopify to complete your subscription.
                </Text>
                <InlineStack gap="200" blockAlign="center">
                  <Spinner size="small" />
                  <Text variant="bodySm" tone="subdued">
                    Do not close this window
                  </Text>
                </InlineStack>
              </BlockStack>
            </Banner>
          </Box>
        )}

        {/* Billing Toggle */}
        <Box paddingBlockEnd="600">
          <InlineStack align="center">
            <div style={{ 
              display: "inline-flex",
              backgroundColor: "#f6f6f7",
              borderRadius: "5px",
              padding: "2px",
              gap: "2px",
            }}>
              <button
                onClick={() => setBillingCycle("monthly")}
                disabled={isUpgrading}
                style={{
                  padding: "5px 12px",
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: billingCycle === "monthly" ? "#ffffff" : "transparent",
                  color: billingCycle === "monthly" ? "#202223" : "#6d7175",
                  fontWeight: billingCycle === "monthly" ? "600" : "500",
                  fontSize: "12px",
                  cursor: isUpgrading ? "not-allowed" : "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: billingCycle === "monthly" ? "0 1px 1px rgba(0,0,0,0.06)" : "none",
                }}
              >
                Pay monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                disabled={isUpgrading}
                style={{
                  padding: "5px 12px",
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: billingCycle === "yearly" ? "#ffffff" : "transparent",
                  color: billingCycle === "yearly" ? "#202223" : "#6d7175",
                  fontWeight: billingCycle === "yearly" ? "600" : "500",
                  fontSize: "12px",
                  cursor: isUpgrading ? "not-allowed" : "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: billingCycle === "yearly" ? "0 1px 1px rgba(0,0,0,0.06)" : "none",
                }}
              >
                Pay yearly (Save 20%)
              </button>
            </div>
          </InlineStack>
        </Box>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {plans.map((plan) => {
            const isCurrent = isPlanCurrent(plan.id);
            
            return (
              <Card
                key={plan.id}
                padding="0"
                background="bg-surface"
              >
                <Box padding="500">
                  <BlockStack gap="400">
                    {/* Plan Header */}
                    <BlockStack gap="200">
                      <InlineStack gap="200" align="space-between" blockAlign="start">
                        <Text variant="headingMd" as="h3" tone="subdued">
                          {plan.tier}
                        </Text>
                        {plan.badge && (
                          <Badge tone="success">{plan.badge}</Badge>
                        )}
                        {isCurrent && (
                          <Badge tone="info">Current Plan</Badge>
                        )}
                      </InlineStack>
                      
                      <Text variant="heading2xl" as="h2" fontWeight="bold">
                        {plan.name}
                      </Text>
                    </BlockStack>

                    {/* Pricing */}
                    <BlockStack gap="100">
                      <InlineStack gap="100" align="start" blockAlign="baseline">
                        <Text variant="heading3xl" as="p" fontWeight="bold">
                          {getCurrentPrice(plan)}
                        </Text>
                        {plan.id !== "free" && (
                          <Text variant="bodyLg" tone="subdued">
                            {billingCycle === "monthly" ? "/ month" : "/ year"}
                          </Text>
                        )}
                      </InlineStack>
                      {getPriceSubtext(plan) && (
                        <Text variant="bodySm" tone="subdued">
                          {getPriceSubtext(plan)}
                        </Text>
                      )}
                    </BlockStack>

                    {/* CTA Button */}
                    <Button
                      variant={plan.primary ? "primary" : "secondary"}
                      size="large"
                      fullWidth
                      disabled={isCurrent || isUpgrading || plan.id === "free"}
                      onClick={() => handleUpgrade(plan.id)}
                      loading={isUpgrading}
                    >
                      {isCurrent ? "Current Plan" : plan.cta}
                    </Button>

                    {/* Features List */}
                    <BlockStack gap="300">
                      {plan.features.map((feature, idx) => (
                        <InlineStack key={idx} gap="300" align="start">
                          <div style={{ paddingTop: "2px" }}>
                            <Icon source={CheckIcon} tone="success" />
                          </div>
                          <Text variant="bodyMd" as="p">
                            {feature}
                          </Text>
                        </InlineStack>
                      ))}
                    </BlockStack>
                  </BlockStack>
                </Box>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <Box paddingBlockStart="800" paddingBlockEnd="400">
          <BlockStack gap="600">
            <BlockStack gap="200" align="center">
              <Text variant="headingXl" as="h2" alignment="center" fontWeight="bold">
                Compare plans
              </Text>
              <Text variant="bodyLg" tone="subdued" alignment="center">
                Choose the right plan for your business
              </Text>
            </BlockStack>

            <Card>
              <Box padding="500">
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #e1e3e5" }}>
                        <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: "600", fontSize: "13px", width: "35%" }}>
                          <Text variant="bodySm" fontWeight="semibold">Features</Text>
                        </th>
                        <th style={{ textAlign: "center", padding: "12px 8px", fontWeight: "600", fontSize: "13px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Free</Text>
                        </th>
                        <th style={{ textAlign: "center", padding: "12px 8px", fontWeight: "600", fontSize: "13px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Starter</Text>
                        </th>
                        <th style={{ textAlign: "center", padding: "12px 8px", fontWeight: "600", fontSize: "13px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Pro</Text>
                        </th>
                        <th style={{ textAlign: "center", padding: "12px 8px", fontWeight: "600", fontSize: "13px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Business</Text>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Basic Limits */}
                      <tr style={{ backgroundColor: "#f6f6f7" }}>
                        <td colSpan={5} style={{ padding: "10px 8px", fontWeight: "600", fontSize: "12px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Basic Limits</Text>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e1e3e5" }}>
                        <td style={{ padding: "10px 8px" }}>
                          <Text variant="bodySm">Products can be optimized</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm">10</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm">50</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" fontWeight="semibold">250</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" fontWeight="semibold">1,000</Text>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e1e3e5" }}>
                        <td style={{ padding: "10px 8px" }}>
                          <Text variant="bodySm">AI generations / month</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm">20</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm">100</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" fontWeight="semibold">500</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Unlimited</Text>
                        </td>
                      </tr>

                      {/* Core Features */}
                      <tr style={{ backgroundColor: "#f6f6f7" }}>
                        <td colSpan={5} style={{ padding: "10px 8px", fontWeight: "600", fontSize: "12px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Core Features</Text>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e1e3e5" }}>
                        <td style={{ padding: "10px 8px" }}>
                          <Text variant="bodySm">Manual optimization</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Icon source={CheckIcon} tone="success" />
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Icon source={CheckIcon} tone="success" />
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Icon source={CheckIcon} tone="success" />
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Icon source={CheckIcon} tone="success" />
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e1e3e5" }}>
                        <td style={{ padding: "10px 8px" }}>
                          <Text variant="bodySm">AI Segmentation</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" tone="subdued">—</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" tone="subdued" fontWeight="medium">Preview</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Icon source={CheckIcon} tone="success" />
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Icon source={CheckIcon} tone="success" />
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #e1e3e5" }}>
                        <td style={{ padding: "10px 8px" }}>
                          <Text variant="bodySm">Bulk Optimization</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" tone="subdued">—</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" tone="subdued">—</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" tone="subdued">—</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Icon source={CheckIcon} tone="success" />
                        </td>
                      </tr>

                      {/* Support */}
                      <tr style={{ backgroundColor: "#f6f6f7" }}>
                        <td colSpan={5} style={{ padding: "10px 8px", fontWeight: "600", fontSize: "13px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Support</Text>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "10px 8px" }}>
                          <Text variant="bodySm">Support level</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm">Community</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm">Standard</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Priority</Text>
                        </td>
                        <td style={{ textAlign: "center", padding: "10px 8px" }}>
                          <Text variant="bodySm" fontWeight="semibold">Premium</Text>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Box>
            </Card>
          </BlockStack>
        </Box>

        {/* Additional Info */}
        <Box paddingBlockStart="600" paddingBlockEnd="400">
          <BlockStack gap="400" align="center">
            <Text variant="bodyLg" alignment="center" tone="subdued">
              All plans include 1-click Shopify sync and AI-powered content generation
            </Text>
            <Text variant="bodyMd" alignment="center" tone="subdued">
              Need a custom plan for your enterprise? <a href="#" style={{ color: "#008060", textDecoration: "none", fontWeight: "600" }}>Contact our sales team</a>
            </Text>
          </BlockStack>
        </Box>
      </div>
    </Page>
  );

  // Main return - switch between views
  return (
    <AppProvider i18n={enTranslations}>
      {view === "current" ? renderCurrentPlanView() : renderSelectPlanView()}
    </AppProvider>
  );
}
