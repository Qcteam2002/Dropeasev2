import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import {
    AppProvider,
    Page,
    Layout,
    Card,
    TextField,
    IndexTable,
    Text,
    Badge,
    Button,
    Thumbnail,
    Toast,
    Frame, // 🟢 Thêm Frame từ Polaris
} from "@shopify/polaris";
import { authenticate, getUser } from "../shopify.server";
import enTranslations from "@shopify/polaris/locales/en.json";
import { getProducts } from "../models/PlatformProduct";

export const loader = async ({ request }) => {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);
    const products = await getProducts(user.id);

    const serializedProducts = products.map((product) => ({
        ...product,
        id: product.id.toString(),
        userId: product.userId.toString(),
        sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
        inventory: product.inventory || 0,
        descriptionHtml: product.descriptionHtml || "",
    }));

    return json({ products: serializedProducts });
};

export default function ProductListPage() {
    const { products } = useLoaderData();
    const [searchValue, setSearchValue] = useState("");
    const [toast, setToast] = useState({ active: false, message: "" });
    const [loadingId, setLoadingId] = useState(null);
    const navigate = useNavigate();

    // 🔹 Gửi request tối ưu hóa sản phẩm
    const optimizeProduct = async (product) => {
        setLoadingId(product.id); // 🔹 Hiển thị trạng thái loading

        try {
            const response = await fetch("http://localhost:5003/api/openai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: product.id, // 🔹 Truyền thêm productId
                    title: product.title,
                    description: product.descriptionHtml || "No description available.",
                }),
            });

            if (!response.ok) throw new Error("API Error!");

            const data = await response.json();
            console.log("✅ Dữ liệu từ OpenAI:", data);

            // 🔹 Gửi API lưu vào MySQL với productId
            const saveResponse = await fetch("http://localhost:51070/api/save-optimized-product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: product.id, // 🔹 Đảm bảo truyền productId
                    optimizedTitle: data.optimizedTitle,
                    optimizedDescription: data.optimizedDescription,
                    gridView: data.gridView,
                }),
            });

            const saveResult = await saveResponse.json();
            console.log("✅ Kết quả lưu vào DB:", saveResult);

            if (!saveResponse.ok) throw new Error("Lưu vào DB thất bại!");

            setToast({ active: true, message: "Product optimized successfully!" });
        } catch (error) {
            console.error("❌ Lỗi khi tối ưu sản phẩm:", error);
            setToast({ active: true, message: "Error optimizing product!" });
        } finally {
            setLoadingId(null); // 🔹 Tắt trạng thái loading
        }
    };

    return (
        <AppProvider i18n={enTranslations}>
            {/* 🟢 Bọc toàn bộ trong Frame để fix lỗi */}
            <Frame>
                <Page title="Product List">
                    <Layout>
                        {/* Thanh tìm kiếm */}
                        <Layout.Section>
                            <Card sectioned>
                                <TextField
                                    placeholder="Search Product"
                                    value={searchValue}
                                    onChange={setSearchValue}
                                    clearButton
                                    onClearButtonClick={() => setSearchValue("")}
                                />
                            </Card>
                        </Layout.Section>

                        {/* Bảng sản phẩm */}
                        <Layout.Section>
                            <Card>
                                <IndexTable
                                    resourceName={{ singular: "product", plural: "products" }}
                                    itemCount={products.length}
                                    headings={[
                                        { title: "Image" },
                                        { title: "Product Name" },
                                        { title: "Inventory" },
                                        { title: "Actions" },
                                    ]}
                                    selectable
                                >
                                    {products.map((product, index) => (
                                        <IndexTable.Row id={product.id} key={product.id} position={index}>
                                            <IndexTable.Cell>
                                                <Thumbnail source={product.featuredMedia || "https://via.placeholder.com/150"} alt={product.title} size="small" />
                                            </IndexTable.Cell>

                                            <IndexTable.Cell>
                                                <div
                                                    style={{
                                                        maxWidth: "200px",
                                                        whiteSpace: "normal",
                                                        overflow: "hidden",
                                                        display: "-webkit-box",
                                                        WebkitBoxOrient: "vertical",
                                                        WebkitLineClamp: 2,
                                                        wordBreak: "break-word",
                                                    }}
                                                >
                                                    <Text fontWeight="500" as="span">
                                                        {product.title}
                                                    </Text>
                                                </div>
                                            </IndexTable.Cell>

                                            <IndexTable.Cell>
                                                <Badge status="success">{product.inventory} in stock</Badge>
                                            </IndexTable.Cell>

                                            <IndexTable.Cell>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <Button primary onClick={() => navigate(`/app/product/detail/${product.id}`)}>
                                                        View Details
                                                    </Button>
                                                    <Button loading={loadingId === product.id} onClick={() => optimizeProduct(product)}>
                                                        Product Optimize
                                                    </Button>
                                                </div>
                                            </IndexTable.Cell>
                                        </IndexTable.Row>
                                    ))}
                                </IndexTable>
                            </Card>
                        </Layout.Section>
                    </Layout>

                    {/* 🟢 Hiển thị Toast thông báo trong Frame */}
                    {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
                </Page>
            </Frame>
        </AppProvider>
    );
}





