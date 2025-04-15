import { admin } from "../shopify.server";

const METAFIELD_NAMESPACE = "custom";
const METAFIELD_KEY = "sticky_bar_config";

export const StickyBarService = {
  async getSettings(shop, accessToken) {
    const client = new admin.graphql.GraphqlClient({ shop, accessToken });

    const query = `
      query {
        shop {
          metafield(namespace: "${METAFIELD_NAMESPACE}", key: "${METAFIELD_KEY}") {
            value
          }
        }
      }
    `;

    const response = await client.request(query);
    console.log('🔍 Get Settings Response:', response);
    const raw = response?.shop?.metafield?.value;
    const parsed = raw ? JSON.parse(raw) : null;
    console.log('📦 Parsed Settings:', parsed);
    return parsed;
  },

  async saveSettings(payload, shop, accessToken) {
    console.log('💾 Saving Settings:', payload);
    const client = new admin.graphql.GraphqlClient({ shop, accessToken });

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
      metafields: [
        {
          namespace: METAFIELD_NAMESPACE,
          key: METAFIELD_KEY,
          type: "json",
          value: JSON.stringify(payload),
          ownerType: "SHOP",
        },
      ],
    };

    const result = await client.request(mutation, variables);
    console.log('✅ Save Settings Result:', result);
    return result;
  },
};
