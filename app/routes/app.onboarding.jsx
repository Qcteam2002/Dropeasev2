// app/routes/app.onboarding.jsx
import { useOnboarding } from '../hooks/useOnboarding';
import { Modal, Frame, Page, Button, Text, BlockStack } from "@shopify/polaris";
import { useState } from "react";
import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  // Kiểm tra nếu đã onboarding thì chuyển hướng sang /app
  const shop = session.shop;
  const existing = await db.shop.findUnique({ where: { shop } });
  if (existing?.onboarded) return redirect("/app");

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

  return (
    <Frame>
      <Page>
        <Modal
          open={showOnboarding && active}
          onClose={() => {
            setActive(false);
            handleCloseOnboarding();
          }}
          title="Welcome to EasyD"
          primaryAction={{
            content: "Get Started",
            onAction: () => {
              setActive(false);
              handleCloseOnboarding();
            },
          }}
        >
          <Modal.Section>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Welcome to EasyD - Your Product Management Solution
              </Text>
              <Text as="p" variant="bodyMd">
                EasyD helps you manage your products efficiently. Here's what you can do:
              </Text>
              <BlockStack gap="200">
                <Text as="p" variant="bodyMd">
                  • Import products from various platforms
                </Text>
                <Text as="p" variant="bodyMd">
                  • Optimize product descriptions and images
                </Text>
                <Text as="p" variant="bodyMd">
                  • Manage product variants and pricing
                </Text>
                <Text as="p" variant="bodyMd">
                  • Push products directly to your Shopify store
                </Text>
              </BlockStack>
              <Text as="p" variant="bodyMd">
                Let's get started with managing your products!
              </Text>
            </BlockStack>
          </Modal.Section>
        </Modal>
      </Page>
    </Frame>
  );
}
