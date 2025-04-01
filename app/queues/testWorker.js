import { Worker } from "bullmq";

const connection = {
  host: "localhost",
  port: 6782,
};

console.log("🚀 Đang khởi động Worker...");

const worker = new Worker(
  "first_init",
  async (job) => {
    console.log("✅ Worker đã nhận job:", job.data);
  },
  { connection }
);

worker.on("error", (err) => {
  console.error("❌ Worker gặp lỗi:", err);
});
