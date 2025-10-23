import React from "react";
import {
  Card,
  Box,
  BlockStack,
  InlineStack,
  Text,
  TextField,
  Button,
  Badge,
  Tooltip,
} from "@shopify/polaris";
import { MagicIcon } from "@shopify/polaris-icons";
import AIContentModal from "./AIContentModal";


export default function ContentTab({
  product,
  currentTitle,
  setCurrentTitle,
  currentDescription,
  setCurrentDescription,
  showAIAssistant,
  setShowAIAssistant,
  aiMode,
  setAiMode,
  aiKeywords,
  setAiKeywords,
  aiInstructions,
  setAiInstructions,
  aiTone,
  setAiTone,
  isGeneratingAI,
  handleGenerateWithAI,
  aiSuggestion,
  handleKeepAISuggestion,
  handleSaveContent,
  fetcher,
}) {
  return (
    <Card>
        <Box padding="400">
          <BlockStack gap="400">
          {/* Header with Main Generate Button */}
          <InlineStack align="space-between">
            <Text variant="headingMd">Content Optimization</Text>
            <AIContentModal
              open={showAIAssistant}
              onClose={() => setShowAIAssistant(false)}
              aiMode={aiMode}
              aiKeywords={aiKeywords}
              setAiKeywords={setAiKeywords}
              aiInstructions={aiInstructions}
              setAiInstructions={setAiInstructions}
              aiTone={aiTone}
              setAiTone={setAiTone}
              isGeneratingAI={isGeneratingAI}
              onGenerate={handleGenerateWithAI}
              aiSuggestion={aiSuggestion}
              onKeepSuggestion={handleKeepAISuggestion}
            />
            
            {/* Quick Generate Button */}
            <Button
              icon={MagicIcon}
              onClick={() => {
                setAiMode("all");
                setShowAIAssistant(true);
              }}
              primary
            >
              Generate All with AI ✨
            </Button>
          </InlineStack>
          
          {/* Shopify-like Content Editor */}
          <BlockStack gap="400">
            {/* Title Field with AI Icon */}
            <BlockStack gap="200">
              <Text variant="headingSm">Title</Text>
              <TextField
                value={currentTitle}
                onChange={setCurrentTitle}
                helpText="The title of your product. This will be displayed on your product page and used for SEO."
                autoComplete="off"
                suffix={
                  <Tooltip content="AI Title">
                    <Button
                      icon={MagicIcon}
                      size="slim"
                      onClick={() => {
                        setAiMode("title");
                        setShowAIAssistant(true);
                      }}
                      style={{ 
                        minWidth: '24px',
                        height: '24px',
                        padding: '0',
                        border: 'none',
                        background: 'transparent',
                        position: 'relative',
                        right: '-18px'
                      }}
                    />
                  </Tooltip>
                }
              />
            </BlockStack>
            
            {/* Description Field with AI Icon */}
            <BlockStack gap="200">
              <Text variant="headingSm">Description</Text>
              <TextField
                value={currentDescription}
                onChange={setCurrentDescription}
                multiline={8}
                helpText="Tell customers about your product. This will appear on your product page."
                placeholder="Describe your product..."
                autoComplete="off"
                suffix={
                  <Tooltip content="AI Description">
                    <Button
                      icon={MagicIcon}
                      size="slim"
                      onClick={() => {
                        setAiMode("description");
                        setShowAIAssistant(true);
                      }}
                      style={{ 
                        minWidth: '24px',
                        height: '24px',
                        padding: '0',
                        border: 'none',
                        background: 'transparent',
                        position: 'relative',
                        right: '-18px'
                      }}
                    />
                  </Tooltip>
                }
              />
            </BlockStack>

        </BlockStack>
      </BlockStack>
    </Box>
  </Card>
  );
}
