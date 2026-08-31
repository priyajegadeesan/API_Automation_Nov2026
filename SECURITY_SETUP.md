# Security Setup Guide

## 🔒 Environment Configuration

This project uses environment-specific configuration files that contain sensitive credentials. Follow these steps to set up your local environment securely.

---

## ⚠️ IMPORTANT: Never Commit Real Credentials

**The following files should NEVER be committed to git:**
- `.env.uat` - Contains UAT environment credentials
- `.env.prod` - Contains PROD environment credentials  
- `.env.test` - Contains TEST environment credentials
- `.env` - Local environment file

These files are already added to `.gitignore`.

---

## 🚀 Setup Instructions

### 1. Create Your Local Environment Files

Copy the template files and add your actual credentials:

```bash
# For UAT environment
cp .env.uat.template .env.uat

# For PROD environment
cp .env.prod.template .env.prod

# For TEST environment
cp .env.example .env.test
```

### 2. Add Your Credentials

Edit each file and replace the placeholder values:

```bash
# Example for .env.uat
BEARER_TOKEN=<your_actual_uat_admin_token>
SCIM_BEARER_TOKEN=<your_actual_uat_scim_token>
RBAC_USER_TOKEN=<your_actual_uat_rbac_token>
```

### 3. Verify Files Are Not Tracked

Run this command to ensure your credential files are not tracked by git:

```bash
git status
```

You should NOT see `.env.uat`, `.env.prod`, or `.env.test` in the output.

---

## 🔑 Where to Get Tokens

### Opsera UAT Dashboard
1. Log in to https://opsera-uat.opsera.io
2. Navigate to Settings → API Tokens
3. Generate tokens with appropriate scopes:
   - **API Token** (scope: api) → Use as `BEARER_TOKEN`
   - **SCIM Token** (scope: scim) → Use as `SCIM_BEARER_TOKEN`
   - **RBAC User Token** (scope: api, limited permissions) → Use as `RBAC_USER_TOKEN`

### Opsera PROD Dashboard
1. Log in to https://app.opsera.io
2. Follow the same process as UAT
3. **WARNING:** Handle PROD tokens with extreme care!

---

## 🛡️ Security Best Practices

1. **Token Rotation**: Rotate tokens regularly (every 3-6 months)
2. **Least Privilege**: Use RBAC tokens for tests that don't require admin access
3. **Token Expiration**: Set appropriate expiration dates for tokens
4. **No Sharing**: Never share tokens via email, Slack, or other insecure channels
5. **Local Only**: Keep credential files on your local machine only

---

## 🚨 If Credentials Are Exposed

If you accidentally commit credentials:

1. **Immediately rotate/regenerate all exposed tokens**
2. **Remove from git history** using:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.uat .env.prod .env.test" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (coordinate with team first):
   ```bash
   git push origin --force --all
   ```
4. **Notify your security team**

---

## ✅ Verification Checklist

Before committing any changes, verify:

- [ ] `.env.uat`, `.env.prod`, `.env.test` are in `.gitignore`
- [ ] `git status` does NOT show these files
- [ ] Only template files (`.env.*.template`, `.env.example`) are tracked
- [ ] No tokens visible in `git diff` or `git log`

---

## 📝 Template Files (Safe to Commit)

These files contain NO real credentials and are safe to commit:
- ✅ `.env.example` - General template
- ✅ `.env.uat.template` - UAT template
- ✅ `.env.prod.template` - PROD template

---

## 🤝 Team Onboarding

When a new team member joins:

1. Share this `SECURITY_SETUP.md` guide
2. Have them create their own `.env.*` files from templates
3. Provide them with token generation instructions
4. Never share your tokens directly - they should generate their own

---

## 📞 Questions?

If you have questions about security setup, contact your team lead or security officer.

**Remember: Security is everyone's responsibility! 🔒**
