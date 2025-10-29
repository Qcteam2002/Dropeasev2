# 🐛 DEBUG: Billing Activation Issue

## Vấn Đề

- ✅ Charge thành công trên Shopify
- ✅ Redirect về app đúng
- ❌ Plan vẫn là FREE thay vì PRO
- ❌ Quotas không được update

## 🔍 Debug Steps

### 1. Check Console Logs

Sau khi approve payment và redirect về app, check server console:

```bash
# Should see these logs:
📄 Pricing page loaded
🔗 URL params: { chargeId: 'gid://...', planId: 'pro', interval: 'monthly' }
💳 Attempting to activate subscription...
🔄 Activating subscription: gid://shopify/AppSubscription/...
📥 Shopify response: {...}
📊 Subscription status: ACTIVE (hoặc PENDING)
✅ Subscription is ACTIVE, updating database...
🔍 Found subscription in DB: ID: xxx
🎯 Initializing quotas...
✅ Quotas initialized successfully
🎉 Subscription activated successfully!
```

### 2. Check Database

```sql
-- Check pending subscriptions
SELECT * FROM Subscription 
WHERE status = 'PENDING' 
ORDER BY createdAt DESC 
LIMIT 5;

-- Check active subscriptions
SELECT * FROM Subscription 
WHERE status = 'ACTIVE' 
ORDER BY createdAt DESC 
LIMIT 5;

-- Check payment logs
SELECT * FROM PaymentLog 
ORDER BY createdAt DESC 
LIMIT 10;

-- Check quotas
SELECT * FROM SubscriptionQuota 
WHERE userId = <YOUR_USER_ID>;
```

### 3. Common Issues

#### Issue A: charge_id Mismatch

**Symptom**: Log shows "❌ Subscription not found in database"

**Cause**: `charge_id` từ URL không match với `external_subscription_id` trong database

**Check**:
```sql
-- Get pending subscription
SELECT external_subscription_id FROM Subscription WHERE status = 'PENDING' ORDER BY createdAt DESC LIMIT 1;

-- Compare với charge_id trong URL
-- Ví dụ: gid://shopify/AppSubscription/12345
```

**Fix**: Shopify return `charge_id` as query param, nhưng trong mutation response là `appSubscription.id`

---

#### Issue B: Subscription Status Not ACTIVE Yet

**Symptom**: Log shows "⏳ Subscription status is: PENDING"

**Cause**: Shopify chưa activate subscription (takes a few seconds)

**Solution**: Đợi vài giây và refresh page

---

#### Issue C: initializeQuotas() Fails

**Symptom**: Log shows error ở "🎯 Initializing quotas"

**Cause**: Pricing module chưa có trong database

**Fix**:
```bash
# Run seed script
node app/scripts/seedPricing.js
```

---

### 4. Manual Fix (If Needed)

Nếu subscription đã charge nhưng không activate:

```sql
-- 1. Find pending subscription
SELECT * FROM Subscription WHERE status = 'PENDING' ORDER BY createdAt DESC LIMIT 1;

-- 2. Manually activate
UPDATE Subscription 
SET status = 'ACTIVE', start_time = NOW() 
WHERE id = <SUBSCRIPTION_ID>;

-- 3. Initialize quotas manually
-- Get moduleId from subscription
SELECT moduleId FROM Subscription WHERE id = <SUBSCRIPTION_ID>;

-- Get features for that module
SELECT * FROM PricingModuleFeature WHERE moduleId = <MODULE_ID>;

-- Create quotas
INSERT INTO SubscriptionQuota (userId, feature_id, limit_quantity, used_quantity, type)
VALUES 
  (<USER_ID>, 'products_limit', 250, 0, 'SUBSCRIPTION'),
  (<USER_ID>, 'ai_generations', 500, 0, 'SUBSCRIPTION');
```

---

### 5. Test Flow

1. **Clear old subscriptions**:
```sql
DELETE FROM SubscriptionQuota WHERE userId = <YOUR_USER_ID>;
UPDATE Subscription SET status = 'CANCELLED' WHERE userId = <YOUR_USER_ID>;
```

2. **Test upgrade again**:
- Go to /app/pricing
- Click "Select Pro"
- Approve payment
- Watch server console logs
- Check database immediately

---

## 🔧 Expected Flow with Logs

### Creating Charge
```
Creating TEST charge for Pro Plan - Monthly
```

### After Approval
```
📄 Pricing page loaded
🔗 URL params: { 
  chargeId: 'gid://shopify/AppSubscription/123456',
  planId: 'pro',
  interval: 'monthly'
}
💳 Attempting to activate subscription...
```

### Querying Shopify
```
🔄 Activating subscription: gid://shopify/AppSubscription/123456
📥 Shopify response: {
  "data": {
    "node": {
      "id": "gid://shopify/AppSubscription/123456",
      "status": "ACTIVE",
      "name": "Pro Plan - Monthly",
      ...
    }
  }
}
📊 Subscription status: ACTIVE
```

### Updating Database
```
✅ Subscription is ACTIVE, updating database...
🔍 Found subscription in DB: ID: 5
```

### Initializing Quotas
```
🎯 Initializing quotas for user: 1 module: 3
✅ Quotas initialized successfully
🎉 Subscription activated successfully!
```

### Result
```
✅ Activation result: Success
```

---

## 📊 Database Schema Check

### Subscription Table
```sql
DESCRIBE Subscription;

-- Should have:
- id: String
- userId: BigInt
- external_subscription_id: String  ← THIS MUST MATCH charge_id
- status: String (PENDING → ACTIVE)
- moduleId: Int
- amount: Float
- is_test: Boolean
```

### SubscriptionQuota Table
```sql
DESCRIBE SubscriptionQuota;

-- Should have:
- id: BigInt
- userId: BigInt
- feature_id: String (e.g., 'products_limit')
- limit_quantity: Int (e.g., 250 for Pro)
- used_quantity: Int (starts at 0)
- type: QuotaType (SUBSCRIPTION or EXTRA)
```

---

## 🎯 Quick Debug Checklist

- [ ] Server console shows logs?
- [ ] charge_id in URL?
- [ ] Pending subscription exists in DB?
- [ ] external_subscription_id matches charge_id?
- [ ] Shopify returns status ACTIVE?
- [ ] Database updated to ACTIVE?
- [ ] Quotas initialized?
- [ ] Old subscriptions cancelled?

---

## 💡 Most Likely Issue

**Subscription status is PENDING when we query Shopify**

Shopify takes a few seconds to process payment and activate subscription.

**Solution**:
1. Add retry logic (query Shopify multiple times)
2. Or: User refreshes page manually
3. Or: Webhook handles activation (better approach!)

---

## 🔄 Retry Logic (Quick Fix)

Add to `activateSubscription()`:

```javascript
async activateSubscription(subscriptionId) {
  let retries = 3;
  let appSubscription = null;
  
  while (retries > 0) {
    const response = await this.admin.graphql(query, { variables: { id: subscriptionId } });
    const data = await response.json();
    appSubscription = data.data?.node;
    
    if (appSubscription?.status === 'ACTIVE') {
      break; // Success!
    }
    
    console.log(`⏳ Subscription still ${appSubscription?.status}, retrying... (${retries} left)`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
    retries--;
  }
  
  // Continue with activation...
}
```

---

**Created**: October 29, 2025  
**Purpose**: Debug billing activation issues  
**Status**: Active investigation

