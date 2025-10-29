# ✅ Pre-Commit Checklist

> **⚠️ ĐỌC KỸ TRƯỚC KHI COMMIT!**
> 
> Checklist này giúp tránh commit nhầm sensitive data lên git.

---

## 🚫 CRITICAL: Files KHÔNG BAO GIỜ được commit

### ❌ Environment Variables
- [ ] `.env`
- [ ] `.env.local`
- [ ] `.env.production`
- [ ] `.env.development`
- [ ] `local.env` (nếu có real credentials)
- [ ] Bất kỳ file `*.env` nào khác có chứa API keys

### ❌ Dependencies & Build
- [ ] `node_modules/`
- [ ] `build/`
- [ ] `dist/`
- [ ] `.cache/`
- [ ] `.parcel-cache/`

### ❌ Database & Logs
- [ ] `*.sqlite`
- [ ] `*.db`
- [ ] `*.log`
- [ ] `logs/`
- [ ] Database dumps (`*.sql`, `*.sql.gz`)

### ❌ IDE & OS Files
- [ ] `.DS_Store` (Mac)
- [ ] `Thumbs.db` (Windows)
- [ ] `.vscode/settings.json` (nếu có personal settings)
- [ ] `.idea/` (JetBrains IDEs)
- [ ] `*.swp`, `*.swo` (Vim)

### ❌ Shopify & Temporary
- [ ] `.shopify/`
- [ ] `*.backup`
- [ ] `*.tmp`
- [ ] `*.temp`

---

## ✅ Files NÊN commit

### ✅ Source Code
- [x] `app/**/*.js`
- [x] `app/**/*.jsx`
- [x] `app/**/*.ts`
- [x] `app/**/*.tsx`

### ✅ Configuration Templates
- [x] `.gitignore`
- [x] `package.json`
- [x] `package-lock.json`
- [x] `docker-compose.yml`
- [x] `Dockerfile`
- [x] `vite.config.js`
- [x] `remix.config.js`
- [x] `tsconfig.json`
- [x] `shopify.app.toml`
- [x] `shopify.web.toml`

### ✅ Database Schema
- [x] `prisma/schema.prisma`
- [x] `prisma/migrations/**/*.sql`

### ✅ Documentation
- [x] `README.md`
- [x] `DEPLOYMENT_GUIDE.md`
- [x] `ENV_TEMPLATE.md`
- [x] `*.md` files (except sensitive ones)

### ✅ Public Assets
- [x] `public/**/*`
- [x] `extensions/**/*`

---

## 🔍 Pre-Commit Verification Steps

### STEP 1: Check Git Status

```bash
git status
```

**❌ If you see any of these, STOP immediately:**
- `.env`
- `node_modules/`
- `build/`
- `*.log`

### STEP 2: Review Changes

```bash
# Review all changes
git diff

# Review specific file
git diff <file-path>
```

**Check for:**
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] No hardcoded URLs with credentials
- [ ] No sensitive data in comments

### STEP 3: Check for Sensitive Data

```bash
# Search for potential API keys
grep -r "api_key\|apiKey\|API_KEY" app/ --exclude-dir=node_modules

# Search for passwords
grep -r "password\|PASSWORD\|passwd" app/ --exclude-dir=node_modules

# Search for tokens
grep -r "token\|TOKEN\|secret\|SECRET" app/ --exclude-dir=node_modules
```

**If found, ensure they're:**
- [ ] Using environment variables: `process.env.API_KEY`
- [ ] Not hardcoded values
- [ ] Not in comments

### STEP 4: Verify .gitignore

```bash
# Check .gitignore exists and is correct
cat .gitignore | grep -E "\.env|node_modules|build"
```

**Should see:**
```
.env
.env.local
.env.production
.env.development
node_modules/
build/
dist/
logs/
*.log
```

### STEP 5: Test if Ignored Files are Tracked

```bash
# Check if .env is tracked (should be empty)
git ls-files | grep "\.env$"

# Check if node_modules is tracked (should be empty)
git ls-files | grep "node_modules"
```

**If anything shows up, remove from tracking:**
```bash
git rm --cached .env
git rm --cached -r node_modules/
```

---

## 📝 Safe Commit Workflow

### 1. Add Files Selectively

```bash
# DON'T do this (adds everything):
# git add .

# DO this instead (add specific files):
git add app/routes/api.generate-image.jsx
git add app/components/ProductDetail/CreateThumbnailModal.jsx
git add DEPLOYMENT_GUIDE.md
```

### 2. Review What Will Be Committed

```bash
# Check staged files
git status

# Review changes
git diff --cached
```

### 3. Write Good Commit Message

