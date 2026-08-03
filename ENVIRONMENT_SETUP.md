# Environment Configuration Guide

This framework supports multiple environments based on the Bruno collection configuration: **UAT**, **TEST**, and **PROD**.

## Environment Overview

### Available Environments

| Environment | Base URL | Customer ID | Purpose |
|------------|----------|-------------|---------|
| **UAT** | https://api.opsera-uat.opsera.io/api | 67caf6137242d37590c9f060 | User Acceptance Testing |
| **TEST** | https://api.opsera-test.opsera.io/api | 6389f1a83527c100737ece11 | Testing & QA |
| **PROD** | https://app.opsera.io/api | 5f75953446564c10379902bb | Production |

## Configuration Files

### Environment-Specific Config Files

```
src/config/environments/
├── index.ts           # Environment manager
├── uat.config.ts      # UAT configuration
├── test.config.ts     # TEST configuration
└── prod.config.ts     # PROD configuration
```

### Environment Variable Files

```
.env.uat              # UAT environment variables
.env.test             # TEST environment variables
.env.prod             # PROD environment variables
.env                  # Active environment (default: TEST)
.env.example          # Template for environment setup
```

## Setup Instructions

### Method 1: Using Environment-Specific Files (Recommended)

1. **Copy the desired environment file**:
```bash
# For UAT
copy .env.uat .env

# For TEST
copy .env.test .env

# For PROD
copy .env.prod .env
```

2. **Add your authentication credentials** in `.env`:
```env
BEARER_TOKEN=your_actual_token_here
AUTH_TOKEN=your_auth_token_here
API_KEY=your_api_key_here
```

3. **Run tests**:
```bash
npm test
```

### Method 2: Using ENV Variable

Run tests directly against specific environment without copying files:

```bash
# UAT Environment
npm run test:uat

# TEST Environment
npm run test:test

# PROD Environment
npm run test:prod
```

### Method 3: Setting ENV Variable Manually

**Windows (PowerShell):**
```powershell
$env:ENV="uat"
npm test
```

**Windows (CMD):**
```cmd
set ENV=uat
npm test
```

**Linux/Mac:**
```bash
export ENV=uat
npm test
```

## Running Tests by Environment

### Run All Tests

```bash
# UAT Environment
npm run test:uat

# TEST Environment
npm run test:test

# PROD Environment
npm run test:prod
```

### Run Tests with Tags

```bash
# UAT - Smoke tests only
npm run test:uat:tags "@smoke"

# TEST - User tests
npm run test:test:tags "@users"

# PROD - Smoke tests (BE CAREFUL!)
npm run test:prod:tags "@smoke"
```

### Run Tests in Parallel

```bash
# UAT Environment - Parallel execution
cross-env ENV=uat npm run test:parallel

# TEST Environment - Parallel execution
cross-env ENV=test npm run test:parallel
```

## Environment Configuration Details

### UAT Configuration

```typescript
{
  name: 'UAT',
  baseURL: 'https://api.opsera-uat.opsera.io/api',
  customerID: '67caf6137242d37590c9f060',
  apiTimeout: 30000,
  retries: 2,
  endpoints: {
    users: '/users',
    search: '/users/search',
    groups: '/groups',
    projects: '/projects',
    pipelines: '/pipelines',
    tasks: '/tasks',
  }
}
```

### TEST Configuration

```typescript
{
  name: 'TEST',
  baseURL: 'https://api.opsera-test.opsera.io/api',
  customerID: '6389f1a83527c100737ece11',
  apiTimeout: 30000,
  retries: 2,
  endpoints: {
    users: '/users',
    search: '/users/search',
    groups: '/groups',
    projects: '/projects',
    pipelines: '/pipelines',
    tasks: '/tasks',
  }
}
```

### PROD Configuration

```typescript
{
  name: 'PROD',
  baseURL: 'https://app.opsera.io/api',
  customerID: '5f75953446564c10379902bb',
  apiTimeout: 45000,
  retries: 1,
  endpoints: {
    users: '/users',
    search: '/users/search',
    groups: '/groups',
    projects: '/projects',
    pipelines: '/pipelines',
    tasks: '/tasks',
  }
}
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `ENV` | Environment name | `uat`, `test`, `prod` |
| `BASE_URL` | API base URL | `https://api.opsera-uat.opsera.io/api` |
| `CUSTOMER_ID` | Customer/Organization ID | `67caf6137242d37590c9f060` |
| `API_TIMEOUT` | Request timeout (ms) | `30000` |
| `BEARER_TOKEN` | Bearer authentication token | `Bearer xyz...` |
| `AUTH_TOKEN` | Authentication token | `abc123...` |
| `API_KEY` | API key (if required) | `key_abc123...` |
| `PARALLEL_WORKERS` | Number of parallel workers | `2` |
| `RETRIES` | Number of retry attempts | `2` |
| `LOG_LEVEL` | Logging level | `info`, `warn`, `error` |

