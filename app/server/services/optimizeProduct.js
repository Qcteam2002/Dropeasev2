import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//  * Loại bỏ tất cả thẻ HTML và giữ lại nội dung văn bản thuần
//  * @param {string} html - Chuỗi HTML cần làm sạch
//  * @returns {string} - Chuỗi văn bản đã được làm sạch
//  */
const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, "").trim(); // Xóa tất cả các thẻ HTML
};

// /**
//  * Gọi API để tối ưu hóa sản phẩm và lưu kết quả vào database
//  * @param {Object} platformProduct - Sản phẩm cần tối ưu hóa
//  * @returns {Promise<Object>} - Sản phẩm đã được tối ưu hóa
//  */

export const optimizeProduct = async (platformProduct, options = {}) => {
  const { mode = "both", optImage = false, optTitleDesc = false, optFeature = false, optReview = false } = options;
  try {
    const cleanDescription = stripHtml(platformProduct.descriptionHtml || "No description available.");
    const imageListFromDB = Array.isArray(platformProduct.images?.create)
      ? platformProduct.images.create.map(img => ({ url: img.url }))
      : [];

    const payload = {
      id: platformProduct.id,
      title: platformProduct.title || "No title",
      description: cleanDescription,
      featuredMedia: platformProduct.featuredMedia || "",
      image: imageListFromDB
    };

    // Tạo danh sách promise tùy theo options
    const apiCalls = [];

    // Nếu chọn tối ưu title/description hoặc mode là both
    if (optTitleDesc || mode === "both") {
      apiCalls.push(
        fetch("http://127.0.0.1:5004/api/openai/optimize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );
    } else {
      apiCalls.push(Promise.resolve(null));
    }

    // Nếu chọn tối ưu features hoặc mode là both
    if (optFeature || mode === "both") {
      apiCalls.push(
        fetch("http://127.0.0.1:5004/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );
    } else {
      apiCalls.push(Promise.resolve(null));
    }

    // Nếu chọn tối ưu reviews hoặc mode là both
    if (optReview || mode === "both") {
      apiCalls.push(
        fetch("http://127.0.0.1:5004/api/openai/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: payload.id, title: payload.title, description: payload.description, featuredMedia: payload.featuredMedia }),
        })
      );
    } else {
      apiCalls.push(Promise.resolve(null));
    }

    // Nếu chọn tối ưu hình ảnh
    if (optImage) {
      console.log("🔄 Đang gọi API optimize image...");
      const imageResponse = await fetch("http://127.0.0.1:5004/api/optimize-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: payload.id,
          featuredMedia: payload.featuredMedia
        }),
      });
      console.log("📥 Response status từ API optimize image:", imageResponse.status);
      const imageData = await imageResponse.json();
      console.log("📥 Response data từ API optimize image:", imageData);
      
      // Kiểm tra response từ API
      if (imageData?.success && imageData?.image) {
        console.log("✅ Đã nhận được hình ảnh đã tối ưu từ API");
        apiCalls.push(Promise.resolve(imageData));
      } else {
        console.log("❌ Không nhận được hình ảnh đã tối ưu từ API");
        apiCalls.push(Promise.resolve(null));
      }
    } else {
      apiCalls.push(Promise.resolve(null));
    }

    const [titleDescRes, featureRes, reviewRes, imageRes] = await Promise.all(apiCalls);

    const titleDescData = titleDescRes ? await titleDescRes.json() : {};
    const featureData = featureRes ? await featureRes.json() : {};
    const reviewData = reviewRes ? await reviewRes.json() : {};
    const imageData = imageRes || {};

    console.log("✅ Image optimization response:", imageData);

    // 👉 Lưu vào DB (chỉ gửi những gì có)
    const dbPayload = {
      id: payload.id,
      ...(titleDescData.optimizedTitle && { optimizedTitle: titleDescData.optimizedTitle }),
      ...(titleDescData.optimizedDescription && { optimizedDescription: titleDescData.optimizedDescription }),
      ...(featureData.gridView && { gridView: featureData.gridView }),
      ...(reviewData.reviews && { aiReviews: reviewData.reviews }),
      isOptimized: true, // Set trạng thái đã tối ưu
      optimizedAt: new Date() // Cập nhật thời gian tối ưu
    };

    // Thêm dữ liệu hình ảnh đã tối ưu nếu có
    if (imageData?.success && imageData?.image) {
      console.log("📸 Đã nhận được hình ảnh đã tối ưu, đang lưu vào database...");
      // Lưu cả hình ảnh gốc và hình ảnh đã tối ưu
      dbPayload.optimizedImages = {
        original: payload.featuredMedia,
        optimized: imageData.image,
        id: imageData.id,
        timestamp: new Date().toISOString()
      };
    } else {
      console.log("❌ Không nhận được hình ảnh đã tối ưu từ API");
    }

    console.log("📦 Payload gửi lên database:", {
      id: dbPayload.id,
      hasOptimizedImage: !!dbPayload.optimizedImages,
      optimizedImageId: dbPayload.optimizedImages?.id,
      isOptimized: dbPayload.isOptimized,
      optimizedAt: dbPayload.optimizedAt
    });

    // Cập nhật trạng thái tối ưu trong database
    try {
      // Tìm product ID từ platformProduct ID
      const product = await prisma.platformProduct.findFirst({
        where: { 
          id: BigInt(platformProduct.id)
        }
      });

      if (product) {
        // Cập nhật bảng ProductsOptimized
        await prisma.productsOptimized.update({
          where: { productId: product.id },
          data: {
            isOptimized: true,
            optimizedAt: new Date(),
            ...(titleDescData.optimizedTitle && { optimizedTitle: titleDescData.optimizedTitle }),
            ...(titleDescData.optimizedDescription && { optimizedDescription: titleDescData.optimizedDescription }),
            ...(featureData.gridView && { gridView: featureData.gridView }),
            ...(reviewData.reviews && { aiReviews: reviewData.reviews })
          }
        });
        console.log("✅ Đã cập nhật trạng thái tối ưu trong database");
      } else {
        console.log("❌ Không tìm thấy sản phẩm trong database");
      }
    } catch (dbError) {
      console.error("❌ Lỗi khi cập nhật trạng thái tối ưu:", dbError);
    }

    // Lưu vào file JSON tạm thời
    try {
      const fs = require('fs');
      const path = require('path');
      
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
      existingData[payload.id] = dbPayload.optimizedImages;

      // Lưu lại file
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      console.log("💾 Đã lưu hình ảnh đã tối ưu vào file:", filePath);
    } catch (error) {
      console.error("❌ Lỗi khi lưu vào file:", error);
    }

    return {
      ...titleDescData,
      ...featureData,
      aiReviews: reviewData.reviews || [],
      isOptimized: true,
      optimizedAt: new Date().toISOString(),
      ...(imageData?.success && {
        optimizedImages: {
          original: payload.featuredMedia,
          optimized: imageData.image,
          id: imageData.id,
          timestamp: new Date().toISOString()
        }
      })
    };
  } catch (err) {
    console.error("❌ Lỗi optimizeProduct:", err);
    throw new Error("Tối ưu sản phẩm thất bại!");
  }
};


