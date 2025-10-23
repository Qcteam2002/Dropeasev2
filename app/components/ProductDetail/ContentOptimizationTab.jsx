import React, { useState } from 'react';
import {
  Card,
  TextField,
  Button,
  BlockStack,
  Text,
  Divider,
  InlineStack,
  Spinner,
  Toast,
  Box,
} from '@shopify/polaris';
import { useFetcher } from '@remix-run/react';

const ContentOptimizationTab = ({ 
  product, 
  settings, 
  onApplyContent,
  fetcher,
  selectedSegment 
}) => {
  const [currentTitle, setCurrentTitle] = useState(product.title || '');
  const [currentDescription, setCurrentDescription] = useState(
    product.descriptionHtml?.replace(/<[^>]*>/g, '') || ''
  );
  const [currentDescriptionHtml, setCurrentDescriptionHtml] = useState(
    product.descriptionHtml || ''
  );
  const [descriptionViewMode, setDescriptionViewMode] = useState('normal'); // 'normal' or 'html'
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState({ active: false, message: "" });

  const optimizeFetcher = useFetcher();
  const segmentationFetcher = useFetcher();

  const handleGenerateWithSegmentation = async () => {
    setIsGenerating(true);
    
    const formData = new FormData();
    formData.append("title", currentTitle);
    formData.append("description", currentDescription);
    formData.append("productId", product.id);
    formData.append("language", settings.languageOutput || "vi-VN");
    formData.append("targetMarket", settings.targetMarket || "vi");
    
    // Send all product images including variant images
    const allImages = [];
    
    // Add featured media first
    if (product.featuredMedia) {
      allImages.push(product.featuredMedia);
    }
    
    // Add all product images
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((img) => {
        if (img && (img.url || img.src)) {
          allImages.push(img.url || img.src);
        }
      });
    }
    
    // Add variant images
    if (product.variants && Array.isArray(product.variants)) {
      product.variants.forEach((variant) => {
        if (variant.image && (variant.image.url || variant.image.src)) {
          allImages.push(variant.image.url || variant.image.src);
        }
      });
    }
    
    // Remove duplicates and null values
    const cleanImages = [...new Set(allImages.filter(Boolean))];
    
    // Add images to form data
    cleanImages.forEach((imageUrl, index) => {
      formData.append(`images[${index}]`, imageUrl);
    });
    
    // Add segmentation data
    formData.append("segmentation", JSON.stringify(selectedSegment));
    
    console.log('=== SEGMENTATION CONTENT GENERATION ===');
    console.log('Selected segment:', selectedSegment.name);
    console.log('Images count:', cleanImages.length);
    console.log('Language:', settings.languageOutput);

    segmentationFetcher.submit(formData, { 
      method: "post", 
      action: "/api/generate-content-segmentation" 
    });
  };

  const handleGenerateSEO = async () => {
    // Check if we have segmentation data
    if (selectedSegment) {
      console.log('Using segmentation-based content generation for:', selectedSegment.name);
      handleGenerateWithSegmentation();
      return;
    }

    // Fallback to original logic if no segmentation
    if (!settings.keywords || settings.keywords.length === 0) {
      setToast({ active: true, message: "Please select keywords in settings first" });
      return;
    }

    // Debug: Check product data
    console.log('=== PRODUCT DATA DEBUG ===');
    console.log('Product object:', product);
    console.log('Product title:', product?.title);
    console.log('Product images:', product?.images);
    console.log('Product variants:', product?.variants);
    console.log('Product featuredMedia:', product?.featuredMedia);

    setIsGenerating(true);
    
    const formData = new FormData();
    formData.append("productTitle", currentTitle);
    formData.append("productDescription", currentDescription);
    formData.append("productId", product.id);
    // Send all product images including variant images
    const allImages = [];
    
    // Debug: Log product structure
    console.log('=== PRODUCT IMAGES DEBUG ===');
    console.log('Product object:', {
      featuredMedia: product.featuredMedia,
      images: product.images,
      variants: product.variants
    });
    
    // Add featured media first
    if (product.featuredMedia) {
      allImages.push(product.featuredMedia);
    }
    
    // Add all product images - check both .url and .src properties
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach((img, index) => {
        console.log(`Image ${index}:`, img);
        if (img && (img.url || img.src)) {
          allImages.push(img.url || img.src);
        }
      });
    }
    
    // Add variant images
    if (product.variants && Array.isArray(product.variants)) {
      product.variants.forEach((variant, index) => {
        console.log(`Variant ${index}:`, variant);
        if (variant.image && (variant.image.url || variant.image.src)) {
          allImages.push(variant.image.url || variant.image.src);
        }
      });
    }
    
    // Remove duplicates and null values
    const cleanImages = [...new Set(allImages.filter(Boolean))];
    console.log('All product images collected:', cleanImages);
    formData.append("productImages", JSON.stringify(cleanImages));
    formData.append("type", settings.optimizationType || "keyword");
    formData.append("keywords", JSON.stringify(settings.keywords));
    formData.append("persona", settings.persona || "General Customer");
    formData.append("painpoints", JSON.stringify(settings.painpoints || []));
    formData.append("tone", settings.tone || "friendly");
    formData.append("languageOutput", settings.languageOutput || "en-US");
    formData.append("targetMarket", settings.targetMarket || "US");

    optimizeFetcher.submit(formData, { 
      method: "post", 
      action: "/api/optimize-content" 
    });
  };

  // Handle optimize fetcher response
  React.useEffect(() => {
    if (optimizeFetcher.data) {
      if (optimizeFetcher.data.success) {
        const { new_title, new_description } = optimizeFetcher.data;
        
        // Update the text fields directly with optimized content
        setCurrentTitle(new_title || currentTitle);
        
        // Handle both HTML and plain text descriptions
        if (new_description) {
          // Check if the description contains HTML tags
          const hasHtmlTags = /<[^>]*>/g.test(new_description);
          
          if (hasHtmlTags) {
            // If it's HTML, set both versions
            setCurrentDescriptionHtml(new_description);
            setCurrentDescription(new_description.replace(/<[^>]*>/g, ''));
          } else {
            // If it's plain text, set both versions
            setCurrentDescription(new_description);
            setCurrentDescriptionHtml(new_description);
          }
        }
        
        
        setToast({ active: true, message: "Content optimized successfully! Review and save to Shopify." });
      } else {
        setToast({ active: true, message: optimizeFetcher.data.error || "Failed to optimize content" });
      }
      setIsGenerating(false);
    }
  }, [optimizeFetcher.data]);

  // Handle segmentation fetcher response
  React.useEffect(() => {
    if (segmentationFetcher.data) {
      if (segmentationFetcher.data.success) {
        const { title, description } = segmentationFetcher.data.data;
        
        // Update the text fields directly with generated content
        setCurrentTitle(title || currentTitle);
        
        // Handle HTML description
        if (description) {
          setCurrentDescriptionHtml(description);
          setCurrentDescription(description.replace(/<[^>]*>/g, ''));
        }
        
        setToast({ 
          active: true, 
          message: `Content generated for ${segmentationFetcher.data.data.segmentation.name} segment!` 
        });
      } else {
        setToast({ 
          active: true, 
          message: segmentationFetcher.data.error || "Failed to generate content" 
        });
      }
      setIsGenerating(false);
    }
  }, [segmentationFetcher.data]);

  const handleSaveToShopify = () => {
    if (onApplyContent) {
      // Send HTML version to Shopify (like Shopify does)
      onApplyContent(currentTitle, currentDescriptionHtml, product.id);
    }
  };


  return (
    <>
      <BlockStack gap="400">
      <InlineStack align="space-between">
        <BlockStack gap="200">
          <Text variant="headingMd" as="h2">
            Content Optimization
          </Text>
          <Text variant="bodyMd" color="subdued">
            Optimize title and description for better SEO and conversion
          </Text>
        </BlockStack>
        <Button
          variant="secondary"
          size="micro"
          onClick={handleGenerateSEO}
          loading={isGenerating || optimizeFetcher.state === "submitting" || segmentationFetcher.state === "submitting"}
          disabled={!selectedSegment && (!settings.keywords || settings.keywords.length === 0)}
          style={{ 
            height: '28px', 
            padding: '4px 8px',
            fontSize: '12px'
          }}
        >
          {isGenerating || optimizeFetcher.state === "submitting" || segmentationFetcher.state === "submitting" 
            ? 'Generating...' 
            : selectedSegment 
              ? `Generate for ${selectedSegment.name}` 
              : 'Optimize Content'
          }
        </Button>
      </InlineStack>

      <Divider />

      <TextField
            label="Current Title"
            value={currentTitle}
            onChange={setCurrentTitle}
            multiline={2}
            helpText="Product title that appears in search results"
          />

          <div>
            <InlineStack align="space-between" blockAlign="center">
              <Text variant="bodyMd" as="label">
                Current Description
              </Text>
              <InlineStack gap="200">
                <Button
                  size="micro"
                  variant={descriptionViewMode === 'normal' ? 'primary' : 'secondary'}
                  onClick={() => setDescriptionViewMode('normal')}
                >
                  Normal View
                </Button>
                <Button
                  size="micro"
                  variant={descriptionViewMode === 'html' ? 'primary' : 'secondary'}
                  onClick={() => setDescriptionViewMode('html')}
                >
                  HTML View
                </Button>
              </InlineStack>
            </InlineStack>
            
            <Box paddingBlockStart="200">
              {descriptionViewMode === 'normal' ? (
                <div 
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '16px',
                    minHeight: '120px',
                    backgroundColor: '#ffffff',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#374151',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: `
                      <style>
                        h1, h2, h3, h4, h5, h6 { 
                          margin: 0 0 12px 0; 
                          font-weight: 600; 
                          color: #1f2937;
                        }
                        h1 { font-size: 20px; }
                        h2 { font-size: 18px; }
                        h3 { font-size: 16px; }
                        p { 
                          margin: 0 0 12px 0; 
                          line-height: 1.6;
                        }
                        ul, ol { 
                          margin: 0 0 12px 0; 
                          padding-left: 20px; 
                        }
                        li { 
                          margin: 0 0 6px 0; 
                          line-height: 1.5;
                        }
                        strong, b { 
                          font-weight: 600; 
                          color: #1f2937;
                        }
                        em, i { 
                          font-style: italic; 
                        }
                        a { 
                          color: #3b82f6; 
                          text-decoration: underline; 
                        }
                        img { 
                          max-width: 100%; 
                          height: auto; 
                          border-radius: 4px;
                          margin: 8px 0;
                        }
                        blockquote {
                          border-left: 4px solid #e5e7eb;
                          padding-left: 16px;
                          margin: 12px 0;
                          font-style: italic;
                          color: #6b7280;
                        }
                      </style>
                      ${currentDescriptionHtml || currentDescription}
                    `
                  }}
                />
              ) : (
                <TextField
                  label=""
                  value={currentDescriptionHtml}
                  onChange={(value) => {
                    setCurrentDescriptionHtml(value);
                    setCurrentDescription(value.replace(/<[^>]*>/g, ''));
                  }}
                  multiline={4}
                  helpText="HTML version - will be saved to Shopify"
                />
              )}
            </Box>
          </div>

          <Divider />



          <Button
            primary
            onClick={handleSaveToShopify}
            loading={fetcher?.state === 'submitting'}
            disabled={!currentTitle.trim() || !currentDescription.trim()}
          >
            Save to Shopify
          </Button>
      </BlockStack>
      
      {toast.active && (
        <Toast
          content={toast.message}
          onDismiss={() => setToast({ active: false, message: "" })}
        />
      )}
    </>
  );
};

export default ContentOptimizationTab;
