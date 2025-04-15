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
  const { mode = "both" } = options;
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

    // Tạo danh sách promise tùy theo mode
    const apiCalls = [];

    if (mode === "both" || mode === "features") {
      apiCalls.push(
        fetch("http://localhost:5003/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );
    } else {
      apiCalls.push(Promise.resolve(null));
    }

    if (mode === "both" || mode === "reviews") {
      apiCalls.push(
        fetch("http://localhost:5003/api/openai/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: payload.id,title: payload.title, description: payload.description, featuredMedia: payload.featuredMedia }),
        })
      );
    } else {
      apiCalls.push(Promise.resolve(null));
    }

    const [featureRes, reviewRes] = await Promise.all(apiCalls);

    const featureData = featureRes ? await featureRes.json() : {};
    const reviewData = reviewRes ? await reviewRes.json() : {};

    // 👉 Lưu vào DB (chỉ gửi những gì có)
    await fetch("http://localhost:51070/api/save-optimized-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: payload.id,
        ...(featureData.optimizedTitle && { optimizedTitle: featureData.optimizedTitle }),
        ...(featureData.optimizedDescription && { optimizedDescription: featureData.optimizedDescription }),
        ...(featureData.gridView && { gridView: featureData.gridView }),
        ...(reviewData.reviews && { aiReviews: reviewData.reviews }),
      }),
    });

    return {
      ...featureData,
      aiReviews: reviewData.reviews || [],
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
//       throw new Error(`Database save failed: ${saveResponse.statusText}`);
//     }

//     const saveResult = await saveResponse.json();
//     console.log("✅ Saved to DB:", saveResult);

//     // Trả về sản phẩm đã tối ưu hóa
//     return {
//       id: platformProduct.id,
//       title: data.optimizedTitle,
//       description: data.optimizedDescription,
//       metafields: platformProduct.metafields || {},
//       gridView: data.gridView,
//     };
//   } catch (error) {
//     console.error("❌ Optimization error:", error);
//     throw new Error("Error optimizing product: " + error.message);
//   }
// };

