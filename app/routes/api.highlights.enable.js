import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    
    try {
        console.log("🔧 Manually enabling gridview block...");
        
        // Get shop ID
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
        
        if (!shopId) {
            return json({ error: "Could not get shop ID" }, { status: 500 });
        }
        
        console.log("🏪 Shop ID:", shopId);
        
        // Set gridview_enabled to true
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
                ownerId: shopId,
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
        console.log("📝 Metafield set result:", result);
        
        if (result.errors || result.data?.metafieldsSet?.userErrors?.length > 0) {
            return json({ 
                error: "Failed to enable block",
                details: result.errors || result.data.metafieldsSet.userErrors 
            }, { status: 400 });
        }
        
        return json({ 
            success: true, 
            message: "Block enabled successfully",
            shopId: shopId
        });
        
    } catch (error) {
        console.error("❌ Error enabling block:", error);
        return json({ error: "Internal server error" }, { status: 500 });
    }
};












