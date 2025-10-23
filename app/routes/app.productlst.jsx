import { json } from "@remix-run/node"; // Xử lý JSON server-side
import { useLoaderData, useNavigate } from "@remix-run/react"; // Hook dữ liệu Remix
import React, { useState } from "react"; // React Hook
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
  Frame, // UI Framework mới của Polaris 2025
  Modal,
  Checkbox,
  useIndexResourceState,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { authenticate, getUser } from "../shopify.server"; // Xác thực Shopify Admin
import { getProducts } from "../models/PlatformProduct"; // API lấy danh sách sản phẩm
import { optimizeProduct } from "../server/services/optimizeProduct"; // API tối ưu hóa sản phẩm
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Fetch danh sách sản phẩm từ database
export const loader = async ({ request }) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);

    // Kiểm tra user tồn tại
    if (!user) {
      console.error("User not found");
      return json({ products: [] });
    }

    // Lấy danh sách sản phẩm
    let products = [];
    try {
      products = await getProducts(user.id);

      // Fetch fresh data from Shopify for each product
      // This ensures we always show latest title/description
      const shopifyProductsMap = {};
      
      try {
        // Build query to fetch multiple products at once
        const productIds = products
          .filter(p => p.platformId)
          .map(p => {
            const id = p.platformId.includes('gid://shopify/Product/') 
              ? p.platformId 
              : `gid://shopify/Product/${p.platformId}`;
            return id;
          });

        if (productIds.length > 0) {
          // Fetch products in batches to avoid query limits
          const batchSize = 10;
          for (let i = 0; i < productIds.length; i += batchSize) {
            const batch = productIds.slice(i, i + batchSize);
            
            // Build dynamic query for this batch
            const queries = batch.map((id, idx) => `
              product${idx}: product(id: "${id}") {
                id
                title
                descriptionHtml
                featuredImage {
                  url
                }
              }
            `).join('\n');

            const batchQuery = `query { ${queries} }`;
            
            const response = await admin.graphql(batchQuery);
            const { data } = await response.json();
            
            if (data) {
              Object.entries(data).forEach(([key, product]) => {
                if (product) {
                  shopifyProductsMap[product.id] = {
                    title: product.title,
                    descriptionHtml: product.descriptionHtml,
                    featuredMedia: product.featuredImage?.url
                  };
                }
              });
            }
          }
        }
      } catch (shopifyError) {
        console.error("Error fetching from Shopify:", shopifyError);
        // Continue with DB data if Shopify fetch fails
      }

      // Lấy thông tin tối ưu từ database
      const optimizedProducts = await prisma.productsOptimized.findMany({
        where: {
          productId: {
            in: products.map(product => BigInt(product.id))
          }
        },
        select: {
          productId: true,
          isOptimized: true,
          optimizedAt: true
        }
      });

      // Tạo map để dễ dàng tìm kiếm
      const optimizedMap = {};
      optimizedProducts.forEach(item => {
        optimizedMap[item.productId.toString()] = {
          isOptimized: item.isOptimized,
          optimizedAt: item.optimizedAt
        };
      });

      // Kết hợp thông tin tối ưu và Shopify data vào danh sách sản phẩm
      products = products.map(product => {
        const shopifyProductId = product.platformId.includes('gid://shopify/Product/') 
          ? product.platformId 
          : `gid://shopify/Product/${product.platformId}`;
        
        const shopifyData = shopifyProductsMap[shopifyProductId];
        
        return {
          ...product,
          // ✅ Prioritize Shopify data over DB data
          title: shopifyData?.title || product.title,
          descriptionHtml: shopifyData?.descriptionHtml || product.descriptionHtml,
          featuredMedia: shopifyData?.featuredMedia || product.featuredMedia,
          isOptimized: optimizedMap[product.id]?.isOptimized || false,
          optimizedAt: optimizedMap[product.id]?.optimizedAt || null
        };
      });

    } catch (error) {
      console.error("Error fetching products:", error);
      return json({ products: [] });
    }

    // Chuyển đổi BigInt thành String, xử lý null/undefined
    const serializedProducts = products.map((product) => ({
      ...product,
      id: product.id?.toString() || "",
      userId: product.userId?.toString() || "",
      sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
      inventory: product.inventory || 0,
      descriptionHtml: product.descriptionHtml || "",
      title: product.title || "Untitled Product",
      featuredMedia: product.featuredMedia || "https://via.placeholder.com/150",
      optimizedAt: product.optimizedAt ? product.optimizedAt.toISOString() : null
    }));

    return json(
      { products: serializedProducts },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("Loader error:", error);
    return json({ products: [] });
  }
};

