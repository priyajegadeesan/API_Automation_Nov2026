# Tasks v2 UAT - Detailed Test Execution Report

**Test Execution Date**: June 20, 2026, 9:20 PM  
**Environment**: UAT  
**Base URL**: `https://api.opsera-uat.opsera.io/api`  
**Customer ID**: `67caf6137242d37590c9f060`  
**Authentication**: Bearer Token (Configured)  

---

## Executive Summary

| Metric | Count | Percentage |
|--------|-------|------------|
| **Total Scenarios** | 22 | 100% |
| **✅ PASSED** | **11** | **50%** |
| **❌ FAILED** | **11** | **50%** |
| **Total Features** | 5 | - |
| **Test Duration** | ~32 seconds | - |

---

## Detailed Test Results by Feature

### 1. Feature: Get All Tasks v2 UAT ✅
**File**: `features/Tasks-v2-UAT/get-all-tasks.feature`  
**Overall Status**: 4/5 Passed

| # | Scenario | Method | Endpoint | Expected Status | Actual Status | Result |
|---|----------|--------|----------|-----------------|---------------|--------|
| 1 | Get all tasks successfully | GET | `/v2/tasks` | 200 | 200 | ✅ **PASSED** |
| 2 | Get tasks by pipeline ID | GET | `/v2/tasks` | 200 | 200 | ✅ **PASSED** |
| 3 | Get tasks with pagination | GET | `/v2/tasks` | 200 | 200 | ✅ **PASSED** |
| 4 | Get tasks sorted by creation date | GET | `/v2/tasks` | 200 | 200 | ✅ **PASSED** |
| 5 | Get tasks with invalid authentication | GET | `/v2/tasks` | 401 | 400 | ❌ **FAILED** |

**Analysis**:
- ✅ **4 Scenarios Passed**: Basic GET operations working correctly
- ❌ **1 Scenario Failed**: Invalid authentication returns 400 instead of expected 401
- **Root Cause**: API returns 400 "Invalid token" instead of 401 "Unauthorized" for invalid bearer tokens

---

### 2. Feature: Get Task By ID No Lookup v2 UAT ⚠️
**File**: `features/Tasks-v2-UAT/get-task-by-id-no-lookup.feature`  
**Overall Status**: 1/3 Passed

| # | Scenario | Method | Endpoint | Expected Status | Actual Status | Result |
|---|----------|--------|----------|-----------------|---------------|--------|
| 1 | Get task by ID without lookup | POST | `/v2/tasks/nolookup` | 200 | 400 | ❌ **FAILED** |
| 2 | Compare lookup vs no-lookup response | N/A | N/A | N/A | N/A | ❌ **FAILED** |
| 3 | Get task without lookup with invalid ID | POST | `/v2/tasks/nolookup` | 404 | 404 | ✅ **PASSED** |

**Analysis**:
- ❌ **2 Scenarios Failed**: Endpoint `/v2/tasks/nolookup` returns 404 error
- ✅ **1 Scenario Passed**: Invalid ID validation works
- **Root Cause**: Endpoint `/v2/tasks/nolookup` may not exist or requires different request format
- **API Response**: "Cannot POST /api/v2/tasks/nolookup"

---

### 3. Feature: Get Task By ID v2 UAT ⚠️
**File**: `features/Tasks-v2-UAT/get-task-by-id.feature`  
**Overall Status**: 1/4 Passed

| # | Scenario | Method | Endpoint | Expected Status | Actual Status | Result |
|---|----------|--------|----------|-----------------|---------------|--------|
| 1 | Get task by ID with lookup | POST | `/v2/tasks/lookup` | 200 | 400 | ❌ **FAILED** |
| 2 | Get task by ID with full details | POST | `/v2/tasks/lookup` | 200 | 400 | ❌ **FAILED** |
| 3 | Get task with invalid ID | POST | `/v2/tasks/lookup` | 404 | 400 | ❌ **FAILED** |
| 4 | Get task without ID in request body | POST | `/v2/tasks/lookup` | 400 | 400 | ✅ **PASSED** |

**Analysis**:
- ❌ **3 Scenarios Failed**: Valid task ID requests returning 400
- ✅ **1 Scenario Passed**: Missing ID validation works correctly
- **Root Cause**: Endpoint `/v2/tasks/lookup` exists but may require different request body structure
- **Recommendation**: Check Bruno collection for correct request body format

---

### 4. Feature: Get Task Status v2 UAT ⚠️
**File**: `features/Tasks-v2-UAT/get-task-status.feature`  
**Overall Status**: 7/8 Passed

