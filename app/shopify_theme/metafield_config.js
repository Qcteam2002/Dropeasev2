const metafields = [
  {
    namespace: "gridviewname",
    key: "gridviewkey",
    name: "gridview",
    type: "json", 
    description: "Grid View configuration for product display",
    ownerType: "PRODUCT", 
    access: {
      storefront: "PUBLIC_READ"
    }
  },
  {
    namespace: "reviewn",
    key: "reviewk",
    name: "Review",
    type: "json",
    description: "Warranty information for the product",
    ownerType: "PRODUCT", 
    access: {
      storefront: "PUBLIC_READ"
    }
  },
];

export default metafields;
