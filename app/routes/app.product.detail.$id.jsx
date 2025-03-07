// ✅ Import các thư viện cần thiết
import { json } from "@remix-run/node"; // Xử lý JSON trên server
import { useLoaderData, useNavigate } from "@remix-run/react"; // Lấy dữ liệu từ loader và điều hướng
import { useState } from "react";
import {
  AppProvider,
  Page,
  Card,
  Text,
  Button,
  BlockStack,
  InlineStack,
  Toast,
  Modal,
  Box,
  Badge,
  Frame,
} from "@shopify/polaris"; // UI components từ Shopify Polaris
import enTranslations from "@shopify/polaris/locales/en.json"; // Định nghĩa ngôn ngữ UI
import { Icon } from "@shopify/polaris";
import { authenticate, getUser } from "../shopify.server"; // Xác thực Shopify Admin
import prisma from "../db.server"; // ORM Prisma để kết nối database
import { StarFilledIcon, MoneyIcon, DeliveryIcon, ProductReturnIcon } from "@shopify/polaris-icons"; // Icon UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal, faCcApplePay, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';

const productDatadraft = [
  {
    id: 1,
    title: "2023 PAGANI DESIGN Men's Watch - Luxury Quartz",
    priceOriginal: "$555.99",
    priceDiscounted: "$250.99",
    discountPercentage: "50%",
    rating: "4.5 (20 Reviews)",
    mainImage: "https://ae-pic-a1.aliexpress-media.com/kf/S43c47ca449b1484fb4f5716c7d26b75cW.jpg_960x960q75.jpg_.avif",
    thumbnails: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S959b32ff00224005921b1a1d873858aa5.jpg_960x960q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/S2e1c4aed6e5e489baf57527e51364e33y.jpg_960x960q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/Sb288e4c0ea2744c3a20ec9a0e2151250f.jpg_960x960q75.jpg_.avif",
      "https://ae-pic-a1.aliexpress-media.com/kf/Scc090b3aab8e4311887709722622984fc.jpg_960x960q75.jpg_.avif",
    ],
    colors: ["Black", "White", "Gold"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    variants: [
      {
        "option1_name": "Color",
        "option1_value": "NO.17",
        "option2_name": null,
        "option2_value": null,
        "variant_sku": "ABC123",
        "variant_price": 9.99,
        "variant_compare_at_price": 12.99,
        "variant_inventory_qty": 10,
        "variant_image": "https://example.com/image1.jpg",
        "variant_weight": "1 kg"
      }
    ],
    description:
      "Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a classic look designed with premium materials like leather and suede, creating a look curated for the City of Light.",
    reviews: [
      {
        reviewer: "John Doe",
        comment: " Very nice watch, beautiful detailed finishes, fast and traceable delivery! ",
        rating: 5,
      },
      {
        reviewer: "Jane Smith",
        comment: "The glass is well anti-reflective and sapphire, perfect for sunny days!",
        rating: 4.5,
      },
      {
        reviewer: "Alice Johnson",
        comment: "Stylish and comfortable, fits perfectly on my wrist.",
        rating: 4,
      },
    ],
    gridSections: [
      {
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S959b32ff00224005921b1a1d873858aa5.jpg_960x960q75.jpg_.avif",
        title: "AR Sapphire Glass",
        description:
          "The watch is equipped with AR Sapphire glass, known for its high hardness, excellent light permeability, and superior wear resistance.",
      },
      {
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S2e1c4aed6e5e489baf57527e51364e33y.jpg_960x960q75.jpg_.avif",
        title: "Premium Leather Strap",
        description:
          "Designed with premium leather strap for durability and comfort, making it perfect for daily wear or special occasions.",
      },
      {
        image: "https://ae-pic-a1.aliexpress-media.com/kf/Sb288e4c0ea2744c3a20ec9a0e2151250f.jpg_960x960q75.jpg_.avif",
        title: "Water Resistant",
        description:
          "With water resistance up to 50 meters, this watch is suitable for everyday use, even during sports or swimming activities.",
      },
    ],
    detailedReviews: [
      {
        thumbnail: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        comment: "Wear to walk a day without foot pain seems still very comfortable service is very good express too much forget to sign for their shoes and customer service communication is very smooth and patient",
        reviewer: "Olivia Wilson",
        rating: 5,
        date: "2024-01-01",
        images: [
          "https://ae-pic-a1.aliexpress-media.com/kf/Ac074d78736c147e681125957c5c8c727m.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/Ae62b2c7e6e934ec3a40f68a7c5d1cdfbh.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A572ab2dba37249a898b7e2086911f5a7s.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A74c591c7a866430a979c12e19d534ec6S.png_220x220.png_.webp"
        ],
        helpfulCount: 3,
        verifiedPurchase: true,
        location: "New York, USA",
        avatar: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        variant: "Color:Blue Shoe Size:44"
      },
      {
        thumbnail: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        comment: "The quality of the shoes is good, the size is good, comfortable to wear, and the price is not too expensive",
        reviewer: "Olivia Wilson",
        rating: 5,
        date: "2024-01-01",
        images: [
          "https://ae-pic-a1.aliexpress-media.com/kf/Ac9380572219e48618f741330e97d4a45B.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/Abc57e915bc874e64a05d0d58793012457.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/Aba38864612d44d5a80af70097bb5dd18H.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A415d8ee41a09446d86c341b59f61b7a7r.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A415d8ee41a09446d86c341b59f61b7a7r.png_220x220.png_.webp"
        ],
        helpfulCount: 3,
        verifiedPurchase: true,
        location: "New York, USA",
        avatar: "https://ae-pic-a1.aliexpress-media.com/kf/S47ea903b3b7a441087bea451695cc7a2x/144x144.png_.webp",
        variant: "Color:Blue Shoe Size:42"
      },
      {
        thumbnail: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        comment: "The quality of the shoes is very good, and the workmanship is very fine. Wearing it is very beautiful and comfortable. The seller's service attitude is very good, and we recommend that everyone purchase with confidence.",
        reviewer: "Olivia Wilson",
        rating: 5,
        date: "2024-01-01",
        images: [
          "https://ae-pic-a1.aliexpress-media.com/kf/A078494cc16a240ca87607f950151c4a3Z.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A1f4c168b556e4014b4ede68874691f0dV.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A49061b8523f0473f9082942390990e605.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/Ac453a4779fe04790b71a3181e7a6a304C.png_220x220.png_.webp"
        ],
        helpfulCount: 3,
        verifiedPurchase: true,
        location: "New York, USA",
        avatar: "https://gw.alicdn.com/tps/TB1CjX4LXXXXXbSXFXXXXXXXXXX-240-240.png",
        variant: "Color:Blue Shoe Size:40"
      },
      {
        thumbnail: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        comment: "What beautiful shoes! Specially wear to evaluate again, comfortable, wear with feet, not off! The main thing is it's too cheap! It was so worth it! Recommend everyone to buy!",
        reviewer: "Olivia Wilson",
        rating: 5,
        date: "2024-01-01",
        images: [
          "https://ae-pic-a1.aliexpress-media.com/kf/Ac074d78736c147e681125957c5c8c727m.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/Ae62b2c7e6e934ec3a40f68a7c5d1cdfbh.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A572ab2dba37249a898b7e2086911f5a7s.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A74c591c7a866430a979c12e19d534ec6S.png_220x220.png_.webp"
        ],
        helpfulCount: 3,
        verifiedPurchase: true,
        location: "New York, USA",
        avatar: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        variant: "Blue Shoe Size:44"
      },
      {
        thumbnail: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        comment: "Wear to walk a day without foot pain seems still very comfortable service is very good express too much forget to sign for their shoes and customer service communication is very smooth and patient",
        reviewer: "Olivia Wilson",
        rating: 5,
        date: "2024-01-01",
        images: [
          "https://ae-pic-a1.aliexpress-media.com/kf/Ac074d78736c147e681125957c5c8c727m.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/Ae62b2c7e6e934ec3a40f68a7c5d1cdfbh.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A572ab2dba37249a898b7e2086911f5a7s.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A74c591c7a866430a979c12e19d534ec6S.png_220x220.png_.webp"
        ],
        helpfulCount: 3,
        verifiedPurchase: true,
        location: "New York, USA",
        avatar: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        variant: "Blue Shoe Size:44"
      },
      {
        thumbnail: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        comment: "Wear to walk a day without foot pain seems still very comfortable service is very good express too much forget to sign for their shoes and customer service communication is very smooth and patient",
        reviewer: "Olivia Wilson",
        rating: 5,
        date: "2024-01-01",
        images: [
          "https://ae-pic-a1.aliexpress-media.com/kf/Ac074d78736c147e681125957c5c8c727m.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/Ae62b2c7e6e934ec3a40f68a7c5d1cdfbh.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A572ab2dba37249a898b7e2086911f5a7s.png_220x220.png_.webp",
          "https://ae-pic-a1.aliexpress-media.com/kf/A74c591c7a866430a979c12e19d534ec6S.png_220x220.png_.webp"
        ],
        helpfulCount: 3,
        verifiedPurchase: true,
        location: "New York, USA",
        avatar: "https://gw.alicdn.com/tps/TB1zA01LXXXXXc0XFXXXXXXXXXX-240-240.png",
        variant: "Blue Shoe Size:44"
      },
    ],
  },
];

