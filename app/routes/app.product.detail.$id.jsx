import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, useFetcher, useRevalidator } from "@remix-run/react";
import React, { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  Thumbnail,
  Toast,
  Frame,
  ButtonGroup,
  Box,
  InlineStack,
  BlockStack,
  Button,
} from "@shopify/polaris";
import { 
  ExternalIcon,
  MagicIcon,
} from "@shopify/polaris-icons";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate, getUser } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

// Import new components
import OptimizationSettings from "../components/ProductDetail/OptimizationSettings";
import ContentOptimizationTab from "../components/ProductDetail/ContentOptimizationTab";
import ImageOptimizationTab from "../components/ProductDetail/ImageOptimizationTab";
import FeatureHighlightTab from "../components/ProductDetail/FeatureHighlightTab";

const prisma = new PrismaClient();

export const loader = async ({ request, params }) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);
    const productId = params.id;

    if (!user || !productId) {
      throw new Response("Not Found", { status: 404 });
    }

    const product = await prisma.platformProduct.findFirst({
      where: {
        id: BigInt(productId),
        userId: user.id,
      },
      include: {
        optimizedProduct: true,
      },
    });

    if (!product) {
      throw new Response("Product not found", { status: 404 });
    }

    // Get detailed product info from Shopify GraphQL API
    let shopifyImages = [];
    let shopifyProduct = null;
    
    try {
      const query = `
        query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            descriptionHtml
            handle
            status
            onlineStoreUrl
            featuredImage {
              id
              url
              altText
              width
              height
            }
            images(first: 20) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price
                  inventoryQuantity
                }
              }
            }
          }
        }
      `;

      const shopifyProductId = product.platformId.includes('gid://shopify/Product/') 
        ? product.platformId 
        : `gid://shopify/Product/${product.platformId}`;
      
      const response = await admin.graphql(query, {
        variables: { id: shopifyProductId }
      });

      const { data, errors } = await response.json();
      
      if (errors) {
        console.error("GraphQL errors:", errors);
      }
      
      if (data?.product) {
        shopifyProduct = data.product;
        shopifyImages = data.product.images?.edges?.map(edge => ({
          id: edge.node.id,
          url: edge.node.url,
          altText: edge.node.altText || `${product.title} image`,
          width: edge.node.width,
          height: edge.node.height,
        })) || [];
      }
    } catch (error) {
      console.error("Error fetching Shopify product:", error);
    }

    // Combine all image sources
    let finalImages = [];
    
    let dbImages = [];
    if (product.images) {
      if (Array.isArray(product.images)) {
        dbImages = product.images;
      } else if (product.images.create && Array.isArray(product.images.create)) {
        dbImages = product.images.create;
      } else if (typeof product.images === 'object' && product.images.url) {
        dbImages = [product.images];
      }
    }
    
    if (dbImages.length > 0) {
      finalImages = dbImages.map((img, index) => ({
        id: img.id || `db-${index}`,
        url: img.url,
        altText: img.altText || `${product.title} image ${index + 1}`,
        width: img.width || null,
        height: img.height || null,
      }));
    } else if (shopifyImages.length > 0) {
      finalImages = shopifyImages;
    } else if (product.featuredMedia || shopifyProduct?.featuredImage?.url) {
      const featuredUrl = product.featuredMedia || shopifyProduct?.featuredImage?.url;
      finalImages = [{
        id: 'featured',
        url: featuredUrl,
        altText: `${product.title} featured image`,
        width: shopifyProduct?.featuredImage?.width || null,
        height: shopifyProduct?.featuredImage?.height || null,
      }];
    }

    const serializedProduct = {
      id: product.id.toString(),
      platformId: product.platformId,
      title: shopifyProduct?.title || product.title,  // ✅ Shopify first, DB fallback
      descriptionHtml: shopifyProduct?.descriptionHtml || product.descriptionHtml || "",  // ✅ Shopify first, DB fallback
      featuredMedia: shopifyProduct?.featuredImage?.url || product.featuredMedia || "",  // ✅ Shopify first, DB fallback
      images: finalImages,
      variants: shopifyProduct?.variants?.edges?.map(edge => edge.node) || product.variants || [],  // ✅ Shopify first, DB fallback
      optimizedTitle: product.optimizedProduct?.optimizedTitle || "",
      optimizedDescription: product.optimizedProduct?.optimizedDescription || "",
      gridView: product.optimizedProduct?.gridView || null,
      contentOptimized: !!product.optimizedProduct?.optimizedTitle,
      imageOptimized: false,
      highlightsGenerated: !!product.optimizedProduct?.gridView,
      shopifyUrl: shopifyProduct?.onlineStoreUrl || "",
    };

    // Build deeplinks for the shop
    const { buildDeeplinks } = await import("../utils/deeplinks");
    const deeplinks = buildDeeplinks(session.shop);

    return json(
      { product: serializedProduct, deeplinks },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Error loading product", { status: 500 });
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const productId = formData.get("productId") || params.id;

  try {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);

    switch (actionType) {
      case "saveContent":
        const title = formData.get("title");
        const description = formData.get("description");
        
        // Get the product from database first to get platformId
        const product = await prisma.platformProduct.findUnique({
          where: { id: BigInt(productId) }
        });
        
        if (!product) {
          throw new Error(`Product not found in database: ${productId}`);
        }
        
        console.log('Product ID debug:', {
          productId,
          productFromDB: product,
          platformId: product.platformId,
          title,
          description: description?.substring(0, 100) + '...'
        });
        
        // Use platformId (Shopify product ID) for GraphQL
        // Check if platformId already has gid format
        const productGid = product.platformId.startsWith('gid://') 
          ? product.platformId 
          : `gid://shopify/Product/${product.platformId}`;
        
        // Update product in Shopify using GraphQL
        const updateProductMutation = `
          mutation productUpdate($input: ProductUpdateInput!) {
            productUpdate(product: $input) {
              product {
                id
                title
                descriptionHtml
                seo {
                  title
                  description
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const updateResponse = await admin.graphql(updateProductMutation, {
          variables: {
            input: {
              id: productGid,
              title: title,
              descriptionHtml: description,
              seo: {
                title: title,
                description: description.replace(/<[^>]*>/g, '').substring(0, 160) // Plain text for SEO
              }
            }
          }
        });

        const updateData = await updateResponse.json();
        
        console.log('Shopify update response:', JSON.stringify(updateData, null, 2));
        
        if (updateData.data?.productUpdate?.userErrors?.length > 0) {
          throw new Error(`Shopify update failed: ${updateData.data.productUpdate.userErrors[0].message}`);
        }
        
        if (!updateData.data?.productUpdate?.product) {
          throw new Error(`Shopify update failed: No product returned`);
        }
        
        // Also save to local database
        await prisma.productsOptimized.upsert({
          where: { productId: BigInt(productId) },
          update: {
            optimizedTitle: title,
            optimizedDescription: description,
          },
          create: {
            productId: BigInt(productId),
            optimizedTitle: title,
            optimizedDescription: description,
            gridView: {},
          },
        });

        return json({ success: true, message: "Content saved and pushed to Shopify successfully" });
      
      case "saveAltText":
        const altTextData = JSON.parse(formData.get("altTextData") || "[]");
        
        // Update alt text in Shopify
        for (const imageData of altTextData) {
          const updateMutation = `
            mutation productImageUpdate($id: ID!, $input: ProductImageInput!) {
              productImageUpdate(id: $id, input: $input) {
                image {
                  id
                  altText
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `;

          await admin.graphql(updateMutation, {
            variables: {
              id: imageData.id,
              input: {
                altText: imageData.altText
              }
            }
          });
        }

        return json({ success: true, message: "Alt text updated successfully" });
      
      default:
        return json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Action error:", error);
    return json({ 
      error: "Action failed", 
      details: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
};

export default function ProductDetailPage() {
  const { product, deeplinks } = useLoaderData();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const revalidator = useRevalidator();
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [toast, setToast] = useState({ active: false, message: "" });
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [optimizationSettings, setOptimizationSettings] = useState({
    targetMarket: 'us',
    languageOutput: 'en-US',
    keywords: [],
    persona: '',
    painpoints: [],
    tone: 'friendly',
    optimizationType: 'keyword',
  });

  const handleSettingsChange = (newSettings) => {
    setOptimizationSettings(newSettings);
  };

  const handleSegmentChange = (segment) => {
    setSelectedSegment(segment);
  };

  const handleSaveSettings = async (settings) => {
    // Settings are auto-saved to localStorage in the component
    setToast({ active: true, message: "Settings saved successfully!" });
  };

  const handleApplyContent = (title, description, productId) => {
    const formData = new FormData();
    formData.append("actionType", "saveContent");
    formData.append("title", title);
    formData.append("description", description);
    formData.append("productId", productId || product.id);
    
    fetcher.submit(formData, { method: "post" });
  };

  const handleApplyAltText = (altTextData) => {
    const formData = new FormData();
    formData.append("actionType", "saveAltText");
    formData.append("altTextData", JSON.stringify(altTextData));
    
    fetcher.submit(formData, { method: "post" });
  };

  React.useEffect(() => {
    if (fetcher.data?.success) {
      setToast({ active: true, message: fetcher.data.message });
      
      // Force resync from Shopify to update database with latest data
      const resyncProduct = async () => {
        try {
          console.log('🔄 Syncing product data from Shopify...');
          const resyncResponse = await fetch(`/api/resync-product/${product.id}`, {
            method: 'POST',
          });
          const resyncData = await resyncResponse.json();
          
          if (resyncData.success) {
            console.log('✅ Product data synced from Shopify');
            // Revalidate to show the synced data
            revalidator.revalidate();
          } else {
            console.error('❌ Failed to sync product data:', resyncData.error);
            // Still revalidate to show Shopify data (fallback to GraphQL)
            revalidator.revalidate();
          }
        } catch (error) {
          console.error('❌ Error syncing product data:', error);
          // Still revalidate to show Shopify data (fallback to GraphQL)
          revalidator.revalidate();
        }
      };
      
      // Wait 1.5s to show toast message, then sync and revalidate
      setTimeout(resyncProduct, 1500);
    } else if (fetcher.data?.error) {
      const errorMessage = fetcher.data.details 
        ? `${fetcher.data.error}: ${fetcher.data.details}`
        : fetcher.data.error;
      setToast({ active: true, message: errorMessage });
      console.error('Fetcher error:', fetcher.data);
    }
  }, [fetcher.data, revalidator, product.id]);

  const tabOptions = [
    { label: 'Content', value: 'content' },
    { label: 'Image', value: 'image' },
    { label: 'Feature Highlight', value: 'feature-highlight' },
  ];

  return (
    <Frame>
      <Page
        backAction={{
          content: 'Products',
          onAction: () => navigate('/app/products'),
        }}
        title={
          <InlineStack gap="200" align="center" wrap={false}>
            <Thumbnail
              source={product.featuredMedia || "https://via.placeholder.com/40"}
              alt={product.title}
              size="small"
            />
            <div className="product-title-truncated">
              <Text 
                variant="headingMd" 
                as="h1"
              >
                {product.title}
              </Text>
            </div>
          </InlineStack>
        }
        secondaryActions={[
          {
            content: "View in Shopify Admin",
            icon: ExternalIcon,
            url: product.shopifyUrl,
            external: true,
          },
        ]}
      >
        <TitleBar title={product.title} />
        
        <style>{`
          .product-title-truncated {
            max-width: 250px !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            display: inline-flex !important;
            align-items: center !important;
            height: 100% !important;
          }
          .product-title-truncated h1 {
            max-width: 100% !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            display: block !important;
            margin: 0 !important;
            line-height: 1.2 !important;
          }
        `}</style>
        
        <Layout>
          {/* Left Column - Settings (30%) */}
                  <Layout.Section variant="oneThird">
                  <OptimizationSettings
                    settings={optimizationSettings}
                    onSettingsChange={handleSettingsChange}
                    onSaveSettings={handleSaveSettings}
                    product={product}
                    selectedSegment={selectedSegment}
                    onSegmentChange={handleSegmentChange}
                  />
                  </Layout.Section>

          {/* Right Column - Optimization Area (70%) */}
          <Layout.Section>
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  {/* Segmented Button Group for Tabs */}
                  <ButtonGroup variant="segmented" segmented>
                    {tabOptions.map((option, index) => (
                      <Button
                        key={option.value}
                        pressed={selectedTab === index}
                        onClick={() => setSelectedTab(index)}
                        variant="secondary"
                        size="large"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </ButtonGroup>

                  {/* Tab Content */}
                  {selectedTab === 0 && (
                    <ContentOptimizationTab
                      product={product}
                      settings={optimizationSettings}
                      onApplyContent={handleApplyContent}
                      fetcher={fetcher}
                      selectedSegment={selectedSegment}
                    />
                  )}

                  {selectedTab === 1 && (
                    <ImageOptimizationTab
                      product={product}
                      settings={optimizationSettings}
                      onApplyAltText={handleApplyAltText}
                      fetcher={fetcher}
                    />
                  )}

                  {selectedTab === 2 && (
                    <FeatureHighlightTab
                      product={product}
                      settings={optimizationSettings}
                      fetcher={fetcher}
                    />
                  )}
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>

        {toast.active && (
          <Toast
            content={toast.message}
            onDismiss={() => setToast({ active: false, message: "" })}
          />
        )}
      </Page>
    </Frame>
  );
}