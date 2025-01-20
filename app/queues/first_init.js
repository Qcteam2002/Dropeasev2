import { Queue, Worker, Job } from "bullmq";
import ShopifyInit from "../shopify_theme/shopifyInit";
import ShopifyProduct from "../services/product";

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
    const { admin, cursor } = job.data;
    const limitPage = 25;
    const ShopifyProduct = new ShopifyProduct(admin);

    let currentCursor = cursor;


      const products = await ShopifyProductInstance.getProducts(limitPage, currentCursor);

      if (products.edges.length > 0) {
        // Store products in the database
        for (const edge of products.edges) {
          const product = edge.node;
          
          
        }

        // Update cursor for the next batch
        currentCursor = products[products.length - 1].cursor;

        // Add a new job to the queue to process the next batch
        await syncProductQueue.add("sync_product", {
          admin,
          cursor: currentCursor,
        });
      } 


    if(products.length > 0) {

      // const lastProduct = products[products.length - 1];
      // await syncProductQueue.add("sync_product", {
      //   admin,
      //   cursor: lastProduct.cursor,
      // });
    }


  },
  { connection }
);
