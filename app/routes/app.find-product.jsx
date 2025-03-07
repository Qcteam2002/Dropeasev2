import React, { useState, useEffect } from "react"; // Import React Hooks
import {
  Page,
  Layout,
  Card,
  TextField,
  Grid,
  Badge,
  Text,
  Tooltip,
  //Icon,
} from "@shopify/polaris";
//import { LogoTiktokIcon, StarFilledIcon } from "@shopify/polaris-icons";
import { useNavigate } from "@remix-run/react"; // Hook để điều hướng giữa các route


// Component ProductBadge - Badge TikTok chuyển đổi nội dung tự động
function ProductBadge({ product }) {
  const [currentContent, setCurrentContent] = useState("");
  const badgeContent = [
    `Likes: ${product.likes}`,
    `Comments: ${product.comments}`,
    `Shares: ${product.shares}`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * badgeContent.length);
      setCurrentContent(badgeContent[randomIndex]);
    }, 2000);
    setCurrentContent(badgeContent[0]); // Set initial content
    return () => clearInterval(interval);
  }, [product]);


  return (
    <div
      style={{
        width: "134px",
        height: "31px",
        display: "flex",
        alignItems: "center",
        //justifyContent: "center",
        gap: "4px",
        padding: "2px 6px",
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        borderRadius: "0px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        position: "absolute",
        top: "180px",
        left: "0px",
        zIndex: "2",
      }}
    >
      <img 
        src="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338429_1280.png"
        alt="TikTok"
        style={{ borderRadius: "20px",width: "20px", height: "20px" }} // Icon TikTok
      />
      <span style={{ fontSize: "12px", fontWeight: "bold" }}>{currentContent}</span>
    </div>
  );
}

