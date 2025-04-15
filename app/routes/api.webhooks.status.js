import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  try {
    // Get all webhooks
    const response = await admin.graphql(`
      query {
        webhookSubscriptions(first: 10) {
          edges {
            node {
              topic
              endpoint {
                __typename
                ... on WebhookHttpEndpoint {
                  callbackUrl
                }
              }
            }
          }
        }
      }
    `);

    const data = await response.json();
    const webhooks = data.data.webhookSubscriptions.edges;

    // Check if we have all required webhooks
    const requiredTopics = ['products/create', 'products/update', 'products/delete'];
    const activeTopics = webhooks.map(webhook => webhook.node.topic);
    
    const active = requiredTopics.every(topic => 
      activeTopics.includes(topic)
    );

    return json({ active });
  } catch (error) {
    console.error('Error checking webhook status:', error);
    return json({ active: false });
  }
} 