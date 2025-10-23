import React from "react";
import {
  Modal,
  InlineStack,
  Text,
  Box,
  Thumbnail,
} from "@shopify/polaris";

export default function ImagePreviewModal({
  open,
  onClose,
  onApply,
  image,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Image Optimization Preview"
      primaryAction={{
        content: "Apply & Replace in Shopify",
        onAction: onApply,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <InlineStack gap="400" align="center">
          <div style={{ flex: 1, textAlign: 'center' }}>
            <Text variant="headingSm">Original</Text>
            <Box paddingBlockStart="200">
              <Thumbnail
                source={image?.url || "https://via.placeholder.com/200"}
                alt="Original"
                size="large"
              />
            </Box>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <Text variant="headingSm">AI Enhanced</Text>
            <Box paddingBlockStart="200">
              <Thumbnail
                source={image?.url || "https://via.placeholder.com/200"}
                alt="Optimized"
                size="large"
              />
            </Box>
          </div>
        </InlineStack>
      </Modal.Section>
    </Modal>
  );
}
