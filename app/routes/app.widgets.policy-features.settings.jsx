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

// Preview component for Policy Features
function PolicyFeaturesPreview({
  isActive,
  iconSize,
  backgroundColor,
  iconColor,
  selectedFeatures,
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
            {selectedFeatures.map((feature, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={iconStyles}>
                  {feature === 'free_shipping' && <Icon source="truck" />}
                  {feature === 'money_back' && <Icon source="return" />}
                  {feature === 'secure_payment' && <Icon source="lock" />}
                  {feature === 'easy_returns' && <Icon source="refresh" />}
                </div>
                <Text>{feature.replace('_', ' ').toUpperCase()}</Text>
              </div>
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
            metafield(namespace: "custom", key: "policy_features_config") {
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
        name: "Policy Features Config",
        namespace: "custom",
        key: "policy_features_config",
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
        key: "policy_features_config",
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

export default function PolicyFeaturesSettings() {
  const { config, shopId } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(config?.isActive ?? false);
  const [iconSize, setIconSize] = useState(config?.iconSize ?? 24);
  const [spacing, setSpacing] = useState(config?.spacing ?? 20);
  const [backgroundColor, setBackgroundColor] = useState(config?.backgroundColor ?? "#ffffff");
  const [iconColor, setIconColor] = useState(config?.iconColor ?? "#000000");
  const [selectedFeatures, setSelectedFeatures] = useState(config?.selectedFeatures ?? [
    "free_shipping",
    "money_back",
    "secure_payment",
    "easy_returns"
  ]);
  const [showSaved, setShowSaved] = useState(false);

  const availableFeatures = [
    "free_shipping",
    "money_back",
    "secure_payment",
    "easy_returns",
    "express_shipping"
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
          selectedFeatures
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
        title="Policy Features Block"
        breadcrumbs={[{ content: "Widgets", onAction: () => navigate("/app/widget") }]}
      />

      <Layout>
        <Layout.Section oneThird>
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Basic Settings</Text>
                <Checkbox
                  label="Enable Policy Features"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                <RangeSlider
                  label="Icon Size (px)"
                  min={20}
                  max={40}
                  value={iconSize}
                  onChange={setIconSize}
                />
                <RangeSlider
                  label="Spacing Between Icons (px)"
                  min={10}
                  max={40}
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
                <Text variant="headingMd">Select Features</Text>
                <Grid>
                  {availableFeatures.map(feature => (
                    <Grid.Cell key={feature} columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
                      <Checkbox
                        label={feature === 'express_shipping' ? 'Express Shipping' : feature.replace('_', ' ').toUpperCase()}
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => {
                          if (selectedFeatures.includes(feature)) {
                            setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                          } else {
                            setSelectedFeatures([...selectedFeatures, feature]);
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
            <PolicyFeaturesPreview
              isActive={isActive}
              iconSize={iconSize}
              spacing={spacing}
              backgroundColor={backgroundColor}
              iconColor={iconColor}
              selectedFeatures={selectedFeatures}
            />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 