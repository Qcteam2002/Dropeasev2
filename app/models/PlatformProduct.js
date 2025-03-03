import db from "../db.server";

export async function getProducts(user) {
  const products = await db.platformProduct.findMany({
    where: { userId: user.id },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) return [];

  return products;
}

export async function getProduct(id) {
  const product = await db.platformProduct.findFirst({
    where: { id: id },
    orderBy: { id: "desc" },
  });

  return product;
}

