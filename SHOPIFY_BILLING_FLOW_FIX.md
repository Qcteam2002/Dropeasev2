# 🔥 SHOPIFY EMBEDDED APP BILLING FLOW - FINAL SOLUTION

## ❌ **VẤN ĐỀ PHÁT HIỆN**

Shopify embedded apps **KHÔNG REDIRECT VỀ `returnUrl`** sau khi user approve charge!

**Expected flow:**
```
User clicks Upgrade → Shopify charge page → User approves 
→ Redirect to returnUrl (/app/billing/callback?charge_id=xxx)
→ Callback activates subscription
→ Redirect to /app/pricing
```

**Actual flow (embedded apps):**
```
User clicks Upgrade → Shopify charge page → User approves
→ Shopify redirects to /apps/{app_id} (app homepage)
→ Then auto-redirects to /app (homepage)
→ charge_id LOST! ❌
```

---

## ✅ **GIẢI PHÁP: POLLING + WEBHOOK**

Thay vì dựa vào callback URL, chúng ta sử dụng:

### **1. Polling trong Pricing Page**

Mỗi khi pricing page load, tự động check pending subscriptions:

```javascript
// app/routes/app.pricing.jsx (Line 37-38)
console.log("🔍 Checking for pending subscriptions...");
await billingService.checkAndActivatePendingSubscriptions();
```

**Flow:**
1. User approves charge trên Shopify
2. Shopify redirects về `/app` (homepage)
3. User clicks "Pricing" (hoặc auto-redirect)
4. Pricing page loader runs `checkAndActivatePendingSubscriptions()`
5. Method này query tất cả subscriptions có status `PENDING`
6. Với mỗi pending subscription, gọi Shopify API để check status thực tế
7. Nếu status trên Shopify = `ACTIVE` → activate trong DB + tạo quotas
8. Page reload → hiển thị plan mới!

### **2. Webhook Backup**

Nếu polling không kịp (user không vào pricing page ngay), webhook sẽ handle:

```javascript
// app/routes/webhooks.billing.jsx (Line 86-134)
if (status === "ACTIVE") {
  console.log("✅ Creating subscription quotas via webhook...");
  // Create quotas automatically
}
```

**Shopify sends webhook khi:**
- Subscription status changes (PENDING → ACTIVE)
- Subscription renewed
- Subscription cancelled

---

## 📂 **CÁC FILE ĐÃ THAY ĐỔI**

### **1. `app/routes/app.pricing.jsx`**

**Line 37-38:** Added polling check

```javascript
// 🔥 Check for pending subscriptions and activate them
console.log("🔍 Checking for pending subscriptions...");
await billingService.checkAndActivatePendingSubscriptions();
```

**Why:** Pricing page là nơi user sẽ check plan sau khi approve charge.

---

### **2. `app/server/services/billing.js`**

**Line 411-502:** New method `checkAndActivatePendingSubscriptions()`

```javascript
async checkAndActivatePendingSubscriptions() {
  const user = await this.getOrCreateUser();
  
  // Find all PENDING subscriptions
  const pendingSubscriptions = await prisma.subscription.findMany({
    where: { userId: user.id, status: "PENDING" }
  });
  
  for (const sub of pendingSubscriptions) {
    // Query Shopify để check status thực tế
    const query = `query GetSubscription($id: ID!) { ... }`;
    const response = await this.admin.graphql(query, { ... });
    
    if (subscription.status === "ACTIVE") {
      // Update DB + create quotas
      await prisma.subscription.update({ ... });
      await this.createSubscriptionQuotas(user.id, sub.moduleId);
    }
  }
}
```

**Why:** This is the core logic that polls Shopify and activates subscriptions.

---

### **3. `app/routes/webhooks.billing.jsx`**

**Line 86-134:** Enhanced webhook handler

```javascript
// 🔥 Create quotas nếu subscription vừa ACTIVE
if (status === "ACTIVE") {
  console.log("✅ Creating subscription quotas via webhook...");
  
  const moduleFeatures = await prisma.pricingModuleFeature.findMany({ ... });
  
  for (const mf of moduleFeatures) {
    await prisma.subscriptionQuota.create({ ... });
  }
}
```

**Why:** Webhook là backup mechanism. Nếu user không vào pricing page, webhook sẽ tự động activate.

---

