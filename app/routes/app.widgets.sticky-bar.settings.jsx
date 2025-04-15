// ✅ FILE: app/routes/app.widgets.sticky-bar.settings.jsx

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
  console.log('🔍 Loading settings for shop:', session.shop);

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
            metafield(namespace: "custom", key: "sticky_bar_config") {
              value
            }
          }
        }
      `,
    }),
  });

  const raw = await response.json();
  console.log('📦 Raw response:', raw);
  
  const shopId = raw?.data?.shop?.id;
  const config = raw?.data?.shop?.metafield?.value
    ? JSON.parse(raw.data.shop.metafield.value)
    : null;
  
  console.log('⚙️ Loaded config:', config);
  return json({ config, shopId });
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const payload = JSON.parse(formData.get("config"));
  const shopId = formData.get("shopId");
  
  console.log('💾 Saving new config:', payload);

  // ✅ Cố gắng tạo metafield definition nếu chưa có (type phải là 'json')
  const createDefinitionMutation = `
    mutation {
      metafieldDefinitionCreate(definition: {
        name: "Sticky Bar Config",
        namespace: "custom",
        key: "sticky_bar_config",
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
  console.log('📝 Definition creation result:', definitionResult);

  // ✅ Ghi giá trị metafield
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
        key: "sticky_bar_config",
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

// Preview component for Sticky Bar
function StickyBarPreview({
  isActive,
  titleFontSize,
  titleFontFamily,
  variantFontSize,
  backgroundColor,
  textColor,
  buttonFontSize,
  addToCartBgColor,
  addToCartTextColor,
  buyNowBgColor,
  buyNowTextColor,
  buttonBorderRadius,
  barHeight
}) {
  const previewStyles = {
    position: 'sticky',
    bottom: '20px',
    left: 0,
    width: '100%',
    background: backgroundColor,
    color: textColor,
    padding: '10px 20px',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: titleFontFamily,
    height: `${barHeight}px`,
    borderRadius: '8px',
    border: '1px solid #ddd'
  };

  const productInfoStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  };

  const titleStyles = {
    fontSize: `${titleFontSize}px`,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '300px'
  };

  const variantStyles = {
    fontSize: `${variantFontSize}px`,
    color: textColor,
    opacity: 0.8
  };

  const selectStyles = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: `${variantFontSize}px`,
    width: '160px',
    background: backgroundColor,
    color: textColor
  };

  const buttonContainerStyles = {
    display: 'flex',
    gap: '8px'
  };

  const buttonBaseStyles = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: `${buttonBorderRadius}px`,
    fontSize: `${buttonFontSize}px`,
    cursor: 'pointer'
  };

  const addToCartStyles = {
    ...buttonBaseStyles,
    backgroundColor: addToCartBgColor,
    color: addToCartTextColor
  };

  const buyNowStyles = {
    ...buttonBaseStyles,
    backgroundColor: buyNowBgColor,
    color: buyNowTextColor
  };

  if (!isActive) return null;

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd">Live Preview</Text>
        <Box padding="400">
          <div style={previewStyles}>
            <div style={productInfoStyles}>
              <div style={titleStyles}>Sample Product Title</div>
              <div style={variantStyles}>Default Variant</div>
            </div>
            <select style={selectStyles}>
              <option>Default Variant</option>
              <option>Variant 2</option>
            </select>
            <div style={buttonContainerStyles}>
              <button style={addToCartStyles}>Add to cart</button>
              <button style={buyNowStyles}>Buy now</button>
            </div>
          </div>
        </Box>
      </BlockStack>
    </Card>
  );
}

