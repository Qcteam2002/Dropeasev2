import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  const content = JSON.parse(formData.get("content"));
  const layout = formData.get("layout");
  const productId = formData.get("productId");

  if (!content || !layout || !productId) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
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

    // Prepare metafields data
    const metafieldsData = {
      namespace: "custom",
      key: "gridview_content",
      type: "json",
      value: JSON.stringify({
        layout: layout,
        content: content,
        productId: productId,
        updatedAt: new Date().toISOString()
      }),
      ownerId: shopId,
    };

    // Push to Shopify metafields
    const mutation = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields { 
            id 
            key 
            namespace 
            value 
          }
          userErrors { 
            field 
            message 
          }
        }
      }
    `;

    const variables = {
      metafields: [metafieldsData],
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
      console.error("Error pushing content to metafields:", result.errors || result.data.metafieldsSet.userErrors);
      return json({ 
        success: false, 
        errors: result.errors || result.data.metafieldsSet.userErrors 
      }, { status: 400 });
    }

    console.log("✅ Content pushed to Shopify metafields successfully");
    
    return json({ 
      success: true, 
      metafield: result.data.metafieldsSet.metafields[0],
      message: "Content pushed to storefront successfully!"
    });

  } catch (error) {
    console.error("Error pushing content:", error);
    return json({ 
      success: false, 
      error: "Internal server error" 
    }, { status: 500 });
  }
};
