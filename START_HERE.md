# 🎯 START HERE - Hướng Dẫn Cho Team

> **Đọc file này TRƯỚC TIÊN trước khi làm bất cứ điều gì!**

---

## 👋 Chào mừng đến với EASYD-2 Project!

Đây là Shopify App với tính năng **AI Image Generation** để tối ưu hóa sản phẩm.

**Document này được tạo ngày**: 2025-01-28

**Mục đích**: Hướng dẫn deploy lên Ubuntu server để cả team test

---

## 🚀 Quick Navigation - Bạn cần làm gì?

### 🔰 Bạn là Member Mới?

1. ✅ **ĐỌC FILE NÀY** (bạn đang đọc)
2. ✅ Đọc [DEPLOYMENT_README.md](./DEPLOYMENT_README.md) - Overview toàn bộ documents
3. ✅ Setup local: [ENV_TEMPLATE.md](./ENV_TEMPLATE.md)
4. ✅ Setup Git: [GIT_SETUP_GUIDE.md](./GIT_SETUP_GUIDE.md)
5. ✅ Đọc checklist: [PRE_COMMIT_CHECKLIST.md](./PRE_COMMIT_CHECKLIST.md)

**Thời gian**: ~30 phút

---

### 🚢 Bạn Cần Deploy Lên Server?

1. ✅ Đọc [QUICK_START_DEPLOY.md](./QUICK_START_DEPLOY.md) - 15 phút deploy
2. ✅ Refer [ENV_TEMPLATE.md](./ENV_TEMPLATE.md) - Lấy API keys
3. ✅ Troubleshoot: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Thời gian**: ~15-20 phút

---

### 💻 Bạn Cần Commit Code?

1. ✅ **BẮT BUỘC ĐỌC**: [PRE_COMMIT_CHECKLIST.md](./PRE_COMMIT_CHECKLIST.md)
2. ✅ Setup Git: [GIT_SETUP_GUIDE.md](./GIT_SETUP_GUIDE.md)
3. ✅ Follow workflow trong checklist

**Thời gian**: 10 phút setup + 5 phút/commit

---

### 🎨 Bạn Làm Việc với AI Features?

1. ✅ Đọc [COMPLETE_IMAGE_GENERATION_API.md](./app/components/ProductDetail/COMPLETE_IMAGE_GENERATION_API.md)
2. ✅ Setup local: [ENV_TEMPLATE.md](./ENV_TEMPLATE.md)

**Thời gian**: 20 phút

---

## 📚 Tất Cả Documents (7 files)

| # | File | Mục Đích | Thời Gian | Độ Ưu Tiên |
|---|------|----------|-----------|------------|
| 1 | [START_HERE.md](./START_HERE.md) | 👈 File này | 5 phút | 🔴 HIGH |
| 2 | [DEPLOYMENT_README.md](./DEPLOYMENT_README.md) | Tổng hợp tất cả docs | 10 phút | 🔴 HIGH |
| 3 | [QUICK_START_DEPLOY.md](./QUICK_START_DEPLOY.md) | Deploy nhanh 15 phút | 15 phút | 🟡 MEDIUM |
| 4 | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Guide đầy đủ chi tiết | 60 phút | 🟡 MEDIUM |
| 5 | [ENV_TEMPLATE.md](./ENV_TEMPLATE.md) | Setup environment vars | 10 phút | 🔴 HIGH |
| 6 | [PRE_COMMIT_CHECKLIST.md](./PRE_COMMIT_CHECKLIST.md) | Checklist trước commit | 5 phút | 🔴 HIGH |
| 7 | [GIT_SETUP_GUIDE.md](./GIT_SETUP_GUIDE.md) | Setup Git hooks & aliases | 15 phút | 🟡 MEDIUM |
| 8 | [COMPLETE_IMAGE_GENERATION_API.md](./app/components/ProductDetail/COMPLETE_IMAGE_GENERATION_API.md) | API documentation | 20 phút | 🟢 LOW |

---

## ⚡ Luồng Làm Việc Khuyến Nghị

### 🔰 Cho Developer Mới (Ngày 1)

**Morning (2 hours):**
```
09:00 - 09:30: Đọc START_HERE.md + DEPLOYMENT_README.md
09:30 - 10:00: Setup local theo ENV_TEMPLATE.md
10:00 - 10:30: Setup Git theo GIT_SETUP_GUIDE.md
10:30 - 11:00: Đọc PRE_COMMIT_CHECKLIST.md
```

**Afternoon (1 hour):**
```
14:00 - 14:30: Clone repo, setup environment
14:30 - 15:00: Run app locally, test features
```

---

### 🚀 Cho DevOps Deploy Production (4 hours)

**Step 1: Chuẩn bị (30 phút)**
```
- Đọc DEPLOYMENT_README.md
- Đọc QUICK_START_DEPLOY.md
- Chuẩn bị server Ubuntu
```

