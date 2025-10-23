import React from "react";
import {
  Card,
  Box,
  BlockStack,
  InlineStack,
  Text,
  Badge,
  Button,
  Grid,
  MediaCard,
  ButtonGroup,
  Icon,
} from "@shopify/polaris";
import { ImageIcon } from "@shopify/polaris-icons";

export default function ImagesTab({
  product,
  fetcher,
  setImagePreviewModal,
  setToast,
}) {
  return (
    <Card>
      <Box padding="400">
        <BlockStack gap="400">
          <InlineStack align="space-between">
            <Text variant="headingMd">Image Optimization</Text>
            <InlineStack gap="200">
              <Button 
                size="slim"
                onClick={() => {
                  const formData = new FormData();
                  formData.append("actionType", "resyncImages");
                  fetcher.submit(formData, { 
                    method: "post",
                    action: `/api/resync-product/${product.id}`
                  });
                }}
                loading={fetcher.state === "submitting"}
              >
                Re-sync Images
              </Button>
              <Badge status={product.imageOptimized ? "success" : "critical"}>
                {product.imageOptimized ? "Optimized" : "Not Optimized"}
              </Badge>
            </InlineStack>
          </InlineStack>
          
          {product.images?.length > 0 ? (
            <Grid>
              {product.images.map((image, index) => (
                <Grid.Cell key={image.id || index} columnSpan={{ xs: 6, sm: 4, md: 3 }}>
                  <MediaCard
                    title={image.altText || `Image ${index + 1}`}
                    primaryAction={{
                      content: "Preview",
                      onAction: () => setImagePreviewModal({ active: true, image })
                    }}
                    description={`${image.width || 'Unknown'}x${image.height || 'Unknown'} px`}
                  >
                    <img
                      alt={image.altText || `Product image ${index + 1}`}
                      width="100%"
                      height="200"
                      style={{ objectFit: 'cover' }}
                      src={image.url}
                    />
                    <Box padding="200">
                      <ButtonGroup segmented>
                        <Button 
                          size="slim"
                          onClick={() => setToast({ active: true, message: "Enhance HD feature coming soon!" })}
                        >
                          Enhance HD
                        </Button>
                        <Button 
                          size="slim"
                          onClick={() => setToast({ active: true, message: "Remove BG feature coming soon!" })}
                        >
                          Remove BG
                        </Button>
                        <Button 
                          size="slim"
                          onClick={() => setToast({ active: true, message: "Add Logo feature coming soon!" })}
                        >
                          Add Logo
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </MediaCard>
                </Grid.Cell>
              ))}
            </Grid>
          ) : (
            <Box padding="800">
              <InlineStack align="center">
                <BlockStack gap="200" inlineAlign="center">
                  <Icon source={ImageIcon} tone="subdued" />
                  <Text variant="headingSm" color="subdued">No images found</Text>
                  <Text color="subdued">Add images to your product in Shopify</Text>
                </BlockStack>
              </InlineStack>
            </Box>
          )}
        </BlockStack>
      </Box>
    </Card>
  );
}
