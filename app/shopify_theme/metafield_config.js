const metafields = [
  {
    namespace: "gridview",
    key: "configuration",
    name: "gridview",
    type: "json", 
    description: "Grid View configuration for product display",
    ownerType: "PRODUCT", 
    access: {
      storefront: "PUBLIC_READ"
    }
  },
  {
    namespace: "productReview",
    key: "configuration",
    name: "Review",
    type: "json",
    description: "Warranty information for the product",
    ownerType: "PRODUCT", 
    access: {
      storefront: "PUBLIC_READ"
    }
  },
  {
    namespace: "floatvideo",
    key: "configuration",
    name: "floatvideo",
    type: "json", 
    description: "Float Video configuration for product display",
    ownerType: "PRODUCT", 
    access: {
      storefront: "PUBLIC_READ"
    }
  }
];

export default metafields;
