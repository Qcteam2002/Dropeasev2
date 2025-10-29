# 💰 PRICING & BILLING SYSTEM

> Complete documentation for the app's pricing, billing, and subscription management system.

---

## 📚 **DOCUMENTATION INDEX**

### **🎯 Start Here:**
- **[PRICING_QUICK_REFERENCE.md](./PRICING_QUICK_REFERENCE.md)** - Quick answers & common tasks
- **[PRICING_SYSTEM_COMPLETE_GUIDE.md](./PRICING_SYSTEM_COMPLETE_GUIDE.md)** - Complete system documentation

### **🔧 Technical Fixes:**
- **[SHOPIFY_BILLING_FLOW_FIX.md](./SHOPIFY_BILLING_FLOW_FIX.md)** - Why polling instead of callback
- **[BILLING_QUICK_FIX_SUMMARY.md](./BILLING_QUICK_FIX_SUMMARY.md)** - Quick summary of the fix
- **[BIGINT_FIX.md](./BIGINT_FIX.md)** - BigInt serialization fix

---

## ⚡ **QUICK START**

### **1️⃣ View Current Plans**

Navigate to: `http://localhost:3000/app/pricing`

### **2️⃣ Modify Plan Pricing**

Edit: `app/config/pricing.js`

```javascript
export const PRICING_PLANS = {
  pro: {
    price: {
      monthly: 39,  // Change this
      yearly: 390,
    }
  }
}
```

### **3️⃣ Change Quota Limits**

**Step 1:** Edit `app/config/pricing.js`
```javascript
pro: {
  features: {
    products_limit: {
      limit: 200,  // Change this
    }
  }
}
```

**Step 2:** Update database
```bash
node app/scripts/seedPricing.js
```

---

## 🏗️ **SYSTEM ARCHITECTURE**

```
┌─────────────────────────────────────────────────────────────┐
│                     PRICING SYSTEM                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Configuration                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │  app/config/pricing.js                           │       │
│  │  • PRICING_PLANS (Free/Starter/Pro/Business)     │       │
│  │  • Features & Limits                              │       │
│  │  • Prices & Billing Intervals                     │       │
│  └──────────────────────────────────────────────────┘       │
│                        │                                     │
│                        ▼                                     │
│  Database (Prisma)                                           │
│  ┌──────────────────────────────────────────────────┐       │
│  │  • PricingModule (Plans)                         │       │
│  │  • PricingFeature (Features)                     │       │
│  │  • PricingModuleFeature (Plan-Feature mapping)   │       │
│  │  • Subscription (User's subscription)            │       │
│  │  • SubscriptionQuota (User's quotas)             │       │
│  │  • UsageLog (Usage history)                      │       │
│  │  • PaymentLog (Billing events)                   │       │
│  └──────────────────────────────────────────────────┘       │
│                        │                                     │
│                        ▼                                     │
│  Services                                                    │
│  ┌──────────────────────────────────────────────────┐       │
│  │  app/server/services/billing.js                  │       │
│  │  • Create Shopify charges                        │       │
│  │  • Check & activate pending subscriptions        │       │
│  │  • Get subscription usage                        │       │
│  │                                                   │       │
│  │  app/server/services/quota.js                    │       │
│  │  • Check quotas                                  │       │
│  │  • Consume quotas                                │       │
│  │  • Get user usage                                │       │
│  └──────────────────────────────────────────────────┘       │
│                        │                                     │
│                        ▼                                     │
│  API Routes                                                  │
│  ┌──────────────────────────────────────────────────┐       │
│  │  • POST /api/billing/subscribe                   │       │
│  │  • GET  /app/pricing                             │       │
│  │  • POST /webhooks/billing                        │       │
│  └──────────────────────────────────────────────────┘       │
│                        │                                     │
│                        ▼                                     │
│  Shopify Billing API                                         │
│  ┌──────────────────────────────────────────────────┐       │
│  │  • appSubscriptionCreate                         │       │
│  │  • APP_SUBSCRIPTIONS_UPDATE webhook              │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 **BILLING FLOW**

```
User visits Pricing Page
         ↓
