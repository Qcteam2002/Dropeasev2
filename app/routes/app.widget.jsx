// ✅ FILE: app/routes/app.widgets.jsx

import {
    Page,
    Text,
    Button,
    Card,
    BlockStack,
    InlineStack,
    Link,
    Box,
    Badge,
    Toast,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useNavigate, useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useState, useEffect } from "react";
import { buildDeeplinks } from "../utils/deeplinks";

// ✅ Loader để lấy session.shop và build deeplink
export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);

    // Fetch both policy features and payment icons status
    const query = `
      query {
        shop {
          policyConfig: metafield(namespace: "custom", key: "policy_features_config") {
            value
          }
          paymentConfig: metafield(namespace: "custom", key: "payment_icons_config") {
            value
          }
          stickyBarConfig: metafield(namespace: "custom", key: "sticky_bar_config") {
            value
          }
          floatVideoConfig: metafield(namespace: "floatvideo", key: "configuration") {
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
    const policyConfig = data?.shop?.policyConfig?.value ? JSON.parse(data.shop.policyConfig.value) : null;
    const paymentConfig = data?.shop?.paymentConfig?.value ? JSON.parse(data.shop.paymentConfig.value) : null;
    const stickyBarConfig = data?.shop?.stickyBarConfig?.value ? JSON.parse(data.shop.stickyBarConfig.value) : null;
    const floatVideoConfig = data?.shop?.floatVideoConfig?.value ? JSON.parse(data.shop.floatVideoConfig.value) : null;
    const isPolicyActive = policyConfig?.isActive ?? false;
    const isPaymentActive = paymentConfig?.isActive ?? false;
    const isStickyBarActive = stickyBarConfig?.isActive ?? false;
    const isFloatVideoActive = floatVideoConfig?.isActive ?? false;
    
    const deeplinks = buildDeeplinks(session.shop);

    return json({ deeplinks, isPolicyActive, isPaymentActive, isStickyBarActive, isFloatVideoActive });
};

// ✅ Thêm action để toggle trạng thái active
export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const isActive = formData.get("isActive") === "true";
    const blockType = formData.get("blockType"); // "policy", "payment", or "sticky"
    const actionType = formData.get("actionType"); // "toggle" or "reset"
    
    console.log('🔄 Processing action:', { isActive, blockType, actionType });

    // First get shop ID
    const query = `
        query {
            shop {
                id
                metafield(namespace: "custom", key: "${
                    blockType === "policy" ? "policy_features_config" : 
                    blockType === "payment" ? "payment_icons_config" :
                    "sticky_bar_config"
                }") {
                    id
                    value
                }
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

    const { data, errors: queryErrors } = await configResponse.json();
    
    if (queryErrors) {
        console.error("❌ Error fetching shop data:", queryErrors);
        return json({ success: false, errors: queryErrors }, { status: 400 });
    }

    console.log('🔍 Shop data:', data);

    const shopId = data?.shop?.id;
    const currentConfig = data?.shop?.metafield?.value ? JSON.parse(data.shop.metafield.value) : null;

    // If action is reset, delete the metafield
    if (actionType === "reset") {
        // Check if metafield exists before trying to delete
        if (!data?.shop?.metafield?.id) {
            console.log('ℹ️ No metafield found to delete');
            return json({ success: true, isActive: false });
        }

        const deleteMutation = `
            mutation metafieldDelete($input: MetafieldDeleteInput!) {
                metafieldDelete(input: $input) {
                    deletedId
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

        const deleteVariables = {
            input: {
                id: data.shop.metafield.id
            }
        };

        console.log('🗑️ Deleting metafield with ID:', data.shop.metafield.id);

        const deleteResponse = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
            method: "POST",
            headers: {
                "X-Shopify-Access-Token": session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: deleteMutation, variables: deleteVariables }),
        });

        const deleteResult = await deleteResponse.json();
        console.log('🗑️ Delete metafield result:', deleteResult);

        if (deleteResult.errors) {
            console.error("❌ Error deleting metafield:", deleteResult.errors);
            return json({ success: false, errors: deleteResult.errors }, { status: 400 });
        }

        return json({ success: true, isActive: false });
    }

    // Default config for new blocks
    const defaultConfig = blockType === "policy" ? {
        iconSize: 24,
        spacing: 20,
        backgroundColor: "#ffffff",
        iconColor: "#000000",
        selectedFeatures: ["free_shipping", "money_back", "secure_payment", "easy_returns"],
        isActive: true
    } : blockType === "payment" ? {
        iconSize: 40,
        spacing: 10,
        backgroundColor: "#ffffff",
        iconColor: "#000000",
        selectedIcons: ["visa", "mastercard", "amex", "paypal"],
        isActive: true
    } : {
        isActive: true,
        // Add other sticky bar config properties here
    };

    // Update only isActive field if config exists, otherwise use default config
    const newConfig = currentConfig ? {
        ...currentConfig,
        isActive: !isActive
    } : defaultConfig;

    console.log('📦 New config:', newConfig);
    console.log('🏪 Shop ID:', shopId);

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
                key: blockType === "policy" ? "policy_features_config" :
                    blockType === "payment" ? "payment_icons_config" :
                    "sticky_bar_config",
                type: "json",
                value: JSON.stringify(newConfig),
                ownerId: shopId,
            },
        ],
    };

    console.log('📤 Sending GraphQL mutation with variables:', variables);

    const response = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
        method: "POST",
        headers: {
            "X-Shopify-Access-Token": session.accessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation, variables }),
    });

    const result = await response.json();
    console.log('📥 GraphQL response:', result);

    if (result.errors) {
        console.error("❌ GraphQL errors:", result.errors);
        return json({ success: false, errors: result.errors }, { status: 400 });
    }

    const errors = result.data?.metafieldsSet?.userErrors;
    if (errors && errors.length > 0) {
        console.error("❌ Error updating block:", errors);
        return json({ success: false, errors }, { status: 400 });
    }

    const newState = !isActive;
    console.log('✅ Successfully updated state to:', newState);
    
    return json({ success: true, isActive: newState });
};

export default function WidgetPage() {
    const navigate = useNavigate();
    const { deeplinks, isPolicyActive, isPaymentActive, isStickyBarActive, isFloatVideoActive } = useLoaderData();
    const fetcher = useFetcher();
    const [message, setMessage] = useState({ content: '', type: 'info' });

    const showMessage = (content, type = 'info') => {
        setMessage({ content, type });
        setTimeout(() => setMessage({ content: '', type: 'info' }), 2000);
    };

    const widgets = [
        {
            key: "payment-icons",
            title: "Payment Icons",
            description:
                "Showcase trusted payment methods like PayPal, Apple Pay, Visa, and more—right on your product pages.",
            image:
                "https://images.loox.io/uploads/assets/admin/product-reviews-widget.webp",
            learnMore: "https://help.loox.io/article/646-the-loox-product-reviews-widget",
            actions: isPaymentActive 
                ? ["Customize", "Deactivate", "Add to theme", "Reset"] 
                : ["Customize", "Activate", "Add to theme", "Reset"],
            deeplink: deeplinks.paymentBlock,
            isActive: isPaymentActive,
        },
        {
            key: "policy-features",
            title: "Policy Highlights",
            description:
                "Reassure shoppers and reduce hesitation by clearly displaying key policies that matter most.",
            image: "https://images.loox.io/uploads/assets/admin/rating-widget.webp",
            learnMore: "https://help.loox.io/article/649-the-loox-rating-widget",
            actions: ["Customize", isPolicyActive ? "Deactivate" : "Activate", "Add to theme", "Reset"],
            deeplink: deeplinks.policie,
            isActive: isPolicyActive,
        },
        {
            key: "product-review-widget",
            title: "Product Review",
            description:
                "Build trust fast with real customer reviews shown directly on your product pages.",
            image: "https://images.loox.io/uploads/assets/admin/pop-up-widget.webp",
            learnMore: "https://help.loox.io/article/105-how-do-i-enable-the-popup-widget",
            actions: ["Add to theme"],
            deeplink: deeplinks.productReview,
        },
        {
            key: "gridview-widget",
            title: "Feature Highlights",
            description:
                "Showcase key product benefits in a clean, visual layout that grabs attention and drives confidence.",
            image: "https://images.loox.io/uploads/assets/admin/pop-up-widget.webp",
            learnMore: "https://help.loox.io/article/105-how-do-i-enable-the-popup-widget",
            actions: ["Add to theme"],
            deeplink: deeplinks.gridView,
        },
        {
            key: "float-video",
            title: "Video Highlights",
            description:
                "Bring your product to life with a floating video that showcases its features, benefits, and use in action.",
            image: "https://images.loox.io/uploads/assets/admin/pop-up-widget.webp",
            learnMore: "https://help.loox.io/article/105-how-do-i-enable-the-popup-widget",
            actions: ["Customize", "Add to theme"],
            isActive: isFloatVideoActive,
        },
        {
            key: "sticky-bar",
            title: "Sticky Bar",
            description: "Show a smart product bar with variant picker and quick buy.",
            image: "https://cdn.shopify.com/s/files/sticky-bar-preview.png",
            actions: ["Customize", "Add to theme"],
            deeplink: deeplinks.stickybar,
            isActive: isStickyBarActive,
        }
    ];

    const handleActionClick = async (label, widget) => {
        console.log('🚀 Action clicked:', { label, widget });
        
        if (label === "Customize") {
            navigate(`/app/widgets/${widget.key}/settings`);
        } else if (label === "Add to theme" && widget.deeplink) {
            console.log('🎨 Opening theme editor for:', widget.key);
            console.log('🔗 Deeplink:', widget.deeplink);
            
            // Open theme editor in new tab
            window.open(widget.deeplink, "_blank");
            
            // Auto activate after a delay to allow theme editor to open
            setTimeout(async () => {
                try {
                    console.log('🔌 Auto activating block:', widget.key);
                    const response = await fetcher.submit(
                        { 
                            isActive: false,
                            blockType: widget.key === "policy-features" ? "policy" : "payment"
                        },
                        { method: "POST" }
                    );
                    
                    console.log('📥 Auto activation response:', response);
                    
                    if (response?.success) {
                        console.log('✅ Block auto activated successfully');
                        showMessage('Block added and activated successfully!', 'success');
                        setTimeout(() => window.location.reload(), 500);
                    } else {
                        console.error('❌ Auto activation failed:', response?.errors);
                        showMessage('Block added but activation failed. Please try activating manually.', 'error');
                    }
                } catch (error) {
                    console.error("❌ Error auto activating block:", error);
                    showMessage('Block added but activation failed. Please try activating manually.', 'error');
                }
            }, 2000); // Wait 2 seconds before auto activating
        } else if (label === "Reset") {
            try {
                console.log('🔄 Starting reset process for:', widget.key);
                const response = await fetcher.submit(
                    { 
                        actionType: "reset",
                        blockType: widget.key === "policy-features" ? "policy" : "payment"
                    },
                    { method: "POST" }
                );
                
                console.log('📥 Reset response:', response);
                
                if (response?.success) {
                    console.log('✅ Reset successful for:', widget.key);
                    showMessage('Reset successful!', 'success');
                    setTimeout(() => window.location.reload(), 500);
                } else {
                    console.error('❌ Reset failed:', response?.errors);
                    showMessage('Reset failed. Please try again.', 'error');
                }
            } catch (error) {
                console.error("❌ Error resetting block:", error);
                showMessage('Error resetting block. Please try again.', 'error');
            }
        } else if (label === "Activate" || label === "Deactivate") {
            try {
                console.log('📝 Submitting action with data:', { 
                    isActive: label === "Deactivate",
                    blockType: widget.key === "policy-features" ? "policy" : "payment"
                });
                
                const response = await fetcher.submit(
                    { 
                        isActive: label === "Deactivate",
                        blockType: widget.key === "policy-features" ? "policy" : "payment"
                    },
                    { method: "POST" }
                );
                
                console.log('📥 Toggle response:', response);
                
                if (response?.success) {
                    console.log('✅ Toggle successful for:', widget.key);
                    showMessage(`${label} successful!`, 'success');
                    setTimeout(() => window.location.reload(), 500);
                } else {
                    console.error('❌ Toggle failed:', response?.errors);
                    showMessage(`${label} failed. Please try again.`, 'error');
                }
            } catch (error) {
                console.error("❌ Error toggling block:", error);
                showMessage('Error toggling block. Please try again.', 'error');
            }
        } else {
            alert(`${label} ${widget.title}`);
        }
    };

    // Add loader to check block status
    useEffect(() => {
        const checkBlockStatus = async () => {
            console.log('🔍 Checking block status...');
            const query = `
                query {
                    shop {
                        metafield(namespace: "custom", key: "payment_icons_config") {
                            value
                        }
                    }
                }
            `;

            try {
                const response = await fetch('/api/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });

                const { data } = await response.json();
                console.log('📦 Payment block status:', data?.shop?.metafield?.value);
            } catch (error) {
                console.error('❌ Error checking block status:', error);
            }
        };

        checkBlockStatus();
    }, []);

    return (
        <Page fullWidth>
            <TitleBar title="Widgets" />
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
            <div
                style={{
                    display: "grid",
                    gap: "20px", //"var(--p-space-500)",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    padding: "var(--p-space-500) 0",
                }}
            >
                {widgets.map((widget) => (
                    <Card key={widget.key}>
                        <Box background="bg-surface-secondary">
                            <img
                                src={widget.image}
                                alt={`${widget.title} preview`}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "150px",
                                    objectFit: "cover",
                                    borderBottom: "1px solid var(--p-color-border)",
                                }}
                            />
                        </Box>
                        <BlockStack
                            gap="400"
                            paddingInline="500"
                            paddingBlock="400"
                            style={{ height: "180px", display: "flex", flexDirection: "column", paddingTop: "20px" }}
                        >
                            <Box style={{ flex: 1 }}>
                                <InlineStack align="space-between">
                                <Text variant="headingMd" as="h2" paddingBlockStart="200">
                                    {widget.title}
                                </Text>
                                    {(widget.key === "policy-features" || widget.key === "payment-icons" || widget.key === "sticky-bar" || widget.key === "float-video") && (
                                        <Badge tone={widget.isActive ? "success" : "critical"}>
                                            {widget.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    )}
                                </InlineStack>
                                <Text
                                    variant="bodyMd"
                                    color="subdued"
                                    style={{
                                        display: "inline-block",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {widget.description}{" "}
                                    <Link url={widget.learnMore} target="_blank" removeUnderline>
                                        Learn more
                                    </Link>
                                </Text>
                            </Box>

                            <InlineStack gap="300" align="end" style={{ marginTop: "auto" }}>
                                {widget.actions.map((label) => (
                                    <Button
                                        key={label}
                                        variant={label === "Activate" ? "primary" : "secondary"}
                                        onClick={() => handleActionClick(label, widget)}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </InlineStack>
                        </BlockStack>
                    </Card>
                ))}
            </div>
        </Page>
    );
}