**Step 2: Deploy (1 giờ)**
```
- Follow QUICK_START_DEPLOY.md
- Setup database, Redis
- Build và start app
```

**Step 3: Configure (1 giờ)**
```
- Setup Nginx + SSL
- Configure firewall
- Setup monitoring
```

**Step 4: Test & Verify (30 phút)**
```
- Test all endpoints
- Check logs
- Verify features
```

**Step 5: Documentation (30 phút)**
```
- Document server info
- Share với team
- Setup backup
```

---

### 💻 Cho Developer Hàng Ngày

**Trước khi code (5 phút):**
```
1. git pull origin main
2. npm install (nếu có update)
3. Check .env file
```

**Trong khi code (∞):**
```
1. Tạo feature branch
2. Code features
3. Test locally
```

**Trước khi commit (5 phút):**
```
1. Đọc PRE_COMMIT_CHECKLIST.md
2. git status (check no .env)
3. git diff --cached (review changes)
4. git commit (với template)
```

**Sau khi commit:**
```
1. Push to feature branch
2. Create Pull Request
3. Request review
```

---

## 🔥 CRITICAL RULES - LUÔN NHỚ!

### ❌ KHÔNG BAO GIỜ:

1. **KHÔNG commit `.env` file!**
   ```bash
   # Luôn check trước:
   git status | grep .env
   # Phải RỖNG!
   ```

2. **KHÔNG commit `node_modules/`!**
   ```bash
   git status | grep node_modules
   # Phải RỖNG!
   ```

3. **KHÔNG hardcode API keys trong code!**
   ```javascript
   // ❌ SAI
   const apiKey = "sk-or-v1-abc123...";
   
   // ✅ ĐÚNG
   const apiKey = process.env.OPENROUTER_API_KEY;
   ```

4. **KHÔNG push trực tiếp lên main!**
   ```bash
   # ❌ SAI
   git push origin main
   
   # ✅ ĐÚNG
   git push origin feature/your-feature
   # Sau đó tạo Pull Request
   ```

5. **KHÔNG share credentials qua chat/email!**
   - ✅ Use secure password managers
   - ✅ Share qua encrypted channels
   - ✅ Rotate keys regularly

---

### ✅ LUÔN LUÔN:

1. **LUÔN đọc PRE_COMMIT_CHECKLIST.md trước khi commit**
2. **LUÔN test locally trước khi push**
3. **LUÔN review git diff trước khi commit**
4. **LUÔN backup database trước khi migrate**
5. **LUÔN sử dụng environment variables**
6. **LUÔN tạo feature branch, KHÔNG commit trực tiếp vào main**

---

## 🔐 Security First!

### Files TUYỆT ĐỐI KHÔNG Commit:

```
❌ .env
❌ .env.local
❌ .env.production
❌ local.env (nếu có real credentials)
❌ node_modules/
❌ build/
❌ dist/
❌ *.log
❌ *.sqlite
❌ *.db
❌ database dumps (*.sql)
```

### Verify .gitignore:

```bash
# Check .gitignore có đầy đủ không
cat .gitignore | grep -E "\.env|node_modules|build|logs"

# Nếu thiếu, add ngay:
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "node_modules/" >> .gitignore
```

---

## 📋 Checklist Trước Khi Làm Việc

### ✅ One-time Setup (Làm 1 lần duy nhất)

- [ ] Clone repository
- [ ] Install Node.js >= 18.20 hoặc >= 20.10
- [ ] Install Docker (nếu dùng)
- [ ] Read DEPLOYMENT_README.md
- [ ] Setup Git theo GIT_SETUP_GUIDE.md
- [ ] Setup .env theo ENV_TEMPLATE.md
- [ ] Run `npm install`
- [ ] Run `npx prisma generate`
- [ ] Test app locally: `npm run dev`

### ✅ Daily Checklist

- [ ] `git pull origin main`
- [ ] Check for updates: `npm install`
- [ ] Check `.env` file exists và có đủ keys
- [ ] Create feature branch: `git checkout -b feature/name`
- [ ] Code & test
- [ ] Before commit: Read PRE_COMMIT_CHECKLIST.md
- [ ] Commit với proper message
- [ ] Push to feature branch
- [ ] Create Pull Request

---

## 🆘 Cần Giúp Đỡ?

### Gặp Vấn Đề?

| Issue | Document để đọc |
|-------|-----------------|
| Không biết bắt đầu từ đâu | [DEPLOYMENT_README.md](./DEPLOYMENT_README.md) |
| Deploy lỗi | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) → Troubleshooting |
| Không biết config .env | [ENV_TEMPLATE.md](./ENV_TEMPLATE.md) |
| Commit nhầm file | [PRE_COMMIT_CHECKLIST.md](./PRE_COMMIT_CHECKLIST.md) → Emergency |
| Git commands lạ | [GIT_SETUP_GUIDE.md](./GIT_SETUP_GUIDE.md) |
| API không hoạt động | [COMPLETE_IMAGE_GENERATION_API.md](./app/components/ProductDetail/COMPLETE_IMAGE_GENERATION_API.md) |

