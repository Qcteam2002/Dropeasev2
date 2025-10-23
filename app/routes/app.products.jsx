import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, useFetcher } from "@remix-run/react";
import React, { useState, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  TextField,
  IndexTable,
  Text,
  Badge,
  Button,
  Thumbnail,
  Toast,
  Frame,
  EmptyState,
  Filters,
  ChoiceList,
  useIndexResourceState,
  ButtonGroup,
  Modal,
  TextContainer,
  Spinner,
  Tabs,
  Box,
  InlineStack,
  BlockStack,
  Divider,
  Icon,
  Tooltip,
} from "@shopify/polaris";
import { 
  ExportIcon, 
  ImportIcon, 
  PlusIcon,
  SearchIcon,
  FilterIcon
} from "@shopify/polaris-icons";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate, getUser } from "../shopify.server";
import { getProducts } from "../models/PlatformProduct";
import { PrismaClient } from "@prisma/client";
import productsStyles from "../styles/products.css?url";

export const links = () => [{ rel: "stylesheet", href: productsStyles }];

const prisma = new PrismaClient();

// ✅ Loader để lấy danh sách sản phẩm với thông tin optimization
export const loader = async ({ request }) => {
  try {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);

    if (!user) {
      console.error("User not found");
      return json({ products: [], hasProducts: false });
    }

    // Lấy danh sách sản phẩm từ PlatformProduct
    let products = [];
    try {
      products = await getProducts(user.id);

      if (products.length === 0) {
        return json({ products: [], hasProducts: false });
      }

      // Lấy thông tin optimization từ ProductsOptimized
      const optimizedProducts = await prisma.productsOptimized.findMany({
        where: {
          productId: {
            in: products.map(product => BigInt(product.id))
          }
        },
        select: {
          productId: true,
          isOptimized: true,
          optimizedAt: true,
          optimizedTitle: true,
          optimizedDescription: true,
          gridView: true,
          aiReviews: true
        }
      });

      // Tạo map để dễ dàng tìm kiếm
      const optimizedMap = {};
      optimizedProducts.forEach(item => {
        optimizedMap[item.productId.toString()] = {
          isOptimized: item.isOptimized,
          optimizedAt: item.optimizedAt,
          hasOptimizedTitle: !!item.optimizedTitle,
          hasOptimizedDescription: !!item.optimizedDescription,
          hasGridView: !!item.gridView,
          hasAiReviews: !!item.aiReviews
        };
      });

      // Kết hợp thông tin optimization vào danh sách sản phẩm
      products = products.map(product => {
        const optimization = optimizedMap[product.id] || {};
        
        // Tính toán AI suggestions dựa trên trạng thái optimization
        const aiSuggestions = [];
        
        // Kiểm tra title optimization
        if (!optimization.hasOptimizedTitle || product.title?.length < 10 || product.title?.length > 70) {
          aiSuggestions.push("Optimize Title");
        }
        
        // Kiểm tra description optimization
        if (!optimization.hasOptimizedDescription || !product.descriptionHtml || product.descriptionHtml.length < 100) {
          aiSuggestions.push("Optimize Description");
        }
        
        // Kiểm tra image enhancement
        if (!product.featuredMedia || product.featuredMedia.includes('placeholder')) {
          aiSuggestions.push("Enhance Image");
        }
        
        // Kiểm tra highlights generation
        if (!optimization.hasGridView) {
          aiSuggestions.push("Generate Highlights");
        }

        return {
          ...product,
          contentOptimized: optimization.hasOptimizedTitle && optimization.hasOptimizedDescription,
          imageOptimized: !!product.featuredMedia && !product.featuredMedia.includes('placeholder'),
          highlightsGenerated: optimization.hasGridView,
          aiSuggestions,
          optimizedAt: optimization.optimizedAt
        };
      });

    } catch (error) {
      console.error("Error fetching products:", error);
      return json({ products: [], hasProducts: false });
    }

    // Serialize BigInt values
    const serializedProducts = products.map((product) => ({
      ...product,
      id: product.id?.toString() || "",
      userId: product.userId?.toString() || "",
      sourceProductId: product.sourceProductId ? product.sourceProductId.toString() : null,
      title: product.title || "Untitled Product",
      featuredMedia: product.featuredMedia || "https://via.placeholder.com/150",
      optimizedAt: product.optimizedAt ? product.optimizedAt.toISOString() : null
    }));

    return json({ products: serializedProducts, hasProducts: true });
  } catch (error) {
    console.error("Loader error:", error);
    return json({ products: [], hasProducts: false });
  }
};