// ✅ Loader - Fetch dữ liệu sản phẩm từ DB
export const loader = async ({ request, params }) => {
  // 🔹 Xác thực admin Shopify
  const { admin, session } = await authenticate.admin(request);
  const user = await getUser(request);

  const productId = params.id; // Lấy ID sản phẩm từ URL
  if (!productId) {
    console.error("❌ Product ID is missing!");
    throw new Response("Product ID is required", { status: 400 });
  }

  console.log(`🔍 Đang tìm sản phẩm với productId: ${productId}`);

  // 🔹 Lấy sản phẩm từ bảng PlatformProduct
  const product = await prisma.platformProduct.findUnique({
    where: { id: BigInt(productId) },
  });

  if (!product) {
    console.error("❌ Không tìm thấy sản phẩm trong PlatformProduct.");
    throw new Response("Product not found", { status: 404 });
  }

  // 🔹 Kiểm tra nếu có dữ liệu tối ưu từ bảng ProductsOptimized
  const optimizedProduct = await prisma.productsOptimized.findUnique({
    where: { productId: BigInt(productId) },
  });

  console.log("✅ Dữ liệu từ ProductsOptimized:", optimizedProduct);

  // 🔹 Kiểm tra và parse gridView nếu có dữ liệu
  let parsedGridView = [];
  if (optimizedProduct && optimizedProduct.grid_view) {
    try {
      parsedGridView = JSON.parse(optimizedProduct.grid_view);
    } catch (error) {
      console.error("❌ Lỗi khi parse gridView:", error);
    }
  }

  return json({
    product: {
      id: product.id.toString(),
      title: optimizedProduct?.optimized_title || product.title || "No title", // Lấy tiêu đề từ bản tối ưu nếu có
      description: optimizedProduct?.optimized_description || product.descriptionHtml || "No description available.",
      featuredMedia: product.featuredMedia || "https://via.placeholder.com/300", // Ảnh sản phẩm
      gridView: parsedGridView, // Dữ liệu hiển thị dạng lưới nếu có
    },
  });
};

