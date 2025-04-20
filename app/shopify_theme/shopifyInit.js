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
      // await this.registerWebhooks();
    console.log("✅ Finished init()");
    } catch (error) {
      console.error("❌ Error during initialization:", error);
      throw error;
    }
  }

  async registerWebhooks() {
    console.log("🔔 Starting webhook registration...");
    console.log(`🌐 App URL: ${process.env.SHOPIFY_APP_URL}`);
    
    if (!this.session || !this.session.accessToken) {
      throw new Error("No valid session or access token found");
    }
    
    try {
      console.log("📡 Making request to register webhooks...");
      const response = await fetch(`${process.env.SHOPIFY_APP_URL}/api/webhooks/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.session.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to register webhooks: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const responseData = await response.json();
      console.log("📦 Response data:", JSON.stringify(responseData, null, 2));

      if (!responseData.success) {
        throw new Error(`Webhook registration failed: ${responseData.error || 'Unknown error'}`);
      }

      if (responseData.errors && responseData.errors.length > 0) {
        console.warn("⚠️ Some webhooks failed to register:", responseData.errors);
      }

      if (responseData.registered && responseData.registered.length > 0) {
        console.log("✅ Successfully registered webhooks:", responseData.registered);
      }

      console.log("✅ Webhook registration process completed");
    } catch (error) {
      console.error("❌ Error registering webhooks:", error);
      console.error("Stack trace:", error.stack);
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
