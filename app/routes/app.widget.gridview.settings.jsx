import {
    Page,
    Text,
    Button,
    Card,
    BlockStack,
    InlineStack,
    Box,
    Select,
    TextField,
    ColorPicker,
    RangeSlider,
    Toast,
    Banner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useNavigate, useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useState, useEffect } from "react";
import { buildDeeplinks } from "../utils/deeplinks";

// Loader để lấy cấu hình hiện tại
export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);

    // Fetch gridview configuration
    const query = `
      query {
        shop {
          metafield(namespace: "custom", key: "gridview_config") {
            value
          }
        }
      }
    `;

    const response = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": session.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const { data } = await response.json();
    const gridviewConfig = data?.shop?.metafield?.value ? JSON.parse(data.shop.metafield.value) : null;
    
    const deeplinks = buildDeeplinks(session.shop);

    return json({ 
        gridviewConfig,
        shopDomain: session.shop,
        deeplinks
    });
};

// Action để lưu cấu hình
export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const config = JSON.parse(formData.get("config"));
    
    console.log('🔄 Saving gridview config:', config);

    // Get shop ID
    const query = `
        query {
            shop {
                id
            }
        }
    `;

    const configResponse = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
        method: "POST",
        headers: {
            "X-Shopify-Access-Token": session.accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });

    const { data } = await configResponse.json();
    const shopId = data?.shop?.id;

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
                key: "gridview_config",
                type: "json",
                value: JSON.stringify(config),
                ownerId: shopId,
            },
        ],
    };

    const response = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
        method: "POST",
        headers: {
            "X-Shopify-Access-Token": session.accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();

    if (result.errors) {
        console.error("❌ GraphQL errors:", result.errors);
        return json({ success: false, errors: result.errors }, { status: 400 });
    }

    const errors = result.data?.metafieldsSet?.userErrors;
    if (errors && errors.length > 0) {
        console.error("❌ Error saving config:", errors);
        return json({ success: false, errors }, { status: 400 });
    }

    return json({ success: true });
};

