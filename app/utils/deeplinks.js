export const buildDeeplinks = (shop) => {
  console.log("Building deeplinks for shop:", shop);
  const links = {
    starRating: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${process.env.SHOPIFY_DEMO_THEME_EXT_ID}/star_rating&target=newAppsSection`,
    gridView: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${process.env.SHOPIFY_DEMO_THEME_EXT_ID}/gridview-block&target=newAppsSection`,
    productReview: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${process.env.SHOPIFY_DEMO_THEME_EXT_ID}/ai-review-block&target=sectionId:main`,
    paymentBlock: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${process.env.SHOPIFY_DEMO_THEME_EXT_ID}/payment-block&target=sectionId:main`,
    policie: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${process.env.SHOPIFY_DEMO_THEME_EXT_ID}/policyfeature-block&target=sectionId:main`,
    optimizeScript: `https://${shop}/admin/themes/current/editor?context=apps&template=product&activateAppId=23fc9ea0-82b9-40d6-bb1c-8518cbd98660/optimize-core-script`,
    stickybar: `https://${shop}/admin/themes/current/editor?context=apps&template=product&activateAppId=${process.env.SHOPIFY_DEMO_THEME_EXT_ID}/floating-video-block`,
  };
  console.log("Generated links:", links);
  return links;
}; 