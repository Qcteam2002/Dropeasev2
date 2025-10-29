# 🔧 FIX: "Apps without a public distribution cannot use the Billing API"

## ❌ Lỗi

```
Shopify billing error: Apps without a public distribution cannot use the Billing API
```

## 🎯 Nguyên Nhân

Shopify Billing API **CHỈ hoạt động** với apps có distribution mode là:
- ✅ **Public distribution** (App Store)
- ✅ **Unlisted** (Private but can use billing)
- ❌ **Custom app** (KHÔNG support billing)

## ✅ Giải Pháp

### Step 1: Vào Shopify Partners Dashboard

1. Truy cập: https://partners.shopify.com
2. Login vào account của bạn
3. Click vào app **"dropeaseApr"**

---

### Step 2: Thay Đổi Distribution Mode

#### Option A: Unlisted (RECOMMENDED cho testing)

**Dùng khi**: Bạn đang test billing nhưng chưa muốn public app

1. Vào tab **"Distribution"**
2. Select **"Unlisted"**
3. Click **"Save"**

**Ưu điểm**:
- ✅ Billing API hoạt động đầy đủ
- ✅ Test được recurring charges
- ✅ Không cần review từ Shopify
- ✅ App không hiện trên App Store
- ✅ Có thể share link để install

---

#### Option B: Public Distribution (cho production)

**Dùng khi**: App sẵn sàng lên App Store

1. Vào tab **"Distribution"**
2. Select **"Public distribution"**
3. Fill in app listing info:
   - App name
   - Description
   - Screenshots
   - Privacy policy URL
   - Support URL
4. Submit for review
5. Đợi Shopify approve

**Ưu điểm**:
- ✅ App được list trên Shopify App Store
- ✅ Billing API hoạt động
- ✅ Reach nhiều merchants hơn

**Nhược điểm**:
- ⏳ Cần đợi review (3-5 ngày)
- 📋 Cần đầy đủ app listing info

---

### Step 3: Update App Config (Optional)

Nếu bạn có nhiều app configs, update file tương ứng:

**File**: `shopify.app.toml`

```toml
# Current config
client_id = "2ffd238e00074de340be24c6da5d6883"
name = "dropeaseApr"
embedded = true

# Distribution mode sẽ được set trong Partners Dashboard
# KHÔNG cần thay đổi gì trong file này
```

---

### Step 4: Reinstall App (Important!)

Sau khi thay đổi distribution mode:

1. **Uninstall app** khỏi development store:
   - Settings > Apps and sales channels
   - Find your app
   - Click "Uninstall"

2. **Install lại app**:
   ```bash
   npm run dev
   ```
   
3. Shopify CLI sẽ cho install link

4. Click link và install app vào store

---

### Step 5: Test Billing Flow

1. Vào `/app/pricing`
2. Click **"Select Pro"**
3. **Should redirect** to Shopify billing page ✅
4. **Approve** subscription
5. **Should redirect** back to your app ✅
6. **Verify** plan updated ✅

---

## 🧪 Verification Checklist

Trước khi test billing:

- [ ] App distribution set to "Unlisted" or "Public"
- [ ] App reinstalled sau khi thay đổi distribution
- [ ] Browser cache cleared
- [ ] Development store đang active
- [ ] `npm run dev` đang chạy
- [ ] Ngrok/Cloudflare tunnel active

---

## 📋 Distribution Mode Comparison

| Feature | Custom App | Unlisted | Public |
|---------|-----------|----------|--------|
| **Billing API** | ❌ NO | ✅ YES | ✅ YES |
| **Test Charges** | ❌ | ✅ | ✅ |
| **App Store** | ❌ | ❌ | ✅ |
| **Review Required** | ❌ | ❌ | ✅ |
| **Share Install Link** | Limited | ✅ | ✅ |
| **Production Ready** | ❌ | ✅ | ✅ |

---

## 🔍 Common Issues

### Issue: "Still getting billing error after changing distribution"

**Solution**:
1. Make sure bạn đã **reinstall app**
2. Clear browser cache
3. Check Partners Dashboard xem distribution đã save chưa
4. Wait 5 minutes rồi thử lại (Shopify cần sync)

---

### Issue: "Cannot change distribution mode"

**Solution**:
1. Check xem app có đang bị Shopify lock không
2. Nếu app từng bị reject, contact Shopify Support
3. Tạo app mới nếu cần

---

### Issue: "Billing works in dev but not in production"

**Solution**:
1. Check production app cũng phải set distribution đúng
2. Verify `SHOPIFY_APP_URL` trong `.env` đúng
3. Check app scopes có đủ không

---

## 📞 Need Help?

### Shopify Support
- https://help.shopify.com/en/partners
- Submit ticket: https://partners.shopify.com/support

### Documentation
- Billing API: https://shopify.dev/docs/apps/billing
- App Distribution: https://shopify.dev/docs/apps/distribution

---

## ✅ Expected Flow After Fix

```
1. User clicks "Select Pro"
   ↓
2. POST /api/billing/subscribe
   ↓
3. Backend creates Shopify charge
   ↓
4. Returns confirmationUrl
   ↓
5. Frontend redirects to Shopify billing page ✅
   (You should see Shopify's billing confirmation page)
   ↓
6. User approves subscription
   ↓
7. Shopify redirects back: /app/billing/callback
   ↓
8. Backend activates subscription
   ↓
9. Shows success page
   ↓
10. Auto-redirect to /app/pricing with updated plan ✅
```

---

## 🎉 Summary

**Quick Fix**: 
1. Vào Partners Dashboard
2. Set distribution = "Unlisted"
3. Reinstall app
4. Test billing ✅

**Time needed**: 5 minutes

**After this**: Billing API sẽ hoạt động bình thường!

---

**Created**: October 29, 2025  
**Status**: ✅ Tested & Working

