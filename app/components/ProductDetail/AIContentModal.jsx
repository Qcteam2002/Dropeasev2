import React from "react";
import {
  Modal,
  BlockStack,
  TextField,
  Select,
  ButtonGroup,
  Button,
  Box,
  Text,
  Spinner,
  InlineStack,
} from "@shopify/polaris";

export default function AIContentModal({
  open,
  onClose,
  aiMode,
  aiKeywords,
  setAiKeywords,
  aiInstructions,
  setAiInstructions,
  aiTone,
  setAiTone,
  isGeneratingAI,
  onGenerate,
  aiSuggestion,
  onKeepSuggestion,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Generate ${aiMode === "title" ? "product title" : aiMode === "description" ? "product description" : "product content"}`}
      size="large"
      primaryAction={
        (aiSuggestion.title || aiSuggestion.description) ? {
          content: "Keep",
          onAction: onKeepSuggestion
        } : null
      }
      secondaryActions={[
        ...(aiSuggestion.title || aiSuggestion.description ? [{
          content: "Generate again",
          onAction: onGenerate,
          loading: isGeneratingAI
        }] : []),
        {
          content: "Cancel",
          onAction: onClose
        }
      ]}
    >
      <Modal.Section>
        <BlockStack gap="400">
          {/* Configuration Form - Shopify Style */}
          <BlockStack gap="300">
            <TextField
              label="Features and keywords"
              value={aiKeywords}
              onChange={setAiKeywords}
              placeholder="e.g., organic cotton, relaxed fit"
              autoComplete="off"
            />
            
            <TextField
              label="Special instructions (optional)"
              value={aiInstructions}
              onChange={setAiInstructions}
              placeholder="e.g., replace some words with emoji"
              autoComplete="off"
            />
            
            <InlineStack gap="200" align="space-between">
              <Select
                label=""
                labelHidden
                value={aiTone}
                onChange={setAiTone}
                options={[
                  { label: "Tone: Expert", value: "expert" },
                  { label: "Tone: Friendly", value: "friendly" },
                  { label: "Tone: SEO", value: "seo" },
                  { label: "Tone: Casual", value: "casual" }
                ]}
              />
              
              <ButtonGroup>
                <Button
                  icon="👍"
                  disabled
                  size="slim"
                />
                <Button
                  icon="👎"
                  disabled
                  size="slim"
                />
                <Button
                  onClick={onGenerate}
                  loading={isGeneratingAI}
                  disabled={isGeneratingAI}
                  size="medium"
                >
                  Generate
                </Button>
              </ButtonGroup>
            </InlineStack>
          </BlockStack>

          {/* AI Generated Content - Clean Display */}
          {(aiSuggestion.title || aiSuggestion.description) && (
            <Box paddingBlockStart="400">
              <BlockStack gap="200">
                <Text variant="bodyMd" fontWeight="medium" color="subdued">
                  {aiMode === "title" ? "Title:" : aiMode === "description" ? "Description:" : "Title & Description:"}
                </Text>
                {aiMode === "all" ? (
                  <BlockStack gap="300">
                    {aiSuggestion.title && (
                      <Box>
                        <Text variant="bodyMd" fontWeight="medium" color="subdued" as="p">
                          Title:
                        </Text>
                        <Box paddingBlockStart="100">
                          <div style={{
                            padding: '12px',
                            backgroundColor: '#f6f6f7',
                            borderRadius: '6px',
                            border: '1px solid #e1e3e5',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            fontFamily: 'inherit'
                          }}>
                            {aiSuggestion.title}
                          </div>
                        </Box>
                      </Box>
                    )}
                    {aiSuggestion.description && (
                      <Box>
                        <Text variant="bodyMd" fontWeight="medium" color="subdued" as="p">
                          Description:
                        </Text>
                        <Box paddingBlockStart="100">
                          <div style={{
                            padding: '12px',
                            backgroundColor: '#f6f6f7',
                            borderRadius: '6px',
                            border: '1px solid #e1e3e5',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit'
                          }}>
                            {aiSuggestion.description}
                          </div>
                        </Box>
                      </Box>
                    )}
                  </BlockStack>
                ) : (
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '8px',
                    border: '1px solid #e1e3e5',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit'
                  }}>
                    {aiSuggestion.title && aiSuggestion.title}
                    {aiSuggestion.description && aiSuggestion.description}
                  </div>
                )}
              </BlockStack>
            </Box>
          )}

          {/* Loading State */}
          {isGeneratingAI && !aiSuggestion.title && !aiSuggestion.description && (
            <Box paddingBlockStart="400">
              <InlineStack gap="200" align="center">
                <Spinner size="small" />
                <Text variant="bodyMd">
                  Generating content...
                </Text>
              </InlineStack>
            </Box>
          )}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