// ✅ Action để xử lý bulk operations
export const action = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const selectedIds = JSON.parse(formData.get("selectedIds") || "[]");

  try {
    const { admin, session } = await authenticate.admin(request);
    const user = await getUser(request);

    if (!user) {
      return json({ error: "User not found" }, { status: 400 });
    }

    switch (actionType) {
      case "optimizeContent":
        // Implement bulk content optimization
        // This would call your existing optimizeProduct service
        return json({ success: true, message: `Optimized content for ${selectedIds.length} products` });
      
      case "optimizeImages":
        // Implement bulk image optimization
        return json({ success: true, message: `Optimized images for ${selectedIds.length} products` });
      
      case "generateHighlights":
        // Implement bulk highlights generation
        return json({ success: true, message: `Generated highlights for ${selectedIds.length} products` });
      
      case "optimizeAll":
        // Implement bulk all optimization
        return json({ success: true, message: `Optimized all features for ${selectedIds.length} products` });
      
      default:
        return json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Action error:", error);
    return json({ error: "Action failed" }, { status: 500 });
  }
};

// ✅ Component chính - Products Page theo Polaris spec
export default function ProductsPage() {
  const { products = [], hasProducts } = useLoaderData();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  
  // States
  const [searchValue, setSearchValue] = useState("");
  const [toast, setToast] = useState({ active: false, message: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Theo spec: 20 sản phẩm/trang

  // Filter states
  const [statusFilters, setStatusFilters] = useState([]);
  const [suggestionFilters, setSuggestionFilters] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  // IndexTable resource state
  const { selectedResources, allResourcesSelected, handleSelectionChange } = 
    useIndexResourceState(products);

  // Modal states
  const [bulkActionModal, setBulkActionModal] = useState({ active: false, action: null });

  // ✅ Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch = product.title.toLowerCase().includes(searchValue.toLowerCase());
    
    // Status filters
    let matchesStatus = true;
    if (statusFilters.length > 0) {
      matchesStatus = statusFilters.some(filter => {
        switch (filter) {
          case "contentOptimized":
            return product.contentOptimized;
          case "contentNotOptimized":
            return !product.contentOptimized;
          case "imageOptimized":
            return product.imageOptimized;
          case "imageNotOptimized":
            return !product.imageOptimized;
          case "highlightsGenerated":
            return product.highlightsGenerated;
          case "highlightsNotGenerated":
            return !product.highlightsGenerated;
          default:
            return true;
        }
      });
    }

    // AI Suggestion filters
    let matchesSuggestions = true;
    if (suggestionFilters.length > 0) {
      matchesSuggestions = suggestionFilters.some(filter => 
        product.aiSuggestions.includes(filter)
      );
    }

    return matchesSearch && matchesStatus && matchesSuggestions;
  });

  // ✅ Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Handle filter changes
  const handleStatusFilterChange = useCallback((value) => {
    setStatusFilters(value);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const handleSuggestionFilterChange = useCallback((value) => {
    setSuggestionFilters(value);
    setCurrentPage(1);
  }, []);

  // ✅ Handle tab change
  const handleTabChange = useCallback((tabIndex) => {
    setSelectedTab(tabIndex);
    setCurrentPage(1); // Reset to first page when tab changes
  }, []);

  // ✅ Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedResources.length === 0) {
      setToast({ active: true, message: "Please select at least one product" });
      return;
    }
    setBulkActionModal({ active: true, action });
  };

  const confirmBulkAction = () => {
    const formData = new FormData();
    formData.append("actionType", bulkActionModal.action);
    formData.append("selectedIds", JSON.stringify(selectedResources));
    
    fetcher.submit(formData, { method: "post" });
    setBulkActionModal({ active: false, action: null });
  };

  // ✅ Handle sync products
  const handleSyncProducts = async () => {
    setToast({ active: true, message: "Syncing products from Shopify..." });
    
    try {
      const response = await fetch("/app/api/sync-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        setToast({ 
          active: true, 
          message: `${result.message}. Refreshing page...` 
        });
        // Refresh page after 2 seconds to show synced products
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setToast({ 
          active: true, 
          message: result.error || "Failed to sync products" 
        });
      }
    } catch (error) {
      console.error("Sync error:", error);
      setToast({ 
        active: true, 
        message: "Failed to sync products. Please try again." 
      });
    }
  };

  // ✅ Clear filters
  const handleClearFilters = () => {
    setStatusFilters([]);
    setSuggestionFilters([]);
    setSearchValue("");
    setCurrentPage(1);
  };

  // ✅ Filter definitions
  const filters = [
    {
      key: "status",
      label: "Status",
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            { label: "Content Optimized ✅", value: "contentOptimized" },
            { label: "Content Not Optimized ❌", value: "contentNotOptimized" },
            { label: "Image Optimized ✅", value: "imageOptimized" },
            { label: "Image Not Optimized ❌", value: "imageNotOptimized" },
            { label: "Highlights Generated ✅", value: "highlightsGenerated" },
            { label: "Highlights Not Generated ❌", value: "highlightsNotGenerated" },
          ]}
          selected={statusFilters}
          onChange={handleStatusFilterChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "suggestions",
      label: "AI Suggestions",
      filter: (
        <ChoiceList
          title="AI Suggestions"
          titleHidden
          choices={[
            { label: "Optimize Title", value: "Optimize Title" },
            { label: "Optimize Description", value: "Optimize Description" },
            { label: "Enhance Image", value: "Enhance Image" },
            { label: "Generate Highlights", value: "Generate Highlights" },
          ]}
          selected={suggestionFilters}
          onChange={handleSuggestionFilterChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];

  // ✅ Bulk actions definition
  const bulkActions = [
    {
      content: "Optimize Content",
      onAction: () => handleBulkAction("optimizeContent"),
    },
    {
      content: "Optimize Images", 
      onAction: () => handleBulkAction("optimizeImages"),
    },
    {
      content: "Generate Highlights",
      onAction: () => handleBulkAction("generateHighlights"),
    },
    {
      content: "Optimize All",
      onAction: () => handleBulkAction("optimizeAll"),
    },
  ];

  // ✅ Show toast when fetcher completes
  React.useEffect(() => {
    if (fetcher.data?.success) {
      setToast({ active: true, message: fetcher.data.message });
    } else if (fetcher.data?.error) {
      setToast({ active: true, message: fetcher.data.error });
    }
  }, [fetcher.data]);

  // ✅ Calculate analytics
  const totalProducts = products.length;
  const optimizedProducts = products.filter(p => p.contentOptimized && p.imageOptimized && p.highlightsGenerated).length;
  const needsOptimization = products.filter(p => p.aiSuggestions.length > 0).length;
  const optimizationRate = totalProducts > 0 ? Math.round((optimizedProducts / totalProducts) * 100) : 0;

  // ✅ Tab definitions
  const tabs = [
    {
      id: 'all',
      content: `All (${totalProducts})`,
      accessibilityLabel: 'All products',
      panelID: 'all-products-content',
    },
    {
      id: 'optimized',
      content: `Optimized (${optimizedProducts})`,
      accessibilityLabel: 'Optimized products',
      panelID: 'optimized-products-content',
    },
    {
      id: 'needs-optimization',
      content: `Needs Optimization (${needsOptimization})`,
      accessibilityLabel: 'Products that need optimization',
      panelID: 'needs-optimization-content',
    },
  ];

  // ✅ Filter by selected tab
  const tabFilteredProducts = filteredProducts.filter((product) => {
    switch (selectedTab) {
      case 1: // Optimized
        return product.contentOptimized && product.imageOptimized && product.highlightsGenerated;
      case 2: // Needs Optimization
        return product.aiSuggestions.length > 0;
      default: // All
        return true;
    }
  });

  // Update pagination based on tab filtered products
  const tabTotalPages = Math.ceil(tabFilteredProducts.length / itemsPerPage);
  const tabDisplayedProducts = tabFilteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Empty State
  if (!hasProducts) {
    return (
      <Frame>
        <Page 
          title="Products"
          subtitle="Manage and optimize your product catalog with AI"
          primaryAction={{
            content: "Sync Products",
            icon: PlusIcon,
            onAction: handleSyncProducts,
          }}
        >
          <Layout>
            <Layout.Section>
              <EmptyState
                heading="Start by syncing your products"
                action={{
                  content: "Sync Products from Shopify",
                  onAction: handleSyncProducts,
                }}
                secondaryAction={{
                  content: "Learn more",
                  url: "/app/additional",
                }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>Sync products from your Shopify store to start AI-powered optimization for better conversion rates.</p>
              </EmptyState>
            </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    );
  }

  return (
    <Frame>
      <Page
        title="Products"
        subtitle="Manage and optimize your product catalog with AI"
        secondaryActions={[
          {
            content: "Export",
            icon: ExportIcon,
            onAction: () => setToast({ active: true, message: "Export feature coming soon!" }),
          },
          {
            content: "Import",
            icon: ImportIcon,
            onAction: () => setToast({ active: true, message: "Import feature coming soon!" }),
          },
        ]}
        primaryAction={{
          content: "Sync Products",
          icon: PlusIcon,
          onAction: handleSyncProducts,
        }}
      >
        <Layout>
          {/* Analytics Cards */}
          <Layout.Section>
            <InlineStack gap="400" wrap={false} className="analytics-cards">
              <div style={{ flex: 1 }} className="analytics-card">
                <Card>
                  <Box padding="400">
                    <BlockStack gap="200">
                      <Text as="h3" variant="headingMd" color="subdued">
                        Total Products
                      </Text>
                      <Text as="p" variant="heading2xl">
                        {totalProducts}
                      </Text>
                      <Text as="p" variant="bodySm" color="subdued">
                        Products in your catalog
                      </Text>
                    </BlockStack>
                  </Box>
                </Card>
              </div>
              
              <div style={{ flex: 1 }} className="analytics-card">
                <Card>
                  <Box padding="400">
                    <BlockStack gap="200">
                      <Text as="h3" variant="headingMd" color="subdued">
                        Optimization Rate
                      </Text>
                      <Text as="p" variant="heading2xl" color={optimizationRate >= 80 ? "success" : optimizationRate >= 50 ? "warning" : "critical"}>
                        {optimizationRate}%
                      </Text>
                      <Text as="p" variant="bodySm" color="subdued">
                        Products fully optimized
                      </Text>
                    </BlockStack>
                  </Box>
                </Card>
              </div>

              <div style={{ flex: 1 }} className="analytics-card">
                <Card>
                  <Box padding="400">
                    <BlockStack gap="200">
                      <Text as="h3" variant="headingMd" color="subdued">
                        Needs Optimization
                      </Text>
                      <Text as="p" variant="heading2xl" color={needsOptimization > 0 ? "warning" : "success"}>
                        {needsOptimization}
                      </Text>
                      <Text as="p" variant="bodySm" color="subdued">
                        Products with AI suggestions
                      </Text>
                    </BlockStack>
                  </Box>
                </Card>
              </div>
            </InlineStack>
          </Layout.Section>

          {/* Main Content */}
          <Layout.Section>
            <Card>
              {/* Tabs */}
              <Tabs 
                tabs={tabs} 
                selected={selectedTab} 
                onSelect={handleTabChange}
                fitted
              />
              
              <Box padding="400">
                {/* Search and Filters */}
                <BlockStack gap="400">
                  <InlineStack gap="300" align="space-between" className="search-filters-container">
                    <div style={{ flex: 1, maxWidth: "400px" }} className="search-field-container">
                      <TextField
                        placeholder="Search products..."
                        value={searchValue}
                        onChange={setSearchValue}
                        prefix={<Icon source={SearchIcon} />}
                        clearButton
                        onClearButtonClick={() => setSearchValue("")}
                      />
                    </div>
                    
                    <InlineStack gap="200">
                      <Button
                        icon={FilterIcon}
                        disclosure={statusFilters.length > 0 || suggestionFilters.length > 0 ? "up" : "down"}
                        onClick={() => {/* Toggle filter panel */}}
                      >
                        Filters {(statusFilters.length + suggestionFilters.length) > 0 && `(${statusFilters.length + suggestionFilters.length})`}
                      </Button>
                    </InlineStack>
                  </InlineStack>

                  {/* Filter Pills */}
                  {(statusFilters.length > 0 || suggestionFilters.length > 0) && (
                    <div className="filter-pills-container">
                      <InlineStack gap="200" wrap className="filter-pills">
                        {statusFilters.map((filter) => (
                          <Button
                            key={filter}
                            size="micro"
                            onClick={() => setStatusFilters(statusFilters.filter(f => f !== filter))}
                          >
                            {filter.replace(/([A-Z])/g, ' $1')} ✕
                          </Button>
                        ))}
                        {suggestionFilters.map((filter) => (
                          <Button
                            key={filter}
                            size="micro"
                            onClick={() => setSuggestionFilters(suggestionFilters.filter(f => f !== filter))}
                          >
                            {filter} ✕
                          </Button>
                        ))}
                        <Button
                          size="micro"
                          plain
                          onClick={handleClearFilters}
                        >
                          Clear all
                        </Button>
                      </InlineStack>
                    </div>
                  )}
                </BlockStack>
              </Box>

              <Divider />

              {/* Products Table */}
              <IndexTable
                resourceName={{ singular: "product", plural: "products" }}
                itemCount={tabDisplayedProducts.length}
                selectedItemsCount={
                  allResourcesSelected ? "All" : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                bulkActions={bulkActions}
                headings={[
                  { title: "Image" },
                  { title: "Product Name" },
                  { title: "Inventory" },
                  { title: "Actions" },
                ]}
                selectable
                loading={fetcher.state === "submitting"}
                className="product-table"
              >
                {tabDisplayedProducts.map((product, index) => (
                  <IndexTable.Row
                    id={product.id}
                    key={product.id}
                    position={index}
                    selected={selectedResources.includes(product.id)}
                    className="product-table-row"
                    onClick={() => navigate(`/app/product/detail/${product.id}`)}
                  >
                    {/* Product Info */}
                    <IndexTable.Cell>
                      <Thumbnail
                        source={product.featuredMedia || "https://via.placeholder.com/150"}
                        alt={product.title}
                        size="small"
                      />
                    </IndexTable.Cell>

                    {/* Product Title */}
                    <IndexTable.Cell className="product-title-cell">
                      <div
                        style={{
                          whiteSpace: "normal",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          wordBreak: "break-word",
                        }}
                      >
                        <Text fontWeight="500" as="span">
                          {product.title}
                        </Text>
                      </div>
                      <Text as="p" variant="bodySm" color="subdued" style={{ marginTop: "4px" }}>
                        {product.variants?.length || 0} variant{product.variants?.length !== 1 ? 's' : ''}
                      </Text>
                    </IndexTable.Cell>

                    {/* Inventory */}
                    <IndexTable.Cell>
                      <Badge status="attention">
                        {product.variants?.[0]?.inventoryQuantity || 0} in stock
                      </Badge>
                    </IndexTable.Cell>

                    {/* Actions */}
                    <IndexTable.Cell className="actions-column">
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Button 
                          primary 
                          size="slim"
                          onClick={() => navigate(`/app/product/detail/${product.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="slim"
                          loading={fetcher.state === "submitting"}
                          onClick={() => {
                            // Trigger optimize action for single product
                            const formData = new FormData();
                            formData.append("actionType", "optimizeAll");
                            formData.append("selectedIds", JSON.stringify([product.id]));
                            fetcher.submit(formData, { method: "post" });
                          }}
                        >
                          {product.contentOptimized && product.imageOptimized && product.highlightsGenerated ? "Re-Optimize" : "Optimize"}
                        </Button>
                      </div>
                    </IndexTable.Cell>
                  </IndexTable.Row>
                ))}
              </IndexTable>

              {/* Pagination */}
              {tabTotalPages > 1 && (
                <Box padding="400" className="pagination-container">
                  <InlineStack align="center" gap="200">
                    <Button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Text as="span" variant="bodySm">
                      Page {currentPage} of {tabTotalPages}
                    </Text>
                    <Button
                      disabled={currentPage === tabTotalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </InlineStack>
                </Box>
              )}
            </Card>
          </Layout.Section>
        </Layout>

        {/* Bulk Action Confirmation Modal */}
        <Modal
          open={bulkActionModal.active}
          onClose={() => setBulkActionModal({ active: false, action: null })}
          title="Confirm Bulk Action"
          primaryAction={{
            content: "Confirm",
            onAction: confirmBulkAction,
            loading: fetcher.state === "submitting",
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: () => setBulkActionModal({ active: false, action: null }),
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Are you sure you want to {bulkActionModal.action?.replace(/([A-Z])/g, ' $1').toLowerCase()} for {selectedResources.length} selected product(s)?
              </p>
              <p>This action may take some time to complete.</p>
            </TextContainer>
          </Modal.Section>
        </Modal>

        {/* Toast */}
        {toast.active && (
          <Toast
            content={toast.message}
            onDismiss={() => setToast({ active: false, message: "" })}
          />
        )}
      </Page>
    </Frame>
  );
}
