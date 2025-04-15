import { admin } from "../shopify.server";

const METAFIELD_NAMESPACE = "custom";
const METAFIELD_KEY = "payment_icons_config";

// ✅ Tạm dùng localStorage (sau này thay thành gọi API mà không đổi giao diện)
export const PaymentIconsService = {
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
    const raw = response?.shop?.metafield?.value;
    return raw ? JSON.parse(raw) : null;
  },

  async saveSettings(payload, shop, accessToken) {
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

    await client.request(mutation, variables);
  },
};
