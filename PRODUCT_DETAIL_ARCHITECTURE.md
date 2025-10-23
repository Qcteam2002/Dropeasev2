# Product Detail Page Architecture

## 📁 Cấu trúc Files

### Main Route File
```
app/routes/app.product.detail.$id.jsx
```
- **Chức năng**: Route chính cho trang product detail
- **Layout**: 2 cột (30% Settings + 70% Optimization)
- **Tabs**: Content, Image, Feature Highlight
- **API**: Loader + Action handlers

### Components Directory
```
app/components/ProductDetail/
├── OptimizationSettings.jsx      # Cột trái - Settings panel
├── ContentOptimizationTab.jsx    # Tab Content - SEO optimization
├── ImageOptimizationTab.jsx      # Tab Image - Alt text optimization
└── FeatureHighlightTab.jsx       # Tab Feature Highlight - Feature highlights
```

### API Routes
```
app/routes/
├── api.seo.generate.jsx          # Generate SEO suggestions
└── api.seo.alt.generate.jsx      # Generate alt text for images
```

## 🏗️ Architecture Overview

### 1. Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ Page Header (Product Title + Actions)                   │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────────────────────┐ │
│ │ Settings Panel  │ │ Optimization Area (Tabs)        │ │
│ │ (30%)           │ │ (70%)                           │ │
│ │                 │ │ ┌─────────────────────────────┐ │ │
│ │ - Primary Key   │ │ │ [Content][Image][Feature]  │ │ │
│ │ - Target Market │ │ ├─────────────────────────────┤ │ │
│ │ - Tone          │ │ │ Tab Content                 │ │ │
│ │ - Optional Keys │ │ │                             │ │ │
│ │                 │ │ │                             │ │ │
│ └─────────────────┘ │ └─────────────────────────────┘ │ │
└─────────────────────────────────────────────────────────┘
```

### 2. Data Flow
```
User Input → Settings Panel → AI Generation → Tab Content → Apply to Shopify
     ↓              ↓              ↓              ↓              ↓
