import React, { useState, useEffect } from 'react';
import {
  Card,
  TextField,
  Button,
  BlockStack,
  Text,
  Box,
  InlineStack,
  Grid,
  Badge,
  Spinner,
  Thumbnail,
} from '@shopify/polaris';

const ImageOptimizationTab = ({ 
  product, 
  settings, 
  onApplyAltText,
  fetcher 
}) => {
  const [images, setImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAlts, setGeneratedAlts] = useState({});

  useEffect(() => {
    // Initialize images from product data
    if (product.images && product.images.length > 0) {
      const imageList = product.images.map((img, index) => ({
        id: img.id || `img-${index}`,
        src: img.url,
        alt: img.altText || '',
        width: img.width,
        height: img.height,
        isGenerated: false
      }));
      setImages(imageList);
    }
  }, [product.images]);

  const handleGenerateAllAlt = async () => {
    if (!settings.primaryKeyword) {
      alert('Please set a primary keyword in settings first');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate API call - replace with actual API
      const mockAlts = generateMockAltTexts();
      setGeneratedAlts(mockAlts);
      
      // Update images with generated alt texts
      setImages(prev => prev.map(img => ({
        ...img,
        alt: mockAlts[img.id] || img.alt,
        isGenerated: !!mockAlts[img.id]
      })));
    } catch (error) {
      console.error('Error generating alt texts:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockAltTexts = () => {
    const keyword = settings.primaryKeyword;
    const tone = settings.tone;
    const productTitle = product.title;
    
    const altTexts = {};
    
    images.forEach((img, index) => {
      let altText = '';
      
      switch (tone) {
        case 'friendly':
          altText = `${productTitle} - ${keyword} product image ${index + 1}`;
          break;
        case 'professional':
          altText = `Professional ${keyword} - ${productTitle} product view ${index + 1}`;
          break;
        case 'luxury':
          altText = `Premium ${keyword} - ${productTitle} luxury product ${index + 1}`;
          break;
        case 'minimal':
          altText = `${productTitle} ${keyword}`;
          break;
        case 'technical':
          altText = `${productTitle} - ${keyword} technical specifications image ${index + 1}`;
          break;
        case 'playful':
          altText = `Fun ${keyword} - ${productTitle} awesome product ${index + 1}`;
          break;
        default:
          altText = `${productTitle} - ${keyword} image ${index + 1}`;
      }
      
      altTexts[img.id] = altText;
    });
    
    return altTexts;
  };

  const handleAltTextChange = (imageId, newAltText) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, alt: newAltText, isGenerated: false }
        : img
    ));
  };

  const handleApplyAltText = () => {
    const altTextData = images.map(img => ({
      id: img.id,
      altText: img.alt
    }));
    onApplyAltText(altTextData);
  };

  const imagesWithAlt = images.filter(img => img.alt.trim()).length;
  const altPercentage = images.length > 0 ? Math.round((imagesWithAlt / images.length) * 100) : 0;

  return (
    <BlockStack gap="400">
      <InlineStack align="space-between">
        <BlockStack gap="200">
          <Text variant="headingMd" as="h2">
            Image Optimization
          </Text>
          <Text variant="bodyMd" color="subdued">
            Optimize alt text for better SEO and accessibility
          </Text>
        </BlockStack>
        <Button
          variant="secondary"
          size="micro"
          onClick={handleGenerateAllAlt}
          loading={isGenerating}
          disabled={!settings.keywords || settings.keywords.length === 0 || images.length === 0}
          style={{ 
            height: '28px', 
            padding: '4px 8px',
            fontSize: '12px'
          }}
        >
          {isGenerating ? 'Generating...' : 'Generate All Alt Text'}
        </Button>
      </InlineStack>

          {images.length > 0 && (
            <InlineStack gap="200" align="center">
              <Text variant="bodyMd">
                Alt text coverage: {imagesWithAlt}/{images.length} images
              </Text>
              <Badge 
                status={altPercentage === 100 ? 'success' : altPercentage > 50 ? 'attention' : 'critical'}
              >
                {altPercentage}%
              </Badge>
            </InlineStack>
          )}

          {images.length === 0 ? (
            <Box padding="400" background="bg-surface-secondary" borderRadius="200">
              <Text variant="bodyMd" color="subdued" alignment="center">
                No images found for this product
              </Text>
            </Box>
          ) : (
            <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap="300">
              {images.map((img) => (
                <Card key={img.id} sectioned>
                  <BlockStack gap="300">
                    <Box position="relative">
                      <img 
                        src={img.src} 
                        alt={img.alt || 'Product image'}
                        style={{ 
                          width: '100%', 
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }} 
                      />
                      {img.isGenerated && (
                        <Box position="absolute" insetBlockStart="100" insetInlineEnd="100">
                          <Badge status="info" size="small">
                            AI Generated
                          </Badge>
                        </Box>
                      )}
                    </Box>
                    
                    <TextField
                      label="Alt text"
                      value={img.alt}
                      onChange={(value) => handleAltTextChange(img.id, value)}
                      placeholder="Describe this image for SEO and accessibility"
                      multiline={2}
                      helpText={`Image ${images.indexOf(img) + 1} of ${images.length}`}
                    />
                  </BlockStack>
                </Card>
              ))}
            </Grid>
          )}

          {images.length > 0 && (
            <Button
              primary
              onClick={handleApplyAltText}
              loading={fetcher?.state === 'submitting'}
              disabled={imagesWithAlt === 0}
            >
              Apply All Alt Text to Shopify
            </Button>
          )}
    </BlockStack>
  );
};

export default ImageOptimizationTab;
