import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);

    try {
        // Check shop metafields for block status (not product-specific)
        const query = `
            query getShopMetafields {
                shop {
                    metafields(first: 20, namespace: "custom") {
                        edges {
                            node {
                                key
                                value
                                type
                            }
                        }
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

        const result = await response.json();
        
        if (result.errors) {
            console.error("GraphQL errors fetching shop metafields:", result.errors);
            return json({ error: "Failed to fetch shop data" }, { status: 500 });
        }

        const shop = result.data?.shop;
        const metafields = shop?.metafields?.edges || [];
        
        const gridviewEnabledMetafield = metafields.find(
            edge => edge.node.key === "gridview_enabled"
        );
        const gridviewConfigMetafield = metafields.find(
            edge => edge.node.key === "gridview_config"
        );

        const isEnabled = gridviewEnabledMetafield ? 
            (gridviewEnabledMetafield.node.value === "true") : false;
        const config = gridviewConfigMetafield ? 
            JSON.parse(gridviewConfigMetafield.node.value) : null;

        console.log("🔍 Block status check:", { isEnabled, config });

        return json({ isEnabled, config });

    } catch (error) {
        console.error("Error checking highlights status:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
};

export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const action = formData.get("action");
    const productId = formData.get("productId");

    if (!productId) {
        return json({ error: "Product ID is required" }, { status: 400 });
    }

    try {
        if (action === "enable") {
            // Enable gridview for this product
            const mutation = `
                mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
                    metafieldsSet(metafields: $metafields) {
                        metafields { id key namespace }
                        userErrors { field message }
                    }
                }
            `;

            const variables = {
                metafields: [{
                    namespace: "custom",
                    key: "gridview_enabled",
                    type: "boolean",
                    value: "true",
                    ownerId: productId,
                }],
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
            
            if (result.errors || result.data?.metafieldsSet?.userErrors?.length > 0) {
                return json({ 
                    error: "Failed to enable highlights",
                    details: result.errors || result.data.metafieldsSet.userErrors 
                }, { status: 400 });
            }

            return json({ success: true, message: "Highlights enabled successfully" });

        } else if (action === "disable") {
            // Disable gridview for this product
            const mutation = `
                mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
                    metafieldsSet(metafields: $metafields) {
                        metafields { id key namespace }
                        userErrors { field message }
                    }
                }
            `;

            const variables = {
                metafields: [{
                    namespace: "custom",
                    key: "gridview_enabled",
                    type: "boolean",
                    value: "false",
                    ownerId: productId,
                }],
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
            
            if (result.errors || result.data?.metafieldsSet?.userErrors?.length > 0) {
                return json({ 
                    error: "Failed to disable highlights",
                    details: result.errors || result.data.metafieldsSet.userErrors 
                }, { status: 400 });
            }

            return json({ success: true, message: "Highlights disabled successfully" });

        } else {
            return json({ error: "Invalid action" }, { status: 400 });
        }

    } catch (error) {
        console.error("Error updating highlights status:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
};
