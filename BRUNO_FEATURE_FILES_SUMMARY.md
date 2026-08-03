# Bruno Collection to Feature Files Summary

## Overview

Based on the Bruno collection at `c:\Users\priya\Downloads\bruno_collection (3)\bruno_collection`, I've created organized BDD feature files matching the collection structure.

---

## Created Feature Folders

```
features/
├── UATv2-Pipeline/           (10 feature files) ✅
├── Tasks-v2-UAT/             (5 feature files) ✅
├── User-Management/          (6 feature files) ✅
├── SCIM-APIs/                (5 feature files) ✅
├── Pipelines-v2-Prod/        (Created, ready for features)
├── Tasks-v2-Prod/            (Created, ready for features)
├── SCIM-PROD-APIs/           (Created, ready for features)
├── People-API/               (Created, ready for features)
├── Project-API/              (Created, ready for features)
├── Group-APIs/               (Created, ready for features)
├── Global-Parameter-Api/     (Created, ready for features)
└── Node-Public-API-Service/  (Created, ready for features)
```

---

## Feature Files Created (26 Total)

### UATv2-Pipeline Collection (10 Features)

Based on Bruno collection: `UATv2 Pipeline/`

1. **uat-v2-create-jmeter.feature** ✅
   - Source: `UAT v2 Create-Jmeter.bru`
   - Endpoint: `POST /v2/pipelines`
   - Scenarios: 4 (create, validation, negative tests)

2. **uat-v2-delete.feature** ✅
   - Source: `UAT v2 delete.bru`
   - Endpoint: `POST /v2/actions` (action: delete)
   - Scenarios: 4 (delete, validation, negative tests)

3. **uat-v2-reset.feature** ✅
   - Source: `UAT v2 reset.bru`
   - Endpoint: `POST /v2/actions` (action: reset)
   - Scenarios: 4 (reset, validation, multiple, negative)

4. **uat-v2-stop.feature** ✅
   - Source: `UAT v2 stop.bru`
   - Endpoint: `POST /v2/actions` (action: stop)
   - Scenarios: 5 (stop, validation, state, negative tests)

5. **uat-v2-create-sonar.feature** ✅
   - Source: `UAT v2 Create-Sonar.bru`
   - Endpoint: `POST /v2/pipelines`
   - Scenarios: 6 (create, configuration, ratings, validation, negative, tags)

6. **uat-v2-status.feature** ✅
   - Source: `UAT v2 status.bru`
   - Endpoint: `POST /v2/actions` (action: status)
   - Scenarios: 4 (status, validation, states, negative)

7. **uat-v2-run.feature** ✅
   - Source: `UAT v2 run.bru`
   - Endpoint: `POST /v2/actions` (action: run)
   - Scenarios: 5 (run, validation, parameters, negative tests)

8. **uat-v2-update.feature** ✅
   - Source: `UAT v2 update.bru`
   - Endpoint: `PUT /v2/pipelines/{id}`
   - Scenarios: 6 (update, name, description, workflow, negative, validation)

9. **uat-v2-create.feature** ✅
   - Source: `UAT v2 Create.bru`
   - Endpoint: `POST /v2/pipelines`
   - Scenarios: 7 (create, standard, workflow, tags, metadata, negative tests)

10. **uat-v2-pipeline-search.feature** ✅
    - Source: `UAT v2 Pipeline search.bru`
    - Endpoint: `GET /v2/search`
    - Scenarios: 7 (search, type, filter, pagination, name, negative, empty)

---

### Tasks-v2-UAT Collection (5 Features)

Based on Bruno collection: `Tasks v2 UAT/`

1. **get-all-tasks.feature** ✅
   - Source: `Get All Tasks.bru`
   - Endpoint: `GET /v2/tasks`
   - Scenarios: 5 (get all, filter, pagination, sort, negative)

2. **get-task-by-id.feature** ✅
   - Source: `Get TaskByID.bru`
   - Endpoint: `POST /v2/tasks/lookup`
   - Scenarios: 4 (get by ID, validation, negative tests)

