import { json } from "@remix-run/node";
import prisma from "../db.server"; // 🔹 Đảm bảo đường dẫn đúng

export const action = async ({ request }) => {
  console.log("📩 API /api/save-optimized-product đã được gọi!");

  try {
    // 🔹 Chỉ cho phép phương thức POST
    if (request.method !== "POST") {
      console.error("❌ Method không hợp lệ:", request.method);
      return json({ success: false, message: "Method not allowed" }, { status: 405 });
    }

    const body = await request.json();
    console.log("📩 Dữ liệu nhận được:", body);

    // ✅ Sửa: Cho phép thiếu optimizedTitle nếu có dữ liệu khác
    if (!body.id || (!body.optimizedTitle && !body.optimizedDescription && !body.gridView && !body.aiReviews)) {
      console.error("❌ Thiếu dữ liệu đầu vào!", body);
      return json({ success: false, message: "Không có gì để lưu!" }, { status: 400 });
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

    // ✅ Sửa: Upsert với fallback giá trị mặc định nếu thiếu để tránh lỗi Prisma
    const savedProduct = await prisma.productsOptimized.upsert({
      where: { productId },
      update: {
        ...(body.optimizedTitle && { optimizedTitle: body.optimizedTitle }),
        ...(body.optimizedDescription && { optimizedDescription: body.optimizedDescription }),
        ...(body.gridView && { gridView: JSON.stringify(body.gridView)}),
        ...(body.aiReviews && { aiReviews: JSON.stringify(body.aiReviews) }) // ✅ Thêm điều kiện để ghi aiReviews
      },
      create: {
        productId,
        optimizedTitle: body.optimizedTitle || "Pending...", // ✅ fallback nếu thiếu
        optimizedDescription: body.optimizedDescription || "Waiting for AI...", // ✅ fallback nếu thiếu
        gridView: body.gridView || [],
        aiReviews: body.aiReviews || []
      },
    });

    console.log("✅ Dữ liệu đã được ghi đè thành công!", savedProduct);

    // 🟢 Chuyển `BigInt` thành `String` khi trả về JSON
    return json({
      success: true,
      message: "Dữ liệu đã được ghi đè thành công!",
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


// import { json } from "@remix-run/node";
// import prisma from "../db.server"; // 🔹 Đảm bảo đường dẫn đúng

// export const action = async ({ request }) => {
//   console.log("📩 API /api/save-optimized-product đã được gọi!");

//   try {
//     // 🔹 Chỉ cho phép phương thức POST
//     if (request.method !== "POST") {
//       console.error("❌ Method không hợp lệ:", request.method);
//       return json({ success: false, message: "Method not allowed" }, { status: 405 });
//     }

//     const body = await request.json();
//     console.log("📩 Dữ liệu nhận được:", body);

//     if (!body.id || (!body.optimizedTitle && !body.optimizedDescription && !body.gridView && !body.aiReviews)) {
//       console.error("❌ Thiếu dữ liệu đầu vào!", body);
//       return json({ success: false, message: "Không có gì để lưu!" }, { status: 400 });
//     }

//     // 🟢 Chuyển ID về BigInt
//     const productId = BigInt(body.id);

//     // 🟢 Kết nối Prisma
//     await prisma.$connect();

//     // 🟢 Kiểm tra sản phẩm có tồn tại không
//     const existingProduct = await prisma.platformProduct.findUnique({
//       where: { id: productId },
//     });

//     if (!existingProduct) {
//       return json({ success: false, message: "Sản phẩm không tồn tại!" }, { status: 404 });
//     }

//     // 🟢 Ghi đè dữ liệu (nếu đã có thì update, nếu chưa có thì create)
//     const savedProduct = await prisma.productsOptimized.upsert({
//       where: { productId },
//       update: {
//         optimizedTitle: body.optimizedTitle, // 🔥 Ghi đè tiêu đề tối ưu
//         optimizedDescription: body.optimizedDescription, // 🔥 Ghi đè mô tả tối ưu
//         gridView: JSON.stringify(body.gridView), // 🔥 Ghi đè gridView
//         aiReviews: JSON.stringify(body.aiReviews), // ✅ thêm dòng này
//       },
//       create: {
//         productId,
//         optimizedTitle: body.optimizedTitle, // 🔥 Tạo mới tiêu đề tối ưu
//         optimizedDescription: body.optimizedDescription, // 🔥 Tạo mới mô tả tối ưu
//         gridView: JSON.stringify(body.gridView), // 🔥 Tạo mới gridView
//         aiReviews: JSON.stringify(body.aiReviews), // ✅ thêm dòng này
//       },
//     });

//     console.log("✅ Dữ liệu đã được ghi đè thành công!", savedProduct);

//     // 🟢 Chuyển `BigInt` thành `String` khi trả về JSON
//     return json({
//       success: true,
//       message: "Dữ liệu đã được ghi đè thành công!",
//       data: {
//         ...savedProduct,
//         id: savedProduct.id.toString(),
//         productId: savedProduct.productId.toString(),
//       },
//     });

//   } catch (error) {
//     console.error("❌ Lỗi khi lưu vào MySQL:", error);
//     return json({ success: false, message: `Lỗi server: ${error.message}` }, { status: 500 });
//   }
// };







// import { json } from "@remix-run/node";
// import prisma from "../db.server"; // 🔹 Đảm bảo đường dẫn đúng

// export const action = async ({ request }) => {
//   console.log("📩 API /api/save-optimized-product đã được gọi!");

//   try {
//     // 🔹 Chỉ cho phép phương thức POST
//     if (request.method !== "POST") {
//       console.error("❌ Method không hợp lệ:", request.method);
//       return json({ success: false, message: "Method not allowed" }, { status: 405 });
//     }

//     const body = await request.json();
//     console.log("📩 Dữ liệu nhận được:", body);

//     if (!body.id || !body.optimizedTitle || !body.optimizedDescription || !body.gridView) {
//       console.error("❌ Thiếu dữ liệu đầu vào!", body);
//       return json({ success: false, message: "Thiếu dữ liệu đầu vào!" }, { status: 400 });
//     }

//     // 🟢 Chuyển ID về BigInt
//     const productId = BigInt(body.id);

//     // 🟢 Kết nối Prisma
//     await prisma.$connect();

//     // 🟢 Kiểm tra sản phẩm có tồn tại không
//     const existingProduct = await prisma.platformProduct.findUnique({
//       where: { id: productId },
//     });

//     if (!existingProduct) {
//       return json({ success: false, message: "Sản phẩm không tồn tại!" }, { status: 404 });
//     }

//     // 🟢 Ghi đè dữ liệu (nếu đã có thì update, nếu chưa có thì create)
//     const savedProduct = await prisma.productsOptimized.upsert({
//       where: { productId },
//       update: {
//         optimizedTitle: body.optimizedTitle, // 🔥 Ghi đè tiêu đề tối ưu
//         optimizedDescription: body.optimizedDescription, // 🔥 Ghi đè mô tả tối ưu
//         gridView: JSON.stringify(body.gridView), // 🔥 Ghi đè gridView
//       },
//       create: {
//         productId,
//         optimizedTitle: body.optimizedTitle, // 🔥 Tạo mới tiêu đề tối ưu
//         optimizedDescription: body.optimizedDescription, // 🔥 Tạo mới mô tả tối ưu
//         gridView: JSON.stringify(body.gridView), // 🔥 Tạo mới gridView
//       },
//     });

//     console.log("✅ Dữ liệu đã được ghi đè thành công!", savedProduct);

//     // 🟢 Chuyển `BigInt` thành `String` khi trả về JSON
//     return json({
//       success: true,
//       message: "Dữ liệu đã được ghi đè thành công!",
//       data: {
//         ...savedProduct,
//         id: savedProduct.id.toString(),
//         productId: savedProduct.productId.toString(),
//       },
//     });

//   } catch (error) {
//     console.error("❌ Lỗi khi lưu vào MySQL:", error);
//     return json({ success: false, message: `Lỗi server: ${error.message}` }, { status: 500 });
//   }
// };

