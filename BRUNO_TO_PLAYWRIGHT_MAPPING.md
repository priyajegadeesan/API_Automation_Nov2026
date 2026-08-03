# Bruno Collection to Playwright BDD Framework Mapping

This document shows how the Bruno collection has been mapped to the Playwright BDD framework.

## Environment Mapping

### Bruno Collection Environments → Playwright Configurations

| Bruno Environment | Playwright Config File | Environment Variables | Base URL |
|-------------------|----------------------|----------------------|----------|
| **UAT env.bru** | `src/config/environments/uat.config.ts` | `.env.uat` | https://api.opsera-uat.opsera.io/api |
| **Test env.bru** | `src/config/environments/test.config.ts` | `.env.test` | https://api.opsera-test.opsera.io/api |
| **Prod env.bru** | `src/config/environments/prod.config.ts` | `.env.prod` | https://app.opsera.io/api |

### Environment Variables Mapping

#### Bruno Format:
```bruno
vars {
  host: https://api.opsera-uat.opsera.io/api
  customerID: 67caf6137242d37590c9f060
}
```

#### Playwright Format (.env.uat):
```env
ENV=uat
BASE_URL=https://api.opsera-uat.opsera.io/api
CUSTOMER_ID=67caf6137242d37590c9f060
```

## API Endpoints Mapping

### Bruno Collection APIs → Playwright Service Objects