```bash
git commit -m "feat: add AI image generation API endpoint

- Implement generate-image API with 6 styles
- Add CreateThumbnailModal component
- Update deployment documentation
- Add environment variable templates"
```

### 4. Push to Remote

```bash
# Push to feature branch first (not main)
git push origin feature/image-generation

# Create Pull Request for review
```

---

## 🚨 Emergency: Committed Sensitive Data?

### If you committed but NOT pushed yet:

```bash
# Remove last commit (keep changes)
git reset --soft HEAD~1

# Or remove last commit (discard changes)
git reset --hard HEAD~1

# Or amend commit
git commit --amend
```

### If you already PUSHED:

**⚠️ THIS IS SERIOUS! Follow these steps immediately:**

1. **Remove file from git history:**
```bash
# Remove file from all commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (⚠️ dangerous!)
git push origin --force --all
```

2. **Rotate ALL compromised credentials:**
   - [ ] Change database passwords
   - [ ] Regenerate API keys (Shopify, Gemini, OpenRouter)
   - [ ] Update webhook secrets
   - [ ] Update all `.env` files

3. **Notify team:**
   - [ ] Inform team lead
   - [ ] Update credentials on server
   - [ ] Document incident

---

## 🔧 Git Hooks Setup (Auto-check)

### Install Pre-commit Hook

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "Running pre-commit checks..."

# Check for .env files
if git diff --cached --name-only | grep -E "\.env$|\.env\."; then
    echo -e "${RED}ERROR: Attempting to commit .env file!${NC}"
    echo "Remove it with: git reset HEAD .env"
    exit 1
fi

# Check for potential API keys in staged files
if git diff --cached | grep -iE "api[_-]?key|api[_-]?secret|password|token" | grep -v "process.env"; then
    echo -e "${RED}WARNING: Potential sensitive data detected!${NC}"
    echo "Review your changes carefully."
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for node_modules
if git diff --cached --name-only | grep "node_modules/"; then
    echo -e "${RED}ERROR: Attempting to commit node_modules!${NC}"
    exit 1
fi

echo -e "${GREEN}Pre-commit checks passed!${NC}"
exit 0
EOF

# Make executable
chmod +x .git/hooks/pre-commit
```

**Test:**
```bash
# Try to commit .env (should be blocked)
git add .env
git commit -m "test"
# Should show error
```

---

## 📋 Quick Checklist

Copy this before every commit:

```
Pre-Commit Checklist:
□ Reviewed all files with `git status`
□ No .env files in commit
□ No node_modules/ in commit
□ No build/ or dist/ in commit
□ No API keys hardcoded
□ No passwords hardcoded
□ Only source code changes
□ Tested changes locally
□ All tests passed
□ Lint errors fixed
□ Commit message is clear
□ Committing to feature branch (not main)
```

---

## 🎓 Good Commit Practices

### DO ✅

```bash
# Commit related changes together
git add app/routes/api.generate-image.jsx
git add app/routes/api.generate-image-result.jsx
git commit -m "feat: add image generation API endpoints"

# Use conventional commits
# feat: new feature
# fix: bug fix
# docs: documentation
# refactor: code refactoring
# test: add tests
# chore: maintenance

# Write descriptive messages
git commit -m "fix: resolve CORS issue in image generation API

- Add proper CORS headers
- Handle preflight requests
- Update external API URL handling"
```

### DON'T ❌

```bash
# Don't commit everything
git add .

# Don't use vague messages
git commit -m "update"
git commit -m "fix"
git commit -m "changes"

# Don't commit directly to main
git push origin main

# Don't commit without testing
# Always test first!
```

---

## 📊 File Size Check

```bash
# Check size of files to be committed
git diff --cached --stat

# Large files (>1MB) should be reviewed
find . -type f -size +1M | grep -v node_modules
```

**Large files cần review:**
- Images should be optimized
- Videos should be in CDN
- Binaries should be in releases, not git

---

## 🔄 Undo Common Mistakes

### Unstage file

```bash
git reset HEAD <file>
```

### Discard local changes

```bash
git checkout -- <file>
```

### Undo last commit (keep changes)

```bash
git reset --soft HEAD~1
```

### Undo last commit (discard changes)

```bash
git reset --hard HEAD~1
```

---

## 📞 Need Help?

- **Before commit**: Ask team lead to review
- **After mistake**: Contact DevOps immediately
- **Security concerns**: Escalate to security team

---

## 🎯 Final Reminder

### The Golden Rule:

> **"When in doubt, DON'T commit!"**

Better to:
1. Ask team lead
2. Double-check everything
3. Use feature branches
4. Request code review

---

**Remember**: Git history is permanent. Once pushed, it's very hard to remove sensitive data completely!

**Stay Safe! 🔐**

---

*Last updated: 2025-01-28*