// ✅ Component chính - Hiển thị danh sách sản phẩm
export default function ProductListPage() {
  const { products = [] } = useLoaderData();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");
  const [toast, setToast] = useState({ active: false, message: "" });
  const [loadingId, setLoadingId] = useState(null);
  const [filterType, setFilterType] = useState("all"); // all, optimized, non-optimized

  // ✅ Trạng thái hiển thị Modal
  const [modalActive, setModalActive] = useState(false);

  // ✅ Trạng thái chọn checkbox
  const [optTitleDesc, setOptTitleDesc] = useState(true); // Checkbox 1
  const [optFeature, setOptFeature] = useState(true);     // Checkbox 2
  const [optReview, setOptReview] = useState(true);       // Checkbox 3
  const [optImage, setOptImage] = useState(true);         // Checkbox 4

  // ✅ Sản phẩm đang được chọn để optimize
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Add resource state for IndexTable
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(products);

  // ✅ Lọc danh sách sản phẩm theo trang hiện tại và trạng thái optimization
  const filteredProducts = products
    .filter((product) => {
      // Filter by search text
      const matchesSearch = product.title.toLowerCase().includes(searchValue.toLowerCase());
      
      // Filter by optimization status
      const matchesFilter = 
        filterType === "all" || 
        (filterType === "optimized" && product.isOptimized) || 
        (filterType === "non-optimized" && !product.isOptimized);
      
      return matchesSearch && matchesFilter;
    });

  // ✅ Tính toán tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // ✅ Lấy sản phẩm cho trang hiện tại
  const displayedProducts = filteredProducts
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // ✅ Điều hướng trang
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // ✅ Hàm xử lý tối ưu hóa sản phẩm
  const handleOptimizeProduct = async (product) => {
    setLoadingId(product.id);

    try {
      console.log("🔄 Đang gọi optimizeProduct cho sản phẩm:", product.id);
      await optimizeProduct(product); // Gọi hàm optimizeProduct từ optimizeProduct.js
      setToast({ active: true, message: "Product optimized successfully!" });
    } catch (error) {
      console.error("❌ Optimization error:", error);
      setToast({ active: true, message: "Error optimizing product: " + error.message });
    } finally {
      setLoadingId(null);
    }
  };

  //Hàm mở Modal khi click nút
  const openOptimizeModal = (product) => {
    setSelectedProduct(product);
    setModalActive(true);
  };

  const confirmOptimize = async () => {
    if (!selectedProduct) {
      setToast({ active: true, message: "Please select a product" });
      return;
    }

    try {
      // Xác định mode dựa trên các options được chọn
      const mode = optTitleDesc && optFeature && optReview ? "both" : "custom";
      
      // Gọi API optimize product
      const optimizationResult = await optimizeProduct(selectedProduct, { 
        mode,
        optImage,
        optTitleDesc,
        optFeature,
        optReview
      });
      
      // Lưu ý: optimizeProduct function cần cập nhật để lưu trạng thái isOptimized
      // Hoặc bạn có thể thêm một API call riêng ở đây để cập nhật
      
      setToast({ active: true, message: "Product optimized successfully" });
      setModalActive(false);
      setSelectedProduct(null);
      setOptTitleDesc(true);
      setOptFeature(true);
      setOptReview(true);
      setOptImage(true);
      
      // Refresh trang sau khi tối ưu để hiển thị trạng thái mới
      window.location.reload();
      
    } catch (error) {
      console.error("Error optimizing product:", error);
      setToast({ active: true, message: "Failed to optimize product" });
    }
  };


  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <Page title="Product List">
          <Layout>
            {/* 🔎 Thanh tìm kiếm và bộ lọc */}
            <Layout.Section>
              <Card sectioned>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <TextField
                      placeholder="Search Product"
                      value={searchValue}
                      onChange={setSearchValue}
                      clearButton
                      onClearButtonClick={() => setSearchValue("")}
                    />
                  </div>
                  <div>
                    <Button 
                      onClick={() => setFilterType("all")} 
                      pressed={filterType === "all"}
                    >
                      All
                    </Button>
                    <Button 
                      onClick={() => setFilterType("optimized")} 
                      pressed={filterType === "optimized"}
                    >
                      Optimized
                    </Button>
                    <Button 
                      onClick={() => setFilterType("non-optimized")} 
                      pressed={filterType === "non-optimized"}
                    >
                      Non-Optimized
                    </Button>
                  </div>
                </div>
              </Card>
            </Layout.Section>

            {/* 🏷️ Danh sách sản phẩm */}
            <Layout.Section>
              <Card>
                <IndexTable
                  resourceName={{ singular: "product", plural: "products" }}
                  itemCount={displayedProducts.length}
                  selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
                  onSelectionChange={handleSelectionChange}
                  headings={[
                    { title: "Image" },
                    { title: "Product Name" },
                    { title: "Status" },
                    { title: "Inventory" },
                    { title: "Actions" },
                  ]}
                  selectable
                >
                  {displayedProducts.map((product, index) => (
                    <IndexTable.Row 
                      id={product.id} 
                      key={product.id} 
                      position={index}
                      selected={selectedResources.includes(product.id)}
                      onClick={() => navigate(`/app/product/detail/${product.id}`)}
                    >
                      {/* 🖼️ Ảnh sản phẩm */}
                      <IndexTable.Cell>
                        <Thumbnail
                          source={product.featuredMedia || "https://via.placeholder.com/150"}
                          alt={product.title}
                          size="small"
                        />
                      </IndexTable.Cell>

                      {/* 🏷️ Tên sản phẩm */}
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

                      {/* 🔄 Trạng thái tối ưu hóa */}
                      <IndexTable.Cell>
                        {product.isOptimized ? (
                          <Badge tone="success">Optimized</Badge>
                        ) : (
                          <Badge>Non-Optimized</Badge>
                        )}
                      </IndexTable.Cell>

                      {/* 📦 Tồn kho */}
                      <IndexTable.Cell>
                        <Badge status="attention">{product.inventory} in stock</Badge>
                      </IndexTable.Cell>

                      {/* 🎯 Hành động */}
                      <IndexTable.Cell>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Button 
                            primary 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/app/product/detail/${product.id}`);
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            loading={loadingId === product.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              openOptimizeModal(product);
                            }}
                          >
                            {product.isOptimized ? "Re-Optimize" : "Optimize"}
                          </Button>
                        </div>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  ))}
                </IndexTable>
              </Card>

              {/* 📄 Điều hướng phân trang */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
                <Button disabled={currentPage === 1} onClick={goToPrevPage}>Previous</Button>
                <Text>Page {currentPage} of {totalPages || 1}</Text>
                <Button disabled={currentPage === totalPages || totalPages === 0} onClick={goToNextPage}>Next</Button>
              </div>
            </Layout.Section>
          </Layout>

          <Modal
            open={modalActive}
            onClose={() => setModalActive(false)}
            title="Optimize Product Content"
            primaryAction={{
              content: "Confirm",
              onAction: confirmOptimize,
            }}
            secondaryActions={[
              {
                content: "Cancel",
                onAction: () => setModalActive(false),
              },
            ]}
          >
            <Modal.Section>
              <div style={{ marginBottom: 10 }}>
                <Checkbox
                  label="Optimize Title/Description"
                  checked={optTitleDesc}
                  onChange={(val) => setOptTitleDesc(val)}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Checkbox
                  label="Optimize Feature Highlights"
                  checked={optFeature}
                  onChange={(val) => setOptFeature(val)}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Checkbox
                  label="Optimize Product Review (with AI)"
                  checked={optReview}
                  onChange={(val) => setOptReview(val)}
                />
              </div>
              <div>
                <Checkbox
                  label="Optimize Product Image"
                  checked={optImage}
                  onChange={(val) => setOptImage(val)}
                />
              </div>
            </Modal.Section>
          </Modal>


          {/* 🛎️ Hiển thị thông báo */}
          {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
        </Page>
      </Frame>
    </AppProvider>
  );
}


// // ✅ Import các thư viện cần thiết
// import { json } from "@remix-run/node"; // Xử lý JSON server-side
// import { useLoaderData, useNavigate } from "@remix-run/react"; // Hook dữ liệu Remix
// import React, { useState } from "react"; // React Hook
// import {
//   AppProvider,
//   Page,
//   Layout,
//   Card,
//   TextField,
//   IndexTable,
//   Text,
//   Badge,
//   Button,
//   Thumbnail,
//   Toast,
//   Frame, // UI Framework mới của Polaris 2025
// } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import { authenticate, getUser } from "../shopify.server"; // Xác thực Shopify Admin
// import { getProducts } from "../models/PlatformProduct"; // API lấy danh sách sản phẩm

// // ✅ Fetch danh sách sản phẩm từ database
// export const loader = async ({ request }) => {
//   const { admin, session } = await authenticate.admin(request);
//   const user = await getUser(request);
//   const products = await getProducts(user.id);

//   // Chuyển đổi BigInt thành String để tránh lỗi JSON
//   const serializedProducts = products.map((product) => ({
//     ...product,
//     id: product.id.toString(),
//     userId: product.userId.toString(),
//     sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
//     inventory: product.inventory || 0, // Nếu không có tồn kho thì đặt mặc định là 0
//     descriptionHtml: product.descriptionHtml || "",
//   }));

//   return json({ products: serializedProducts });
// };

// // ✅ Component chính - Hiển thị danh sách sản phẩm
// export default function ProductListPage() {
//   const { products } = useLoaderData();
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const [searchValue, setSearchValue] = useState("");
//   const [toast, setToast] = useState({ active: false, message: "" });
//   const [loadingId, setLoadingId] = useState(null);

//   // ✅ Tính toán tổng số trang
//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   // ✅ Lọc danh sách sản phẩm theo trang hiện tại
//   const displayedProducts = products
//     .filter((product) =>
//       product.title.toLowerCase().includes(searchValue.toLowerCase())
//     )
//     .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   // ✅ Điều hướng trang
//   const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };
//   const goToPrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // ✅ Hàm loại bỏ tất cả thẻ HTML và giữ nội dung văn bản
//   const stripHtml = (html) => {
//     return html.replace(/<[^>]*>?/gm, "").trim(); // Xóa tất cả các thẻ HTML
//   };

//   // ✅ Gọi API OpenAI để tối ưu sản phẩm
//   const optimizeProduct = async (product) => {
//     setLoadingId(product.id);

//     try {
//       console.log("🔄 Đang gửi yêu cầu tối ưu hóa sản phẩm:", product.id);
//       const cleanDescription = stripHtml(product.descriptionHtml || "No description available."); // 🟢 Làm sạch HTML

//       const response = await fetch("http://localhost:5003/api/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id: product.id,
//           title: product.title,
//           description: cleanDescription || "No description available.",
//         }),
//       });

//       if (!response.ok) throw new Error("API Error!");
//       const data = await response.json();
//       console.log("✅ OpenAI Data:", data);

//       const saveResponse = await fetch("http://localhost:51070/api/save-optimized-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           id: product.id,
//           optimizedTitle: data.optimizedTitle,
//           optimizedDescription: data.optimizedDescription,
//           gridView: data.gridView,
//         }),
//       });

//       const saveResult = await saveResponse.json();
//       console.log("✅ Saved to DB:", saveResult);

//       if (!saveResponse.ok) throw new Error("Database save failed!");

//       setToast({ active: true, message: "Product optimized successfully!" });
//     } catch (error) {
//       console.error("❌ Optimization error:", error);
//       setToast({ active: true, message: "Error optimizing product!" });
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   return (
//     <AppProvider i18n={enTranslations}>
//       <Frame>
//         <Page title="Product List">
//           <Layout>
//             {/* 🔎 Thanh tìm kiếm */}
//             <Layout.Section>
//               <Card sectioned>
//                 <TextField
//                   placeholder="Search Product"
//                   value={searchValue}
//                   onChange={setSearchValue}
//                   clearButton
//                   onClearButtonClick={() => setSearchValue("")}
//                 />
//               </Card>
//             </Layout.Section>

//             {/* 🏷️ Danh sách sản phẩm */}
//             <Layout.Section>
//               <Card>
//                 <IndexTable
//                   resourceName={{ singular: "product", plural: "products" }}
//                   itemCount={displayedProducts.length}
//                   headings={[
//                     { title: "Image" },
//                     { title: "Product Name" },
//                     { title: "Inventory" },
//                     { title: "Actions" },
//                   ]}
//                   selectable
//                 >
//                   {displayedProducts.map((product, index) => (
//                     <IndexTable.Row id={product.id} key={product.id} position={index}>
//                       {/* 🖼️ Ảnh sản phẩm */}
//                       <IndexTable.Cell>
//                         <Thumbnail
//                           source={product.featuredMedia || "https://via.placeholder.com/150"}
//                           alt={product.title}
//                           size="small"
//                         />
//                       </IndexTable.Cell>

//                       {/* 🏷️ Tên sản phẩm */}
//                       <IndexTable.Cell>
//                         <div
//                           style={{
//                             maxWidth: "200px",
//                             whiteSpace: "normal",
//                             overflow: "hidden",
//                             display: "-webkit-box",
//                             WebkitBoxOrient: "vertical",
//                             WebkitLineClamp: 2,
//                             wordBreak: "break-word",
//                           }}
//                         >
//                           <Text fontWeight="500" as="span">
//                             {product.title}
//                           </Text>
//                         </div>
//                       </IndexTable.Cell>

//                       {/* 📦 Tồn kho */}
//                       <IndexTable.Cell>
//                         <Badge status="success">{product.inventory} in stock</Badge>
//                       </IndexTable.Cell>

//                       {/* 🎯 Hành động */}
//                       <IndexTable.Cell>
//                         <div style={{ display: "flex", gap: "10px" }}>
//                           <Button primary onClick={() => navigate(`/app/product/detail/${product.id}`)}>
//                             View Details
//                           </Button>
//                           <Button loading={loadingId === product.id} onClick={() => optimizeProduct(product)}>
//                             Optimize Product
//                           </Button>
//                         </div>
//                       </IndexTable.Cell>
//                     </IndexTable.Row>
//                   ))}
//                 </IndexTable>
//               </Card>

//               {/* 📄 Điều hướng phân trang */}
//               <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
//                 <Button disabled={currentPage === 1} onClick={goToPrevPage}>Previous</Button>
//                 <Text>Page {currentPage} of {totalPages}</Text>
//                 <Button disabled={currentPage === totalPages} onClick={goToNextPage}>Next</Button>
//               </div>
//             </Layout.Section>
//           </Layout>

//           {/* 🛎️ Hiển thị thông báo */}
//           {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
//         </Page>
//       </Frame>
//     </AppProvider>
//   );
// }
