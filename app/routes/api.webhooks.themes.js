import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    
    try {
        const body = await request.text();
        const hmac = request.headers.get("X-Shopify-Hmac-Sha256");
        
        // Verify webhook authenticity
        const crypto = await import("crypto");
        const hash = crypto
            .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_SECRET || "your-webhook-secret")
            .update(body, "utf8")
            .digest("base64");
        
        if (hash !== hmac) {
            console.error("❌ Webhook verification failed");
            return json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const data = JSON.parse(body);
        console.log("🎨 Theme webhook received:", data);
        
        // Check if it's a theme publish event
        if (data.event_type === "themes/publish") {
            console.log("📝 Theme published, checking for app blocks...");
            
            // Get the published theme
            const themeId = data.theme_id;
            const query = `
                query getTheme($id: ID!) {
                    theme(id: $id) {
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
            `;
            
            const response = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
                method: "POST",
                headers: {
                    "X-Shopify-Access-Token": session.accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    query,
                    variables: { id: `gid://shopify/Theme/${themeId}` }
                }),
            });
            
            const { data: themeData } = await response.json();
            const theme = themeData?.theme;
            
            if (theme && theme.role === "main") {
                console.log("🔍 Checking main theme for app blocks...");
                
                // Check for gridview-block in theme sections
                let hasGridViewBlock = false;
                let hasTryOnBlock = false;
                
                theme.sections?.forEach(section => {
                    section.blocks?.forEach(block => {
                        if (block.type === "gridview-block") {
                            hasGridViewBlock = true;
                            console.log("✅ Found gridview-block in theme");
                        }
                        if (block.type === "tryon-widget-block") {
                            hasTryOnBlock = true;
                            console.log("✅ Found tryon-widget-block in theme");
                        }
                    });
                });
                
                // Update shop metafields with block status
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
                    // Update gridview block status
                    const gridviewMutation = `
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
                        console.log("✅ Updated gridview_enabled to true");
                    }
                    
                    if (hasTryOnBlock) {
                        metafields.push({
                            namespace: "custom",
                            key: "tryon_enabled",
                            type: "boolean",
                            value: "true",
                            ownerId: shopId,
                        });
                        console.log("✅ Updated tryon_enabled to true");
                    }
                    
                    if (metafields.length > 0) {
                        const updateResponse = await fetch(`https://${session.shop}/admin/api/2023-10/graphql.json`, {
                            method: "POST",
                            headers: {
                                "X-Shopify-Access-Token": session.accessToken,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ 
                                query: gridviewMutation, 
                                variables: { metafields }
                            }),
                        });
                        
                        const updateResult = await updateResponse.json();
                        console.log("📝 Metafields update result:", updateResult);
                    }
                }
            }
        }
        
        return json({ success: true });
        
    } catch (error) {
        console.error("❌ Theme webhook error:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
};






