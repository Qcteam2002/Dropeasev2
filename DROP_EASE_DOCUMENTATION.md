# DropEase - Shopify App Documentation

## **📋 Tổng quan App**

**DropEase** là một Shopify app được thiết kế để giúp merchants tối ưu hóa sản phẩm và tăng conversion rate thông qua AI-powered optimization và các widget blocks thông minh.

### **🎯 Mục tiêu chính:**
- Tự động tối ưu hóa sản phẩm với AI
- Tăng conversion rate thông qua các widget blocks
- Đơn giản hóa quy trình quản lý sản phẩm
- Cung cấp virtual try-on cho sản phẩm thời trang

---

## **🏗️ Kiến trúc App**

### **Tech Stack:**
- **Framework:** Remix (React-based)
- **Database:** Prisma + PostgreSQL
- **UI:** Shopify Polaris
- **AI Integration:** OpenRouter API (Gemini 2.5 Flash)
- **Queue System:** Bull/BullMQ + Redis
- **File Storage:** Local + Cloud storage

### **Cấu trúc thư mục:**
```
app/
├── components/          # React components
├── routes/             # Remix routes (pages + API)
├── server/services/    # Business logic services
├── models/             # Database models
├── hooks/              # React hooks
├── utils/              # Utility functions
└── shopify_theme/      # Theme integration files

extensions/
└── demo-theme-ext/     # Shopify theme extension
    ├── blocks/         # Liquid blocks
    ├── assets/         # CSS/JS assets
    └── snippets/       # Reusable Liquid snippets
```

---

## **📱 Menu Structure & Features**

### **1. 🏠 Dashboard (app._index.jsx)**
**Chức năng:**
- Hiển thị tổng quan app
- Setup guide cho new users
- Product sync từ Shopify
- Deeplinks đến theme editor

**Key Features:**
- Auto-sync products từ Shopify store
- Setup guide với step-by-step instructions
- Quick access đến theme editor
- Product optimization preview

### **2. 📦 Products (app.productlst.jsx)**
**Chức năng:**
- Quản lý danh sách sản phẩm
- Xem trạng thái optimization
- Tìm kiếm và filter sản phẩm
- Bulk operations

**Key Features:**
- **Product List View:** Hiển thị tất cả sản phẩm với pagination
- **Search & Filter:** Tìm kiếm theo tên, filter theo trạng thái optimization
- **Status Indicators:** 
  - 🟢 Optimized (đã tối ưu)
  - 🔴 Non-Optimized (chưa tối ưu)
- **Bulk Actions:** Chọn nhiều sản phẩm để xử lý cùng lúc
- **Product Details:** Click vào sản phẩm để xem chi tiết

**Database Schema:**
```sql
PlatformProduct {
  id: BigInt (Primary Key)
  platformId: String (Shopify Product ID)
  title: String
  descriptionHtml: String
  featuredMedia: String
  variants: JSON
  status: String
  media: JSON
  options: JSON
  metafields: JSON
  userId: BigInt
  createdAt: DateTime
  updatedAt: DateTime
}
```

### **3. 📄 Product Detail (app.product.detail.$id.jsx)**
**Chức năng:**
- Xem chi tiết sản phẩm
- Preview optimized content
- Push sản phẩm lên Shopify store
- Xem feature highlights và reviews

**Key Features:**
- **Product Gallery:** Hiển thị ảnh sản phẩm với thumbnail navigation
- **Variant Selection:** Chọn màu sắc, size
- **Optimized Content:** Hiển thị title, description đã được AI optimize
- **Feature Highlights:** Grid view với AI-generated features
- **Product Reviews:** Carousel reviews với ratings
- **Payment Icons:** Hiển thị các phương thức thanh toán
- **Push to Store:** Đồng bộ sản phẩm lên Shopify

**Data Flow:**
```
PlatformProduct → ProductsOptimized → Shopify Store
     ↓                    ↓              ↓
  Raw Data         AI Optimized    Live Store
```

### **4. 🧩 Widgets (app.widget.jsx)**
**Chức năng:**
- Quản lý các widget blocks
- Add blocks vào theme
- Customize block settings
- Toggle active/inactive

