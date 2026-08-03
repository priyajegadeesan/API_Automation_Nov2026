# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-06-20 - Multi-Environment Support

### Added
- **Multi-Environment Configuration**
  - UAT environment configuration (`src/config/environments/uat.config.ts`)
  - TEST environment configuration (`src/config/environments/test.config.ts`)
  - PROD environment configuration (`src/config/environments/prod.config.ts`)
  - Environment manager (`src/config/environments/index.ts`)

- **Environment Variable Files**
  - `.env.uat` - UAT environment variables
  - `.env.test` - TEST environment variables
  - `.env.prod` - PROD environment variables
  - Updated `.env` and `.env.example` with multi-environment support

- **Opsera API Integration**
  - `OpseraUserService` - Complete Opsera User Management API service
  - Opsera-specific step definitions (`src/steps/opseraUserSteps.ts`)
  - Opsera feature file with 10 test scenarios (`features/opsera-users.feature`)

- **NPM Scripts**
  - `npm run test:uat` - Run tests in UAT environment
  - `npm run test:test` - Run tests in TEST environment
  - `npm run test:prod` - Run tests in PROD environment
  - `npm run test:uat:tags` - Run tagged tests in UAT
  - `npm run test:test:tags` - Run tagged tests in TEST
  - `npm run test:prod:tags` - Run tagged tests in PROD

- **Documentation**
  - `ENVIRONMENT_SETUP.md` - Comprehensive environment configuration guide
  - `BRUNO_TO_PLAYWRIGHT_MAPPING.md` - Bruno to Playwright migration guide
  - `ENVIRONMENTS_SUMMARY.md` - Quick reference for environments
  - `START_HERE.md` - Quick start guide for new users
  - `CHANGELOG.md` - This file

- **Dependencies**
  - `cross-env` - Cross-platform environment variable support

### Changed
- Updated `src/config/config.ts` to support multiple environments
- Updated `src/hooks/world.ts` to include `OpseraUserService`
- Updated `.gitignore` to better protect sensitive environment files
- Updated `README.md` with environment-specific instructions
- Enhanced logging to show current environment in test execution

### Enhanced
- Environment-specific configuration with automatic loading
- Customer ID management across environments
- Header injection with customer ID for Opsera APIs
- Better error handling for missing environments

## [1.0.0] - 2026-06-20 - Initial Release

### Added
- **Framework Setup**
  - Cucumber BDD framework integration
  - Playwright for API testing
  - TypeScript support
  - Complete folder structure

- **Page Object Model**
  - `BaseService` - Base class for all API services
  - `UserService` - User API operations
  - `PostService` - Post API operations
  - `APIHelper` - HTTP methods wrapper

- **Test Infrastructure**
  - Custom World context for shared state
  - Before/After hooks for setup and teardown
  - Winston logger for comprehensive logging
  - HTML report generation

- **Feature Files**
  - `users.feature` - 6 user API test scenarios
  - `posts.feature` - 7 post API test scenarios
  - Common step definitions

- **Utilities**
  - Logger configuration with file and console output
  - API helper with all HTTP methods (GET, POST, PUT, DELETE, PATCH)
  - Report generator for HTML reports

- **Configuration**
  - Environment-based configuration
  - `.env` file support
  - Playwright configuration
  - Cucumber configuration
  - TypeScript configuration

- **CI/CD**
  - GitHub Actions workflow
  - Automated test execution
  - Report generation and artifact upload

- **Documentation**
  - README.md - Complete framework documentation
  - QUICK_START.md - Getting started guide
  - CONTRIBUTING.md - Contribution guidelines
  - FRAMEWORK_OVERVIEW.md - Architecture overview

### Features
- ✅ BDD with Cucumber (Gherkin syntax)
- ✅ Playwright API testing
- ✅ TypeScript for type safety
- ✅ Page Object Model (Service pattern)
- ✅ Parallel test execution
- ✅ Multiple report formats (HTML, JSON, JUnit)
- ✅ Comprehensive logging
- ✅ CI/CD ready

---

## Version History

- **v1.1.0** - Multi-environment support with Opsera integration
- **v1.0.0** - Initial BDD framework with Playwright

## Upcoming Features

- [ ] Data-driven testing support
- [ ] Performance testing capabilities
- [ ] Enhanced error screenshots
- [ ] Test retry mechanism
- [ ] Advanced reporting with trends
- [ ] Integration with test management tools
- [ ] Mock server support
- [ ] Contract testing support

---

**Maintained by**: Development Team  
**Last Updated**: June 20, 2026