// 9h57
// import { json } from "@remix-run/node";
// import { useLoaderData, useNavigate } from "@remix-run/react";
// import React, { useState } from "react";
// import {
//     AppProvider,
//     Page,
//     Layout,
//     Card,
//     TextField,
//     IndexTable,
//     Text,
//     Badge,
//     Button,
//     Thumbnail,
// } from "@shopify/polaris";
// import { authenticate, getUser } from "../shopify.server";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import { getProducts } from "../models/PlatformProduct";

// export const loader = async ({ request }) => {
//     const { admin, session } = await authenticate.admin(request);
//     const user = await getUser(request);
//     const products = await getProducts(user.id);

//     const serializedProducts = products.map((product) => ({
//         ...product,
//         id: product.id.toString(),
//         userId: product.userId.toString(),
//         sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
//     }));

//     return json({ products: serializedProducts });
// };

// export default function ProductListPage() {
//     const { products } = useLoaderData();
//     const [searchValue, setSearchValue] = useState("");
//     const navigate = useNavigate();

//     return (
//         <AppProvider i18n={enTranslations}>
//             <Page title="Product List">
//                 <Layout>
//                     {/* Thanh tìm kiếm */}
//                     <Layout.Section>
//                         <Card sectioned>
//                             <TextField
//                                 placeholder="Search Product"
//                                 value={searchValue}
//                                 onChange={setSearchValue}
//                                 clearButton
//                                 onClearButtonClick={() => setSearchValue("")}
//                             />
//                         </Card>
//                     </Layout.Section>

//                     {/* Bảng sản phẩm */}
//                     <Layout.Section>
//                         <Card>
//                             <IndexTable
//                                 resourceName={{ singular: "product", plural: "products" }}
//                                 itemCount={products.length}
//                                 headings={[
//                                     { title: "Image" },
//                                     { title: "Product Name" },
//                                     { title: "Inventory" },
//                                     { title: "Type" },
//                                     { title: "Vendor" },
//                                     { title: "Actions" },
//                                 ]}
//                                 selectable
//                             >
//                                 {products.map((product, index) => (
//                                     <IndexTable.Row id={product.id} key={product.id} position={index}>
//                                         <IndexTable.Cell>
//                                             <Thumbnail source={product.featuredMedia} alt={product.title} size="small" />
//                                         </IndexTable.Cell>

//                                         <IndexTable.Cell>
//                                             <div
//                                                 style={{
//                                                     maxWidth: "200px", // Giới hạn chiều rộng của cột
//                                                     whiteSpace: "normal",
//                                                     overflow: "hidden",
//                                                     display: "-webkit-box",
//                                                     WebkitBoxOrient: "vertical",
//                                                     WebkitLineClamp: 2, // Giới hạn 2 dòng
//                                                     wordBreak: "break-word", // Đảm bảo chữ không bị tràn
//                                                 }}
//                                             >
//                                                 <Text fontWeight='500' as="span">
//                                                     {product.title}
//                                                 </Text>
//                                             </div>

//                                         </IndexTable.Cell>

//                                         <IndexTable.Cell>
//                                             {product.inventory > 0 ? (
//                                                 <Badge status="success">{product.inventory} in stock</Badge>
//                                             ) : (
//                                                 <Badge status="warning">Out of stock</Badge>
//                                             )}
//                                         </IndexTable.Cell>
//                                         <IndexTable.Cell>
//                                             <Text>{product.type || "N/A"}</Text>
//                                         </IndexTable.Cell>
//                                         <IndexTable.Cell>
//                                             <Text>{product.vendor || "Unknown"}</Text>
//                                         </IndexTable.Cell>
//                                         <IndexTable.Cell>
//                                             <Button primary onClick={() => navigate(`/app/product/detail/${product.id}`)}>
//                                                 View Details
//                                             </Button>
//                                         </IndexTable.Cell>
//                                     </IndexTable.Row>
//                                 ))}
//                             </IndexTable>
//                         </Card>
//                     </Layout.Section>
//                 </Layout>
//             </Page>
//         </AppProvider>
//     );
// }
