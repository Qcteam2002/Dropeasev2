import {shopifyApi, LATEST_API_VERSION, ApiVersion} from '@shopify/shopify-api';

export const shopify = shopifyApi({
  // The next 4 values are typically read from environment variables for added security
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October24,
  scopes: process.env.SCOPES?.split(","),
  hostName: process.env.SHOPIFY_APP_URL || "",
});


