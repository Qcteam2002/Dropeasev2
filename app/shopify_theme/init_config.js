const themeFiles = [  
  {
    source: "./app/shopify_theme/assets/product.js",
    target: "assets/ed_product_page.js",
    type: "assets"
  },
  {
    source: "./app/shopify_theme/assets/product.css",
    target: "assets/ed_product_page.css",
    type: "assets"
  },
  {
    source: "./app/shopify_theme/sections/section1.liquid",
    target: "sections/ed_section1.liquid",
    name: "ed_section1",
    type: "section"
  },
];

export default themeFiles;
