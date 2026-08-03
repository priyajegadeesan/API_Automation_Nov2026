# User Management - Search with ID in Link Fix ✅

**Date:** June 30, 2026  
**Environment:** UAT  
**File:** `search-with-id-in-link.feature`

---

## Summary

Successfully fixed the User Management search-with-id-in-link test file to use a valid UAT user ID and added proper response validation.

---

## Test Result

**Status:** ✅ PASSING

```
1 scenario (1 passed)
5 steps (5 passed)
Execution Time: 5.668 seconds
Pass Rate: 100%
```

---

## Changes Made

### 1. Replaced Placeholder with Actual User ID
**Before:** `/api/v2/usermanagement/user/{userId}`  
**After:** `/api/v2/usermanagement/user/69a7c9e938e63d6398332743`  
**Reason:** Replaced dynamic placeholder with valid UAT user ID from Bruno

### 2. Added Response Validation
**Before:** Only checked status code 200  
**After:** Also validates response has `"_id"` property  
**Reason:** Ensures the API returns the expected user object structure

---

## Final Test File

```gherkin
Feature: Search User with ID in Link
  As an API consumer
  I want to search for a user using ID directly in the URL path

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @user @search @uat
  Scenario: Search for user with ID in URL path
    When I send a GET request to "/api/v2/usermanagement/user/69a7c9e938e63d6398332743"
    Then the response status code should be 200
    And the response should have property "_id"
```

---

## API Endpoint Details

- **Method:** GET
- **URL:** `/api/v2/usermanagement/user/69a7c9e938e63d6398332743`
- **User ID:** `69a7c9e938e63d6398332743`
- **Expected Response:** 200 OK with user object
- **Response Format:** JSON object with user details

---

## Response Structure

### Sample Response (200 OK)
```json
{
  "_id": "69a7c9e938e63d6398332743",
  "FirstName": "Testing",
  "lastName": "Users",
  "email": "createuserfeb64@opsera.us",
  "ssoSystem": "okta",
  "applications": [],
  "tools": [],
  "attributes": {
    "title": "",
    "company": "org104d-acc0"
  },
  "configuration": {
    "cloudProvider": "EKS",
    "cloudProviderRegion": "us-east-2"
  },
  "active": false,
  "tenant": "61ab3a605feaee00118c4024",
  "account": "org104d-acc0",
  "domain": "opsera-us",
  "expirationDateTime": "2026-04-19T00:00:00.000Z"
}
```

---

## Bruno Alignment

✅ Test now matches the working Bruno request:
- **URL:** `{{host}}/v2/usermanagement/user/69a7c9e938e63d6398332743`
- **Method:** GET
- **Status:** 200 OK
- **Response:** Contains user object with `_id` property

---

## Key Properties in Response

| Property | Type | Description |
|----------|------|-------------|
| `_id` | String | Unique user identifier |
| `FirstName` | String | User's first name |
| `lastName` | String | User's last name |
| `email` | String | User's email address |
| `ssoSystem` | String | SSO system (e.g., "okta") |
| `applications` | Array | User's applications |
| `tools` | Array | User's tools |
| `attributes` | Object | User attributes (title, company) |
| `configuration` | Object | Cloud configuration |
| `active` | Boolean | User active status |
| `tenant` | String | Tenant ID |
| `account` | String | Account name |
| `domain` | String | Domain name |
| `expirationDateTime` | String | Account expiration date |

---

## Use Cases

### 1. Direct User Lookup
- Retrieve user details by ID
- Fastest way to get user information
- No search query needed

### 2. User Profile Retrieval
- Get complete user profile
- Access user configuration
- Check user status (active/inactive)

### 3. Integration Testing
- Verify user exists in system
- Validate user data structure
- Test user management endpoints

---

## Related User Management Tests

Other User Management test files:

| Test File | Purpose | Status |
|-----------|---------|--------|
| `search-with-id-in-link.feature` | Get user by ID in URL | ✅ PASS |
| `search-user-by-email.feature` | Search by email | ⏳ Pending |
| `search-user-by-id.feature` | Search by ID (query param) | ⏳ Pending |
| `search-with-multiple-id.feature` | Search multiple users | ⏳ Pending |
| `create-a-new-user.feature` | Create new user | ⏳ Pending |
| `delete-user.feature` | Delete user | ⏳ Pending |
| `retrieve-all-users.feature` | List all users | ⏳ Pending |
| `new-email.feature` | Email operations | ⏳ Pending |

---

## Running the Test

### Run this test individually
```bash
npm run test:uat -- "features-UAT/User-Management/search-with-id-in-link.feature"
```

### Run all user search tests
```bash
npm run test:uat -- --tags "@user and @search"
```

### Run all User Management tests
```bash
npm run test:uat -- "features-UAT/User-Management/**/*.feature"
```

---

## Test Data Notes

### Valid UAT User
- **User ID:** `69a7c9e938e63d6398332743`
- **Email:** `createuserfeb64@opsera.us`
- **First Name:** Testing
- **Last Name:** Users
- **Status:** Exists in UAT environment

### URL Pattern
- Direct user lookup: `/v2/usermanagement/user/{userId}`
- No query parameters needed
- ID in path (not query string)

---

## Comparison with Other Search Methods

### 1. ID in URL Path (This Test)
```
GET /v2/usermanagement/user/{userId}
✅ Fastest, most direct
✅ RESTful pattern
```

### 2. ID as Query Parameter
```
GET /v2/usermanagement/user?id={userId}
⚠️ Less RESTful
⚠️ Slightly slower
```

### 3. Email Search
```
GET /v2/usermanagement/user?email={email}
⚠️ Search-based
⚠️ May return multiple results
```

---

## Recommendations

### 1. Use Valid Test Data
- Ensure the user ID exists in UAT
- Verify user hasn't been deleted
- Update ID if UAT environment is refreshed

### 2. Additional Validations
Consider adding more validations:
- Verify specific user email
- Check user active status
- Validate tenant/account values
- Verify configuration properties

### 3. Error Cases
Consider adding negative test cases:
- Non-existent user ID (404)
- Invalid user ID format (400)
- Unauthorized access (403)
- Expired/deleted user

### 4. Test Data Management
- Maintain list of valid UAT user IDs
- Document user purpose (test user vs real data)
- Consider creating dedicated test users

---

## Benefits of This Update

### 1. Working Test
- Uses valid UAT user ID
- Test consistently passes
- Matches working Bruno request

### 2. Proper Validation
- Validates response structure
- Confirms user data returned
- Ensures API contract

### 3. Clear Intent
- URL shows exact user being retrieved
- No ambiguity about test data
- Easy to debug and maintain

---

**Status:** ✅ COMPLETE  
**Last Updated:** June 30, 2026, 6:56 PM IST  
**Execution Environment:** UAT  
**Test aligned with Bruno:** Yes
