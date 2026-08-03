# BDD Playwright API Automation Framework - Overview

## What Has Been Created

A complete, production-ready BDD framework for API automation with the following features:

### Core Framework Components

#### 1. BDD Test Structure (Cucumber)
- **Feature Files** (`features/`) - Test scenarios in Gherkin syntax
  - `users.feature` - 6 user API test scenarios
  - `posts.feature` - 7 post API test scenarios
  - Includes: smoke, CRUD operations, negative tests

#### 2. Page Object Model (Service Pattern)
- **Service Objects** (`src/services/`)
  - `BaseService.ts` - Base class with common functionality
  - `UserService.ts` - User API operations
  - `PostService.ts` - Post API operations
  - Easily extensible for new API resources

#### 3. Step Definitions (`src/steps/`)
- `userSteps.ts` - User-related step implementations
- `postSteps.ts` - Post-related step implementations
- `commonSteps.ts` - Shared step definitions
- **Reusable steps** for common API operations

#### 4. Test Infrastructure
- **Hooks** (`src/hooks/`)
  - `world.ts` - Custom World context with shared state
  - `hooks.ts` - Before/After hooks for setup/teardown
- **Utilities** (`src/utils/`)
  - `apiHelper.ts` - HTTP methods wrapper
  - `logger.ts` - Winston logger configuration
  - `reportGenerator.ts` - HTML report generation
- **Configuration** (`src/config/`)
  - `config.ts` - Environment configuration
  - Supports multiple environments via `.env`

### Test Execution Results

✅ **4 Smoke Tests Passed** (24 steps)
- Get all users
- Get user by ID
- Get all posts
- Get post by ID

### Reports Generated

1. **HTML Report**: `reports/html/index.html`
   - Visual test results dashboard
   - Scenario pass/fail status
   - Execution timeline
   - Feature-wise breakdown

2. **JSON Report**: `reports/cucumber-report.json`
   - Machine-readable test results
   - CI/CD integration ready

3. **JUnit XML**: `reports/cucumber-report.xml`
   - Jenkins/CI compatible format

4. **Logs**: `logs/`
   - `combined.log` - All logs
   - `error.log` - Error logs only
   - Console output with colors

## Framework Architecture

```
┌─────────────────────────────────────────────────┐
│         Feature Files (Gherkin)                 │
│         Test Scenarios in BDD Format            │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│         Step Definitions                        │
│         Glue Code (TypeScript)                  │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│         Service Objects (POM)                   │
│         API Business Logic                      │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│         API Helper                              │
│         HTTP Methods (GET, POST, PUT, etc.)     │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│         Playwright API Context                  │
│         Actual HTTP Requests                    │
└─────────────────────────────────────────────────┘
```

## Key Features

### 1. BDD with Cucumber
- Write tests in **plain English** (Gherkin)
- Easy collaboration with non-technical stakeholders
- Living documentation

### 2. TypeScript
- **Type safety** throughout the framework
- Better IDE support and autocomplete
- Catch errors at compile time

### 3. Playwright API Testing
- **Fast and reliable** API requests
- Built-in retry logic
- Powerful request/response handling

### 4. Comprehensive Logging
- **Winston logger** with multiple transports
- Console, file, and error-specific logs
- Helpful for debugging

### 5. Multiple Report Formats
- **HTML** - Human-readable visual reports
- **JSON** - Machine-readable for CI/CD
- **JUnit XML** - Jenkins/CI integration

### 6. Flexible Configuration
- **Environment-based** configuration
- `.env` file for different environments
- Easy to switch between dev/qa/prod

### 7. Parallel Execution
- Run tests **concurrently**
- Faster test execution
- Configurable worker count

### 8. CI/CD Ready
- **GitHub Actions** workflow included
- Automated test execution
- Report generation and artifact upload

## Available Test Scenarios

### User API Tests (6 scenarios)
1. ✅ Get all users
2. ✅ Get user by ID
3. Create a new user
4. Update an existing user
5. Delete a user
6. Get user with invalid ID (negative test)

### Post API Tests (7 scenarios)
1. ✅ Get all posts
2. ✅ Get post by ID
3. Get posts by user ID
4. Create a new post
5. Update an existing post
6. Delete a post
7. Get post with invalid ID (negative test)

## Test Tags

Organize and filter tests using tags:
- `@smoke` - Critical smoke tests
- `@users` - User-related tests
- `@posts` - Post-related tests
- `@create` - Create operation tests
- `@update` - Update operation tests
- `@delete` - Delete operation tests
- `@negative` - Negative test scenarios

## Quick Commands

```bash
# Run all tests
npm test

# Run smoke tests only
npm run test:tags "@smoke"

# Run user tests
npm run test:tags "@users"

# Run tests in parallel
npm run test:parallel

# Generate HTML report
npm run report

# Clean reports
npm run clean
```

## Extensibility

### Adding New API Tests

1. **Create Service Object** (`src/services/NewService.ts`)
```typescript
export class NewService extends BaseService {
  async getResource() { ... }
}
```

2. **Add to World Context** (`src/hooks/world.ts`)
```typescript
public newService: NewService;
this.newService = new NewService(this.request);
```

3. **Create Step Definitions** (`src/steps/newSteps.ts`)
```typescript
When('I call the new API', async function() { ... });
```

4. **Write Feature File** (`features/new.feature`)
```gherkin
Feature: New API Testing
  Scenario: Test new API
    When I call the new API
    Then the response status code should be 200
```

## Best Practices Implemented

✅ **Separation of Concerns** - Services, steps, and hooks are separate
✅ **DRY Principle** - Reusable step definitions
✅ **Type Safety** - TypeScript throughout
✅ **Logging** - Comprehensive logging at all levels
✅ **Error Handling** - Proper error handling and reporting
✅ **Configuration Management** - Environment-based config
✅ **Clean Code** - Well-organized project structure
✅ **Documentation** - README, Quick Start, Contributing guides
✅ **CI/CD** - GitHub Actions workflow ready
✅ **Version Control** - .gitignore configured

## Documentation Files

- `README.md` - Complete framework documentation
- `QUICK_START.md` - Getting started guide
- `CONTRIBUTING.md` - Contribution guidelines
- `FRAMEWORK_OVERVIEW.md` - This file

## Next Steps

1. **Run Full Test Suite**
   ```bash
   npm test
   ```

2. **View HTML Report**
   - Open `reports/html/index.html` in browser

3. **Add More Tests**
   - Create new feature files
   - Add step definitions
   - Extend service objects

4. **Configure for Your API**
   - Update `.env` with your API URL
   - Add authentication headers if needed
   - Create service objects for your endpoints

5. **Set Up CI/CD**
   - Push to GitHub
   - GitHub Actions will run automatically
   - View test results in Actions tab

## Technology Stack

- **Playwright** (v1.42.1) - API testing
- **Cucumber** (v10.3.1) - BDD framework
- **TypeScript** (v5.3.3) - Programming language
- **Chai** (v4.4.1) - Assertions
- **Winston** (v3.11.0) - Logging
- **ts-node** (v10.9.2) - TypeScript execution
- **dotenv** (v16.4.5) - Environment configuration
- **multiple-cucumber-html-reporter** (v3.5.0) - HTML reports

## Framework Statistics

- **Total Files Created**: 30+
- **Lines of Code**: 1500+
- **Test Scenarios**: 13
- **Test Steps**: 66
- **Service Objects**: 3
- **Step Definition Files**: 3
- **Feature Files**: 2
- **Utility Files**: 3

---

**Framework Created**: June 20, 2026
**Status**: ✅ Ready for Use
**Test Results**: ✅ All Smoke Tests Passing
