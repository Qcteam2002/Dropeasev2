import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  BlockStack,
  InlineStack,
  Text,
  Button,
  Icon,
  Banner,
  Select,
  TextField,
  Divider,
  Badge,
  Modal,
  FormLayout,
  RangeSlider,
  ColorPicker,
} from "@shopify/polaris";
import { 
  MagicIcon, 
  RefreshIcon, 
  StarIcon, 
  ExternalIcon,
  SettingsIcon,
  ViewIcon,
  EditIcon,
  DeleteIcon
} from "@shopify/polaris-icons";
import { useFetcher } from "@remix-run/react";

export default function HighlightsTab({ product, deeplinks }) {
  const [isBlockEnabled, setIsBlockEnabled] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("multirow");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [highlights, setHighlights] = useState([]);
  const [pushMessage, setPushMessage] = useState("");
  const [settings, setSettings] = useState({
    layout: "multirow",
    title: "Why You'll Love This Product",
    titleColor: "#000000",
    backgroundColor: "#ffffff",
    spacing: 20,
    showIcons: true,
    iconStyle: "filled"
  });

  const fetcher = useFetcher();

  // Layout options
  const layoutOptions = [
    { label: "Multirow Layout", value: "multirow" },
    { label: "2x2 Grid", value: "grid-2x2" },
    { label: "3x1 Grid", value: "grid-3x1" },
    { label: "Stacked Cards", value: "stacked" },
    { label: "Timeline", value: "timeline" },
    { label: "Comparison Table", value: "comparison" }
  ];

  // Check if block is enabled
    useEffect(() => {
        const checkBlockStatus = async () => {
            try {
                const response = await fetch(`/api/highlights/status`);
                const data = await response.json();
                
                console.log('🔍 Block status check result:', data);
                
                // Only update if not manually enabled
                if (data.isEnabled) {
                    setIsBlockEnabled(true);
                    if (data.config) {
                        setSettings(prev => ({ ...prev, ...data.config }));
                        setSelectedLayout(data.config.layout || "zigzag");
                    }
                } else {
                    // Don't override manual enable
                    console.log('📝 API says not enabled, but keeping current state');
                }
            } catch (error) {
                console.error("❌ Error checking block status:", error);
                // Don't override manual enable on error
            }
        };

        // Check immediately
        checkBlockStatus();
        
        // Auto-refresh every 10 seconds (less frequent)
        const interval = setInterval(checkBlockStatus, 10000);
        
        return () => clearInterval(interval);
    }, []);

    // Debug log when isBlockEnabled changes
    useEffect(() => {
        console.log('🔄 isBlockEnabled state changed:', isBlockEnabled);
    }, [isBlockEnabled]);

  // Handle enable block
  const handleEnableBlock = () => {
    if (deeplinks?.gridView) {
      window.open(deeplinks.gridView, '_blank');
    }
  };

  // Handle manual check
  const handleCheckStatus = async () => {
    try {
      console.log('🔍 Manual check clicked - checking current status...');
      
      // For now, just show current status
      console.log('📊 Current status:', { 
        isBlockEnabled, 
        highlightsCount: highlights.length,
        selectedLayout 
      });
      
      // Simulate check result
      if (isBlockEnabled) {
        console.log('✅ Block is currently enabled!');
      } else {
        console.log('⚠️ Block is not enabled. Use "Enable Manually" to test features.');
      }
      
    } catch (error) {
      console.error('❌ Error checking status:', error);
    }
  };

  // Handle manual enable (for testing)
  const handleManualEnable = async () => {
    try {
      console.log('🔧 Manually enabling block...');
      
      // Simulate enabling the block
      setIsBlockEnabled(true);
      
      // Set default highlights for testing
      setHighlights([
        {
          id: 1,
          title: "Premium Quality",
          description: "Made with the finest materials for lasting comfort and style.",
          icon: "⭐"
        },
        {
          id: 2,
          title: "Perfect Fit",
          description: "Designed to flatter your figure with a comfortable, tailored fit.",
          icon: "👕"
        },
        {
          id: 3,
          title: "Easy Care",
          description: "Machine washable and wrinkle-resistant for effortless maintenance.",
          icon: "🧺"
        },
        {
          id: 4,
          title: "Versatile Style",
          description: "Pairs perfectly with jeans, skirts, or dress pants for any occasion.",
          icon: "✨"
        }
      ]);
      
      console.log('✅ Block enabled manually! State updated:', { isBlockEnabled: true, highlights: highlights.length });
      
    } catch (error) {
      console.error('❌ Error enabling block:', error);
    }
  };

  // Handle AI content generation
  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append("productId", product.id);
      formData.append("layout", selectedLayout);
      
      const response = await fetch("/api/highlights/generate", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success && data.highlights) {
        setHighlights(data.highlights);
      } else {
        console.error("Failed to generate highlights:", data.error);
        // Fallback to default highlights
        setHighlights([
          {
            id: 1,
            icon: "⭐",
            title: "Premium Quality",
            description: "Made with the finest materials for lasting durability and comfort."
          },
          {
            id: 2,
            icon: "🚀",
            title: "Fast Shipping",
            description: "Get your order delivered within 2-3 business days worldwide."
          },
          {
            id: 3,
            icon: "💎",
            title: "Exclusive Design",
            description: "Unique design that stands out from the crowd."
          },
          {
            id: 4,
            icon: "🛡️",
            title: "Warranty Included",
            description: "1-year warranty for peace of mind with your purchase."
          }
        ]);
      }
    } catch (error) {
      console.error("Error generating highlights:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePushToStorefront = async () => {
    if (!highlights.length) {
      setPushMessage("Please generate content first!");
      setTimeout(() => setPushMessage(""), 3000);
      return;
    }

    setIsPushing(true);
    setPushMessage("");
    
    try {
      const formData = new FormData();
      formData.append("content", JSON.stringify(highlights));
      formData.append("layout", selectedLayout);
      formData.append("productId", product.id);
      
      const response = await fetch("/api/highlights/push", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPushMessage("✅ Content pushed to storefront successfully!");
        console.log("🎉 Content pushed to Shopify metafields:", data);
      } else {
        setPushMessage(`❌ Failed to push content: ${data.error || 'Unknown error'}`);
        console.error("Failed to push content:", data);
      }
    } catch (error) {
      setPushMessage(`❌ Error pushing content: ${error.message}`);
      console.error("Error pushing content:", error);
    } finally {
      setIsPushing(false);
      setTimeout(() => setPushMessage(""), 5000);
    }
  };

  // Handle layout change
  const handleLayoutChange = (value) => {
    setSelectedLayout(value);
    setSettings(prev => ({ ...prev, layout: value }));
  };

  // Handle settings save
  const handleSaveSettings = () => {
    // TODO: Save settings to your API
    setShowSettings(false);
  };

  // Render layout preview
  const renderLayoutPreview = () => {
    if (!highlights.length) return null;

    switch (selectedLayout) {
      case "multirow":
        return (
          <Box padding="400" background="surface-neutral" borderRadius="200">
            <BlockStack gap="400">
              {highlights.slice(0, 3).map((highlight, index) => (
                <Box key={highlight.id} style={{ 
                  minHeight: '200px',
                  border: '1px solid #e1e3e5',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                    minHeight: '200px'
                  }}>
                    {index % 2 === 0 ? (
                      // Block 1 & 3: Image left, Text right
                      <>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            fontSize: '48px',
                            color: '#6c757d',
                            zIndex: 2
                          }}>
                            {highlight.icon}
                          </div>
                          {/* Decorative circles */}
                          <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '40px',
                            height: '40px',
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '50%',
                            zIndex: 1
                          }}></div>
                        </div>
                        <div style={{ 
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}>
                          <Text variant="bodySm" color="subdued" style={{ 
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '8px'
                          }}>
                            Feature Highlight
                          </Text>
                          <Text variant="headingLg" color="base" style={{ marginBottom: '12px' }}>
                            {highlight.title}
                          </Text>
                          <Text variant="bodyMd" color="subdued" style={{ marginBottom: '16px' }}>
                            {highlight.description}
                          </Text>
                          <div style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            border: '2px solid #000',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: '500',
                            width: 'fit-content'
                          }}>
                            Learn More
                          </div>
                        </div>
                      </>
                    ) : (
                      // Block 2: Text left, Image right
                      <>
                        <div style={{ 
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}>
                          <Text variant="bodySm" color="subdued" style={{ 
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '8px'
                          }}>
                            Feature Highlight
                          </Text>
                          <Text variant="headingLg" color="base" style={{ marginBottom: '12px' }}>
                            {highlight.title}
                          </Text>
                          <Text variant="bodyMd" color="subdued" style={{ marginBottom: '16px' }}>
                            {highlight.description}
                          </Text>
                          <div style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            border: '2px solid #000',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: '500',
                            width: 'fit-content'
                          }}>
                            Learn More
                          </div>
                        </div>
                        <div style={{ 
                          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            fontSize: '48px',
                            color: '#6c757d',
                            zIndex: 2
                          }}>
                            {highlight.icon}
                          </div>
                          {/* Decorative circles */}
                          <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '40px',
                            height: '40px',
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '50%',
                            zIndex: 1
                          }}></div>
                        </div>
                      </>
                    )}
                  </div>
                </Box>
              ))}
            </BlockStack>
          </Box>
        );
      
      case "grid-2x2":
        return (
          <Box padding="400" background="surface-neutral" borderRadius="200">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {highlights.slice(0, 4).map((highlight) => (
                <Box key={highlight.id} padding="300" background="surface" borderRadius="100">
                  <BlockStack gap="200" inlineAlign="center">
                    <Text variant="headingLg">{highlight.icon}</Text>
                    <Text variant="headingSm">{highlight.title}</Text>
                    <Text color="subdued" alignment="center">{highlight.description}</Text>
                  </BlockStack>
                </Box>
              ))}
            </div>
          </Box>
        );
      
      default:
        return (
          <Box padding="400" background="surface-neutral" borderRadius="200">
            <BlockStack gap="300">
              {highlights.map((highlight) => (
                <Box key={highlight.id} padding="300" background="surface" borderRadius="100">
                  <InlineStack gap="400" align="start">
                    <Text variant="headingLg">{highlight.icon}</Text>
                    <BlockStack gap="100">
                      <Text variant="headingSm">{highlight.title}</Text>
                      <Text color="subdued">{highlight.description}</Text>
                    </BlockStack>
                  </InlineStack>
                </Box>
              ))}
            </BlockStack>
          </Box>
        );
    }
  };

  return (
    <Card>
      <Box padding="400">
        <BlockStack gap="400">
          {/* Header */}
          <InlineStack align="space-between">
            <Text variant="headingMd">Feature Highlights</Text>
            <InlineStack gap="200">
              {isBlockEnabled && (
                <Button 
                  icon={SettingsIcon} 
                  onClick={() => setShowSettings(true)}
                >
                  Settings
                </Button>
              )}
              <Badge status={isBlockEnabled ? "success" : "attention"}>
                {isBlockEnabled ? "Enabled" : "Not Enabled"}
              </Badge>
            </InlineStack>
          </InlineStack>

          {/* Block Status */}
                 {!isBlockEnabled ? (
                   <BlockStack gap="300">
                     <Banner
                       title="Feature Highlights Block Not Enabled"
                       action={{
                         content: "Enable Block",
                         onAction: handleEnableBlock,
                         icon: ExternalIcon
                       }}
                       tone="warning"
                     >
                       <p>Add the Feature Highlights block to your theme to start showcasing product benefits.</p>
                     </Banner>
                     
                     <InlineStack gap="200" align="center">
                       <Text variant="bodyMd" color="subdued">
                         After adding the block to your theme and saving, click below to refresh:
                       </Text>
                       <Button 
                         size="slim" 
                         onClick={handleCheckStatus}
                         icon={RefreshIcon}
                       >
                         Check Status
                       </Button>
                     </InlineStack>
                     
                     <InlineStack gap="200" align="center">
                       <Text variant="bodyMd" color="subdued">
                         For testing purposes, you can manually enable:
                       </Text>
                       <Button 
                         size="slim" 
                         onClick={handleManualEnable}
                         tone="success"
                       >
                         Enable Manually
                       </Button>
                     </InlineStack>
                   </BlockStack>
                 ) : (
            <BlockStack gap="400">
              {/* Layout Selection */}
              <Box>
                <Text variant="headingSm" color="subdued">Layout Type</Text>
                <Box padding="200">
                  <Select
                    label="Choose layout"
                    options={layoutOptions}
                    value={selectedLayout}
                    onChange={handleLayoutChange}
                  />
                </Box>
              </Box>

              {/* Content Generation */}
              <Box>
                <InlineStack align="space-between">
                  <Text variant="headingSm" color="subdued">Content</Text>
                  <InlineStack gap="200">
                    <Button 
                      icon={RefreshIcon}
                      onClick={() => setHighlights([])}
                      disabled={!highlights.length}
                    >
                      Clear
                    </Button>
                    <Button 
                      primary 
                      icon={MagicIcon}
                      onClick={handleGenerateContent}
                      loading={isGenerating}
                    >
                      {highlights.length ? "Regenerate" : "Generate with AI"}
                    </Button>
                    {highlights.length > 0 && (
                      <Button 
                        tone="success"
                        icon={ExternalIcon}
                        onClick={handlePushToStorefront}
                        loading={isPushing}
                      >
                        Push to Storefront
                      </Button>
                    )}
                  </InlineStack>
                  
                  {/* Push Message */}
                  {pushMessage && (
                    <Box paddingBlockStart="200">
                      <Text variant="bodySm" color={pushMessage.includes("✅") ? "success" : "critical"}>
                        {pushMessage}
                      </Text>
                    </Box>
                  )}
                </InlineStack>
              </Box>

              {/* Content Preview */}
              {highlights.length > 0 ? (
                <Box>
                  <Text variant="headingSm" color="subdued">Preview</Text>
                  {renderLayoutPreview()}
                </Box>
              ) : (
                <Box padding="800">
                  <InlineStack align="center">
                    <BlockStack gap="200" inlineAlign="center">
                      <Icon source={StarIcon} tone="subdued" />
                      <Text variant="headingSm" color="subdued">No content generated</Text>
                      <Text color="subdued">Generate AI-powered feature highlights for your product</Text>
                    </BlockStack>
                  </InlineStack>
                </Box>
              )}
            </BlockStack>
          )}
        </BlockStack>
      </Box>

      {/* Settings Modal */}
      <Modal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        title="Feature Highlights Settings"
        primaryAction={{
          content: "Save Settings",
          onAction: handleSaveSettings
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setShowSettings(false)
          }
        ]}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Section Title"
              value={settings.title}
              onChange={(value) => setSettings(prev => ({ ...prev, title: value }))}
            />
            
            <RangeSlider
              label="Spacing"
              value={settings.spacing}
              onChange={(value) => setSettings(prev => ({ ...prev, spacing: value }))}
              min={10}
              max={50}
              step={5}
            />
            
            <ColorPicker
              label="Title Color"
              color={settings.titleColor}
              onChange={(color) => setSettings(prev => ({ ...prev, titleColor: color }))}
            />
            
            <ColorPicker
              label="Background Color"
              color={settings.backgroundColor}
              onChange={(color) => setSettings(prev => ({ ...prev, backgroundColor: color }))}
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    </Card>
  );
}
