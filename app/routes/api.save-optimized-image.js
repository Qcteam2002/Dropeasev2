import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import * as fs from "fs";
import * as path from "path";

export async function action({ request }) {
  try {
    const { admin, session } = await authenticate.admin(request);
    const body = await request.json();
    const { id, optimizedImages } = body;

    if (!id || !optimizedImages) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    // Tạo thư mục nếu chưa tồn tại
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Lưu vào file
    const filePath = path.join(dir, 'optimized_images.json');
    let existingData = {};
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    }

    // Thêm dữ liệu mới
    existingData[id] = optimizedImages;

    // Lưu lại file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log("💾 Đã lưu hình ảnh đã tối ưu vào file:", filePath);

    return json({ success: true });
  } catch (error) {
    console.error("❌ Lỗi khi lưu hình ảnh đã tối ưu:", error);
    return json({ error: error.message }, { status: 500 });
  }
} 