# 🧪 API BDD Playwright Automation Framework

Comprehensive BDD (Behavior-Driven Development) test automation framework for API testing using Cucumber.js and Playwright.

## 📋 Table of Contents

- [Overview](#overview)
- [Framework Structure](#framework-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Configuration](#configuration)
- [Features](#features)
- [Best Practices](#best-practices)

## 🎯 Overview

This framework provides a robust, scalable solution for API testing with:

- **BDD Approach** - Write tests in human-readable Gherkin syntax
- **Multiple Environments** - Support for UAT, PROD, and TEST environments
- **Comprehensive Reporting** - Detailed HTML reports with metrics and analysis
- **TypeScript Support** - Type-safe step definitions and configurations
- **Extended Timeouts** - Handles slow API endpoints (up to 300 seconds)
- **Parallel Execution** - Run tests in parallel for faster execution

### Key Metrics

- ✅ **212+ Passing Scenarios** in UAT
- ⚡ **96.4% Pass Rate**
- 🎯 **1,641 Steps Executed**
- 📊 **Comprehensive Coverage** across all API modules

## 📁 Framework Structure

```
API_BDD_Playwright/
├── features-UAT/              # UAT environment test scenarios
│   ├── Bulk delete-Api/       # Bulk operations (pipelines, tasks, tools)
│   ├── Global-Parameter-Api/  # Global parameter CRUD operations
│   ├── Group-APIs/            # Group management APIs
│   ├── LogsV2Uat/            # Logging and audit APIs
│   ├── Node-Public-API-Service/ # Core API services
│   ├── People-APIs/           # People management
│   ├── Pipelines-v2-UAT/     # Pipeline v2 APIs
│   ├── Projects-API/          # Project operations
│   ├── SCIM-APIs/             # SCIM provisioning
│   ├── Tasks-v2-UAT/          # Task management v2
│   └── User-Management/       # User CRUD and search
├── features-PROD/             # PROD environment test scenarios
├── src/
│   ├── config/               # Environment configurations
│   │   └── environments/     # UAT, PROD, TEST configs
│   ├── hooks/                # Cucumber hooks (before/after)
│   ├── services/             # API service classes
│   ├── steps/                # Step definitions
│   └── utils/                # Helper utilities and logger
├── reports/                   # Test reports and generator
│   ├── generate-report.js    # Report generation script
│   ├── README.md             # Report documentation
│   └── *.html                # Generated HTML reports
├── cucumber.js               # Cucumber configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ (tested with v24.15.0)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd API_BDD_Playwright

# Install dependencies
npm install
```

### Environment Setup

Create environment-specific configuration files:

1. **UAT**: `src/config/environments/uat.config.ts`
2. **PROD**: `src/config/environments/prod.config.ts`
3. **TEST**: `src/config/environments/test.config.ts`

Set environment variables in `.env` file:

```env
# UAT Environment
UAT_BASE_URL=https://api.opsera-uat.opsera.io/api
UAT_BEARER_TOKEN=your-uat-token
UAT_CUSTOMER_ID=your-customer-id

# PROD Environment
PROD_BASE_URL=https://api.opsera.io/api
PROD_BEARER_TOKEN=your-prod-token
PROD_CUSTOMER_ID=your-customer-id
```

## 🧪 Running Tests

### Run All Tests

```bash
# UAT environment
npm run test:uat

# PROD environment
npm run test:prod

# TEST environment
npm run test:test
```

### Run Tests with Tags

```bash
# Run smoke tests only
npm run test:uat:tags -- "@smoke"

# Run specific module
npm run test:uat:tags -- "@user-management"

# Exclude specific tests
npm run test:uat:tags -- "not @ignore"
```

### Run Specific Feature

```bash
npm run test:uat -- features-UAT/User-Management/retrieve-all-users.feature
```

### Parallel Execution

```bash
npm run test:parallel
```

## 📊 Reporting

### Generate Report

After test execution, generate comprehensive HTML report:

```bash
# Generate UAT report
npm run report:uat

# Generate PROD report
npm run report:prod
```

### Report Features

- **Metrics Dashboard** - Total, Passed, Failed, Pass Rate, Duration
- **API Category Breakdown** - Results grouped by API module
- **Detailed Results** - Tabbed view (All/Passed/Failed)
- **Interactive** - Click tabs to filter results
- **Responsive** - Works on all devices
- **Print-Ready** - Optimized for PDF export

### Report Location

All reports are saved in:
```
reports/API-Comprehensive-Report-{ENV}-{TIMESTAMP}.html
```

### Clean Old Reports

```bash
npm run clean:reports
```

## ⚙️ Configuration

### Cucumber Configuration

File: `cucumber.js`

```javascript
{
  require: ['src/steps/**/*.ts', 'src/hooks/**/*.ts'],
  format: ['progress-bar', 'json:reports/cucumber-report.json'],
  timeout: 300000, // 5 minutes for slow endpoints
  parallel: 1
}
```

### Environment Timeouts

Different timeouts for different environments:

- **UAT**: 300,000ms (5 minutes) - Handles slow endpoints
- **PROD**: 45,000ms (45 seconds)
- **TEST**: 30,000ms (30 seconds)

### Extended Timeout Step

For extremely slow endpoints (e.g., retrieve-all-users takes 55+ seconds):

```gherkin
When I send a GET request to "/api/v2/usermanagement/users" with extended timeout
```

## ✨ Features

### Implemented Test Suites

#### ✅ Bulk Delete APIs
- Pipeline single & bulk delete
- Task single & bulk delete
- Tool single & bulk delete

#### ✅ Global Parameters
- Create (encrypted & non-encrypted)
- Read by ID, value, search filter
- Update
- Delete
- Validation & error handling

#### ✅ Group Management
- Create groups
- Add/Remove members
- Patch members
- Get groups & members
- Delete groups

#### ✅ SCIM APIs
- User provisioning
- Group provisioning
- PATCH operations
- User search & filters

#### ✅ User Management
- Create users
- Search by email/ID
- Multi-ID search
- Delete users
- Retrieve all users (with extended timeout)

#### ✅ Pipelines v2
- Create (Jenkins, JMeter, etc.)
- Update
- Status checks
- Run, Stop, Reset operations
- Search & filtering

#### ✅ Tasks v2
- Get by ID/Name
- Status checks
- Lookup operations
- SCM migration tasks

#### ✅ Logs & Audit APIs
- Audit logs v2
- User action logs
- Date range filtering
- Task logs

### Special Features

#### 🐌 Slow Endpoint Handling

The framework automatically handles slow endpoints with extended timeouts:

```typescript
When('I send a GET request to {string} with extended timeout', async function (endpoint) {
  const response = await this.request.get(endpoint, { timeout: 120000 });
  // 120 seconds timeout
});
```

#### 🔄 Shared State Management

Cross-scenario state sharing for bulk operations:

```typescript
const sharedState: Record<string, any> = {};

// Store IDs across scenarios
sharedState['bulkPipelineIds'] = [id1, id2, id3];

// Delete all in bulk
await this.request.post('/api/v2/actions', {
  data: { action: 'delete', type: 'pipeline', target: sharedState['bulkPipelineIds'] }
});
```

## 📝 Best Practices

### 1. Feature File Organization

```gherkin
@uat @user-management @get @smoke
Feature: Retrieve all Users
  As an API user with admin access
  I want to retrieve all users from the system
  So that I can view the complete user list

  # Note: This endpoint takes 55+ seconds to respond
  
  Scenario: Successfully retrieve all users
    Given the API is available
    And I am authenticated with valid credentials
    When I send a GET request to "/api/v2/usermanagement/users" with extended timeout
    Then the response status code should be 200
    And the response should be a valid JSON
```

### 2. Tagging Strategy

Use consistent tags for better test organization:

- **@uat / @prod / @test** - Environment tags
- **@smoke** - Critical smoke tests
- **@regression** - Full regression suite
- **@ignore** - Skip deprecated/broken tests
- **@module-name** - Group by module (e.g., @user-management)
- **@http-method** - HTTP method tags (@get, @post, @patch, @delete)

### 3. Authentication

Always use proper authentication:

```gherkin
Given I am authenticated with valid credentials
# or
Given I am authenticated with RBAC user token
```

### 4. Ignored Tests

Document why tests are ignored:

```gherkin
@ignore
Feature: Pipeline notification
  # Note: This is a v1 API that has been deprecated
  # Use v2 pipeline APIs instead
```

### 5. Report Generation

Always generate reports after test execution:

```bash
npm run test:uat && npm run report:uat
```

## 🧹 Maintenance

### Update Dependencies

```bash
npm update
```

### Check for Security Issues

```bash
npm audit
```

### TypeScript Compilation

```bash
npx tsc --noEmit
```

## 🤝 Contributing

When adding new tests:

1. Follow the existing feature file structure
2. Use appropriate tags
3. Document slow endpoints with comments
4. Update this README if adding new modules
5. Generate and verify reports after changes

## 📚 Documentation

- [Report Documentation](reports/README.md) - Detailed reporting guide
- [Configuration Guide](src/config/environments/README.md) - Environment setup
- [Step Definitions](src/steps/README.md) - Available step definitions

## 🔧 Troubleshooting

### Common Issues

**Tests timeout**
- Increase timeout in `cucumber.js`
- Use extended timeout step for slow endpoints

**Authentication failures**
- Verify tokens in environment config
- Check customer ID is correct
- Ensure tokens haven't expired

**Report not generated**
- Check if `cucumber-report.json` exists
- Verify report generator script has no errors
- Run `npm run report:uat` explicitly

## 📊 Current Status

- **Framework Version**: 1.1.0
- **Last Updated**: October 29, 2026
- **Total Test Scenarios**: 220
- **Pass Rate**: 96.4%
- **Supported Environments**: UAT, PROD, TEST

---

**Maintained by:** QA Automation Team  
**Framework:** Cucumber.js + Playwright  
**Language:** TypeScript
