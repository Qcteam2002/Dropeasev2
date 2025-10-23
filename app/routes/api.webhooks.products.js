import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function action({ request }) {
  // ✅ authenticate.webhook already parses the body, returns payload
  const { topic, shop, session, payload } = await authenticate.webhook(request);

  if (!session) {
    return json({ success: false }, { status: 401 });
  }

  try {
    // ✅ Use payload from authenticate, don't read request.json() again
    const data = payload;

    switch (topic) {
      case "products/create":
        console.log("🆕 Processing products/create webhook");
        await handleProductCreate(data);
        break;
      case "products/update":
        console.log("🔄 Processing products/update webhook");
        await handleProductUpdate(data);
        break;
      case "products/delete":
        console.log("🗑️ Processing products/delete webhook");
        await handleProductDelete(data);
        break;
      default:
        console.log(`⚠️ Unhandled webhook topic: ${topic}`);
    }

    console.log(`✅ Successfully processed webhook for ${topic}`);
    return json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    console.error("Stack trace:", error.stack);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}

async function handleProductCreate(data) {
  const product = data;
  console.log(`🆕 Creating product: ${product.title}`);
  console.log("📝 Product data:", JSON.stringify(product, null, 2));

  try {
    // Create product in platformProduct table
    const createdProduct = await prisma.platformProduct.create({
      data: {
        platformId: product.id.toString(),
        title: product.title,
        descriptionHtml: product.body_html,
        featuredMedia: product.image?.src || null,
        variants: JSON.stringify(product.variants),
        status: "ACTIVE",
        media: JSON.stringify(product.images || []),
        options: JSON.stringify(product.options || []),
        metafields: JSON.stringify(product.metafields || [])
      }
    });
    console.log("✅ Created platform product:", JSON.stringify(createdProduct, null, 2));

    // Create corresponding entry in productsOptimized table
    const optimizedProduct = await prisma.productsOptimized.create({
      data: {
        productId: createdProduct.id,
        optimizedTitle: product.title,
        optimizedDescription: product.body_html,
        gridView: "[]", // Initialize empty grid view
        reviewConfiguration: "{}", // Initialize empty review config
        gridviewConfiguration: "{}" // Initialize empty gridview config
      }
    });
    console.log("✅ Created optimized product:", JSON.stringify(optimizedProduct, null, 2));

    return createdProduct;
  } catch (error) {
    console.error(`❌ Error creating product: ${error.message}`);
    console.error("Stack trace:", error.stack);
    throw error;
  }
}

async function handleProductUpdate(data) {
  const product = data;
  console.log(`🔄 Updating product: ${product.title}`);
  console.log("📝 Product data:", JSON.stringify(product, null, 2));

  try {
    // Find existing product
    const existingProduct = await prisma.platformProduct.findFirst({
      where: {
        platformId: product.id.toString()
      }
    });

    if (!existingProduct) {
      console.log("⚠️ Product not found in database, creating new entry");
      return await handleProductCreate(data);
    }

    // Update platformProduct
    const updatedProduct = await prisma.platformProduct.update({
      where: {
        id: existingProduct.id
      },
      data: {
        title: product.title,
        descriptionHtml: product.body_html,
        featuredMedia: product.image?.src || null,
        variants: JSON.stringify(product.variants),
        status: product.status,
        media: JSON.stringify(product.images || []),
        options: JSON.stringify(product.options || []),
        metafields: JSON.stringify(product.metafields || [])
      }
    });
    console.log("✅ Updated platform product:", JSON.stringify(updatedProduct, null, 2));

    // Update productsOptimized
    const optimizedProduct = await prisma.productsOptimized.upsert({
      where: {
        productId: existingProduct.id
      },
      update: {
        optimizedTitle: product.title,
        optimizedDescription: product.body_html
      },
      create: {
        productId: existingProduct.id,
        optimizedTitle: product.title,
        optimizedDescription: product.body_html,
        gridView: "[]",
        reviewConfiguration: "{}",
        gridviewConfiguration: "{}"
      }
    });
    console.log("✅ Updated optimized product:", JSON.stringify(optimizedProduct, null, 2));

    return updatedProduct;
  } catch (error) {
    console.error(`❌ Error updating product: ${error.message}`);
    console.error("Stack trace:", error.stack);
    throw error;
  }
}

async function handleProductDelete(data) {
  const product = data;
  console.log(`🗑️ Deleting product: ${product.title}`);
  console.log("📝 Product data:", JSON.stringify(product, null, 2));

  try {
    // Find existing product
    const existingProduct = await prisma.platformProduct.findFirst({
      where: {
        platformId: product.id.toString()
      }
    });

    if (!existingProduct) {
      console.log("⚠️ Product not found in database");
      return;
    }

    // Update status to DELETED in platformProduct
    const deletedProduct = await prisma.platformProduct.update({
      where: {
        id: existingProduct.id
      },
      data: {
        status: "DELETED"
      }
    });
    console.log("✅ Marked platform product as deleted:", JSON.stringify(deletedProduct, null, 2));

    // Delete entry from productsOptimized
    await prisma.productsOptimized.delete({
      where: {
        productId: existingProduct.id
      }
    });
    console.log("✅ Deleted optimized product");

    return deletedProduct;
  } catch (error) {
    console.error(`❌ Error deleting product: ${error.message}`);
    console.error("Stack trace:", error.stack);
    throw error;
  }
} 