# Group APIs - Add Members Fix ✅

**Date:** June 30, 2026  
**Environment:** UAT  
**File:** `add-members-to-group-uat.feature`

---

## Summary

Successfully fixed the Group APIs test file to align with the UAT environment and working Bruno request.

---

## Test Result

**Status:** ✅ PASSING

```
1 scenario (1 passed)
5 steps (5 passed)
Execution Time: 5.770 seconds
Pass Rate: 100%
```

---

## Changes Made

### 1. Updated Feature Title and Description
**Before:** "Add Members To Group PROD" / "production group membership"  
**After:** "Add Members To Group UAT" / "UAT group membership"  
**Reason:** File is in UAT folder and should reflect UAT environment

### 2. Updated Tags
**Before:** `@groups @members @add @prod @post`  
**After:** `@groups @members @add @uat @post`  
**Reason:** Changed `@prod` to `@uat` to match environment

### 3. Updated Scenario Name
**Before:** "Add members to PROD group successfully"  
**After:** "Add members to UAT group successfully"  
**Reason:** Consistency with UAT environment

### 4. Updated Group Name in URL
**Before:** `/api/v2/usermanagement/group/qa-team-jan24/members`  
**After:** `/api/v2/usermanagement/group/test/members`  
**Reason:** Aligned with Bruno working request showing group name "test"

### 5. Updated Email Addresses in Request Body
**Before:**
```json
[
  "priya3110@protonmail.com",
  "qaprod@protonmail.com"
]
```

**After:**
```json
[
  "keerthiga@opsera.us",
  "pradeep.marri@opsera.us"
]
```
**Reason:** Aligned with Bruno working request showing valid UAT user emails

---

## Final Test File

```gherkin
Feature: Add Members To Group UAT
  As an API consumer
  I want to add members to a group in UAT environment
  So that I can manage UAT group membership

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @groups @members @add @uat @post
  Scenario: Add members to UAT group successfully
    When I send a POST request to "/api/v2/usermanagement/group/test/members" with body:
      """
      [
        "keerthiga@opsera.us",
        "pradeep.marri@opsera.us"
      ]
      """
    Then the response status code should be 200
    And the response should have property "message"
```

---

## API Endpoint Details

- **Method:** POST
- **URL:** `/api/v2/usermanagement/group/test/members`
- **Group Name:** `test`
- **Request Body:** Array of email addresses
- **Expected Response:** 200 OK with message property
- **Response Message:** "Group membership replacement completed successfully"

---

## Request/Response Format

### Request
```json
[
  "keerthiga@opsera.us",
  "pradeep.marri@opsera.us"
]
```

### Response (200 OK)
```json
{
  "message": "Group membership replacement completed successfully",
  "result": {
    "_id": "69a7f49715caf7dadb901713",
    "name": "test",
    "description": "",
    "type": "user",
    "owner": "653b5e3d8853abN01653e529",
    "members": [
      "67cef33724d3759bc9f0604",
      "62f373ddebd8a9c003924be86"
    ],
    "roles": [],
    "createdAt": "2026-03-03T00:07:0492",
    "updatedAt": "2026-06-30T12:41:55.2127",
    "__v": 0
  },
  "replacedMembers": [
    "keerthiga@opsera.us",
    "pradeep.marri@opsera.us"
  ]
}
```

---

## Bruno Alignment

✅ Test now matches the working Bruno request:
- **URL:** `{{host}}/v2/usermanagement/group/test/members`
- **Method:** POST
- **Body:** Array with valid UAT user emails
- **Status:** 200 OK
- **Response:** Contains "message" property

---

## Key Learnings

### 1. Environment Consistency
- Feature files should reflect the environment they test (UAT vs PROD)
- Tags should match the environment (`@uat` not `@prod`)
- Group names and user emails must exist in the target environment

### 2. Group Membership API
- Endpoint format: `/v2/usermanagement/group/{groupName}/members`
- POST method replaces group membership (not just adds)
- Request body is an array of email addresses
- Response confirms replacement with updated member IDs

### 3. Test Data Management
- Use valid user emails that exist in UAT environment
- Use valid group names that exist in UAT environment
- Verify test data availability before running tests

---

## Related Group API Tests

Other Group API test files in the UAT folder:

| Test File | Purpose |
|-----------|---------|
| `add-members-to-group-uat.feature` | Add/replace members ✅ |
| `patch-members-to-group-uat.feature` | Partial member updates |
| `get-members-from-grp-uat.feature` | Retrieve group members |
| `create-group-uat.feature` | Create new groups |
| `get-groups-uat.feature` | List all groups |
| `delete-group-uat.feature` | Delete groups |

---

## Recommendations

### 1. Verify Test Data
Before running Group API tests, ensure:
- The group "test" exists in UAT
- User emails are valid UAT users
- Users have appropriate permissions

### 2. Test Idempotency
- The POST members endpoint replaces (not adds) members
- Running the test multiple times will have the same result
- Consider cleanup/teardown if test data should be reset

### 3. Additional Validations
Consider adding tests for:
- Invalid group names
- Invalid email addresses
- Empty member arrays
- Duplicate emails in request

---

**Status:** ✅ COMPLETE  
**Last Updated:** June 30, 2026, 6:13 PM IST  
**Execution Environment:** UAT
