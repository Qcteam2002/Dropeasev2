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
      featuredMedia: product.featuredMedia || "https://via.placeholder.com/150"
    }));

    return json({ products: serializedProducts });
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

  // ✅ Trạng thái hiển thị Modal
  const [modalActive, setModalActive] = useState(false);

  // ✅ Trạng thái chọn checkbox
  const [optTitleDesc, setOptTitleDesc] = useState(true); // Checkbox 1
  const [optFeature, setOptFeature] = useState(true);     // Checkbox 2
  const [optReview, setOptReview] = useState(true);       // Checkbox 3

  // ✅ Sản phẩm đang được chọn để optimize
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Add resource state for IndexTable
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(products);

  // ✅ Tính toán tổng số trang
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // ✅ Lọc danh sách sản phẩm theo trang hiện tại
  const displayedProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    )
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
    if (!selectedProduct) return;

    setModalActive(false);
    setLoadingId(selectedProduct.id);

    try {
      let mode = "features";
      if (optTitleDesc && optFeature && optReview) mode = "both";
      else if (optReview && !optTitleDesc && !optFeature) mode = "reviews";

      console.log("🔄 Đang gọi optimizeProduct với mode:", mode);
      await optimizeProduct(selectedProduct, { mode });
      setToast({ active: true, message: "Product optimized successfully!" });
    } catch (error) {
      console.error("❌ Optimization error:", error);
      setToast({ active: true, message: "Error optimizing product: " + error.message });
    } finally {
      setLoadingId(null);
      setSelectedProduct(null);
    }
  };


  return (
    <AppProvider i18n={enTranslations}>
      <Frame>
        <Page title="Product List">
          <Layout>
            {/* 🔎 Thanh tìm kiếm */}
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

                      {/* 📦 Tồn kho */}
                      <IndexTable.Cell>
                        <Badge status="success">{product.inventory} in stock</Badge>
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
                            Optimize Product
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
                <Text>Page {currentPage} of {totalPages}</Text>
                <Button disabled={currentPage === totalPages} onClick={goToNextPage}>Next</Button>
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
              <div>
                <Checkbox
                  label="Optimize Product Review (with AI)"
                  checked={optReview}
                  onChange={(val) => setOptReview(val)}
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