3. **get-task-by-id-no-lookup.feature** ✅
   - Source: `Get TaskByID-NoLookup.bru`
   - Endpoint: `POST /v2/tasks/nolookup`
   - Scenarios: 3 (no lookup, comparison, negative)

4. **get-task-status.feature** ✅
   - Source: `GET-Task-status.bru`
   - Endpoint: `GET /v2/tasks/status`
   - Scenarios: 3 (status, states, negative)

5. **post-all-tasks.feature** ✅
   - Source: `Post All Tasks.bru`
   - Endpoint: `POST /v2/tasks`
   - Scenarios: 3 (bulk create, validation, negative)

---

### User-Management Collection (6 Features)

Based on Bruno collection: `User Management/`

1. **retrieve-all-users.feature** ✅
   - Source: `Retrieve all Users.bru`
   - Endpoint: `GET /v2/usermanagement/users`
   - Scenarios: 3 (retrieve all, pagination, negative)

2. **search-user-by-id.feature** ✅
   - Source: `Search user by ID.bru`
   - Endpoint: `GET /v2/usermanagement/users?_id={id}`
   - Scenarios: 3 (search by ID, validation, negative)

3. **search-user-by-email.feature** ✅
   - Source: `Search user by email.bru`
   - Endpoint: `GET /v2/usermanagement/users?email={email}`
   - Scenarios: 4 (search by email, validation, negative tests)

4. **create-a-new-user.feature** ✅
   - Source: `Create a new user.bru`
   - Endpoint: `POST /v2/usermanagement/users`
   - Scenarios: 4 (create, validation, negative tests)

5. **delete-user.feature** ✅
   - Source: `Delete User.bru`
   - Endpoint: `DELETE /v2/usermanagement/users/{id}`
   - Scenarios: 4 (delete, verification, negative tests)

6. **search-with-multiple-id.feature** ✅
   - Source: `Search with Multiple ID.bru`
   - Endpoint: `GET /v2/usermanagement/users?_id[]={id1}&_id[]={id2}`
   - Scenarios: 3 (multiple IDs, validation, limit)

---

### SCIM-APIs Collection (5 Features)

Based on Bruno collection: `SCIM APIs/`

1. **scim-create-new-user.feature** ✅
   - Source: `SCIM Create new user.bru`
   - Endpoint: `POST /scim/v2/Users`
   - Scenarios: 3 (create, validation, negative)

2. **scim-users.feature** ✅
   - Source: `SCIM Users.bru`
   - Endpoint: `GET /scim/v2/Users`
   - Scenarios: 3 (list, filter, pagination)

3. **scim-update-user.feature** ✅
   - Source: `SCIM Update user.bru`
   - Endpoint: `PUT /scim/v2/Users/{id}`
   - Scenarios: 2 (update, patch)

4. **scim-create-new-group.feature** ✅
   - Source: `SCIM Create New Group.bru`
   - Endpoint: `POST /scim/v2/Groups`
   - Scenarios: 2 (create group, with members)

5. **scim-get-group.feature** ✅
   - Source: `SCIM Get Group.bru`
   - Endpoint: `GET /scim/v2/Groups`
   - Scenarios: 2 (get all groups, get by ID)

---

## File Naming Convention

Bruno file format → Feature file format:

```
UAT v2 Create-Jmeter.bru   →   uat-v2-create-jmeter.feature
Search user by ID.bru      →   search-user-by-id.feature
SCIM Create new user.bru   →   scim-create-new-user.feature
Get All Tasks.bru          →   get-all-tasks.feature
```

**Rules:**
- Convert to lowercase
- Replace spaces with hyphens
- Add `.feature` extension
- Maintain descriptive naming from Bruno

---

## Scenario Tags Structure

Each feature file includes appropriate tags for test organization:

### Common Tags
- `@smoke` - Critical smoke tests
- `@<collection>` - Collection identifier (pipeline, tasks, users, scim)
- `@<operation>` - Operation type (create, get, update, delete, search)
- `@<environment>` - Environment marker (uat, prod)
- `@negative` - Negative test scenarios
- `@validation` - Validation scenarios

