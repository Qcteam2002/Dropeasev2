import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Card,
  Text,
  Button,
  BlockStack,
  Icon,
  AppProvider,
  Toast,
  Frame,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { authenticate, getUser } from "../shopify.server";
import { useState } from "react"; 
import prisma from "../db.server"; 
import { MoneyIcon, DeliveryIcon, ProductReturnIcon } from "@shopify/polaris-icons";

export const loader = async ({ request, params }) => {
  const { admin, session } = await authenticate.admin(request);
  const user = await getUser(request);

  const productId = params.id;
  if (!productId) {
    console.error("❌ Product ID is missing!");
    throw new Response("Product ID is required", { status: 400 });
  }

  console.log(`🔍 Đang tìm sản phẩm với productId: ${productId}`);

  // 🔹 Lấy dữ liệu từ bảng PlatformProduct trước
  const product = await prisma.platformProduct.findUnique({
    where: { id: BigInt(productId) },
  });

  if (!product) {
    console.error("❌ Không tìm thấy sản phẩm trong PlatformProduct.");
    throw new Response("Product not found", { status: 404 });
  }

  // 🔹 Lấy dữ liệu từ bảng ProductsOptimized (nếu có)
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
      title: optimizedProduct?.optimized_title || product.title || "No title", // ✅ Đổi đúng tên trường
      description: optimizedProduct?.optimized_description || product.descriptionHtml || "No description available.", // ✅ Đổi đúng tên trường
      featuredMedia: product.featuredMedia || "https://via.placeholder.com/300",
      gridView: parsedGridView, 
    },
  });
};

export default function ProductDetailPage() {
  const { product } = useLoaderData();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ active: false, message: "" });

  // 🔹 Hàm gọi API để lưu sản phẩm vào ProductsOptimized
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

  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <Page
          title="Product Detail"
          primaryAction={{
            content: "Push to Store",
            onAction: () => alert("Pushing to Store..."),
          }}
        >
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", padding: "20px" }}>
              {/* Hình ảnh sản phẩm */}
              <div style={{ alignItems: "flex-start" }}>
                <img
                  src={product.featuredMedia}
                  alt="Main Product"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Thông tin sản phẩm */}
              <BlockStack spacing="loose">
                <Text variant="headingLg" fontWeight="bold">
                  {product.title}
                </Text>

                <BlockStack>
                  <Text color="subdued">{product.description}</Text>
                </BlockStack>

                <Button fullWidth variant="primary" size="large">
                  Buy Now
                </Button>

                <Button fullWidth variant="secondary" size="large">
                  Add to Cart
                </Button>

                {/* 🔹 Nút tối ưu sản phẩm */}
                <Button fullWidth variant="primary" size="large" onClick={optimizeProduct}>
                  Optimize Product
                </Button>
              </BlockStack>
            </div>
          </Card>

          {/* 🔹 Hiển thị Grid View nếu có */}
          {product.gridView && product.gridView.length > 0 && (
            <div style={{ marginTop: "20px", padding: "20px" }}>
              {product.gridView.map((section, index) => (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "40px", alignItems: "center" }}>
                  <Text variant="headingLg">{section.title}</Text>
                  <Text variant="bodyMd" color="subdued">{section.description}</Text>
                </div>
              ))}
            </div>
          )}

          {/* Hiển thị Toast thông báo */}
          {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
        </Page>
      </Frame>
    </AppProvider>
  );
}