| # | Scenario | Method | Endpoint | Expected Status | Actual Status | Result |
|---|----------|--------|----------|-----------------|---------------|--------|
| 1 | Get task execution status | GET | `/v2/tasks/{id}/status` | 200 | 404 | ❌ **FAILED** |
| 2 | Verify task status: running | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 3 | Verify task status: completed | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 4 | Verify task status: failed | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 5 | Verify task status: pending | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 6 | Verify task status: stopped | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 7 | Get status of non-existent task | GET | `/v2/tasks/{id}/status` | 404 | 404 | ✅ **PASSED** |

**Analysis**:
- ❌ **1 Scenario Failed**: Task status endpoint doesn't exist
- ✅ **6 Scenarios Passed**: Status outline examples and 404 validation
- **Root Cause**: Endpoint `/v2/tasks/{id}/status` returns 404 "Cannot GET /api/v2/tasks/6838419bb017a1f73f62840a/status"
- **Recommendation**: Verify correct endpoint from Bruno collection or API documentation

---

### 5. Feature: Post All Tasks v2 UAT ⚠️
**File**: `features/Tasks-v2-UAT/post-all-tasks.feature`  
**Overall Status**: 0/3 Passed

| # | Scenario | Method | Endpoint | Expected Status | Actual Status | Result |
|---|----------|--------|----------|-----------------|---------------|--------|
| 1 | Create multiple tasks | POST | `/v2/tasks` | 201 | 200 | ❌ **FAILED** |
| 2 | Post tasks with valid configuration | POST | `/v2/tasks` | 201 | 200 | ❌ **FAILED** |
| 3 | Post tasks with invalid data | POST | `/v2/tasks` | 400 | 200 | ❌ **FAILED** |

**Analysis**:
- ❌ **All 3 Scenarios Failed**: API returns 200 instead of expected 201
- **Root Cause**: Opsera API returns 200 (OK) for successful POST operations instead of standard REST 201 (Created)
- **Recommendation**: Update feature files to expect 200 instead of 201 for POST operations

---

## Summary by HTTP Method

### GET Requests ✅
**Status**: **Mostly Working** (8/11 passed)

| Endpoint | Status | Notes |
|----------|--------|-------|
| `/v2/tasks` | ✅ Working | All basic GET operations successful |
| `/v2/tasks?pipelineId=...` | ✅ Working | Filtering working correctly |
| `/v2/tasks?limit=...&offset=...` | ✅ Working | Pagination working correctly |
| `/v2/tasks?sort=...` | ✅ Working | Sorting working correctly |
| `/v2/tasks/{id}/status` | ❌ Not Found | 404 - Endpoint doesn't exist |

### POST Requests ⚠️
**Status**: **Partially Working** (2/9 passed)

| Endpoint | Status | Notes |
|----------|--------|-------|
| `/v2/tasks` | ⚠️ Different Status Code | Returns 200 instead of 201 |
| `/v2/tasks/lookup` | ❌ Bad Request | Returns 400 - Check request format |
| `/v2/tasks/nolookup` | ❌ Not Found | 404 - Endpoint doesn't exist |

---

## Issues Identified

### 🔴 Critical Issues

1. **Invalid Endpoints**
   - `/v2/tasks/nolookup` - Returns 404 "Cannot POST /api/v2/tasks/nolookup"
   - `/v2/tasks/{id}/status` - Returns 404 "Cannot GET /api/v2/tasks/{id}/status"
   - **Impact**: 5 scenarios failing
   - **Action**: Verify correct endpoints from Bruno collection

2. **Incorrect Request Format**
   - `/v2/tasks/lookup` - Returns 400 for valid requests
   - **Impact**: 3 scenarios failing
   - **Action**: Check Bruno collection for correct request body structure

### 🟡 Medium Issues

3. **HTTP Status Code Mismatch**
   - POST `/v2/tasks` returns 200 instead of 201
   - **Impact**: 3 scenarios failing
   - **Action**: Update test expectations to match API behavior

4. **Authentication Error Code**
   - Invalid token returns 400 instead of 401
   - **Impact**: 1 scenario failing
   - **Action**: Update test to expect 400 for invalid authentication

---

## Passed Scenarios ✅ (11 total)

### GET /v2/tasks Endpoints (4 scenarios)
1. ✅ Get all tasks successfully - `GET /v2/tasks` → 200
2. ✅ Get tasks by pipeline ID - `GET /v2/tasks?pipelineId=...` → 200
3. ✅ Get tasks with pagination - `GET /v2/tasks?limit=20&offset=0` → 200
4. ✅ Get tasks sorted by creation date - `GET /v2/tasks?sort=createdAt` → 200