export default function GridViewSettings() {
    const navigate = useNavigate();
    const { gridviewConfig, shopDomain, deeplinks } = useLoaderData();
    const fetcher = useFetcher();
    const [message, setMessage] = useState({ content: '', type: 'info' });

    // Default configuration
    const defaultConfig = {
        layoutType: "multirow",
        maxItems: 5,
        spacing: 40,
        backgroundColor: "#ffffff",
        textColor: "#333333",
        titleSize: 24,
        descriptionSize: 16,
        borderRadius: 10,
        imageAspectRatio: "4:3",
        showBorders: false,
        borderColor: "#e0e0e0",
        padding: 20,
        isActive: true
    };

    const [config, setConfig] = useState(gridviewConfig || defaultConfig);

    const showMessage = (content, type = 'info') => {
        setMessage({ content, type });
        setTimeout(() => setMessage({ content: '', type: 'info' }), 3000);
    };

    // Layout options với mô tả chi tiết
    const layoutOptions = [
        {
            value: "multirow",
            label: "Multirow Layout",
            description: "3-block vertical layout with alternating image-text arrangement, perfect for showcasing key features"
        },
        {
            value: "grid-2x2",
            label: "2x2 Grid",
            description: "Clean 2x2 grid layout, ideal for showcasing 4 key features"
        },
        {
            value: "grid-3x1",
            label: "3x1 Grid",
            description: "Horizontal 3-column layout, great for quick feature overview"
        },
        {
            value: "stacked",
            label: "Stacked Cards",
            description: "Vertical stacked cards, perfect for mobile-first design"
        }
    ];

    const handleSave = async () => {
        try {
            const response = await fetcher.submit(
                { config: JSON.stringify(config) },
                { method: "POST" }
            );
            
            if (response?.success) {
                showMessage('Configuration saved successfully!', 'success');
            } else {
                showMessage('Failed to save configuration. Please try again.', 'error');
            }
        } catch (error) {
            console.error("❌ Error saving config:", error);
            showMessage('Error saving configuration. Please try again.', 'error');
        }
    };

    const handleAddToTheme = () => {
        window.open(deeplinks.gridView, "_blank");
    };

    return (
        <Page fullWidth>
            <TitleBar title="Grid View Settings" />
            {message.content && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    backgroundColor: message.type === 'success' ? '#008060' : '#d82c0d',
                    color: 'white',
                    zIndex: 1000,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {message.content}
                </div>
            )}

            <BlockStack gap="500">
                <Banner
                    title="Layout Preview"
                    tone="info"
                >
                    <p>Choose a layout that best showcases your product features and increases conversion rates.</p>
                </Banner>

                <Card>
                    <BlockStack gap="400">
                        <Text variant="headingMd" as="h2">Layout Configuration</Text>
                        
                        <Select
                            label="Layout Type"
                            options={layoutOptions.map(option => ({
                                label: option.label,
                                value: option.value
                            }))}
                            value={config.layoutType}
                            onChange={(value) => setConfig({...config, layoutType: value})}
                        />
                        
                        {layoutOptions.find(opt => opt.value === config.layoutType) && (
                            <Box paddingBlockStart="200">
                                <Text variant="bodyMd" color="subdued">
                                    {layoutOptions.find(opt => opt.value === config.layoutType).description}
                                </Text>
                            </Box>
                        )}

                        <RangeSlider
                            label="Maximum Items"
                            value={config.maxItems}
                            min={1}
                            max={10}
                            step={1}
                            onChange={(value) => setConfig({...config, maxItems: value})}
                        />

                        <RangeSlider
                            label="Spacing (px)"
                            value={config.spacing}
                            min={10}
                            max={80}
                            step={5}
                            onChange={(value) => setConfig({...config, spacing: value})}
                        />

                        <RangeSlider
                            label="Border Radius (px)"
                            value={config.borderRadius}
                            min={0}
                            max={30}
                            step={2}
                            onChange={(value) => setConfig({...config, borderRadius: value})}
                        />

                        <RangeSlider
                            label="Padding (px)"
                            value={config.padding}
                            min={10}
                            max={50}
                            step={5}
                            onChange={(value) => setConfig({...config, padding: value})}
                        />
                    </BlockStack>
                </Card>

                <Card>
                    <BlockStack gap="400">
                        <Text variant="headingMd" as="h2">Typography</Text>
                        
                        <RangeSlider
                            label="Title Size (px)"
                            value={config.titleSize}
                            min={16}
                            max={36}
                            step={2}
                            onChange={(value) => setConfig({...config, titleSize: value})}
                        />

                        <RangeSlider
                            label="Description Size (px)"
                            value={config.descriptionSize}
                            min={12}
                            max={20}
                            step={1}
                            onChange={(value) => setConfig({...config, descriptionSize: value})}
                        />

                        <Box>
                            <Text variant="bodyMd" as="p" fontWeight="medium">Text Color</Text>
                            <ColorPicker
                                color={config.textColor}
                                onChange={(color) => setConfig({...config, textColor: color})}
                            />
                        </Box>
                    </BlockStack>
                </Card>

                <Card>
                    <BlockStack gap="400">
                        <Text variant="headingMd" as="h2">Background & Borders</Text>
                        
                        <Box>
                            <Text variant="bodyMd" as="p" fontWeight="medium">Background Color</Text>
                            <ColorPicker
                                color={config.backgroundColor}
                                onChange={(color) => setConfig({...config, backgroundColor: color})}
                            />
                        </Box>

                        <Select
                            label="Image Aspect Ratio"
                            options={[
                                {label: "4:3 (Standard)", value: "4:3"},
                                {label: "16:9 (Widescreen)", value: "16:9"},
                                {label: "1:1 (Square)", value: "1:1"},
                                {label: "3:2 (Photo)", value: "3:2"},
                                {label: "2:3 (Portrait)", value: "2:3"}
                            ]}
                            value={config.imageAspectRatio}
                            onChange={(value) => setConfig({...config, imageAspectRatio: value})}
                        />
                    </BlockStack>
                </Card>

                <InlineStack gap="300" align="end">
                    <Button onClick={() => navigate('/app/widget')}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Configuration
                    </Button>
                    <Button variant="primary" onClick={handleAddToTheme}>
                        Add to Theme
                    </Button>
                </InlineStack>
            </BlockStack>
        </Page>
    );
}
