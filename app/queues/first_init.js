import { Queue, Worker, Job } from "bullmq";
import ShopifyInit from "../shopify_theme/shopifyInit";
import ShopifyProduct from "../server/services/product";


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
    const { admin, session } = job.data;
    // console.log("Admin trong queue first_init \n", admin);
    // console.log("Session trong queue first_init \n", session);

    // console.log("Before sync product");
    // await syncProductQueue.add('sync_product', { admin, session });

    // console.log("Before shopify init");
    const shopifyInit = new ShopifyInit(admin,session);
    await shopifyInit.init();

    // Thực hiện gửi email ở đây, ví dụ sử dụng nodemailer
    // const { to, subject } = { to: 'abc', subject: '123' };
    // console.log(`Gửi email đến ${to}: ${subject}`);
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
    // console.log("Sync product worker");
    const { admin, cursor, session } = job.data;
    let currentCursor = cursor;

    // console.log("Admin trong queue sync_product \n", admin);
    // console.log("Session trong queue sync_product \n", session);

    const shopifyProductService = new ShopifyProduct(admin, session);
    await shopifyProductService.syncProducts(currentCursor);


  },
  { connection }
);

syncProductWorker.on("failed", (job, err) => {
  // console.error(`Job ${job.id} thất bại: ${err}`, job);
});