// ✅ Component chính - Hiển thị trang chi tiết sản phẩm
export default function ProductDetailPage() {
  const product1 = productDatadraft.find((p) => p.id === parseInt(1));
  // State for selected color and size
  const [selectedColor, setSelectedColor] = useState(product1.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product1.sizes[0]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const { product } = useLoaderData(); // Lấy dữ liệu sản phẩm từ loader
  const navigate = useNavigate(); // Điều hướng trang
  const [toast, setToast] = useState({ active: false, message: "" }); // Trạng thái thông báo Toast
  const draftProduct = productDatadraft?.[0]; //Lấy object đầu tiên trong mảng
  const [isModalOpen, setModalOpen] = useState(false); //Để mở review
  // 🔹 Hàm gửi API lưu sản phẩm vào bảng ProductsOptimized
  const optimizeProduct = async () => {
    try {
      const response = await fetch("/api/save-optimized-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          optimizedTitle: product.title + " - Optimized",
          optimizedDescription: product.description + " - Enhanced for SEO",
          gridView: JSON.stringify([{ title: "Feature 1", description: "Optimized Feature Description" }]),
        }),
      });

      if (!response.ok) throw new Error("Lỗi khi gửi API!");

      const data = await response.json();
      setToast({ active: true, message: "Product optimized successfully!" });
      console.log("✅ Dữ liệu lưu thành công:", data);
    } catch (error) {
      setToast({ active: true, message: "Lỗi khi tối ưu sản phẩm!" });
      console.error("❌ Lỗi khi tối ưu sản phẩm:", error);
    }
  };

  // Navigate reviews
  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      (prevIndex + 1) % product1.reviews.length
    );
  };

  const handlePreviousReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      (prevIndex - 1 + product1.reviews.length) % product1.reviews.length
    );
  };


  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <Page title="Product Detail" primaryAction={{ content: "Push to Store", onAction: () => alert("Pushing to Store...") }}>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", padding: "20px" }}>
              {/* 🔹 Hiển thị hình ảnh sản phẩm */}
              <div style={{ alignItems: "flex-start" }}>
                <img src={product.featuredMedia} alt="Main Product" style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
              </div>

              {/* 🔹 Hiển thị thông tin sản phẩm */}
              <BlockStack spacing="loose">
                <Text variant="headingLg" fontWeight="bold">{product.title}</Text>

                {/* Product Rating */}
                <BlockStack gap="500" style={{ padding: '10px 0px 12px 0px' }}>
                  <Text variant="bodySm" color="subdued">
                    {product.rating}
                  </Text>
                </BlockStack>

                {/* Pricing and Discount */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0px 0px 12px 0px' }}>
                  <Box style={{ color: '#d52e2e' }}>
                    <Text variant="headingLg" as="h5" >
                      {product1.priceOriginal}
                    </Text>
                  </Box>
                  <Box style={{ textDecoration: 'line-through', color: '#6D6D6D' }}>
                    <Text variant="bodyLg" as="p">
                      {product1.priceDiscounted}
                    </Text>
                  </Box>

                  <Badge status="success">Save {product1.discountPercentage}</Badge>
                </div>

                {/* Product Description */}
                <BlockStack style={{ padding: '0px 0px 12px 0px' }}>
                  <Text color="subdued" style={{ whiteSpace: 'pre-line' }}>
                    {product.description}
                  </Text>
                </BlockStack>



                {/* Color Selection */}
                <div>
                  <Text variant="bodySm" fontWeight="semibold">
                    Color:
                  </Text>
                  <div style={{ padding: '12px 0px 12px 0px' }}>
                    <InlineStack gap="150" wrap={false} blockAlign="center">
                      {product1.colors.map((color) => (
                        <Button
                          key={color}
                          size="slim"
                          primary={selectedColor === color}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </Button>
                      ))}
                    </InlineStack>
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <Text variant="bodySm" fontWeight="semibold">
                    Size:
                  </Text>
                  <div style={{ padding: '12px 0px 12px 0px' }}>
                    <InlineStack gap="150" wrap={false} blockAlign="center" >
                      {product1.sizes.map((size) => (
                        <Button
                          key={size}
                          size="slim"
                          primary={selectedSize === size}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </InlineStack>
                  </div>
                </div>

                {/* Buy Now Button */}
                <div style={{ padding: '12px 0px 12px 0px' }}>
                  <Button fullWidth variant="primary" size="large">
                    Buy Now
                  </Button>
                </div>

                {/* Buy Now Button */}
                <div style={{ padding: '0px 0px 12px 0px' }}>
                  <Button fullWidth variant="secondary" size="large">
                    Add tro Cart
                  </Button>
                </div>

                {/* Add Icon Payment */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 0px 0px 0px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    //justifyContent: 'space-around', // Khoảng cách đều giữa các icon
                    gap: '20px', // Khoảng cách giữa các icon
                  }}
                >
                  <FontAwesomeIcon icon={faCcPaypal} size="2x" />
                  <FontAwesomeIcon icon={faCcApplePay} size="2x" />
                  <FontAwesomeIcon icon={faCcMastercard} size="2x" />
                  <FontAwesomeIcon icon={faCcVisa} size="2x" />
                </div>

                {/* Additional Features */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgb(249, 249, 249)',
                  borderRadius: '8px',
                  padding: '15px',
                  marginTop: '20px',
                  textAlign: 'center',
                  gap: '20px' // Thêm khoảng cách giữa các nhóm
                }}>
                  {/* Free Shipping */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center', // Căn giữa dọc
                    gap: '8px',
                    whiteSpace: 'nowrap' // Đảm bảo chữ không xuống hàng
                  }}>
                    <Icon source={DeliveryIcon} tone="base" />
                    <p style={{ margin: 0 }}>Free Shipping</p> {/* Loại bỏ margin mặc định của <p> */}
                  </div>

                  {/* Divider */}
                  <div style={{
                    width: '1px',
                    height: '24px',
                    background: '#ccc'
                  }}></div>

                  {/* Money Back */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap' // Đảm bảo chữ không xuống hàng
                  }}>
                    <Icon source={MoneyIcon} tone="base" />
                    <p style={{ margin: 0 }}>Money Back</p>
                  </div>

                  {/* Divider */}
                  <div style={{
                    width: '1px',
                    height: '24px',
                    background: '#ccc'
                  }}></div>

                  {/* Free Return */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap' // Đảm bảo chữ không xuống hàng
                  }}>
                    <Icon source={ProductReturnIcon} tone="base" />
                    <p style={{ margin: 0 }}>Free Return</p>
                  </div>
                </div>

                {/* Customer Reviews Slider */}
                <div style={{
                  textAlign: 'left', // Đặt toàn bộ text căn trái
                  paddingTop: '10px',
                }}>
                  {/* Review Content */}
                  <div style={{
                    maxHeight: '90px', // Chiều cao tối thiểu để tránh giật
                    borderRadius: '8px',
                    //border: '1px solid #eaeaea',
                    margin: '10px 0',
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '10px',
                    //backgroundColor: '#f9f9f9', // Tạo nền nhạt cho review
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ fontStyle: 'italic', fontSize: '13px', lineHeight: '1.6' }}>
                      <Text variant="bodyMd" as="p" style={{
                        textAlign: 'left', // Căn trái nội dung comment
                      }}>
                        "{product1.reviews[currentReviewIndex].comment}"
                      </Text>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-start', // Căn trái phần reviewer và rating
                      alignItems: 'center',
                      marginTop: '10px',
                      borderTop: '1px solid #eaeaea',
                      padding: '10px 0px',
                    }}>
                      <div style={{ fontStyle: 'italic', fontSize: '12px', lineHeight: '1.6', color: '#eaeaea', marginRight: '8px' }}>
                        <Text as="p" tone="subdued" style={{
                          marginRight: '8px',
                          fontSize: '14px',
                          fontWeight: 'bold', // Tô đậm tên reviewer
                        }}>
                          {product1.reviews[currentReviewIndex].reviewer}
                        </Text>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(Math.floor(product1.reviews[currentReviewIndex].rating))].map((_, i) => (
                          <Icon key={i} source={StarFilledIcon} color="warning" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pagination Dots */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '10px',
                  }}>
                    <button onClick={handlePreviousReview} style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '16px',
                      cursor: 'pointer',
                    }}>‹</button>
                    {product1.reviews.map((_, index) => (
                      <div key={index} style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: currentReviewIndex === index ? '#000' : '#ddd',
                        cursor: 'pointer',
                      }} onClick={() => setCurrentReviewIndex(index)}></div>
                    ))}
                    <button onClick={handleNextReview} style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '16px',
                      cursor: 'pointer',
                    }}>›</button>
                  </div>
                </div>


              </BlockStack>
            </div>


            {/* Grid Sections for Additional Features */}
            <div style={{ marginTop: '20px', padding: '20px' }}>
              {product.gridView.map((section, index) => {
                const draftSection = draftProduct.gridSections?.[index]; // Kiểm tra xem phần tử có tồn tại không
                return (
                  <div
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                      gap: '2rem',
                      marginBottom: '60px',
                      alignItems: 'center',
                    }}
                  >
                    {index % 2 === 0 ? (
                      <>
                        <img
                          src={section.image || draftSection?.image} // Lấy image từ draft hoặc giữ nguyên
                          alt={section.title}
                          style={{
                            width: '100%',
                            borderRadius: '8px',
                          }}
                        />
                        <div>
                          <div style={{ marginBottom: '20px' }}>
                            <Text variant="heading2xl" as="h3">
                              {section.title}
                            </Text>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <Text variant="bodyMd" color="subdued">
                              {section.description}
                            </Text>
                          </div>
                          <Button variant="primary">
                            Get it now
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <div style={{ marginBottom: '20px' }}>
                            <Text variant="heading2xl" as="h3">
                              {section.title}
                            </Text>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <Text variant="bodyMd" color="subdued">
                              {section.description}
                            </Text>
                          </div>
                          <Button variant="primary">
                            Get it now
                          </Button>
                        </div>
                        <img
                          src={section.image || draftSection?.image} // Lấy image từ draft hoặc giữ nguyên
                          alt={section.title}
                          style={{
                            width: '100%',
                            borderRadius: '8px',
                          }}
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Review Block */}
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Text variant="heading2xl" as="h3">Real people, real reviews</Text>
              <div style={{ margin: '10px 0px 30px 0px' }}>
                <Text variant="bodySm" color="subdued" style={{ marginBottom: '20px' }}>
                  Rated 4.9/5 by 123,231+ happy customers
                </Text>
              </div>
              <ReviewBlock product={product1} />
              <div style={{ marginTop: '30px' }}>
                <Modal
                  activator={
                    <Button onClick={() => setModalOpen(true)} style={{ marginTop: '20px' }}>View More</Button>
                  }
                  open={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Reviews"
                  size="large"
                >
                  <Modal.Section>
                    <SpacingBackground>
                      <BlockStack gap="500">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', }}>
                          <div style={{ background: 'var(--p-color-bg-surface-tertiary)', padding: 20, borderRadius: '8px', }}>fwefewfwe</div>
                          <div style={{ background: 'var(--p-color-bg-surface-tertiary)', padding: 20, borderRadius: '8px', }}>fewfewfwf</div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexFlow: 'wrap' }}>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 0, 0, 7, 6, 5, 4, 4].map((item, index) => <Badge key={index}>Fulfilled</Badge>)}
                        </div>
                        <ReviewBlock product={product1} />
                      </BlockStack>
                    </SpacingBackground>
                  </Modal.Section>
                </Modal>

              </div>
            </div>

          </Card>

          {/* 🔹 Hiển thị Grid View nếu có
          {product.gridView && product.gridView.length > 0 && (
            <div style={{ marginTop: "20px", padding: "20px" }}>
              {product.gridView.map((section, index) => (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "40px", alignItems: "center" }}>
                  <Text variant="headingLg">{section.title}</Text>
                  <Text variant="bodyMd" color="subdued">{section.description}</Text>
                </div>
              ))}
            </div>
          )} */}

          {/* 🔹 Hiển thị Toast thông báo */}
          {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
        </Page>
      </Frame>
    </AppProvider>
  );
}