Loader: Check pending subscriptions (polling)
         ↓
Display current plan & quotas
         ↓
User clicks "Upgrade"
         ↓
POST /api/billing/subscribe
         ↓
Create Shopify charge (PENDING in DB)
         ↓
Redirect to Shopify charge page
         ↓
User approves charge
         ↓
Shopify redirects to /app
         ↓
User clicks Pricing
         ↓
Loader: Poll pending subscriptions
         ↓
Query Shopify: Status = ACTIVE?
         ↓ YES
Update DB: ACTIVE + Create quotas
         ↓
Display new plan ✅
```

---

## 📊 **DEFAULT PLANS**

| Plan | Monthly Price | Products | AI Generations |
|------|--------------|----------|----------------|
| **Free** | $0 | 10 | 20 |
| **Starter** | $19 | 50 | 100 |
| **Pro** | $39 | 100 | 500 |
| **Business** | $99 | Unlimited | Unlimited |

---

## 🔑 **KEY FILES**

### **Configuration:**
- `app/config/pricing.js` - Plan definitions & pricing

### **Services:**
- `app/server/services/billing.js` - Billing logic
- `app/server/services/quota.js` - Quota management

### **Routes:**
- `app/routes/app.pricing.jsx` - Pricing page UI
- `app/routes/api.billing.subscribe.jsx` - Create charges
- `app/routes/webhooks.billing.jsx` - Shopify webhooks

### **Database:**
- `prisma/schema.prisma` - Database schema
- `app/scripts/seedPricing.js` - Seed script

---

## 🧪 **TESTING**

### **Test Upgrade Flow:**

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Open pricing page:
   ```
   http://localhost:3000/app/pricing
   ```

3. Click "Upgrade" button

4. On Shopify charge page, click "Approve"

5. Watch terminal logs:
   ```
   🔍 Found 1 pending subscription(s)
   📊 Shopify status: ACTIVE
   ✅ Subscription activated successfully!
   ✅ Current plan: Pro
   ```

6. Verify in browser:
   - Plan displays correctly
   - Usage quotas updated
   - No errors

---

## 🐛 **COMMON ISSUES**

### **Issue: User upgraded but still Free**
**Solution:** Refresh pricing page to trigger polling

### **Issue: Quota not updating**
**Solution:** Check if `consumeQuota()` is called after action

### **Issue: Feature not available**
**Solution:** Run `node app/scripts/seedPricing.js`

---

## 🎯 **HOW TO...**

### **Check if user can use a feature:**
```javascript
const quotaService = new QuotaService();
const canUse = await quotaService.checkQuota(userId, "products_limit", 1);
```

### **Consume quota after action:**
```javascript
await quotaService.consumeQuota(userId, "products_limit", 1);
```

### **Get user's current plan:**
```javascript
const billingService = new BillingService(admin, session);
const usage = await billingService.getSubscriptionUsage();
console.log(usage.planId); // "pro"
```

---

## 📖 **FULL DOCUMENTATION**

For complete details, see:
- **[PRICING_SYSTEM_COMPLETE_GUIDE.md](./PRICING_SYSTEM_COMPLETE_GUIDE.md)**

For quick reference:
- **[PRICING_QUICK_REFERENCE.md](./PRICING_QUICK_REFERENCE.md)**

---

## 🚀 **NEXT STEPS**

- [ ] Implement downgrade flow
- [ ] Add plan change (between paid plans)
- [ ] Add subscription cancellation
- [ ] Add usage-based billing
- [ ] Add discount codes
- [ ] Add prorated billing

---

**Questions?** Check the documentation files above or contact the development team.

**Last Updated:** 2025-10-29  
**Status:** ✅ Production Ready
