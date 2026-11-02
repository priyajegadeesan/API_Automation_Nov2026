# 🔒 Security Guide - Preventing Vulnerable Code Commits

## ⚠️ Important: `.gitignore` Is NOT Enough!

`.gitignore` only prevents **future** files from being tracked. It does NOT:
- ❌ Remove secrets from git history
- ❌ Scan for hardcoded credentials in code
- ❌ Check for vulnerable dependencies
- ❌ Validate code before commits

---

## 🛡️ Multi-Layer Security Strategy

### Layer 1: Pre-Commit Validation ✅

**What:** Automatically scan code before each commit
**How:** Git hooks that run security checks

```bash
# Already configured in this project
# Hooks will run automatically on `git commit`
```

### Layer 2: Secret Detection 🔍

**What:** Scan for hardcoded secrets, API keys, passwords
**How:** Pattern matching and entropy analysis

**Common secrets to avoid:**
- API keys: `AKIA...`, `AIza...`
- Passwords in code
- Database connection strings
- OAuth tokens
- Private keys (.pem, .key files)
- JWT tokens

### Layer 3: Dependency Scanning 📦

**What:** Check npm packages for known vulnerabilities
**How:** Regular npm audit and updates

```bash
# Run regularly:
npm audit
npm audit fix
```

### Layer 4: Environment File Security 🔐

**What:** Keep real credentials out of git
**How:** Templates + .gitignore + proper .env management

---

## 🚀 Quick Security Checklist

Before **every commit**, verify:

- [ ] No `.env` files with real credentials
- [ ] No hardcoded API keys or tokens
- [ ] No passwords in code or comments
- [ ] No database connection strings
- [ ] No AWS keys (AKIA...)
- [ ] No private keys (.pem, .key)
- [ ] All secrets are in `.env` and gitignored
- [ ] No `console.log()` with sensitive data

---

## 🔧 Security Tools Setup

### 1. Install Security Packages

```bash
npm install --save-dev husky lint-staged
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### 2. Initialize Git Hooks

```bash
npx husky init
```

### 3. Configure Pre-Commit Hook

This project includes:
- `.husky/pre-commit` - Runs before every commit
- `lint-staged.config.js` - What to check

### 4. Manual Secret Scan

```bash
# Scan your entire codebase
node scripts/scan-secrets.js
```

---

## 🔍 What Gets Scanned

### Automatic Pre-Commit Checks:

1. **Environment Files**
   - Blocks any `.env.uat`, `.env.prod` commits
   - Ensures only template files are committed

2. **Secret Patterns**
   - API keys (various formats)
   - AWS credentials
   - Private keys
   - Tokens and passwords

3. **File Types**
   - `.pem`, `.key`, `.p12`, `.pfx` files
   - Credential files

---

## 🚨 What to Do If You Find Secrets

### If NOT yet committed:
```bash
# Good! Just remove them
# Edit the file, move secrets to .env
# Commit the clean version
```

### If ALREADY committed:
```bash
# 1. Remove from current code
# 2. Rotate/change the exposed credentials immediately
# 3. Clean git history (if needed):
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/sensitive-file" \
  --prune-empty --tag-name-filter cat -- --all

# 4. Force push (DANGEROUS - coordinate with team)
git push origin --force --all
```

**⚠️ Important:** Once a secret is in git history, consider it **compromised**. Rotate it immediately!

---

## 📋 Safe Practices

### ✅ DO:
- Store secrets in `.env` files (gitignored)
- Use environment variables
- Use template files (`.env.example`)
- Use secret managers (Azure KeyVault, AWS Secrets Manager)
- Use `process.env.API_KEY` in code
- Keep credentials separate per environment

### ❌ DON'T:
- Hardcode credentials in source files
- Commit `.env` files with real values
- Share credentials in Slack/email
- Use production credentials in UAT/dev
- Store secrets in git history
- Commit `.pem` or `.key` files

---

## 🔐 Environment File Strategy

### Current Setup (SECURE ✅):

```
✅ .env.example          - Committed (placeholders only)
✅ .env.uat.template     - Committed (placeholders only)  
✅ .env.prod.template    - Committed (placeholders only)

❌ .env                  - GITIGNORED (real secrets)
❌ .env.uat              - GITIGNORED (real secrets)
❌ .env.prod             - GITIGNORED (real secrets)
```

### Setting Up New Environments:

```bash
# 1. Copy template
cp .env.prod.template .env.prod

# 2. Fill in real values (NEVER commit this)
nano .env.prod

# 3. Verify it's gitignored
git status  # Should NOT show .env.prod
```

---

## 📊 Dependency Security

### Regular Audits:

```bash
# Check for vulnerabilities
npm audit

# Fix automatically (where possible)
npm audit fix

# Fix breaking changes manually
npm audit fix --force
```

### Keep Dependencies Updated:

```bash
# Check outdated packages
npm outdated

# Update carefully
npm update
```

---

## 🔗 Additional Security Resources

- **Git Secrets**: https://github.com/awslabs/git-secrets
- **TruffleHog**: https://github.com/trufflesecurity/trufflehog
- **GitGuardian**: https://www.gitguardian.com/
- **OWASP Secrets Management**: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html

---

## 🆘 Security Incident Response

If credentials are exposed:

1. **Immediately rotate** the exposed credentials
2. **Revoke/disable** the compromised keys
3. **Check logs** for unauthorized access
4. **Clean git history** (if in commits)
5. **Notify team** and security lead
6. **Document** the incident

---

## ✅ Current Project Security Status

This project has:
- ✅ Comprehensive `.gitignore`
- ✅ Environment file templates
- ✅ Security scanning scripts
- ✅ Pre-commit hooks (when installed)
- ✅ Documentation and guides

**Next Steps:**
1. Run `npm audit` regularly
2. Enable pre-commit hooks
3. Scan codebase for existing secrets
4. Train team on security practices

---

**Remember:** Security is everyone's responsibility! 🛡️
