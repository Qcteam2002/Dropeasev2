export const optimizeProduct = async (platformProduct) => {
  const optimizedProduct = {
    title: platformProduct.title || '',
    description: platformProduct.description || '',
    metafields: {
      gridview: "Giá trị mẫu 1",
      review: "Giá trị mẫu 2"
    }
  };

  return optimizedProduct;
};
