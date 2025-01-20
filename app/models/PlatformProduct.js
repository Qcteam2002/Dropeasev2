import qrcode from "qrcode";
import invariant from "tiny-invariant";
import db from "../db.server";

export async function getProduct(id) {}

export async function upsert(product,session) {
  await db.PlatformProduct.upsert({
    where: { userId: session.userId,sourceProductId: product.id },
    update: {
      title: product.title,
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

export async function getProducts(shop, graphql) {
  const qrCodes = await db.qRCode.findMany({
    where: { shop },
    orderBy: { id: "desc" },
  });

  if (qrCodes.length === 0) return [];

  return Promise.all(
    qrCodes.map((qrCode) => supplementQRCode(qrCode, graphql))
  );
}

export function validateQRCode(data) {
  const errors = {};

  if (!data.title) {
    errors.title = "Title is required";
  }

  if (!data.productId) {
    errors.productId = "Product is required";
  }

  if (!data.destination) {
    errors.destination = "Destination is required";
  }

  if (Object.keys(errors).length) {
    return errors;
  }
}