| Bruno Collection Folder | Playwright Service | File Location |
|------------------------|-------------------|---------------|
| **User Management/** | `OpseraUserService` | `src/services/OpseraUserService.ts` |
| Generic APIs | `UserService` | `src/services/UserService.ts` |
| Generic APIs | `PostService` | `src/services/PostService.ts` |

## Request Examples Mapping

### 1. Search User by ID

#### Bruno Request (`Search user by ID.bru`):
```bruno
meta {
  name: Search user by ID
  type: http
  seq: 6
}

get {
  url: {{host}}/v2/usermanagement/users?_id=69a7c9e938e63d6398332743
  body: none
  auth: inherit
}

params:query {
  _id: 69a7c9e938e63d6398332743
}

headers {
  Content-Type: application/json
}
```

#### Playwright Implementation:

**Service Method** (`OpseraUserService.ts`):
```typescript
async searchUserById(userId: string): Promise<APIResponse> {
  const url = this.getFullUrl(`/v2/usermanagement/users?_id=${userId}`);
  return await this.apiHelper.get(url, {
    headers: this.getHeaders(),
  });
}
```

**Feature File** (`opsera-users.feature`):
```gherkin
Scenario: Search Opsera user by ID
  Given I have a valid Opsera user ID "69a7c9e938e63d6398332743"
  When I send a GET request to search Opsera user by ID
  Then the response status code should be 200
```

**Step Definition** (`opseraUserSteps.ts`):
```typescript
When('I send a GET request to search Opsera user by ID', async function() {
  const userId = this.getTestData('opseraUserId');
  this.response = await this.opseraUserService.searchUserById(userId);
});
```

### 2. Retrieve All Users

#### Bruno Request (`Retrieve all Users.bru`):
```bruno
get {
  url: {{host}}/v2/usermanagement/users
}
```

#### Playwright Implementation:

**Feature File**:
```gherkin
Scenario: Retrieve all users from Opsera
  When I send a GET request to retrieve all Opsera users
  Then the response status code should be 200
```

**Service Method**:
```typescript
async getAllUsers(params?: { limit?: number; skip?: number }): Promise<APIResponse> {
  const url = this.getFullUrl('/v2/usermanagement/users');
  return await this.apiHelper.get(url, { headers: this.getHeaders() });
}
```

### 3. Search User by Email

#### Bruno Request (`Search user by email.bru`):
```bruno
get {
  url: {{host}}/v2/usermanagement/users?email={{email}}
}
```

#### Playwright Implementation:

**Service Method**:
```typescript
async searchUserByEmail(email: string): Promise<APIResponse> {
  const url = this.getFullUrl(`/v2/usermanagement/users?email=${email}`);
  return await this.apiHelper.get(url, { headers: this.getHeaders() });
}
```

### 4. Create New User

#### Bruno Request (`Create a new user.bru`):
```bruno
post {
  url: {{host}}/v2/usermanagement/users
  body: json
}
```

#### Playwright Implementation:

**Service Method**:
```typescript
async createUser(userData: any): Promise<APIResponse> {
  const url = this.getFullUrl('/v2/usermanagement/users');
  return await this.apiHelper.post(url, {
    headers: this.getHeaders(),
    data: { ...userData, customerId: config.customerID },
  });
}
```

### 5. Delete User

#### Bruno Request (`Delete User.bru`):
```bruno
delete {
  url: {{host}}/v2/usermanagement/users/{{userId}}
}
```

#### Playwright Implementation:

**Service Method**:
```typescript
async deleteUser(userId: string): Promise<APIResponse> {
  const url = this.getFullUrl(`/v2/usermanagement/users/${userId}`);
  return await this.apiHelper.delete(url, { headers: this.getHeaders() });
}
```

### 6. Search with Multiple IDs

#### Bruno Request (`Search with Multiple ID.bru`):
```bruno
get {
  url: {{host}}/v2/usermanagement/users?_id[]=id1&_id[]=id2
}
```

#### Playwright Implementation:

**Service Method**:
```typescript
async searchUsersByMultipleIds(userIds: string[]): Promise<APIResponse> {
  const queryParams = userIds.map(id => `_id[]=${id}`).join('&');
  const url = this.getFullUrl(`/v2/usermanagement/users?${queryParams}`);
  return await this.apiHelper.get(url, { headers: this.getHeaders() });
}
```

## Running Tests

### Bruno CLI Commands → Playwright Commands

| Bruno Action | Playwright Command |
|--------------|-------------------|
| Run UAT collection | `npm run test:uat` |
| Run TEST collection | `npm run test:test` |
| Run PROD collection | `npm run test:prod` |
| Run specific test | `npm run test:tags "@smoke"` |
| Run UAT smoke tests | `npm run test:uat:tags "@smoke"` |

## Configuration Access

### In Bruno:
```bruno
url: {{host}}/v2/usermanagement/users
headers: Content-Type: application/json
```

### In Playwright:
```typescript
// Automatic from config
const url = this.getFullUrl('/v2/usermanagement/users');
const headers = this.getHeaders(); // Includes Content-Type automatically
```

## Authentication

### Bruno:
```bruno
auth: inherit
headers {
  Authorization: Bearer {{token}}
}
```

### Playwright (.env):
```env
BEARER_TOKEN=your_token_here
AUTH_TOKEN=your_auth_token_here
```

### In Code:
```typescript
protected getHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(config.bearerToken && { 'Authorization': `Bearer ${config.bearerToken}` }),
    ...(config.customerID && { 'X-Customer-ID': config.customerID }),
  };
}
```

## Project Structure Comparison

### Bruno Collection Structure:
```
User Management/
├── environments/
│   ├── UAT env.bru
│   ├── Test env.bru
│   └── Prod env.bru
├── Search user by ID.bru
├── Search user by email.bru
├── Retrieve all Users.bru
├── Create a new user.bru
├── Delete User.bru
└── Search with Multiple ID.bru
```

### Playwright BDD Structure:
```
API_BDD_Playwright/
├── src/
│   ├── config/
│   │   ├── environments/
│   │   │   ├── uat.config.ts
│   │   │   ├── test.config.ts
│   │   │   ├── prod.config.ts
│   │   │   └── index.ts
│   │   └── config.ts
│   ├── services/
│   │   └── OpseraUserService.ts
│   └── steps/
│       └── opseraUserSteps.ts
├── features/
│   └── opsera-users.feature
├── .env.uat
├── .env.test
└── .env.prod
```

## Advantages of Playwright BDD Over Bruno

1. **Version Control**: All tests are code-based and can be versioned in Git
2. **BDD Format**: Tests are written in Gherkin (Given/When/Then) for better readability
3. **Reusability**: Step definitions can be reused across multiple scenarios
4. **CI/CD Integration**: Easy integration with GitHub Actions, Jenkins, etc.
5. **Parallel Execution**: Run tests in parallel for faster execution
6. **Rich Reporting**: HTML, JSON, and JUnit reports with detailed logs
7. **Type Safety**: TypeScript provides compile-time error checking
8. **Extensibility**: Easy to add new services, helpers, and utilities
9. **Test Data Management**: Centralized test data management
10. **Environment Management**: Programmatic environment switching

## Migration Checklist

- [x] Create environment configurations (UAT, TEST, PROD)
- [x] Map Bruno variables to environment files
- [x] Create service objects for API endpoints
- [x] Implement user management operations
- [x] Create BDD feature files
- [x] Write step definitions
- [x] Configure authentication
- [x] Set up logging
- [x] Configure reporting
- [x] Add environment-specific commands
- [x] Create documentation

## Quick Start Guide

### 1. Setup Environment
```bash
# Copy environment file
copy .env.test .env

# Add your credentials
# Edit .env and add BEARER_TOKEN
```

### 2. Run Tests
```bash
# Run all tests in TEST environment
npm run test:test

# Run smoke tests in UAT
npm run test:uat:tags "@smoke"

# Run Opsera-specific tests
npm run test:tags "@opsera"
```

### 3. View Reports
```bash
# Generate HTML report
npm run report

# Open reports/html/index.html in browser
```

## Support

For detailed setup instructions, see:
- [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) - Environment configuration
- [README.md](README.md) - Complete framework documentation
- [QUICK_START.md](QUICK_START.md) - Getting started guide

---

**Migration Date**: June 20, 2026  
**Source**: Bruno Collection - User Management  
**Framework**: Playwright BDD with Cucumber
