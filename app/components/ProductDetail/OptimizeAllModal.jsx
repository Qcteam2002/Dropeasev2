import React from "react";
import {
  Modal,
  BlockStack,
  Text,
  Card,
  Box,
  InlineStack,
} from "@shopify/polaris";

export default function OptimizeAllModal({
  open,
  onClose,
  onAccept,
  product,
  currentTitle,
}) {
  return (
    <Modal
      large
      open={open}
      onClose={onClose}
      title="AI Optimization Preview"
      primaryAction={{
        content: "Accept All & Push to Shopify",
        onAction: onAccept,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="400">
          <Text variant="headingMd">Preview all AI optimizations</Text>
          
          <Card>
            <Box padding="400">
              <Text variant="headingSm">Content Optimization</Text>
              <Box paddingBlockStart="200">
                <InlineStack gap="400">
                  <div style={{ flex: 1 }}>
                    <Text variant="bodyMd" color="subdued">Original</Text>
                    <Text>{product.title}</Text>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text variant="bodyMd" color="success">AI Optimized</Text>
                    <Text>{currentTitle || "Will be generated..."}</Text>
                  </div>
                </InlineStack>
              </Box>
            </Box>
          </Card>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
