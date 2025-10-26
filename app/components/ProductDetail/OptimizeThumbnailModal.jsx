import React, { useState } from 'react';
import {
  Modal,
  BlockStack,
  Text,
  Box,
  InlineStack,
  Grid,
  Badge,
  Spinner,
  Card,
  Button,
} from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';

const OptimizeThumbnailModal = ({ 
  active, 
  onClose, 
  product,
  styles,
  onSuccess 
}) => {
  const [selectedStyle, setSelectedStyle] = useState('studio_shot');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariants, setGeneratedVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [applyingThumbnail, setApplyingThumbnail] = useState(false);

  const currentThumbnail = product.featuredMedia || (product.images && product.images[0]?.url) || '';

  const handleGenerate = async () => {
    console.log('🎨 Generating thumbnail variants with style:', selectedStyle);
    
    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append('productId', product.id);
      formData.append('productTitle', product.title);
      formData.append('productDescription', product.descriptionHtml || '');
      formData.append('style', selectedStyle);
      formData.append('currentThumbnail', currentThumbnail);
      
      const response = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success && result.data.variants) {
        console.log('✅ Thumbnail variants generated successfully:', result);
        setGeneratedVariants(result.data.variants);
      } else {
        console.error('❌ Thumbnail generation failed:', result.error);
        alert(`Failed to generate thumbnails: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error generating thumbnails:', error);
      alert('Failed to generate thumbnails. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSetAsThumbnail = async () => {
    if (!selectedVariant) {
      alert('Please select a thumbnail variant first');
      return;
    }

    const variant = generatedVariants.find(v => v.id === selectedVariant);
    if (!variant) {
      alert('Selected variant not found');
      return;
    }

    console.log('🖼️ Setting thumbnail:', variant);
    
    setApplyingThumbnail(true);
    
    try {
      const formData = new FormData();
      formData.append('productId', product.id);
      formData.append('thumbnailUrl', variant.url);
      formData.append('variantId', variant.id);
      
      const response = await fetch('/api/set-thumbnail', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Thumbnail set successfully');
        alert('Thumbnail updated successfully!');
        onClose();
        if (onSuccess) onSuccess();
      } else {
        console.error('❌ Failed to set thumbnail:', result.error);
        alert(`Failed to update thumbnail: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error setting thumbnail:', error);
      alert('Failed to update thumbnail. Please try again.');
    } finally {
      setApplyingThumbnail(false);
    }
  };

  const handleClose = () => {
    setGeneratedVariants([]);
    setSelectedVariant(null);
    setSelectedStyle('studio_shot');
    onClose();
  };

  return (
    <Modal
      open={active}
      onClose={handleClose}
      title="Optimize Thumbnail"
      large
      primaryAction={
        generatedVariants.length > 0
          ? {
              content: 'Set as Thumbnail',
              onAction: handleSetAsThumbnail,
              loading: applyingThumbnail,
              disabled: !selectedVariant,
            }
          : {
              content: 'Generate',
              onAction: handleGenerate,
              loading: isGenerating,
            }
      }
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="400">
          {/* Step 1: Select Style */}
          {generatedVariants.length === 0 && (
            <>
              <Text variant="headingSm" as="h3">
                Bước 1: Chọn phong cách
              </Text>
              
              <Text variant="bodyMd" color="subdued">
                Chọn một phong cách chuyên nghiệp. Chúng tôi sẽ tạo 3-4 biến thể để bạn lựa chọn.
              </Text>

              <Grid columns={{ xs: 1, sm: 2 }} gap="400">
                {styles.map((style) => (
                  <Card
                    key={style.id}
                    background={selectedStyle === style.id ? 'bg-surface-selected' : 'bg-surface'}
                  >
                    <Box
                      padding="400"
                      onClick={() => setSelectedStyle(style.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <BlockStack gap="300">
                        <InlineStack align="space-between" blockAlign="start">
                          <InlineStack gap="200" blockAlign="center">
                            <Text variant="headingLg">{style.icon}</Text>
                            <BlockStack gap="100">
                              <Text variant="headingSm" fontWeight="semibold">
                                {style.name}
                              </Text>
                            </BlockStack>
                          </InlineStack>
                          {selectedStyle === style.id && (
                            <CheckIcon />
                          )}
                        </InlineStack>
                        
                        <Text variant="bodySm" color="subdued">
                          {style.description}
                        </Text>
                        
                        <Badge tone="info">{style.example}</Badge>
                      </BlockStack>
                    </Box>
                  </Card>
                ))}
              </Grid>
            </>
          )}

          {/* Step 2: Loading State */}
          {isGenerating && (
            <Box padding="800">
              <BlockStack gap="400" inlineAlign="center">
                <Spinner size="large" />
                <Text variant="bodyLg" alignment="center">
                  Đang tạo các biến thể thumbnail...
                </Text>
                <Text variant="bodySm" color="subdued" alignment="center">
                  Quá trình này có thể mất 10-30 giây
                </Text>
              </BlockStack>
            </Box>
          )}

          {/* Step 3: Select Variant */}
          {generatedVariants.length > 0 && !isGenerating && (
            <>
              <Box 
                padding="300" 
                background="bg-surface-success"
                borderRadius="200"
              >
                <Text variant="bodyMd">
                  ✓ Đã tạo {generatedVariants.length} biến thể! Chọn ảnh yêu thích và bấm "Set as Thumbnail".
                </Text>
              </Box>

              <Text variant="headingSm" as="h3">
                Bước 2: Chọn ảnh yêu thích
              </Text>

              <Grid columns={{ xs: 1, sm: 2 }} gap="400">
                {generatedVariants.map((variant) => (
                  <Card
                    key={variant.id}
                    background={selectedVariant === variant.id ? 'bg-surface-selected' : 'bg-surface'}
                  >
                    <Box
                      onClick={() => setSelectedVariant(variant.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <BlockStack gap="300">
                        <Box position="relative">
                          <img 
                            src={variant.url} 
                            alt={`Variant ${variant.id}`}
                            style={{ 
                              width: '100%', 
                              height: 'auto',
                              aspectRatio: '1/1',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              backgroundColor: '#f6f6f7'
                            }} 
                          />
                          {selectedVariant === variant.id && (
                            <Box 
                              position="absolute" 
                              insetBlockStart="8" 
                              insetInlineEnd="8"
                            >
                              <Badge tone="success">Đã chọn</Badge>
                            </Box>
                          )}
                        </Box>
                        
                        <Box padding="400">
                          <BlockStack gap="200">
                            <Text variant="bodySm" color="subdued">
                              Biến thể {variant.id.split('-').pop()}
                            </Text>
                          </BlockStack>
                        </Box>
                      </BlockStack>
                    </Box>
                  </Card>
                ))}
              </Grid>

              <InlineStack align="center">
                <Button onClick={handleGenerate} loading={isGenerating}>
                  Tạo biến thể mới
                </Button>
              </InlineStack>
            </>
          )}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
};

export default OptimizeThumbnailModal;


