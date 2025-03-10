import { json } from "@remix-run/node";
import prisma from "../db.server"; // 🔹 Đảm bảo đường dẫn đúng

export const action = async ({ request }) => {
  console.log("📩 API /api/save-optimized-product đã được gọi!");

  try {
    const method = request.method;

    if (!["POST", "PUT"].includes(method)) {
      console.error("❌ Method không hợp lệ:", method);
      return json({ success: false, message: "Method not allowed" }, { status: 405 });
    }

    const body = await request.json();
    console.log("📩 Dữ liệu nhận được:", body);

    if (!body.id || !body.optimizedTitle || !body.optimizedDescription || !body.gridView) {
      console.error("❌ Thiếu dữ liệu đầu vào!", body);
      return json({ success: false, message: "Thiếu dữ liệu đầu vào!" }, { status: 400 });
    }

    // 🟢 Chuyển ID về BigInt
    const productId = BigInt(body.id);

    // 🟢 Kết nối Prisma
    await prisma.$connect();

    // 🟢 Kiểm tra sản phẩm có tồn tại không
    const existingProduct = await prisma.platformProduct.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return json({ success: false, message: "Sản phẩm không tồn tại!" }, { status: 404 });
    }

    // 🟢 Kiểm tra nếu đã có bản ghi productsOptimized
    const existingOptimized = await prisma.productsOptimized.findUnique({
      where: { productId },
    });

    let savedProduct;

    if (method === "PUT") {
      // 🔹 Nếu ID đã tồn tại → Cập nhật
      if (!existingOptimized) {
        return json({ success: false, message: "Không tìm thấy dữ liệu để cập nhật!" }, { status: 404 });
      }

      savedProduct = await prisma.productsOptimized.update({
        where: { productId },
        data: {
          optimizedTitle: body.optimizedTitle, // 🔥 SỬA LẠI ĐÚNG FIELD
          optimizedDescription: body.optimizedDescription, // 🔥 SỬA LẠI ĐÚNG FIELD
          gridView: JSON.stringify(body.gridView), // 🔥 SỬA LẠI ĐÚNG FIELD
        },
      });

      console.log("✅ Cập nhật thành công!", savedProduct);
    } else {
      // 🔹 Nếu ID chưa tồn tại → Tạo mới
      if (existingOptimized) {
        return json({ success: false, message: "Dữ liệu đã tồn tại, hãy dùng phương thức PUT để cập nhật!" }, { status: 400 });
      }

      savedProduct = await prisma.productsOptimized.create({
        data: {
          productId,
          optimizedTitle: body.optimizedTitle, // 🔥 SỬA LẠI ĐÚNG FIELD
          optimizedDescription: body.optimizedDescription, // 🔥 SỬA LẠI ĐÚNG FIELD
          gridView: JSON.stringify(body.gridView), // 🔥 SỬA LẠI ĐÚNG FIELD
        },
      });

      console.log("✅ Lưu mới thành công!", savedProduct);
    }

    // 🟢 Chuyển `BigInt` thành `String` khi trả về JSON
    return json({
      success: true,
      message: method === "PUT" ? "Cập nhật thành công!" : "Lưu mới thành công!",
      data: {
        ...savedProduct,
        id: savedProduct.id.toString(),
        productId: savedProduct.productId.toString(),
      },
    });

  } catch (error) {
    console.error("❌ Lỗi khi lưu vào MySQL:", error);
    return json({ success: false, message: `Lỗi server: ${error.message}` }, { status: 500 });
  }
};
