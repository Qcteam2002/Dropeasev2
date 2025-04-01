// ✅ Import các thư viện cần thiết
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
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
    Frame,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcPaypal, faCcApplePay, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import prisma from "../db.server";

// 🔹 **Hàm hỗ trợ: Parse JSON an toàn**
const parseJson = (data, fallback = []) => {
    try {
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
};

// ✅ **Loader - Lấy dữ liệu từ `DropeaseProduct`**
export const loader = async ({ request, params }) => {
    const productId = params.id;
    if (!productId) {
        console.error("❌ Product ID is missing!");
        throw new Response("Product ID is required", { status: 400 });
    }

    console.log(`🔍 Đang tìm sản phẩm với productId: ${productId}`);

    // 🔹 Lấy sản phẩm từ bảng `DropeaseProduct`
    const product = await prisma.dropeaseProduct.findUnique({
        where: { id: BigInt(productId) },
    });

    if (!product) {
        console.error("❌ Không tìm thấy sản phẩm.");
        throw new Response("Product not found", { status: 404 });
    }

    // 🔹 **Check xem product.images có dữ liệu không**
    console.log("🔍 Raw images:", product.images);

    // 🔹 **Xử lý ảnh đúng cách**
    let parsedImages = [];
    if (product.images) {
        if (typeof product.images === "object") {
            // ✅ Nếu `product.images` là object
            if (product.images.create && Array.isArray(product.images.create)) {
                parsedImages = product.images.create.map(img => img.url);
            }
        } else if (typeof product.images === "string") {
            // ✅ Nếu `product.images` là string, thử parse JSON
            try {
                const imageData = JSON.parse(product.images);
                if (imageData.create && Array.isArray(imageData.create)) {
                    parsedImages = imageData.create.map(img => img.url);
                }
            } catch (error) {
                console.error("❌ Lỗi khi parse images:", error);
            }
        }
    }

    console.log("✅ Final images array:", parsedImages);

    return json({
        product: {
            id: product.id.toString(),
            title: product.title || "No title",
            description: product.description || "No description available.",
            featuredMedia: product.featuredMedia || "https://via.placeholder.com/300",
            images: parsedImages, // ✅ Lưu danh sách ảnh đã parse
            variants: parseJson(product.variants),
            gridView: parseJson(product.gridView),
            reviews: parseJson(product.reviews),
            detailedReviews: parseJson(product.detailedReviews),
            paymentMethods: parseJson(product.paymentMethods),
            shippingOptions: parseJson(product.shippingOptions),
            rating: product.rating || 0,
            reviewCount: product.reviewCount || 0,
        },
    });
};

// ✅ **Component chính - Hiển thị trang chi tiết sản phẩm**
export default function ProductDetailPage() {
    const { product } = useLoaderData();
    const navigate = useNavigate();
    const [toast, setToast] = useState({ active: false, message: "" });

    //Thumbnail
    const [mainImage, setMainImage] = useState(product.featuredMedia); // Ảnh mặc định
    const [visibleIndex, setVisibleIndex] = useState(0); // 🔹 Kiểm soát index hiển thị
    const thumbnailsPerView = 4; // 🔹 Số lượng thumbnails hiển thị mỗi lần
    const totalThumbnails = product.variants?.length || 0;

    // 🔹 Điều hướng thumbnails
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

    async function createMetafields() {
        try {
            const formData = new FormData();
            formData.append("productId", product.id);
    
            const response = await fetch("/api/create-metafields", {
                method: "POST",
                body: formData,
            });
    
            const result = await response.json();
            if (result.success) {
                setToast({ active: true, message: "✅ Metafields created successfully!" });
            } else {
                setToast({ active: true, message: `❌ Failed: ${result.message}` });
            }
        } catch (error) {
            console.error("❌ Error creating metafields:", error);
            setToast({ active: true, message: "❌ Error occurred while creating metafields!" });
        }
    }
    

    return (
        <AppProvider i18n={enTranslations}>
            <Frame>
                <Page title="Product Detail">
                    {/* 🔹 Nút Push Product */}
                    <Button onClick={createMetafields} variant="primary">
                        Push Product to Shopify
                    </Button>

                    <Card>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr", // 🔹 Chia cột hình ảnh và nội dung theo tỷ lệ 50:50
                            alignItems: "flex-start",
                            gap: "2rem",
                            padding: "20px",
                        }}>
                            {/* 🔹 Cột hình ảnh sản phẩm */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {/* 🔹 Hình ảnh chính */}
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

                                {/* 🔹 **Thumbnails - Hiển thị danh sách ảnh** */}
                                <div style={{ position: "relative", width: "100%", maxWidth: "500px", marginTop: "10px" }}>
                                    {/* Nút Prev */}
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

                                    <div style={{
                                        display: "flex",
                                        overflowX: "hidden",
                                        gap: "10px",
                                        padding: "5px",
                                        whiteSpace: "nowrap",
                                        width: "100%",
                                        justifyContent: "center",
                                    }}>
                                        {product.images.length > 0 ? (
                                            product.images.map((img, index) => (
                                                <img key={index} src={img} alt={`Thumbnail ${index}`}
                                                    style={{ width: "80px", height: "80px", cursor: "pointer", borderRadius: "5px" }} />
                                            ))
                                        ) : (
                                            <Text variant="bodySm" color="subdued">No images available</Text>
                                        )}
                                    </div>

                                    {/* Nút Next */}
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

                            {/* 🔹 **Thông tin sản phẩm** */}
                            <BlockStack spacing="loose">
                                <Text variant="headingLg" fontWeight="bold">{product.title}</Text>
                                <Text variant="bodyMd" color="subdued">{product.description}</Text>

                                {/* ⭐ **Rating & Reviews** */}
                                <Text variant="bodyMd" fontWeight="bold">⭐ {product.rating} ({product.reviewCount} Reviews)</Text>

                                {/* 💳 **Phương thức thanh toán** */}
                                <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "10px" }}>
                                    <FontAwesomeIcon icon={faCcPaypal} size="2x" />
                                    <FontAwesomeIcon icon={faCcApplePay} size="2x" />
                                    <FontAwesomeIcon icon={faCcMastercard} size="2x" />
                                    <FontAwesomeIcon icon={faCcVisa} size="2x" />
                                </div>

                                {/* 🚚 **Shipping Options** */}
                                {product.shippingOptions.length > 0 && (
                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                        {product.shippingOptions.map((option, index) => (
                                            <Text key={index} variant="bodySm">{option}</Text>
                                        ))}
                                    </div>
                                )}
                            </BlockStack>
                        </div>
                    </Card>

                    {/* 🔹 **Grid View nếu có** */}
                    {product.gridView.length > 0 && (
                        <div style={{ marginTop: "20px", padding: "20px" }}>
                            {product.gridView.map((section, index) => (
                                <div key={index} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "40px" }}>
                                    <Text variant="headingLg">{section.title}</Text>
                                    <Text variant="bodyMd" color="subdued">{section.description}</Text>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 🔹 **Toast thông báo** */}
                    {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
                </Page>
            </Frame>
        </AppProvider>
    );
}