localStorage → API Call → Mock Data → UI Update → GraphQL Mutation
```

## 🧩 Component Details

### OptimizationSettings.jsx
**Chức năng**: Quản lý settings cho AI generation
**Props**:
- `settings`: Object chứa current settings
- `onSettingsChange`: Callback khi settings thay đổi
- `onSaveSettings`: Callback khi save settings

**Features**:
- **Get Market Insights** button (primary action)
- **Target Market** dropdown với cờ và tên đầy đủ (US, EU, VN, etc.)
- **Language Output** dropdown với cờ và tên đầy đủ (English, Tiếng Việt, etc.)
- **Keywords** Combobox với search và multiple selection + tags display
- **Persona** dropdown với single selection
- **Pain Points** Combobox với search và multiple selection + tags display
- **Content Tone** dropdown (Friendly, Professional, Luxury, etc.)
- **Tooltip hover** thay vì helpText cho UI gọn gàng
- Auto-save to localStorage

### ContentOptimizationTab.jsx
**Chức năng**: SEO content optimization
**Props**:
- `product`: Product data object
- `settings`: Optimization settings
- `onApplyContent`: Callback khi apply content
- `fetcher`: Remix fetcher object

**Features**:
- Current Title/Description editing
- AI-generated SEO suggestions
- Google Search Preview
- Apply to Shopify functionality

### ImageOptimizationTab.jsx
**Chức năng**: Image alt text optimization
**Props**:
- `product`: Product data object
- `settings`: Optimization settings
- `onApplyAltText`: Callback khi apply alt text
- `fetcher`: Remix fetcher object

**Features**:
- Image grid display
- Alt text editing for each image
- AI-generated alt text suggestions
- Coverage percentage badge
- Apply all alt text functionality

### FeatureHighlightTab.jsx
**Chức năng**: Feature highlights management
**Props**:
- `product`: Product data object
- `settings`: Optimization settings
- `fetcher`: Remix fetcher object

**Features**:
- AI-generated feature highlights
- Manual highlight addition
- Highlight management (add/remove)
- Apply highlights to product

## 🔄 State Management

### Main Page State
```javascript
const [selectedTab, setSelectedTab] = useState(0);
const [optimizationSettings, setOptimizationSettings] = useState({});
const [toast, setToast] = useState({ active: false, message: "" });
```

### Settings State
```javascript
const [localSettings, setLocalSettings] = useState({
  targetMarket: 'US',
  languageOutput: 'en-US',
  keywords: [],           // Array of selected keywords
  persona: '',           // Single selected persona
  painpoints: [],        // Array of selected pain points
  tone: 'friendly',
});
```

## 🎨 UI/UX Features

### Layout Design
- **Two-Column Layout**: 30% Settings + 70% Optimization area
- **Gap**: 24px between columns
- **Tabs**: Segmented button group for Content/Image/Feature Highlight
- **Clean UI**: No helpText, only tooltip hover for information

### Responsive Design
- **Desktop**: 2-column layout (30/70)
- **Mobile**: Stacked layout
- **Tablet**: Adaptive layout

### Polaris Components Used
- `Layout` + `Layout.Section` for responsive grid
- `Card` for content containers
- `ButtonGroup` with `variant="segmented"` for tabs
- `TextField` for inputs
- `Select` for single selection dropdowns
- `Combobox` + `Listbox` + `Tag` for multiple selection with search
- `Tooltip` for hover information
- `Button` for actions
- `Toast` for notifications
- `Badge` for status indicators
- `Icon` + `SearchIcon` for search functionality
- `TextContainer` + `LegacyStack` for tag display

### Loading States
- Button loading spinners
- Skeleton loading for content
- Toast notifications for feedback

## 🔌 API Integration

### GraphQL Queries
```javascript
// Product data fetching
query getProduct($id: ID!) {
  product(id: $id) {
    id, title, descriptionHtml, images, variants, seo
  }
}

// SEO update
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product { id, seo { title, description } }
  }
}

