import React, { useState } from 'react';
import {
  Card,
  TextField,
  Button,
  BlockStack,
  Text,
  Box,
  InlineStack,
  Badge,
  Spinner,
  Grid,
  Divider,
} from '@shopify/polaris';

const FeatureHighlightTab = ({ 
  product, 
  settings, 
  fetcher 
}) => {
  const [highlights, setHighlights] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newHighlight, setNewHighlight] = useState('');

  const handleGenerateHighlights = async () => {
    if (!settings.primaryKeyword) {
      alert('Please set a primary keyword in settings first');
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate API call - replace with actual API
      const mockHighlights = generateMockHighlights();
      setHighlights(mockHighlights);
    } catch (error) {
      console.error('Error generating highlights:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockHighlights = () => {
    const keyword = settings.primaryKeyword;
    const tone = settings.tone;
    const productTitle = product.title;
    
    const highlights = [];
    
    switch (tone) {
      case 'friendly':
        highlights.push(
          `✨ ${keyword} - Perfect for everyday use`,
          `🎯 High-quality ${keyword} at great value`,
          `🚀 Easy to use ${keyword} solution`,
          `💎 Premium ${keyword} experience`
        );
        break;
      case 'professional':
        highlights.push(
          `Professional-grade ${keyword} technology`,
          `Industry-leading ${keyword} performance`,
          `Advanced ${keyword} features`,
          `Reliable ${keyword} solution`
        );
        break;
      case 'luxury':
        highlights.push(
          `Exclusive ${keyword} collection`,
          `Premium ${keyword} craftsmanship`,
          `Luxury ${keyword} experience`,
          `Sophisticated ${keyword} design`
        );
        break;
      case 'minimal':
        highlights.push(
          `Clean ${keyword} design`,
          `Simple ${keyword} solution`,
          `Essential ${keyword} features`,
          `Minimalist ${keyword} approach`
        );
        break;
      case 'technical':
        highlights.push(
          `Advanced ${keyword} specifications`,
          `Technical ${keyword} excellence`,
          `Precision ${keyword} engineering`,
          `Expert ${keyword} solution`
        );
        break;
      case 'playful':
        highlights.push(
          `Fun ${keyword} experience`,
          `Awesome ${keyword} features`,
          `Cool ${keyword} design`,
          `Exciting ${keyword} adventure`
        );
        break;
      default:
        highlights.push(
          `Quality ${keyword} solution`,
          `Reliable ${keyword} performance`,
          `Great ${keyword} value`,
          `Excellent ${keyword} features`
        );
    }
    
    return highlights.map((highlight, index) => ({
      id: `highlight-${index}`,
      text: highlight,
      isGenerated: true
    }));
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      const highlight = {
        id: `highlight-${Date.now()}`,
        text: newHighlight.trim(),
        isGenerated: false
      };
      setHighlights(prev => [...prev, highlight]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (id) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const handleApplyHighlights = () => {
    // Apply highlights to product
    console.log('Applying highlights:', highlights);
    // TODO: Implement API call to save highlights
  };

  return (
    <BlockStack gap="400">
      <InlineStack align="space-between">
        <BlockStack gap="200">
          <Text variant="headingMd" as="h2">
            Feature Highlights
          </Text>
          <Text variant="bodyMd" color="subdued">
            Create compelling feature highlights to showcase your product
          </Text>
        </BlockStack>
        <Button
          variant="secondary"
          size="micro"
          onClick={handleGenerateHighlights}
          loading={isGenerating}
          disabled={!settings.keywords || settings.keywords.length === 0}
          style={{ 
            height: '28px', 
            padding: '4px 8px',
            fontSize: '12px'
          }}
        >
          {isGenerating ? 'Generating...' : 'Generate Highlights'}
        </Button>
      </InlineStack>

      <Divider />

      <BlockStack gap="300">
        <Text variant="headingSm">Add New Highlight</Text>
        <InlineStack gap="200" align="start">
          <Box style={{ flex: 1 }}>
            <TextField
              value={newHighlight}
              onChange={setNewHighlight}
              placeholder="Enter a feature highlight..."
              multiline={2}
            />
          </Box>
          <Button onClick={handleAddHighlight} disabled={!newHighlight.trim()}>
            Add
          </Button>
        </InlineStack>
      </BlockStack>

      {highlights.length > 0 && (
        <BlockStack gap="300">
          <InlineStack align="space-between">
            <Text variant="headingSm">Current Highlights</Text>
            <Badge status="info">
              {highlights.length} highlights
            </Badge>
          </InlineStack>
          
          <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap="300">
            {highlights.map((highlight) => (
              <Card key={highlight.id} sectioned>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="bodyMd">{highlight.text}</Text>
                    {highlight.isGenerated && (
                      <Badge status="info" size="small">
                        AI
                      </Badge>
                    )}
                  </InlineStack>
                  <Button
                    size="slim"
                    variant="tertiary"
                    onClick={() => handleRemoveHighlight(highlight.id)}
                  >
                    Remove
                  </Button>
                </BlockStack>
              </Card>
            ))}
          </Grid>
        </BlockStack>
      )}

      {highlights.length > 0 && (
        <Button
          primary
          onClick={handleApplyHighlights}
          loading={fetcher?.state === 'submitting'}
        >
          Apply Highlights to Product
        </Button>
      )}
    </BlockStack>
  );
};

export default FeatureHighlightTab;
