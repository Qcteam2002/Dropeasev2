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
  Modal,
  ChoiceList,
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
  
  // Modal state
  const [modalActive, setModalActive] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState(['product_thumbnail']);
  
  // Generated images state
  const [generatedImages, setGeneratedImages] = useState([]);

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

  const handleCreateNewImage = () => {
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
    setSelectedImageType(['product_thumbnail']); // Reset to default
  };

  const handleGenerateImage = async () => {
    console.log('🎨 Generating image with type:', selectedImageType[0]);
    
    setIsGenerating(true);
    
    try {
      // Call API to generate image
      const formData = new FormData();
      formData.append('productId', product.id);
      formData.append('productTitle', product.title);
      formData.append('productDescription', product.descriptionHtml || '');
      formData.append('imageType', selectedImageType[0]);
      
      // Add existing images for reference
      if (product.images && product.images.length > 0) {
        formData.append('referenceImage', product.images[0].url);
      }
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Image generated successfully:', result);
        
        // Add generated image to the list
        const newGeneratedImage = {
          id: `generated-${Date.now()}`,
          url: result.data.imageUrl || 'https://via.placeholder.com/1024x1024?text=Generated+Image', // TODO: replace with actual URL
          type: selectedImageType[0],
          aspectRatio: result.data.aspectRatio,
          dimensions: result.data.dimensions,
          generatedAt: new Date().toISOString(),
          status: result.data.imageUrl ? 'completed' : 'pending'
        };
        
        setGeneratedImages(prev => [newGeneratedImage, ...prev]);
        handleCloseModal();
      } else {
        console.error('❌ Image generation failed:', result.error);
        alert(`Failed to generate image: ${result.error}`);
      }
    } catch (error) {
      console.error('❌ Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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
      <InlineStack align="space-between" blockAlign="center">
        <BlockStack gap="200">
          <Text variant="headingMd" as="h2">
            Image Optimization
          </Text>
          <Text variant="bodyMd" color="subdued">
            Create AI-generated product images
          </Text>
        </BlockStack>
        <Button 
          primary
          onClick={handleCreateNewImage}
          loading={isGenerating}
        >
          Create New Image
        </Button>
      </InlineStack>

      {/* Modal for image type selection */}
      <Modal
        open={modalActive}
        onClose={handleCloseModal}
        title="Create New Product Image"
        primaryAction={{
          content: 'Generate',
          onAction: handleGenerateImage,
          loading: isGenerating
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleCloseModal,
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Text variant="bodyMd">
              Choose the type of image you want to generate:
            </Text>
            
            <ChoiceList
              title=""
              choices={[
                {
                  label: 'Product Thumbnail (1:1)',
                  value: 'product_thumbnail',
                  helpText: 'Square image perfect for product listings and thumbnails'
                },
                {
                  label: 'Lifestyle Image (4:5)',
                  value: 'lifestyle_image',
                  helpText: 'Portrait format ideal for lifestyle and social media posts'
                },
                {
                  label: 'Hero Banner (16:9)',
                  value: 'hero_banner',
                  helpText: 'Wide format great for website headers and hero sections'
                },
              ]}
              selected={selectedImageType}
              onChange={(value) => setSelectedImageType(value)}
            />
          </BlockStack>
        </Modal.Section>
      </Modal>

      {/* Display generated images */}
      {generatedImages.length > 0 && (
        <BlockStack gap="400">
          <Text variant="headingMd">Generated Images</Text>
          <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
            {generatedImages.map((img) => (
              <Card key={img.id}>
                <BlockStack gap="300">
                  <Box position="relative">
                    <img 
                      src={img.url} 
                      alt={`Generated ${img.type} image`}
                      style={{ 
                        width: '100%', 
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        backgroundColor: '#f6f6f7'
                      }} 
                    />
                    <Box position="absolute" insetBlockStart="8" insetInlineEnd="8">
                      <Badge status={img.status === 'completed' ? 'success' : 'info'}>
                        {img.status === 'completed' ? 'Generated' : 'Processing'}
                      </Badge>
                    </Box>
                  </Box>
                  
                  <Box padding="400">
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text variant="bodyMd" fontWeight="semibold">
                          {img.type === 'product_thumbnail' && 'Product Thumbnail'}
                          {img.type === 'lifestyle_image' && 'Lifestyle Image'}
                          {img.type === 'hero_banner' && 'Hero Banner'}
                        </Text>
                        <Badge>{img.aspectRatio}</Badge>
                      </InlineStack>
                      
                      <Text variant="bodySm" color="subdued">
                        {img.dimensions.width} x {img.dimensions.height} px
                      </Text>
                      
                      <InlineStack gap="200">
                        <Button size="slim" onClick={() => window.open(img.url, '_blank')}>
                          View Full
                        </Button>
                        <Button size="slim" variant="primary">
                          Use This Image
                        </Button>
                      </InlineStack>
                    </BlockStack>
                  </Box>
                </BlockStack>
              </Card>
            ))}
          </Grid>
        </BlockStack>
      )}

      {/* Empty state when no generated images */}
      {generatedImages.length === 0 && (
        <Box padding="800" background="bg-surface-secondary" borderRadius="200">
          <BlockStack gap="200" inlineAlign="center">
            <Text variant="bodyLg" color="subdued" alignment="center">
              No images generated yet
            </Text>
            <Text variant="bodySm" color="subdued" alignment="center">
              Click "Create New Image" to generate AI-powered product images
            </Text>
          </BlockStack>
        </Box>
      )}
    </BlockStack>
  );
};

export default ImageOptimizationTab;
