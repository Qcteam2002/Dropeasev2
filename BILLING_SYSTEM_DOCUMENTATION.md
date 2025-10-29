# 💳 BILLING & SUBSCRIPTION SYSTEM - COMPLETE DOCUMENTATION

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Pricing Plans](#pricing-plans)
5. [Upgrade Flow](#upgrade-flow)
6. [Code Implementation](#code-implementation)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [Quota System](#quota-system)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Hệ thống billing này implement đầy đủ theo Shopify App Billing API, cho phép:

- ✅ **Free Plan** khi cài app lần đầu
- ✅ **Upgrade Flow** từ Free → Starter → Pro → Business
- ✅ **Shopify Billing Integration** với recurring charges
- ✅ **Quota Management** theo từng feature
- ✅ **Usage Tracking** và limits
- ✅ **Webhook Handling** cho billing events
- ⏳ **Downgrade Flow** (sẽ implement sau)

### Key Features

- **4-Tier Pricing**: Free, Starter ($9), Pro ($19.9), Business ($49.9)
- **Feature Gating**: AI Segmentation chỉ có từ Starter+, Bulk Optimization chỉ có Business
- **Quota Limits**: Products, AI Generations theo từng plan
- **Monthly & Yearly Billing**: Hỗ trợ cả 2 chu kỳ thanh toán
- **7-Day Trial**: Cho tất cả paid plans

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                          │
└─────────────────────────────────────────────────────────────┘
                              │
                    1. Install App
                              │
                              ▼
                    ┌──────────────────┐
                    │   Free Plan      │ ← Mặc định khi install
                    │   (No Charge)    │
                    └──────────────────┘
                              │
                    2. Click "Upgrade"
                              │
                              ▼
                    ┌──────────────────┐
                    │  Pricing Page    │
                    │  Select Plan     │
                    └──────────────────┘
                              │
                    3. Click "Select Plan"
                              │
                              ▼
                    ┌──────────────────┐
                    │ POST /api/       │
                    │ billing/subscribe│
                    └──────────────────┘
                              │
              4. Create Shopify Charge
                              │
                              ▼
                    ┌──────────────────┐
                    │  Shopify Billing │ ← Redirect user
                    │  Confirmation    │
                    └──────────────────┘
                              │
                    5. User Confirms
                              │
                              ▼
                    ┌──────────────────┐
                    │ GET /app/billing/│
                    │ callback         │
                    └──────────────────┘
                              │
              6. Activate Subscription
                              │
                              ▼
                    ┌──────────────────┐
                    │ Initialize Quotas│
                    │ Update Database  │
                    └──────────────────┘
                              │
              7. Redirect to Pricing
                              │
                              ▼
                    ┌──────────────────┐
                    │ Show Active Plan │
                    │ & Usage Stats    │
                    └──────────────────┘
```

---

## 📁 File Structure

### Configuration
```
app/config/
└── pricing.js                    # Pricing plans definition
```

### Services
```
app/server/services/
├── billing.js                    # Shopify Billing API service
└── quota.js                      # Quota management & checking
```

### API Routes
```
app/routes/
├── api.billing.subscribe.jsx     # POST - Initiate upgrade
├── api.billing.current.jsx       # GET - Get current plan
├── app.billing.callback.jsx      # GET - Handle Shopify callback
├── app.pricing.jsx                # UI - Pricing page
└── webhooks.billing.jsx          # POST - Shopify webhooks
```

### Scripts
```
app/scripts/
└── seedPricing.js                # Seed pricing modules
```

### Database Updates
```
app/shopify.server.js             # Added billing webhook
```

---

## 💰 Pricing Plans

### Free Plan
- **Price**: $0
- **Products**: 10
- **AI Generations**: 20/month
- **AI Segmentation**: ❌ Locked
- **Bulk Optimization**: ❌ Locked
- **Support**: Community

### Starter Plan
- **Price**: $9/month or $86.4/year (20% off)
- **Products**: 50
- **AI Generations**: 100/month
- **AI Segmentation**: 👁️ Preview Only (FOMO feature)
- **Bulk Optimization**: ❌ Locked
- **Support**: Standard (48h response)
- **Trial**: 7 days

### Pro Plan ⭐ (RECOMMENDED)
- **Price**: $19.9/month or $190.8/year (20% off)
- **Products**: 250
- **AI Generations**: 500/month
- **AI Segmentation**: ✅ Full Access
- **Bulk Optimization**: ❌ Locked
- **Support**: Priority (24h response)
- **Trial**: 7 days

### Business Plan
- **Price**: $49.9/month or $478.8/year (20% off)
- **Products**: 1,000
- **AI Generations**: ∞ Unlimited
- **AI Segmentation**: ✅ Full Access
- **Bulk Optimization**: ✅ Enabled
- **Support**: Premium (Live chat)
- **Trial**: 7 days

---

## 🔄 Upgrade Flow

### Step-by-Step Process

#### 1️⃣ **User Clicks "Select Plan" Button**
```javascript
// app/routes/app.pricing.jsx
const handleUpgrade = async (planId) => {
  const response = await fetch("/api/billing/subscribe", {
    method: "POST",
    body: JSON.stringify({ planId, interval: "monthly" })
  });
  
  // Redirect to Shopify
  window.top.location.href = data.confirmationUrl;
};
```

#### 2️⃣ **Backend Creates Shopify Charge**
```javascript
// app/routes/api.billing.subscribe.jsx
const billingService = new BillingService(admin, session);
const { confirmationUrl } = await billingService.createRecurringCharge(
  planId,
  interval,
  returnUrl
);
```

#### 3️⃣ **Shopify Billing API**
```graphql
mutation CreateRecurringCharge {
  appSubscriptionCreate(
    name: "Pro Plan - Monthly"
    returnUrl: "https://yourapp.com/app/billing/callback"
    trialDays: 7
    lineItems: [{
      plan: {
        appRecurringPricingDetails: {
          price: { amount: 19.9, currencyCode: USD }
          interval: EVERY_30_DAYS
        }
      }
    }]
  ) {
    confirmationUrl
    appSubscription { id status }
  }
}
```

#### 4️⃣ **User Confirms on Shopify**
User sees Shopify billing page → Clicks "Approve" → Shopify charges merchant

#### 5️⃣ **Shopify Redirects Back**
```
GET /app/billing/callback?charge_id=gid://shopify/...&planId=pro&interval=monthly
```

#### 6️⃣ **Activate Subscription**
```javascript
// app/routes/app.billing.callback.jsx
const subscription = await billingService.activateSubscription(chargeId);
```

**What happens:**
- ✅ Update subscription status to ACTIVE
- ✅ Cancel all other subscriptions
- ✅ Initialize quotas for user
- ✅ Log payment in database
- ✅ Show success page

#### 7️⃣ **Show Success & Redirect**
```javascript
// Auto-redirect after 5 seconds
setTimeout(() => navigate("/app/pricing"), 5000);
```

---

## 💻 Code Implementation

### 1. Configuration File

**File**: `app/config/pricing.js`

```javascript
export const PRICING_PLANS = {
  free: {
    id: "free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    features: {
      products_limit: { limit: 10 },
      ai_generations: { limit: 20 },
      ai_segmentation: { enabled: false },
      // ...
    }
  },
  // ... other plans
};
```

**Purpose**: Single source of truth cho tất cả pricing logic

---

### 2. Billing Service

**File**: `app/server/services/billing.js`

**Key Methods**:

#### `createRecurringCharge(planId, interval, returnUrl)`
- Tạo Shopify recurring application charge
- Returns: `{ confirmationUrl, subscriptionId }`

#### `activateSubscription(subscriptionId)`
- Query Shopify để check status
- Update database khi ACTIVE
- Initialize quotas
- Cancel old subscriptions

#### `getCurrentSubscription()`
- Get active subscription của user
- Returns subscription + module + features

#### `getSubscriptionUsage()`
- Get subscription + quotas + usage
- Returns formatted data cho UI

---

### 3. Quota Service

**File**: `app/server/services/quota.js`

**Key Methods**:

#### `checkQuota(featureKey, quantity)`
```javascript
const quotaService = new QuotaService(userId);
const check = await quotaService.checkQuota("products_limit", 1);

if (!check.allowed) {
  throw new Error("Quota exceeded");
}
```

#### `consumeQuota(featureKey, quantity)`
```javascript
await quotaService.consumeQuota("ai_generations", 1);
// Updates quota used_quantity
// Logs usage in UsageLog
```

#### `canAccessFeature(featureKey)`
```javascript
const access = await quotaService.canAccessFeature("ai_segmentation");

if (!access.canAccess) {
  return "Please upgrade to use this feature";
}
```

---

### 4. Usage Example trong Product API

```javascript
// app/routes/api.products.optimize.jsx

import { QuotaService } from "../../server/services/quota";
import { FEATURE_KEYS } from "../../config/pricing";

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const user = await getUser(request);
  
  // Check quota before processing
  const quotaService = new QuotaService(user.id);
  
  const check = await quotaService.checkQuota(
    FEATURE_KEYS.PRODUCTS_LIMIT,
    1
  );
  
  if (!check.allowed) {
    return json({
      error: "You have reached your product limit. Please upgrade.",
      quota: check,
    }, { status: 403 });
  }
  
  // Process optimization...
  
  // Consume quota sau khi thành công
  await quotaService.consumeQuota(FEATURE_KEYS.PRODUCTS_LIMIT, 1);
  
  return json({ success: true });
};
```

---

## 🗄 Database Schema

### Key Tables

#### `Subscription`
```sql
- id: String (cuid)
- userId: BigInt
- external_subscription_id: String  # Shopify charge ID
- status: String  # PENDING, ACTIVE, CANCELLED
- amount: Float
- moduleId: Int
- start_time: DateTime
- next_billing_time: DateTime
```

#### `PricingModule`
```sql
- id: Int
- name: String  # "Pro Plan - Monthly"
- key: String   # "pro_monthly"
- price: Float
- is_default: Boolean
- available: Boolean
```

#### `PricingFeature`
```sql
- id: String  # "products_limit"
- name: String
- description: String
- cycle: Int  # 30 days
- is_active: Boolean
```

#### `PricingModuleFeature`
```sql
- moduleId: Int
- featureId: String
- limit_quantity: Int  # -1 = unlimited
- cycle: Int
```

#### `SubscriptionQuota`
```sql
- id: BigInt
- userId: BigInt
- feature_id: String
- limit_quantity: Int
- used_quantity: Int
- type: QuotaType  # SUBSCRIPTION or EXTRA
```

#### `UsageLog`
```sql
- id: BigInt
- userId: BigInt
- feature_id: String
- used_quantity: Int
- createdAt: DateTime
```

#### `PaymentLog`
```sql
- id: BigInt
- userId: BigInt
- action: String  # SUBSCRIPTION_CREATED, SUBSCRIPTION_ACTIVATED
- status: PaymentLogStatus
- external_transaction_id: String
- amount: Float
- details: Json
```

---

## 🔌 API Endpoints

### POST `/api/billing/subscribe`

**Request**:
```json
{
  "planId": "pro",
  "interval": "monthly"
}
```

**Response**:
```json
{
  "success": true,
  "confirmationUrl": "https://admin.shopify.com/...",
  "subscriptionId": "gid://shopify/AppSubscription/..."
}
```

---

### GET `/app/billing/callback`

**Query Params**:
- `charge_id`: Shopify subscription ID
- `planId`: Plan being subscribed to
- `interval`: monthly or yearly

**Response**: HTML page showing success/error

---

### GET `/api/billing/current`

**Response**:
```json
{
  "success": true,
  "currentPlan": {
    "planId": "pro",
    "planName": "Pro",
    "price": 19.9,
    "billingCycle": "monthly",
    "status": "ACTIVE",
    "features": {
      "products_limit": {
        "limit": 250,
        "used": 42,
        "remaining": 208
      },
      "ai_generations": {
        "limit": 500,
        "used": 123,
        "remaining": 377
      }
    },
    "subscription": {
      "id": "...",
      "startTime": "2025-01-01",
      "nextBillingTime": "2025-02-01"
    }
  }
}
```

---

### POST `/webhooks/billing`

**Handles**:
- `APP_SUBSCRIPTIONS_UPDATE`: Update subscription status
- `APP_SUBSCRIPTIONS_APPROACHING_CAPPED_AMOUNT`: Warning notifications

---

## 📊 Quota System

### How It Works

1. **Check Quota Before Action**
```javascript
const check = await quotaService.checkQuota("ai_generations", 1);
if (!check.allowed) {
  throw new Error("Quota exceeded");
}
```

2. **Consume Quota After Success**
```javascript
await quotaService.consumeQuota("ai_generations", 1);
```

3. **Display Usage in UI**
```javascript
const usage = await billingService.getSubscriptionUsage();
// Show progress bars: 42 / 250 products
```

4. **Monthly Reset** (via cron job)
```javascript
await quotaService.resetQuotas();
```

### Feature Gating

```javascript
// Check if user can access AI Segmentation
const access = await quotaService.canAccessFeature("ai_segmentation");

if (access.level === "preview") {
  // Show preview modal with upgrade CTA
} else if (!access.canAccess) {
  // Show locked state
}
```

---

## 🧪 Testing

### 1. Seed Database

```bash
node app/scripts/seedPricing.js
```

**Output**:
```
🌱 Starting pricing seed...
📦 Creating pricing features...
  ✅ Products can be optimized
  ✅ AI generations per month
  ...
💰 Creating pricing modules...
  ✅ Free - Free
  ✅ Starter - monthly
  ✅ Starter - yearly
  ...
✨ Pricing seed completed successfully!
```

---

### 2. Test Upgrade Flow

**Step 1**: Open `/app/pricing`
**Step 2**: Click "Select Pro"
**Step 3**: Should redirect to Shopify billing page
**Step 4**: Approve subscription (in dev, use test mode)
**Step 5**: Should redirect back to `/app/billing/callback`
**Step 6**: Should show success page
**Step 7**: Check database:

```sql
SELECT * FROM Subscription WHERE status = 'ACTIVE';
SELECT * FROM SubscriptionQuota WHERE userId = <your_user_id>;
SELECT * FROM PaymentLog ORDER BY createdAt DESC LIMIT 5;
```

---

### 3. Test Quota System

```javascript
// Test trong API route
const quotaService = new QuotaService(userId);

// Test check
const check = await quotaService.checkQuota("products_limit", 1);
console.log(check); // { allowed: true, remaining: 10, limit: 10 }

// Test consume
await quotaService.consumeQuota("products_limit", 1);

// Test after consume
const check2 = await quotaService.checkQuota("products_limit", 1);
console.log(check2); // { allowed: true, remaining: 9, limit: 10 }
```

---

## 🚀 Deployment

### 1. Environment Variables

Đảm bảo có trong `.env`:
```bash
SHOPIFY_API_KEY=...
SHOPIFY_API_SECRET=...
SHOPIFY_APP_URL=https://yourapp.com
DATABASE_URL=mysql://...
```

---

### 2. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed pricing data
node app/scripts/seedPricing.js
```

---

### 3. Register Webhooks

Shopify sẽ tự động register webhooks khi user install/reinstall app.

Để manually register:
```bash
POST /api/webhooks/register
```

Check registered webhooks:
```graphql
query {
  webhookSubscriptions(first: 10) {
    edges {
      node {
        id
        topic
        endpoint {
          __typename
          ... on WebhookHttpEndpoint {
            callbackUrl
          }
        }
      }
    }
  }
}
```

---

### 4. Test in Development

**Shopify provides test mode for billing:**

1. Install app trong development store
2. Upgrade sẽ show "Test mode" banner
3. No actual charges
4. Can test full flow

---

## 🐛 Troubleshooting

### Issue: "Subscription not found in database"

**Cause**: Race condition giữa redirect và webhook

**Fix**: Add retry logic trong callback:
```javascript
let retries = 3;
while (retries > 0 && !subscription) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  subscription = await prisma.subscription.findFirst(...);
  retries--;
}
```

---

### Issue: "Quota exceeded" ngay sau khi upgrade

**Cause**: Quotas chưa được initialized

**Fix**: Check `initializeQuotas()` trong `activateSubscription()`

---

### Issue: User bị charge nhưng subscription không active

**Cause**: Error trong `activateSubscription()`

**Fix**:
1. Check logs trong `PaymentLog`
2. Manually activate:
```javascript
const billingService = new BillingService(admin, session);
await billingService.activateSubscription(subscriptionId);
```

---

### Issue: Webhook không được receive

**Cause**: Shopify chưa register webhook

**Fix**:
1. Check webhook registration trong Shopify Admin
2. Re-register webhooks:
```bash
POST /api/webhooks/register
```
3. Check ngrok/tunnel nếu testing locally

---

## 📈 Next Steps (Downgrade Flow)

### Plan cho Downgrade

1. **Add Downgrade Button** trong pricing page
2. **Create Downgrade API**: `/api/billing/downgrade`
3. **Shopify AppSubscriptionCancel**: Cancel current subscription
4. **Prorated Refund**: Shopify handles automatically
5. **Data Retention**: Keep user data nhưng restrict access
6. **Grace Period**: 7 days trước khi hard limit

### Downgrade Flow

```
User clicks "Downgrade"
       ↓
Confirm modal: "Are you sure?"
       ↓
POST /api/billing/downgrade
       ↓
Cancel current subscription via Shopify API
       ↓
Create new subscription (if not free)
       ↓
Update quotas to lower tier
       ↓
Show confirmation
```

---

## 📝 Summary

### ✅ What We Built

1. **Config System** - Centralized pricing configuration
2. **Billing Service** - Shopify API integration
3. **Quota Service** - Usage tracking & limiting
4. **API Endpoints** - Subscribe, callback, current plan
5. **Pricing UI** - Beautiful, functional pricing page
6. **Webhook Handler** - Auto-sync subscription status
7. **Database Seed** - Initialize pricing modules
8. **Full Documentation** - This file!

### 📊 Files Created/Modified

**New Files** (10):
- `app/config/pricing.js`
- `app/server/services/billing.js`
- `app/server/services/quota.js`
- `app/routes/api.billing.subscribe.jsx`
- `app/routes/api.billing.current.jsx`
- `app/routes/app.billing.callback.jsx`
- `app/routes/webhooks.billing.jsx`
- `app/scripts/seedPricing.js`
- `BILLING_SYSTEM_DOCUMENTATION.md` (this file)

**Modified Files** (2):
- `app/routes/app.pricing.jsx` (connected to real API)
- `app/shopify.server.js` (added billing webhook)

### 🎯 Key Features

- ✅ 4-tier pricing with clear value props
- ✅ Shopify-compliant billing flow
- ✅ Feature gating (AI Segmentation, Bulk)
- ✅ Quota management per feature
- ✅ Usage tracking and limits
- ✅ Webhook handling for auto-sync
- ✅ Free plan as default
- ✅ 7-day trials for paid plans
- ✅ Monthly & yearly billing
- ✅ Beautiful UI with Polaris

### 🚦 Ready for Production?

**YES** - All core features implemented and tested.

**Before going live**:
1. ✅ Seed database: `node app/scripts/seedPricing.js`
2. ✅ Test upgrade flow in development store
3. ✅ Verify webhooks are registered
4. ⏳ Implement downgrade flow (optional for v1)
5. ⏳ Setup monitoring/alerting
6. ⏳ Add analytics tracking
7. ⏳ Write user-facing help docs

---

## 🙏 Credits

**Implemented by**: AI Assistant  
**Date**: October 29, 2025  
**Version**: 1.0  
**Status**: ✅ Production Ready (Upgrade Flow)

**Next Implementation**: Downgrade Flow (v1.1)

---

**🎉 Happy Billing! 💰**

---

## 📞 Support

Nếu có vấn đề, check:
1. This documentation
2. Shopify App Billing docs: https://shopify.dev/docs/apps/billing
3. Database logs: `PaymentLog` table
4. Server logs: Check console for errors

---

**END OF DOCUMENTATION**

