export default class ShopifyInit {
  constructor(admin) {
    this.admin = admin;
  }

  async initData() {
    // this.admin = admin;
    const mainTheme = await getMainTheme();
    if (!mainTheme) {
      console.error("Main theme not found");
      return;
    }

    console.log(mainTheme);
  }

  async getMainTheme() {
    const query = `#graphql
    query {
      themes {
        edges {
          node {
            id
            name
            role # Lấy theme đang hoạt động (role: main)
          }
        }
      }
    }
  `;

    const response = await this.admin.graphql(query);

    const {
      data: {
        themes: { edges },
      },
    } = await response.json();

    return edges.find(({ node }) => node.role === "main");
  };


  async createAsset ({ themeId, key, value }) {
    const graphThemeId = "gid://shopify/Theme/YOUR_THEME_ID"; // Replace with your theme ID
    const assetKey = "assets/my-custom-script.js";
    const assetValue = `
    console.log('Hello from my custom script!');
    // Your custom JavaScript code here...
  `;

    const query = `
    mutation assetUpdate($asset: AssetInput!) {
      assetUpdate(asset: $asset) {
        asset {
          key
          publicUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

    const variables = {
      asset: {
        key: assetKey,
        value: assetValue,
        themeId: themeId,
      },
    };

    const response = await this.admin.graphql(
      `#graphql
    query WebhookSubscriptionList {
      webhookSubscriptions( first: 10) {
        edges {
          node {
            id
            topic
            endpoint {
              __typename
              ... on WebhookHttpEndpoint {
                callbackUrl
              }
              ... on WebhookEventBridgeEndpoint {
                arn
              }
              ... on WebhookPubSubEndpoint {
                pubSubProject
                pubSubTopic
              }
            }
            createdAt
            updatedAt
            apiVersion {
              handle
            }
            format
            includeFields
            metafieldNamespaces
            privateMetafieldNamespaces
          }
        }
      }
    }`
    );

    const {
      data: {
        webhookSubscriptions: { edges },
      },
    } = await response.json();
  };

}