{/* New Review Block */ }
const ReviewBlock = ({ product }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
      {product.detailedReviews.slice(0, 4).map((review, index) => (
        <div key={index} style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          textAlign: 'left',
          position: 'relative', // Added to allow positioning reviewer name at the bottom
          minHeight: '280px', // Fixed height for uniformity
        }}>
          {/* Avatar và Stars */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#f5f5f5',
              marginRight: '10px',
            }}>
              <img
                src={review.avatar || "https://ae-pic-a1.aliexpress-media.com/kf/S47ea903b3b7a441087bea451695cc7a2x/144x144.png_.webp"}
                alt={`${review.reviewer}'s avatar`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px', fontSize: '16px' }}>
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <Icon
                    key={i}
                    source={StarFilledIcon}
                    color="warning"
                    style={{ fontSize: '16px', marginRight: '-4px' }} />
                ))}
              </div>
              {/* Color */}
              <Text variant="bodySm" as="p" tone="subdued">
                {review.variant}
              </Text>
            </div>
          </div>

          {/* Review */}
          <div style={{ marginBottom: '10px', fontStyle: 'italic', minHeight: '80px' }}>
            <Text variant="bodyMd">
              "{review.comment}"
            </Text>
          </div>

          {/* Image Gallery */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
            {review.images && review.images.map((image, i) => (
              <img key={i} src={image} alt={``} style={{
                width: '60px',
                height: '60px',
                borderRadius: '4px',
                objectFit: 'cover',
              }} />
            ))}
          </div>

          {/* Reviewer Name và Time */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontStyle: 'italic',
          }}>
            <Text variant="bodySm" tone="subdued">
              {review.reviewer} | {new Date(review.date).toLocaleDateString()}
            </Text>
          </div>
        </div>
      ))}
    </div>
  )
}

