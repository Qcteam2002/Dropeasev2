const metafields = [
  {
    namespace: "gridviewname",
    key: "gridview",
    name: "gridview",
    type: "json", 
    description: "Grid View configuration for product display",
    ownerType: "PRODUCT", 
    access: {
      storefront: "PUBLIC_READ"
    }
  },
  {
    namespace: "review",
    key: "review",
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