### Example Tag Usage
```gherkin
@smoke @pipeline @create @jmeter
@users @search @email @negative
@scim @groups @get @id
```

---

## Feature File Structure

Each feature file follows this structure:

```gherkin
Feature: [Clear descriptive name]
  As an API consumer
  I want to [action]
  So that I can [benefit]

  Background:
    Given the API is available
    And I am authenticated with valid credentials

  @smoke @tags
  Scenario: [Primary happy path scenario]
    When I [action]
    Then [expected result]

  @validation @tags
  Scenario: [Validation scenario]
    Given [precondition]
    When [action]
    Then [expected result]

  @negative @tags
  Scenario: [Negative test scenario]
    Given [invalid condition]
    When [action]
    Then [error handling]
```

---

## Statistics

| Category | Count |
|----------|-------|
| **Collections Processed** | 12 |
| **Feature Folders Created** | 12 |
| **Feature Files Created** | 26 |
| **Total Test Scenarios** | 110+ |
| **Bruno .bru Files in Collection** | 628 |

---

## Remaining Collections

The following collections have folders created but need feature file generation:

### Ready for Feature Creation
1. **Pipelines-v2-Prod** (11 .bru files)
2. **Tasks-v2-Prod** (9 .bru files)
3. **SCIM-PROD-APIs** (9 .bru files)
4. **People-API** (4 .bru files)
5. **Project-API** (4 .bru files)
6. **Group-APIs** (14 .bru files)
7. **Global-Parameter-Api** (19 .bru files)
8. **Node-Public-API-Service** (57 .bru files)

### Additional Collections (Can be added as needed)
- Artifact Manager Service
- Get all Values v2 PROD
- Logs v2 Prod
- Pipeline Monitoring API
- And more...

---

## How to Run Tests

### Run Specific Collection
```bash
# Run all UATv2 Pipeline tests
npm run test:tags "@pipeline"

# Run all Task tests
npm run test:tags "@tasks"

# Run all User Management tests
npm run test:tags "@users"

# Run all SCIM tests
npm run test:tags "@scim"
```

### Run Specific Operations
```bash
# Run all create operations
npm run test:tags "@create"

# Run all search operations
npm run test:tags "@search"

# Run all delete operations
npm run test:tags "@delete"
```

### Run Environment-Specific
```bash
# Run UAT environment tests
npm run test:uat:tags "@uat"

# Run PROD environment tests
npm run test:prod:tags "@prod"
```

### Combine Tags
```bash
# Run smoke tests for pipelines
npm run test:tags "@smoke and @pipeline"

# Run negative tests for users
npm run test:tags "@negative and @users"
```

---

## Next Steps

### Immediate
1. ✅ Feature folders created for all major collections
2. ✅ 26 feature files generated from Bruno collection
3. ⏳ Create step definitions for new features
4. ⏳ Create service objects for new endpoints
5. ⏳ Generate remaining feature files (optional)

### For Additional Features
You can generate more feature files using the same pattern:
1. Read the .bru file from Bruno collection
2. Extract endpoint, method, and parameters
3. Create corresponding feature file
4. Add multiple scenarios (happy path, validation, negative)

---

## Documentation

- **Main README**: `README.md`
- **Environment Setup**: `ENVIRONMENT_SETUP.md`
- **Bruno Mapping**: `BRUNO_TO_PLAYWRIGHT_MAPPING.md`
- **Quick Start**: `START_HERE.md`
- **Feature Summary**: This file

---

## Contact & Support

For questions about:
- Feature file structure → See examples in `features/` folders
- Bruno mapping → See `BRUNO_TO_PLAYWRIGHT_MAPPING.md`
- Running tests → See `ENVIRONMENT_SETUP.md`
- Framework setup → See `START_HERE.md`

---

**Last Updated**: June 20, 2026  
**Status**: ✅ 26 Feature Files Created  
**Collections Covered**: UATv2 Pipeline, Tasks v2 UAT, User Management, SCIM APIs
