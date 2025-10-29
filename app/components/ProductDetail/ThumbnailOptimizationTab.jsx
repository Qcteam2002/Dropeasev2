import React, { useState } from 'react';
import {
  Card,
  Button,
  BlockStack,
  Text,
  Box,
  InlineStack,
  Banner,
  Icon,
} from '@shopify/polaris';
import { ImageIcon } from '@shopify/polaris-icons';

// Import modals
import OptimizeThumbnailModal from './OptimizeThumbnailModal';
import CreateThumbnailModal from './CreateThumbnailModal';

const ThumbnailOptimizationTab = ({ 
  product, 
  settings, 
  fetcher 
}) => {
  const [optimizeModalActive, setOptimizeModalActive] = useState(false);
  const [createModalActive, setCreateModalActive] = useState(false);

  // Get current thumbnail
  const currentThumbnail = product.featuredMedia || (product.images && product.images[0]?.url) || '';

  // Available styles - Professional Product Photography Types
  const styles = [
    {
      id: 'studio_shot',
      name: 'Studio Shot',
      description: 'Professional product on clean background with studio lighting',
      icon: '🎨',
      thumbnail: 'https://res.cloudinary.com/db9vely0d/image/upload/v1761466359/Generated_Image_October_26_2025_-_3_04PM_fzcfjx.png',
      color: 'bg-surface',
      example: 'Perfect for product catalogs'
    },
    {
      id: 'lifestyle_shot',
      name: 'Lifestyle Shot',
      description: 'Product in dynamic context with models or real-life environment',
      icon: '🏠',
      thumbnail: 'https://res.cloudinary.com/db9vely0d/image/upload/v1761466359/Generated_Image_October_26_2025_-_3_05PM_cc8tph.png',
      color: 'bg-surface-secondary',
      example: 'Ideal for social media and ads'
    },
    {
      id: 'infographic',
      name: 'Infographic',
      description: 'Informative image with charts, icons and text describing features',
      icon: '📊',
      thumbnail: 'https://res.cloudinary.com/db9vely0d/image/upload/v1761466359/Generated_Image_October_26_2025_-_3_05PM_1_dh9vui.png',
      color: 'bg-surface-tertiary',
      example: 'Perfect for landing pages'
    },
    {
      id: 'gif_animated',
      name: 'GIF/Animated',
      description: 'Animated image or video thumbnail to attract attention',
      icon: '🎬',
      thumbnail: 'https://res.cloudinary.com/db9vely0d/image/upload/v1761466359/Generated_Image_October_26_2025_-_3_08PM_fhvfwq.png',
      color: 'bg-surface',
      example: 'Boost engagement in ads'
    },
    {
      id: 'close_up',
      name: 'Close-up Shot',
      description: 'Detailed close-up photo highlighting material and texture',
      icon: '🔍',
      thumbnail: 'https://res.cloudinary.com/db9vely0d/image/upload/v1761466359/Generated_Image_October_26_2025_-_3_07PM_e4npmw.png',
      color: 'bg-surface-secondary',
      example: 'Showcase product quality'
    },
    {
      id: 'ugc_style',
      name: 'UGC Style',
      description: 'User-generated content style, natural and authentic',
      icon: '📱',
      thumbnail: 'https://res.cloudinary.com/db9vely0d/image/upload/v1761466359/Generated_Image_October_26_2025_-_3_06PM_z0jsdg.png',
      color: 'bg-surface-tertiary',
      example: 'Build trust with real-life vibes'
    },
  ];

  const handleSuccess = () => {
    // Reload the page to show new thumbnail
    window.location.reload();
  };

  return (
    <BlockStack gap="400">
      {/* Header */}
      <InlineStack align="space-between" blockAlign="center">
        <BlockStack gap="200">
          <Text variant="headingMd" as="h2">
            Thumbnail Optimization
          </Text>
          <Text variant="bodyMd" color="subdued">
            Optimize your product thumbnail with AI-powered styles
          </Text>
        </BlockStack>
        <Button 
          primary
          onClick={() => setCreateModalActive(true)}
        >
          Create Thumbnail
        </Button>
      </InlineStack>

      {/* Current Thumbnail Display */}
      <Card>
        <Box padding="400">
          <BlockStack gap="400">
            <Text variant="headingSm" as="h3">
              Current Thumbnail
            </Text>
            
            {currentThumbnail ? (
              <Box 
                padding="400" 
                background="bg-surface-secondary" 
                borderRadius="200"
              >
                <InlineStack align="center" blockAlign="center">
                  <Box 
                    style={{ 
                      width: '300px', 
                      height: '300px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f6f6f7',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  >
                    <img 
                      src={currentThumbnail} 
                      alt={product.title}
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }} 
                    />
                  </Box>
                </InlineStack>
              </Box>
            ) : (
              <Box 
                padding="800" 
                background="bg-surface-secondary" 
                borderRadius="200"
              >
                <BlockStack gap="200" inlineAlign="center">
                  <Icon source={ImageIcon} tone="subdued" />
                  <Text variant="bodyMd" color="subdued" alignment="center">
                    No thumbnail available
                  </Text>
                </BlockStack>
              </Box>
            )}
            
            <InlineStack align="center">
              <Button 
                primary 
                size="large"
                onClick={() => setOptimizeModalActive(true)}
              >
                Optimize Thumbnail
              </Button>
            </InlineStack>
          </BlockStack>
        </Box>
      </Card>

      {/* Optimize Thumbnail Modal - Compare multiple variants */}
      <OptimizeThumbnailModal
        active={optimizeModalActive}
        onClose={() => setOptimizeModalActive(false)}
        product={product}
        styles={styles}
        onSuccess={handleSuccess}
      />

      {/* Create Thumbnail Modal - 2 column layout */}
      <CreateThumbnailModal
        active={createModalActive}
        onClose={() => setCreateModalActive(false)}
        product={product}
        styles={styles}
        settings={settings}
        onSuccess={handleSuccess}
      />

      {/* Info Banner */}
      <Banner tone="info">
        <BlockStack gap="200">
          <Text variant="bodyMd" fontWeight="semibold">
            💡 Tip: Optimize your thumbnail
          </Text>
          <Text variant="bodySm">
            A professional thumbnail can increase your click-through rate by up to 40%. Choose a style that matches your brand and target audience.
          </Text>
        </BlockStack>
      </Banner>
    </BlockStack>
  );
};

export default ThumbnailOptimizationTab;
