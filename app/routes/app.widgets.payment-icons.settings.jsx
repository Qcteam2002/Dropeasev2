import { useState } from "react";
import {
  Page,
  Text,
  BlockStack,
  Card,
  Layout,
  Checkbox,
  Button,
  RangeSlider,
  ColorPicker,
  Box,
  Grid,
  Icon
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

// Preview component for Payment Icons
function PaymentIconsPreview({
  isActive,
  iconSize,
  backgroundColor,
  iconColor,
  selectedIcons,
  spacing
}) {
  const previewStyles = {
    position: 'sticky',
    bottom: '20px',
    left: 0,
    width: '100%',
    background: backgroundColor,
    padding: '10px 20px',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '1px solid #ddd',
    gap: `${spacing}px`
  };

  const iconStyles = {
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    color: iconColor
  };

  if (!isActive) return null;

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd">Live Preview</Text>
        <Box padding="400">
          <div style={previewStyles}>
            {selectedIcons.map((icon, index) => (
              <img 
                key={index} 
                src={`/payment-icons/${icon}.svg`} 
                alt={icon} 
                style={iconStyles}
              />
            ))}
          </div>
        </Box>
      </BlockStack>
    </Card>
  );
}

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const response = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": session.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          shop {
            id
            metafield(namespace: "custom", key: "payment_icons_config") {
              value
            }
          }
        }
      `,
    }),
  });

  const raw = await response.json();
  const shopId = raw?.data?.shop?.id;
  const config = raw?.data?.shop?.metafield?.value
    ? JSON.parse(raw.data.shop.metafield.value)
    : null;

  return json({ config, shopId });
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const payload = JSON.parse(formData.get("config"));
  const shopId = formData.get("shopId");

  // Create metafield definition
  const createDefinitionMutation = `
    mutation {
      metafieldDefinitionCreate(definition: {
        name: "Payment Icons Config",
        namespace: "custom",
        key: "payment_icons_config",
        type: JSON,
        ownerType: SHOP,
        access: {
          storefront: PUBLIC_READ
        }
      }) {
        createdDefinition { id }
        userErrors { message }
      }
    }
  `;

  await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": session.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: createDefinitionMutation }),
  });

  // Save metafield value
  const mutation = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id key namespace }
        userErrors { field message }
      }
    }
  `;

  const variables = {
    metafields: [
      {
        namespace: "custom",
        key: "payment_icons_config",
        type: "json",
        value: JSON.stringify(payload),
        ownerId: shopId,
      },
    ],
  };

  const result = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": session.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const jsonData = await result.json();
  console.log("✅ Metafield save response:", jsonData);

  const errors = jsonData?.data?.metafieldsSet?.userErrors;
  if (errors && errors.length > 0) {
    console.error("❌ Metafield save error:", errors);
    return json({ success: false, errors });
  }

  return json({ success: true });
};

export default function PaymentIconsSettings() {
  const { config, shopId } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(config?.isActive ?? false);
  const [iconSize, setIconSize] = useState(config?.iconSize ?? 40);
  const [spacing, setSpacing] = useState(config?.spacing ?? 10);
  const [backgroundColor, setBackgroundColor] = useState(config?.backgroundColor ?? "#ffffff");
  const [iconColor, setIconColor] = useState(config?.iconColor ?? "#000000");
  const [selectedIcons, setSelectedIcons] = useState(config?.selectedIcons ?? [
    "visa",
    "mastercard",
    "amex",
    "paypal"
  ]);
  const [showSaved, setShowSaved] = useState(false);

  const availableIcons = [
    "visa",
    "mastercard",
    "amex",
    "paypal",
    "apple-pay",
    "google-pay",
    "shop-pay"
  ];

  const handleSaveSettings = async () => {
    fetcher.submit(
      {
        config: JSON.stringify({
          isActive,
          iconSize,
          spacing,
          backgroundColor,
          iconColor,
          selectedIcons
        }),
        shopId
      },
      { method: "POST" }
    );
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <Page fullWidth>
      <TitleBar
        title="Payment Icons Block"
        breadcrumbs={[{ content: "Widgets", onAction: () => navigate("/app/widgets") }]}
      />

      <Layout>
        <Layout.Section oneThird>
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Basic Settings</Text>
                <Checkbox
                  label="Enable Payment Icons"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                <RangeSlider
                  label="Icon Size (px)"
                  min={20}
                  max={60}
                  value={iconSize}
                  onChange={setIconSize}
                />
                <RangeSlider
                  label="Spacing Between Icons (px)"
                  min={5}
                  max={30}
                  value={spacing}
                  onChange={setSpacing}
                />
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Color Settings</Text>
                <div>
                  <Text>Background Color</Text>
                  <ColorPicker onChange={setBackgroundColor} color={backgroundColor} />
                </div>
                <div>
                  <Text>Icon Color</Text>
                  <ColorPicker onChange={setIconColor} color={iconColor} />
                </div>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Select Payment Icons</Text>
                <Grid>
                  {availableIcons.map(icon => (
                    <Grid.Cell key={icon} columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
                      <Checkbox
                        label={icon}
                        checked={selectedIcons.includes(icon)}
                        onChange={() => {
                          if (selectedIcons.includes(icon)) {
                            setSelectedIcons(selectedIcons.filter(i => i !== icon));
                          } else {
                            setSelectedIcons([...selectedIcons, icon]);
                          }
                        }}
                      />
                    </Grid.Cell>
                  ))}
                </Grid>
              </BlockStack>
            </Card>

            <div style={{ marginTop: "1rem" }}>
              <Button variant="primary" onClick={handleSaveSettings} loading={fetcher.state !== "idle"}>
                Save settings
              </Button>
              {showSaved && <Text tone="success">✅ Settings saved!</Text>}
            </div>
          </BlockStack>
        </Layout.Section>

        <Layout.Section secondary>
          <div style={{ position: 'sticky', top: '20px' }}>
            <PaymentIconsPreview
              isActive={isActive}
              iconSize={iconSize}
              spacing={spacing}
              backgroundColor={backgroundColor}
              iconColor={iconColor}
              selectedIcons={selectedIcons}
            />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}