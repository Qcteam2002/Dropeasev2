import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const migrateProducts = async () => {
    try {
        console.log("🔄 Đang bắt đầu di chuyển dữ liệu từ `product` sang `DropeaseProduct`...");

        // 🟢 Lấy toàn bộ sản phẩm từ bảng product
        const products = await prisma.platformProduct.findMany();

        for (const product of products) {
            await prisma.dropeaseProduct.create({
                data: {
                    sourceProductId: product.id,
                    title: product.title,
                    description: product.descriptionHtml || null,
                    featuredMedia: product.featuredMedia || null,
                    images: product.images || null,
                    variants: product.variants || null,
                    media: product.media || null,
                    options: product.options || null,
                    productType: product.productType || null,
                    collections: product.collections || null,
                    createdAt: product.createdAt,
                    rating: null, // Không có, để trống
                    reviewCount: 0, // Mặc định là 0
                    reviews: null,
                    detailedReviews: null,
                    paymentMethods: null,
                    shippingOptions: null,
                    gridView: null,
                }
            });
        }

        console.log("✅ Data migrated successfully!");
    } catch (error) {
        console.error("❌ Error migrating data:", error);
    } finally {
        await prisma.$disconnect(); // 🛑 Đóng kết nối Prisma sau khi hoàn tất
    }
};

// 🟢 Chạy hàm này khi cần
migrateProducts();