const SpacingBackground = ({ children }) => {
  return (
    <div
      style={{
        height: 'auto',
      }}
    >
      {children}
    </div>
  );
};


// // ✅ Import các thư viện cần thiết
// import { json } from "@remix-run/node"; // Xử lý JSON trên server
// import { useLoaderData, useNavigate } from "@remix-run/react"; // Lấy dữ liệu từ loader và điều hướng
// import { useState } from "react";
// import {
//   AppProvider,
//   Page,
//   Card,
//   Text,
//   Button,
//   BlockStack,
//   Toast,
//   Frame,
// } from "@shopify/polaris"; // UI components từ Shopify Polaris
// import enTranslations from "@shopify/polaris/locales/en.json"; // Định nghĩa ngôn ngữ UI
// import { authenticate, getUser } from "../shopify.server"; // Xác thực Shopify Admin
// import prisma from "../db.server"; // ORM Prisma để kết nối database
// import { MoneyIcon, DeliveryIcon, ProductReturnIcon } from "@shopify/polaris-icons"; // Icon UI

// // ✅ Loader - Fetch dữ liệu sản phẩm từ DB
// export const loader = async ({ request, params }) => {
//   // 🔹 Xác thực admin Shopify
//   const { admin, session } = await authenticate.admin(request);
//   const user = await getUser(request);

