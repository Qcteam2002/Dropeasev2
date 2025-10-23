import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
    const { session } = await authenticate.admin(request);
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');
    
    if (!shop || shop !== session.shop) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
        // Fetch gridview configuration from shop metafields
        const query = `
            query {
                shop {
                    gridviewConfig: metafield(namespace: "custom", key: "gridview_config") {
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
        const gridviewConfig = data?.shop?.gridviewConfig?.value ? JSON.parse(data.shop.gridviewConfig.value) : null;
        
        // Default configuration
        const defaultConfig = {
            layoutType: "zigzag",
            maxItems: 5,
            spacing: 40,
            backgroundColor: "#ffffff",
            textColor: "#333333",
            titleSize: 24,
            descriptionSize: 16,
            borderRadius: 10,
            padding: 20,
            isActive: true
        };
        
        const config = gridviewConfig || defaultConfig;
        
        // Set CORS headers for cross-origin requests
        return json(config, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
            }
        });
        
    } catch (error) {
        console.error('Error fetching gridview config:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};

// Handle preflight requests
export const action = async ({ request }) => {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    }
    
    return json({ error: 'Method not allowed' }, { status: 405 });
};



