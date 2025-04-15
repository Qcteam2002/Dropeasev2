import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function action({ request }) {
  console.log("📥 Received webhook request");
  console.log("Request method:", request.method);
  console.log("Request headers:", Object.fromEntries(request.headers.entries()));
  
  try {
    const { topic, shop, session } = await authenticate.webhook(request);
    console.log(`🔍 Webhook authentication result:`, { topic, shop, session });

    if (!session) {
      console.log("❌ No valid session found for webhook");
      return json({ success: false, error: "No valid session" }, { status: 401 });
    }

    const rawData = await request.text();
    console.log("Raw webhook data:", rawData);
    
    const data = JSON.parse(rawData);
    console.log(`📦 Parsed webhook payload for ${topic}:`, JSON.stringify(data, null, 2));

    let result;
    switch (topic) {
      case "products/create":
        console.log("🆕 Processing products/create webhook");
        result = await handleProductCreate(data);
        console.log("Create result:", result);
        break;
      case "products/update":
        console.log("🔄 Processing products/update webhook");
        result = await handleProductUpdate(data);
        console.log("Update result:", result);
        break;
      case "products/delete":
        console.log("🗑️ Processing products/delete webhook");
        result = await handleProductDelete(data);
        console.log("Delete result:", result);
        break;
      default:
        console.log(`⚠️ Unhandled webhook topic: ${topic}`);
    }

    console.log(`✅ Successfully processed webhook for ${topic}`);
    return json({ success: true, result });
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
    // Check database connection
    await prisma.$connect();
    console.log("✅ Database connection successful");

    // Log database schema
    const platformProductModel = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'platformProduct'
    `;
    console.log("Platform Product Schema:", platformProductModel);

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
        gridView: "[]",
        reviewConfiguration: "{}",
        gridviewConfiguration: "{}"
      }
    });
    console.log("✅ Created optimized product:", JSON.stringify(optimizedProduct, null, 2));

    return { createdProduct, optimizedProduct };
  } catch (error) {
    console.error(`❌ Error creating product: ${error.message}`);
    console.error("Stack trace:", error.stack);
    
    // Log detailed database error if available
    if (error.code) {
      console.error("Database error code:", error.code);
    }
    if (error.meta) {
      console.error("Database error metadata:", error.meta);
    }
    
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function handleProductUpdate(data) {
  const product = data;
  console.log(`🔄 Updating product: ${product.title}`);
  console.log("📝 Product data:", JSON.stringify(product, null, 2));

  try {
    await prisma.$connect();
    
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

    return { updatedProduct, optimizedProduct };
  } catch (error) {
    console.error(`❌ Error updating product: ${error.message}`);
    console.error("Stack trace:", error.stack);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function handleProductDelete(data) {
  const product = data;
  console.log(`🗑️ Deleting product: ${product.title}`);
  console.log("📝 Product data:", JSON.stringify(product, null, 2));

  try {
    await prisma.$connect();
    
    // Find existing product
    const existingProduct = await prisma.platformProduct.findFirst({
      where: {
        platformId: product.id.toString()
      }
    });

    if (!existingProduct) {
      console.log("⚠️ Product not found in database");
      return null;
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
  } finally {
    await prisma.$disconnect();
  }
} 