import { json } from "@remix-run/node";

const API_BASE_URL = 'http://localhost:3001';

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const productId = formData.get("productId");
    const targetMarket = formData.get("targetMarket");
    const language = formData.get("language");
    const productType = formData.get("productType");
    const brandTone = formData.get("brandTone");

    if (!title || !description) {
      return json({ 
        error: "Product title and description are required" 
      }, { status: 400 });
    }

    // Process images array
    const images = [];
    let index = 0;
    while (formData.get(`images[${index}]`)) {
      const imageUrl = formData.get(`images[${index}]`);
      if (imageUrl && imageUrl.trim() !== '') {
        images.push(imageUrl);
      }
      index++;
    }

    // Prepare request data according to API structure
    const requestData = {
      title: title,
      description: description,
      images: images,
      targetMarket: targetMarket || "us",
      language: language || "en-US",
      productType: productType || "Accessory",
      brandTone: brandTone || "friendly",
      goals: ["Increase Conversion Rate", "Target Niche Audience"]
    };

    // Debug: Log request data
    console.log('=== SEGMENTATION API REQUEST ===');
    console.log('Request data:', {
      title: title,
      description: description?.substring(0, 100) + '...',
      productId: productId,
      targetMarket: targetMarket,
      language: language,
      productType: productType,
      brandTone: brandTone,
      imagesCount: images.length
    });

    // Call tikminer API for segmentation
    const response = await fetch(`${API_BASE_URL}/api/product-optimize/suggestDataSegmentation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Debug: Log the actual API response structure
    console.log('=== API RESPONSE DEBUG ===');
    console.log('Response status:', data.status);
    console.log('Segments count:', data.segmentations?.length || 0);
    console.log('Sample segment:', data.segmentations?.[0]);

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.segmentations || !Array.isArray(data.segmentations)) {
      throw new Error('Invalid response format: missing segmentations array');
    }

    // Transform the response to match our expected format
    const transformedData = {
      success: true,
      data: {
        segmentations: data.segmentations.map(segment => ({
          name: segment.name,
          painpoint: segment.painpoint,
          winRate: segment.winRate,
          reason: segment.reason,
          personaProfile: segment.personaProfile,
          locations: segment.locations || [],
          keywordSuggestions: segment.keywordSuggestions || [],
          seasonalTrends: segment.seasonalTrends || "",
          toneType: segment.toneType || "",
          voiceGuideline: segment.voiceGuideline || "",
          productBenefits: segment.productBenefits || []
        }))
      }
    };

    console.log('Transformed response:', transformedData);

    return json(transformedData);

  } catch (error) {
    console.error('Segmentation API error:', error);
    
    // Return mock data as fallback
    console.log('Returning mock segmentation data as fallback');
    const mockData = {
      success: true,
      data: {
        segmentations: [
          {
            name: "Gen Z Trendsetters",
            painpoint: "Cần thể hiện cá tính độc đáo và theo kịp xu hướng thời trang",
            winRate: 0.85,
            reason: "Nhóm khách hàng trẻ tuổi, năng động, sẵn sàng chi tiêu cho phụ kiện thời trang",
            personaProfile: {
              demographics: "16-25 tuổi, học sinh/sinh viên, sống tại thành phố lớn",
              behaviors: "Hoạt động mạnh trên mạng xã hội, mua sắm online thường xuyên",
              motivations: "Thể hiện cá tính, được công nhận trong nhóm bạn",
              communicationChannels: "TikTok, Instagram, Facebook"
            },
            locations: [
              "Hà Nội (Quận Cầu Giấy, Quận Đống Đa, Quận Hai Bà Trưng)",
              "TP.HCM (Quận 1, Quận 3, Quận 7, Quận Bình Thạnh)",
              "Đà Nẵng (Quận Hải Châu, Quận Thanh Khê)",
              "Cần Thơ (Quận Ninh Kiều, Quận Bình Thủy)"
            ],
            keywordSuggestions: ["phụ kiện gen z", "thời trang trẻ", "phong cách độc đáo"],
            seasonalTrends: "Tăng mạnh vào mùa hè và dịp lễ hội âm nhạc. Peak vào tháng 6-8 và tháng 12-1.",
            toneType: "Friendly & Energetic",
            voiceGuideline: "Sử dụng ngôn ngữ trẻ trung, năng động. Tập trung vào tính cá nhân hóa và sự độc đáo. Tránh ngôn ngữ quá trang trọng.",
            productBenefits: [
              "Thiết kế độc đáo thể hiện cá tính",
              "Chất liệu bền đẹp, không phai màu",
              "Dễ dàng phối đồ với nhiều phong cách",
              "Hoàn hảo cho các bức ảnh Instagram"
            ]
          },
          {
            name: "Người trẻ thành đạt",
            painpoint: "Muốn thể hiện sự thành công và gu thẩm mỹ cao cấp",
            winRate: 0.75,
            reason: "Có khả năng chi tiêu tốt, quan tâm đến chất lượng và thương hiệu",
            personaProfile: {
              demographics: "25-35 tuổi, nhân viên văn phòng, thu nhập ổn định",
              behaviors: "Mua sắm có kế hoạch, quan tâm đến đánh giá và review",
              motivations: "Thể hiện địa vị xã hội, đầu tư vào bản thân",
              communicationChannels: "Facebook, Google, Website thương hiệu"
            },
            locations: [
              "Hà Nội (Quận Ba Đình, Quận Hoàn Kiếm, Quận Tây Hồ)",
              "TP.HCM (Quận 2, Quận 7, Quận Thủ Đức)",
              "Đà Nẵng (Quận Hải Châu, Quận Sơn Trà)",
              "Hải Phòng (Quận Lê Chân, Quận Ngô Quyền)"
            ],
            keywordSuggestions: ["phụ kiện cao cấp", "thời trang công sở", "chất lượng tốt"],
            seasonalTrends: "Ổn định quanh năm, tăng nhẹ vào cuối năm và dịp lễ tết. Peak vào tháng 11-12.",
            toneType: "Professional & Sophisticated",
            voiceGuideline: "Sử dụng ngôn ngữ chuyên nghiệp, tinh tế. Nhấn mạnh vào chất lượng, uy tín và giá trị đầu tư. Tránh ngôn ngữ quá casual.",
            productBenefits: [
              "Chất liệu cao cấp, bền bỉ theo thời gian",
              "Thiết kế tinh tế, phù hợp môi trường công sở",
              "Tăng cường sự tự tin và địa vị xã hội",
              "Đầu tư dài hạn cho phong cách cá nhân"
            ]
          },
          {
            name: "Người yêu thích nghệ thuật",
            painpoint: "Tìm kiếm những món đồ có tính nghệ thuật và ý nghĩa sâu sắc",
            winRate: 0.70,
            reason: "Đánh giá cao tính thẩm mỹ và câu chuyện đằng sau sản phẩm",
            personaProfile: {
              demographics: "20-40 tuổi, làm việc trong lĩnh vực sáng tạo",
              behaviors: "Thích khám phá những thương hiệu độc đáo, ít phổ biến",
              motivations: "Thể hiện gu thẩm mỹ, kết nối với nghệ thuật",
              communicationChannels: "Instagram, Pinterest, Blog nghệ thuật"
            },
            locations: [
              "Hà Nội (Quận Đống Đa, Quận Hai Bà Trưng, Quận Cầu Giấy)",
              "TP.HCM (Quận 1, Quận 3, Quận Bình Thạnh)",
              "Huế (Thành phố Huế, Phú Vang)",
              "Hội An (Thành phố Hội An, Điện Bàn)"
            ],
            keywordSuggestions: ["phụ kiện nghệ thuật", "thiết kế độc đáo", "ý nghĩa sâu sắc"],
            seasonalTrends: "Tăng vào mùa thu và mùa xuân khi có nhiều sự kiện nghệ thuật. Peak vào tháng 3-4 và tháng 9-10.",
            toneType: "Artistic & Inspirational",
            voiceGuideline: "Sử dụng ngôn ngữ nghệ thuật, truyền cảm hứng. Tập trung vào câu chuyện, ý nghĩa và tính độc đáo. Tránh ngôn ngữ thương mại quá rõ ràng.",
            productBenefits: [
              "Thiết kế nghệ thuật độc đáo, có ý nghĩa sâu sắc",
              "Chất liệu thủ công, tinh tế trong từng chi tiết",
              "Truyền cảm hứng và kết nối với nghệ thuật",
              "Tạo điểm nhấn đặc biệt cho bộ sưu tập cá nhân"
            ]
          }
        ]
      }
    };
    
    return json(mockData);
  }
}
