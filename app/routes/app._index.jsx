import React, { useState } from "react";
import {
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
  Banner,
  Link,
  EmptyState,
  Grid,
  Layout,
} from "@shopify/polaris";
import {
  ProductIcon,
  MagicIcon,
  StarFilledIcon,
  ChartLineIcon,
  ChartHorizontalIcon,
  CheckIcon,
  ClockIcon,
} from "@shopify/polaris-icons";
import { useNavigate } from "@remix-run/react";

export default function HomePage() {
  const navigate = useNavigate();

  // Mock data - Replace with real data from API/loader
  const userData = {
    isNew: false, // true for onboarding, false for returning user
    accountName: "My Shopify Store",
    plan: "Free",
    usage: {
      productsOptimized: 3,
      productsLimit: 10,
      aiGenerations: 8,
      aiGenerationsLimit: 20,
    },
    recentActivity: [
      { id: 1, action: "Optimized", product: "iPhone 15 Pro Max", time: "2 hours ago" },
      { id: 2, action: "AI Generated", product: "MacBook Air M3", time: "5 hours ago" },
      { id: 3, action: "Optimized", product: "AirPods Pro", time: "1 day ago" },
    ],
    completedSteps: 2,
    totalSteps: 4,
  };

  // Calculate percentages
  const productsPercentage = (userData.usage.productsOptimized / userData.usage.productsLimit) * 100;
  const aiPercentage = (userData.usage.aiGenerations / userData.usage.aiGenerationsLimit) * 100;
  const onboardingProgress = (userData.completedSteps / userData.totalSteps) * 100;

  // Getting Started Steps
  const gettingStartedSteps = [
    {
      id: 1,
      title: "Connect your store",
      description: "Link your Shopify store to get started",
      completed: true,
      action: () => {},
    },
    {
      id: 2,
      title: "Optimize your first product",
      description: "Use AI to create compelling product descriptions",
      completed: true,
      action: () => navigate("/app/products"),
    },
    {
      id: 3,
      title: "Discover customer segments",
      description: "Unlock AI-powered customer insights",
      completed: false,
      action: () => navigate("/app/pricing"),
    },
    {
      id: 4,
      title: "Upgrade to Pro",
      description: "Get full access to AI Segmentation",
      completed: false,
      action: () => navigate("/app/pricing"),
    },
  ];

  // Render Onboarding View (New User)
  if (userData.isNew) {
    return (
      <Page title="Welcome to Dropease! 🎉">
        <BlockStack gap="500">
          {/* Welcome Banner */}
          <Banner tone="info">
            <BlockStack gap="200">
              <Text variant="headingMd" as="h2" fontWeight="semibold">
                Your store is connected!
              </Text>
              <Text variant="bodyMd">
                Let's optimize your first product and see the AI magic in action.
              </Text>
            </BlockStack>
          </Banner>

          {/* Quick Start Guide */}
          <Card>
            <BlockStack gap="500">
              <BlockStack gap="200">
                <Text variant="headingLg" as="h2" fontWeight="bold">
                  Get started in 3 easy steps
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Set up your store for maximum conversions
                </Text>
              </BlockStack>

              {/* Steps */}
              <BlockStack gap="400">
                {/* Step 1 */}
                <Card>
                  <Box padding="400">
                    <InlineStack gap="400" align="start" blockAlign="start">
                      <div style={{ 
                        backgroundColor: "#303030", 
                        borderRadius: "50%", 
                        width: "40px", 
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "18px",
                        flexShrink: 0,
                      }}>
                        1
                      </div>
                      <Box width="100%">
                        <BlockStack gap="300">
                          <Text variant="headingMd" as="h3" fontWeight="semibold">
                            Browse your products
                          </Text>
                          <Text variant="bodyMd" tone="subdued">
                            See all your Shopify products in one place
                          </Text>
                          <div>
                            <Button onClick={() => navigate("/app/products")}>
                              View products
                            </Button>
                          </div>
                        </BlockStack>
                      </Box>
                    </InlineStack>
                  </Box>
                </Card>

                {/* Step 2 */}
                <Card>
                  <Box padding="400">
                    <InlineStack gap="400" align="start" blockAlign="start">
                      <div style={{ 
                        backgroundColor: "#8C9196", 
                        borderRadius: "50%", 
                        width: "40px", 
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "18px",
                        flexShrink: 0,
                      }}>
                        2
                      </div>
                      <Box width="100%">
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h3" fontWeight="semibold">
                            Optimize with AI
                          </Text>
                          <Text variant="bodyMd" tone="subdued">
                            Let AI create compelling descriptions that convert
                          </Text>
                        </BlockStack>
                      </Box>
                    </InlineStack>
                  </Box>
                </Card>

                {/* Step 3 */}
                <Card>
                  <Box padding="400">
                    <InlineStack gap="400" align="start" blockAlign="start">
                      <div style={{ 
                        backgroundColor: "#8C9196", 
                        borderRadius: "50%", 
                        width: "40px", 
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "18px",
                        flexShrink: 0,
                      }}>
                        3
                      </div>
                      <Box width="100%">
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h3" fontWeight="semibold">
                            Push to Shopify
                          </Text>
                          <Text variant="bodyMd" tone="subdued">
                            Sync optimized content to your store with 1-click
                          </Text>
                        </BlockStack>
                      </Box>
                    </InlineStack>
                  </Box>
                </Card>
              </BlockStack>
            </BlockStack>
          </Card>

          {/* Feature Highlights */}
          <Layout>
            <Layout.Section variant="oneThird">
              <Card>
                <Box padding="400">
                  <BlockStack gap="300">
                    <Icon source={MagicIcon} tone="base" />
                    <Text variant="headingMd" as="h3" fontWeight="semibold">
                      AI-Powered Content
                    </Text>
                    <Text variant="bodyMd" tone="subdued">
                      Generate product descriptions, titles, and more with advanced AI
                    </Text>
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <Card>
                <Box padding="400">
                  <BlockStack gap="300">
                    <Icon source={StarFilledIcon} tone="base" />
                    <Text variant="headingMd" as="h3" fontWeight="semibold">
                      Customer Segments
                    </Text>
                    <Text variant="bodyMd" tone="subdued">
                      Discover who your customers are and optimize for them
                    </Text>
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <Card>
                <Box padding="400">
                  <BlockStack gap="300">
                    <Icon source={ChartHorizontalIcon} tone="base" />
                    <Text variant="headingMd" as="h3" fontWeight="semibold">
                      Bulk Optimization
                    </Text>
                    <Text variant="bodyMd" tone="subdued">
                      Optimize hundreds of products at once (Pro plan)
                    </Text>
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </Page>
    );
  }

  // Render Dashboard View (Returning User)
  return (
    <Page
      title={`Welcome back, ${userData.accountName}!`}
      subtitle="Here's what's happening with your store"
    >
      <BlockStack gap="500">
        {/* Getting Started Progress */}
        {userData.completedSteps < userData.totalSteps && (
          <Banner>
            <BlockStack gap="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text variant="headingMd" as="h2" fontWeight="semibold">
                  Complete your setup
                </Text>
                <Text variant="bodyMd" fontWeight="semibold">
                  {userData.completedSteps} of {userData.totalSteps} completed
                </Text>
              </InlineStack>
              <ProgressBar progress={onboardingProgress} size="small" />
            </BlockStack>
          </Banner>
        )}

        {/* Stats Overview */}
        <Layout>
          {/* Products Optimized */}
          <Layout.Section variant="oneThird">
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Icon source={ProductIcon} tone="base" />
                    <Badge>{userData.plan}</Badge>
                  </InlineStack>
                  <BlockStack gap="200">
                    <Text variant="headingSm" tone="subdued">
                      Products optimized
                    </Text>
                    <Text variant="heading2xl" as="p" fontWeight="bold">
                      {userData.usage.productsOptimized}
                    </Text>
                    <Text variant="bodySm" tone="subdued">
                      of {userData.usage.productsLimit} available
                    </Text>
                  </BlockStack>
                  <ProgressBar 
                    progress={productsPercentage} 
                    size="small"
                  />
                  {productsPercentage > 80 && (
                    <Text variant="bodySm" tone="critical">
                      Running low! <Link onClick={() => navigate("/app/pricing")}>Upgrade plan</Link>
                    </Text>
                  )}
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>

          {/* AI Generations */}
          <Layout.Section variant="oneThird">
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Icon source={MagicIcon} tone="base" />
                    <Badge>AI</Badge>
                  </InlineStack>
                  <BlockStack gap="200">
                    <Text variant="headingSm" tone="subdued">
                      AI generations used
                    </Text>
                    <Text variant="heading2xl" as="p" fontWeight="bold">
                      {userData.usage.aiGenerations}
                    </Text>
                    <Text variant="bodySm" tone="subdued">
                      of {userData.usage.aiGenerationsLimit} this month
                    </Text>
                  </BlockStack>
                  <ProgressBar 
                    progress={aiPercentage} 
                    size="small"
                  />
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>

          {/* Quick Action Card */}
          <Layout.Section variant="oneThird">
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <Icon source={StarFilledIcon} tone="base" />
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h3" fontWeight="semibold">
                      Unlock AI Segmentation
                    </Text>
                    <Text variant="bodySm" tone="subdued">
                      Discover your ideal customers and optimize content for them
                    </Text>
                  </BlockStack>
                  <Button variant="primary" onClick={() => navigate("/app/pricing")}>
                    Upgrade to Pro
                  </Button>
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Getting Started Checklist */}
        {userData.completedSteps < userData.totalSteps && (
          <Card>
            <Box padding="500">
              <BlockStack gap="400">
                <Text variant="headingLg" as="h2" fontWeight="bold">
                  Getting started checklist
                </Text>
                <BlockStack gap="300">
                  {gettingStartedSteps.map((step) => (
                    <InlineStack key={step.id} gap="400" align="space-between" blockAlign="center">
                      <InlineStack gap="300" blockAlign="center">
                        <div style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: step.completed ? "#303030" : "#E3E5E7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          {step.completed && (
                            <Icon source={CheckIcon} tone="base" />
                          )}
                        </div>
                        <BlockStack gap="050">
                          <Text variant="bodyMd" fontWeight={step.completed ? "regular" : "semibold"}>
                            {step.title}
                          </Text>
                          <Text variant="bodySm" tone="subdued">
                            {step.description}
                          </Text>
                        </BlockStack>
                      </InlineStack>
                      {!step.completed && (
                        <Button size="slim" onClick={step.action}>
                          Start
                        </Button>
                      )}
                    </InlineStack>
                  ))}
                </BlockStack>
              </BlockStack>
            </Box>
          </Card>
        )}

        {/* Two Column Layout */}
        <Layout>
          {/* Recent Activity */}
          <Layout.Section variant="twoThirds">
            <Card>
              <Box padding="500">
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text variant="headingMd" as="h2" fontWeight="bold">
                      Recent activity
                    </Text>
                    <Button variant="plain" onClick={() => navigate("/app/products")}>
                      View all
                    </Button>
                  </InlineStack>

                  {userData.recentActivity.length > 0 ? (
                    <BlockStack gap="300">
                      {userData.recentActivity.map((activity) => (
                        <InlineStack key={activity.id} gap="300" align="start" blockAlign="start">
                          <Icon source={activity.action === "Optimized" ? ProductIcon : MagicIcon} tone="base" />
                          <Box width="100%">
                            <BlockStack gap="100">
                              <Text variant="bodyMd" fontWeight="medium">
                                {activity.action} "{activity.product}"
                              </Text>
                              <InlineStack gap="100" blockAlign="center">
                                <Icon source={ClockIcon} tone="subdued" />
                                <Text variant="bodySm" tone="subdued">
                                  {activity.time}
                                </Text>
                              </InlineStack>
                            </BlockStack>
                          </Box>
                        </InlineStack>
                      ))}
                    </BlockStack>
                  ) : (
                    <EmptyState
                      heading="No activity yet"
                      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    >
                      <Text variant="bodyMd" tone="subdued">
                        Start optimizing products to see your activity here
                      </Text>
                    </EmptyState>
                  )}
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>

          {/* Quick Actions */}
          <Layout.Section variant="oneThird">
            <Card>
              <Box padding="500">
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2" fontWeight="bold">
                    Quick actions
                  </Text>
                  <BlockStack gap="300">
                    <Button 
                      icon={ProductIcon}
                      fullWidth 
                      textAlign="start"
                      onClick={() => navigate("/app/products")}
                    >
                      Optimize products
                    </Button>
                    <Button 
                      icon={StarFilledIcon}
                      fullWidth 
                      textAlign="start"
                      onClick={() => navigate("/app/pricing")}
                    >
                      Discover segments
                    </Button>
                    <Button 
                      icon={ChartLineIcon}
                      fullWidth 
                      textAlign="start"
                      onClick={() => navigate("/app/pricing")}
                    >
                      View analytics
                    </Button>
                  </BlockStack>
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Upgrade Prompt (if on Free plan) */}
        {userData.plan === "Free" && (
          <Card>
            <Box padding="500">
              <InlineStack align="space-between" blockAlign="center">
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h2" fontWeight="bold">
                    Ready to unlock full potential?
                  </Text>
                  <Text variant="bodyMd" tone="subdued">
                    Upgrade to Pro and get AI Customer Segmentation, 500 AI generations/month, and priority support
                  </Text>
                </BlockStack>
                <Button variant="primary" size="large" onClick={() => navigate("/app/pricing")}>
                  View plans
                </Button>
              </InlineStack>
            </Box>
          </Card>
        )}
      </BlockStack>
    </Page>
  );
}