**Available Widgets:**

#### **A. Payment Icons Block**
- **Chức năng:** Hiển thị các phương thức thanh toán (Visa, Mastercard, PayPal, Apple Pay)
- **Customization:** Icon size, spacing, background color, selected icons
- **Status:** Active/Inactive với toggle switch

#### **B. Policy Features Block**
- **Chức năng:** Hiển thị chính sách (Free Shipping, Money Back, Secure Payment, Easy Returns)
- **Customization:** Icon size, spacing, background color, selected features
- **Status:** Active/Inactive với toggle switch

#### **C. Feature Highlights Block (GridView)**
- **Chức năng:** Hiển thị tính năng nổi bật của sản phẩm
- **Content:** AI-generated titles, descriptions, images
- **Layout:** Alternating left-right layout
- **Responsive:** Mobile-friendly design

#### **D. Product Review Block**
- **Chức năng:** Hiển thị đánh giá sản phẩm
- **Content:** AI-generated reviews với ratings
- **Layout:** Carousel format với navigation

#### **E. Virtual Try-On Widget**
- **Chức năng:** Cho phép khách hàng upload ảnh và thử đồ ảo
- **AI Integration:** OpenRouter API với Gemini 2.5 Flash
- **Features:** Custom prompts, image processing

#### **F. Sticky Bar**
- **Chức năng:** Thanh sticky với variant picker và quick buy
- **Features:** Smart product bar, variant selection

#### **G. Video Highlights**
- **Chức năng:** Video nổi bật sản phẩm
- **Features:** Floating video, customizable settings

**Widget Management:**
- **Add to Theme:** Deeplink đến theme editor
- **Customize:** Settings page cho mỗi widget
- **Activate/Deactivate:** Toggle trạng thái
- **Reset:** Xóa cấu hình và reset về default

### **5. ⚙️ Settings & Configuration**

#### **Widget Settings Pages:**
- **app.widgets.payment-icons.settings.jsx:** Cấu hình payment icons
- **app.widgets.policy-features.settings.jsx:** Cấu hình policy features
- **app.widgets.sticky-bar.settings.jsx:** Cấu hình sticky bar
- **app.widgets.tryon.settings.jsx:** Cấu hình virtual try-on

---

## **🤖 AI-Powered Features**

### **1. Product Optimization (optimizeProduct.js)**
**Chức năng:**
- Tối ưu hóa title và description
- Tạo feature highlights
- Generate product reviews
- Optimize product images

**AI Integration:**
```javascript
// API calls to external AI service
const apiCalls = [
  fetch("http://127.0.0.1:5004/api/openai/optimize", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  fetch("http://127.0.0.1:5004/api/openai", {
    method: "POST", 
    body: JSON.stringify(payload)
  })
];
```

**Optimization Options:**
- **Title/Description:** SEO-optimized content
- **Feature Highlights:** Key product benefits
- **Product Reviews:** AI-generated customer reviews
- **Images:** Image optimization và enhancement

### **2. Virtual Try-On (api.tryon-generate.jsx)**
**Chức năng:**
- Generate virtual try-on images
- AI-powered image processing
- Custom styling prompts

**Technical Implementation:**
```javascript
// OpenRouter API integration
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "google/gemini-2.5-flash-image-preview",
    "messages": [/* multimodal content */]
  })
});
```

**Features:**
- **Image Processing:** Product image + user image → try-on result
- **Custom Prompts:** User có thể thêm styling requests
- **Fallback Handling:** Mock results nếu AI fails
- **CORS Support:** Cross-origin requests từ storefront

---

## **🔄 Data Flow & Webhooks**

### **1. Product Sync (webhooks.products.jsx)**
**Webhook Events:**
- `PRODUCTS_CREATE`: Tạo sản phẩm mới
- `PRODUCTS_UPDATE`: Cập nhật sản phẩm
- `PRODUCTS_DELETE`: Xóa sản phẩm

