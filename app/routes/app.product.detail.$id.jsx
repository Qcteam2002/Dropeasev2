import { json } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
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
  Thumbnail,
  Frame,
  Icon,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { authenticate, getUser } from "../shopify.server";
import prisma from "../db.server";
import { StarFilledIcon, MoneyIcon, DeliveryIcon, ProductReturnIcon } from "@shopify/polaris-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal, faCcApplePay, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import ShopifyProduct from "../server/services/product";

const productDatadraft = [
  {
    id: 1,
    title: "2023 PAGANI DESIGN Men's Watch - Luxury Quartz",
    discountPercentage: "50%",
    rating: "4.5 (20 Reviews)",
    variants: [
      {
        "option1": "Color",
        "value1": "NO.17",
        "option2": "Size",
        "value2": "S",
        "variantImage": "https://cdn.shopify.com/s/files/1/0603/0953/6946/files/S930d35a72acb464fb24bf6188826193b7.webp?v=1741158213",
        "variantPrice": "$250.99",
        "variantCompareAtPrice": "$250.99",
      },
      {
        "option1": "Color",
        "value1": "NO.16",
        "option2": "Size",
        "value2": "M",
        "variantImage": "https://cdn.shopify.com/s/files/1/0603/0953/6946/files/Se5a171a92b254de792191c66dd992fd87.webp?v=1741158214",
        "variantPrice": "$150",
        "variantCompareAtPrice": "$100",
      },
      {
        "option1": "Color",
        "value1": "NO.18",
        "option2": "Size",
        "value2": "N",
        "variantImage": "https://cdn.shopify.com/s/files/1/0603/0953/6946/files/Scea84afffbd842c0929d6dd6e358e962U.webp?v=1741158213",
        "variantPrice": "$250",
        "variantCompareAtPrice": "$240",
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
      },
      {
        image: "https://ae-pic-a1.aliexpress-media.com/kf/S2e1c4aed6e5e489baf57527e51364e33y.jpg_960x960q75.jpg_.avif",
      },
      {
        image: "https://ae-pic-a1.aliexpress-media.com/kf/Sb288e4c0ea2744c3a20ec9a0e2151250f.jpg_960x960q75.jpg_.avif",
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

// Loader - Fetch dữ liệu sản phẩm từ DB
export const loader = async ({ request, params }) => {
  const { admin, session } = await authenticate.admin(request);
  const user = await getUser(request);

  const productId = params.id;
  if (!productId) {
    console.error("❌ Product ID is missing!");
    throw new Response("Product ID is required", { status: 400 });
  }

  // Fetch payment icons configuration
  const paymentIconsConfig = await admin.graphql(
    `#graphql
      query {
        shop {
          metafield(namespace: "custom", key: "payment_icons_config") {
            value
          }
        }
      }
    `
  );

  const paymentIconsData = await paymentIconsConfig.json();
  const paymentConfig = paymentIconsData.data?.shop?.metafield?.value 
    ? JSON.parse(paymentIconsData.data.shop.metafield.value)
    : null;

  console.log(`🔍 Đang tìm sản phẩm với productId: ${productId}`);

  const product = await prisma.platformProduct.findUnique({
    where: { id: BigInt(productId) },
  });

  let variants = [];
  if (product.variants) {
    if (typeof product.variants === "string") {
      try {
        variants = JSON.parse(product.variants);
      } catch (error) {
        console.error("❌ Lỗi khi parse variants:", error);
      }
    } else if (Array.isArray(product.variants)) {
      variants = product.variants;
    } else if (typeof product.variants === "object" && product.variants.create) {
      variants = product.variants.create;
    }
  }

  if (!product) {
    console.error("❌ Không tìm thấy sản phẩm trong PlatformProduct.");
    throw new Response("Product not found", { status: 404 });
  }

  const optimizedProduct = await prisma.productsOptimized.findUnique({
    where: { productId: BigInt(productId) },
  });

  console.log("✅ Dữ liệu từ ProductsOptimized:", optimizedProduct);

  let parsedGridView = [];
  if (optimizedProduct && optimizedProduct.gridView) {
    try {
      parsedGridView = JSON.parse(optimizedProduct.gridView);
    } catch (error) {
      console.error("❌ Lỗi khi parse gridView:", error);
    }
  }

  return json({
    product: {
      id: product.id.toString(),
      platformId: product.platformId,
      title: optimizedProduct?.optimizedTitle || product.title || "No title",
      description: optimizedProduct?.optimizedDescription || product.descriptionHtml || "No description available.",
      featuredMedia: product.featuredMedia || "https://via.placeholder.com/300",
      gridView: parsedGridView,
      variants,
      isPaymentActive: paymentConfig?.isActive || false,
      paymentConfig,
      session,
    },
  });
};

// Action - Xử lý khi bấm "Push to Store"
export const action = async ({ request, params }) => {
  const { session } = await authenticate.admin(request);
  const shopifyApi = new ShopifyProduct(session);

  const productId = params.id;
  const product = await prisma.platformProduct.findUnique({
    where: { id: BigInt(productId) },
  });

  if (!product) {
    return json({ success: false, message: "Product not found" }, { status: 404 });
  }

  const optimizedProduct = await prisma.productsOptimized.findUnique({
    where: { productId: BigInt(productId) },
  });

  // Chuẩn bị dữ liệu sản phẩm để gửi lên Shopify
  const productData = {
    id: product.id.toString(),
    platformId: product.platformId, // platformId để kiểm tra sản phẩm đã tồn tại trên Shopify chưa
    title: optimizedProduct?.optimizedTitle || product.title || "No title",
    descriptionHtml: optimizedProduct?.optimizedDescription || product.descriptionHtml || "No description available.",
    featuredMedia: product.featuredMedia || "https://via.placeholder.com/300",
    variants: product.variants ? (typeof product.variants === "string" ? JSON.parse(product.variants) : product.variants) : [],
    images: [], // Thêm logic để lấy images nếu cần
  };

  try {
    let result;
    if (productData.platformId) {
      // Nếu sản phẩm đã tồn tại trên Shopify (có platformId), gọi updateProductShopify
      result = await shopifyApi.updateProductShopify(productData);
      return json({ success: true, message: "Product updated successfully on Shopify", product: result });
    } else {
      // Nếu sản phẩm chưa tồn tại, gọi pushProductToShopify
      result = await shopifyApi.pushProductToShopify(productData);
      // Cập nhật platformId vào database sau khi tạo sản phẩm thành công
      await prisma.platformProduct.update({
        where: { id: BigInt(productId) },
        data: { platformId: result.id },
      });
      return json({ success: true, message: "Product pushed successfully to Shopify", product: result });
    }
  } catch (error) {
    console.error("Error pushing/updating product to Shopify:", error);
    return json({ success: false, message: error.message }, { status: 500 });
  }
};

// Component chính - Hiển thị trang chi tiết sản phẩm
export default function ProductDetailPage() {
  const product1 = productDatadraft.find((p) => p.id === parseInt(1));
  const draftProduct = productDatadraft?.[0];
  const { product } = useLoaderData();
  const actionData = useActionData();

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(draftProduct.variants[0]);
  const [mainImage, setMainImage] = useState(product.featuredMedia);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [toast, setToast] = useState({ active: false, message: "" });

  const thumbnailsPerView = 4;
  const totalThumbnails = product.variants?.length || 0;

  const handleNext = () => {
    if (visibleIndex + thumbnailsPerView < totalThumbnails) {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  const handlePrev = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 1);
    }
  };

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

  const displayedPrice = selectedVariant?.variantPrice || draftProduct.priceOriginal;
  const displayedCompareAtPrice = selectedVariant?.variantCompareAtPrice || draftProduct.priceDiscounted;

  // Hiển thị thông báo từ actionData
  if (actionData?.message) {
    setTimeout(() => {
      setToast({ active: true, message: actionData.message });
    }, 0);
  }

  return (
    <AppProvider i18n={enTranslations}>
<Frame>
        <Page
          title="Product Detail"
          titleMetadata={
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Form method="post">
                <Button variant="primary" size="medium" submit>
                  Push to Store
                </Button>
              </Form>
            </div>
          }
        >
          <Card>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignItems: "flex-start",
                gap: "2rem",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src={mainImage}
                  alt="Main Product"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "600px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ position: "relative", width: "100%", maxWidth: "500px", marginTop: "10px" }}>
                  <button
                    onClick={handlePrev}
                    disabled={visibleIndex === 0}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      cursor: visibleIndex === 0 ? "not-allowed" : "pointer",
                      opacity: visibleIndex === 0 ? 0.5 : 1,
                    }}
                  >
                    ◀
                  </button>
                  <div
                    style={{
                      display: "flex",
                      overflowX: "hidden",
                      gap: "10px",
                      padding: "5px",
                      whiteSpace: "nowrap",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {product.variants.slice(visibleIndex, visibleIndex + thumbnailsPerView).map((variant, index) => (
                      <img
                        key={index}
                        src={variant.image}
                        alt={`Variant ${index}`}
                        onClick={() => setMainImage(variant.image)}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          border: mainImage === variant.image ? "2px solid #000" : "none",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={visibleIndex + thumbnailsPerView >= totalThumbnails}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      cursor: visibleIndex + thumbnailsPerView >= totalThumbnails ? "not-allowed" : "pointer",
                      opacity: visibleIndex + thumbnailsPerView >= totalThumbnails ? 0.5 : 1,
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>

              <BlockStack spacing="loose">
                <Text variant="headingLg" fontWeight="bold">
                  {product.title}
                </Text>
                <BlockStack gap="500" style={{ padding: '10px 0px 12px 0px' }}>
                  <Text variant="bodySm" color="subdued">
                    {draftProduct.rating}
                  </Text>
                </BlockStack>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0px 0px 12px 0px' }}>
                  <Box style={{ color: '#d52e2e' }}>
                    <Text variant="headingLg" as="h5">
                      {displayedPrice}
                    </Text>
                  </Box>
                  <Box style={{ textDecoration: 'line-through', color: '#6D6D6D' }}>
                    <Text variant="bodyLg" as="p">
                      {displayedCompareAtPrice}
                    </Text>
                  </Box>
                  <Badge status="success">Save {draftProduct.discountPercentage}</Badge>
                </div>
                <BlockStack style={{ padding: '0px 0px 12px 0px' }}>
                  <Text color="subdued">{product.description}</Text>
                </BlockStack>
                <div>
                  <Text variant="bodySm" fontWeight="semibold">
                    Color:
                  </Text>
                  <div style={{ padding: '12px 0px 12px 0px' }}>
                    <InlineStack gap="150" wrap={false} blockAlign="center">
                      {draftProduct.variants.map((variant) => (
                        <Button
                          key={variant.value1}
                          size="slim"
                          primary={selectedVariant.value1 === variant.value1}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setMainImage(variant.variantImage);
                          }}
                        >
                          {variant.value1}
                        </Button>
                      ))}
                    </InlineStack>
                  </div>
                </div>
                <div>
                  <Text variant="bodySm" fontWeight="semibold">
                    Size:
                  </Text>
                  <div style={{ padding: '12px 0px 12px 0px' }}>
                    <InlineStack gap="150" wrap={false} blockAlign="center">
                      {draftProduct.variants.map((variant) => (
                        <Button
                          key={variant.value2}
                          size="slim"
                          primary={selectedVariant.value2 === variant.value2}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setMainImage(variant.variantImage);
                          }}
                        >
                          {variant.value2}
                        </Button>
                      ))}
                    </InlineStack>
                  </div>
                </div>
                <div style={{ padding: '12px 0px 12px 0px' }}>
                  <Button fullWidth variant="primary" size="large">
                    Buy Now
                  </Button>
                </div>
                <div style={{ padding: '0px 0px 12px 0px' }}>
                  <Button fullWidth variant="secondary" size="large">
                    Add to Cart
                  </Button>
                </div>
                <div style={{ 
                  maxWidth: '1200px', 
                  margin: '0 auto', 
                  padding: '10px 0', 
                    textAlign: 'center',
                  background: product.paymentConfig?.backgroundColor || '#ffffff' 
                }}>
                  {product.isPaymentActive && (
                    <ul style={{ 
                      display: 'flex', 
                    justifyContent: 'center',
                      alignItems: 'center', 
                      gap: `${product.paymentConfig?.spacing || 10}px`, 
                      flexWrap: 'wrap', 
                      listStyle: 'none', 
                      padding: 0, 
                      margin: 0 
                    }}>
                      {product.paymentConfig?.selectedIcons?.map((icon) => {
                        const iconStyle = {
                          height: `${product.paymentConfig?.iconSize || 25}px`,
                          display: 'flex',
                          alignItems: 'center'
                        };

                        switch (icon) {
                          case 'visa':
                            return (
                              <li key="visa" style={iconStyle}>
                                <svg class="icon icon--full-color" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa">
                                  <title id="pi-visa">Visa</title>
                                  <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                                  <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                                  <path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path>
                                </svg>
                              </li>
                            );
                          case 'mastercard':
                            return (
                              <li key="mastercard" style={iconStyle}>
                                <svg class="icon icon--full-color" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-master">
                                  <title id="pi-master">Mastercard</title>
                                  <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                                  <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                                  <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                                  <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                                  <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path>
                                </svg>
                              </li>
                            );
                          case 'paypal':
                            return (
                              <li key="paypal" style={iconStyle}>
                                <svg class="icon icon--full-color" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal">
                                  <title id="pi-paypal">PayPal</title>
                                  <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                                  <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                                  <path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path>
                                  <path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path>
                                </svg>
                              </li>
                            );
                          case 'apple-pay':
                            return (
                              <li key="apple-pay" style={iconStyle}>
                                <svg class="icon icon--full-color" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" x="0" y="0" width="38" height="24" viewBox="0 0 165.521 105.965" xml:space="preserve" aria-labelledby="pi-apple_pay">
                                  <title id="pi-apple_pay">Apple Pay</title>
                                  <path fill="#000" d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"></path>
                                  <path fill="#FFF" d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"></path>
                                  <g>
                                    <g>
                                      <path fill="#000" d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"></path>
                                      <path fill="#000" d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"></path>
                                    </g>
                                    <g>
                                      <path fill="#000" d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"></path>
                                      <path fill="#000" d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"></path>
                                      <path fill="#000" d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"></path>
                                    </g>
                                  </g>
                                </svg>
                              </li>
                            );
                          case 'google-pay':
                            return (
                              <li key="google-pay" style={iconStyle}>
                                <svg class="icon icon--full-color" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-google_pay">
                                  <title id="pi-google_pay">Google Pay</title>
                                  <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity=".07"></path>
                                  <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path>
                                  <path d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z" fill="#5F6368"></path>
                                  <path d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z" fill="#4285F4"></path>
                                  <path d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z" fill="#34A853"></path>
                                  <path d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z" fill="#FBBC04"></path>
                                  <path d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z" fill="#EA4335"></path>
                                </svg>
                              </li>
                            );
                          default:
                            return null;
                        }
                      })}
                    </ul>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgb(249, 249, 249)',
                  borderRadius: '8px',
                  padding: '15px',
                  marginTop: '20px',
                  textAlign: 'center',
                  gap: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    <Icon source={DeliveryIcon} tone="base" />
                    <p style={{ margin: 0 }}>Free Shipping</p>
                  </div>
                  <div style={{
                    width: '1px',
                    height: '24px',
                    background: '#ccc'
                  }}></div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    <Icon source={MoneyIcon} tone="base" />
                    <p style={{ margin: 0 }}>Money Back</p>
                  </div>
                  <div style={{
                    width: '1px',
                    height: '24px',
                    background: '#ccc'
                  }}></div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap'
                  }}>
                    <Icon source={ProductReturnIcon} tone="base" />
                    <p style={{ margin: 0 }}>Free Return</p>
                  </div>
                </div>
                <div style={{
                  textAlign: 'left',
                  paddingTop: '10px',
                }}>
                  <div style={{
                    maxHeight: '90px',
                    borderRadius: '8px',
                    margin: '10px 0',
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ fontStyle: 'italic', fontSize: '13px', lineHeight: '1.6' }}>
                      <Text variant="bodyMd" as="p" style={{
                        textAlign: 'left',
                      }}>
                        "{draftProduct.reviews[currentReviewIndex].comment}"
                      </Text>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginTop: '10px',
                      borderTop: '1px solid #eaeaea',
                      padding: '10px 0px',
                    }}>
                      <div style={{ fontStyle: 'italic', fontSize: '12px', lineHeight: '1.6', color: '#eaeaea', marginRight: '8px' }}>
                        <Text as="p" tone="subdued" style={{
                          marginRight: '8px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}>
                          {draftProduct.reviews[currentReviewIndex].reviewer}
                        </Text>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(Math.floor(draftProduct.reviews[currentReviewIndex].rating))].map((_, i) => (
                          <Icon key={i} source={StarFilledIcon} color="warning" />
                        ))}
                      </div>
                    </div>
                  </div>
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
                    {draftProduct.reviews.map((_, index) => (
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

            <div style={{ marginTop: '20px', padding: '20px' }}>
              {product.gridView.map((section, index) => {
                const randomVariantImage =
                  product.variants && product.variants.length > 0
                    ? product.variants[Math.floor(Math.random() * product.variants.length)].image
                    : null;
                console.log("🔍 Danh sách Variants:", product.variants);
                console.log("🎲 Hình ảnh Variant được chọn ngẫu nhiên:", randomVariantImage);
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
                          src={section.image || randomVariantImage}
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
                          src={section.image || randomVariantImage}
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

            {/* <div style={{ padding: '20px', textAlign: 'center' }}>
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
            </div> */}
          </Card>
          {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
        </Page>
      </Frame>
    </AppProvider>
  );
}

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
          position: 'relative',
          minHeight: '280px',
        }}>
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
              <Text variant="bodySm" as="p" tone="subdued">
                {review.variant}
              </Text>
            </div>
          </div>
          <div style={{ marginBottom: '10px', fontStyle: 'italic', minHeight: '80px' }}>
            <Text variant="bodyMd">
              "{review.comment}"
            </Text>
          </div>
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
  );
};

const SpacingBackground = ({ children }) => {
  return (
    <div style={{ height: 'auto' }}>
      {children}
    </div>
  );
};