// /**
//  * Loại bỏ tất cả thẻ HTML và giữ lại nội dung văn bản thuần
//  * @param {string} html - Chuỗi HTML cần làm sạch
//  * @returns {string} - Chuỗi văn bản đã được làm sạch
//  */
// const stripHtml = (html) => {
//   return html.replace(/<[^>]*>?/gm, "").trim(); // Xóa tất cả các thẻ HTML
// };

// /**
//  * Gọi API để tối ưu hóa sản phẩm và lưu kết quả vào database
//  * @param {Object} platformProduct - Sản phẩm cần tối ưu hóa
//  * @returns {Promise<Object>} - Sản phẩm đã được tối ưu hóa
//  */
// export const optimizeProduct = async (platformProduct) => {
//   try {
//     console.log("🔄 Đang gửi yêu cầu tối ưu hóa sản phẩm:", platformProduct.id);

//     // Làm sạch HTML từ descriptionHtml
//     const cleanDescription = stripHtml(platformProduct.descriptionHtml || "No description available.");

//     const imageListFromDB = Array.isArray(platformProduct.images?.create)
//       ? platformProduct.images.create.map(img => ({ url: img.url }))
//       : [];



//     console.log("📦 platformProduct.image:", platformProduct.image);
//     console.log("🔎 platformProduct.image.create:", platformProduct.image?.create);
//     console.log("✅ isArray:", Array.isArray(platformProduct.image?.create));
//     // Gọi API OpenAI để tối ưu hóa sản phẩm
//     const response = await fetch("http://localhost:5003/api/openai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         id: platformProduct.id,
//         title: platformProduct.title || "No title",
//         description: cleanDescription || "No description available.",
//         featuredMedia: platformProduct.featuredMedia || "No featured media available.", // Thêm featuredMedia
//         image: imageListFromDB, // ✅ Đây phải là MẢNG object có `url`
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log("✅ OpenAI Data:", data);

//     // Gọi API để lưu kết quả tối ưu hóa vào database
//     const saveResponse = await fetch("http://localhost:51070/api/save-optimized-product", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         id: platformProduct.id,
//         optimizedTitle: data.optimizedTitle,
//         optimizedDescription: data.optimizedDescription,
//         gridView: data.gridView,
//       }),
//     });

//     if (!saveResponse.ok) {
//       throw new Error(`