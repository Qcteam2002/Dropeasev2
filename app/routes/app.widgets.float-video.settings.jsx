import { useState, useEffect } from "react";
import {
  Page,
  Text,
  BlockStack,
  Select,
  RangeSlider,
  Button,
  Card,
  Layout,
  Checkbox,
  TextField,
  ColorPicker,
  Box
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  console.log('🔍 Loading float video settings for shop:', session.shop);

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
            metafield(namespace: "floatvideo", key: "configuration") {
              value
            }
          }
        }
      `,
    }),
  });

  const raw = await response.json();
  console.log('📦 Raw float video response:', raw);
  
  const shopId = raw?.data?.shop?.id;
  const config = raw?.data?.shop?.metafield?.value
    ? JSON.parse(raw.data.shop.metafield.value)
    : null;
  
  console.log('⚙️ Loaded float video config:', config);
  return json({ config, shopId });
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const payload = JSON.parse(formData.get("config"));
  const shopId = formData.get("shopId");
  
  console.log('💾 Saving new float video config:', payload);

  const createDefinitionMutation = `
    mutation {
      metafieldDefinitionCreate(definition: {
        name: "Float Video Config",
        namespace: "floatvideo",
        key: "configuration",
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

  const definitionResponse = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": session.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: createDefinitionMutation }),
  });

  const definitionResult = await definitionResponse.json();
  console.log('📝 Float video definition creation result:', definitionResult);

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
        namespace: "floatvideo",
        key: "configuration",
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
  console.log("✅ Float video metafield save response:", jsonData);

  const errors = jsonData?.data?.metafieldsSet?.userErrors;
  if (errors && errors.length > 0) {
    console.error("❌ Float video metafield save error:", errors);
    return json({ success: false, errors });
  }

  return json({ success: true });
};

// Preview component for Float Video
function FloatVideoPreview({
  isActive,
  position,
  width,
  height,
  borderRadius,
  backgroundColor,
  opacity
}) {
  const previewStyles = {
    position: 'fixed',
    [position]: '20px',
    width: `${width}px`,
    height: `${height}px`,
    background: backgroundColor,
    opacity: opacity,
    borderRadius: `${borderRadius}px`,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd'
  };

  if (!isActive) return null;

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd">Live Preview</Text>
        <Box padding="400">
          <div style={previewStyles}>
            <Text>Video Preview</Text>
          </div>
        </Box>
      </BlockStack>
    </Card>
  );
}

export default function FloatVideoSettings() {
  const { config, shopId } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(config?.isActive ?? false);
  const [position, setPosition] = useState(config?.position ?? "right");
  const [width, setWidth] = useState(config?.width ?? 300);
  const [height, setHeight] = useState(config?.height ?? 200);
  const [borderRadius, setBorderRadius] = useState(config?.borderRadius ?? 8);
  const [backgroundColor, setBackgroundColor] = useState(config?.backgroundColor ?? "#ffffff");
  const [opacity, setOpacity] = useState(config?.opacity ?? 0.9);
  const [showSaved, setShowSaved] = useState(false);

  const handleSaveSettings = async () => {
    fetcher.submit(
      {
        config: JSON.stringify({
          isActive,
          position,
          width,
          height,
          borderRadius,
          backgroundColor,
          opacity
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
        title="Float Video Block"
        breadcrumbs={[{ content: "Widgets", onAction: () => navigate("/app/widgets") }]}
      />

      <Layout>
        <Layout.Section oneThird>
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Basic Settings</Text>
                <Checkbox
                  label="Enable Float Video"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                <Select
                  label="Position"
                  options={[
                    { label: "Right", value: "right" },
                    { label: "Left", value: "left" },
                  ]}
                  value={position}
                  onChange={setPosition}
                />
                <RangeSlider
                  label="Width (px)"
                  min={200}
                  max={500}
                  value={width}
                  onChange={setWidth}
                />
                <RangeSlider
                  label="Height (px)"
                  min={150}
                  max={400}
                  value={height}
                  onChange={setHeight}
                />
                <RangeSlider
                  label="Border Radius (px)"
                  min={0}
                  max={20}
                  value={borderRadius}
                  onChange={setBorderRadius}
                />
                <RangeSlider
                  label="Opacity"
                  min={0.1}
                  max={1}
                  step={0.1}
                  value={opacity}
                  onChange={setOpacity}
                />
                <div>
                  <Text>Background Color</Text>
                  <ColorPicker onChange={setBackgroundColor} color={backgroundColor} />
                </div>
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
            <FloatVideoPreview
              isActive={isActive}
              position={position}
              width={width}
              height={height}
              borderRadius={borderRadius}
              backgroundColor={backgroundColor}
              opacity={opacity}
            />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 