### Contact

- **Team Lead**: [Thêm contact]
- **DevOps**: [Thêm contact]
- **Backend**: [Thêm contact]

---

## 🎓 Learning Path

### Tuần 1: Setup & Basic

- [ ] Day 1: Đọc tất cả docs (3 hours)
- [ ] Day 2: Setup local environment (2 hours)
- [ ] Day 3: Deploy to test server (3 hours)
- [ ] Day 4: Test features, report issues (2 hours)
- [ ] Day 5: Code review & best practices (2 hours)

### Tuần 2: Development

- [ ] Understand codebase structure
- [ ] Make first feature
- [ ] Practice commit workflow
- [ ] Review & improve code

---

## 📊 Project Structure Overview

```
easyd-2/
│
├── 📚 DOCUMENTATION (Đọc những file này!)
│   ├── START_HERE.md              ← BẮT ĐẦU TỪ ĐÂY
│   ├── DEPLOYMENT_README.md       ← Tổng hợp docs
│   ├── QUICK_START_DEPLOY.md      ← Deploy nhanh
│   ├── DEPLOYMENT_GUIDE.md        ← Guide đầy đủ
│   ├── ENV_TEMPLATE.md            ← Environment setup
│   ├── PRE_COMMIT_CHECKLIST.md    ← Trước khi commit
│   └── GIT_SETUP_GUIDE.md         ← Git configuration
│
├── 💻 SOURCE CODE
│   ├── app/                       ← Main app code
│   │   ├── routes/               ← API endpoints
│   │   ├── components/           ← React components
│   │   └── services/             ← Business logic
│   ├── prisma/                    ← Database schema
│   ├── extensions/                ← Shopify extensions
│   └── public/                    ← Static assets
│
├── ⚙️  CONFIGURATION
│   ├── package.json               ← Dependencies
│   ├── docker-compose.yml         ← Docker setup
│   ├── vite.config.js            ← Build config
│   ├── .gitignore                ← Git ignore rules
│   ├── .gitmessage               ← Commit template
│   └── shopify.app.toml          ← Shopify config
│
└── 🚫 NEVER COMMIT
    ├── .env                       ← API keys (SECRET!)
    ├── node_modules/              ← Dependencies
    ├── build/                     ← Build output
    └── *.log                      ← Log files
```

---

## 🎯 Goals for Team

### Short-term (Week 1)

- [ ] All members setup local environment
- [ ] Deploy to test server
- [ ] Test all features
- [ ] Report bugs/issues
- [ ] Everyone understands commit workflow

### Mid-term (Month 1)

- [ ] Stable production deployment
- [ ] Monitoring setup
- [ ] CI/CD pipeline
- [ ] Documentation complete
- [ ] Team comfortable with workflow

### Long-term (Quarter 1)

- [ ] Zero production incidents
- [ ] Fast feature delivery
- [ ] High code quality
- [ ] Happy customers!

---

## 🚀 Let's Get Started!

### Your First 3 Steps:

**Step 1 (5 phút):**
```bash
# Clone repo
git clone <repo-url>
cd easyd-2

# Read overview
cat DEPLOYMENT_README.md | less
```

**Step 2 (15 phút):**
```bash
# Setup environment
cp local.env .env
nano .env  # Fill in your API keys

# Setup Git
cat GIT_SETUP_GUIDE.md
git config --local commit.template .gitmessage
```

**Step 3 (10 phút):**
```bash
# Install & Run
npm install
npx prisma generate
npm run dev

# Open browser: http://localhost:3000
```

---

## 📞 Final Words

> **"Security first, code quality second, speed third."**

- ✅ Luôn đọc checklist trước khi commit
- ✅ Không bao giờ rush, luôn double-check
- ✅ Hỏi khi không chắc chắn
- ✅ Document những gì bạn học
- ✅ Help teammates khi họ cần

**We're a team. We succeed together! 🚀**

---

## ✅ You're Ready!

Sau khi đọc file này, bạn biết:

- ✅ Toàn bộ documents có trong project
- ✅ Document nào dùng khi nào
- ✅ Critical rules phải nhớ
- ✅ Bước tiếp theo là gì

**👉 Next Action**: 
1. Đọc [DEPLOYMENT_README.md](./DEPLOYMENT_README.md)
2. Setup local theo [ENV_TEMPLATE.md](./ENV_TEMPLATE.md)
3. Setup Git theo [GIT_SETUP_GUIDE.md](./GIT_SETUP_GUIDE.md)

---

**Happy Coding! 💻**

**Stay Safe & Secure! 🔐**

---

*Created: 2025-01-28*  
*For: EASYD-2 Team*  
*Purpose: Deployment & Testing*

---

**Questions?** → Check [DEPLOYMENT_README.md](./DEPLOYMENT_README.md) → Still stuck? → Ask team lead!