export default function StickyBarSettings() {
  const { config, shopId } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(config?.isActive ?? false);
  const [theme, setTheme] = useState(config?.theme ?? "light");
  const [barHeight, setBarHeight] = useState(config?.barHeight ?? 60);
  const [showSaved, setShowSaved] = useState(false);
  
  // Font settings
  const [titleFontSize, setTitleFontSize] = useState(config?.titleFontSize ?? 14);
  const [titleFontFamily, setTitleFontFamily] = useState(config?.titleFontFamily ?? "sans-serif");
  const [variantFontSize, setVariantFontSize] = useState(config?.variantFontSize ?? 12);
  
  // Color settings
  const [backgroundColor, setBackgroundColor] = useState(config?.backgroundColor ?? "#ffffff");
  const [textColor, setTextColor] = useState(config?.textColor ?? "#000000");
  
  // Button settings
  const [buttonFontSize, setButtonFontSize] = useState(config?.buttonFontSize ?? 14);
  const [addToCartBgColor, setAddToCartBgColor] = useState(config?.addToCartBgColor ?? "#000000");
  const [addToCartTextColor, setAddToCartTextColor] = useState(config?.addToCartTextColor ?? "#ffffff");
  const [buyNowBgColor, setBuyNowBgColor] = useState(config?.buyNowBgColor ?? "#000000");
  const [buyNowTextColor, setBuyNowTextColor] = useState(config?.buyNowTextColor ?? "#ffffff");
  const [buttonBorderRadius, setButtonBorderRadius] = useState(config?.buttonBorderRadius ?? 8);

  const handleSaveSettings = async () => {
    fetcher.submit(
      {
        config: JSON.stringify({
          isActive,
          theme,
          barHeight,
          titleFontSize,
          titleFontFamily,
          variantFontSize,
          backgroundColor,
          textColor,
          buttonFontSize,
          addToCartBgColor,
          addToCartTextColor,
          buyNowBgColor,
          buyNowTextColor,
          buttonBorderRadius
        }),
        shopId
      },
      { method: "POST" }
    );
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const fontFamilyOptions = [
    { label: "Sans Serif", value: "sans-serif" },
    { label: "Serif", value: "serif" },
    { label: "Monospace", value: "monospace" },
    { label: "Arial", value: "Arial" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Times New Roman", value: "Times New Roman" }
  ];

  return (
    <Page fullWidth>
      <TitleBar
        title="Sticky Bar Block"
        breadcrumbs={[{ content: "Widgets", onAction: () => navigate("/app/widgets") }]}
      />

      <Layout>
        <Layout.Section oneThird>
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Basic Settings</Text>
                <Checkbox
                  label="Enable Sticky Bar"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
                <Select
                  label="Theme"
                  options={[
                    { label: "Light", value: "light" },
                    { label: "Dark", value: "dark" },
                  ]}
                  value={theme}
                  onChange={setTheme}
                />
                <RangeSlider
                  label="Sticky Bar Height (px)"
                  min={40}
                  max={120}
                  value={barHeight}
                  onChange={setBarHeight}
                />
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Font Settings</Text>
                <RangeSlider
                  label="Title Font Size (px)"
                  min={12}
                  max={24}
                  value={titleFontSize}
                  onChange={setTitleFontSize}
                />
                <Select
                  label="Title Font Family"
                  options={fontFamilyOptions}
                  value={titleFontFamily}
                  onChange={setTitleFontFamily}
                />
                <RangeSlider
                  label="Variant Text Font Size (px)"
                  min={10}
                  max={20}
                  value={variantFontSize}
                  onChange={setVariantFontSize}
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
                  <Text>Text Color</Text>
                  <ColorPicker onChange={setTextColor} color={textColor} />
                </div>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Button Settings</Text>
                <RangeSlider
                  label="Button Font Size (px)"
                  min={12}
                  max={20}
                  value={buttonFontSize}
                  onChange={setButtonFontSize}
                />
                <RangeSlider
                  label="Button Border Radius (px)"
                  min={0}
                  max={20}
                  value={buttonBorderRadius}
                  onChange={setButtonBorderRadius}
                />
                <div>
                  <Text>Add to Cart Button Colors</Text>
                  <BlockStack gap="200">
                    <div>
                      <Text>Background Color</Text>
                      <ColorPicker onChange={setAddToCartBgColor} color={addToCartBgColor} />
                    </div>
                    <div>
                      <Text>Text Color</Text>
                      <ColorPicker onChange={setAddToCartTextColor} color={addToCartTextColor} />
                    </div>
                  </BlockStack>
                </div>
                <div>
                  <Text>Buy Now Button Colors</Text>
                  <BlockStack gap="200">
                    <div>
                      <Text>Background Color</Text>
                      <ColorPicker onChange={setBuyNowBgColor} color={buyNowBgColor} />
                    </div>
                    <div>
                      <Text>Text Color</Text>
                      <ColorPicker onChange={setBuyNowTextColor} color={buyNowTextColor} />
                    </div>
                  </BlockStack>
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
            <StickyBarPreview
              isActive={isActive}
              titleFontSize={titleFontSize}
              titleFontFamily={titleFontFamily}
              variantFontSize={variantFontSize}
              backgroundColor={backgroundColor}
              textColor={textColor}
              buttonFontSize={buttonFontSize}
              addToCartBgColor={addToCartBgColor}
              addToCartTextColor={addToCartTextColor}
              buyNowBgColor={buyNowBgColor}
              buyNowTextColor={buyNowTextColor}
              buttonBorderRadius={buttonBorderRadius}
              barHeight={barHeight}
            />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
