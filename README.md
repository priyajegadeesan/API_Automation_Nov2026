# Opsera API Automation Framework

API automation testing framework using BDD (Behavior-Driven Development) with Cucumber.js and Playwright.

## Features

- ✅ BDD Framework with Cucumber.js
- ✅ Playwright for API testing
- ✅ Support for multiple environments (PROD, UAT)
- ✅ Comprehensive test reporting (HTML, JSON)
- ✅ 400+ automated test scenarios
- ✅ Step definitions for API testing
- ✅ Environment-specific configurations

## Project Structure

```
API_BDD_Playwright/
├── features-PROD/           # Production environment test features
├── features-UAT/            # UAT environment test features
├── step-definitions/        # Cucumber step definitions
├── support/                 # Support files and configurations
├── reports/                 # Test execution reports
├── .env.prod               # Production environment variables
└── .env.uat                # UAT environment variables
```

## Installation

```bash
npm install
```

## Running Tests

### Run PROD tests
```bash
npm run test:prod
```

### Run UAT tests
```bash
npm run test:uat
```

## Test Reports

HTML reports are generated in the `reports/` directory after test execution.

## Technologies Used

- **Cucumber.js** - BDD framework
- **Playwright** - API testing library
- **Chai** - Assertion library
- **Node.js** - Runtime environment
