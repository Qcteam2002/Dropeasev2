import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

    return json({ 
      success: true, 
      allMetafields: customMetafields,
      gridviewContent: gridviewContent?.node || null,
      totalMetafields: metafields.length,
      shop: session.shop
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

export default function DebugHighlights() {
  const data = useLoaderData();

  if (!data.success) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Debug Error</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>🔍 Debug Highlights Content</h1>
      
      <h2>📊 Shop Info</h2>
      <p><strong>Shop:</strong> {data.shop}</p>
      <p><strong>Total Metafields:</strong> {data.totalMetafields}</p>
      
      <h2>🎯 Gridview Content</h2>
      {data.gridviewContent ? (
        <div>
          <p><strong>Found:</strong> ✅</p>
          <p><strong>Key:</strong> {data.gridviewContent.key}</p>
          <p><strong>Type:</strong> {data.gridviewContent.type}</p>
          <p><strong>ID:</strong> {data.gridviewContent.id}</p>
          <h3>Content Value:</h3>
          <pre style={{ 
            background: "#f5f5f5", 
            padding: "10px", 
            borderRadius: "4px",
            overflow: "auto",
            maxHeight: "400px"
          }}>
            {JSON.stringify(JSON.parse(data.gridviewContent.value), null, 2)}
          </pre>
        </div>
      ) : (
        <p><strong>Found:</strong> ❌ No gridview_content metafield found</p>
      )}
      
      <h2>📋 All Custom Metafields</h2>
      <div style={{ 
        background: "#f5f5f5", 
        padding: "10px", 
        borderRadius: "4px",
        overflow: "auto",
        maxHeight: "400px"
      }}>
        <pre>{JSON.stringify(data.allMetafields, null, 2)}</pre>
      </div>
      
      <h2>🔗 Test Links</h2>
      <ul>
        <li>
          <a href={`https://${data.shop}/admin/themes/current/editor?template=product&addAppBlockId=2ffd238e00074de340be24c6da5d6883/gridview-block&target=newAppsSection`} target="_blank">
            Add GridView Block to Theme
          </a>
        </li>
        <li>
          <a href={`https://${data.shop}/products`} target="_blank">
            View Products (to test storefront)
          </a>
        </li>
      </ul>
    </div>
  );
}






