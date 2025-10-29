import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  try {
    // Get shop metafields for debugging
    const query = `
      query getShopMetafields {
        shop {
          metafields(first: 50, namespace: "custom") {
            edges {
              node {
                key
                value
                type
                namespace
                id
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
      console.error("GraphQL errors:", result.errors);
      return json({ error: "Failed to fetch shop data", details: result.errors }, { status: 500 });
    }

    const shop = result.data?.shop;
    const metafields = shop?.metafields?.edges || [];
    
    // Find all custom metafields
    const customMetafields = metafields.map(edge => ({
      key: edge.node.key,
      namespace: edge.node.namespace,
      type: edge.node.type,
      id: edge.node.id,
      value: edge.node.value
    }));

    // Find gridview content specifically
    const gridviewContent = metafields.find(
      edge => edge.node.key === "gridview_content"
    );

    console.log("🔍 All custom metafields:", customMetafields);
    console.log("🎯 Gridview content metafield:", gridviewContent?.node);

    return json({ 
      success: true, 
      allMetafields: customMetafields,
      gridviewContent: gridviewContent?.node || null,
      totalMetafields: metafields.length
    });

  } catch (error) {
    console.error("Error debugging metafields:", error);
    return json({ 
      success: false, 
      error: "Internal server error",
      details: error.message
    }, { status: 500 });
  }
};















