import { Queue } from "bullmq";
import Shopify from "@shopify/shopify-api";

const connection = {
  host: "localhost",
  port: 6782,
};

const firstInitQueue = new Queue("first_init", { connection });

/**
 * 🛠 Hàm lấy session từ Shopify Session Storage
 */
async function getSession(shop) {
  console.log("🔍 Đang lấy session cho shop:", shop);
  
  // Lấy session từ Shopify session storage
  const session = await Shopify.sessionStorage.loadSession(`offline_${shop}`);
  
  if (!session || !session.accessToken) {
    console.error("❌ Không tìm thấy session hoặc accessToken không hợp lệ!");
    return null;
  }

  console.log("✅ Session hợp lệ:", session);
  return session;
}

/**
 * 🛠 Hàm tạo Admin GraphQL Client từ session
 */
async function getAdminClient(shop) {
  const session = await getSession(shop);
  if (!session) return null;

  const admin = new Shopify.Clients.Graphql(session.shop, session.accessToken);
  console.log("✅ Admin GraphQL client đã được khởi tạo!");
  return admin;
}

/**
 * 🛠 Hàm thêm test job vào queue
 */
async function addTestJob() {
  console.log("🚀 Đang thêm job test vào queue...");

  const shop = "your-shop-name.myshopify.com"; // Thay thế bằng shop hợp lệ
  const admin = await getAdminClient(shop);

  if (!admin) {
    console.error("❌ Không thể tạo Admin Client!");
    return;
  }

  await firstInitQueue.add("test_job", { admin, session: { id: `offline_${shop}` } });

  console.log("✅ Job test đã được thêm vào queue!");
}

// Thực thi hàm
addTestJob();
