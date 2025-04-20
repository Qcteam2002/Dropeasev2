import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

// TODO: Import hàm để đưa công việc vào hàng đợi xử lý nền
// Ví dụ: import { addWebhookJob } from "../queues/webhookProcessor";

export const action = async ({ request }) => {
  let webhookPayload;
  let topic;
  let shop;
  let session;

  try {
    // Xác thực webhook và lấy dữ liệu
    const authenticatedWebhook = await authenticate.webhook(request);
    webhookPayload = authenticatedWebhook.payload;
    topic = authenticatedWebhook.topic;
    shop = authenticatedWebhook.shop;
    session = authenticatedWebhook.session;

    if (!shop || !session) {
      console.error("Webhook không thể xác thực hoặc thiếu thông tin shop/session.");
      throw new Response("Không thể xác thực webhook", { status: 401 });
    }

    console.log(`✅ Webhook ${topic.toUpperCase()} nhận được từ shop ${shop}.`);

    // Chuyển đổi topic về dạng lowercase để so sánh
    const normalizedTopic = topic.toLowerCase();

    switch (normalizedTopic) {
      case "products_create":
        console.log(` Bắt đầu xử lý products/create cho shop ${shop}...`);
        await handleProductCreate(webhookPayload, session);
        break;

      case "products_update":
        console.log(` Bắt đầu xử lý products/update cho shop ${shop}...`);
        await handleProductUpdate(webhookPayload, session);
        break;

      case "products_delete":
        console.log(` Bắt đầu xử lý products/delete cho shop ${shop}...`);
        const productIdToDelete = webhookPayload?.id;
        if (productIdToDelete) {
          await handleProductDelete(webhookPayload, session);
        } else {
          console.warn(` ⚠️ Không tìm thấy ID sản phẩm trong payload của products/delete.`);
        }
        break;

      default:
        console.warn(` ⚠️ Topic webhook không được xử lý: ${topic}`);
        throw new Response(`Unhandled webhook topic: ${topic}`, { status: 404 });
    }

    return json({ received: true });

  } catch (error) {
    console.error(`❌ Lỗi khi xử lý webhook ${topic || 'unknown'} từ shop ${shop || 'unknown'}:`, error);

    if (error instanceof Response) {
      return error;
    } else if (error.message.includes("Invalid Hmac") || error.message.includes("Could not validate request")) {
      return new Response("Webhook authentication failed.", { status: 401 });
    } else {
      return json({ error: "Internal Server Error while processing webhook" }, { status: 500 });
    }
  }
}

// Function chung để xử lý dữ liệu sản phẩm
function processProductData(product) {
  return {
    title: product.title,
    descriptionHtml: product.body_html,
    featuredMedia: product.image?.src || null,
    variants: JSON.stringify(product.variants || [], (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ),
    status: product.status || "ACTIVE",
    media: JSON.stringify(product.images || [], (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ),
    options: JSON.stringify(product.options || [], (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ),
    metafields: JSON.stringify(product.metafields || [], (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ),
    collections: JSON.stringify(product.collections || [], (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ),
    handle: product.handle,
    vendor: product.vendor,
    productType: product.product_type,
    tags: product.tags,
    publishedAt: product.published_at ? new Date(product.published_at) : null
  };
}

async function handleProductUpdate(product, session) {
  console.log(`🔄 Updating product: ${product.title}`);
  console.log("📝 Product data:", JSON.stringify(product, (key, value) => 
    typeof value === 'bigint' ? value.toString() : value
  ));

  try {
    await prisma.$connect();
    
    // Find user by session
    const user = await prisma.user.findFirst({
      where: { sessionId: session.id }
    });

    if (!user) {
      throw new Error("User not found for this session");
    }
    
    // Find existing product
    const existingProduct = await prisma.platformProduct.findFirst({
      where: {
        platformId: product.id.toString(),
        userId: user.id
      }
    });

    if (!existingProduct) {
      console.log("⚠️ Product not found in database, creating new entry");
      return await handleProductCreate(product, session);
    }

    // Update platformProduct
    const updatedProduct = await prisma.platformProduct.update({
      where: {
        id: existingProduct.id
      },
      data: processProductData(product)
    });
    console.log("✅ Updated platform product:", JSON.stringify(updatedProduct, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ));

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
        gridView: "[]"
      }
    });
    console.log("✅ Updated optimized product:", JSON.stringify(optimizedProduct, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ));

    return { updatedProduct, optimizedProduct };
  } catch (error) {
    console.error(`❌ Error updating product: ${error.message}`);
    console.error("Stack trace:", error.stack);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function handleProductCreate(product, session) {
  console.log(`🆕 Creating product: ${product.title}`);
  console.log("📝 Product data:", JSON.stringify(product, (key, value) => 
    typeof value === 'bigint' ? value.toString() : value
  ));

  try {
    await prisma.$connect();

    // Find user by session
    const user = await prisma.user.findFirst({
      where: { sessionId: session.id }
    });

    if (!user) {
      throw new Error("User not found for this session");
    }

    // Create product in platformProduct table
    const createdProduct = await prisma.platformProduct.create({
      data: {
        platformId: product.id.toString(),
        userId: user.id,
        ...processProductData(product)
      }
    });
    console.log("✅ Created platform product:", JSON.stringify(createdProduct, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ));

    // Create corresponding entry in productsOptimized table
    const optimizedProduct = await prisma.productsOptimized.create({
      data: {
        productId: createdProduct.id,
        optimizedTitle: product.title,
        optimizedDescription: product.body_html,
        gridView: "[]"
      }
    });
    console.log("✅ Created optimized product:", JSON.stringify(optimizedProduct, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ));

    return { createdProduct, optimizedProduct };
  } catch (error) {
    console.error(`❌ Error creating product: ${error.message}`);
    console.error("Stack trace:", error.stack);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function handleProductDelete(product, session) {
  console.log(`🗑️ Deleting product: ${product.title}`);
  console.log("📝 Product data:", JSON.stringify(product, (key, value) => 
    typeof value === 'bigint' ? value.toString() : value
  ));

  try {
    await prisma.$connect();
    
    // Find user by session
    const user = await prisma.user.findFirst({
      where: { sessionId: session.id }
    });

    if (!user) {
      throw new Error("User not found for this session");
    }

    // Find existing product
    const existingProduct = await prisma.platformProduct.findFirst({
      where: {
        platformId: product.id.toString(),
        userId: user.id
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
    console.log("✅ Marked platform product as deleted:", JSON.stringify(deletedProduct, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ));

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