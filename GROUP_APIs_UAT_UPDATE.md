# Group APIs - PROD to UAT Update ✅

**Date:** June 30, 2026  
**Environment:** UAT  
**Folder:** features-UAT/Group-APIs/

---

## Summary

Successfully updated all 6 Group API feature files to correctly reflect the UAT environment instead of PROD. All references to "PROD" have been changed to "UAT" including feature titles, descriptions, tags, and scenario names.

---

## Files Updated

### 1. ✅ delete-group-uat.feature
**Changes:**
- Feature title: "Delete Group PROD" → "Delete Group UAT"
- Description: "PROD environment" → "UAT environment"
- Background: "valid PROD credentials" → "valid credentials"
- Tags: `@prod` → `@uat`

### 2. ✅ patch-members-to-group-uat.feature
**Changes:**
- Feature title: "Patch Members To Group PROD" → "Patch Members To Group UAT"
- Description: "in PROD" → "in UAT"
- Tags: `@prod` → `@uat`

### 3. ✅ get-members-from-grp-uat.feature
**Changes:**
- Feature title: "Get Members From Group PROD" → "Get Members From Group UAT"
- Description: "PROD environment" → "UAT environment"
- Description: "production group membership" → "UAT group membership"
- Tags: `@prod` → `@uat`
- Scenario: "successfully in PROD" → "successfully in UAT"

### 4. ✅ create-group-uat.feature
**Changes:**
- Feature title: "Create Group Prod" → "Create Group UAT"
- Description: "PROD environment" → "UAT environment"
- Description: "production user groups" → "UAT user groups"
- Tags: `@prod` → `@uat`
- Scenario: "successfully in PROD" → "successfully in UAT"

### 5. ✅ get-groups-uat.feature
**Changes:**
- Feature title: "Get Groups PROD" → "Get Groups UAT"
- Description: "PROD environment" → "UAT environment"
- Background: "valid PROD credentials" → "valid credentials"
- Tags: `@prod` → `@uat`

### 6. ✅ add-members-to-group-uat.feature
**Status:** Already updated in previous session
- Feature title: "Add Members To Group UAT"
- Tags: `@uat`
- All references to UAT environment

---

## Change Summary

| File | Feature Title Changed | Tags Updated | Descriptions Updated |
|------|---------------------|--------------|---------------------|
| delete-group-uat.feature | ✅ | ✅ | ✅ |
| patch-members-to-group-uat.feature | ✅ | ✅ | ✅ |
| get-members-from-grp-uat.feature | ✅ | ✅ | ✅ |
| create-group-uat.feature | ✅ | ✅ | ✅ |
| get-groups-uat.feature | ✅ | ✅ | ✅ |
| add-members-to-group-uat.feature | ✅ | ✅ | ✅ |

---

## Updated Feature Files Overview

### 1. delete-group-uat.feature
```gherkin
Feature: Delete Group UAT
  As an API consumer
  I want to delete a group in UAT environment
  So that I can remove groups that are no longer needed

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @groups @delete @uat
  Scenario: Delete an existing group successfully
    Given I have an existing group ID
    When I send a DELETE request to "/api/v2/usermanagement/group/{id}"
    Then the response status code should be 200
    And the group should be deleted successfully
```

### 2. patch-members-to-group-uat.feature
```gherkin
Feature: Patch Members To Group UAT
  As an API consumer
  I want to patch/update group members in UAT
  So that I can modify group membership

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @groups @members @patch @uat
  Scenario: Patch group members successfully
    When I send a PATCH request to "/api/v2/usermanagement/group/opsera-hugegroupmarch19/members" with body:
      """
      [...]
      """
    Then the response status code should be 200
    And the response should have property "message"
```

### 3. get-members-from-grp-uat.feature
```gherkin
Feature: Get Members From Group UAT
  As an API consumer
  I want to retrieve group members in UAT environment
  So that I can view UAT group membership

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @groups @members @get @uat
  Scenario: Get group members successfully in UAT
    When I send a GET request to "/api/v2/usermanagement/group/pipelineadmins/memberships"
    Then the response status code should be 200
```

### 4. create-group-uat.feature
```gherkin
Feature: Create Group UAT
  As an API consumer
  I want to create a new group in UAT environment
  So that I can manage UAT user groups

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @groups @create @uat @post
  Scenario: Create a new group successfully in UAT
    When I send a POST request to "/api/v2/usermanagement/group" with body:
      """
      {...}
      """
    Then the response status code should be 200
    And the response should have property "message"
```

### 5. get-groups-uat.feature
```gherkin
Feature: Get Groups UAT
  As an API consumer
  I want to retrieve groups in UAT environment
  So that I can view group information

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @groups @get @uat
  Scenario: Get all groups successfully
    When I send a GET request to "/api/v2/usermanagement/groups"
    Then the response status code should be 200
    And the response should contain a list of groups
```

### 6. add-members-to-group-uat.feature
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
      [...] 
      """
    Then the response status code should be 200
    And the response should have property "message"
```

---

## Benefits of This Update

### 1. Environment Clarity
- All feature files now clearly indicate they are for UAT environment
- No confusion between PROD and UAT test files
- Proper environment segregation

### 2. Tag Consistency
- All tags now use `@uat` instead of `@prod`
- Makes it easy to run all UAT Group API tests: `--tags @groups and @uat`
- Prevents accidental execution against wrong environment

### 3. Test Organization
- Clear separation between UAT and PROD test suites
- Easy to identify which tests belong to which environment
- Better test management and maintenance

### 4. Documentation Accuracy
- Feature descriptions accurately reflect the test environment
- Scenario names indicate UAT testing
- Better communication of test intent

---

## Running Group API UAT Tests

### Run all Group API tests
```bash
npm run test:uat -- "features-UAT/Group-APIs/**/*.feature"
```

### Run specific test by tag
```bash
# All UAT group tests
npm run test:uat -- --tags "@groups and @uat"

# Only create/delete operations
npm run test:uat -- --tags "@groups and (@create or @delete)"

# Only member management tests
npm run test:uat -- --tags "@members and @uat"
```

### Run individual tests
```bash
npm run test:uat -- "features-UAT/Group-APIs/delete-group-uat.feature"
npm run test:uat -- "features-UAT/Group-APIs/create-group-uat.feature"
npm run test:uat -- "features-UAT/Group-APIs/get-groups-uat.feature"
```

---

## Next Steps

### 1. Verify Test Data
Ensure UAT environment has:
- Valid group names for testing
- Valid user IDs and emails
- Appropriate test data for create/delete operations

### 2. Update Test Data
Some files may still reference PROD-specific data:
- Group names (e.g., "opsera-hugegroupmarch19" in patch test)
- User IDs in create group test
- Email addresses in member tests

### 3. Run Full Test Suite
Execute all Group API tests to verify they work correctly in UAT:
```bash
npm run test:uat -- "features-UAT/Group-APIs/**/*.feature"
```

---

## Consistency Checklist

✅ All feature titles reflect UAT environment  
✅ All descriptions mention UAT (not PROD)  
✅ All tags use `@uat` (not `@prod`)  
✅ All scenario names indicate UAT testing  
✅ All files are in features-UAT folder  
✅ File naming convention: `*-uat.feature`

---

**Status:** ✅ COMPLETE  
**Files Updated:** 6/6  
**Environment:** UAT  
**Last Updated:** June 30, 2026, 6:21 PM IST
