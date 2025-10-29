# 🧪 Billing Test Mode - Documentation

## 📋 Overview

Tôi đã thêm **Test Mode** cho Shopify billing charges để bạn có thể test mà không bị charge tiền thật.

---

## ✨ Features

### 1. Auto-Detection (Smart Mode)

System **tự động detect** khi nào nên dùng test mode:

```javascript
// Tự động test mode khi:
✅ NODE_ENV !== "production"
✅ Shop domain chứa ".myshopify.com" (dev store)
✅ Shop domain chứa "dev-" prefix
```

### 2. Manual Control

Có thể **force test mode** qua:

#### Option A: Environment Variable
```bash
# Trong file .env hoặc local.env
BILLING_TEST_MODE=true
```

#### Option B: API Request
```javascript
// Frontend gọi API với isTest parameter
await fetch("/api/billing/subscribe", {
  method: "POST",
  body: JSON.stringify({
    planId: "pro",
    interval: "monthly",
    isTest: true  // ← Force test mode
  })
});
```

### 3. Database Tracking

Mỗi subscription sẽ được mark là test:

```sql
SELECT * FROM Subscription WHERE is_test = true;
```

Giúp phân biệt test subscriptions vs real subscriptions.

---

## 🚀 Usage

### Development (Test Mode)

**Default behavior**: Tự động test mode

```bash
# Start dev server
npm run dev

# Test upgrade flow - sẽ tự động dùng test mode
# → Không charge tiền thật
# → Shopify sẽ hiện "Test Mode" banner
```

---

### Production (Real Charges)

```bash
# Set environment
NODE_ENV=production
BILLING_TEST_MODE=false  # Optional - auto-detect sẽ handle

# Deploy to production
# → Real charges
# → Shopify charge thật tiền
```

---

## 🔍 How to Verify

### Check Console Logs

```bash
Creating TEST charge for Pro Plan - Monthly
# hoặc
Creating PRODUCTION charge for Pro Plan - Monthly
```

### Check Shopify Billing Page

**Test Mode**:
- ✅ Có banner "Test Mode" màu vàng
- ✅ Note: "This is a test charge and won't be billed"

**Production Mode**:
- ❌ Không có test banner
- ✅ Real billing confirmation

### Check Database

```sql
-- Test subscriptions
SELECT 
  id, 
  external_subscription_id, 
  amount,
  is_test,
  status
FROM Subscription 
WHERE is_test = true;

-- Real subscriptions
SELECT * FROM Subscription WHERE is_test = false;
```

---

## 📊 Test Mode Behavior

| Feature | Test Mode | Production Mode |
|---------|-----------|-----------------|
| **Charge Money** | ❌ No | ✅ Yes |
| **Shopify Banner** | ✅ "Test Mode" | ❌ None |
| **Full Billing Flow** | ✅ Yes | ✅ Yes |
| **Webhooks** | ✅ Yes | ✅ Yes |
| **Cancel/Modify** | ✅ Yes | ✅ Yes |
| **Database Record** | ✅ Yes | ✅ Yes |

**→ Test mode = Full billing experience WITHOUT real charges!**

---

## 💻 Code Examples

### Example 1: Auto-Detection

```javascript
// Backend tự động detect
const billingService = new BillingService(admin, session);

await billingService.createRecurringCharge(
  "pro",
  "monthly",
  returnUrl
  // isTest = null → auto-detect
);

// If dev store → test: true
// If production store → test: false
```

---

### Example 2: Force Test Mode

```javascript
// Force test mode explicitly
await billingService.createRecurringCharge(
  "pro",
  "monthly",
  returnUrl,
  true  // ← Always test mode
);
```

---

### Example 3: Force Production Mode

```javascript
// Force production mode (use with caution!)
await billingService.createRecurringCharge(
  "pro",
  "monthly",
  returnUrl,
  false  // ← Force real charges
);
```

---

## 🛠 Environment Variables

Add to your `.env` or `local.env`:

```bash
# Force test mode (optional)
BILLING_TEST_MODE=true

# Environment (affects auto-detection)
NODE_ENV=development  # → Auto test mode
# NODE_ENV=production  # → Auto production mode
```

---

## 📝 What Changed

### Files Modified:

1. **`app/server/services/billing.js`**
   - Added `isTest` parameter to `createRecurringCharge()`
   - Auto-detection logic
   - GraphQL mutation includes `test: $test`
   - Save `is_test` to database

2. **`app/routes/api.billing.subscribe.jsx`**
   - Support `isTest` in request body
   - Check `BILLING_TEST_MODE` env var
   - Pass test mode to billing service

3. **`prisma/schema.prisma`** (already has)
   - `is_test` field in Subscription model ✅

---

## ✅ Benefits

### For Development
- ✅ Test full billing flow
- ✅ No real charges
- ✅ No credit card needed (dev store)
- ✅ Fast iteration
- ✅ Safe testing

### For Production
- ✅ Real charges work correctly
- ✅ Auto-detect prevents accidents
- ✅ Can still test if needed
- ✅ Clean separation in database

---

## 🧪 Testing Checklist

### Test Mode Testing

- [ ] Start dev server: `npm run dev`
- [ ] Check console shows: "Creating TEST charge"
- [ ] Click upgrade button
- [ ] Verify Shopify shows "Test Mode" banner
- [ ] Approve subscription
- [ ] Check database: `is_test = true`
- [ ] Verify billing works without real charge

### Production Mode Testing

- [ ] Set `NODE_ENV=production`
- [ ] Unset `BILLING_TEST_MODE` (or set to false)
- [ ] Check console shows: "Creating PRODUCTION charge"
- [ ] Verify NO test banner on Shopify
- [ ] ⚠️ **Only test with real store if ready to charge!**

---

## ⚠️ Important Notes

### Development Stores
- Development stores **ALWAYS** use test mode
- No real charges possible on dev stores
- Perfect for testing

### Production Stores
- Can use both test and production mode
- Be careful with `isTest: false` on production
- Auto-detection is safest

### Shopify Policies
- Test charges don't count toward app revenue
- Test charges expire after 30 days
- Test data may be cleared by Shopify

---

## 🐛 Troubleshooting

### "Still charging real money in dev"

**Check**:
1. `NODE_ENV` is not set to "production"
2. Console shows "Creating TEST charge"
3. Shopify billing page has test banner
4. Store is development store

---

### "Test mode not working"

**Solutions**:
1. Clear browser cache
2. Restart dev server
3. Check console logs
4. Verify `.env` has `BILLING_TEST_MODE=true`
5. Check `is_test` field in database

---

### "Want to test real charges in dev"

```javascript
// Force production mode (not recommended)
await billingService.createRecurringCharge(
  planId,
  interval,
  returnUrl,
  false  // Force production
);
```

**⚠️ Warning**: Only do this if you understand the implications!

---

## 📞 Questions?

- Check Shopify Billing API docs: https://shopify.dev/docs/apps/billing
- Test charges: https://shopify.dev/docs/apps/billing/test-your-billing-integration
- Development stores: https://shopify.dev/docs/apps/tools/development-stores

---

**✨ Happy Testing! 🧪**

---

**Created**: October 29, 2025  
**Version**: 1.0  
**Status**: ✅ Production Ready

