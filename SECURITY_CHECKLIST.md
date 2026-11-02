# 🔒 Security Checklist

## Before Every Commit ✅

Run through this checklist before committing code:

### 1. Environment Variables
- [ ] All secrets are in `.env` files (not `.env.uat` or `.env.prod` in git)
- [ ] No hardcoded API keys or credentials in code
- [ ] Using `process.env.VARIABLE_NAME` for all secrets
- [ ] `.env` files are listed in `.gitignore`

### 2. Code Review
- [ ] No `console.log()` with sensitive data
- [ ] No commented-out credentials
- [ ] No TODO comments with passwords
- [ ] No test credentials in production code

### 3. Files
- [ ] Not committing `.pem`, `.key`, `.p12`, `.pfx` files
- [ ] Not committing database dumps or backups
- [ ] Not committing credential files

### 4. Run Security Scans
```bash
# Scan for secrets
npm run security:scan

# Check dependencies
npm audit

# Check git status
git status
```

---

## Weekly Security Tasks 📅

### Every Monday:
- [ ] Run `npm audit`
- [ ] Check for outdated packages: `npm outdated`
- [ ] Review access logs for suspicious activity

### Monthly:
- [ ] Rotate API keys and tokens
- [ ] Review `.gitignore` file
- [ ] Update dependencies: `npm update`
- [ ] Review team access permissions

---

## Security Incident Response 🚨

If you discover exposed credentials:

### Immediate Actions (Within 1 hour):
1. **ROTATE** the exposed credentials
2. **REVOKE** the compromised keys
3. **NOTIFY** security team/lead
4. **DOCUMENT** what was exposed

### Follow-up (Within 24 hours):
1. **CHECK LOGS** for unauthorized access
2. **CLEAN GIT HISTORY** if committed
3. **UPDATE DOCUMENTATION**
4. **CONDUCT** post-mortem

---

## Quick Commands 🚀

```bash
# Scan for secrets
npm run security:scan

# Check dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Check what's staged for commit
git diff --cached --name-only

# Check entire git history for secrets (slow!)
git log -S "api_key" --all --oneline
```

---

## Red Flags 🚩

Never commit files containing:
- ❌ API keys (AKIA..., AIza..., etc.)
- ❌ Passwords or passphrases
- ❌ Database connection strings
- ❌ OAuth client secrets
- ❌ JWT tokens
- ❌ Private keys (.pem, .key)
- ❌ Certificates (.crt, .p12)
- ❌ Environment files (.env.prod, .env.uat)

---

## Safe Alternatives ✅

Instead of hardcoding:
```javascript
// ❌ BAD
const apiKey = "AKIA1234567890ABCDEF";

// ✅ GOOD
const apiKey = process.env.API_KEY;
```

Instead of committing .env:
```bash
# ❌ BAD
git add .env.prod

# ✅ GOOD
git add .env.prod.template  # Contains placeholders only
```

---

## Need Help? 🆘

- **Read:** `SECURITY_GUIDE.md` for detailed documentation
- **Ask:** Security team or senior developers
- **Report:** Security incidents immediately

**Remember: Security is everyone's responsibility!** 🛡️
