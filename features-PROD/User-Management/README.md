# User Management Test Features

## Overview
This directory contains BDD feature files for testing user management operations in the PROD environment.

## Features

### 1. Create and Delete User (Recommended)
**File:** `create-and-delete-user.feature`

This is the **recommended approach** for testing user lifecycle. It creates a new test user and immediately deletes it in a single scenario, ensuring:
- No leftover test data in the system
- No impact on existing active users
- Complete test isolation

**How it works:**
1. Creates a user with a unique timestamp-based email (e.g., `testuser_1234567890@opsera.test`)
2. Captures the user ID from the creation response
3. Uses that same user ID to delete the user
4. Verifies both operations succeed

**Usage:**
```bash
npx cucumber-js features-PROD/User-Management/create-and-delete-user.feature
```

### 2. Create a New User
**File:** `create-a-new-user.feature`

Creates a new test user with auto-generated unique email address. The user ID is automatically stored for use in subsequent tests.

**User Data Format:**
```json
{
  "email": "testuser_<timestamp>@opsera.test",
  "firstName": "TestUser",
  "lastName": "<timestamp>",
  "organizationName": "Opsera Test"
}
```

### 3. Delete User
**File:** `delete-user.feature`

Deletes the user created in the previous test. This test depends on `create-a-new-user.feature` to run first, as it uses the stored user ID.

**Dependencies:**
- Must run after `create-a-new-user.feature`
- Uses the user ID stored from the creation response

## Running Tests

### Run Individual Tests
```bash
# Create user only
npx cucumber-js features-PROD/User-Management/create-a-new-user.feature

# Delete created user (must run after create)
npx cucumber-js features-PROD/User-Management/delete-user.feature
```

### Run Complete User Lifecycle (Recommended)
```bash
# Create and delete in one test
npx cucumber-js features-PROD/User-Management/create-and-delete-user.feature
```

### Run All User Management Tests
```bash
npx cucumber-js features-PROD/User-Management/
```

## Implementation Details

### Step Definitions
The following custom steps are implemented in `src/steps/genericApiSteps.ts`:

1. **Create User with Auto-generated Data:**
   ```gherkin
   When I send a POST request to "/api/v2/usermanagement/user" with user details
   ```
   - Generates unique email using timestamp
   - Stores user ID in test context for later use

2. **Delete Created User:**
   ```gherkin
   When I send a DELETE request to delete the created user
   ```
   - Retrieves stored user ID from test context
   - Deletes the user
   - Clears the stored user ID on success

### Data Storage
User IDs are stored in the test context (`this.testData`) with the key `createdUserId` and are automatically cleaned up after successful deletion.

## Best Practices

✅ **DO:**
- Use `create-and-delete-user.feature` for complete lifecycle testing
- Let the framework generate unique user emails automatically
- Run tests in isolation to avoid dependencies

❌ **DON'T:**
- Hardcode user IDs in delete operations
- Rely on manual cleanup of test users
- Use production user emails in test data

## Tags

- `@user` - All user management tests
- `@create` - User creation tests
- `@delete` - User deletion tests
- `@create-delete` - Combined create and delete tests
- `@prod` - PROD environment specific
- `@cleanup` - Tests that clean up after themselves
- `@depends-on-create` - Tests that require a user to be created first
