import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    
    try {
        console.log("🔍 Manually checking theme for app blocks...");
        
        // Get current theme
        const query = `
            query getCurrentTheme {
                shop {
                    theme {
                        id
                        name
                        role
                        sections {
                            id
                            type
                            blocks {
                                id
                                type
                                settings
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
        
        const { data } = await response.json();
        const theme = data?.shop?.theme;
        
        if (!theme) {
            return json({ error: "No theme found" }, { status: 404 });
        }
        
        console.log("🎨 Current theme:", theme.name, "Role:", theme.role);
        
        // Check for app blocks
        let hasGridViewBlock = false;
        let hasTryOnBlock = false;
        let blockDetails = [];
        
        theme.sections?.forEach(section => {
            section.blocks?.forEach(block => {
                if (block.type === "gridview-block") {
                    hasGridViewBlock = true;
                    blockDetails.push({
                        section: section.type,
                        block: block.type,
                        id: block.id
                    });
                    console.log("✅ Found gridview-block in section:", section.type);
                }
                if (block.type === "tryon-widget-block") {
                    hasTryOnBlock = true;
                    blockDetails.push({
                        section: section.type,
                        block: block.type,
                        id: block.id
                    });
                    console.log("✅ Found tryon-widget-block in section:", section.type);
                }
            });
        });
        
        // Get shop ID for metafields
        const shopIdQuery = `{ shop { id } }`;
        const shopIdResponse = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
            method: "POST",
            headers: {
                "X-Shopify-Access-Token": session.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: shopIdQuery }),
        });
        
        const { data: shopData } = await shopIdResponse.json();
        const shopId = shopData?.shop?.id;
        
        if (shopId) {
            // Update metafields based on found blocks
            const mutation = `
                mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
                    metafieldsSet(metafields: $metafields) {
                        metafields { id key namespace }
                        userErrors { field message }
                    }
                }
            `;
            
            const metafields = [];
            
            if (hasGridViewBlock) {
                metafields.push({
                    namespace: "custom",
                    key: "gridview_enabled",
                    type: "boolean",
                    value: "true",
                    ownerId: shopId,
                });
            } else {
                metafields.push({
                    namespace: "custom",
                    key: "gridview_enabled",
                    type: "boolean",
                    value: "false",
                    ownerId: shopId,
                });
            }
            
            if (hasTryOnBlock) {
                metafields.push({
                    namespace: "custom",
                    key: "tryon_enabled",
                    type: "boolean",
                    value: "true",
                    ownerId: shopId,
                });
            } else {
                metafields.push({
                    namespace: "custom",
                    key: "tryon_enabled",
                    type: "boolean",
                    value: "false",
                    ownerId: shopId,
                });
            }
            
            const updateResponse = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
                method: "POST",
                headers: {
                    "X-Shopify-Access-Token": session.accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    query: mutation, 
                    variables: { metafields }
                }),
            });
            
            const updateResult = await updateResponse.json();
            console.log("📝 Metafields update result:", updateResult);
        }
        
        return json({ 
            success: true,
            hasGridViewBlock,
            hasTryOnBlock,
            blockDetails,
            theme: {
                name: theme.name,
                role: theme.role
            }
        });
        
    } catch (error) {
        console.error("❌ Error checking theme blocks:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
};















