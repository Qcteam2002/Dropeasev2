import React, { useState } from "react";
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
  Divider,
  Layout,
} from "@shopify/polaris";
import { CheckIcon, StarFilledIcon } from "@shopify/polaris-icons";
import enTranslations from "@shopify/polaris/locales/en.json";

// Helper function to bold numbers and specific text in features
const formatFeatureText = (text) => {
  // Bold numbers followed by specific words (e.g., "100 product pages")
  const parts = text.split(/((?:\d+|all)(?:\s+[\w\s-]+)(?:pages|sections|block|branding|conversions))/i);
  
  if (parts.length === 1) return text;
  
  return parts.map((part, index) => {
    if (index % 2 === 1) { // This is a matched part
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
};

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For new users trying the app",
      features: [
        "Optimize up to 2 product pages",
        "Add Payment Icon section",
        "Add Feature Highlight section",
        "Show Product Rating block",
        "Publish with watermark",
        "Sticky Bar",
      ],
      cardRate: "Start for free — test the full product flow",
      button: "Select Free",
      highlight: false,
    },
    {
      name: "Basic",
      price: "$9",
      description: "For new brands optimizing small stores",
      features: [
        "Everything in Free, plus",
        "Optimize up to 20 product pages",
        "Remove watermark for professional branding",
        "Unlock full Sticky Bar to boost conversions",
        "Access to all current and future design sections",
      ],
      cardRate: "Everything you need to launch high-converting pages",
      button: "Select Basic",
      highlight: true,
    },
    {
      name: "Advanced",
      price: "$29",
      description: "For growing brands and power users",
      features: [
        "Everything in Basic, plus:",
        "Optimize up to 100 product pages",
        "Priority support within 24 hours",
        "Early access to new AI features & smart blocks",
        "Scale faster with smarter product pages",
      ],
      cardRate: "Power tools to scale faster and save hours per week",
      button: "Select Advanced",
      highlight: false,
    },
  ];

  const features = [
    "Optimize content with AI",
    "Add trusted design sections instantly",
    "No code, no effort, just results",
  ];

  return (
    <AppProvider i18n={enTranslations}>
      <Page fullWidth>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
          <Box paddingBlockStart="300" paddingBlockEnd="300" paddingInlineStart="300" paddingInlineEnd="300">
            <InlineStack align="space-between">
              <InlineStack gap="200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Text variant="headingMd" as="h1">
                  Pick your plan
                </Text>
              </InlineStack>
            </InlineStack>
          </Box>

          <Box padding="600" paddingBlockEnd="300">
            <BlockStack gap="300" align="center">
              <BlockStack gap="100" align="center">
                <Text variant="headingXl" as="h2" alignment="center">
                  Everything you need to turn products
                </Text>
                <Text variant="headingXl" as="h2" alignment="center">
                  into high-converting pages
                </Text>
              </BlockStack>
              <InlineStack gap="600" align="center" wrap>
                {features.map((feature, index) => (
                  <InlineStack key={index} gap="200" align="center">
                    <Icon source={CheckIcon} color="highlight" />
                    <Text variant="bodyMd">
                      {feature}
                    </Text>
                  </InlineStack>
                ))}
              </InlineStack>
            </BlockStack>
          </Box>

          <Box padding="300">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              margin: '0 auto',
              // marginTop: '40px'
            }}>
              {plans.map((plan, idx) => (
                <div key={`${plan.name}-${idx}`} style={{ width: '100%', position: 'relative' }}>
                  <Card padding="0">
                    <Box padding="400">
                      <BlockStack gap="300">
                        {/* Plan Name */}
                        <div style={{ minHeight: '32px' }}>
                          <InlineStack gap="200" align="left">
                            <Text variant="heading2xl" as="h3">
                              {plan.name}
                            </Text>
                            {plan.highlight && (
                              <span
                                style={{
                                  backgroundColor: '#E3F5E5',
                                  color: '#108043',
                                  padding: '2px 12px',
                                  borderRadius: '20px',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  marginLeft: '8px',
                                  height: '18px',
                                  marginTop: '10px'
                                }}
                              >
                                Most popular
                              </span>
                            )}
                          </InlineStack>
                        </div>

                        {/* Description */}
                        <div style={{ minHeight: '10px', marginTop: '-8px' }}>
                          <Text variant="bodySm" tone="subdued">
                            {plan.description}
                          </Text>
                        </div>

                        {/* Price Block */}
                        <div style={{ minHeight: '50px', textAlign: 'left' }}>
                          <BlockStack gap="100" align="start">
                            <div style={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              alignItems: 'flex-start', 
                              gap: '4px',
                              width: '100%',
                              textAlign: 'left'
                            }}>
                              {plan.originalPrice && (
                                <Text variant="bodyMd" tone="subdued" textDecorationLine="line-through">
                                  {plan.originalPrice}
                                </Text>
                              )}
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', justifyContent: 'flex-start' }}>
                                <Text variant="heading2xl" as="h2" fontWeight="bold">
                                  {plan.price}
                                </Text>
                                <Text variant="bodySm" tone="subdued">
                                  USD/month
                                </Text>
                              </div>
                            </div>
                            {plan.discount && (
                              <Text variant="bodySm" tone="subdued">
                                {plan.discount}
                              </Text>
                            )}
                          </BlockStack>
                        </div>

                        {/* Button */}
                        <div style={{ minHeight: '36px' }}>
                          <Button
                            variant="primary"
                            size="large"
                            fullWidth
                          >
                            {plan.button}
                          </Button>
                        </div>

                        {/* Card Rates */}
                        {/* <Box
                          padding="300"
                          background="bg-surface-secondary"
                          borderRadius="base"
                          style={{ minHeight: '60px' }}
                        >
                          <BlockStack gap="100">
                            <Text variant="bodyMd" as="p" fontWeight="semibold">
                              {plan.cardRate}
                            </Text>
                          </BlockStack>
                        </Box> */}

                        {/* Features */}
                        <div style={{ minHeight: '160px' }}>
                          <BlockStack gap="200">
                            {plan.features.map((feature, featureIdx) => (
                              <InlineStack key={featureIdx} gap="200" align="start">
                                <span style={{ color: "#6d7175" }}>✓</span>
                                <Text variant="bodySm">
                                  {formatFeatureText(feature)}
                                </Text>
                              </InlineStack>
                            ))}
                          </BlockStack>
                        </div>
                      </BlockStack>
                    </Box>
                  </Card>
                </div>
              ))}
            </div>
          </Box>
        </div>
      </Page>
    </AppProvider>
  );
}
