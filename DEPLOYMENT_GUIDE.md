# 🚀 Hướng Dẫn Deploy Shopify App Lên Ubuntu Server

## 📋 Mục Lục
1. [Tổng Quan Hệ Thống](#tổng-quan-hệ-thống)
2. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
3. [Chuẩn Bị Trước Khi Deploy](#chuẩn-bị-trước-khi-deploy)
4. [Cài Đặt Dependencies](#cài-đặt-dependencies)
5. [Cấu Hình Environment Variables](#cấu-hình-environment-variables)
6. [Setup Database](#setup-database)
7. [Build Application](#build-application)
8. [Deploy với Docker](#deploy-với-docker)
9. [Deploy không dùng Docker](#deploy-không-dùng-docker)
10. [Testing](#testing)
11. [Monitoring và Logging](#monitoring-và-logging)
12. [Troubleshooting](#troubleshooting)
13. [Security Checklist](#security-checklist)

---

## 🎯 Tổng Quan Hệ Thống

### Tech Stack
- **Framework**: Remix (React-based)
- **Runtime**: Node.js v18.20+ hoặc v20+
- **Database**: MySQL 9.1.0
- **Cache/Queue**: Redis 8.0
- **Container**: Docker + Docker Compose
- **Package Manager**: npm
- **Shopify API**: @shopify/shopify-app-remix
- **ORM**: Prisma

### Kiến Trúc
```
┌─────────────────┐
│  Shopify Store  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│   Remix App     │◄────►│    MySQL     │
│  (Port 3000)    │      │  (Port 3306) │
└────────┬────────┘      └──────────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│ External API    │      │    Redis     │
│  (Port 3001)    │      │  (Port 6379) │
└─────────────────┘      └──────────────┘
```

### Tính Năng Chính
1. **Product Management**: Quản lý sản phẩm Shopify
2. **AI Image Generation**: Tạo ảnh sản phẩm bằng AI (6 styles)
3. **Product Optimization**: Tối ưu title, description, thumbnail
4. **Widget System**: Virtual Try-On widget
5. **Theme Extensions**: Shopify theme blocks

---

## 💻 Yêu Cầu Hệ Thống

### Server Requirements (Minimum)
- **OS**: Ubuntu 20.04 LTS hoặc mới hơn
- **RAM**: 4GB (khuyến nghị 8GB)
- **CPU**: 2 cores (khuyến nghị 4 cores)
- **Disk**: 20GB SSD
- **Network**: Public IP với domain đã setup SSL

### Software Requirements
```bash
# Node.js
node >= 18.20.0 hoặc >= 20.10.0

# Docker (nếu dùng Docker)
Docker >= 20.10.0
Docker Compose >= 2.0.0

# Database
MySQL >= 8.0 hoặc 9.1.0
Redis >= 6.0

# System Tools
git
curl
build-essential
```

---

## 🔧 Chuẩn Bị Trước Khi Deploy

### 1. Clone Repository
```bash
# SSH vào server Ubuntu
ssh user@your-server-ip

# Clone project
git clone <repository-url> /var/www/easyd-2
cd /var/www/easyd-2
```

### 2. Kiểm Tra Node.js Version
```bash
node --version  # Phải >= 18.20.0

# Nếu chưa có hoặc version cũ, cài đặt Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Cài Đặt Docker (Nếu Deploy bằng Docker)
```bash
# Cài Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Cài Docker Compose
sudo apt-get install docker-compose-plugin

# Kiểm tra
docker --version
docker compose version

# Add user vào docker group (không cần sudo)
sudo usermod -aG docker $USER
newgrp docker
```

---

## 📦 Cài Đặt Dependencies

### Install Node Modules
```bash
cd /var/www/easyd-2

# Install dependencies
npm ci --omit=dev

# Nếu development environment
npm install
```

**⚠️ QUAN TRỌNG**: Không commit `node_modules/`!

---

## 🔐 Cấu Hình Environment Variables

### 1. Tạo File `.env` từ Template

```bash
# Copy file template
cp local.env .env

# Hoặc tạo file mới
nano .env
```

### 2. Nội Dung File `.env` Production

```bash
# ============================================
# DATABASE CONFIGURATION
# ============================================
# Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL=mysql://root:your_strong_password@localhost:3306/main

# ============================================
# REDIS CONFIGURATION
# ============================================
REDIS_HOST=localhost
REDIS_PORT=6379
# REDIS_PASSWORD=your_redis_password  # Nếu có set password

# ============================================
# NODE ENVIRONMENT
# ============================================
NODE_ENV=production

# ============================================
# SHOPIFY APP CONFIGURATION
# ============================================
# Get from: https://partners.shopify.com/
SHOPIFY_API_KEY=your_shopify_api_key_here
SHOPIFY_API_SECRET=your_shopify_api_secret_here
SHOPIFY_APP_ID=2ffd238e00074de340be24c6da5d6883

# Shopify App URL (your production domain)
SHOPIFY_APP_URL=https://your-domain.com

# Shopify Scopes
SCOPES=read_files,read_locales,read_markets,read_products,read_themes,write_files,write_products,write_themes

# Shopify Demo Theme Extension ID
SHOPIFY_DEMO_THEME_EXT_ID=903df1ac-205f-437f-810c-463263c95f58

# Shopify Webhook Secret
SHOPIFY_WEBHOOK_SECRET=your-webhook-secret-here

# Storefront Access Token
STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here

# ============================================
# AI API KEYS
# ============================================
# Gemini AI - Get from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# OpenRouter API - Get from: https://openrouter.ai/keys
OPENROUTER_API_KEY=your_openrouter_api_key_here

# ============================================
# APPLICATION SETTINGS
# ============================================
SITE_URL=https://your-domain.com
SITE_NAME=Virtual Try-On App

# Port configuration
PORT=3000

# ============================================
# EXTERNAL API
# ============================================
# External API URL for image generation
# If running on same server: http://localhost:3001
# If running on different server: http://api-server-ip:3001
EXTERNAL_API_URL=http://localhost:3001

# ============================================
# OPTIONAL: DEVELOPMENT ONLY
# ============================================
# Suppress React warnings (remove in production)
# SUPPRESS_REACT_WARNINGS=true
```

### 3. File Permissions
```bash
# Set proper permissions cho .env
chmod 600 .env

# Chỉ owner có thể đọc/ghi
ls -la .env
# Output: -rw------- 1 user user 1234 Jan 01 00:00 .env
```

### 4. ⚠️ **CỰC KỲ QUAN TRỌNG: KHÔNG COMMIT CÁC FILE SAU**

**Thêm vào `.gitignore` (đã có sẵn nhưng kiểm tra lại):**

```bash
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
local.env

# Dependencies
node_modules/

# Build output
build/
dist/

# Logs
logs/
*.log

# Database
*.sqlite
*.db

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Shopify CLI
.shopify/

# Prisma
prisma/generated/

# Cache
.cache/
.parcel-cache/
```

**Kiểm tra trước khi commit:**
```bash
# Xem những file sẽ được commit
git status

# Nếu thấy .env hoặc node_modules, DỪNG NGAY!
# Remove khỏi git nếu đã add nhầm
git rm --cached .env
git rm --cached -r node_modules/

# Commit .gitignore
git add .gitignore
git commit -m "chore: update gitignore to prevent sensitive files"
```

---

## 🗄️ Setup Database

### Option 1: Docker Compose (Khuyến nghị)

File `docker-compose.yml` đã có sẵn:

```bash
# Start MySQL và Redis
docker compose up -d mysql redis

# Kiểm tra containers
docker compose ps

# Xem logs
docker compose logs -f mysql
```

**Database Credentials từ docker-compose.yml:**
- Host: `localhost`
- Port: `33063` (mapped from 3306)
- Database: `main`
- User: `root`
- Password: `root`

### Option 2: Manual MySQL Installation

```bash
# Cài MySQL
sudo apt update
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Login vào MySQL
sudo mysql -u root -p

# Tạo database và user
CREATE DATABASE main CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'easyd_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON main.* TO 'easyd_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations để tạo tables
npx prisma migrate deploy

# Kiểm tra database
npx prisma studio
# Mở browser: http://localhost:5555
```

**Kiểm tra tables đã tạo:**
```bash
mysql -u root -p main -e "SHOW TABLES;"
```

Expected tables:
- Session
- User
- PricingModule
- PricingFeature
- PricingModuleFeature
- Subscription
- SubscriptionQuota
- UsageLog
- PaymentLog
- SourceProduct
- SourceCategory
- PlatformProduct
- ProductOptimizationSettings
- ProductsOptimized
- DropeaseProduct
- WidgetConfig

---

## 🏗️ Build Application

### 1. Run Build
```bash
cd /var/www/easyd-2

# Production build
npm run build

# Kiểm tra build output
ls -la build/
```

Output structure:
```
build/
├── client/
│   ├── assets/
│   └── index.html
└── server/
    └── index.js
```

### 2. Test Build Locally
```bash
# Start production server
npm run start

# Hoặc
node build/server/index.js

# Test trong browser hoặc curl
curl http://localhost:3000
```

---

## 🐳 Deploy với Docker

### 1. Build Docker Image

```bash
# Build image
docker build -t easyd-app:latest .

# Kiểm tra image
docker images | grep easyd-app
```

### 2. Docker Compose Full Stack

Tạo file `docker-compose.prod.yml`:

```yaml
version: "3.8"

services:
  # MySQL Database
  mysql:
    image: mysql:9.1.0
    container_name: easyd_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: main
      MYSQL_USER: easyd_user
      MYSQL_PASSWORD: ${DB_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - easyd_network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:8.0-M02
    container_name: easyd_redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - easyd_network
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # Remix App
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: easyd_app
    restart: always
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: mysql://easyd_user:${DB_PASSWORD}@mysql:3306/main
      REDIS_HOST: redis
      REDIS_PORT: 6379
      SHOPIFY_API_KEY: ${SHOPIFY_API_KEY}
      SHOPIFY_API_SECRET: ${SHOPIFY_API_SECRET}
      SHOPIFY_APP_URL: ${SHOPIFY_APP_URL}
      GEMINI_API_KEY: ${GEMINI_API_KEY}
      OPENROUTER_API_KEY: ${OPENROUTER_API_KEY}
    depends_on:
      mysql:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - easyd_network
    volumes:
      - app_logs:/app/logs

networks:
  easyd_network:
    driver: bridge

volumes:
  mysql_data:
  redis_data:
  app_logs:
```

### 3. Tạo `.env.docker`

```bash
# Database
DB_ROOT_PASSWORD=strong_root_password_here
DB_PASSWORD=strong_user_password_here

# Shopify
SHOPIFY_API_KEY=your_key_here
SHOPIFY_API_SECRET=your_secret_here
SHOPIFY_APP_URL=https://your-domain.com

# AI APIs
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key
```

### 4. Deploy với Docker Compose

```bash
# Start all services
docker compose -f docker-compose.prod.yml --env-file .env.docker up -d

# Xem logs
docker compose logs -f app

# Kiểm tra status
docker compose ps

# Stop services
docker compose down

# Stop và xóa volumes (⚠️ Xóa data!)
docker compose down -v
```

---

## 🔧 Deploy Không Dùng Docker

### 1. Setup PM2 Process Manager

```bash
# Install PM2 globally
sudo npm install -g pm2

# Create PM2 ecosystem file
nano ecosystem.config.js
```

**`ecosystem.config.js`:**
```javascript
module.exports = {
  apps: [{
    name: 'easyd-app',
    script: './build/server/index.js',
    instances: 2,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
```

### 2. Start Application với PM2

```bash
# Create logs directory
mkdir -p logs

# Start app
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script (auto-start on server reboot)
pm2 startup systemd
# Copy và run command được output

# Kiểm tra status
pm2 status
pm2 logs easyd-app

# Monitoring
pm2 monit
```

### 3. Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/easyd-app
```

**Nginx Configuration:**
```nginx
upstream easyd_backend {
    server localhost:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Configuration (use Certbot)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logging
    access_log /var/log/nginx/easyd-app-access.log;
    error_log /var/log/nginx/easyd-app-error.log;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Max upload size (for product images)
    client_max_body_size 50M;

    # Proxy to Node.js app
    location / {
        proxy_pass http://easyd_backend;
        proxy_http_version 1.1;
        
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://easyd_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/easyd-app /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 4. Setup SSL với Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is setup automatically
# Test renewal
sudo certbot renew --dry-run
```

---

## 🧪 Testing

### 1. Health Check Endpoints

```bash
# Check app is running
curl http://localhost:3000

# Check database connection
curl http://localhost:3000/api/health/database

# Check Redis connection
curl http://localhost:3000/api/health/redis
```

### 2. Test Shopify Integration

```bash
# Test OAuth flow
curl https://your-domain.com/api/auth?shop=test-store.myshopify.com

# Test product API (need auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-domain.com/api/products
```

### 3. Test AI Image Generation

```bash
# Test generate-image endpoint
curl -X POST https://your-domain.com/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "productTitle": "Test Product",
    "productImages": ["https://example.com/image.jpg"],
    "language": "en",
    "market": "us"
  }'
```

### 4. Load Testing với Apache Bench

```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test 1000 requests, 10 concurrent
ab -n 1000 -c 10 https://your-domain.com/

# View results
```

---

## 📊 Monitoring và Logging

### 1. PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs easyd-app --lines 100

# Flush logs
pm2 flush
```

### 2. Database Monitoring

```bash
# MySQL slow query log
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Add:
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow-query.log
long_query_time = 2

# Restart MySQL
sudo systemctl restart mysql

# View slow queries
sudo tail -f /var/log/mysql/slow-query.log
```

### 3. Redis Monitoring

```bash
# Connect to Redis
redis-cli

# Monitor commands
MONITOR

# Get stats
INFO stats

# Check memory
INFO memory
```

### 4. Setup Log Rotation

```bash
# Create logrotate config
sudo nano /etc/logrotate.d/easyd-app
```

```
/var/www/easyd-2/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 5. Setup Monitoring với UptimeRobot

1. Đăng ký account tại: https://uptimerobot.com
2. Add monitor cho domain: `https://your-domain.com`
3. Setup email alerts

---

## 🔍 Troubleshooting

### Issue 1: App không start

**Triệu chứng:**
```bash
Error: Cannot find module 'build/server/index.js'
```

**Giải pháp:**
```bash
# Re-build app
npm run build

# Check build output
ls -la build/server/

# Check Node version
node --version  # Phải >= 18.20.0
```

### Issue 2: Database connection failed

**Triệu chứng:**
```bash
PrismaClientInitializationError: Can't reach database server
```

**Giải pháp:**
```bash
# Check MySQL is running
sudo systemctl status mysql

# Check connection
mysql -h localhost -P 3306 -u root -p

# Test DATABASE_URL
npx prisma db pull

# Check firewall
sudo ufw status
```

### Issue 3: Redis connection failed

**Triệu chứng:**
```bash
Error: Redis connection to localhost:6379 failed
```

**Giải pháp:**
```bash
# Check Redis is running
redis-cli ping
# Should return: PONG

# Check Redis logs
sudo tail -f /var/log/redis/redis-server.log

# Restart Redis
sudo systemctl restart redis
```

### Issue 4: External API không respond

**Triệu chứng:**
```
External API server at http://localhost:3001 is not responding correctly
```

**Giải pháp:**
```bash
# Check if external API server is running
curl http://localhost:3001/health

# Start external API server nếu chưa có
# (Cần có document riêng cho External API setup)

# Update API_BASE_URL trong /app/routes/api.generate-image.jsx
# Hoặc set environment variable
EXTERNAL_API_URL=http://correct-api-server:3001
```

### Issue 5: Shopify OAuth failed

**Triệu chững:**
```
Error: Invalid HMAC signature
```

**Giải pháp:**
```bash
# Check Shopify credentials trong .env
cat .env | grep SHOPIFY

# Verify với Shopify Partners Dashboard
# https://partners.shopify.com/

# Check redirect URLs match
# Update shopify.app.toml nếu cần

# Re-deploy với Shopify CLI
npm run deploy
```

### Issue 6: Build errors

**Triệu chứng:**
```bash
npm ERR! Failed at the easydrop@1.0.0 build script
```

**Giải pháp:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Check for missing dependencies
npm audit fix

# Build again
npm run build
```

### Issue 7: PM2 app crashed

**Triệu chứng:**
```bash
pm2 status
# Shows: status: errored
```

**Giải pháp:**
```bash
# View error logs
pm2 logs easyd-app --err --lines 50

# Delete và restart
pm2 delete easyd-app
pm2 start ecosystem.config.js --env production

# Increase memory limit nếu cần
# Edit ecosystem.config.js:
# max_memory_restart: '2G'
```

---

## 🔒 Security Checklist

### ✅ Before Going to Production

- [ ] **Environment Variables**
  - [ ] All API keys are in `.env`, NOT in code
  - [ ] `.env` is in `.gitignore`
  - [ ] `.env` file permissions: `chmod 600`
  - [ ] No sensitive data in git history

- [ ] **Database Security**
  - [ ] MySQL root password changed from default
  - [ ] Database user has minimum required privileges
  - [ ] MySQL port không expose ra internet (bind to localhost)
  - [ ] Regular backups configured

- [ ] **Redis Security**
  - [ ] Redis có password (nếu expose)
  - [ ] Redis bind to localhost only
  - [ ] Disable dangerous commands: `rename-command CONFIG ""`

- [ ] **Application Security**
  - [ ] All dependencies updated: `npm audit fix`
  - [ ] NODE_ENV=production
  - [ ] Rate limiting configured
  - [ ] CORS properly configured
  - [ ] CSP headers configured

- [ ] **Server Security**
  - [ ] UFW firewall enabled
  - [ ] Only ports 80, 443, 22 open to public
  - [ ] SSH key-based authentication
  - [ ] Fail2ban installed
  - [ ] Automatic security updates enabled

- [ ] **SSL/TLS**
  - [ ] SSL certificate installed
  - [ ] HTTPS redirect configured
  - [ ] HSTS header enabled
  - [ ] TLS 1.2+ only

- [ ] **Monitoring**
  - [ ] Uptime monitoring setup
  - [ ] Error logging configured
  - [ ] Disk space alerts
  - [ ] Email notifications for critical errors

### UFW Firewall Setup

```bash
# Enable UFW
sudo ufw enable

# Allow SSH (⚠️ DO THIS FIRST!)
sudo ufw allow 22/tcp

# Allow HTTP và HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status verbose

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### Database Backup Script

```bash
# Create backup script
sudo nano /usr/local/bin/backup-easyd-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/easyd-db"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="main"
DB_USER="root"
DB_PASS="your_password"

mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days backups
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-easyd-db.sh

# Setup cron job (daily at 2 AM)
sudo crontab -e

# Add:
0 2 * * * /usr/local/bin/backup-easyd-db.sh >> /var/log/easyd-backup.log 2>&1
```

---

## 📝 Deployment Checklist

### Pre-Deployment

- [ ] Code đã test kỹ trên local
- [ ] All tests passed
- [ ] Database migrations tested
- [ ] `.env.example` updated với tất cả required variables
- [ ] Documentation updated
- [ ] Backup database production (nếu có)

### Deployment Steps

- [ ] Pull latest code: `git pull origin main`
- [ ] Install dependencies: `npm ci --omit=dev`
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Build app: `npm run build`
- [ ] Restart app: `pm2 restart easyd-app` hoặc `docker compose restart`
- [ ] Check logs: `pm2 logs` hoặc `docker compose logs -f`
- [ ] Test endpoints
- [ ] Monitor for 15 minutes

### Post-Deployment

- [ ] Verify all features working
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Notify team deployment completed
- [ ] Document any issues encountered

---

## 🆘 Emergency Procedures

### Rollback

```bash
# If deployment failed, rollback immediately

# 1. Switch to previous git commit
git log --oneline -5
git checkout <previous-commit-hash>

# 2. Rebuild
npm run build

# 3. Restart
pm2 restart easyd-app

# 4. Rollback database nếu cần
npx prisma migrate resolve --rolled-back <migration-name>
```

### Emergency Contacts

- **Dev Team Lead**: [contact info]
- **DevOps**: [contact info]
- **On-call Engineer**: [contact info]

---

## 📚 Additional Resources

- [Shopify App Development Docs](https://shopify.dev/docs/apps)
- [Remix Documentation](https://remix.run/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [Docker Documentation](https://docs.docker.com)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

## 🔄 Maintenance

### Weekly Tasks
- [ ] Check disk space: `df -h`
- [ ] Check memory usage: `free -h`
- [ ] Review error logs
- [ ] Check database size: `du -sh /var/lib/mysql/main`

### Monthly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Review security advisories: `npm audit`
- [ ] Check SSL certificate expiry
- [ ] Review and rotate logs
- [ ] Database optimization: `OPTIMIZE TABLE`

### Quarterly Tasks
- [ ] Full security audit
- [ ] Performance testing
- [ ] Disaster recovery test
- [ ] Documentation review

---

## 📧 Support

Nếu gặp vấn đề trong quá trình deploy:

1. Check troubleshooting section trước
2. Review logs chi tiết
3. Search similar issues trong project issues/docs
4. Contact team lead với đầy đủ thông tin:
   - Error logs
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)
   - Screenshot nếu có

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-01-28  
**Maintained By**: Development Team  
**Review Cycle**: Monthly

---

## ⚠️ CRITICAL REMINDERS

1. **KHÔNG BAO GIỜ commit `.env` file!**
2. **LUÔN backup database trước khi migrate!**
3. **Test migrations trên staging trước!**
4. **Monitor logs sau mỗi deployment!**
5. **Keep API keys SECRET và rotate thường xuyên!**

---

## 🎉 Deployment Complete!

Sau khi follow hết các bước trên, application của bạn đã sẵn sàng cho production!

**Next Steps:**
1. Setup monitoring và alerts
2. Configure CDN nếu cần (Cloudflare, AWS CloudFront)
3. Setup CI/CD pipeline (GitHub Actions, GitLab CI)
4. Load testing và performance optimization
5. Setup staging environment cho testing

**Happy Deploying! 🚀**


