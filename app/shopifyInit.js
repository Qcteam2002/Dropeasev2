export default class ShopifyInit {
  constructor(admin) {
    this.admin = admin;
  }

  async init() {
    await this.initAsset();
  }

  async initAsset() {
    const mainTheme = await this.getMainTheme();
    if (!mainTheme) {
      console.error("Main theme not found");
      return;
    }
    console.log("Main theme found");
    console.log(mainTheme);
    this.createAsset(mainTheme);
  }

  async getMainTheme() {
    const query = `#graphql
    query {
      themes(first: 1) {
          nodes{
            id
            name
            role # Lấy theme đang hoạt động (role: main)
          }
      }
    }
  `;

    const response = await this.admin.graphql(query);

    const {
      data: {
        themes: { nodes },
      },
    } = await response.json();

    return nodes.find((node) => node.role === "MAIN");
  }

  async createAsset({ id, name }) {
    const fileName = "assets/easydrop.js";
    const fileValue = '{ "sections": {}, "order": [] }';

    const query = `#graphql
    mutation themeFilesUpsert($files: [OnlineStoreThemeFilesUpsertFileInput!]!, $themeId: ID!) {
      themeFilesUpsert(files: $files, themeId: $themeId) {
        upsertedThemeFiles {
      filename
    }
    userErrors {
      field
      message
    }
      }
    }
  `;

    const variables = {
      variables: {
        themeId: id,
        files: [
          {
            filename: fileName,
            body: {
              type: "TEXT",
              value: fileValue,
            },
          },
        ],
      },
    };

    const response = await this.admin.graphql(query, variables);

    const {
      data: {
        themeFilesUpsert: { upsertedThemeFiles, userErrors },
      },
    } = await response.json();

    console.log("upsertedThemeFiles", upsertedThemeFiles);
  }

  async initWebhook() {
    // const response = await this.admin.graphql(
    //   `#graphql
    //   query WebhookSubscriptionList {
    //     webhookSubscriptions( first: 10) {
    //       edges {
    //         node {
    //           id
    //           topic
    //           endpoint {
    //             __typename
    //             ... on WebhookHttpEndpoint {
    //               callbackUrl
    //             }
    //             ... on WebhookEventBridgeEndpoint {
    //               arn
    //             }
    //             ... on WebhookPubSubEndpoint {
    //               pubSubProject
    //               pubSubTopic
    //             }
    //           }
    //           createdAt
    //           updatedAt
    //           apiVersion {
    //             handle
    //           }
    //           format
    //           includeFields
    //           metafieldNamespaces
    //           privateMetafieldNamespaces
    //         }
    //       }
    //     }
    //   }`
    // );

    // // const data = await response.json();

    // const {
    //   data: {
    //     webhookSubscriptions: { edges },
    //   },
    // } = await response.json();

    // console.log("List webhookSubscriptions");
    // console.log(edges);
  }
}
