# 🧪 TEST BILLING - STEP BY STEP

## Vấn Đề Phát Hiện

**Database shows**:
- ❌ All subscriptions = PENDING
- ❌ No ACTIVE subscriptions
- ❌ No quotas created
- ❌ No SUBSCRIPTION_ACTIVATED logs

**→ `activateSubscription()` NEVER RUNS!**

---

## 🎯 Test Ngay Bây Giờ

### Step 1: Clear Old Data

```bash
cd /Users/vophuong/Documents/easyd-2
node -e "
import('$SHELL').then(async () => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  await prisma.subscriptionQuota.deleteMany({});
  await prisma.subscription.updateMany({ data: { status: 'CANCELLED' } });
  console.log('✅ Cleared old data');
  await prisma.\$disconnect();
});
"
```

---

### Step 2: Start Server với Logs

```bash
# Make sure server is running
npm run dev

# Keep terminal visible to see console logs!
```

---

### Step 3: Test Upgrade Flow

1. **Open browser** → `/app/pricing`

2. **Click** "Select Pro"

3. **Watch console** - Should see:
```
Creating TEST charge for Pro Plan - Monthly
```

4. **On Shopify billing page** → Click "Approve"

5. **IMMEDIATELY check console** - Should see:
```
📄 Pricing page loaded
🔗 URL params: { chargeId: 'gid://...', planId: 'pro', ... }
💳 Attempting to activate subscription...
🔄 Activating subscription: gid://...
```

---

### Step 4: Check URL in Browser

Sau khi redirect về app, check URL trong browser address bar:

**Should have**:
```
/app/pricing?charge_id=gid://shopify/AppSubscription/...&planId=pro&interval=monthly
```

**If URL is just**:
```
/app/pricing
```

**→ THAT'S THE PROBLEM!** `charge_id` bị mất!

---

## 🐛 If charge_id Missing

### Possible Causes:

1. **Callback route không preserve params**
2. **App Bridge redirect strips query params**
3. **Return URL từ Shopify không có charge_id**

---

### Fix: Check Return URL

File: `app/routes/api.billing.subscribe.jsx`

Current return URL:
```javascript
const returnUrl = `${appUrl}/app/billing/callback?planId=${planId}&interval=${interval}&shop=${session.shop}&host=${btoa(`${session.shop}/admin`)}`;
```

**Missing `charge_id`!** Shopify adds it automatically as query param.

---

### Verify in Shopify Response

After creating charge, Shopify returns:
```json
{
  "confirmationUrl": "https://...?charge_id=xxx"
}
```

Then after approval, redirects to:
```
returnUrl?charge_id=xxx
```

---

## 🔍 Debug Checklist

### Console Logs to Look For:

✅ **Creating charge**:
```
Creating TEST charge for Pro Plan - Monthly
```

✅ **After redirect**:
```
📄 Pricing page loaded
🔗 URL params: { chargeId: '...', planId: 'pro', ... }
```

❌ **If missing**:
```
📄 Pricing page loaded
🔗 URL params: { chargeId: null, planId: null, ... }
```

✅ **Activation attempt**:
```
💳 Attempting to activate subscription...
🔄 Activating subscription: gid://...
📥 Shopify response: {...}
📊 Subscription status: ACTIVE
```

---

## 💡 Most Likely Issue

**App Bridge redirect strips query params!**

### Solution:

Update callback to preserve ALL params:

```javascript
// app/routes/app.billing.callback.jsx
export default function BillingCallback() {
  useEffect(() => {
    // Get ALL params including charge_id
    const searchParams = window.location.search;
    
    // Redirect WITH all params
    const targetPath = `/app/pricing${searchParams}`;
    
    // App Bridge redirect
    redirect.dispatch(Redirect.Action.APP, targetPath);
  }, []);
}
```

---

## 🎯 Expected vs Actual

### Expected Flow:
```
1. Create charge
2. Redirect to Shopify
3. User approves
4. Shopify redirects: /callback?charge_id=xxx&...
5. Callback redirects: /pricing?charge_id=xxx&...  ✅
6. Pricing activates subscription ✅
```

### Actual Flow (BROKEN):
```
1. Create charge
2. Redirect to Shopify  
3. User approves
4. Shopify redirects: /callback?charge_id=xxx&...
5. Callback redirects: /pricing  ❌ (params lost!)
6. Pricing does NOTHING ❌ (no charge_id)
```

---

## 🚀 Quick Test

Run this in browser console after redirect:

```javascript
// Check if charge_id in URL
console.log('URL:', window.location.href);
console.log('Params:', new URLSearchParams(window.location.search).get('charge_id'));
```

**If null** → That's the problem!

---

## 📝 Action Items

1. [ ] Test upgrade flow
2. [ ] Check console logs
3. [ ] Verify URL has charge_id
4. [ ] If missing, fix callback redirect
5. [ ] Re-test until working

---

**TEST NOW AND PASTE CONSOLE OUTPUT!** 🚀

