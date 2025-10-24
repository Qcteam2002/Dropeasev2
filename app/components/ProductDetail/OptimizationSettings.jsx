import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Card,
  TextField,
  Select,
  Button,
  BlockStack,
  Text,
  Box,
  InlineStack,
  Divider,
  Spinner,
  Tag,
  TextContainer,
  LegacyStack,
  Tooltip,
  Toast,
  Badge,
  ButtonGroup,
  Icon,
  ChoiceList,
  Modal,
} from '@shopify/polaris';
import { InfoIcon } from '@shopify/polaris-icons';
import { useFetcher } from '@remix-run/react';

const OptimizationSettings = ({ 
  settings, 
  onSettingsChange, 
  onSaveSettings,
  product, // Add product prop for API calls
  selectedSegment,
  onSegmentChange
}) => {
  const [localSettings, setLocalSettings] = useState({
    targetMarket: 'us',
    languageOutput: 'en-US',
    keywords: [],
    persona: '',
    painpoints: [],
    tone: 'friendly',
    optimizationType: 'keyword',
    ...settings
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [availableKeywords, setAvailableKeywords] = useState([]);
  const [availablePersonas, setAvailablePersonas] = useState([]);
  const [availablePainpoints, setAvailablePainpoints] = useState([]);
  const [availableSegments, setAvailableSegments] = useState([]);
  const [localSelectedSegment, setLocalSelectedSegment] = useState('');
  const [isLoadingSegmentation, setIsLoadingSegmentation] = useState(false);
  const [toast, setToast] = useState({ active: false, message: "" });
  const [selectedTab, setSelectedTab] = useState(1); // 0 = Manual, 1 = Audience Insight (default)
  const [modalActive, setModalActive] = useState(false);
  const [selectedSegmentDetail, setSelectedSegmentDetail] = useState(null);

  // Text input states for manual entry
  const [keywordsText, setKeywordsText] = useState('');
  const [personaText, setPersonaText] = useState('');
  const [painpointsText, setPainpointsText] = useState('');

  const fetcher = useFetcher();
  const loadFetcher = useFetcher();
  const saveFetcher = useFetcher();

  // Track current product ID to detect changes
  const [currentProductId, setCurrentProductId] = useState(null);

  // Load settings from database when product changes
  useEffect(() => {
    if (product?.id && product.id !== currentProductId) {
      console.log('🔄 Product changed, loading settings from database for product:', product.id);
      
      // Clear old data first
      setAvailableKeywords([]);
      setAvailablePersonas([]);
      setAvailablePainpoints([]);
      setAvailableSegments([]);
      setLocalSelectedSegment('');
      
      // Update current product ID
      setCurrentProductId(product.id);
      
      // Load new data from database
      loadFetcher.load(`/api/optimization-settings/load/${product.id}`);
    }
  }, [product?.id]);

  // Handle loaded settings from database
  useEffect(() => {
    if (loadFetcher.data?.success && loadFetcher.data?.data) {
      const dbSettings = loadFetcher.data.data;
      console.log('✅ Loaded settings from database:', dbSettings);
      
      // Update local settings
      setLocalSettings(prev => ({
        ...prev,
        keywords: dbSettings.keywords || [],
        persona: dbSettings.persona || '',
        painpoints: dbSettings.painpoints || [],
        tone: dbSettings.tone || prev.tone,
        targetMarket: dbSettings.targetMarket || prev.targetMarket,
        languageOutput: dbSettings.languageOutput || prev.languageOutput,
        optimizationType: dbSettings.optimizationType || prev.optimizationType,
      }));
      
      // Restore market insights if available
      if (dbSettings.marketInsights) {
        console.log('📊 Restoring market insights:', dbSettings.marketInsights);
        setAvailableKeywords(dbSettings.marketInsights.keywords || []);
        setAvailablePersonas(dbSettings.marketInsights.personas || []);
        setAvailablePainpoints(dbSettings.marketInsights.painpoints || []);
      }
      
      // Restore segmentations if available
      if (dbSettings.segmentations) {
        console.log('📊 Restoring segmentations:', dbSettings.segmentations.length, 'segments');
        setAvailableSegments(dbSettings.segmentations);
      }
      
      // Restore selected segment if available
      if (dbSettings.selectedSegment) {
        console.log('✅ Restoring selected segment:', dbSettings.selectedSegment);
        setLocalSelectedSegment(dbSettings.selectedSegment);
        // Find and notify parent of selected segment
        const segment = dbSettings.segmentations?.find(s => s.name === dbSettings.selectedSegment);
        if (segment && onSegmentChange) {
          onSegmentChange(segment);
        }
      }
    }
  }, [loadFetcher.data]);

  const handleFieldChange = useCallback((field, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle save settings - defined early for use in other functions
  const handleSaveSettings = useCallback(async () => {
    if (!product?.id) {
      setToast({ active: true, message: "Product ID is required" });
      return;
    }

    setIsSaving(true);
    
    // Prepare settings data to save
    const settingsData = {
      keywords: localSettings.keywords,
      persona: localSettings.persona,
      painpoints: localSettings.painpoints,
      tone: localSettings.tone,
      targetMarket: localSettings.targetMarket,
      languageOutput: localSettings.languageOutput,
      optimizationType: localSettings.optimizationType,
      marketInsights: availableKeywords.length > 0 || availablePersonas.length > 0 || availablePainpoints.length > 0 ? {
        keywords: availableKeywords,
        personas: availablePersonas,
        painpoints: availablePainpoints,
      } : null,
      segmentations: availableSegments.length > 0 ? availableSegments : null,
      selectedSegment: localSelectedSegment || null,
    };

    console.log('💾 Saving settings to database:', settingsData);

    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("settings", JSON.stringify(settingsData));

    saveFetcher.submit(formData, { 
      method: "post", 
      action: "/api/optimization-settings/save" 
    });
  }, [product?.id, localSettings, availableKeywords, availablePersonas, availablePainpoints, availableSegments, localSelectedSegment, saveFetcher]);

  // Update parent when settings change
  useEffect(() => {
    onSettingsChange(localSettings);
  }, [localSettings, onSettingsChange]);

  // Sync text inputs with localSettings
  useEffect(() => {
    setKeywordsText(localSettings.keywords.join(', '));
    setPersonaText(localSettings.persona);
    setPainpointsText(localSettings.painpoints.join(', '));
  }, [localSettings.keywords, localSettings.persona, localSettings.painpoints]);

  // Convert text inputs to arrays when needed (for API calls)
  useEffect(() => {
    const keywords = keywordsText.split(',').map(k => k.trim()).filter(Boolean);
    const painpoints = painpointsText.split(',').map(p => p.trim()).filter(Boolean);
    
    // Only update if different to avoid infinite loops
    if (JSON.stringify(keywords) !== JSON.stringify(localSettings.keywords)) {
      handleFieldChange('keywords', keywords);
    }
    if (personaText !== localSettings.persona) {
      handleFieldChange('persona', personaText);
    }
    if (JSON.stringify(painpoints) !== JSON.stringify(localSettings.painpoints)) {
      handleFieldChange('painpoints', painpoints);
    }
  }, [keywordsText, personaText, painpointsText, localSettings.keywords, localSettings.persona, localSettings.painpoints, handleFieldChange]);

  // Handle fetcher data changes
  useEffect(() => {
    if (fetcher.data?.success) {
      console.log('=== FETCHER DATA SUCCESS ===');
      console.log('Fetcher data:', fetcher.data);
      
      const data = fetcher.data.data || fetcher.data;
      
      // Handle market insights data
      if (data.keywords || data.personas || data.painpoints) {
        console.log('Processing market insights data:', data);
        
        // Process keywords with metrics
        const processedKeywords = data.keywords?.map(keyword => {
          if (typeof keyword === 'string') {
            return keyword;
          } else if (keyword.keyword) {
            return {
              keyword: keyword.keyword,
              type: keyword.type,
              metrics: keyword.metrics
            };
          }
          return keyword;
        }) || [];
        
        setAvailableKeywords(processedKeywords);
        setAvailablePersonas(data.personas || []);
        setAvailablePainpoints(data.painpoints || []);
        
        setToast({ active: true, message: "Market insights loaded successfully! Auto-saving..." });
        setIsLoadingInsights(false);
        
        // Auto-save to database
        setTimeout(() => {
          handleSaveSettings();
        }, 500);
      }
      
      // Handle segmentation data
      if (data.segmentations) {
        console.log('Processing segmentation data:', data);
        
        setAvailableSegments(data.segmentations);
        
        setToast({ active: true, message: "Market segmentation loaded successfully! Auto-saving..." });
        setIsLoadingSegmentation(false);
        
        // Auto-save to database
        setTimeout(() => {
          handleSaveSettings();
        }, 500);
      }
    } else if (fetcher.data?.error) {
      console.error('Fetcher error:', fetcher.data);
      setToast({ active: true, message: `Error: ${fetcher.data.error}` });
      setIsLoadingInsights(false);
      setIsLoadingSegmentation(false);
    }
  }, [fetcher.data, product?.id]);

  // Handle text input changes (keep as text, don't convert immediately)
  const handleKeywordsTextChange = useCallback((value) => {
    setKeywordsText(value);
  }, []);

  const handlePersonaTextChange = useCallback((value) => {
    setPersonaText(value);
  }, []);

  const handlePainpointsTextChange = useCallback((value) => {
    setPainpointsText(value);
  }, []);

  const handleGetMarketInsights = async () => {
    if (!product) {
      setToast({ active: true, message: "Product information required for market insights" });
      return;
    }

    setIsLoadingInsights(true);
    
    const formData = new FormData();
    formData.append("productTitle", product.title);
    formData.append("productDescription", product.descriptionHtml || product.description || "");
    formData.append("productId", product.id);
    
    // Add target market and language from current settings
    if (localSettings.targetMarket) {
      formData.append("targetMarket", localSettings.targetMarket);
    }
    if (localSettings.languageOutput) {
      formData.append("languageOutput", localSettings.languageOutput);
    }

    fetcher.submit(formData, { 
      method: "post", 
      action: "/api/market-insights" 
    });
  };

  const handleGetSegmentation = async () => {
    if (!product) {
      setToast({ active: true, message: "Product information required for segmentation" });
      return;
    }

    setIsLoadingSegmentation(true);
    
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.descriptionHtml || product.description || "");
    formData.append("productId", product.id);
    formData.append("targetMarket", localSettings.targetMarket || "vi");
    formData.append("language", localSettings.languageOutput || "vi-VN");
    formData.append("productType", "Accessory"); // Default, can be enhanced later
    formData.append("brandTone", localSettings.tone || "friendly");
    
    // Add product images if available
    if (product.images && product.images.length > 0) {
      product.images.forEach((img, index) => {
        if (img && (img.url || img.src)) {
          formData.append(`images[${index}]`, img.url || img.src);
        }
      });
    }

    fetcher.submit(formData, { 
      method: "post", 
      action: "/api/segmentation" 
    });
  };

  // Handle save response (handleSaveSettings defined above as useCallback)
  useEffect(() => {
    if (saveFetcher.data) {
      setIsSaving(false);
      if (saveFetcher.data.success) {
        setToast({ active: true, message: "Settings saved successfully to database!" });
      } else {
        setToast({ active: true, message: saveFetcher.data.error || "Failed to save settings" });
      }
    }
  }, [saveFetcher.data]);

  const handleViewSegmentDetail = (segment) => {
    setSelectedSegmentDetail(segment);
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
    setSelectedSegmentDetail(null);
  };

  // Auto-save when selected segment changes
  useEffect(() => {
    if (localSelectedSegment && availableSegments.length > 0 && product?.id) {
      console.log('💾 Selected segment changed, auto-saving to database...');
      setTimeout(() => {
        handleSaveSettings();
      }, 500);
    }
  }, [localSelectedSegment]);

  // Options
  const targetMarketOptions = [
    { label: '🇻🇳 Vietnam', value: 'vi' },
    { label: '🇺🇸 United States', value: 'us' },
    { label: '🇮🇩 Indonesia', value: 'id' },
    { label: '🇹🇭 Thailand', value: 'th' },
    { label: '🇲🇾 Malaysia', value: 'my' },
    { label: '🇵🇭 Philippines', value: 'ph' },
    { label: '🇸🇬 Singapore', value: 'sg' },
    { label: '🇯🇵 Japan', value: 'jp' },
    { label: '🇰🇷 South Korea', value: 'kr' },
    { label: '🇦🇺 Australia', value: 'au' },
  ];

  const languageOutputOptions = [
    { label: '🇺🇸 English (US)', value: 'en-US' },
    { label: '🇬🇧 English (UK)', value: 'en-GB' },
    { label: '🇻🇳 Tiếng Việt', value: 'vi-VN' },
    { label: '🇫🇷 Français', value: 'fr-FR' },
    { label: '🇩🇪 Deutsch', value: 'de-DE' },
    { label: '🇪🇸 Español', value: 'es-ES' },
    { label: '🇮🇹 Italiano', value: 'it-IT' },
    { label: '🇵🇹 Português', value: 'pt-PT' },
    { label: '🇳🇱 Nederlands', value: 'nl-NL' },
    { label: '🇷🇺 Русский', value: 'ru-RU' },
    { label: '🇯🇵 日本語', value: 'ja-JP' },
    { label: '🇰🇷 한국어', value: 'ko-KR' },
    { label: '🇨🇳 中文', value: 'zh-CN' },
  ];

  const optimizationTypeOptions = [
    { label: 'Keyword SEO', value: 'keyword' },
    { label: 'PAS Model', value: 'pas' },
    { label: 'AIDA Model', value: 'aida' },
    { label: 'Professional E-commerce', value: 'professional' },
  ];

  const toneOptions = [
    { label: 'Friendly & Casual', value: 'friendly' },
    { label: 'Professional', value: 'professional' },
    { label: 'Luxury & Premium', value: 'luxury' },
    { label: 'Minimal & Clean', value: 'minimal' },
    { label: 'Technical & Expert', value: 'technical' },
    { label: 'Playful & Fun', value: 'playful' },
  ];

  return (
    <Card>
      <Box padding="400">
        <BlockStack gap="400">
          <InlineStack gap="200" align="start">
            <Text variant="headingMd" as="h2">
              Optimization Settings
            </Text>
            <Tooltip content="Configure your optimization preferences. These settings will be used to generate AI-powered suggestions.">
              <Icon
                source={InfoIcon}
                tone="base"
              />
            </Tooltip>
          </InlineStack>

          {/* Target Market and Language Output */}
          <BlockStack gap="300">
            <Tooltip content="Select the target market for your product">
              <Select
                label="Target Market"
                options={targetMarketOptions}
                value={localSettings.targetMarket}
                onChange={(value) => handleFieldChange('targetMarket', value)}
              />
            </Tooltip>

            <Tooltip content="Choose the language for generated content">
              <Select
                label="Language Output"
                options={languageOutputOptions}
                value={localSettings.languageOutput}
                onChange={(value) => handleFieldChange('languageOutput', value)}
              />
            </Tooltip>
          </BlockStack>

          <Divider />

          {/* Tab Selection */}
          <ButtonGroup variant="segmented" fullWidth>
            <Button
              pressed={selectedTab === 0}
              onClick={() => setSelectedTab(0)}
            >
              Manual
            </Button>
            <Button
              pressed={selectedTab === 1}
              onClick={() => setSelectedTab(1)}
            >
              Audience Insight
            </Button>
          </ButtonGroup>

          {/* Tab Content */}
          {selectedTab === 0 && (
            <BlockStack gap="300">
              <Text variant="headingSm" as="h3">
                Manual Configuration
              </Text>
              
              {/* Get Market Insights Button - Moved from Audience Insight tab */}
              {/* TODO: Uncomment this button when needed in the future */}
              {/* <Button
                primary
                fullWidth
                size="slim"
                onClick={handleGetMarketInsights}
                loading={isLoadingInsights}
                disabled={!product}
              >
                Get Market Insight Suggestion
              </Button> */}
              
              {/* Keywords - TextField */}
              <TextField
                label="Keywords"
                value={keywordsText}
                onChange={handleKeywordsTextChange}
                placeholder="Enter keywords separated by commas"
                autoComplete="off"
                multiline={2}
              />

              {/* Persona - TextField */}
              <TextField
                label="Persona"
                value={personaText}
                onChange={handlePersonaTextChange}
                placeholder="Enter customer persona"
                autoComplete="off"
              />

              {/* Pain Points - TextField */}
              <TextField
                label="Pain Points"
                value={painpointsText}
                onChange={handlePainpointsTextChange}
                placeholder="Enter pain points separated by commas"
                autoComplete="off"
                multiline={2}
              />

              {/* Optimization Type */}
              <Tooltip content="Choose the optimization strategy for content generation">
                <Select
                  label="Optimization Type"
                  options={optimizationTypeOptions}
                  value={localSettings.optimizationType}
                  onChange={(value) => handleFieldChange('optimizationType', value)}
                />
              </Tooltip>

              {/* Content Tone */}
              <Tooltip content="Choose the tone for generated content">
                <Select
                  label="Content Tone"
                  options={toneOptions}
                  value={localSettings.tone}
                  onChange={(value) => handleFieldChange('tone', value)}
                />
              </Tooltip>
            </BlockStack>
          )}

          {selectedTab === 1 && (
            <BlockStack gap="300">
              <Text variant="headingSm" as="h3">
                Market Insights
              </Text>
              
              {/* Get Segmentation Button */}
              <Button
                primary
                fullWidth
                size="slim"
                onClick={handleGetSegmentation}
                loading={isLoadingSegmentation}
                disabled={!product}
              >
                Discover Ideal Buyers
              </Button>
              
              {availableKeywords.length > 0 || availablePersonas.length > 0 || availablePainpoints.length > 0 ? (
                <Box paddingBlockStart="200">
                  <InlineStack gap="200" align="center">
                    <Badge status="success">AI Insights Loaded</Badge>
                    <Text variant="bodySm" color="subdued">
                      {availableKeywords.length} keywords, {availablePersonas.length} personas, {availablePainpoints.length} pain points
                    </Text>
                  </InlineStack>
                </Box>
              ) : null}

              {/* Display Market Insights Data */}
              {availableKeywords.length > 0 && (
                <BlockStack gap="200">
                  <Text variant="bodyMd" fontWeight="semibold">Suggested Keywords:</Text>
                  <Box paddingBlockStart="200">
                    <TextContainer>
                      <LegacyStack>
                        {availableKeywords.slice(0, 5).map((keyword, index) => {
                          const keywordText = typeof keyword === 'string' ? keyword : keyword.keyword;
                          const metrics = typeof keyword === 'object' ? keyword.metrics : null;
                          const type = typeof keyword === 'object' ? keyword.type : 'informational';
                          
                          const getTypeBadge = (type) => {
                            const typeMap = {
                              'informational': { color: '#10B981', text: 'Info' },
                              'comparative': { color: '#3B82F6', text: 'Compare' },
                              'transactional': { color: '#F59E0B', text: 'Buy' },
                              'painpoint_related': { color: '#EF4444', text: 'Pain' }
                            };
                            return typeMap[type] || { color: '#6B7280', text: 'Info' };
                          };
                          
                          const badge = getTypeBadge(type);
                          
                          return (
                            <div key={`suggested-keyword-${index}`} style={{ 
                              marginBottom: '8px',
                              padding: '8px 12px',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '6px',
                              border: '1px solid #e9ecef'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <Tag>
                                  {keywordText}
                                </Tag>
                                <span style={{
                                  fontSize: '9px',
                                  fontWeight: '600',
                                  color: 'white',
                                  backgroundColor: badge.color,
                                  padding: '2px 5px',
                                  borderRadius: '8px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.5px'
                                }}>
                                  {badge.text}
                                </span>
                              </div>
                              {metrics && (
                                <div style={{ 
                                  fontSize: '11px', 
                                  color: '#6B7280', 
                                  marginLeft: '4px',
                                  padding: '4px 6px',
                                  backgroundColor: '#ffffff',
                                  borderRadius: '4px',
                                  border: '1px solid #dee2e6'
                                }}>
                                  Vol: {metrics.volume?.toLocaleString()} | 
                                  CPC: ${metrics.cpc} | 
                                  Comp: {metrics.competition}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </LegacyStack>
                    </TextContainer>
                  </Box>
                </BlockStack>
              )}

              {availablePersonas.length > 0 && (
                <BlockStack gap="200">
                  <Text variant="bodyMd" fontWeight="semibold">Suggested Personas:</Text>
                  <Box paddingBlockStart="200">
                    <TextContainer>
                      <LegacyStack>
                        {availablePersonas.slice(0, 3).map((persona, index) => {
                          const personaText = typeof persona === 'string' ? persona : persona.name;
                          return (
                            <div key={`suggested-persona-${index}`} style={{ 
                              marginBottom: '8px',
                              padding: '8px 12px',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '6px',
                              border: '1px solid #e9ecef'
                            }}>
                              <Tag>{personaText}</Tag>
                            </div>
                          );
                        })}
                      </LegacyStack>
                    </TextContainer>
                  </Box>
                </BlockStack>
              )}

              {availablePainpoints.length > 0 && (
                <BlockStack gap="200">
                  <Text variant="bodyMd" fontWeight="semibold">Suggested Pain Points:</Text>
                  <Box paddingBlockStart="200">
                    <TextContainer>
                      <LegacyStack>
                        {availablePainpoints.slice(0, 3).map((painpoint, index) => (
                          <div key={`suggested-painpoint-${index}`} style={{ 
                            marginBottom: '8px',
                            padding: '8px 12px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '6px',
                            border: '1px solid #e9ecef'
                          }}>
                            <Tag>{painpoint}</Tag>
                          </div>
                        ))}
                      </LegacyStack>
                    </TextContainer>
                  </Box>
                </BlockStack>
              )}

              {/* Market Segmentation */}
              {availableSegments.length > 0 && (
                <BlockStack gap="300">
                  <Text variant="bodyMd" fontWeight="semibold">
                    Ideal Customers ({availableSegments.length} found)
                  </Text>
            <BlockStack gap="300">
              {availableSegments.map((segment, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setLocalSelectedSegment(segment.name);
                    if (onSegmentChange) {
                      onSegmentChange(segment);
                    }
                  }}
                  style={{ 
                    padding: '16px',
                    border: localSelectedSegment === segment.name ? '2px solid #007ace' : '1px solid #e1e3e5',
                    borderRadius: '8px',
                    backgroundColor: localSelectedSegment === segment.name ? '#f0f8ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: '140px',
                    maxHeight: '180px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Header: Name + Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text variant="bodyMd" fontWeight="semibold">{segment.name}</Text>
                    <Badge 
                      status={segment.winRate >= 0.8 ? 'success' : segment.winRate >= 0.6 ? 'attention' : 'info'}
                    >
                      {Math.round(segment.winRate * 100)}% Match
                    </Badge>
                  </div>
                  
                  {/* Pain Point with scroll */}
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto',
                    marginBottom: '8px',
                    paddingRight: '8px'
                  }}>
                    <Text variant="bodySm" color="subdued">
                      <strong>Pain Point:</strong> {segment.painpoint}
                    </Text>
                  </div>
                  
                  {/* View Detail Link */}
                  <div 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleViewSegmentDetail(segment);
                    }}
                    style={{ cursor: 'pointer', display: 'inline-block', marginTop: 'auto' }}
                  >
                    <Text 
                      variant="bodySm" 
                      color="link" 
                      style={{ textDecoration: 'underline' }}
                    >
                      View Detail
                    </Text>
                  </div>
                </div>
              ))}
            </BlockStack>
                </BlockStack>
              )}
            </BlockStack>
          )}

          <InlineStack align="space-between">
            <Text variant="bodySm" color="subdued">
              Click Save to store settings to database
            </Text>
            <Button
              primary
              onClick={handleSaveSettings}
              loading={isSaving || saveFetcher.state === "submitting"}
              size="slim"
            >
              Save Settings
            </Button>
          </InlineStack>
        </BlockStack>
      </Box>
      
      {toast.active && (
        <Toast
          content={toast.message}
          onDismiss={() => setToast({ active: false, message: "" })}
        />
      )}

      <Modal
        open={modalActive}
        onClose={handleCloseModal}
        title="Customer Segment Details"
        primaryAction={{
          content: 'Close',
          onAction: handleCloseModal,
        }}
        large
      >
        <Modal.Section>
          {selectedSegmentDetail && (
            <BlockStack gap="400">
              {/* Header */}
              <BlockStack gap="200">
                <InlineStack gap="200" align="space-between">
                  <Text variant="headingLg" as="h2">
                    {selectedSegmentDetail.name}
                  </Text>
                  <Badge 
                    status={selectedSegmentDetail.winRate >= 0.8 ? 'success' : selectedSegmentDetail.winRate >= 0.6 ? 'attention' : 'info'}
                  >
                    {Math.round(selectedSegmentDetail.winRate * 100)}% Match
                  </Badge>
                </InlineStack>
              </BlockStack>

              <Divider />

              {/* Pain Point */}
              <BlockStack gap="200">
                <Text variant="headingMd" as="h3">Pain Point</Text>
                <Text variant="bodyMd">{selectedSegmentDetail.painpoint}</Text>
              </BlockStack>

              {/* Reason */}
              <BlockStack gap="200">
                <Text variant="headingMd" as="h3">Why This Segment</Text>
                <Text variant="bodyMd">{selectedSegmentDetail.reason}</Text>
              </BlockStack>

              {/* Persona Profile */}
              {selectedSegmentDetail.personaProfile && (
                <BlockStack gap="300">
                  <Text variant="headingMd" as="h3">Customer Profile</Text>
                  
                  <BlockStack gap="200">
                    <Text variant="bodyMd" fontWeight="semibold">Demographics:</Text>
                    <Text variant="bodyMd">{selectedSegmentDetail.personaProfile.demographics}</Text>
                  </BlockStack>

                  <BlockStack gap="200">
                    <Text variant="bodyMd" fontWeight="semibold">Behaviors:</Text>
                    <Text variant="bodyMd">{selectedSegmentDetail.personaProfile.behaviors}</Text>
                  </BlockStack>

                  <BlockStack gap="200">
                    <Text variant="bodyMd" fontWeight="semibold">Motivations:</Text>
                    <Text variant="bodyMd">{selectedSegmentDetail.personaProfile.motivations}</Text>
                  </BlockStack>

                  <BlockStack gap="200">
                    <Text variant="bodyMd" fontWeight="semibold">Communication Channels:</Text>
                    <Text variant="bodyMd">{selectedSegmentDetail.personaProfile.communicationChannels}</Text>
                  </BlockStack>
                </BlockStack>
              )}

              {/* Locations */}
              {selectedSegmentDetail.locations && selectedSegmentDetail.locations.length > 0 && (
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Geographic Locations</Text>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedSegmentDetail.locations.map((location, index) => (
                      <Tag key={index}>{location}</Tag>
                    ))}
                  </div>
                </BlockStack>
              )}

              {/* Seasonal Trends */}
              {selectedSegmentDetail.seasonalTrends && (
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Seasonal Trends</Text>
                  <Text variant="bodyMd">{selectedSegmentDetail.seasonalTrends}</Text>
                </BlockStack>
              )}

              {/* Tone Type */}
              {selectedSegmentDetail.toneType && (
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Tone Type</Text>
                  <Text variant="bodyMd">{selectedSegmentDetail.toneType}</Text>
                </BlockStack>
              )}

              {/* Voice Guideline */}
              {selectedSegmentDetail.voiceGuideline && (
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Voice Guidelines</Text>
                  <Text variant="bodyMd">{selectedSegmentDetail.voiceGuideline}</Text>
                </BlockStack>
              )}

              {/* Product Benefits */}
              {selectedSegmentDetail.productBenefits && selectedSegmentDetail.productBenefits.length > 0 && (
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Product Benefits</Text>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedSegmentDetail.productBenefits.map((benefit, index) => (
                      <Tag key={index}>{benefit}</Tag>
                    ))}
                  </div>
                </BlockStack>
              )}

              {/* Keyword Suggestions */}
              {selectedSegmentDetail.keywordSuggestions && selectedSegmentDetail.keywordSuggestions.length > 0 && (
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Keyword Suggestions</Text>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedSegmentDetail.keywordSuggestions.map((keyword, index) => (
                      <Tag key={index}>{keyword}</Tag>
                    ))}
                  </div>
                </BlockStack>
              )}
            </BlockStack>
          )}
        </Modal.Section>
      </Modal>
    </Card>
  );
};

export default OptimizationSettings;