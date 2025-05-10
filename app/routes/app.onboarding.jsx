// app/routes/app.onboarding.jsx
import { useOnboarding } from "../hooks/useOnboarding";
import {
  Modal,
  Frame,
  Page,
  Button,
  Text,
  BlockStack,
  ProgressBar,
  Card,
  Layout,
  List,
  Box,
  Banner,
  InlineGrid,
  InlineStack,
} from "@shopify/polaris";
import { useState } from "react";
import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalIcon } from "@shopify/polaris-icons";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  // // Kiểm tra nếu đã onboarding thì chuyển hướng sang /app
  // const shop = session.shop;
  // const existing = await db.shop.findUnique({ where: { shop } });
  // if (existing?.onboarded) return redirect("/app");

  return null;
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  await db.shop.upsert({
    where: { shop },
    update: { onboarded: true },
    create: { shop, onboarded: true },
  });

  return redirect("/app");
};

export default function Onboarding() {
  const { showOnboarding, handleCloseOnboarding } = useOnboarding();
  const [active, setActive] = useState(true);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setStep(1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(0);
  };

  return (
    <Frame>
      <ProgressBar progress={(step + 1) * 40} tone="success" size="small" />
      <Page fullWidth>
        <div style={{ position: "relative", overflow: "hidden", height: 600 }}>
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <motion.div
                key="screen1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                style={{ position: "absolute", width: "100%" }}
              >
                <Layout>
                  <Layout.Section variant="oneHalf">
                    {/* Image or visual placeholder */}
                    <Box background="bg-surface" minHeight="500px" />
                  </Layout.Section>

                  <Layout.Section variant="oneHalf">
                    <BlockStack gap={1200}>
                      <Text variant="headingXl" as="h4" fontWeight="semibold">
                        🚀 Turn every product into a sales machine with DropEase
                      </Text>

                      <List type="bullet">
                        <List.Item>
                          <Text variant="bodyLg">
                            Auto-build stunning Product Pages from your listings
                          </Text>
                        </List.Item>
                        <List.Item>
                          <Text variant="bodyLg">
                            Instantly boost conversions with:
                          </Text>
                          <List type="bullet">
                            <List.Item>
                              <Text variant="bodyLg">
                                Payment & Free Shipping tags
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text variant="bodyLg">Feature highlights</Text>
                            </List.Item>
                            <List.Item>
                              <Text variant="bodyLg">
                                Trusted review quotes
                              </Text>
                            </List.Item>
                            <List.Item>
                              <Text variant="bodyLg">
                                Sticky Add to Cart bar
                              </Text>
                            </List.Item>
                          </List>
                        </List.Item>
                        <List.Item>
                          <Text variant="bodyLg">
                            Lightning-fast setup — ready for ads,{" "}
                            <strong>no coding needed!</strong>
                          </Text>
                        </List.Item>
                      </List>

                      <Box>
                        <Button
                          variant="primary"
                          size="large"
                          onClick={handleNext}
                        >
                          Get Started
                        </Button>
                      </Box>
                    </BlockStack>
                  </Layout.Section>
                </Layout>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="screen2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                style={{ position: "absolute", width: "100%" }}
              >
                <Layout>
                  <Layout.Section variant="oneHalf">
                    {/* Image or visual placeholder */}
                    <Box background="bg-surface" minHeight="500px" />
                  </Layout.Section>

                  <Layout.Section variant="oneHalf">
                    <Box minHeight="500px">
                      <BlockStack gap={1200} align="space-between">
                        <BlockStack gap={400}>
                          <Text
                            variant="headingXl"
                            as="h4"
                            fontWeight="semibold"
                          >
                            Enable DropEase App on your theme
                          </Text>
                          <BlockStack gap={400}>
                            <Banner
                              title="App embed is enable"
                              tone="success"
                              ina
                            />
                            <Text variant="bodyLg">
                              Make sure DropEase is active to display your
                              Product page correctly.
                            </Text>
                            <List type="number">
                              <List.Item>
                                <Text variant="bodyLg">
                                  Click the button below to open your Shopify
                                  Theme Editor.
                                </Text>
                              </List.Item>
                              <List.Item>
                                <Text variant="bodyLg">
                                  Turn DropEase <strong>toggle ON.</strong>
                                </Text>
                              </List.Item>
                              <List.Item>
                                <Text variant="bodyLg">
                                  Click Save <strong>no coding needed!</strong>{" "}
                                  in the top-right corner.
                                </Text>
                              </List.Item>
                            </List>
                          </BlockStack>
                        </BlockStack>
                        <Box>
                          <Button
                            variant="primary"
                            size="large"
                            icon={ExternalIcon}
                          >
                            Enable App Embeded
                          </Button>
                        </Box>
                        <BlockStack gap={1200}>
                          <BlockStack align="end">
                            <InlineStack align="end">
                              <Button variant="secondary" size="large">
                                Next
                              </Button>
                            </InlineStack>
                          </BlockStack>
                        </BlockStack>
                      </BlockStack>
                    </Box>
                  </Layout.Section>
                </Layout>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Page>
    </Frame>
  );
}
