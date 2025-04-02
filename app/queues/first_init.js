import { Queue, Worker, Job } from "bullmq";
import ShopifyInit from "../shopify_theme/shopifyInit";
import ShopifyProduct from "../server/services/product";


const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

console.log("🔍 REDIS_HOST:", process.env.REDIS_HOST);
console.log("🔍 REDIS_PORT:", process.env.REDIS_PORT);

// Tạo queue
console.log("📌 Trước khi thêm job vào queue");
export const firstInitQueue = new Queue("first_init", { connection });
console.log("✅ =============================== Job đã được thêm vào queue");
export const syncProductQueue = new Queue("sync_product", { connection });

// Tạo worker
console.log("🔥 First Init Worker is starting...");
const firstInitWorker = new Worker(
  "first_init", 
  async (job) => {
    console.log("✅ +++++++++++ =====Worker nhận được job!", job);
    const { admin, session } = job.data;
    await syncProductQueue.add('sync_product', { admin, session });

    const shopifyInit = new ShopifyInit(session);
    await shopifyInit.init();
  },
  { connection }
);

firstInitWorker.on("completed", (job) => {
  console.log(`Job ${job.id} đã hoàn thành`);
});

firstInitWorker.on("failed", (job, err) => {
  // console.error(`Job ${job.id} thất bại: ${err}`, job.data);
});

const syncProductWorker = new Worker(
  "sync_product",
  async (job) => {
    const { session, cursor  } = job.data;
    let currentCursor = cursor;
    const shopifyProductService = new ShopifyProduct(session);
    await shopifyProductService.syncProducts(currentCursor);
  },
  { connection }
);

syncProductWorker.on("failed", (job, err) => {
  // console.error(`Job ${job.id} thất bại: ${err}`, job);
});
