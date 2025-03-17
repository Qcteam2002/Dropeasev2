import qrcode from "qrcode";
import invariant from "tiny-invariant";
import db from "../db.server";

export async function getProducts(user) {
  const products = await db.platformProduct.findMany({
    where: { user },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) return [];

  return products;
}

export async function getProduct(id) {}

export async function upsert(product,session) {
  await db.PlatformProduct.upsert({
    where: { userId: session.userId,sourceProductId: product.id },
    update: {
      platformId: product.title,
      description: product.body_html,
      price: product.variants[0].price,
      // Add other fields as needed
    },
    create: {
      id: product.id,
      title: product.title,
      description: product.body_html,
      price: product.variants[0].price,
      // Add other fields as needed
    },
  });

}

