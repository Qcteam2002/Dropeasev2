import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
// import installedQueue from './queue'; // Import the queue
import { firstInitQueue } from "./queues/first_init";
import UserServices from "./server/services/user.js";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  isEmbeddedApp: true,
  hooks: {
    afterAuth: async ({ session, admin }) => {
      const userService = new UserServices(admin,session);
      await userService.updateUser();

      await firstInitQueue.add('first_init', { admin, session });
      // Add the job to the queue
      // installedQueue.add('installed',{
      //   shop: session.shop,
      //   accessToken: session.accessToken,
      // });

      // await Promise.all([initShopData(admin, session), installApp(prisma, admin.graphql, session)])
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export const getUser = async (request) => {
  const { session } = await shopify.authenticate.admin(request);
  const user = await prisma.user.findUnique({
    where: {
      sessionId: session.id,
    },
  });

  return user;
}

export default shopify;
export const apiVersion = ApiVersion.October24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
