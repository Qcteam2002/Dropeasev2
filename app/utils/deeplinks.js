export const buildDeeplinks = (shop) => {
  console.log("Building deeplinks for shop:", shop);
  const appId = process.env.SHOPIFY_APP_ID || "2ffd238e00074de340be24c6da5d6883";
  const links = {
    starRating: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${appId}/star_rating&target=newAppsSection`,
    gridView: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${appId}/gridview-block&target=newAppsSection`,
    productReview: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${appId}/ai-review-block&target=sectionId:main`,
    paymentBlock: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${appId}/payment-block&target=sectionId:main`,
    policie: `https://${shop}/admin/themes/current/editor?template=product&addAppBlockId=${appId}/policyfeature-block&target=sectionId:main`,
    optimizeScript: `https://${shop}/admin/themes/current/editor?context=apps&template=product&activateAppId=23fc9ea0-82b9-40d6-bb1c-8518cbd98660/optimize-core-script`,
    stickybar: `https://${shop}/admin/themes/current/editor?context=apps&template=product&activateAppId=${appId}/floating-video-block`,
  };
  console.log("Generated links:", links);
  return links;
}; 