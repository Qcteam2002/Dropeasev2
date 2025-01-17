import { Queue, Worker, Job } from "bullmq";
import ShopifyInit from "../shopify_theme/shopifyInit";

const connection = {
  host: process.env.REDIS_HOST, 
  port: process.env.REDIS_PORT,
};

// Tạo queue
export const firstInitQueue = new Queue("first_init", { connection });
export const syncProductQueue = new Queue("sync_product", { connection });

// Tạo worker
const firstInitWorker = new Worker(
  "first_init",
  async (job) => {
    const { admin } = job.data;

    const shopifyInit = new ShopifyInit(admin);
    await shopifyInit.init();

    // Thực hiện gửi email ở đây, ví dụ sử dụng nodemailer
    const { to, subject } = {to:'abc',subject:'123'};
    console.log(`Gửi email đến ${to}: ${subject}`);
  },
  { connection }
);

firstInitWorker.on("completed", (job) => {
  console.log(`Job ${job.id} đã hoàn thành`);
});

firstInitWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} thất bại: ${err}`);
});

const syncProductWorker = new Worker(
  "sync_product",
  async (job) => {
    const { admin } = job.data;

    console.log(`entry syncProductWorker`);
  },
  { connection }
);
