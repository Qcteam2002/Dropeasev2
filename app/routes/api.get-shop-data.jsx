import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loader({ request }) {
  const url = new URL(request.url);
  const shopDomain = url.searchParams.get("shop");

  if (!shopDomain) {
    return json({ error: "Shop parameter is required" }, { status: 400 });
  }

  try {
    // Find the shop in database
    const session = await prisma.session.findFirst({
      where: {
        shop: shopDomain
      }
    });

    if (!session) {
      return json({ error: "Shop not found or not installed" }, { status: 404 });
    }

    // Return shop data (be careful with sensitive data)
    return json({
      shop: session.shop,
      accessToken: session.accessToken,
      // Add storefront access token if you have one
      storefrontAccessToken: session.storefrontAccessToken || null,
      isActive: session.isOnline,
    });
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return json({ error: "Failed to fetch shop data" }, { status: 500 });
  }
}

// Also allow POST requests for more secure token exchange
export async function action({ request }) {
  if (request.method === "POST") {
    const body = await request.json();
    const { shop } = body;

    if (!shop) {
      return json({ error: "Shop is required" }, { status: 400 });
    }

    try {
      const session = await prisma.session.findFirst({
        where: {
          shop: shop
        }
      });

      if (!session) {
        return json({ error: "Shop not found" }, { status: 404 });
      }

      return json({
        shop: session.shop,
        accessToken: session.accessToken,
        storefrontAccessToken: session.storefrontAccessToken || null,
        isActive: session.isOnline,
      });
    } catch (error) {
      console.error("Error:", error);
      return json({ error: "Server error" }, { status: 500 });
    }
  }

  return json({ error: "Method not allowed" }, { status: 405 });
} 