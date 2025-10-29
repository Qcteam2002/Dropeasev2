# 🔍 DEBUG BILLING - ENHANCED LOGGING

## Đã Thêm Logs Mới

### 1️⃣ Subscribe Endpoint (`api.billing.subscribe.jsx`)
```
🔗 RETURN URL for Shopify: https://...
✅ Shopify confirmation URL: https://...
📊 Subscription ID: gid://...
```

### 2️⃣ Callback Loader (`app.billing.callback.jsx`)
```
🔔 CALLBACK LOADER CALLED!
🔗 Full URL: https://...
📦 Search params: ?charge_id=...
📊 Params: { charge_id: '...', planId: '...', ... }
```

### 3️⃣ Callback Component (Client-side)
```
🔗 CALLBACK URL: ...
📦 Full search string: ...
📊 Parsed parameters: { ... }
🎯 Target path for redirect: ...
```

---

## 🎯 TEST STEPS

### 1. Clear Console
Open DevTools → Clear console (⌘+K)

### 2. Click "Select Pro"
Watch for:
```
Creating TEST charge for Pro Plan - Monthly
🔗 RETURN URL for Shopify: https://.../app/billing/callback?...
✅ Shopify confirmation URL: https://...
```

### 3. Approve on Shopify
Shopify will redirect to the confirmation URL

### 4. CRITICAL: After Redirect
**If callback is hit**, should see:
```
🔔 CALLBACK LOADER CALLED!
🔗 Full URL: https://.../app/billing/callback?charge_id=...
📊 Params: { charge_id: 'gid://...', planId: 'pro', ... }
```

**Then client-side**:
```
🔗 CALLBACK URL: ...
📦 Full search string: ?charge_id=...
📊 Parsed parameters: { chargeId: 'gid://...', ... }
```

**Then redirect to pricing**:
```
📄 Pricing page loaded
🔗 URL params: { chargeId: 'gid://...', ... }
💳 Attempting to activate subscription...
```

---

## ❓ What to Check

### A. If NO callback logs
```
📄 Pricing page loaded
🔗 URL params: { chargeId: null, ... }
```

**→ Callback never hit!**

**Possible causes**:
1. Shopify redirects directly to /app/pricing (skips callback)
2. Return URL is wrong
3. App URL environment variable is wrong

### B. If callback logs but charge_id is null
```
🔔 CALLBACK LOADER CALLED!
📊 Params: { charge_id: null, ... }  ← PROBLEM!
```

**→ Shopify doesn't add charge_id**

**Possible causes**:
1. Test charge declined
2. Shopify API changed
3. Return URL format wrong

### C. If callback logs have charge_id but pricing doesn't
```
🔔 CALLBACK LOADER CALLED!
📊 Params: { charge_id: 'gid://...', ... }  ← OK!

[Then later]

📄 Pricing page loaded
🔗 URL params: { chargeId: null, ... }  ← PROBLEM!
```

**→ Params lost during redirect**

**Possible causes**:
1. App Bridge strips query params
2. Redirect URL construction wrong

---

## 🚀 DO IT NOW

1. Open `/app/pricing`
2. Open DevTools console
3. Click "Select Pro"
4. Look for **"🔗 RETURN URL for Shopify"** and **"✅ Shopify confirmation URL"**
5. Approve on Shopify
6. **IMMEDIATELY check console for "🔔 CALLBACK LOADER CALLED!"**
7. Copy ALL console output

---

## 📋 PASTE FULL CONSOLE OUTPUT HERE

After testing, paste the COMPLETE console output:

```
[PASTE HERE]
```

**Focus on:**
- ✅ Return URL sent to Shopify
- ✅ Confirmation URL from Shopify
- ✅ Whether "🔔 CALLBACK LOADER CALLED!" appears
- ✅ Value of charge_id parameter

---

**DO IT NOW! 🚀**