// Image alt text update
mutation productImageUpdate($id: ID!, $input: ProductImageInput!) {
  productImageUpdate(id: $id, input: $input) {
    image { id, altText }
  }
}
```

### API Routes
- `POST /api/seo/generate`: Generate SEO suggestions
- `POST /api/seo/alt/generate`: Generate alt text suggestions

## 🚀 Performance Optimizations

### Code Splitting
- Components are lazy-loaded
- API routes are separate
- Mock data for development

### Caching
- Settings cached in localStorage
- Product data cached in loader
- Toast notifications auto-dismiss

### Error Handling
- Try-catch blocks in all async operations
- User-friendly error messages
- Fallback UI states

## 🧪 Development Features

### Mock Data
- AI suggestions are mocked for development
- Real API integration ready
- Easy to switch between mock/real

### Debug Logging
- Console logs for development
- Error tracking
- Performance monitoring

## 📝 Future Enhancements

### Planned Features
1. **Real AI Integration**: Replace mock data with actual AI API
2. **Get Market Insights API**: Real-time market data integration
3. **Bulk Operations**: Apply settings to multiple products
4. **Templates**: Save and reuse optimization templates
5. **Analytics**: Track optimization performance
6. **A/B Testing**: Test different optimization strategies
7. **Advanced Search**: Enhanced filtering for Keywords and Pain Points

### Technical Improvements
1. **TypeScript**: Add type safety
2. **Testing**: Unit and integration tests
3. **Storybook**: Component documentation
4. **Performance**: Bundle optimization
5. **Accessibility**: WCAG compliance

## 🔧 Configuration

### Environment Variables
```bash
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
DATABASE_URL=your_database_url
```

### Dependencies
```json
{
  "@shopify/polaris": "^12.0.0",
  "@shopify/app-bridge-react": "^4.0.0",
  "@remix-run/react": "^2.0.0",
  "@prisma/client": "^5.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

## 📚 Usage Examples

### Adding New Tab
1. Create component in `app/components/ProductDetail/`
2. Add to tabs array in main route
3. Add conditional rendering in Tabs component
4. Import component in main route

### Adding New Setting
1. Add to `OptimizationSettings.jsx` state
2. Add UI component (TextField, Select, Combobox, etc.)
3. Add Tooltip for hover information (no helpText)
4. Update `onSettingsChange` callback
5. Add to API generation logic
6. Update localStorage save/load logic

### Adding New API Route
1. Create file in `app/routes/api.*.jsx`
2. Implement loader/action functions
3. Add error handling
4. Test with frontend integration

## 🔄 Recent Updates (Latest)

### UI/UX Improvements
- ✅ **Clean Interface**: Removed all helpText, replaced with tooltip hover
- ✅ **Enhanced Settings**: Added Language Output with country flags
- ✅ **Advanced Selection**: Keywords and Pain Points now use Combobox with search
- ✅ **Tag Display**: Selected items shown as removable tags
- ✅ **Market Insights**: Added primary "Get Market Insights" button
- ✅ **Segmented Tabs**: Replaced Tabs with ButtonGroup for better UX
- ✅ **Data Persistence**: Market insights data saved per product in localStorage
- ✅ **Smart Data Loading**: Only shows API data when available, falls back to defaults
- ✅ **Visual Indicators**: Badge shows when AI insights are loaded with data counts

### Technical Improvements
- ✅ **Polaris Combobox**: Proper implementation with Listbox and Tag components
- ✅ **State Management**: Updated to support arrays for keywords/painpoints
- ✅ **Tooltip Integration**: Added hover information for all settings
- ✅ **Error Handling**: Fixed initialization errors and component issues
- ✅ **Performance**: Optimized with useMemo and useCallback hooks

### Code Structure
- ✅ **Component Separation**: Each tab in separate component
- ✅ **Props Interface**: Clear prop definitions for all components
- ✅ **State Flow**: Proper parent-child communication
- ✅ **API Ready**: Mock data structure ready for real API integration

## 🔌 API Integration Details

### API Files Structure

#### 1. Market Insights API (`app/routes/api.market-insights.jsx`)
```javascript
// File: app/routes/api.market-insights.jsx
import { json } from "@remix-run/node";

const API_BASE_URL = 'http://localhost:3001'; // Development
// const API_BASE_URL = 'https://api.tikminer.info'; // Production

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const productTitle = formData.get("productTitle");
    const productDescription = formData.get("productDescription");
    const productId = formData.get("productId");

    // Prepare request data
    const requestData = {
      product_title: productTitle,
      product_description: productDescription,
      product_id: productId || undefined
    };

    // Add optional fields if provided
    if (productImage) {
      requestData.product_image = productImage;
    }
    
    if (targetMarket) {
      requestData.target_market = targetMarket;
    }

    // Calls external API: POST http://localhost:3001/api/product-optimize/suggest-data
    const response = await fetch(`${API_BASE_URL}/api/product-optimize/suggest-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return json({ success: false, error: errorData.error }, { status: response.status });
    }

    const data = await response.json();
    
    // Transform data for UI consumption
    const keywords = [
      ...(data.keywords.informational || []).map(k => k.keyword),
      ...(data.keywords.transactional || []).map(k => k.keyword),
      ...(data.keywords.comparative || []).map(k => k.keyword),
      ...(data.keywords.painpoint_related || []).map(k => k.keyword),
    ];

    const personas = (data.target_customers || []).map(tc => tc.name);
    const painpoints = [...new Set((data.target_customers || []).flatMap(tc => tc.common_painpoints))];

    return json({ success: true, data: { keywords, personas, painpoints } });

  } catch (error) {
    console.error("Error in /api/market-insights action:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
```

#### 2. Content Optimization API (`app/routes/api.optimize-content.jsx`)
```javascript
// File: app/routes/api.optimize-content.jsx
import { json } from "@remix-run/node";

const API_BASE_URL = 'http://localhost:3001'; // Development
// const API_BASE_URL = 'https://api.tikminer.info'; // Production

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const productTitle = formData.get("productTitle");
    const productDescription = formData.get("productDescription");
    const productId = formData.get("productId");
    const type = formData.get("type");
    const keywords = JSON.parse(formData.get("keywords") || "[]");
    const persona = formData.get("persona");
    const painpoints = JSON.parse(formData.get("painpoints") || "[]");
    const tone = formData.get("tone");

    let requestData = {
      product_title: productTitle,
      product_description: productDescription,
      product_id: productId,
      tone: tone
    };

    // Construct data based on optimization type
    switch (type) {
      case "keyword":
        requestData.keywords = keywords;
        break;
      case "segmentation":
        if (persona) {
          requestData.segment_data = { name: persona, common_painpoints: painpoints };
        }
        break;
      case "painpoint":
        if (painpoints.length > 0) {
          requestData.painpoint_data = { painpoint: painpoints[0], customer: persona };
        }
        break;
      default:
        return json({ success: false, error: "Invalid optimization type" }, { status: 400 });
    }

    // Calls external API: POST http://localhost:3001/api/product-optimize/optimize
    const response = await fetch(`${API_BASE_URL}/api/product-optimize/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data: requestData })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return json({ success: false, error: errorData.error }, { status: response.status });
    }

    const data = await response.json();
    return json({ success: true, new_title: data.new_title, new_description: data.new_description });

  } catch (error) {
    console.error("Error in /api/optimize-content action:", error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
```

### How to Call APIs from Components

#### 1. From OptimizationSettings Component
```javascript
// File: app/components/ProductDetail/OptimizationSettings.jsx
import { useFetcher } from "@remix-run/react";

const fetcher = useFetcher();

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
  
  // Add product image if available
  if (product.featuredMedia) {
    formData.append("productImage", product.featuredMedia);
  }
  
  // Add target market from current settings
  if (localSettings.targetMarket) {
    formData.append("targetMarket", localSettings.targetMarket);
  }

  fetcher.submit(formData, { 
    method: "post", 
    action: "/api/market-insights" 
  });
};

// Handle response
useEffect(() => {
  if (fetcher.data) {
    if (fetcher.data.success) {
      const { keywords, personas, painpoints } = fetcher.data.data;
      
      setAvailableKeywords(keywords || []);
      setAvailablePersonas(personas || []);
      setAvailablePainpoints(painpoints || []);
      
      setToast({ active: true, message: "Market insights loaded successfully!" });
    } else {
      setToast({ active: true, message: fetcher.data.error || "Failed to get market insights" });
    }
    setIsLoadingInsights(false);
  }
}, [fetcher.data]);
```

#### 2. From ContentOptimizationTab Component
```javascript
// File: app/components/ProductDetail/ContentOptimizationTab.jsx
import { useFetcher } from "@remix-run/react";

const optimizeFetcher = useFetcher();

const handleGenerateSEO = async () => {
  if (!settings.keywords || settings.keywords.length === 0) {
    setToast({ active: true, message: "Please select keywords in settings first" });
    return;
  }

  setIsGenerating(true);
  
  const formData = new FormData();
  formData.append("productTitle", currentTitle);
  formData.append("productDescription", currentDescription);
  formData.append("productId", product.id);
  formData.append("type", "keyword");
  formData.append("keywords", JSON.stringify(settings.keywords));
  formData.append("persona", settings.persona || "");
  formData.append("painpoints", JSON.stringify(settings.painpoints || []));
  formData.append("tone", settings.tone || "friendly");

  optimizeFetcher.submit(formData, { 
    method: "post", 
    action: "/api/optimize-content" 
  });
};

// Handle response
React.useEffect(() => {
  if (optimizeFetcher.data) {
    if (optimizeFetcher.data.success) {
      const { new_title, new_description } = optimizeFetcher.data;
      
      // Create suggestions array from API response
      const newSuggestions = [
        {
          id: 1,
          title: new_title,
          description: new_description.replace(/<[^>]*>/g, ''), // Strip HTML
          fullDescription: new_description
        }
      ];
      
      setSuggestions(newSuggestions);
      
      // Update preview with first suggestion
      setSeoPreview({
        title: new_title,
        description: new_description.replace(/<[^>]*>/g, '').substring(0, 160),
        url: product.shopifyUrl || ''
      });
      
      setToast({ active: true, message: "Content optimized successfully!" });
    } else {
      setToast({ active: true, message: optimizeFetcher.data.error || "Failed to optimize content" });
    }
    setIsGenerating(false);
  }
}, [optimizeFetcher.data]);
```

### External API Documentation

#### Base URLs
- **Development**: `http://localhost:3001`
- **Production**: `https://api.tikminer.info`

#### External API Endpoints

##### 1. Suggest Data API
- **Endpoint**: `POST /api/product-optimize/suggest-data`
- **Purpose**: Get AI suggestions for keywords, personas, and pain points
- **Request**:
  ```json
  {
    "product_title": "Product Title",
    "product_description": "Product Description",
    "product_id": "product_id",
    "product_image": "https://example.com/image.jpg",
    "target_market": "US"
  }
  ```
- **Response**:
  ```json
  {
    "keywords": {
      "informational": [{"keyword": "keyword1", "volume": 1000}],
      "transactional": [{"keyword": "buy keyword1", "volume": 500}],
      "comparative": [{"keyword": "keyword1 vs keyword2", "volume": 200}],
      "painpoint_related": [{"keyword": "keyword1 problems", "volume": 300}]
    },
    "target_customers": [
      {
        "name": "Customer Persona 1",
        "common_painpoints": ["painpoint1", "painpoint2"]
      }
    ]
  }
  ```

##### 2. Optimize Content API
- **Endpoint**: `POST /api/product-optimize/optimize`
- **Purpose**: Generate optimized content based on strategy
- **Request**:
  ```json
  {
    "type": "keyword",
    "data": {
      "product_title": "Current Title",
      "product_description": "Current Description",
      "product_id": "product_id",
      "keywords": ["keyword1", "keyword2"],
      "tone": "friendly"
    }
  }
  ```
- **Response**:
  ```json
  {
    "new_title": "Optimized Title",
    "new_description": "Optimized Description with HTML"
  }
  ```

### API Error Handling

#### Common Error Responses
```javascript
// Success Response
{
  "success": true,
  "data": { /* response data */ }
}

// Error Response
{
  "success": false,
  "error": "Error message"
}
```

#### Error Handling in Components
```javascript
// Check for success/error in response
if (fetcher.data) {
  if (fetcher.data.success) {
    // Handle success
    setToast({ active: true, message: "Operation successful!" });
  } else {
    // Handle error
    setToast({ active: true, message: fetcher.data.error || "Operation failed" });
  }
}
```

### Testing APIs

#### Test Market Insights API
```bash
curl -X POST http://localhost:3001/api/product-optimize/suggest-data \
  -H "Content-Type: application/json" \
  -d '{
    "product_title": "Test Product",
    "product_description": "Test description",
    "product_id": "test123",
    "product_image": "https://example.com/test-image.jpg",
    "target_market": "US"
  }'
```

#### Test Content Optimization API
```bash
curl -X POST http://localhost:3001/api/product-optimize/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "type": "keyword",
    "data": {
      "product_title": "Test Product",
      "product_description": "Test description",
      "keywords": ["test", "product"],
      "tone": "friendly"
    }
  }'
```

---

**Last Updated**: January 2025
**Version**: 2.1.0
**Maintainer**: Development Team
