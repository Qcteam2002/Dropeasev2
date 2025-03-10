// ✅ Import các thư viện cần thiết
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
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { authenticate, getUser } from "../shopify.server"; // Xác thực Shopify Admin
import { getProducts } from "../models/PlatformProduct"; // API lấy danh sách sản phẩm

// ✅ Fetch danh sách sản phẩm từ database
export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const user = await getUser(request);
  const products = await getProducts(user.id);

  // Chuyển đổi BigInt thành String để tránh lỗi JSON
  const serializedProducts = products.map((product) => ({
    ...product,
    id: product.id.toString(),
    userId: product.userId.toString(),
    sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
    inventory: product.inventory || 0, // Nếu không có tồn kho thì đặt mặc định là 0
    descriptionHtml: product.descriptionHtml || "",
  }));

  return json({ products: serializedProducts });
};

// ✅ Component chính - Hiển thị danh sách sản phẩm
export default function ProductListPage() {
  const { products } = useLoaderData();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = useState("");
  const [toast, setToast] = useState({ active: false, message: "" });
  const [loadingId, setLoadingId] = useState(null);

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

  // ✅ Gọi API OpenAI để tối ưu sản phẩm
  const optimizeProduct = async (product) => {
    setLoadingId(product.id);

    try {
      const response = await fetch("http://localhost:5003/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          title: product.title,
          description: product.descriptionHtml || "No description available.",
        }),
      });

      if (!response.ok) throw new Error("API Error!");
      const data = await response.json();
      console.log("✅ OpenAI Data:", data);

      const saveResponse = await fetch("http://localhost:51070/api/save-optimized-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          optimizedTitle: data.optimizedTitle,
          optimizedDescription: data.optimizedDescription,
          gridView: data.gridView,
        }),
      });

      const saveResult = await saveResponse.json();
      console.log("✅ Saved to DB:", saveResult);

      if (!saveResponse.ok) throw new Error("Database save failed!");

      setToast({ active: true, message: "Product optimized successfully!" });
    } catch (error) {
      console.error("❌ Optimization error:", error);
      setToast({ active: true, message: "Error optimizing product!" });
    } finally {
      setLoadingId(null);
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
                  headings={[
                    { title: "Image" },
                    { title: "Product Name" },
                    { title: "Inventory" },
                    { title: "Actions" },
                  ]}
                  selectable
                >
                  {displayedProducts.map((product, index) => (
                    <IndexTable.Row id={product.id} key={product.id} position={index}>
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
                          <Button primary onClick={() => navigate(`/app/product/detail/${product.id}`)}>
                            View Details
                          </Button>
                          <Button loading={loadingId === product.id} onClick={() => optimizeProduct(product)}>
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

          {/* 🛎️ Hiển thị thông báo */}
          {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
        </Page>
      </Frame>
    </AppProvider>
  );
}


// // ✅ Import các thư viện cần thiết
// import { json } from "@remix-run/node"; // Xử lý dữ liệu JSON trên server
// import { useLoaderData, useNavigate } from "@remix-run/react"; // Hook lấy dữ liệu từ loader và điều hướng trang
// import React, { useState } from "react"; // Import React và hook useState
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
//     Toast,
//     Frame, // 🟢 Thêm Frame từ Polaris để quản lý UI
// } from "@shopify/polaris";
// import { authenticate, getUser } from "../shopify.server"; // Xác thực người dùng Shopify
// import enTranslations from "@shopify/polaris/locales/en.json"; // Ngôn ngữ UI
// import { getProducts } from "../models/PlatformProduct"; // Hàm lấy danh sách sản phẩm từ DB

// // ✅ Loader - Fetch danh sách sản phẩm từ DB
// export const loader = async ({ request }) => {
//     const { admin, session } = await authenticate.admin(request); // Xác thực admin Shopify
//     const user = await getUser(request); // Lấy thông tin người dùng
//     const products = await getProducts(user.id); // Lấy danh sách sản phẩm từ DB theo userId

//     // Chuyển đổi dữ liệu sản phẩm từ BigInt thành chuỗi để tránh lỗi JSON
//     const serializedProducts = products.map((product) => ({
//         ...product,
//         id: product.id.toString(),
//         userId: product.userId.toString(),
//         sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
//         inventory: product.inventory || 0, // Giá trị mặc định nếu inventory không có
//         descriptionHtml: product.descriptionHtml || "", // Tránh lỗi undefined
//     }));

//     return json({ products: serializedProducts }); // Trả về danh sách sản phẩm
// };

// // ✅ Component chính hiển thị danh sách sản phẩm
// export default function ProductListPage() {
//     const { products } = useLoaderData(); // Lấy danh sách sản phẩm từ loader
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10; // Số sản phẩm mỗi trang
//     const [searchValue, setSearchValue] = useState(""); // State tìm kiếm
//     const [toast, setToast] = useState({ active: false, message: "" }); // State thông báo toast
//     const [loadingId, setLoadingId] = useState(null); // State xác định sản phẩm nào đang loading
//     const navigate = useNavigate(); // Hook điều hướng trang
//     // Tính toán số trang
//     const totalPages = Math.ceil(products.length / itemsPerPage);

//     // Lọc danh sách sản phẩm dựa trên trang hiện tại
//     const displayedProducts = products.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     // Chuyển trang
//     const goToNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const goToPrevPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     // ✅ Hàm gửi request tối ưu hóa sản phẩm
//     const optimizeProduct = async (product) => {
//         setLoadingId(product.id); // Đánh dấu sản phẩm đang được tối ưu

//         try {
//             // Gọi API OpenAI để tối ưu hóa sản phẩm
//             const response = await fetch("http://localhost:5003/api/openai", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     id: product.id, // Truyền ID sản phẩm
//                     title: product.title,
//                     description: product.descriptionHtml || "No description available.",
//                 }),
//             });

//             if (!response.ok) throw new Error("API Error!");
//             const data = await response.json(); // Lấy dữ liệu từ API OpenAI
//             console.log("✅ Dữ liệu từ OpenAI:", data);

//             // Gửi API lưu dữ liệu tối ưu hóa vào MySQL
//             const saveResponse = await fetch("http://localhost:51070/api/save-optimized-product", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     id: product.id, // Truyền ID sản phẩm
//                     optimizedTitle: data.optimizedTitle,
//                     optimizedDescription: data.optimizedDescription,
//                     gridView: data.gridView,
//                 }),
//             });

//             const saveResult = await saveResponse.json();
//             console.log("✅ Kết quả lưu vào DB:", saveResult);

//             if (!saveResponse.ok) throw new Error("Lưu vào DB thất bại!");

//             setToast({ active: true, message: "Product optimized successfully!" });
//         } catch (error) {
//             console.error("❌ Lỗi khi tối ưu sản phẩm:", error);
//             setToast({ active: true, message: "Error optimizing product!" });
//         } finally {
//             setLoadingId(null); // Tắt trạng thái loading
//         }
//     };

//     return (
//         <AppProvider i18n={enTranslations}>
//             <Frame>
//                 <Page title="Product List">
//                     <Layout>
//                         {/* Thanh tìm kiếm */}
//                         <Layout.Section>
//                             <Card sectioned>
//                                 <TextField
//                                     placeholder="Search Product"
//                                     value={searchValue}
//                                     onChange={setSearchValue}
//                                     clearButton
//                                     onClearButtonClick={() => setSearchValue("")}
//                                 />
//                             </Card>
//                         </Layout.Section>

//                         {/* Bảng danh sách sản phẩm */}
//                         <Layout.Section>
//                             <Card>
//                                 <IndexTable
//                                     resourceName={{ singular: "product", plural: "products" }}
//                                     itemCount={displayedProducts.length}
//                                     headings={[
//                                         { title: "Image" },
//                                         { title: "Product Name" },
//                                         { title: "Inventory" },
//                                         { title: "Actions" },
//                                     ]}
//                                     selectable
//                                 >
//                                     {displayedProducts.map((product, index) => (
//                                         <IndexTable.Row id={product.id} key={product.id} position={index}>
//                                             {/* Hiển thị hình ảnh sản phẩm */}
//                                             <IndexTable.Cell>
//                                                 <Thumbnail source={product.featuredMedia || "https://via.placeholder.com/150"} alt={product.title} size="small" />
//                                             </IndexTable.Cell>

//                                             {/* Hiển thị tên sản phẩm */}
//                                             <IndexTable.Cell>
//                                                 <div
//                                                     style={{
//                                                         maxWidth: "200px",
//                                                         whiteSpace: "normal",
//                                                         overflow: "hidden",
//                                                         display: "-webkit-box",
//                                                         WebkitBoxOrient: "vertical",
//                                                         WebkitLineClamp: 2,
//                                                         wordBreak: "break-word",
//                                                     }}
//                                                 >
//                                                     <Text fontWeight="500" as="span">
//                                                         {product.title}
//                                                     </Text>
//                                                 </div>
//                                             </IndexTable.Cell>

//                                             {/* Hiển thị tồn kho */}
//                                             <IndexTable.Cell>
//                                                 <Badge status="success">{product.inventory} in stock</Badge>
//                                             </IndexTable.Cell>

//                                             {/* Hành động với sản phẩm */}
//                                             <IndexTable.Cell>
//                                                 <div style={{ display: "flex", gap: "10px" }}>
//                                                     <Button primary onClick={() => navigate(`/app/product/detail/${product.id}`)}>
//                                                         View Details
//                                                     </Button>
//                                                     <Button loading={loadingId === product.id} onClick={() => optimizeProduct(product)}>
//                                                         Product Optimize
//                                                     </Button>
//                                                 </div>
//                                             </IndexTable.Cell>
//                                         </IndexTable.Row>
//                                     ))}
//                                 </IndexTable>
//                             </Card>
//                             {/* Pagination Controls */}
//                             <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
//                                 <Button disabled={currentPage === 1} onClick={goToPrevPage}>Previous</Button>
//                                 <Text>Page {currentPage} of {totalPages}</Text>
//                                 <Button disabled={currentPage === totalPages} onClick={goToNextPage}>Next</Button>
//                             </div>
//                         </Layout.Section>
//                     </Layout>

//                     {/* Hiển thị Toast thông báo */}
//                     {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
//                 </Page>
//             </Frame>
//         </AppProvider>
//     );
// }



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
//     Toast,
//     Frame, // 🟢 Thêm Frame từ Polaris
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
//         inventory: product.inventory || 0,
//         descriptionHtml: product.descriptionHtml || "",
//     }));

//     return json({ products: serializedProducts });
// };

// export default function ProductListPage() {
//     const { products } = useLoaderData();
//     const [searchValue, setSearchValue] = useState("");
//     const [toast, setToast] = useState({ active: false, message: "" });
//     const [loadingId, setLoadingId] = useState(null);
//     const navigate = useNavigate();

//     // 🔹 Gửi request tối ưu hóa sản phẩm
//     const optimizeProduct = async (product) => {
//         setLoadingId(product.id); // 🔹 Hiển thị trạng thái loading

//         try {
//             const response = await fetch("http://localhost:5003/api/openai", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     id: product.id, // 🔹 Truyền thêm productId
//                     title: product.title,
//                     description: product.descriptionHtml || "No description available.",
//                 }),
//             });

//             if (!response.ok) throw new Error("API Error!");

//             const data = await response.json();
//             console.log("✅ Dữ liệu từ OpenAI:", data);

//             // 🔹 Gửi API lưu vào MySQL với productId
//             const saveResponse = await fetch("http://localhost:51070/api/save-optimized-product", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     id: product.id, // 🔹 Đảm bảo truyền productId
//                     optimizedTitle: data.optimizedTitle,
//                     optimizedDescription: data.optimizedDescription,
//                     gridView: data.gridView,
//                 }),
//             });

//             const saveResult = await saveResponse.json();
//             console.log("✅ Kết quả lưu vào DB:", saveResult);

//             if (!saveResponse.ok) throw new Error("Lưu vào DB thất bại!");

//             setToast({ active: true, message: "Product optimized successfully!" });
//         } catch (error) {
//             console.error("❌ Lỗi khi tối ưu sản phẩm:", error);
//             setToast({ active: true, message: "Error optimizing product!" });
//         } finally {
//             setLoadingId(null); // 🔹 Tắt trạng thái loading
//         }
//     };

//     return (
//         <AppProvider i18n={enTranslations}>
//             {/* 🟢 Bọc toàn bộ trong Frame để fix lỗi */}
//             <Frame>
//                 <Page title="Product List">
//                     <Layout>
//                         {/* Thanh tìm kiếm */}
//                         <Layout.Section>
//                             <Card sectioned>
//                                 <TextField
//                                     placeholder="Search Product"
//                                     value={searchValue}
//                                     onChange={setSearchValue}
//                                     clearButton
//                                     onClearButtonClick={() => setSearchValue("")}
//                                 />
//                             </Card>
//                         </Layout.Section>

//                         {/* Bảng sản phẩm */}
//                         <Layout.Section>
//                             <Card>
//                                 <IndexTable
//                                     resourceName={{ singular: "product", plural: "products" }}
//                                     itemCount={products.length}
//                                     headings={[
//                                         { title: "Image" },
//                                         { title: "Product Name" },
//                                         { title: "Inventory" },
//                                         { title: "Actions" },
//                                     ]}
//                                     selectable
//                                 >
//                                     {products.map((product, index) => (
//                                         <IndexTable.Row id={product.id} key={product.id} position={index}>
//                                             <IndexTable.Cell>
//                                                 <Thumbnail source={product.featuredMedia || "https://via.placeholder.com/150"} alt={product.title} size="small" />
//                                             </IndexTable.Cell>

//                                             <IndexTable.Cell>
//                                                 <div
//                                                     style={{
//                                                         maxWidth: "200px",
//                                                         whiteSpace: "normal",
//                                                         overflow: "hidden",
//                                                         display: "-webkit-box",
//                                                         WebkitBoxOrient: "vertical",
//                                                         WebkitLineClamp: 2,
//                                                         wordBreak: "break-word",
//                                                     }}
//                                                 >
//                                                     <Text fontWeight="500" as="span">
//                                                         {product.title}
//                                                     </Text>
//                                                 </div>
//                                             </IndexTable.Cell>

//                                             <IndexTable.Cell>
//                                                 <Badge status="success">{product.inventory} in stock</Badge>
//                                             </IndexTable.Cell>

//                                             <IndexTable.Cell>
//                                                 <div style={{ display: "flex", gap: "10px" }}>
//                                                     <Button primary onClick={() => navigate(`/app/product/detail/${product.id}`)}>
//                                                         View Details
//                                                     </Button>
//                                                     <Button loading={loadingId === product.id} onClick={() => optimizeProduct(product)}>
//                                                         Product Optimize
//                                                     </Button>
//                                                 </div>
//                                             </IndexTable.Cell>
//                                         </IndexTable.Row>
//                                     ))}
//                                 </IndexTable>
//                             </Card>
//                         </Layout.Section>
//                     </Layout>

//                     {/* 🟢 Hiển thị Toast thông báo trong Frame */}
//                     {toast.active && <Toast content={toast.message} onDismiss={() => setToast({ active: false })} />}
//                 </Page>
//             </Frame>
//         </AppProvider>
//     );
// }





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
