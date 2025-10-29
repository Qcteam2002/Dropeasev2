# 📚 PRICING SYSTEM - COMPLETE GUIDE

## 📋 **MỤC LỤC**

1. [System Overview](#system-overview)
2. [Database Schema](#database-schema)
3. [File Structure](#file-structure)
4. [Pricing Configuration](#pricing-configuration)
5. [Billing Flow](#billing-flow)
6. [API Endpoints](#api-endpoints)
7. [Frontend Components](#frontend-components)
8. [How to Use](#how-to-use)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 **SYSTEM OVERVIEW**

Pricing system quản lý subscriptions, quotas, và features cho Shopify app:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRICING SYSTEM                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────────┐         │
│  │  Plans   │───▶│  Quotas  │───▶│   Features   │         │
│  └──────────┘    └──────────┘    └──────────────┘         │
│       │               │                  │                  │
│       │               │                  │                  │
│  ┌────▼───────────────▼──────────────────▼────────┐        │
│  │         Database (MySQL/Prisma)                │        │
│  └──────────────────────────────────────────────────┘       │
│       │                                                      │
│       │                                                      │
│  ┌────▼────────────────────────────────────────────┐        │
│  │         Shopify Billing API                     │        │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Key Concepts:**
- **Plan (Module):** Free, Starter, Pro, Business
- **Feature:** products_limit, ai_generations, etc.
- **Quota:** User's usage limit for each feature
- **Subscription:** User's active billing plan

---

## 🗄️ **DATABASE SCHEMA**

### **1. PricingModule** - Định nghĩa các plans

```prisma
model PricingModule {
  id           Int      @id @default(autoincrement())
  name         String   // "Free", "Starter", "Pro", "Business"
  key          String   // "free", "starter_monthly", "pro_monthly"
  price        Float    // 0, 19, 39, 99
  is_default   Boolean  // true for Free plan
  available    Boolean  // Is this plan available?
  createdAt    DateTime
  updatedAt    DateTime
  
  features     PricingModuleFeature[]
  Subscription Subscription[]
}
```

**Example:**
```javascript
{
  id: 1,
  name: "Free",
  key: "free",
  price: 0,
  is_default: true,
  available: true
}
```

---

### **2. PricingFeature** - Định nghĩa các features

```prisma
model PricingFeature {
  id          String   @id // "products_limit", "ai_generations"
  name        String   // "Products Limit", "AI Generations"
  description String   // Feature description
  cycle       Int      // Billing cycle (1 = monthly)
  is_active   Boolean
  createdAt   DateTime
  updatedAt   DateTime
  
  modules           PricingModuleFeature[]
  SubscriptionQuota SubscriptionQuota[]
  UsageLog          UsageLog[]
}
```

**Example:**
```javascript
{
  id: "products_limit",
  name: "Products Limit",
  description: "Number of products that can be optimized",
  cycle: 1,
  is_active: true
}
```

---

### **3. PricingModuleFeature** - Link giữa Plan và Feature

```prisma
model PricingModuleFeature {
  moduleId       Int
  featureId      String
  limit_quantity Int      // Quota limit for this feature
  cycle          Int
  createdAt      DateTime
  
  module  PricingModule?
  feature PricingFeature?
  
  @@id([moduleId, featureId])
}
```

**Example:**
```javascript
// Free plan has 10 products limit
{
  moduleId: 1,        // Free plan
  featureId: "products_limit",
  limit_quantity: 10
}

// Pro plan has 100 products limit
{
  moduleId: 3,        // Pro plan
  featureId: "products_limit",
  limit_quantity: 100
}
```

---

### **4. Subscription** - User's active subscription

```prisma
model Subscription {
  id                       String    @id
  userId                   BigInt
  start_time               DateTime?
  next_billing_time        DateTime?
  external_subscription_id String    // Shopify subscription ID
  status                   String    // PENDING/ACTIVE/CANCELLED
  amount                   Float
  moduleId                 Int
  is_trial                 Boolean?
  is_test                  Boolean?
  createdAt                DateTime
  updatedAt                DateTime
  
  module PricingModule?
  user   User?
}
```

**Example:**
```javascript
{
  id: "cmhc267oi0009stlxed250c39",
  userId: 1,
  external_subscription_id: "gid://shopify/AppSubscription/28735471772",
  status: "ACTIVE",
  amount: 39,
  moduleId: 3, // Pro plan
  is_test: true
}
```

---

### **5. SubscriptionQuota** - User's quota usage

```prisma
model SubscriptionQuota {
  id             String    @id
  userId         BigInt
  feature_id     String
  limit_quantity Int       // Max allowed
  used_quantity  Int       // Currently used
  cycle_start    DateTime
  cycle_end      DateTime?
  createdAt      DateTime
  updatedAt      DateTime
  
  feature PricingFeature?
  user    User?
}
```

**Example:**
```javascript
// User on Pro plan with 100 products limit, used 25
{
  id: "quota_xxx",
  userId: 1,
  feature_id: "products_limit",
  limit_quantity: 100,
  used_quantity: 25,
  cycle_start: "2025-10-29T00:00:00Z"
}
```

---

### **6. UsageLog** - Track usage history

```prisma
model UsageLog {
  id         String   @id
  userId     BigInt
  feature_id String
  quantity   Int      // Amount used
  createdAt  DateTime
  
  feature PricingFeature?
  user    User?
}
```

**Example:**
```javascript
// User optimized 1 product
{
  id: "log_xxx",
  userId: 1,
  feature_id: "products_limit",
  quantity: 1,
  createdAt: "2025-10-29T10:30:00Z"
}
```

---

### **7. PaymentLog** - Track billing events

```prisma
model PaymentLog {
  id                       String   @id
  userId                   BigInt
  action                   String   // SUBSCRIPTION_ACTIVE, etc.
  status                   String   // COMPLETED, FAILED
  external_transaction_id  String?
  amount                   Float?
  details                  Json?
  createdAt                DateTime
  
  user User?
}
```

---

## 📁 **FILE STRUCTURE**

```
app/
├── config/
│   └── pricing.js                 # 🎯 Plan definitions & configurations
│
├── server/
│   └── services/
│       ├── billing.js             # 🔥 Core billing logic
│       └── quota.js               # 📊 Quota management
│
├── routes/
│   ├── app.pricing.jsx            # 💎 Pricing page UI
│   ├── api.billing.subscribe.jsx  # 🚀 Create charge
│   ├── app.billing.callback.jsx   # ↩️ Billing callback (deprecated)
│   └── webhooks.billing.jsx       # 🔔 Shopify webhooks
│
└── scripts/
    └── seedPricing.js             # 🌱 Database seeding
```

---

## ⚙️ **PRICING CONFIGURATION**

### **File: `app/config/pricing.js`**

Đây là file **QUAN TRỌNG NHẤT** - định nghĩa tất cả plans, features, pricing.

#### **1. Plan IDs**

```javascript
export const PLAN_IDS = {
  FREE: "free",
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};
```

#### **2. Billing Intervals**

```javascript
export const BILLING_INTERVALS = {
  MONTHLY: "EVERY_30_DAYS",
  YEARLY: "ANNUAL",
};
```

#### **3. Pricing Plans**

```javascript
export const PRICING_PLANS = {
  free: {
    id: "free",
    name: "Free",
    tier: "free",
    price: {
      monthly: 0,
      yearly: 0,
    },
    shopifyPlanName: {
      monthly: "Free Plan",
      yearly: "Free Plan",
    },
    trialDays: 0,
    features: {
      products_limit: {
        id: "products_limit",
        name: "Products Limit",
        limit: 10,
        limit_quantity: 10,
        unit: "products",
      },
      ai_generations: {
        id: "ai_generations",
        name: "AI Generations",
        limit: 20,
        limit_quantity: 20,
        unit: "generations",
      },
    },
    highlights: [
      "10 product optimizations",
      "20 AI generations per month",
      "Basic support",
    ],
  },
  
  starter: {
    id: "starter",
    name: "Starter",
    tier: "starter",
    price: {
      monthly: 19,
      yearly: 190, // ~$16/month
    },
    shopifyPlanName: {
      monthly: "Starter Plan - Monthly",
      yearly: "Starter Plan - Yearly",
    },
    trialDays: 7,
    features: {
      products_limit: {
        id: "products_limit",
        limit: 50,
        limit_quantity: 50,
      },
      ai_generations: {
        id: "ai_generations",
        limit: 100,
        limit_quantity: 100,
      },
    },
    highlights: [
      "50 product optimizations",
      "100 AI generations per month",
      "Priority support",
    ],
  },
  
  pro: {
    id: "pro",
    name: "Pro",
    tier: "pro",
    price: {
      monthly: 39,
      yearly: 390, // ~$33/month
    },
    shopifyPlanName: {
      monthly: "Pro Plan - Monthly",
      yearly: "Pro Plan - Yearly",
    },
    trialDays: 7,
    features: {
      products_limit: {
        id: "products_limit",
        limit: 100,
        limit_quantity: 100,
      },
      ai_generations: {
        id: "ai_generations",
        limit: 500,
        limit_quantity: 500,
      },
    },
    highlights: [
      "100 product optimizations",
      "500 AI generations per month",
      "Advanced analytics",
      "Priority support",
    ],
  },
  
  business: {
    id: "business",
    name: "Business",
    tier: "business",
    price: {
      monthly: 99,
      yearly: 990, // ~$83/month
    },
    shopifyPlanName: {
      monthly: "Business Plan - Monthly",
      yearly: "Business Plan - Yearly",
    },
    trialDays: 7,
    features: {
      products_limit: {
        id: "products_limit",
        limit: -1, // Unlimited
        limit_quantity: 999999,
      },
      ai_generations: {
        id: "ai_generations",
        limit: -1, // Unlimited
        limit_quantity: 999999,
      },
    },
    highlights: [
      "Unlimited product optimizations",
      "Unlimited AI generations",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
    ],
  },
};
```

---

### **🎨 HOW TO MODIFY PLANS**

#### **Add New Feature:**

```javascript
// 1. Add to all plans in pricing.js
pro: {
  features: {
    // ... existing features
    custom_templates: {
      id: "custom_templates",
      name: "Custom Templates",
      limit: 10,
      limit_quantity: 10,
      unit: "templates",
    },
  }
}

// 2. Create feature in database
await prisma.pricingFeature.create({
  data: {
    id: "custom_templates",
    name: "Custom Templates",
    description: "Number of custom templates",
    cycle: 1,
    is_active: true,
  }
});

// 3. Link to modules
await prisma.pricingModuleFeature.create({
  data: {
    moduleId: 3, // Pro plan
    featureId: "custom_templates",
    limit_quantity: 10,
    cycle: 1,
  }
});
```

#### **Change Plan Price:**

```javascript
// Just update pricing.js
pro: {
  price: {
    monthly: 49, // Changed from 39 to 49
    yearly: 490,
  }
}

// No database changes needed!
```

#### **Change Quota Limits:**

```javascript
// Update in pricing.js
pro: {
  features: {
    products_limit: {
      limit: 200, // Changed from 100 to 200
      limit_quantity: 200,
    }
  }
}

// Update in database
await prisma.pricingModuleFeature.update({
  where: {
    moduleId_featureId: {
      moduleId: 3,
      featureId: "products_limit"
    }
  },
  data: {
    limit_quantity: 200
  }
});
```

---

## 🔄 **BILLING FLOW**

### **Complete Upgrade Flow:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER VISITS PRICING PAGE                                     │
│    GET /app/pricing                                             │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. PRICING PAGE LOADER                                          │
│    - Check pending subscriptions (polling)                      │
│    - Fetch current subscription from DB                         │
│    - Display current plan & quotas                              │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. USER CLICKS "UPGRADE" BUTTON                                 │
│    - Target plan: "pro"                                         │
│    - Interval: "monthly"                                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. CALL API: POST /api/billing/subscribe                       │
│    Body: { planId: "pro", interval: "monthly" }                │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. API CREATES SHOPIFY CHARGE                                   │
│    - billingService.createRecurringCharge()                     │
│    - GraphQL: appSubscriptionCreate                             │
│    - Save to DB: status = PENDING                               │
│    - Return: confirmationUrl                                    │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. REDIRECT TO SHOPIFY CHARGE PAGE                              │
│    - User sees charge details                                   │
│    - User clicks "Approve"                                      │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. SHOPIFY REDIRECTS TO /apps/{app_id}                          │
│    ❌ NOT to callback URL!                                      │
│    → App auto-redirects to /app (homepage)                      │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. USER NAVIGATES TO PRICING PAGE                               │
│    GET /app/pricing                                             │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. PRICING PAGE LOADER - POLLING                                │
│    - checkAndActivatePendingSubscriptions()                     │
│    - Find subscriptions: status = PENDING                       │
│    - Query Shopify API: Get real status                         │
│    - If status = ACTIVE:                                        │
│      • Update DB: status → ACTIVE                               │
│      • Create subscription quotas                               │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 10. DISPLAY NEW PLAN                                            │
│     ✅ Plan: Pro                                                │
│     ✅ Quotas: 100 products, 500 AI generations                │
│     ✅ Usage: 0/100 products, 0/500 AI                         │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│ PARALLEL: WEBHOOK BACKUP                                        │
│                                                                 │
│ • Shopify sends APP_SUBSCRIPTIONS_UPDATE webhook               │
│ • Webhook checks status = ACTIVE                                │
│ • Update DB + create quotas                                     │
│ • This happens automatically in background                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔌 **API ENDPOINTS**

### **1. POST `/api/billing/subscribe`**

Create Shopify recurring charge.

**Request:**
```javascript
{
  planId: "pro",
  interval: "monthly",
  isTest: true // Optional
}
```

**Response:**
```javascript
{
  confirmationUrl: "https://shop.myshopify.com/admin/charges/..."
}
```

**Code:** `app/routes/api.billing.subscribe.jsx`

---

### **2. GET `/app/pricing`**

Display pricing page with current subscription.

**Response (loader data):**
```javascript
{
  currentPlan: {
    accountName: "shop.myshopify.com",
    planId: "pro",
    planName: "Pro",
    tier: "pro",
    billingCycle: "monthly",
    price: "$39",
    usage: {
      productsOptimized: 25,
      productsLimit: 100,
      aiGenerations: 150,
      aiGenerationsLimit: 500,
    },
    renewalDate: "11/29/2025",
    subscription: { ... }
  }
}
```

**Code:** `app/routes/app.pricing.jsx`

---

### **3. POST `/webhooks/billing`**

Receive Shopify billing webhooks.

**Webhook Topics:**
- `APP_SUBSCRIPTIONS_UPDATE` - Subscription status changed
- `APP_SUBSCRIPTIONS_APPROACHING_CAPPED_AMOUNT` - Usage warning

**Code:** `app/routes/webhooks.billing.jsx`

---

## 🎨 **FRONTEND COMPONENTS**

### **Pricing Page Structure:**

```jsx
<PricingPage>
  {/* Current Plan Card */}
  <CurrentPlanCard 
    plan={currentPlan.planName}
    price={currentPlan.price}
    usage={currentPlan.usage}
    renewalDate={currentPlan.renewalDate}
  />
  
  {/* Available Plans Grid */}
  <PlansGrid>
    {Object.values(PRICING_PLANS).map(plan => (
      <PlanCard 
        key={plan.id}
        plan={plan}
        currentPlan={currentPlan.planId}
        onUpgrade={() => handleUpgrade(plan.id)}
      />
    ))}
  </PlansGrid>
</PricingPage>
```

**Key UI Elements:**
- Current plan badge
- Usage progress bars
- Plan comparison table
- Upgrade/Downgrade buttons
- Billing cycle toggle (monthly/yearly)

---

## 📖 **HOW TO USE**

### **1. Check User's Current Plan:**

```javascript
import { BillingService } from "../server/services/billing";

const billingService = new BillingService(admin, session);
const usage = await billingService.getSubscriptionUsage();

console.log("Current plan:", usage.planId); // "pro"
console.log("Quotas:", usage.quotas);
```

---

### **2. Check If User Can Use Feature:**

```javascript
import { QuotaService } from "../server/services/quota";

const quotaService = new QuotaService();
const canUse = await quotaService.checkQuota(
  userId,
  "products_limit",
  1 // Quantity to use
);

if (!canUse) {
  throw new Error("Quota exceeded");
}
```

---

### **3. Consume Quota:**

```javascript
await quotaService.consumeQuota(
  userId,
  "products_limit",
  1 // Amount to consume
);
```

---

### **4. Get User's Usage:**

```javascript
const usage = await quotaService.getUserUsage(userId, "products_limit");
console.log(`Used: ${usage.used}/${usage.limit}`);
```

---

### **5. Upgrade User to New Plan:**

```javascript
// User clicks upgrade button
const confirmationUrl = await billingService.createRecurringCharge(
  "pro",      // planId
  "monthly",  // interval
  returnUrl,  // callback URL
  true        // isTest
);

// Redirect user to Shopify charge page
return redirect(confirmationUrl);
```

---

## 🔧 **TROUBLESHOOTING**

### **Issue: User upgraded but still shows Free plan**

**Check:**
1. Pricing page loader logs - is polling running?
2. Database - subscription status = ACTIVE?
3. Quotas - are they created?

**Fix:**
```bash
# Check DB
SELECT * FROM Subscription WHERE userId = X;
SELECT * FROM SubscriptionQuota WHERE userId = X;

# Manually trigger polling
# Refresh /app/pricing page
```

---

### **Issue: Quota not updating after usage**

**Check:**
1. Is `consumeQuota()` being called?
2. Database - check SubscriptionQuota table
3. Check UsageLog table

**Fix:**
```javascript
// Manually update quota
await prisma.subscriptionQuota.update({
  where: { id: quotaId },
  data: {
    used_quantity: { increment: 1 }
  }
});
```

---

### **Issue: Feature not available for plan**

**Check:**
1. `pricing.js` - feature defined for plan?
2. Database - PricingModuleFeature record exists?

**Fix:**
```bash
# Run seed script
node app/scripts/seedPricing.js
```

---

## 📝 **CHEAT SHEET**

### **Key Files:**

| File | Purpose |
|------|---------|
| `app/config/pricing.js` | Plan definitions |
| `app/server/services/billing.js` | Billing logic |
| `app/server/services/quota.js` | Quota management |
| `app/routes/app.pricing.jsx` | Pricing UI |
| `prisma/schema.prisma` | Database schema |

### **Key Functions:**

| Function | File | Purpose |
|----------|------|---------|
| `createRecurringCharge()` | billing.js | Create Shopify charge |
| `checkAndActivatePendingSubscriptions()` | billing.js | Poll & activate |
| `getSubscriptionUsage()` | billing.js | Get user's plan |
| `checkQuota()` | quota.js | Check if can use |
| `consumeQuota()` | quota.js | Consume usage |

### **Database Tables:**

| Table | Purpose |
|-------|---------|
| `PricingModule` | Plans (Free/Pro/etc) |
| `PricingFeature` | Features (products/AI) |
| `PricingModuleFeature` | Plan-Feature mapping |
| `Subscription` | User's subscription |
| `SubscriptionQuota` | User's quotas |
| `UsageLog` | Usage history |
| `PaymentLog` | Billing events |

---

## 🎯 **NEXT STEPS**

- [ ] Implement downgrade flow
- [ ] Add plan change (upgrade between paid plans)
- [ ] Add subscription cancellation
- [ ] Add usage-based billing (optional)
- [ ] Add prorated billing
- [ ] Add discount codes

---

**Last Updated:** 2025-10-29  
**Version:** 1.0  
**Status:** ✅ Production Ready

