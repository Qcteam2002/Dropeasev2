import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useState, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  FormLayout,
  Checkbox,
  Button,
  Banner,
  Text,
  BlockStack,
  InlineStack,
  Link
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import db from "../db.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  
  // Tạo deeplink URL để add widget vào theme
  const deeplinkUrl = `https://${session.shop}/admin/themes/current/editor?template=product&addAppBlockId=${process.env.SHOPIFY_APP_ID}/tryon-widget-block&target=newAppsSection`;
  
  // Lấy cấu hình hiện tại từ database (nếu có)
  let widgetConfig = await db.widgetConfig.findUnique({
    where: { shopDomain: session.shop }
  });

  if (!widgetConfig) {
    // Tạo config mặc định nếu chưa có
    widgetConfig = await db.widgetConfig.create({
      data: {
        shopDomain: session.shop,
        buttonText: "👗 Virtual Try-On",
        colorHex: "#3B82F6",
        position: "AFTER_ATC",
        whiteLabel: false
      }
    });
  }

  // Convert BigInt to string for JSON serialization
  const serializedConfig = {
    ...widgetConfig,
    id: widgetConfig.id.toString(),
    createdAt: widgetConfig.createdAt.toISOString(),
    updatedAt: widgetConfig.updatedAt.toISOString()
  };

  return json({
    deeplinkUrl,
    widgetConfig: serializedConfig,
    shopDomain: session.shop
  });
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  const enabled = formData.get("enabled") === "true";
  const buttonText = formData.get("buttonText") || "👗 Virtual Try-On";
  const colorHex = formData.get("colorHex") || "#3B82F6";
  const position = formData.get("position") || "AFTER_ATC";

  try {
    // Cập nhật hoặc tạo mới widget config
    const updatedConfig = await db.widgetConfig.upsert({
      where: { shopDomain: session.shop },
      update: {
        buttonText,
        colorHex,
        position,
        enabled: enabled
      },
      create: {
        shopDomain: session.shop,
        buttonText,
        colorHex,
        position,
        enabled: enabled,
        whiteLabel: false
      }
    });

    return json({
      success: true,
      message: "Try-On widget settings saved successfully!",
      config: {
        ...updatedConfig,
        id: updatedConfig.id.toString(),
        createdAt: updatedConfig.createdAt.toISOString(),
        updatedAt: updatedConfig.updatedAt.toISOString()
      }
    });
  } catch (error) {
    return json({
      success: false,
      error: "Failed to save widget settings: " + error.message
    }, { status: 500 });
  }
};

export default function TryOnWidgetSettings() {
  const { deeplinkUrl, widgetConfig, shopDomain } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();

  const [enabled, setEnabled] = useState(widgetConfig?.enabled || false);
  const [buttonText, setButtonText] = useState(widgetConfig?.buttonText || "👗 Virtual Try-On");
  const [colorHex, setColorHex] = useState(widgetConfig?.colorHex || "#3B82F6");

  const handleSave = useCallback(() => {
    const formData = new FormData();
    formData.append("enabled", enabled.toString());
    formData.append("buttonText", buttonText);
    formData.append("colorHex", colorHex);
    formData.append("position", "AFTER_ATC");
    
    submit(formData, { method: "post" });
  }, [enabled, buttonText, colorHex, submit]);

  return (
    <Page
      title="Virtual Try-On Widget"
      subtitle="Configure your Virtual Try-On button for product pages"
      backAction={{ content: "Widgets", url: "/app/widget" }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Widget Setup
              </Text>

              {actionData?.success && (
                <Banner status="success" title="Success">
                  {actionData.message}
                </Banner>
              )}

              {actionData?.error && (
                <Banner status="critical" title="Error">
                  {actionData.error}
                </Banner>
              )}

              <BlockStack gap="300">
                <Text variant="bodyMd">
                  First, add the Virtual Try-On widget to your theme, then configure the settings below.
                </Text>

                <InlineStack gap="200">
                  <Button
                    variant="primary"
                    url={deeplinkUrl}
                    external
                    target="_blank"
                  >
                    Add to Theme
                  </Button>
                  <Link url={`https://${shopDomain}/admin/themes`} external target="_blank">
                    Manage Themes
                  </Link>
                </InlineStack>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Widget Settings
              </Text>

              <FormLayout>
                <Checkbox
                  label="Enable Virtual Try-On Widget"
                  checked={enabled}
                  onChange={setEnabled}
                  helpText="Show/hide the Try-On button on product pages"
                />

                <FormLayout.Group>
                  <div style={{ flex: 2 }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      Button Text
                    </Text>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      placeholder="👗 Virtual Try-On"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      Button Color
                    </Text>
                    <InlineStack gap="200" align="start">
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: colorHex,
                          border: "1px solid #ccc",
                          borderRadius: "4px"
                        }}
                      />
                      <input
                        type="text"
                        value={colorHex}
                        onChange={(e) => setColorHex(e.target.value)}
                        placeholder="#3B82F6"
                        style={{
                          width: "100px",
                          padding: "8px 12px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "14px"
                        }}
                      />
                    </InlineStack>
                  </div>
                </FormLayout.Group>

                <Button variant="primary" onClick={handleSave}>
                  Save Settings
                </Button>
              </FormLayout>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text variant="headingMd" as="h2">
                How it Works
              </Text>
              
              <BlockStack gap="200">
                <Text variant="bodyMd">
                  • <strong>Add to Theme:</strong> Click "Add to Theme" to install the widget block
                </Text>
                <Text variant="bodyMd">
                  • <strong>Enable Widget:</strong> Toggle on to show the Try-On button on product pages
                </Text>
                <Text variant="bodyMd">
                  • <strong>Customer Experience:</strong> Customers click the button → Upload full body photo → See virtual try-on preview
                </Text>
                <Text variant="bodyMd">
                  • <strong>Customization:</strong> Change button text and color to match your brand
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
