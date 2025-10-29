import React, { useState } from 'react';
import {
  Modal,
  BlockStack,
  Text,
  Box,
  InlineStack,
  Badge,
  Spinner,
  Button,
  Icon,
} from '@shopify/polaris';
import { ImageIcon } from '@shopify/polaris-icons';

const CreateThumbnailModal = ({ 
  active, 
  onClose, 
  product,
  styles,
  settings,
  onSuccess 
}) => {
  const [selectedStyle, setSelectedStyle] = useState('studio_shot');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [applyingThumbnail, setApplyingThumbnail] = useState(false);

  const currentThumbnail = product.featuredMedia || (product.images && product.images[0]?.url) || '';

  // Handle tooltip positioning
  const handleCardMouseEnter = (e) => {
    const card = e.currentTarget;
    const tooltip = card.querySelector('.style-tooltip');
    if (!tooltip) return;
    
    const cardRect = card.getBoundingClientRect();
    const tooltipWidth = 520;
    const gap = 16;
    
    // Position tooltip to the right of the card
    tooltip.style.left = `${cardRect.right + gap}px`;
    tooltip.style.top = `${cardRect.top + (cardRect.height / 2)}px`;
    tooltip.style.transform = 'translateY(-50%)';
  };

  const handleGenerate = async () => {
    console.log('🎨 Generating thumbnail with style:', selectedStyle);
    console.log('⚙️  Using settings:', settings);
    
    setIsGenerating(true);
    
    try {
      // Get the style key for API
      const styleMap = {
        'studio_shot': 'studio',
        'lifestyle_shot': 'lifestyle',
        'infographic': 'infographic',
        'gif_animated': 'motion',
        'close_up': 'closeup',
        'ugc_style': 'ugc'
      };
      const selectedStyleKey = styleMap[selectedStyle] || 'studio';
      
      console.log('📋 Selected Image Type:', {
        id: selectedStyle,
        apiKey: selectedStyleKey,
        name: styles.find(s => s.id === selectedStyle)?.name || 'Unknown'
      });

      // Step 1: Generate prompts using /api/product-optimize/generate-image
      const step1Data = {
        productTitle: product.title,
        productImages: [currentThumbnail],
        productDescription: product.descriptionHtml || '',
        language: 'en',
        market: 'us',
        // Add selected style for informational purposes (API will generate all 6 styles)
        requestedStyle: selectedStyleKey
      };

      // Add data based on settings (from product detail)
      if (settings) {
        // Check if using segmentation
        if (settings.useSegmentation && settings.segmentationData) {
          step1Data.segmentation = settings.segmentationData;
          console.log('🎯 Using segmentation data from settings');
        } else {
          // Use manual inputs from settings
          if (settings.keywords && settings.keywords.length > 0) {
            step1Data.keywords = settings.keywords;
          }
          if (settings.persona && settings.persona.trim()) {
            step1Data.persona = settings.persona.trim();
          }
          if (settings.painpoints && settings.painpoints.length > 0) {
            step1Data.painpoints = settings.painpoints;
          }
          if (settings.tone && settings.tone.trim()) {
            step1Data.tone = settings.tone.trim();
          }
          if (settings.keyFeature && settings.keyFeature.trim()) {
            step1Data.keyFeature = settings.keyFeature.trim();
          }
          console.log('📝 Using manual settings:', {
            keywords: settings.keywords,
            persona: settings.persona,
            painpoints: settings.painpoints,
            tone: settings.tone,
            keyFeature: settings.keyFeature
          });
        }
      }

      console.log('📤 Step 1 - Generating prompts for ALL 6 styles...', step1Data);
      
      const step1Response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step1Data)
      });
      
      const step1Result = await step1Response.json();
      
      if (!step1Result.success) {
        throw new Error(step1Result.error || 'Failed to generate prompts');
      }

      console.log('✅ Step 1 complete - All 6 style prompts generated:', step1Result.data);
      console.log(`🎯 Will use "${selectedStyleKey}" style prompt for image generation`);

      // Step 2: Generate image using the prompt for selected style
      const prompt = step1Result.data.styles[selectedStyleKey];
      const bestImageUrl = step1Result.data.bestImageUrl || currentThumbnail;

      console.log('📤 Step 2 - Generating image with selected style...');
      console.log('🎨 Style:', selectedStyleKey);
      console.log('🖼️  Best Image:', bestImageUrl);
      console.log('📝 Prompt:', prompt);

      const step2Response = await fetch('/api/generate-image-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          originalImageUrl: bestImageUrl,
          style: selectedStyleKey,
          techSettings: step1Result.data.tech_settings
        })
      });
      
      const step2Result = await step2Response.json();
      
      if (step2Result.success && step2Result.data.generatedImage) {
        const imageUrl = step2Result.data.generatedImage;
        
        // Check if image is base64 data URL or HTTP URL
        const isBase64 = imageUrl.startsWith('data:image/');
        const isHttpUrl = imageUrl.startsWith('http');
        
        console.log('✅ Image generated successfully for style:', selectedStyleKey);
        console.log('📷 Image format:', isBase64 ? 'Base64 Data URL' : isHttpUrl ? 'HTTP URL' : 'Unknown');
        console.log('📏 Image size:', isBase64 ? `${(imageUrl.length / 1024).toFixed(2)} KB` : 'N/A');
        
        if (!isBase64 && !isHttpUrl) {
          console.warn('⚠️ Unknown image format, attempting to use anyway');
        }
        
        setGeneratedImage({
          url: imageUrl,
          id: `generated_${Date.now()}`,
          isBase64: isBase64,
          style: selectedStyleKey
        });
      } else {
        throw new Error(step2Result.error || 'Failed to generate image');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert(`Failed to generate thumbnail: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseImage = async () => {
    if (!generatedImage) {
      alert('No image to use');
      return;
    }

    console.log('🖼️ Using generated thumbnail:', generatedImage);
    
    setApplyingThumbnail(true);
    
    try {
      const formData = new FormData();
      formData.append('productId', product.id);
      formData.append('thumbnailUrl', generatedImage.url);
      formData.append('variantId', generatedImage.id);
      
      const response = await fetch('/api/set-thumbnail', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Thumbnail set successfully');
        alert('Thumbnail updated successfully!');
        handleClose();
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
    setGeneratedImage(null);
    setSelectedStyle('studio_shot');
    onClose();
  };

  return (
    <>
      {/* Custom CSS to override Polaris Modal max-width */}
      <style>{`
        /* Override Polaris Modal to prevent scrolling */
        .Polaris-Modal-Dialog__Modal {
          max-width: 80rem !important;
          width: 80% !important;
        }
        
        .Polaris-Modal-Dialog {
          max-width: 100rem !important;
          width: 100% !important;
        }
        
        /* CRITICAL: Prevent Modal from creating scroll */
        .Polaris-Modal-Dialog__Container {
          overflow: hidden !important;
        }
        
        .Polaris-Modal-Body {
          overflow: hidden !important;
          max-height: none !important;
        }
        
        .Polaris-Modal-Section {
          overflow: hidden !important;
          max-height: none !important;
        }
        
        /* Ensure output column doesn't create scroll */
        .output-column {
          overflow: hidden !important;
          height: 100% !important;
        }
        
        .output-column .Polaris-BlockStack {
          overflow: hidden !important;
        }
        
        /* Style card hover effects */
        .style-card {
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 8px;
          overflow: visible;
        }
        
        .style-card:hover .style-icon-circle {
          border-color: #008060;
          background: linear-gradient(135deg, #f0faf7 0%, #e3f5ef 100%);
        }
        
        .style-card:hover {
          z-index: 1000;
        }
        
        .style-card.selected .style-icon-circle {
          border: 3px solid #008060;
          box-shadow: 0 0 0 4px rgba(0, 128, 96, 0.15);
        }
        
        .style-icon-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          background: linear-gradient(135deg, #f6f6f7 0%, #e3e5e7 100%);
          border: 2px solid #e1e3e5;
          margin: 0 auto;
          transition: all 0.2s ease;
        }
        
        .style-card.selected .style-icon-circle {
          border-color: #008060;
          background: linear-gradient(135deg, #e8f5f2 0%, #d0ebe4 100%);
        }
        
        /* Enhanced Tooltip - Side Position */
        .style-tooltip {
          position: fixed;
          left: auto;
          right: auto;
          top: auto;
          bottom: auto;
          background: linear-gradient(135deg, rgba(26, 32, 44, 0.96) 0%, rgba(45, 55, 72, 0.96) 100%);
          color: white;
          padding: 0;
          border-radius: 12px;
          font-size: 13px;
          white-space: normal;
          width: 520px;
          text-align: left;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 99999;
          line-height: 1.5;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }
        
        /* Tooltip Arrow - Left Side */
        .style-tooltip::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 50%;
          transform: translateY(-50%);
          border: 8px solid transparent;
          border-right-color: rgba(26, 32, 44, 0.96);
          filter: drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.1));
        }
        
        .style-card:hover .style-tooltip {
          opacity: 1;
          visibility: visible;
        }
        
        .tooltip-preview-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
        }
        
        .tooltip-preview-section {
          flex: 1;
          text-align: center;
        }
        
        .tooltip-preview-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .tooltip-preview-image {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 8px;
          background: linear-gradient(135deg, #f6f6f7 0%, #e3e5e7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }
        
        .tooltip-preview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .tooltip-preview-icon {
          font-size: 48px;
          opacity: 0.8;
        }
        
        .tooltip-arrow-divider {
          font-size: 24px;
          color: #a1e3cb;
          animation: pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        .tooltip-content {
          padding: 16px 20px;
        }
        
        .tooltip-title {
          font-weight: 600;
          font-size: 15px;
          margin-bottom: 8px;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 8px;
        }
        
        .tooltip-description {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 10px;
        }
        
        .tooltip-example {
          font-size: 11px;
          color: #a1e3cb;
          font-style: italic;
          padding: 8px 12px;
          background: rgba(161, 227, 203, 0.1);
          border-radius: 6px;
          border-left: 3px solid #a1e3cb;
        }
        
        .style-name {
          text-align: center;
          margin-top: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #202223;
          min-height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Left Panel Layout */
        .left-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .type-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding-right: 8px;
          margin-bottom: 8px;
        }
        
        .generate-button-container {
          position: sticky;
          bottom: 0;
          background: white;
          padding: 16px 0;
          border-top: 1px solid #e1e3e5;
          z-index: 5;
        }
        
        .settings-scroll-area::-webkit-scrollbar {
          width: 6px;
        }
        
        .settings-scroll-area::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .settings-scroll-area::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .settings-scroll-area::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
      
      <Modal
        open={active}
        onClose={handleClose}
        title="Create Thumbnail"
        large
        primaryAction={
          generatedImage
            ? {
                content: 'Use This Thumbnail',
                onAction: handleUseImage,
                loading: applyingThumbnail,
              }
            : undefined
        }
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleClose,
          },
        ]}
      >
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', gap: '40px', minHeight: '500px', width: '100%', maxWidth: '100rem', margin: '0 auto' }}>
            {/* Left Column - Settings (28%) */}
            <div
              style={{
                flex: '0 0 35%',
                borderRight: '1px solid #e1e3e5',
                paddingRight: '32px',
                height: '100%',
                overflowY: 'auto',
                overflowX: 'visible'
              }}
            >
              {/* Image Type Header */}
              <div style={{ marginBottom: '16px' }}>
                <Text variant="headingSm" as="h3">
                  Image Type
                </Text>
              </div>

              {/* Image Type Cards grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
                overflow: 'visible',
                marginBottom: '24px'
              }}>
                {styles.map((style) => (
                    <div
                      key={style.id}
                      className={`style-card ${selectedStyle === style.id ? 'selected' : ''}`}
                      onClick={() => setSelectedStyle(style.id)}
                      onMouseEnter={handleCardMouseEnter}
                    >
                      <div className="style-icon-circle">
                        {style.thumbnail ? (
                          <img 
                            src={style.thumbnail} 
                            alt={style.name}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              borderRadius: '50%'
                            }} 
                          />
                        ) : (
                          <span>{style.icon}</span>
                        )}
                      </div>
                      <div className="style-name">{style.name}</div>
                      
                      {/* Enhanced Tooltip with Before/After Preview */}
                      <div className="style-tooltip">
                        {/* Before/After Preview Section */}
                        <div className="tooltip-preview-container">
                          {/* Original Image */}
                          <div className="tooltip-preview-section">
                            <div className="tooltip-preview-label">Original</div>
                            <div className="tooltip-preview-image">
                              <img 
                                src="https://res.cloudinary.com/db9vely0d/image/upload/v1761470483/Sb7f0ee0ee3de46dc8f81851944daf58bO.jpg_960x960q75.jpg__gaa9cd.avif" 
                                alt="Original product"
                              />
                            </div>
                          </div>
                          
                          {/* Arrow Divider */}
                          <div className="tooltip-arrow-divider">→</div>
                          
                          {/* Styled Image */}
                          <div className="tooltip-preview-section">
                            <div className="tooltip-preview-label">{style.name}</div>
                            <div className="tooltip-preview-image">
                              {style.thumbnail ? (
                                <img 
                                  src={style.thumbnail} 
                                  alt={style.name}
                                />
                              ) : (
                                <span className="tooltip-preview-icon">{style.icon}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="tooltip-content">
                          <div className="tooltip-title">
                            {style.name}
                          </div>
                          <div className="tooltip-description">
                            {style.description}
                          </div>
                          <div className="tooltip-example">
                            💡 {style.example}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

          {/* Right Column - Output (65%) */}
          <div className="output-column" style={{ flex: '0 0 calc(65% - 40px)', height: '100%', overflow: 'hidden' }}>
            <BlockStack gap="400">
              {/* Title + Button */}
              <InlineStack align="space-between" blockAlign="center">
                <Text variant="headingMd" as="h3">
                  Output Preview
                </Text>
                <Button
                  primary
                  size="medium"
                  onClick={handleGenerate}
                  loading={isGenerating}
                >
                  Generate Image
                </Button>
              </InlineStack>

              {/* Output Content */}
              {isGenerating ? (
                <Box padding="800">
                  <BlockStack gap="400" inlineAlign="center">
                    <Spinner size="large" />
                    <Text variant="bodyLg" alignment="center">
                      Generating image...
                    </Text>
                    <Text variant="bodySm" color="subdued" alignment="center">
                      This process may take 10-30 seconds
                    </Text>
                  </BlockStack>
                </Box>
              ) : generatedImage ? (
                  <BlockStack gap="400" inlineAlign="center">
                    <Box
                      style={{
                        width: '700px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f6f6f7',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '2px solid #e1e3e5',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                    <img
                      src={generatedImage.url}
                      alt="Generated thumbnail"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        console.error('❌ Image load error for:', generatedImage.url?.substring(0, 100) + '...');
                        console.error('Image type:', generatedImage.isBase64 ? 'Base64' : 'URL');
                        e.target.style.display = 'none';
                        alert('Failed to load generated image. Please check console for details.');
                      }}
                      onLoad={() => {
                        console.log('✅ Image loaded successfully');
                      }}
                    />
                  </Box>
                  
                  <InlineStack gap="200" blockAlign="center">
                    <Badge tone="success" size="large">✓ Generated successfully</Badge>
                    {generatedImage.isBase64 && (
                      <Badge tone="info" size="medium">Base64 Format</Badge>
                    )}
                    {generatedImage.style && (
                      <Badge tone="magic" size="medium">Style: {generatedImage.style}</Badge>
                    )}
                  </InlineStack>
                  
                  <InlineStack gap="200">
                    <Button onClick={handleGenerate} loading={isGenerating}>
                      Regenerate
                    </Button>
                    {generatedImage.isBase64 ? (
                      <Button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = generatedImage.url;
                          link.download = `thumbnail-${generatedImage.style || 'generated'}-${Date.now()}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          console.log('📥 Downloaded base64 image');
                        }}
                      >
                        Download Image
                      </Button>
                    ) : (
                      <Button onClick={() => window.open(generatedImage.url, '_blank')}>
                        View full size
                      </Button>
                    )}
                  </InlineStack>
                </BlockStack>
              ) : (
                  <Box 
                    padding="800" 
                    background="bg-surface-secondary" 
                    borderRadius="200"
                    style={{ width: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}
                  >
                  <BlockStack gap="300" inlineAlign="center">
                    <Icon source={ImageIcon} tone="subdued" />
                    <Text variant="bodyLg" color="subdued" alignment="center">
                      No image generated yet
                    </Text>
                    <Text variant="bodySm" color="subdued" alignment="center">
                      Select an image type and click "Generate Image"
                    </Text>
                  </BlockStack>
                </Box>
              )}
            </BlockStack>
          </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateThumbnailModal;