//   const productId = params.id; // Lấy ID sản phẩm từ URL
//   if (!productId) {
//     console.error("❌ Product ID is missing!");
//     throw new Response("Product ID is required", { status: 400 });
//   }

//   console.log(`🔍 Đang tìm sản phẩm với productId: ${productId}`);

//   // 🔹 Lấy sản phẩm từ bảng PlatformProduct
//   const product = await prisma.platformProduct.findUnique({
//     where: { id: BigInt(productId) },
//   });

//   if (!product) {
//     console.error("❌ Không tìm thấy sản phẩm trong PlatformProduct.");
//     throw new Response("Product not found", { status: 404 });
//   }

//   // 🔹 Kiểm tra nếu có dữ liệu tối ưu từ bảng ProductsOptimized
//   const optimizedProduct = await prisma.productsOptimized.findUnique({
//     where: { productId: BigInt(productId) },
//   });

//   console.log("✅ Dữ liệu từ ProductsOptimized:", optimizedProduct);

//   // 🔹 Kiểm tra và parse gridView nếu có dữ liệu
//   let parsedGridView = [];
//   if (optimizedProduct && optimizedProduct.grid_view) {
//     try {
//       parsedGridView = JSON.parse(optimizedProduct.grid_view);
//     } catch (error) {
//       console.error("❌ Lỗi khi parse gridView:", error);
//     }
//   }

