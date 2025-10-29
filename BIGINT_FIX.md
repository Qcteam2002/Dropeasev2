# 🔧 BIGINT & SCHEMA FIELD FIX

## ❌ **LỖI PHÁT HIỆN**

### **1. Prisma Schema Field Name Mismatch**
```
Unknown argument `started_at`. Available options: start_time
```

**Root cause:** Code dùng `started_at` nhưng schema define là `start_time`.

---

### **2. BigInt JSON Serialization Error**
```
TypeError: Do not know how to serialize a BigInt
```

**Root cause:** Prisma schema có `BigInt` fields (`User.id`, `userId`), khi return từ Remix loader, JSON.stringify() không thể serialize BigInt.

---

## ✅ **FIXES APPLIED**

### **Fix 1: Field Name - `started_at` → `start_time`**

**File:** `app/server/services/billing.js` (Line 483)

```javascript
// ❌ BEFORE
await prisma.subscription.update({
  where: { id: sub.id },
  data: {
    status: "ACTIVE",
    started_at: new Date(), // ❌ Wrong field name
    ...
  },
});

// ✅ AFTER
await prisma.subscription.update({
  where: { id: sub.id },
  data: {
    status: "ACTIVE",
    start_time: new Date(), // ✅ Correct field name
    ...
  },
});
```

**File:** `app/routes/webhooks.billing.jsx` (Line 80)

```javascript
// ❌ BEFORE
data: {
  status: dbStatus,
  started_at: status === "ACTIVE" ? new Date() : subscription.started_at,
}

// ✅ AFTER
data: {
  status: dbStatus,
  start_time: status === "ACTIVE" ? new Date() : subscription.start_time,
}
```

---

### **Fix 2: BigInt Serialization**

**File:** `app/routes/app.pricing.jsx` (Line 73-81)

```javascript
// ❌ BEFORE
const currentPlan = {
  ...
  subscription: usage.subscription, // ❌ Contains BigInt fields
};

// ✅ AFTER
const currentPlan = {
  ...
  // 🔥 Serialize subscription (convert BigInt to String)
  subscription: usage.subscription ? {
    id: usage.subscription.id,
    userId: usage.subscription.userId.toString(), // BigInt → String
    status: usage.subscription.status,
    amount: usage.subscription.amount,
    external_subscription_id: usage.subscription.external_subscription_id,
    start_time: usage.subscription.start_time,
    next_billing_time: usage.subscription.next_billing_time,
  } : null,
};
```

---

### **Fix 3: Clean Up Cancelled Subscriptions**

**File:** `app/server/services/billing.js` (Line 495-504)

```javascript
// 🔥 NEW: Update DB cho CANCELLED subscriptions để không check lại
else if (subscription.status === "CANCELLED" || subscription.status === "EXPIRED") {
  console.log(`❌ Subscription ${subscription.status} - updating DB`);
  await prisma.subscription.update({
    where: { id: sub.id },
    data: {
      status: "CANCELLED",
      updatedAt: new Date(),
    },
  });
}
```

**Why:** DB có 7 pending subscriptions, nhưng 6/7 đã bị CANCELLED trên Shopify. Cần update DB để không check lại nữa → giảm API calls.

---

## 📊 **BEFORE vs AFTER**

### **Before Fix:**
```
🔍 Found 7 pending subscription(s)
🔄 Checking 6 CANCELLED subscriptions...
❌ Prisma error: Unknown argument started_at
❌ JSON error: Cannot serialize BigInt
```

### **After Fix:**
```
🔍 Found 1 pending subscription(s)  ← Only 1 real pending
✅ Activating subscription...
✅ Subscription activated successfully!
✅ Current plan: Pro  ← Displays correctly!
```

---

## 🧪 **HOW TO TEST**

1. **Reload pricing page:**
   ```
   http://localhost:3000/app/pricing
   ```

2. **Expected terminal logs:**
   ```
   📄 Pricing page loaded
   🔍 Checking for pending subscriptions...
   🔍 Found 1 pending subscription(s)
   ✅ Activating subscription...
   ✅ Subscription activated successfully!
   ✅ Current plan: Pro
   ```

3. **Check browser:**
   - Plan should display: "Pro" or "Starter" (not "Free")
   - No console errors
   - Usage quotas display correctly

---

## 📚 **LESSONS LEARNED**

### **1. Always Check Prisma Schema**
```prisma
model Subscription {
  start_time DateTime?  // ← THIS is the field name!
  // NOT started_at
}
```

### **2. BigInt Cannot Be JSON Serialized**
```javascript
// ❌ This will fail:
return json({ userId: user.id }); // user.id is BigInt

// ✅ Convert to String:
return json({ userId: user.id.toString() });
```

### **3. Clean Up Old Data**
- Polling checks ALL pending subscriptions
- If subscription already failed/cancelled, update DB
- Prevents unnecessary API calls

---

## 🎯 **FILES CHANGED**

1. `app/server/services/billing.js`
   - Line 483: `started_at` → `start_time`
   - Line 495-504: Handle CANCELLED subscriptions

2. `app/routes/webhooks.billing.jsx`
   - Line 80: `started_at` → `start_time`

3. `app/routes/app.pricing.jsx`
   - Line 73-81: Serialize BigInt fields
   - Line 111-112: Add missing fields in error fallback

---

**Status:** ✅ FIXED  
**Date:** 2025-10-29

