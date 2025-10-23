import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  try {
    // Get shop metafields for gridview content
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
    
    // Find gridview content metafield
    const gridviewContentMetafield = metafields.find(
      edge => edge.node.key === "gridview_content"
    );

    const content = gridviewContentMetafield ? 
      JSON.parse(gridviewContentMetafield.node.value) : null;

    console.log("🔍 Gridview content from metafields:", content);

    return json({ 
      success: true, 
      content: content,
      hasContent: !!content
    });

  } catch (error) {
    console.error("Error fetching gridview content:", error);
    return json({ 
      success: false, 
      error: "Internal server error" 
    }, { status: 500 });
  }
};