//   return json({
//     product: {
//       id: product.id.toString(),
//       title: optimizedProduct?.optimized_title || product.title || "No title", // Lấy tiêu đề từ bản tối ưu nếu có
//       description: optimizedProduct?.optimized_description || product.descriptionHtml || "No description available.",
//       featuredMedia: product.featuredMedia || "https://via.placeholder.com/300", // Ảnh sản phẩm
//       gridView: parsedGridView, // Dữ liệu hiển thị dạng lưới nếu có
//     },
//   });
// };

// // ✅ Component chính - Hiển thị trang chi tiết sản phẩm
// export default function ProductDetailPage() {
//   const { product } = useLoaderData(); // Lấy dữ liệu sản phẩm từ loader
//   const navigate = useNavigate(); // Điều hướng trang
//   const [toast, setToast] = useState({ active: false, message: "" }); // Trạng thái thông báo Toast

//   // 🔹 Hàm gửi API lưu sản phẩm vào bảng ProductsOptimized
//   const optimizeProduct = async () => {
//     try {
//       const response = await fetch("/api/save-optimized-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productId: product.id,
//           optimizedTitle: product.title + " - Optimized",
//           optimizedDescription: product.description + " - Enhanced for SEO",
//           gridView: JSON.stringify([{ title: "Feature 1", description: "Optimized Feature Description" }]),
//         }),
//       });

//       if (!response.ok) throw new Error("Lỗi khi gửi API!");

//       const data = await response.json();
//       setToast({ active: true, message: "Product optimized successfully!" });
//       console.log("✅ Dữ liệu lưu thành công:", data);
//     } catch (error) {
//       setToast({ active: true, message: "Lỗi khi tối ưu sản phẩm!" });
//       console.error("❌ Lỗi khi tối ưu sản phẩm:", error);
//     }
//   };

//   return (
//     <AppProvider i18n={enTranslations}>
//       <Frame>
//         <Page title="Product Detail" primaryAction={{ content: "Push to Store", onAction: () => alert("Pushing to Store...") }}>
//           <Card>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", padding: "20px" }}>
//               {/* 🔹 Hiển thị hình ảnh sản phẩm */}
//               <div style={{ alignItems: "flex-start" }}>
//                 <img src={product.featuredMedia} alt="Main Product" style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
//               </div>

//               {/* 🔹 Hiển thị thông tin sản phẩm */}
//               <BlockStack spacing="loose">
//                 <Text variant="headingLg" fontWeight="bold">{product.title}</Text>
//                 <BlockStack>
//                   <Text color="subdued">{product.description}</Text>
//                 </BlockStack>
//                 <Button fullWidth variant="primary" size="large">Buy Now</Button>
//                 <Button fullWidth variant="secondary" size="large">Add to Cart</Button>
//                 <Button fullWidth variant="primary" size="large" onClick={optimizeProduct}>Optimize Product</Button>
//               </BlockStack>
//             </div>
//           </Card>

//           {/* 🔹 Hiển thị Grid View nếu có */}
//           {product.gridView && product.gridView.length > 0 && (
//             <div style={{ marginTop: "20px", padding: "20px" }}>
//               {product.gridView.map((section, index) => (
//                 <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "40px", alignItems: "center" }}>
//                   <Text variant="headingLg">{section.title}</Text>
//                   <Text variant="bodyMd" color="subdued">{section.description}</Text>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* 🔹 Hiển thị Toast thông báo */}
//           {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
//         </Page>
//       </Frame>
//     </AppProvider>
//   );
// }



// import { json } from "@remix-run/node";
// import { useLoaderData, useNavigate } from "@remix-run/react";
// import {
//   Page,
//   Card,
//   Text,
//   Button,
//   BlockStack,
//   Icon,
//   AppProvider,
//   Toast,
//   Frame,
// } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import { authenticate, getUser } from "../shopify.server";
// import { useState } from "react"; 
// import prisma from "../db.server"; 
// import { MoneyIcon, DeliveryIcon, ProductReturnIcon } from "@shopify/polaris-icons";

// export const loader = async ({ request, params }) => {
//   const { admin, session } = await authenticate.admin(request);
//   const user = await getUser(request);

//   const productId = params.id;
//   if (!productId) {
//     console.error("❌ Product ID is missing!");
//     throw new Response("Product ID is required", { status: 400 });
//   }

