# ⚡ Quick Start - Deploy to Ubuntu Server

> **Mục đích**: Hướng dẫn nhanh để deploy app lên Ubuntu server trong 15 phút.
> 
> **Chi tiết đầy đủ**: Xem [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🎯 Prerequisites

- Ubuntu Server 20.04+ với SSH access
- Domain đã point về server IP
- Root hoặc sudo access

---

## 🚀 Deploy Steps (5 bước chính)

### **STEP 1: Setup Server** (5 phút)

```bash
# SSH vào server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt-get install docker-compose-plugin

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx

# Verify installations
node --version   # Should be >= 20.x
docker --version
pm2 --version
nginx -v
```

---

### **STEP 2: Clone & Install** (3 phút)

```bash
# Clone project
cd /var/www
git clone <your-repo-url> easyd-2
cd easyd-2

# Install dependencies
npm ci --omit=dev

# Generate Prisma Client
npx prisma generate
```

---

### **STEP 3: Configure Environment** (3 phút)

```bash
# Create .env file
nano .env
```

**Copy và điền thông tin:**

```bash
# Database
DATABASE_URL=mysql://root:your_password@localhost:3306/main

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Node
NODE_ENV=production
PORT=3000

# Shopify (get from https://partners.shopify.com)
SHOPIFY_API_KEY=your_key_here
SHOPIFY_API_SECRET=your_secret_here
SHOPIFY_APP_URL=https://your-domain.com

# AI APIs
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key

# External API
EXTERNAL_API_URL=http://localhost:3001
```

**Save**: `Ctrl+X`, `Y`, `Enter`

**Set permissions:**
```bash
chmod 600 .env
```

---

### **STEP 4: Setup Database** (2 phút)

**Option A: Using Docker (Khuyến nghị)**

```bash
# Start MySQL & Redis
docker compose up -d mysql redis

# Wait 10 seconds for MySQL to start
sleep 10

# Run migrations
npx prisma migrate deploy

# Verify
docker compose ps
```

**Option B: Manual MySQL**

```bash
# Install MySQL
sudo apt install mysql-server

# Setup database
sudo mysql -e "CREATE DATABASE main;"
sudo mysql -e "CREATE USER 'easyd_user'@'localhost' IDENTIFIED BY 'strong_password';"
sudo mysql -e "GRANT ALL PRIVILEGES ON main.* TO 'easyd_user'@'localhost';"

# Run migrations
npx prisma migrate deploy
```

---

### **STEP 5: Build & Start** (2 phút)

```bash
# Build application
npm run build

# Start with PM2
pm2 start npm --name "easyd-app" -- run start

# Save PM2 config
pm2 save

# Auto-start on reboot
pm2 startup systemd
# Copy & run the command shown

# Check status
pm2 status
pm2 logs easyd-app
```

---

## 🌐 Setup Nginx & SSL (Bonus - 5 phút)

### Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/easyd-app
```

**Paste này:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable & Test:**

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/easyd-app /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Setup SSL (Free với Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Follow prompts (auto-redirect to HTTPS: Yes)

# Verify SSL
curl https://your-domain.com
```

---

## ✅ Verification Checklist

```bash
# 1. Check app is running
pm2 status
# Should show: status: online

# 2. Check logs
pm2 logs easyd-app --lines 20
# Should not show errors

# 3. Test locally
curl http://localhost:3000
# Should return HTML

# 4. Test via domain
curl https://your-domain.com
# Should return HTML

# 5. Check database
npx prisma studio
# Open http://localhost:5555 in browser

# 6. Check Docker services
docker compose ps
# mysql and redis should be "Up"
```

---

## 🔄 Deploy Updates (Fast)

```bash
# SSH vào server
cd /var/www/easyd-2

# Pull latest code
git pull origin main

# Install new dependencies (if any)
npm ci --omit=dev

# Run new migrations (if any)
npx prisma migrate deploy

# Rebuild
npm run build

# Restart
pm2 restart easyd-app

# Check logs
pm2 logs easyd-app
```

---

## 🆘 Quick Troubleshooting

### App không start?

```bash
# Check build exists
ls -la build/server/index.js

# Check logs
pm2 logs easyd-app --err

# Restart PM2
pm2 delete easyd-app
pm2 start npm --name "easyd-app" -- run start
```

### Database connection failed?

```bash
# Check MySQL is running
docker compose ps mysql
# or
sudo systemctl status mysql

# Test connection
mysql -h localhost -u root -p
```

### External API error?

```bash
# Check API server is running
curl http://localhost:3001/health

# If not running, start it (need separate setup)
```

### Port already in use?

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>

# Or change PORT in .env
```

---

## 🔐 Security Quick Setup

```bash
# Setup firewall
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable

# Verify
sudo ufw status
```

---

## 📊 Monitoring Commands

```bash
# View logs real-time
pm2 logs easyd-app -f

# Monitor CPU/Memory
pm2 monit

# Check disk space
df -h

# Check memory
free -h

# Check Docker containers
docker compose ps
docker compose logs -f
```

---

## 📞 Need Help?

1. **Chi tiết đầy đủ**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. **Environment vars**: [ENV_TEMPLATE.md](./ENV_TEMPLATE.md)
3. **API Documentation**: [COMPLETE_IMAGE_GENERATION_API.md](./app/components/ProductDetail/COMPLETE_IMAGE_GENERATION_API.md)

---

## 🎉 You're Done!

**App đã chạy tại:** `https://your-domain.com`

**Next steps:**
1. Test tất cả features
2. Setup monitoring (UptimeRobot)
3. Setup backups (daily database backup)
4. Configure CI/CD (GitHub Actions)
5. Share với team để test!

---

**Estimated Total Time**: 15-20 phút

**Difficulty**: ⭐⭐⭐ Medium

**Support**: Contact team lead nếu gặp issue

---

## 📝 Quick Commands Reference

```bash
# View app status
pm2 status

# Restart app
pm2 restart easyd-app

# View logs
pm2 logs easyd-app

# Stop app
pm2 stop easyd-app

# Start app
pm2 start easyd-app

# Delete app from PM2
pm2 delete easyd-app

# Reload Nginx
sudo systemctl reload nginx

# Restart Docker services
docker compose restart

# Check SSL expiry
sudo certbot certificates
```

---

**Happy Deploying! 🚀**

*Last updated: 2025-01-28*


