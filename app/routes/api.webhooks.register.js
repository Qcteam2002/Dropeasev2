import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function action({ request }) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const { admin } = await authenticate.admin(request);

  try {
    const webhooks = [
      {
        topic: "products/create",
        address: "/api/webhooks/products"
      },
      {
        topic: "products/update",
        address: "/api/webhooks/products"
      },
      {
        topic: "products/delete",
        address: "/api/webhooks/products"
      }
    ];

    // Register each webhook
    for (const webhook of webhooks) {
      const response = await admin.graphql(`
        mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
          webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
            userErrors {
              field
              message
            }
            webhookSubscription {
              id
            }
          }
        }
      `, {
        variables: {
          topic: webhook.topic.toUpperCase(),
          webhookSubscription: {
            callbackUrl: `${process.env.SHOPIFY_APP_URL}${webhook.address}`,
            format: "JSON"
          }
        }
      });

      const result = await response.json();
      if (result.data.webhookSubscriptionCreate.userErrors.length > 0) {
        console.error('Error creating webhook:', result.data.webhookSubscriptionCreate.userErrors);
        return json({ success: false, error: result.data.webhookSubscriptionCreate.userErrors[0].message });
      }
    }

    return json({ success: true });
  } catch (error) {
    console.error('Error registering webhooks:', error);
    return json({ success: false, error: error.message });
  }
} 