# 🔧 Git Setup Guide

> Hướng dẫn setup Git để commit code an toàn và chuẩn

---

## 📋 Table of Contents

1. [Setup Commit Message Template](#setup-commit-message-template)
2. [Setup Pre-commit Hook](#setup-pre-commit-hook)
3. [Verify .gitignore](#verify-gitignore)
4. [Git Configuration](#git-configuration)
5. [Safe Commit Workflow](#safe-commit-workflow)

---

## 1️⃣ Setup Commit Message Template

### Step 1: Configure Git to use template

```bash
# Setup commit message template
git config --local commit.template .gitmessage

# Verify
git config --local commit.template
# Should output: .gitmessage
```

### Step 2: Test the template

```bash
# Try to commit (will open editor with template)
git commit

# You'll see the template with guidelines
# Fill in the type, subject, body, footer
```

### Commit Types Reference

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add AI image generation` |
| `fix` | Bug fix | `fix: resolve CORS issue` |
| `docs` | Documentation | `docs: update deployment guide` |
| `style` | Code formatting | `style: fix indentation` |
| `refactor` | Code refactoring | `refactor: simplify API handler` |
| `perf` | Performance | `perf: optimize image loading` |
| `test` | Tests | `test: add API integration tests` |
| `chore` | Maintenance | `chore: update dependencies` |

---

## 2️⃣ Setup Pre-commit Hook

### Automatic Check Script

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "🔍 Running pre-commit checks..."

# Check 1: Prevent .env files
echo "Checking for .env files..."
if git diff --cached --name-only | grep -E "\.env$|\.env\.|local\.env"; then
    echo -e "${RED}❌ ERROR: Attempting to commit .env file!${NC}"
    echo "Files detected:"
    git diff --cached --name-only | grep -E "\.env"
    echo ""
    echo "Remove with: git reset HEAD .env"
    exit 1
fi

# Check 2: Prevent node_modules
echo "Checking for node_modules..."
if git diff --cached --name-only | grep "node_modules/"; then
    echo -e "${RED}❌ ERROR: Attempting to commit node_modules!${NC}"
    echo "This should be in .gitignore"
    exit 1
fi

# Check 3: Prevent build directories
echo "Checking for build directories..."
if git diff --cached --name-only | grep -E "^build/|^dist/"; then
    echo -e "${RED}❌ ERROR: Attempting to commit build directory!${NC}"
    exit 1
fi

# Check 4: Check for potential secrets (warning only)
echo "Scanning for potential secrets..."
SECRET_PATTERNS="api[_-]?key|api[_-]?secret|password|token|bearer"
if git diff --cached | grep -iE "$SECRET_PATTERNS" | grep -v "process.env" | grep -v "ENV_TEMPLATE" | grep -v "DEPLOYMENT" | grep -v "gitmessage" | grep -v "PRE_COMMIT" > /dev/null; then
    echo -e "${YELLOW}⚠️  WARNING: Potential sensitive data detected!${NC}"
    echo "Found patterns that might be API keys or secrets."
    echo "Please review your changes carefully."
    echo ""
    
    # Show the lines
    echo "Suspicious lines:"
    git diff --cached | grep -iE "$SECRET_PATTERNS" | grep -v "process.env" | head -5
    echo ""
    
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Commit aborted."
        exit 1
    fi
fi

# Check 5: Large files check
echo "Checking for large files (>5MB)..."
for FILE in $(git diff --cached --name-only); do
    if [ -f "$FILE" ]; then
        SIZE=$(du -k "$FILE" | cut -f1)
        if [ $SIZE -gt 5120 ]; then  # 5MB in KB
            echo -e "${YELLOW}⚠️  WARNING: Large file detected: $FILE (${SIZE}KB)${NC}"
            echo "Consider using Git LFS or CDN for large files."
            read -p "Continue anyway? (y/N) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                exit 1
            fi
        fi
    fi
done

echo -e "${GREEN}✅ All pre-commit checks passed!${NC}"
echo ""
exit 0
EOF

# Make executable
chmod +x .git/hooks/pre-commit

echo "✅ Pre-commit hook installed successfully!"
```

### Test the Hook

```bash
# Try to commit .env (should be blocked)
touch test.env
git add test.env
git commit -m "test"
# Should show error and abort

# Clean up
rm test.env
```

---

## 3️⃣ Verify .gitignore

### Check .gitignore exists

```bash
cat .gitignore | grep -E "\.env|node_modules|build"
```

### Should contain (minimum):

```
# Environment variables
.env
.env.local
.env.*.local
local.env

# Dependencies
node_modules/

# Build output
build/
dist/

# Logs
logs/
*.log

# OS
.DS_Store
Thumbs.db

# Shopify
.shopify/

# Database
*.sqlite
*.db
```

### Add missing items:

```bash
# Append to .gitignore
cat >> .gitignore << 'EOF'

# Backup files
*.backup
*.bak
*.tmp

# Editor
.vscode/settings.json
.idea/
*.swp

# Test files
coverage/
.nyc_output/
EOF
```

---

## 4️⃣ Git Configuration

### User Configuration

```bash
# Set your name and email
git config --local user.name "Your Name"
git config --local user.email "your.email@example.com"

# Verify
git config --local user.name
git config --local user.email
```

### Useful Git Aliases

```bash
# Add helpful aliases
git config --local alias.st "status -sb"
git config --local alias.co "checkout"
git config --local alias.br "branch"
git config --local alias.cm "commit"
git config --local alias.lg "log --oneline --graph --decorate"
git config --local alias.last "log -1 HEAD"
git config --local alias.unstage "reset HEAD --"

# Now you can use:
git st      # Short status
git lg      # Pretty log
git last    # Show last commit
```

### Enable Colors

```bash
git config --local color.ui auto
git config --local color.status auto
git config --local color.branch auto
```

---

## 5️⃣ Safe Commit Workflow

### Daily Workflow

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes
# ... edit files ...

# 3. Check what changed
git status
git diff

# 4. Add files selectively (NOT git add .)
git add app/routes/api.generate-image.jsx
git add app/components/ProductDetail/CreateThumbnailModal.jsx

# 5. Review staged changes
git diff --cached

# 6. Commit (template will open)
git commit
# Fill in: feat: add image generation feature

# 7. Push to remote
git push origin feature/your-feature-name

# 8. Create Pull Request on GitHub
```

### Before Each Commit

```bash
# Run checklist
cat PRE_COMMIT_CHECKLIST.md | grep "□"

# Manual checks:
git status              # No .env files
git diff --cached       # Review all changes
git diff --cached --stat # Check file sizes
```

---

## 📊 Git Status Indicators

### Understand Git Status Output

```bash
git status
```

**Output symbols:**
- `??` = Untracked (new file, not in git)
- `A ` = Added (staged for commit)
- `M ` = Modified (staged)
- ` M` = Modified (not staged)
- `MM` = Modified, staged, then modified again
- `D ` = Deleted (staged)
- ` D` = Deleted (not staged)
- `R ` = Renamed

**Colors:**
- 🟢 Green = Staged (will be committed)
- 🔴 Red = Unstaged (won't be committed yet)

---

## 🔍 Useful Git Commands

### Inspect Changes

```bash
# Show changes in working directory
git diff

# Show changes staged for commit
git diff --cached

# Show changes for specific file
git diff path/to/file

# Show commit history
git log --oneline -10

# Show who changed what
git blame path/to/file

# Search in git history
git log --all --grep='image generation'
```

### Undo Changes

```bash
# Unstage file (keep changes)
git reset HEAD path/to/file

# Discard changes in working directory
git checkout -- path/to/file

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) ⚠️
git reset --hard HEAD~1

# Amend last commit (change message or add files)
git add forgotten-file
git commit --amend
```

### Branch Management

```bash
# List branches
git branch -a

# Create and switch to new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Delete local branch
git branch -d feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature

# Rename branch
git branch -m old-name new-name
```

---

## 🚨 Emergency Procedures

### Committed Wrong File

```bash
# If NOT pushed yet
git reset --soft HEAD~1
git reset HEAD wrong-file
git commit

# If ALREADY pushed
# Contact DevOps immediately!
```

### Committed .env File

```bash
# IMMEDIATELY:
# 1. Remove from git
git rm --cached .env
git commit -m "chore: remove .env from git"
git push

# 2. Remove from history (if pushed)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all

# 3. ROTATE ALL CREDENTIALS!
# - Change database passwords
# - Regenerate API keys
# - Update webhook secrets
```

### Merge Conflicts

```bash
# When pulling or merging
git pull origin main
# CONFLICT detected

# View conflicts
git status

# Edit conflicted files
# Look for:
# <<<<<<< HEAD
# Your changes
# =======
# Their changes
# >>>>>>> branch-name

# After resolving
git add resolved-file
git commit -m "fix: resolve merge conflict"
```

---

## 📚 Additional Resources

### Learn Git

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Git Guides](https://github.com/git-guides)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)

### Interactive Learning

- [Learn Git Branching](https://learngitbranching.js.org/)
- [Git Immersion](http://gitimmersion.com/)

### Git Cheat Sheets

- [GitHub Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Atlassian Git Cheat Sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)

---

## ✅ Setup Verification

### Run this to verify setup:

```bash
echo "🔍 Verifying Git Setup..."
echo ""

# Check commit template
if [ -f .gitmessage ]; then
    echo "✅ Commit template exists"
    if [ "$(git config --local commit.template)" = ".gitmessage" ]; then
        echo "✅ Commit template configured"
    else
        echo "❌ Commit template NOT configured"
    fi
else
    echo "❌ Commit template file missing"
fi

# Check pre-commit hook
if [ -x .git/hooks/pre-commit ]; then
    echo "✅ Pre-commit hook installed and executable"
else
    echo "❌ Pre-commit hook missing or not executable"
fi

# Check .gitignore
if [ -f .gitignore ]; then
    echo "✅ .gitignore exists"
    if grep -q "\.env" .gitignore; then
        echo "✅ .gitignore includes .env"
    else
        echo "❌ .gitignore missing .env"
    fi
else
    echo "❌ .gitignore missing"
fi

# Check user config
NAME=$(git config --local user.name)
EMAIL=$(git config --local user.email)
if [ -n "$NAME" ] && [ -n "$EMAIL" ]; then
    echo "✅ Git user configured: $NAME <$EMAIL>"
else
    echo "⚠️  Git user not configured locally"
fi

echo ""
echo "Setup verification complete!"
```

---

## 📞 Need Help?

- **Pre-commit issues**: Check [PRE_COMMIT_CHECKLIST.md](./PRE_COMMIT_CHECKLIST.md)
- **Git basics**: Ask team lead or check resources above
- **Emergency**: Contact DevOps immediately

---

**Remember**: Git is powerful but also dangerous. Always double-check before force-pushing or deleting!

**Stay Safe! 🔒**

---

*Last updated: 2025-01-28*