## 🔄 **COMPLETE FLOW**

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER CLICKS "UPGRADE" BUTTON                                 │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. APP CREATES SHOPIFY CHARGE                                   │
│    - POST /api/billing/subscribe                                │
│    - BillingService.createRecurringCharge()                     │
│    - Creates record in DB with status: PENDING                  │
│    - Returns confirmationUrl                                    │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. USER REDIRECTED TO SHOPIFY CHARGE PAGE                       │
│    - Top-level window (breaks out of iFrame)                    │
│    - User sees charge details                                   │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. USER CLICKS "APPROVE"                                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. SHOPIFY REDIRECTS TO /apps/{app_id}                          │
│    ❌ NOT to returnUrl!                                         │
│    ❌ charge_id LOST!                                           │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. APP AUTO-REDIRECTS TO /app (HOMEPAGE)                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. USER NAVIGATES TO /app/pricing                               │
│    (or clicks "Pricing" link)                                   │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. PRICING PAGE LOADER RUNS                                     │
│    ✅ billingService.checkAndActivatePendingSubscriptions()     │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. POLLING LOGIC                                                │
│    - Find all subscriptions with status: PENDING               │
│    - For each: Query Shopify API to check real status          │
│    - If status = ACTIVE on Shopify:                            │
│      • Update DB: status → ACTIVE                              │
│      • Create subscription quotas                              │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 10. PAGE DISPLAYS NEW PLAN                                      │
│     ✅ Plan: Pro                                                │
│     ✅ Quotas: 100 products, 500 AI generations                │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│ PARALLEL: WEBHOOK BACKUP                                        │
│                                                                 │
│ • Shopify sends APP_SUBSCRIPTIONS_UPDATE webhook               │
│ • Webhook handler checks status                                │
│ • If ACTIVE: Update DB + create quotas                         │
│ • This happens automatically, even if user doesn't visit page  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧪 **HOW TO TEST**

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Click "Upgrade" button** in pricing page

3. **On Shopify charge page, click "Approve"**

4. **Watch terminal logs:**
   ```
   📄 Pricing page loaded
   🔍 Checking for pending subscriptions...
   🔍 Found 1 pending subscription(s)
   🔄 Checking status of gid://shopify/AppSubscription/xxx...
   📊 Shopify status: ACTIVE
   ✅ Activating subscription gid://shopify/AppSubscription/xxx...
   ✅ Subscription activated successfully!
   ```

5. **Verify in browser:**
   - Current plan should show "Pro" (or selected plan)
   - Usage quotas should reflect new limits
   - "Upgrade" buttons should be disabled for current plan

6. **Check database:**
   ```sql
   SELECT * FROM Subscription WHERE status = 'ACTIVE';
   SELECT * FROM SubscriptionQuota;
   ```

---

## 🔧 **TROUBLESHOOTING**

### **Issue: Subscription still PENDING after approval**

**Possible causes:**
1. Shopify hasn't marked it ACTIVE yet (wait 5-10 seconds)
2. Webhook not configured properly
3. Polling not running (check logs)

**Fix:**
- Refresh pricing page (triggers polling again)
- Check Shopify Partners Dashboard → Webhooks
- Check terminal logs for errors

---

### **Issue: Quotas not created**

**Check:**
1. `PricingModuleFeature` records exist for the module
2. `createSubscriptionQuotas()` is being called
3. Terminal logs show quota creation

**Fix:**
```bash
node app/scripts/seedPricing.js
```

---

## 📊 **KEY DIFFERENCES: Callback vs Polling**

| Feature | Callback Approach ❌ | Polling Approach ✅ |
|---------|---------------------|-------------------|
| **Redirect URL** | Depends on Shopify honoring returnUrl | No dependency |
| **charge_id** | Must be preserved across redirects | Not needed |
| **Timing** | Immediate (when callback is hit) | On-demand (when page loads) |
| **Reliability** | Fails in embedded apps | Works everywhere |
| **Backup** | None | Webhook as backup |
| **Complexity** | High (session storage, query params) | Low (simple DB query) |

---

## ✅ **BEST PRACTICES**

1. **Always use polling in embedded apps**
   - Don't rely on `returnUrl` or callbacks
   - Check pending subscriptions on every page load (or strategic pages)

2. **Use webhooks as backup**
   - Webhooks ensure activation even if user leaves app
   - Handle quota creation in webhook too

3. **Store minimal data in DB**
   - `external_subscription_id` (from Shopify)
   - `status` (PENDING/ACTIVE/CANCELLED)
   - Let Shopify be source of truth

4. **Query Shopify API for status**
   - Don't guess based on time elapsed
   - Always verify with Shopify GraphQL API

---

## 📚 **REFERENCES**

- [Shopify Billing API](https://shopify.dev/docs/apps/billing)
- [App Subscriptions](https://shopify.dev/docs/api/admin-graphql/latest/mutations/appSubscriptionCreate)
- [Embedded Apps](https://shopify.dev/docs/apps/build/online-store/embedded-apps)
- [Webhooks](https://shopify.dev/docs/apps/build/webhooks)

---

## 🎯 **NEXT STEPS**

- [x] Implement polling in pricing page
- [x] Implement `checkAndActivatePendingSubscriptions()`
- [x] Enhance webhook handler
- [x] Test upgrade flow
- [ ] Implement downgrade flow
- [ ] Add subscription cancellation
- [ ] Add plan change (upgrade/downgrade between paid plans)
- [ ] Add usage-based billing (if needed)

---

**Created:** 2025-10-29  
**Last Updated:** 2025-10-29  
**Status:** ✅ WORKING

