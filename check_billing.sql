-- Check latest subscriptions
SELECT id, userId, status, amount, external_subscription_id, is_test, createdAt 
FROM Subscription 
ORDER BY createdAt DESC 
LIMIT 5;

-- Check active subscriptions
SELECT id, userId, status, amount, moduleId, external_subscription_id 
FROM Subscription 
WHERE status = 'ACTIVE';

-- Check quotas
SELECT sq.id, sq.userId, sq.feature_id, sq.limit_quantity, sq.used_quantity, pf.name
FROM SubscriptionQuota sq
LEFT JOIN PricingFeature pf ON sq.feature_id = pf.id
ORDER BY sq.createdAt DESC
LIMIT 10;

-- Check payment logs
SELECT id, userId, action, status, amount, createdAt
FROM PaymentLog
ORDER BY createdAt DESC
LIMIT 5;