## CI/CD Environment Setup

### GitHub Actions

Update `.github/workflows/api-tests.yml`:

```yaml
jobs:
  test-uat:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:uat:tags "@smoke"
        env:
          BEARER_TOKEN: ${{ secrets.UAT_BEARER_TOKEN }}
          
  test-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:test:tags "@smoke"
        env:
          BEARER_TOKEN: ${{ secrets.TEST_BEARER_TOKEN }}
```

### Jenkins

```groovy
pipeline {
    agent any
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['test', 'uat', 'prod'], description: 'Select Environment')
    }
    stages {
        stage('Test') {
            steps {
                sh "npm run test:${params.ENVIRONMENT}"
            }
        }
    }
}
```

## Accessing Environment Config in Code

### In Step Definitions

```typescript
import { config } from '../../config/config';

When('I call the API', async function() {
  console.log(`Testing against: ${config.env}`);
  console.log(`Base URL: ${config.baseURL}`);
  console.log(`Customer ID: ${config.customerID}`);
});
```

### In Service Objects

```typescript
import { config } from '../config/config';

export class UserService extends BaseService {
  async getUsers() {
    const url = `${this.baseURL}${endpoints.users}`;
    // customerID is available via config.customerID
    return await this.apiHelper.get(url);
  }
}
```

## Best Practices

### 1. Never Commit Sensitive Data
- ✅ Keep `.env` in `.gitignore`
- ✅ Use environment variables for tokens
- ✅ Store secrets in CI/CD secret management
- ❌ Never commit `.env.uat`, `.env.test`, or `.env.prod` with real credentials

### 2. Environment-Specific Settings
- **UAT/TEST**: More retries, detailed logging
- **PROD**: Fewer retries, minimal logging, careful execution

### 3. Tag Your Tests
- Use `@smoke` for quick validation
- Use `@prod-safe` for tests safe to run in production
- Avoid destructive operations in PROD

### 4. Verify Environment Before Testing
```typescript
Before(async function() {
  console.log(`Running tests in: ${config.env.toUpperCase()} environment`);
  if (config.env === 'prod') {
    console.warn('⚠️  WARNING: Running tests in PRODUCTION!');
  }
});
```

## Troubleshooting

### Wrong Environment Being Used

**Check current environment**:
```bash
# PowerShell
echo $env:ENV

# CMD
echo %ENV%

# Linux/Mac
echo $ENV
```

**Solution**: Ensure `.env` file has correct `ENV` value or use environment-specific commands.

### Authentication Errors

**Check tokens are set**:
```bash
# View current .env (remove sensitive data before sharing)
cat .env
```

**Solution**: Ensure `BEARER_TOKEN`, `AUTH_TOKEN`, or `API_KEY` are properly set.

### Timeout Issues

**Increase timeout for slow environments**:
```env
API_TIMEOUT=60000
```

### Configuration Not Loading

**Clear node cache and reinstall**:
```bash
npm run clean
rm -rf node_modules package-lock.json
npm install
```

## Security Considerations

1. **Credential Management**
   - Use separate credentials for each environment
   - Rotate tokens regularly
   - Use short-lived tokens when possible

2. **PROD Access**
   - Limit who can run PROD tests
   - Use read-only operations when possible
   - Add extra confirmation for destructive operations

3. **Git Security**
   - Never commit `.env*` files with real credentials
   - Use `.env.example` as template only
   - Review PRs for accidental credential commits

## Quick Reference Card

```bash
# Setup
copy .env.test .env          # Set TEST environment
copy .env.uat .env           # Set UAT environment
copy .env.prod .env          # Set PROD environment

# Run Tests
npm run test:uat             # Run all UAT tests
npm run test:test            # Run all TEST tests
npm run test:prod            # Run all PROD tests (careful!)

# Run with Tags
npm run test:uat:tags "@smoke"      # UAT smoke tests
npm run test:test:tags "@users"     # TEST user tests
npm run test:prod:tags "@smoke"     # PROD smoke tests

# Check Environment
echo $env:ENV                # Windows PowerShell
echo %ENV%                   # Windows CMD
echo $ENV                    # Linux/Mac
```

---

**Last Updated**: June 20, 2026
**Based on**: Bruno Collection - User Management Environments
