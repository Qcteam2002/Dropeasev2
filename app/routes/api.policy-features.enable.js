import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    console.log('📝 Policy Features Enable API called');
    
    const { session } = await authenticate.admin(request);
    const { shop } = await request.json();
    
    console.log('🔑 Authenticated session for shop:', shop);

    // Default configuration for policy features
    const defaultConfig = {
      isActive: true,
      iconSize: 24,
      spacing: 20,
      backgroundColor: "#ffffff",
      iconColor: "#000000",
      selectedFeatures: ["free_shipping", "money_back", "secure_payment", "easy_returns"]
    };

    console.log('⚙️ Using default config:', defaultConfig);

    // Create metafield definition
    const createDefinitionMutation = `
      mutation {
        metafieldDefinitionCreate(definition: {
          name: "Policy Features Config",
          namespace: "custom",
          key: "policy_features_config",
          type: JSON,
          ownerType: SHOP,
          access: {
            storefront: PUBLIC_READ
          }
        }) {
          createdDefinition { id }
          userErrors { message }
        }
      }
    `;

    console.log('🏗️ Creating metafield definition...');
    
    const definitionResponse = await fetch(`https://${shop}/admin/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": session.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: createDefinitionMutation }),
    });

    const definitionData = await definitionResponse.json();
    console.log('📋 Metafield definition response:', definitionData);

    // Save metafield value
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
          key: "policy_features_config",
          type: "json",
          value: JSON.stringify(defaultConfig),
          ownerId: session.shop,
        },
      ],
    };

    console.log('💾 Saving metafield value...');
    
    const result = await fetch(`https://${shop}/admin/api/2023-10/graphql.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": session.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const jsonData = await result.json();
    console.log("✅ Policy Features enabled:", jsonData);

    if (jsonData?.data?.metafieldsSet?.userErrors?.length > 0) {
      console.error("❌ Errors saving metafield:", jsonData.data.metafieldsSet.userErrors);
      return json({ success: false, errors: jsonData.data.metafieldsSet.userErrors });
    }

    return json({ success: true, config: defaultConfig });
    
  } catch (error) {
    console.error("❌ Error in policy features enable API:", error);
    return json({ success: false, error: error.message });
  }
}; 