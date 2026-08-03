# 🎉 Multi-Environment BDD Framework - Quick Start

## ✅ What Was Successfully Created

Your BDD Playwright framework now supports **3 environments** from your Bruno collection:

```
┌─────────────────────────────────────────────────────────────┐
│                    ENVIRONMENTS CONFIGURED                   │
├─────────────┬─────────────────────────────────┬─────────────┤
│     UAT     │            TEST                 │    PROD     │
├─────────────┼─────────────────────────────────┼─────────────┤
│ api.opsera- │   api.opsera-test.opsera.io    │ app.opsera  │
│ uat.opsera  │                                 │    .io      │
│    .io      │                                 │             │
└─────────────┴─────────────────────────────────┴─────────────┘
```

## 🚀 Get Started in 3 Steps

### Step 1: Choose Your Environment

```bash
# Copy the environment file you want to use
copy .env.test .env     # For TEST (recommended to start)
copy .env.uat .env      # For UAT
copy .env.prod .env     # For PROD (be careful!)
```

### Step 2: Add Your Credentials

Edit `.env` and add your authentication token:

```env
BEARER_TOKEN=paste_your_token_here
AUTH_TOKEN=paste_your_auth_token_here
```

### Step 3: Run Your First Test

```bash
# Run all tests
npm test

# Or run just Opsera tests
npm run test:tags "@opsera"

# Or run smoke tests
npm run test:tags "@smoke"
```

## 📊 Available Commands

### Run Tests by Environment

```bash
npm run test:uat        # Run all tests in UAT
npm run test:test       # Run all tests in TEST
npm run test:prod       # Run all tests in PROD
```

### Run Tagged Tests

```bash
npm run test:uat:tags "@smoke"      # UAT smoke tests
npm run test:test:tags "@opsera"    # TEST Opsera tests
npm run test:prod:tags "@smoke"     # PROD smoke tests (careful!)
```

### View Reports

```bash
npm run report          # Generate HTML report
# Then open: reports/html/index.html
```

## 📁 What Files Were Created

### Environment Configurations
```
✅ src/config/environments/uat.config.ts
✅ src/config/environments/test.config.ts
✅ src/config/environments/prod.config.ts
✅ src/config/environments/index.ts
```

### Environment Variables
```
✅ .env.uat              (UAT environment settings)
✅ .env.test             (TEST environment settings)
✅ .env.prod             (PROD environment settings)
✅ .env                  (Active environment - edit this)
```

### Opsera API Integration
```
✅ src/services/OpseraUserService.ts
✅ src/steps/opseraUserSteps.ts
✅ features/opsera-users.feature
```

### Documentation
```
✅ ENVIRONMENT_SETUP.md              (Detailed setup guide)
✅ BRUNO_TO_PLAYWRIGHT_MAPPING.md   (Migration reference)
✅ ENVIRONMENTS_SUMMARY.md           (Quick reference)
✅ START_HERE.md                     (This file)
```

## 🎯 Test Scenarios Available

### From Original Framework (13 scenarios)
- ✅ User API tests (GET, POST, PUT, DELETE)
- ✅ Post API tests (GET, POST, PUT, DELETE)
- ✅ Smoke tests for quick validation

### New Opsera Tests (10 scenarios)
- ✅ Retrieve all Opsera users
- ✅ Search user by ID
- ✅ Search user by email
- ✅ Search multiple users
- ✅ Create new user
- ✅ Delete user
- ✅ Negative test scenarios
- ✅ Environment verification tests

**Total: 23 scenarios with 108 test steps**

## 🏷️ Test Tags

Use tags to filter and run specific tests:

| Tag | Description |
|-----|-------------|
| `@smoke` | Quick smoke tests |
| `@opsera` | Opsera-specific tests |
| `@users` | User management tests |
| `@posts` | Post API tests |
| `@create` | Create operations |
| `@delete` | Delete operations |
| `@negative` | Negative test scenarios |
| `@environment` | Environment verification |

## 📖 Documentation Guide