**Data Processing:**
```javascript
// Process product data
const processProductData = (product) => ({
  title: product.title,
  descriptionHtml: product.body_html,
  featuredMedia: product.image?.src || null,
  variants: JSON.stringify(product.variants),
  status: product.status,
  media: JSON.stringify(product.images || []),
  options: JSON.stringify(product.options || []),
  metafields: JSON.stringify(product.metafields || [])
});
```

### **2. Database Schema**
```sql
-- Main product table
PlatformProduct {
  id: BigInt PRIMARY KEY
  platformId: String (Shopify ID)
  title: String
  descriptionHtml: String
  featuredMedia: String
  variants: JSON
  status: String
  media: JSON
  options: JSON
  metafields: JSON
  userId: BigInt
  createdAt: DateTime
  updatedAt: DateTime
}

-- Optimized content table
ProductsOptimized {
  id: BigInt PRIMARY KEY
  productId: BigInt (FK to PlatformProduct)
  optimizedTitle: String
  optimizedDescription: String
  gridView: JSON (Feature highlights)
  reviewConfiguration: JSON
  gridviewConfiguration: JSON
  isOptimized: Boolean
  optimizedAt: DateTime
}

-- Widget configuration
WidgetConfig {
  id: BigInt PRIMARY KEY
  shopDomain: String
  enabled: Boolean
  configuration: JSON
  createdAt: DateTime
  updatedAt: DateTime
}

-- Shop management
Shop {
  id: BigInt PRIMARY KEY
  shop: String
  onboarded: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

## **🎨 Theme Integration**

### **1. Theme Extension (extensions/demo-theme-ext/)**
**Block Types:**
- **gridview-block.liquid:** Feature highlights display
- **product-review-block.liquid:** AI-generated reviews
- **payment-block.liquid:** Payment methods
- **policyfeature-block.liquid:** Policy features
- **tryon-widget-block.liquid:** Virtual try-on
- **sticky-bar-block.liquid:** Sticky product bar

### **2. Asset Files:**
- **ai-review-loader.js:** Dynamic review loading
- **tryon-widget.js:** Virtual try-on functionality
- **section-text-accordion.css:** Styling for accordions
- **Payment icons:** SVG icons for payment methods

### **3. Liquid Templates:**
```liquid
<!-- Feature Highlights Block -->
<div class="grid-view-section">
  {% assign grid_items = product.metafields.gridview.configuration.value | json %}
  {% for item in grid_items limit: 5 %}
    <div class="product-grid-item">
      <div class="grid-item-image">
        <img src="{{ item.image }}" alt="{{ item.title }}">
      </div>
      <div class="grid-item-text">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
  {% endfor %}
</div>
```

---

## **📊 Performance & Analytics**

### **1. Optimization Tracking:**
- **Conversion Rate Improvement:** Track before/after optimization
- **Product Performance:** Views, clicks, conversions
- **AI Success Rate:** Track AI generation success
- **User Engagement:** Widget usage statistics

### **2. Database Optimization:**
- **Indexing:** Optimized queries for large product catalogs
- **Caching:** Redis caching for frequently accessed data
- **Batch Processing:** Queue system for bulk operations

---

## **🚀 Deployment & Configuration**

### **1. Environment Variables:**
```bash
# Shopify Configuration
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=your_app_url

# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# AI Services
OPENROUTER_API_KEY=your_openrouter_key

# Redis
REDIS_URL=redis://localhost:6379
```

### **2. Docker Configuration:**
- **Dockerfile:** Multi-stage build for production
- **docker-compose.yml:** Local development setup
- **Environment:** Development, staging, production

### **3. Shopify App Configuration:**
```toml
# shopify.app.toml
client_id = "your_client_id"
name = "DropEase"
handle = "dropease"
application_url = "https://your-app.com"
embedded = true

[access_scopes]
scopes = "read_files,read_locales,read_markets,read_products,read_themes,write_files,write_products,write_themes"

