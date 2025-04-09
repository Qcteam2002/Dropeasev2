import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";

// TODO: Import hàm để đưa công việc vào hàng đợi xử lý nền
// Ví dụ: import { addWebhookJob } from "../queues/webhookProcessor";

export const action = async ({ request }) => {
  let webhookPayload;
  let topic;
  let shop;

  try {
    // Xác thực webhook và lấy dữ liệu
    const authenticatedWebhook = await authenticate.webhook(request);
    webhookPayload = authenticatedWebhook.payload;
    topic = authenticatedWebhook.topic;
    shop = authenticatedWebhook.shop;

     if (!shop) {
       console.error("Webhook không thể xác thực hoặc thiếu thông tin shop.");
       // authenticate.webhook sẽ throw lỗi nếu xác thực thất bại,
       // nhưng để chắc chắn, ta kiểm tra shop
       throw new Response("Không thể xác thực webhook", { status: 401 });
     }


    console.log(`✅ Webhook ${topic} nhận được từ shop ${shop}.`);
    // console.log("Payload:", JSON.stringify(webhookPayload, null, 2)); // Bỏ comment để xem chi tiết payload

    // --- XỬ LÝ WEBHOOK ---
    // ❗️ CẢNH BÁO: Đoạn code dưới đây xử lý trực tiếp trong action.
    // Để tránh timeout từ Shopify (5 giây), bạn NÊN chuyển logic này
    // sang một hàng đợi xử lý nền (background job queue).
    // Ví dụ: await addWebhookJob(topic, shop, webhookPayload);

    switch (topic) {
      case "products/create":
        console.log(` Bắt đầu xử lý products/create cho shop ${shop}...`);
        // TODO: Viết logic tạo PlatformProduct trong DB từ webhookPayload
        // Cần đảm bảo bạn có trường để lưu shopifyId trong schema Prisma
        // Ví dụ:
        // const shopifyProductId = String(webhookPayload.id);
        // await db.platformProduct.create({
        //   data: {
        //      shopifyId: shopifyProductId,
        //      shop: shop,
        //      title: webhookPayload.title,
        //      // ... các trường khác từ webhookPayload phù hợp với schema của bạn
        //   },
        // });
        console.log(` (Giả lập) Đã xử lý products/create cho sản phẩm ID ${webhookPayload.id}`);
        break;

      case "products/update":
        console.log(` Bắt đầu xử lý products/update cho shop ${shop}...`);
        // TODO: Viết logic cập nhật PlatformProduct trong DB
        // Ví dụ:
        // const shopifyProductId = String(webhookPayload.id);
        // await db.platformProduct.updateMany({ // updateMany phòng trường hợp ID bị trùng (không nên xảy ra)
        //   where: { shopifyId: shopifyProductId, shop: shop },
        //   data: {
        //     title: webhookPayload.title,
        //     // ... cập nhật các trường khác
        //   },
        // });
         console.log(` (Giả lập) Đã xử lý products/update cho sản phẩm ID ${webhookPayload.id}`);
        break;

      case "products/delete":
        console.log(` Bắt đầu xử lý products/delete cho shop ${shop}...`);
        // Payload của delete chỉ chứa { id: <product_id> }
        const productIdToDelete = webhookPayload?.id;
        if (productIdToDelete) {
           const shopifyProductIdStr = String(productIdToDelete);
           // TODO: Viết logic xóa PlatformProduct trong DB
           // Ví dụ:
           // await db.platformProduct.deleteMany({
           //   where: { shopifyId: shopifyProductIdStr, shop: shop },
           // });
          console.log(` (Giả lập) Đã xử lý products/delete cho sản phẩm ID ${shopifyProductIdStr}`);
        } else {
          console.warn(` ⚠️ Không tìm thấy ID sản phẩm trong payload của products/delete.`);
        }
        break;

      default:
        // Quan trọng: Nếu webhook này chỉ dành cho sản phẩm, thì các topic khác là lỗi
        console.warn(` ⚠️ Topic webhook không được xử lý: ${topic}`);
        // Trả về lỗi để Shopify biết không xử lý được topic này
        throw new Response(`Unhandled webhook topic: ${topic}`, { status: 404 }); // 404 Not Found hoặc 400 Bad Request
    }

    // --- PHẢN HỒI CHO SHOPIFY ---
    // Phản hồi 200 OK sau khi xử lý (hoặc đưa vào hàng đợi)
    // Nếu dùng hàng đợi, phản hồi này sẽ được gửi ngay sau khi đưa vào hàng đợi thành công.
    return json({ received: true });

  } catch (error) {
     console.error(`❌ Lỗi khi xử lý webhook ${topic || 'unknown'} từ shop ${shop || 'unknown'}:`, error);

     // Phân biệt lỗi xác thực với lỗi xử lý nội bộ
     if (error instanceof Response) {
       // Nếu lỗi là Response (ví dụ: từ authenticate.webhook hoặc do ta throw)
       return error; // Trả về response lỗi đó
     } else if (error.message.includes("Invalid Hmac") || error.message.includes("Could not validate request")) {
        // Xử lý cụ thể lỗi xác thực nếu authenticate.webhook không throw Response
        return new Response("Webhook authentication failed.", { status: 401 });
     }
      else {
       // Lỗi server khác trong quá trình xử lý
       return json({ error: "Internal Server Error while processing webhook" }, { status: 500 });
     }
  }
}; 