| Document | When to Read |
|----------|--------------|
| **START_HERE.md** (this file) | First time setup |
| **QUICK_START.md** | Basic usage guide |
| **ENVIRONMENT_SETUP.md** | Detailed environment configuration |
| **BRUNO_TO_PLAYWRIGHT_MAPPING.md** | Understanding Bruno→Playwright mapping |
| **README.md** | Complete framework documentation |
| **FRAMEWORK_OVERVIEW.md** | Architecture and design |
| **CONTRIBUTING.md** | Contributing to the framework |

## 💡 Quick Examples

### Example 1: Run UAT Smoke Tests
```bash
npm run test:uat:tags "@smoke"
```

### Example 2: Test Opsera User APIs in TEST
```bash
npm run test:test:tags "@opsera and @users"
```

### Example 3: Run All Tests in Parallel
```bash
cross-env ENV=test npm run test:parallel
```

### Example 4: Generate and View Report
```bash
npm test
npm run report
# Open reports/html/index.html in browser
```

## 🔍 Environment Verification

To verify your environment is correctly configured:

```bash
npm run test:test:tags "@environment"
```

This will check:
- ✅ Base URL matches expected environment
- ✅ Customer ID is correctly set
- ✅ Configuration loads properly

## 🆘 Troubleshooting

### Problem: Tests fail with authentication error
**Solution**: Make sure you've added `BEARER_TOKEN` in `.env` file

### Problem: Wrong environment is being used
**Solution**: Check `.env` file has correct `ENV=test` (or uat/prod)

### Problem: Cannot find environment configuration
**Solution**: Run `npm install` again to ensure all dependencies are installed

### Problem: TypeScript errors
**Solution**: Run `npm run clean` and then `npm install`

## 🎓 Learning Path

**Day 1**: Read this file → Run first test → View report
**Day 2**: Read ENVIRONMENT_SETUP.md → Test all 3 environments
**Day 3**: Read BRUNO_TO_PLAYWRIGHT_MAPPING.md → Understand mapping
**Day 4**: Read README.md → Explore full features
**Day 5**: Create your first custom test scenario

## 🌟 Key Features

✅ **3 Environments** - UAT, TEST, PROD with one command
✅ **BDD Format** - Tests in plain English (Gherkin)
✅ **Page Object Model** - Clean, maintainable service objects
✅ **TypeScript** - Type-safe code with IntelliSense
✅ **Rich Reporting** - HTML, JSON, and JUnit reports
✅ **Parallel Execution** - Run tests faster
✅ **CI/CD Ready** - GitHub Actions workflow included
✅ **Comprehensive Logging** - Winston logger with file output
✅ **Opsera Integration** - Ready-to-use Opsera API service

## 🎯 Your Next Steps

1. ✅ ~~Install dependencies~~ (Already done!)
2. ✅ ~~Create environment configs~~ (Already done!)
3. 📝 **Add your authentication tokens** (Do this now!)
4. 🧪 **Run your first test** (Try `npm run test:tags "@smoke"`)
5. 📊 **Generate and view report** (Run `npm run report`)
6. 📚 **Read ENVIRONMENT_SETUP.md** (Learn more details)
7. 🚀 **Start adding your own tests** (See CONTRIBUTING.md)

## 📞 Support & Documentation

- **Getting Started**: [QUICK_START.md](QUICK_START.md)
- **Environment Setup**: [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)
- **Full Documentation**: [README.md](README.md)
- **Migration Guide**: [BRUNO_TO_PLAYWRIGHT_MAPPING.md](BRUNO_TO_PLAYWRIGHT_MAPPING.md)

## ✨ Framework Ready!

Your BDD Playwright framework is now configured with:
- ✅ 3 environments (UAT, TEST, PROD)
- ✅ 23 test scenarios
- ✅ 108 test steps
- ✅ Opsera API integration
- ✅ Complete documentation

**Happy Testing! 🚀**

---

**Created**: June 20, 2026  
**Framework Version**: 1.0.0  
**Status**: ✅ Ready to Use