[webhooks]
api_version = "2024-01"
```

---

## **🔧 API Endpoints**

### **1. Product Management:**
- `GET /app/productlst` - Product list page
- `GET /app/product/detail/:id` - Product detail page
- `POST /api/save-optimized-product` - Save optimized content

### **2. AI Services:**
- `POST /api/tryon-generate` - Virtual try-on generation
- `POST /api/optimize-product` - Product optimization

### **3. Widget Management:**
- `GET /app/widget` - Widget management page
- `POST /app/widget` - Toggle widget status
- `GET /app/widgets/:type/settings` - Widget settings

### **4. Webhooks:**
- `POST /webhooks/products` - Product sync webhook
- `POST /webhooks/app/uninstalled` - App uninstall webhook

---

## **📈 Current Features Status**

### **✅ Implemented Features:**
1. **Product Management System**
   - Product sync từ Shopify
   - Product list với search/filter
   - Product detail view
   - Push to store functionality

2. **AI-Powered Optimization**
   - Title/Description optimization
   - Feature highlights generation
   - Product reviews generation
   - Virtual try-on với OpenRouter API

3. **Widget System**
   - Payment Icons block
   - Policy Features block
   - Feature Highlights block
   - Product Review block
   - Virtual Try-On widget
   - Sticky Bar
   - Video Highlights

4. **Theme Integration**
   - Liquid blocks cho theme
   - Deeplinks đến theme editor
   - Responsive design
   - Custom styling options

5. **Database & Webhooks**
   - Prisma ORM với PostgreSQL
   - Product sync webhooks
   - Optimization tracking
   - Widget configuration storage

### **🔄 In Progress:**
1. **Bulk Operations**
   - Bulk product optimization
   - Batch processing system
   - Progress tracking

2. **Advanced Analytics**
   - Performance metrics
   - Conversion tracking
   - Optimization ROI

### **📋 Planned Features:**
1. **AI Optimizer Menu**
   - Smart recommendations
   - Bulk optimization interface
   - Content generator
   - Performance insights

2. **Advanced Features**
   - A/B testing
   - Multi-language support
   - Advanced reporting
   - Custom widget builder

---

## **🎯 User Flow Summary**

### **1. New User Onboarding:**
```
Install App → Onboarding → Product Sync → Setup Widgets → Go Live
```

### **2. Product Optimization Flow:**
```
Products List → Select Product → Optimize Options → AI Processing → Review Results → Apply
```

### **3. Widget Management Flow:**
```
Widgets Menu → Select Widget → Add to Theme → Customize Settings → Activate
```

### **4. Virtual Try-On Flow:**
```
Product Page → Upload User Image → AI Processing → Generate Try-On → Display Result
```

---

## **📞 Support & Documentation**

### **User Guides:**
- Setup and Installation
- Widget Configuration
- AI Optimization Best Practices
- Troubleshooting Common Issues

### **Developer Resources:**
- API Documentation
- Webhook Specifications
- Theme Integration Guide
- Custom Development Guidelines

---

## **🔍 Key Files Reference**

### **Main Application Files:**
- `app/routes/app._index.jsx` - Dashboard
- `app/routes/app.productlst.jsx` - Product list
- `app/routes/app.product.detail.$id.jsx` - Product detail
- `app/routes/app.widget.jsx` - Widget management
- `app/server/services/optimizeProduct.js` - AI optimization
- `app/routes/api.tryon-generate.jsx` - Virtual try-on API

### **Theme Extension Files:**
- `extensions/demo-theme-ext/blocks/gridview-block.liquid` - Feature highlights
- `extensions/demo-theme-ext/blocks/payment-block.liquid` - Payment icons
- `extensions/demo-theme-ext/blocks/policyfeature-block.liquid` - Policy features
- `extensions/demo-theme-ext/assets/tryon-widget.js` - Virtual try-on widget

### **Database Schema:**
- `prisma/schema.prisma` - Database schema definition
- `app/models/PlatformProduct.js` - Product model
- `app/db.server.js` - Database connection

---

**Tài liệu này cung cấp cái nhìn toàn diện về DropEase app, từ kiến trúc kỹ thuật đến các tính năng người dùng, giúp developers và stakeholders hiểu rõ về app và cách thức hoạt động.**

**Version:** 1.0  
**Last Updated:** January 2025  
**Author:** Development Team
