//   console.log(`🔍 Đang tìm sản phẩm với productId: ${productId}`);

//   // 🔹 Lấy dữ liệu từ bảng PlatformProduct trước
//   const product = await prisma.platformProduct.findUnique({
//     where: { id: BigInt(productId) },
//   });

//   if (!product) {
//     console.error("❌ Không tìm thấy sản phẩm trong PlatformProduct.");
//     throw new Response("Product not found", { status: 404 });
//   }

//   // 🔹 Lấy dữ liệu từ bảng ProductsOptimized (nếu có)
//   const optimizedProduct = await prisma.productsOptimized.findUnique({
//     where: { productId: BigInt(productId) },
//   });

//   console.log("✅ Dữ liệu từ ProductsOptimized:", optimizedProduct);

//   // 🔹 Kiểm tra và parse gridView nếu có dữ liệu
//   let parsedGridView = [];
//   if (optimizedProduct && optimizedProduct.grid_view) {
//     try {
//       parsedGridView = JSON.parse(optimizedProduct.grid_view);
//     } catch (error) {
//       console.error("❌ Lỗi khi parse gridView:", error);
//     }
//   }

//   return json({
//     product: {
//       id: product.id.toString(),
//       title: optimizedProduct?.optimized_title || product.title || "No title", // ✅ Đổi đúng tên trường
//       description: optimizedProduct?.optimized_description || product.descriptionHtml || "No description available.", // ✅ Đổi đúng tên trường
//       featuredMedia: product.featuredMedia || "https://via.placeholder.com/300",
//       gridView: parsedGridView, 
//     },
//   });
// };

// export default function ProductDetailPage() {
//   const { product } = useLoaderData();
//   const navigate = useNavigate();
//   const [toast, setToast] = useState({ active: false, message: "" });

//   // 🔹 Hàm gọi API để lưu sản phẩm vào ProductsOptimized
//   const optimizeProduct = async () => {
//     try {
//       const response = await fetch("/api/save-optimized-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productId: product.id,
//           optimizedTitle: product.title + " - Optimized",
//           optimizedDescription: product.description + " - Enhanced for SEO",
//           gridView: JSON.stringify([{ title: "Feature 1", description: "Optimized Feature Description" }]),
//         }),
//       });

//       if (!response.ok) throw new Error("Lỗi khi gửi API!");

//       const data = await response.json();
//       setToast({ active: true, message: "Product optimized successfully!" });
//       console.log("✅ Dữ liệu lưu thành công:", data);
//     } catch (error) {
//       setToast({ active: true, message: "Lỗi khi tối ưu sản phẩm!" });
//       console.error("❌ Lỗi khi tối ưu sản phẩm:", error);
//     }
//   };

//   return (
//     <AppProvider i18n={enTranslations}>
//       <Frame>
//         <Page
//           title="Product Detail"
//           primaryAction={{
//             content: "Push to Store",
//             onAction: () => alert("Pushing to Store..."),
//           }}
//         >
//           <Card>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", padding: "20px" }}>
//               {/* Hình ảnh sản phẩm */}
//               <div style={{ alignItems: "flex-start" }}>
//                 <img
//                   src={product.featuredMedia}
//                   alt="Main Product"
//                   style={{
//                     width: "100%",
//                     borderRadius: "8px",
//                     objectFit: "cover",
//                   }}
//                 />
//               </div>

//               {/* Thông tin sản phẩm */}
//               <BlockStack spacing="loose">
//                 <Text variant="headingLg" fontWeight="bold">
//                   {product.title}
//                 </Text>

//                 <BlockStack>
//                   <Text color="subdued">{product.description}</Text>
//                 </BlockStack>

//                 <Button fullWidth variant="primary" size="large">
//                   Buy Now
//                 </Button>

//                 <Button fullWidth variant="secondary" size="large">
//                   Add to Cart
//                 </Button>

//                 {/* 🔹 Nút tối ưu sản phẩm */}
//                 <Button fullWidth variant="primary" size="large" onClick={optimizeProduct}>
//                   Optimize Product
//                 </Button>
//               </BlockStack>
//             </div>
//           </Card>

//           {/* 🔹 Hiển thị Grid View nếu có */}
//           {product.gridView && product.gridView.length > 0 && (
//             <div style={{ marginTop: "20px", padding: "20px" }}>
//               {product.gridView.map((section, index) => (
//                 <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "40px", alignItems: "center" }}>
//                   <Text variant="headingLg">{section.title}</Text>
//                   <Text variant="bodyMd" color="subdued">{section.description}</Text>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Hiển thị Toast thông báo */}
//           {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
//         </Page>
//       </Frame>
//     </AppProvider>
//   );
// }