// Component FindProduct
export default function FindProduct() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng khi click


  const products = [
    {
      id: 1,
      image:
        "https://img.kwcdn.com/product/fancy/df46fe8c-f2e7-4675-9435-822cd61d698e.jpg?imageView2/2/w/800/q/70/format/webp",
      video: "https://goods-vod.kwcdn.com/goods-video/760fedbf5ebf8ecee384dfad0e5916d27e3b882c.f30.mp4", // Thêm video URL
      title: "Titanic Ship Model Decoration Air Humidifier 250ml Essential Oil Diffuser Jellyfish Smoke Ring Spray Aroma Diffuser For Home",
      description: [
        "https://ae01.alicdn.com/kf/S7c53a7aa4f5b4b1c8487dc6eeb980f15U.jpg",
        "https://ae01.alicdn.com/kf/S2cefe9e39bb64f59b27857f274556c624.jpg",
        "https://ae01.alicdn.com/kf/Sf7982547ae3540ea994fa89facbcf1ebR.jpg",
        "https://ae01.alicdn.com/kf/Sfca169e37c284fee807f65b6792fb2797.jpg"
      ],      
      price: "$100",
      oldPrice: "$150",
      estProfit: "$30",
      rating: 4.7,
      likes: "10K",
      comments: "10K",
      shares: "10K",
      stars: "(2000)",
    },
    {
      id: 2,
      image:
        "https://img.kwcdn.com/product/fancy/aceb0577-cd53-4744-b8b7-5486a38fea19.jpg?imageView2/2/w/800/q/70/format/webp",
      video: "https://goods-vod.kwcdn.com/goods-video/24837a160ba2ad9733f210ab6af9f93a1cc63cab.f30.mp4", // Thêm video URL
      title: "Men's Athletic Sneakers - Striped/Solid",
      price: "$21.42",
      oldPrice: "$39.14",
      estProfit: "$30",
      rating: 4.7,
      likes: "10K",
      comments: "10K",
      shares: "10K",
      stars: "(2000)",
    },
    {
      id: 3,
      image:
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/c312b928bc8ed6d1ef1dd278b9fae51a.jpg?imageView2/2/w/800/q/70/format/webp",
      video: "https://goods-vod.kwcdn.com/goods-video/9d419dda0447f6b4a4b7edac65f71541137fee03.f30.mp4", // Thêm video URL
      title: "Men'S Fashion Street Style Colorful",
      price: "$19.42",
      oldPrice: "$101.14",
      estProfit: "$30",
      rating: 4.7,
      likes: "10K",
      comments: "10K",
      shares: "10K",
      stars: "(2000)",
    },
    {
      id: 4,
      image:
        "https://img.kwcdn.com/product/fancy/0b83ac7d-6933-47a4-9581-f456668e514a.jpg?imageView2/2/w/800/q/70/format/webp",
      video: "https://goods-vod.kwcdn.com/goods-video/d50081c78ac9eefef9feea3285a4ed59899d1ab9.f30.mp4", // Thêm video URL
      title: "Plus Size Men's Chunky Sneakers",
      price: "$26.03",
      oldPrice: "$44.80",
      estProfit: "$30",
      rating: 4.7,
      likes: "10K",
      comments: "10K",
      shares: "10K",
      stars: "(2000)",
    },
    {
      id: 5,
      image:
        "https://img.kwcdn.com/product/fancy/bf2b1b31-50fd-45da-b784-e8b36af3c2a0.jpg?imageView2/2/w/800/q/70/format/webp",
      video: "https://goods-vod.kwcdn.com/goods-video/4539a92cf54ada6b5f6dcd928c63ea7f56902e7d.f30.mp4", // Thêm video URL
      title: "Men's Fashion Street Style Low-Top Sneakers",
      price: "$46.03",
      oldPrice: "$104.80",
      estProfit: "$30",
      rating: 4.7,
      likes: "10K",
      comments: "10K",
      shares: "10K",
      stars: "(2000)",
    },
    {
      id: 6,
      image:
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/5c6062cd347d2525dada8ea42adce9c7.jpg?imageView2/2/w/800/q/70/format/webp",
      video: "https://goods-vod.kwcdn.com/goods-video/cebb8b9ecf9b747adae7051aa90e679a954ec343.f30.mp4", // Thêm video URL
      title: "Boys Casual Solid Color Breathable",
      price: "$46.03",
      oldPrice: "$104.80",
      estProfit: "$30",
      rating: 4.7,
      likes: "10K",
      comments: "10K",
      shares: "10K",
      stars: "(2000)",
    },
    {
      id: 1,
      image:
        "https://img.kwcdn.com/product/fancy/df46fe8c-f2e7-4675-9435-822cd61d698e.jpg?imageView2/2/w/800/q/70/format/webp",
      video: "https://goods-vod.kwcdn.com/goods-video/760fedbf5ebf8ecee384dfad0e5916d27e3b882c.f30.mp4", // Thêm video URL
      title: "Nike New Dunk Low Men's White",
      price: "$100",
      oldPrice: "$150",
      estProfit: "$30",
      rating: 4.7,
      likes: "10K",
      comments: "10K",
      shares: "10K",
      stars: "(2000)",
    },
    {
      id: 2,
      image:
        "https://img.kwcdn.com/product/fancy/aceb0577-cd53-4744-b8b7-5486a38fea19.jpg?imageView2/2/w/800/q/70/format/webp",
      video: "https://goods-vod.kwcdn.com/goods-video/24837a160ba2ad9733f210ab6af9f93a1cc63cab.f30.mp4", // Thêm video URL
      title: "Men's Athletic Sneakers - Striped/Solid",
      price: "$21.42",
      oldPrice: "$39.14",
      estProfit: "$30",
      rating: 4.7,
      likes: "10K",
      comments: "10K",
      shares: "10K",
      stars: "(2000)",
    },
  ];

  const handleSearchChange = (value) => setSearchValue(value);

  return (
    <Page title="Find Product">
      <Layout>
        {/* Thanh tìm kiếm */}
        <Layout.Section>
          <Card sectioned>
            <TextField
              placeholder="Search Product"
              value={searchValue}
              onChange={handleSearchChange}
              clearButton
              onClearButtonClick={() => setSearchValue("")}
            />
            <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
              <Badge>New Product</Badge>
              <Badge>Hot Product TikTok</Badge>
              <Badge>Top Product</Badge>
              <Badge>Fast Shipping</Badge>
            </div>
          </Card>
        </Layout.Section>

        {/* Lưới sản phẩm */}
        <Layout.Section>
          <Grid>
            {products.map((product) => (
              <Grid.Cell
                key={product.id}
                columnSpan={{ xs: 6, sm: 5, md: 4 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Card>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      position: "relative",
                    }}
                      onClick={() => navigate(`/app/products/${product.id}`)} // Điều hướng tới trang product detail khi click
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    {/* Badge TikTok */}
                    <ProductBadge product={product} />

                    {/* Hình ảnh và Video */}
                    <HoverImageVideo product={product} />

                    {/* Nội dung sản phẩm */}
                    <div style={{ paddingTop: "12px" }}>
                      <Tooltip content={product.title}>
                        <Text as="h6" variant="headingMd" truncate>
                          {product.title}
                        </Text>
                      </Tooltip>
                      
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ fontWeight: "500" }}>{product.rating}</span>
                        <span style={{ color: "black", fontSize: "16px" }}>★</span>
                        <span style={{ fontSize: "12px", color: "#6D6D6D" }}>{product.stars}</span>
                      </div>
                      <div style={{
                          marginTop: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px", }}>
                        <Text as="span" variant="headingLg" fontWeight="bold">
                          {product.price}
                        </Text>
                        <Text
                          as="span"
                          variant="bodySm"
                          style={{ marginleft: "12px", textDecoration: "line-through", color: "#6D6D6D" }}
                        >
                          <span style={{ color: "#6D6D6D" ,paddingLeft: "8px", fontWeight: "500", margin: "0", padding: "0", textDecoration: "line-through",}}>{product.oldPrice}</span> 
                        </Text>
                      </div>
                      <div style={{ marginTop: "12px" }}>
                        <Text variant="bodySm">
                          Est Profit: <strong>{product.estProfit}</strong>
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </Grid.Cell>
            ))}
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

// Component HoverImageVideo
function HoverImageVideo({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative", height: "214px", borderRadius: "8px", overflow: "hidden" }}
    >
      {/* Hình ảnh mặc định */}
      {!isHovered && (
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {/* Video khi hover */}
      {isHovered && (
        <video
          src={product.video}
          autoPlay
          muted
          loop
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
}



////===========Ver 2
// import React, { useState, useEffect } from "react"; // Import thêm useEffect
// import {
//   Page,
//   Layout,
//   Card,
//   TextField,
//   Grid,
//   Badge,
//   Thumbnail,
//   Image,
//   Text,
//   Icon,
// } from "@shopify/polaris";
// import { LogoTiktokIcon,StarFilledIcon, ArrowDownIcon, AtmWithdrawalIcon, BarcodeIcon } from "@shopify/polaris-icons";

// // Component ProductBadge - Badge TikTok chuyển đổi nội dung tự động
// function ProductBadge({ product }) {
//   const [currentContent, setCurrentContent] = useState(""); // State quản lý nội dung hiển thị

//   // Danh sách nội dung badge
//   const badgeContent = [
//     `Likes: ${product.likes}`,
//     `Comments: ${product.comments}`,
//     `Shares: ${product.shares}`,
//   ];

//   useEffect(() => {
//     // Random và đổi nội dung badge mỗi 3 giây
//     const interval = setInterval(() => {
//       const randomIndex = Math.floor(Math.random() * badgeContent.length);
//       setCurrentContent(badgeContent[randomIndex]);
//     }, 2000); // 3 giây

//     setCurrentContent(badgeContent[0]); // Khởi chạy ban đầu

//     return () => clearInterval(interval); // Xóa interval khi unmount
//   }, [product]);

//   return (
//     <div
//       style={{
//         width: "134px",
//         height: "31px",
//         display: "flex",
//         alignItems: "center",
//         //justifyContent: "center",
//         gap: "4px",
//         padding: "2px 6px",
//         backgroundColor: "rgba(255, 255, 255, 0.98)",
//         borderRadius: "0px",
//         boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
//         position: "absolute",
//         top: "180px",
//         left: "0px",
//         zIndex: "2",
//       }}
//     >
//       <img 
//         src="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338429_1280.png"
//         alt="TikTok"
//         style={{ borderRadius: "20px",width: "20px", height: "20px" }} // Icon TikTok
//       />
//       <span style={{ fontSize: "12px", fontWeight: "bold" }}>{currentContent}</span>
//     </div>
//   );
// }

// // Component FindProduct
// export default function FindProduct() {
//   const [searchValue, setSearchValue] = useState("");

//   const products = [
//     {
//       id: 1,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike New Dunk Low Men's White",
//       price: "$100",
//       oldPrice: "$150",
//       estProfit: "$30",
//       rating: 4.7,
//       likes: "10K",
//       comments: "10K",
//       shares: "10K",
//       stars: "(2000)",
//     },
//     {
//       id: 2,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Sf0ec05f0722f4949952d1443e8a39b4c2.jpg_960x960q75.jpg_.avif",
//       title: "Adidas Performance Shoe",
//       price: "$120",
//       oldPrice: "$170",
//       estProfit: "$40",
//       rating: 4.8,
//       likes: "8K",
//       comments: "5K",
//       shares: "7K",
//       stars: "(2000)",
//     },
//     {
//       id: 3,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike Running Shoes",
//       price: "$110",
//       oldPrice: "$160",
//       estProfit: "$35",
//       rating: 4.6,
//       likes: "12K",
//       comments: "8K",
//       shares: "6K",
//       stars: "(2000)",
//     },
//     {
//       id: 1,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike New Dunk Low Men's White",
//       price: "$100",
//       oldPrice: "$150",
//       estProfit: "$30",
//       rating: 4.7,
//       likes: "10K",
//       comments: "10K",
//       shares: "10K",
//       stars: "(2000)",
//     },
//     {
//       id: 1,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike New Dunk Low Men's White",
//       price: "$100",
//       oldPrice: "$150",
//       estProfit: "$30",
//       rating: 4.7,
//       likes: "10K",
//       comments: "10K",
//       shares: "10K",
//       stars: "(2000)",
//     },
//     {
//       id: 1,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike New Dunk Low Men's White",
//       price: "$100",
//       oldPrice: "$150",
//       estProfit: "$30",
//       rating: 4.7,
//       likes: "10K",
//       comments: "10K",
//       shares: "10K",
//       stars: "(2000)",
//     },
//     {
//       id: 1,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike New Dunk Low Men's White",
//       price: "$100",
//       oldPrice: "$150",
//       estProfit: "$30",
//       rating: 4.7,
//       likes: "10K",
//       comments: "10K",
//       shares: "10K",
//       stars: "(2000)",
//     },
//     // Các sản phẩm khác...
//   ];

//   const handleSearchChange = (value) => setSearchValue(value);

//   return (
//     <Page title="Find Product">
//       <Layout>
//         {/* Thanh tìm kiếm */}
//         <Layout.Section>
//           <Card sectioned>
//             <TextField
//               placeholder="Search Product"
//               value={searchValue}
//               onChange={handleSearchChange}
//               clearButton
//               onClearButtonClick={() => setSearchValue("")}
//             />
//             <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
//               <Badge>New Product</Badge>
//               <Badge>Hot Product TikTok</Badge>
//               <Badge>Top Product</Badge>
//               <Badge>Fast Shipping</Badge>
//             </div>
//           </Card>
//         </Layout.Section>

//         {/* Lưới sản phẩm */}
//         <Layout.Section>
//           <Grid>
//             {products.map((product) => (
//               <Grid.Cell
//                 key={product.id}
//                 columnSpan={{ xs: 6, sm: 5, md: 4 }}
//                 style={{ display: "flex", justifyContent: "center" }}
//               >
//                 <Card>
//                   <div
//                     style={{
//                       width: "100%",
//                       borderRadius: "8px",
//                       backgroundColor: "white",
//                       position: "relative",
//                     }}
//                   >
//                     {/* Thêm badge TikTok */}
//                     <ProductBadge product={product} />

//                     {/* Hình ảnh */}
//                     <Image
//                       source={product.image}
//                       alt={product.title}
//                       style={{
//                         width: "100%",
//                         height: "214px",
//                         objectFit: "cover",
//                         borderRadius: "8px",
//                         backgroundColor: "rgba(255, 255, 255, 0.98)",
//                       }}
//                     />

//                     {/* Nội dung sản phẩm */}
//                     <div style={{ paddingTop: "12px" }}>
//                       <Text as="h6" variant="headingMd">
//                         {product.title}
//                       </Text>
//                       <div
//                         style={{
//                           paddingTop: "8px",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "4px",
//                         }}
//                       >
//                         <span style={{ fontWeight: "500" }}>{product.rating}</span>
//                         <span style={{ color: "black", fontSize: "16px" }}>★</span>
//                         <span style={{ fontSize: "12px", color: "#6D6D6D" }}>{product.stars}</span>
//                       </div>
//                       <div style={{
//                           marginTop: "12px",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "8px", }}>
//                         <Text as="span" variant="headingLg" fontWeight="bold" >
//                           {product.price}
//                         </Text>
//                         <Text
//                           as="span"
//                           variant="bodySm"
//                           style={{ marginleft: "12px", textDecoration: "line-through", color: "#6D6D6D" }}
//                         >
//                           <span style={{ color: "#6D6D6D" ,paddingLeft: "8px", fontWeight: "500", margin: "0", padding: "0", textDecoration: "line-through",}}>{product.oldPrice}</span> 
//                         </Text>
//                       </div>
//                       <div style={{ marginTop: "12px" }}>
//                         <Text variant="bodySm">
//                           Est Profit: <strong>{product.estProfit}</strong>
//                         </Text>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </Grid.Cell>
//             ))}
//           </Grid>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }




////===========Ver 1

// import React, { useState } from "react";
// import {
//   Page,
//   Layout,
//   Card,
//   TextField,
//   Grid,
//   Badge,
//   Thumbnail,
//   Image,
//   Text,
//   Icon,
// } from "@shopify/polaris";
// import { StarFilledIcon,ArrowDownIcon, AtmWithdrawalIcon, BarcodeIcon } from "@shopify/polaris-icons";

// // Component FindProduct
// export default function FindProduct() {
//   // State để quản lý giá trị thanh tìm kiếm
//   const [searchValue, setSearchValue] = useState("");

//   // Dữ liệu sản phẩm mẫu
//   const products = [
//     {
//       id: 1,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike New Dunk Low Men's White",
//       price: "$100",
//       oldPrice: "$150",
//       estProfit: "$30",
//       rating: 4.7,
//       likes: "10K",
//       comments: "10K",
//       shares: "10K",
//       stars: "(2000)",
//     },
//     {
//       id: 2,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Sf0ec05f0722f4949952d1443e8a39b4c2.jpg_960x960q75.jpg_.avif",
//       title: "Adidas Performance Shoe",
//       price: "$120",
//       oldPrice: "$170",
//       estProfit: "$40",
//       rating: 4.8,
//       likes: "8K",
//       comments: "5K",
//       shares: "7K",
//       stars: "(2000)",
//     },
//     {
//       id: 3,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike Running Shoes",
//       price: "$110",
//       oldPrice: "$160",
//       estProfit: "$35",
//       rating: 4.6,
//       likes: "12K",
//       comments: "8K",
//       shares: "6K",
//       stars: "(2000)",
//     },
//     {
//       id: 3,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike Running Shoes",
//       price: "$110",
//       oldPrice: "$160",
//       estProfit: "$35",
//       rating: 4.6,
//       likes: "12K",
//       comments: "8K",
//       shares: "6K",
//       stars: "(2000)",
//     },
//     {
//       id: 3,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike Running Shoes",
//       price: "$110",
//       oldPrice: "$160",
//       estProfit: "$35",
//       rating: 4.6,
//       likes: "12K",
//       comments: "8K",
//       shares: "6K",
//       stars: "(2000)",
//     },
//     {
//       id: 3,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike Running Shoes",
//       price: "$110",
//       oldPrice: "$160",
//       estProfit: "$35",
//       rating: 4.6,
//       likes: "12K",
//       comments: "8K",
//       shares: "6K",
//       stars: "(2000)",
//     },
//     {
//       id: 3,
//       image:
//         "https://ae-pic-a1.aliexpress-media.com/kf/Saef6ff87736d4d369e050d06f08c309fr.png_960x960.png_.avif",
//       title: "Nike Running Shoes",
//       price: "$110",
//       oldPrice: "$160",
//       estProfit: "$35",
//       rating: 4.6,
//       likes: "12K",
//       comments: "8K",
//       shares: "6K",
//       stars: "(2000)",
//     },
//   ];

//   // Hàm xử lý thay đổi trong thanh tìm kiếm
//   const handleSearchChange = (value) => setSearchValue(value);

//   return (
//     <Page title="Find Product">
//       <Layout>
//         {/* Thanh tìm kiếm và bộ lọc */}
//         <Layout.Section>
//           <Card sectioned>
//             <TextField
//               placeholder="Search Product"
//               value={searchValue}
//               onChange={handleSearchChange}
//               clearButton
//               onClearButtonClick={() => setSearchValue("")}
//             />
//             <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
//               <Badge>New Product</Badge>
//               <Badge>Hot Product TikTok</Badge>
//               <Badge>Top Product</Badge>
//               <Badge>Fast Shipping</Badge>
//             </div>
//           </Card>
//         </Layout.Section>

//         {/* Lưới sản phẩm */}
//         <Layout.Section>
//           <Grid>
//             {products.map((product) => (
//               <Grid.Cell
//                 key={product.id}
//                 columnSpan={{ xs: 6, sm: 5, md: 4 }}
                
//                 style={{ 
//                   display: "flex", 
//                   gridColumnEnd: "unset",
//                   justifyContent: "center" }}
//               >
//                 <Card>
//                   <div
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       borderRadius: "8px",
//                       backgroundColor: "white",
//                       display: "flex",
//                       flexDirection: "column",
//                       position: "relative",
//                     }}
//                   >
//                     {/* Hình ảnh */}
//                     <Image
//                       source={product.image}
//                       alt={product.title}
//                       style={{
//                         width: "327px", // Kích thước cố định
//                         height: "214px", // Kích thước chiều cao mong muốn
//                         maxWidth: "100%", // Đảm bảo không bị giới hạn
//                         objectFit: "cover", // Đảm bảo ảnh lấp đầy khung mà không méo
//                         borderRadius: "8px", // Bo tròn khung ảnh (nếu cần)
//                       }}
//                     />

//                     {/* Nội dung sản phẩm */}
//                     <div style={{ paddingTop: "12px"}}>
//                       <Text as="h6" variant="headingMd">
//                         {product.title}
//                       </Text>
//                        <div style={{ paddingTop: "8px",display: "flex", alignItems: "center", gap: "4px",lineHeight: "1",margin: "0", padding: "0" }}>
//                           <span style={{ fontWeight: "500", margin: "0", padding: "0"}}>{product.rating}</span>
//                           <span style={{ color: "black", fontSize: "16px" }}>
//                             ★
//                           </span>
//                           <span style={{ fontSize: "12px", color: "#6D6D6D", margin: "0", padding: "0" }}>{product.stars}</span>
//                         </div>
//                       <div style={{ marginTop: "12px"}}>
//                         <Text as="span" variant="headingLg" fontWeight="bold">
//                           {product.price}
//                         </Text>
//                         <Text
//                           as="span"
//                           variant="bodySm"
//                           style={{ marginleft: "12px", textDecoration: "line-through", color: "#8C8C8C" }}
//                         >
//                           <span style={{ paddingLeft: "8px", fontWeight: "500", margin: "0", padding: "0"}}>{product.oldPrice}</span> 
//                         </Text>
//                       </div >
//                       <div  style={{ marginTop: "12px" }}>
//                       <Text variant="bodySm">
//                         Est Profit: <strong>{product.estProfit}</strong>
//                       </Text>
//                       </div>
//                     </div>

//                     {/* Thẻ Icon */}
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "8px",
//                         left: "8px",
//                         display: "flex",
//                         gap: "8px",
//                       }}
//                     >
//                       <Badge size="small">
//                         <Icon source={ArrowDownIcon} /> {product.likes}
//                       </Badge>
//                       <Badge size="small">
//                         <Icon source={AtmWithdrawalIcon} /> {product.comments}
//                       </Badge>
//                       <Badge size="small">
//                         <Icon source={BarcodeIcon} /> {product.shares}
//                       </Badge>
//                     </div>
//                   </div>
//                 </Card>
//               </Grid.Cell>
//             ))}
//           </Grid>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }
