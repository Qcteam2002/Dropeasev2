# 🔐 Environment Variables Template

## Hướng Dẫn Tạo File `.env`

**⚠️ QUAN TRỌNG**: File `.env` chứa thông tin nhạy cảm và **KHÔNG BAO GIỜ** được commit lên git!

### Tạo File `.env`

```bash
# Copy từ local.env
cp local.env .env

# Hoặc tạo file mới
nano .env
```

---

## 📋 Template Đầy Đủ

Copy nội dung sau vào file `.env` của bạn và thay thế các giá trị `your_*_here`:

```bash
# ============================================
# DATABASE CONFIGURATION
# ============================================
DATABASE_URL=mysql://root:root@localhost:33063/main

# ============================================
# REDIS CONFIGURATION
# ============================================
REDIS_HOST=localhost
REDIS_PORT=6782

# ============================================
# NODE ENVIRONMENT
# ============================================
NODE_ENV=production

# ============================================
# SHOPIFY APP CONFIGURATION
# ============================================
SHOPIFY_API_KEY=your_shopify_api_key_here
SHOPIFY_API_SECRET=your_shopify_api_secret_here
SHOPIFY_APP_ID=2ffd238e00074de340be24c6da5d6883
SHOPIFY_APP_URL=https://your-domain.com
SCOPES=read_files,read_locales,read_markets,read_products,read_themes,write_files,write_products,write_themes
SHOPIFY_DEMO_THEME_EXT_ID=903df1ac-205f-437f-810c-463263c95f58
SHOPIFY_WEBHOOK_SECRET=your-webhook-secret-here
STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here

# ============================================
# AI API KEYS
# ============================================
GEMINI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here

# ============================================
# APPLICATION SETTINGS
# ============================================
SITE_URL=https://your-domain.com
SITE_NAME=Virtual Try-On App
PORT=3000

# ============================================
# EXTERNAL API CONFIGURATION
# ============================================
EXTERNAL_API_URL=http://localhost:3001
```

---

## 🔑 Hướng Dẫn Lấy API Keys

### 1. Shopify API Keys

**Bước 1**: Truy cập [Shopify Partners Dashboard](https://partners.shopify.com/)

**Bước 2**: Chọn app của bạn hoặc tạo app mới

**Bước 3**: Lấy credentials:
- `SHOPIFY_API_KEY`: Client ID (trong tab "App setup")
- `SHOPIFY_API_SECRET`: Client secret (trong tab "App setup")
- `SHOPIFY_APP_ID`: App ID (trong URL hoặc App info)

**Bước 4**: Setup App URL:
- Development: Use ngrok tunnel URL
- Production: Your domain với HTTPS

**Bước 5**: Webhook Secret:
- Tự động tạo khi setup webhooks
- Copy từ Shopify Admin

### 2. Gemini AI API Key

**Bước 1**: Truy cập [Google AI Studio](https://aistudio.google.com/app/apikey)

**Bước 2**: Đăng nhập với Google account

**Bước 3**: Click "Get API Key" hoặc "Create API Key"

**Bước 4**: Copy key và paste vào `GEMINI_API_KEY`

**Lưu ý**: 
- Free tier: 60 requests/minute
- Cần Google account

### 3. OpenRouter API Key

**Bước 1**: Truy cập [OpenRouter](https://openrouter.ai/keys)

**Bước 2**: Sign up hoặc Login

**Bước 3**: Create new API key

**Bước 4**: Copy key và paste vào `OPENROUTER_API_KEY`

**Lưu ý**:
- Cần nạp credit để sử dụng
- Support nhiều AI models (GPT-4, Claude, Gemini, etc.)

### 4. Storefront Access Token

**Bước 1**: Truy cập Shopify Admin của store

**Bước 2**: Go to: Apps > App setup > Storefront API

**Bước 3**: Enable Storefront API access

**Bước 4**: Create new access token

**Bước 5**: Copy token và paste vào `STOREFRONT_ACCESS_TOKEN`

---

## 🔒 Security Best Practices

### ✅ DO's

- ✅ Keep `.env` file in `.gitignore`
- ✅ Use different keys for dev/staging/production
- ✅ Set file permissions: `chmod 600 .env`
- ✅ Rotate API keys regularly (monthly)
- ✅ Use strong passwords for database
- ✅ Store backups securely
- ✅ Use environment variable management tools (AWS Secrets Manager, HashiCorp Vault)

### ❌ DON'Ts

- ❌ NEVER commit `.env` to git
- ❌ NEVER share API keys in chat/email
- ❌ NEVER use production keys in development
- ❌ NEVER hardcode credentials in code
- ❌ NEVER log sensitive information
- ❌ NEVER commit `local.env` với real credentials

---

## 🔍 Kiểm Tra `.env` File

### Check File Exists và Permissions

```bash
# Check file exists
ls -la .env

# Should output:
# -rw------- 1 user user 1234 Jan 01 00:00 .env
# (Only owner can read/write)

# Set proper permissions nếu chưa có
chmod 600 .env
```

### Validate Environment Variables

```bash
# Check all required variables are set
node -e "
require('dotenv').config();
const required = [
  'DATABASE_URL',
  'REDIS_HOST',
  'SHOPIFY_API_KEY',
  'SHOPIFY_API_SECRET',
  'GEMINI_API_KEY',
  'OPENROUTER_API_KEY'
];
const missing = required.filter(key => !process.env[key]);
if (missing.length > 0) {
  console.error('Missing required env vars:', missing);
  process.exit(1);
}
console.log('✅ All required environment variables are set');
"
```

### Test Database Connection

```bash
# Test MySQL connection
npx prisma db pull

# Should not show errors
```

### Test Redis Connection

```bash
# Test Redis
redis-cli -h $REDIS_HOST -p $REDIS_PORT ping

# Should return: PONG
```

---

## 📝 Environment-Specific Configs

### Development `.env`

```bash
NODE_ENV=development
DATABASE_URL=mysql://root:root@localhost:33063/main
REDIS_PORT=6782
SHOPIFY_APP_URL=https://your-tunnel.ngrok.io
SUPPRESS_REACT_WARNINGS=true
```

### Production `.env`

```bash
NODE_ENV=production
DATABASE_URL=mysql://prod_user:strong_password@localhost:3306/main
REDIS_PORT=6379
SHOPIFY_APP_URL=https://your-domain.com
# Remove SUPPRESS_REACT_WARNINGS
```

### Docker `.env`

```bash
# Sử dụng service names thay vì localhost
DATABASE_URL=mysql://easyd_user:password@mysql:3306/main
REDIS_HOST=redis
REDIS_PORT=6379
```

---

## 🆘 Common Issues

### Issue: "Cannot connect to database"

**Check:**
```bash
# Database URL format đúng chưa?
echo $DATABASE_URL

# MySQL đã chạy chưa?
sudo systemctl status mysql

# Port đúng chưa?
mysql -h localhost -P 3306 -u root -p
```

### Issue: "Redis connection failed"

**Check:**
```bash
# Redis đã chạy chưa?
sudo systemctl status redis

# Port đúng chưa?
redis-cli -h localhost -p 6379 ping
```

### Issue: "Shopify OAuth failed"

**Check:**
```bash
# API keys đúng chưa?
cat .env | grep SHOPIFY_API_KEY

# App URL match với Shopify Partners?
cat .env | grep SHOPIFY_APP_URL

# Compare với shopify.app.toml
cat shopify.app.toml | grep application_url
```

---

## 📚 Additional Resources

- [Shopify App Authentication](https://shopify.dev/docs/apps/auth)
- [Environment Variables Best Practices](https://12factor.net/config)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Node.js dotenv Documentation](https://github.com/motdotla/dotenv)

---

## 🔄 Updating Environment Variables

### After Updating `.env`:

```bash
# If using PM2
pm2 restart easyd-app

# If using Docker
docker compose restart

# If running directly
# Stop the server (Ctrl+C) and start again
npm run start
```

### Verify Changes:

```bash
# Check app logs
pm2 logs easyd-app

# Or Docker logs
docker compose logs -f app

# Test endpoints
curl http://localhost:3000/api/health
```

---

**Last Updated**: 2025-01-28  
**Version**: 1.0.0

**⚠️ Remember**: Security là ưu tiên hàng đầu. Protect your API keys như protect password!


