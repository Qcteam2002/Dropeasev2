import metafields from "./metafield_config.js";
import { getClients } from "../server/services/shopifyApi.js";

export default class ShopifyInit {
  constructor(session) {
    this.session = session;
  }

  async init() {
    console.log("🔥 Running init()...");
    console.log(`🏪 Shop: ${this.session.shop}`);
    try {
      await this.defineMetafield();
    console.log("✅ Finished init()");
    } catch (error) {
      console.error("❌ Error during initialization:", error);
      throw error;
    }
  }

  async createMetafield(metafield) {
    console.log(`🚀 Sending request to create Metafield: ${metafield.namespace}.${metafield.key}`);
    const query = `#graphql
  mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
    metafieldDefinitionCreate(definition: $definition) {
      createdDefinition {
        name
        namespace
        key
      }
      userErrors {
        field
        message
        code
      }
    }
  }`;

    const variables = {
      variables: {
        definition: {
          name: metafield.name,
          namespace: metafield.namespace,
          key: metafield.key,
          description: metafield.description,
          type: metafield.type,
          ownerType: metafield.ownerType,
          access: {
            admin: "PUBLIC_READ_WRITE",
            storefront: metafield.access.storefront,
          },
        },
      },
    };

    const client = await getClients(this.session);
    const response = await client.request(query, variables);
    console.log(`📦 Metafield creation response:`, JSON.stringify(response, null, 2));
  }

  async defineMetafield() {
    console.log("Define metafield");
    for (const metafield of metafields) {
      await this.createMetafield(metafield);
    }
  }
}