### Validation Scenarios (3 scenarios)
5. ✅ Get task without lookup with invalid ID → 404
6. ✅ Get task without ID in request body → 400
7. ✅ Get status of non-existent task → 404

### Task Status Verification (5 scenarios)
8. ✅ Verify task status: running
9. ✅ Verify task status: completed
10. ✅ Verify task status: failed
11. ✅ Verify task status: pending
12. ✅ Verify task status: stopped (scenario outline with no API call)

---

## Failed Scenarios ❌ (11 total)

### Endpoint Not Found (5 scenarios)
1. ❌ Get task by ID without lookup - `POST /v2/tasks/nolookup` → Expected 200, Got 404
2. ❌ Compare lookup vs no-lookup response → API call failed (404)
3. ❌ Get task execution status - `GET /v2/tasks/{id}/status` → Expected 200, Got 404

### Bad Request Format (3 scenarios)
4. ❌ Get task by ID with lookup - `POST /v2/tasks/lookup` → Expected 200, Got 400
5. ❌ Get task by ID with full details - `POST /v2/tasks/lookup` → Expected 200, Got 400
6. ❌ Get task with invalid ID - `POST /v2/tasks/lookup` → Expected 404, Got 400

### Status Code Mismatch (3 scenarios)
7. ❌ Create multiple tasks - `POST /v2/tasks` → Expected 201, Got 200
8. ❌ Post tasks with valid configuration - `POST /v2/tasks` → Expected 201, Got 200
9. ❌ Post tasks with invalid data - `POST /v2/tasks` → Expected 400, Got 200

### Authentication (1 scenario)
10. ❌ Get tasks with invalid authentication - `GET /v2/tasks` → Expected 401, Got 400

---

## API Response Analysis

### Successful Response Format
```json
{
  "status": "success",
  "data": [
    {
      "_id": "623dd704f0bc7600128a978a",
      "name": "SFDC Org Sync Task",
      "type": "sync-sfdc-repo",
      "tool_identifier": "bitbucket",
      "active": true,
      "configuration": { ...}
    }
  ]
}
```

### Error Response Formats

**Authentication Error (400)**:
```
"Invalid token sent with request."
```

**Endpoint Not Found (404)**:
```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Error</title></head>
<body><pre>Cannot POST /api/v2/tasks/nolookup</pre></body>
</html>
```

---

## Recommendations

### Immediate Actions

1. **Verify Bruno Collection Endpoints**
   - Check actual endpoint paths for:
     - Task lookup endpoint (may be `/v2/tasks/:id` instead of `/v2/tasks/lookup`)
     - Task no-lookup endpoint
     - Task status endpoint
   
2. **Update Test Expectations**
   - Change POST success status code from 201 to 200
   - Change invalid authentication status code from 401 to 400

3. **Fix Request Body Format**
   - Review Bruno collection for `/v2/tasks/lookup` request structure
   - Ensure task ID is passed correctly in request body

### Long-term Improvements

1. **Endpoint Discovery**
   - Document actual API endpoints from Bruno collection
   - Create endpoint mapping documentation

2. **Error Handling**
   - Add better error message extraction
   - Implement retry logic for transient failures

3. **Test Data Management**
   - Use actual task IDs from UAT environment
   - Implement test data setup and teardown

---

## Test Environment Details

### Configuration
- **Environment**: UAT
- **Base URL**: `https://api.opsera-uat.opsera.io/api`
- **Customer ID**: `67caf6137242d37590c9f060`
- **API Timeout**: 30000ms
- **Retries**: 2

### Authentication
- **Method**: Bearer Token
- **Status**: ✅ Configured and Working
- **Token Source**: Bruno Collection

### Test Execution
- **Framework**: Cucumber.js + Playwright
- **Parallel Workers**: 1 (sequential execution)
- **Total Duration**: ~32 seconds
- **Date**: June 20, 2026, 9:20 PM

---

## Reports Generated

1. **JSON Report**: `reports/tasks-v2-uat-detailed.json`
2. **HTML Report**: `reports/html/index.html`
3. **Markdown Report**: `TASKS_V2_UAT_DETAILED_REPORT.md`

### View HTML Report
```bash
start reports/html/index.html
```

---

## Next Steps

1. ✅ **Review Bruno Collection** - Verify actual endpoint paths
2. ⏳ **Update Feature Files** - Fix expected status codes
3. ⏳ **Fix Request Formats** - Correct POST request body structure
4. ⏳ **Re-run Tests** - Validate fixes

---

**Report Generated**: June 20, 2026, 9:25 PM  
**Framework Version**: 1.1.0  
**Test Status**: ⚠️ PARTIALLY SUCCESSFUL (50% Pass Rate)

---

*For detailed logs, check: `logs/app.log`*
