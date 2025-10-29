# ⚡ PRICING SYSTEM - QUICK REFERENCE

## 🎯 **CORE CONCEPTS**

```
Plan (Module) → Features → Quotas → Usage
    ↓             ↓          ↓         ↓
   Free        Products   100/100   Limit
   Pro          AI Gen    250/500   Current
```

---

## 📂 **KEY FILES**

| File | What It Does |
|------|-------------|
| **`app/config/pricing.js`** | 🎯 **Define plans, prices, limits** |
| `app/server/services/billing.js` | Handle Shopify billing |
| `app/server/services/quota.js` | Check & consume quotas |
| `app/routes/app.pricing.jsx` | Pricing page UI |
| `prisma/schema.prisma` | Database structure |

---

## 🔧 **COMMON TASKS**

### **1️⃣ Change Plan Price**

```javascript
// File: app/config/pricing.js
export const PRICING_PLANS = {
  pro: {
    price: {
      monthly: 49,  // Change here
      yearly: 490,
    }
  }
}
```

✅ **Done!** No database changes needed.

---

### **2️⃣ Change Quota Limits**

**Step 1:** Update `pricing.js`
```javascript
pro: {
  features: {
    products_limit: {
      limit: 200,  // Changed from 100
      limit_quantity: 200,
    }
  }
}
```

**Step 2:** Update database
```bash
node app/scripts/seedPricing.js
# Or manually update PricingModuleFeature table
```

---

### **3️⃣ Add New Feature**

**Step 1:** Add to `pricing.js`
```javascript
pro: {
  features: {
    custom_templates: {
      id: "custom_templates",
      name: "Custom Templates",
      limit: 10,
      limit_quantity: 10,
    }
  }
}
```

**Step 2:** Create in database
```javascript
await prisma.pricingFeature.create({
  data: {
    id: "custom_templates",
    name: "Custom Templates",
    description: "Number of custom templates",
    cycle: 1,
  }
});
```

**Step 3:** Link to plans
```javascript
await prisma.pricingModuleFeature.create({
  data: {
    moduleId: 3, // Pro
    featureId: "custom_templates",
    limit_quantity: 10,
  }
});
```

---

### **4️⃣ Check User's Plan**

```javascript
const billingService = new BillingService(admin, session);
const usage = await billingService.getSubscriptionUsage();

console.log(usage.planId); // "pro"
```

---

### **5️⃣ Check Quota Before Action**

```javascript
const quotaService = new QuotaService();
const canUse = await quotaService.checkQuota(userId, "products_limit", 1);

if (!canUse) {
  throw new Error("Quota exceeded! Upgrade to Pro.");
}
```

---

### **6️⃣ Consume Quota After Action**

```javascript
await quotaService.consumeQuota(userId, "products_limit", 1);
```

---

### **7️⃣ Get User's Usage**

```javascript
const usage = await quotaService.getUserUsage(userId, "products_limit");
console.log(`Used: ${usage.used}/${usage.limit}`); // "25/100"
```

---

## 🗄️ **DATABASE QUICK LOOKUP**

### **Get user's current plan:**
```sql
SELECT m.name, s.status, s.amount
FROM Subscription s
JOIN PricingModule m ON s.moduleId = m.id
WHERE s.userId = X AND s.status = 'ACTIVE';
```

### **Get user's quotas:**
```sql
SELECT 
  f.name,
  q.used_quantity,
  q.limit_quantity
FROM SubscriptionQuota q
JOIN PricingFeature f ON q.feature_id = f.id
WHERE q.userId = X;
```

### **Get all plans:**
```sql
SELECT * FROM PricingModule;
```

### **Get plan features:**
```sql
SELECT 
  m.name AS plan,
  f.name AS feature,
  mf.limit_quantity AS limit
FROM PricingModuleFeature mf
JOIN PricingModule m ON mf.moduleId = m.id
JOIN PricingFeature f ON mf.featureId = f.id
ORDER BY m.id, f.id;
```

---

## 🔄 **UPGRADE FLOW (3 STEPS)**

```
1. User clicks "Upgrade" 
   → Call: POST /api/billing/subscribe

2. Redirect to Shopify charge page
   → User approves

3. Pricing page auto-activates
   → Polling checks pending subscriptions
```

**That's it!** No callback URL needed.

---

## 🐛 **TROUBLESHOOTING**

### **User upgraded but still Free:**
```bash
# Check pending subscriptions
SELECT * FROM Subscription WHERE status = 'PENDING';

# Manually trigger polling: Refresh /app/pricing
```

### **Quota not updating:**
```javascript
// Check if consumeQuota() is being called
// Verify in SubscriptionQuota table
SELECT * FROM SubscriptionQuota WHERE userId = X;
```

### **Feature not showing:**
```bash
# Re-seed database
node app/scripts/seedPricing.js
```

---

## 📊 **PLAN STRUCTURE (Default)**

| Plan | Monthly | Products | AI Gen | Highlights |
|------|---------|----------|--------|-----------|
| **Free** | $0 | 10 | 20 | Basic |
| **Starter** | $19 | 50 | 100 | Good |
| **Pro** | $39 | 100 | 500 | Best |
| **Business** | $99 | ∞ | ∞ | Enterprise |

---

## 🎯 **ONE-LINER ANSWERS**

**Q: How to change plan price?**  
A: Edit `app/config/pricing.js` → `PRICING_PLANS.pro.price.monthly`

**Q: How to change quota limit?**  
A: Edit `pricing.js` + run `seedPricing.js`

**Q: How upgrade works?**  
A: User approves on Shopify → Pricing page polls → Auto-activate

**Q: Where is subscription stored?**  
A: `Subscription` table with `status = ACTIVE`

**Q: How to check user can use feature?**  
A: `quotaService.checkQuota(userId, featureId, quantity)`

**Q: How to consume quota?**  
A: `quotaService.consumeQuota(userId, featureId, quantity)`

---

## 🚀 **LINKS TO FULL DOCS**

- **Complete Guide:** `PRICING_SYSTEM_COMPLETE_GUIDE.md`
- **Billing Flow Fix:** `SHOPIFY_BILLING_FLOW_FIX.md`
- **BigInt Fix:** `BIGINT_FIX.md`
- **Quick Summary:** `BILLING_QUICK_FIX_SUMMARY.md`

---

**Need more help?** Check the complete guide! 📚
