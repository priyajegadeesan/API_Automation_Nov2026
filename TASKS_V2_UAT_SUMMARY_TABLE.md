# Tasks v2 UAT - Test Summary Table

**Test Date**: June 20, 2026, 9:20 PM | **Environment**: UAT | **Total**: 22 scenarios | **✅ Passed**: 11 (50%) | **❌ Failed**: 11 (50%)

---

## Complete Test Results

| # | Feature | Scenario | Method | Endpoint | Expected Status | Actual Status | Result |
|---|---------|----------|--------|----------|-----------------|---------------|--------|
| 1 | Get All Tasks v2 UAT | Get all tasks successfully | GET | `/v2/tasks` | 200 | 200 | ✅ **PASSED** |
| 2 | Get All Tasks v2 UAT | Get tasks by pipeline ID | GET | `/v2/tasks` | 200 | 200 | ✅ **PASSED** |
| 3 | Get All Tasks v2 UAT | Get tasks with pagination | GET | `/v2/tasks` | 200 | 200 | ✅ **PASSED** |
| 4 | Get All Tasks v2 UAT | Get tasks sorted by creation date | GET | `/v2/tasks` | 200 | 200 | ✅ **PASSED** |
| 5 | Get All Tasks v2 UAT | Get tasks with invalid authentication | GET | `/v2/tasks` | 401 | 400 | ❌ **FAILED** |
| 6 | Get Task By ID No Lookup v2 UAT | Get task by ID without lookup | POST | `/v2/tasks/nolookup` | 200 | 404 | ❌ **FAILED** |
| 7 | Get Task By ID No Lookup v2 UAT | Compare lookup vs no-lookup response | N/A | N/A | N/A | N/A | ❌ **FAILED** |
| 8 | Get Task By ID No Lookup v2 UAT | Get task without lookup with invalid ID | POST | `/v2/tasks/nolookup` | 404 | 404 | ✅ **PASSED** |
| 9 | Get Task By ID v2 UAT | Get task by ID with lookup | POST | `/v2/tasks/lookup` | 200 | 400 | ❌ **FAILED** |
| 10 | Get Task By ID v2 UAT | Get task by ID with full details | POST | `/v2/tasks/lookup` | 200 | 400 | ❌ **FAILED** |
| 11 | Get Task By ID v2 UAT | Get task with invalid ID | POST | `/v2/tasks/lookup` | 404 | 400 | ❌ **FAILED** |
| 12 | Get Task By ID v2 UAT | Get task without ID in request body | POST | `/v2/tasks/lookup` | 400 | 400 | ✅ **PASSED** |
| 13 | Get Task Status v2 UAT | Get task execution status | GET | `/v2/tasks/{id}/status` | 200 | 404 | ❌ **FAILED** |
| 14 | Get Task Status v2 UAT | Verify different task statuses (running) | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 15 | Get Task Status v2 UAT | Verify different task statuses (completed) | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 16 | Get Task Status v2 UAT | Verify different task statuses (failed) | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 17 | Get Task Status v2 UAT | Verify different task statuses (pending) | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 18 | Get Task Status v2 UAT | Verify different task statuses (stopped) | N/A | N/A | N/A | N/A | ✅ **PASSED** |
| 19 | Get Task Status v2 UAT | Get status of non-existent task | GET | `/v2/tasks/{id}/status` | 404 | 404 | ✅ **PASSED** |
| 20 | Post All Tasks v2 UAT | Create multiple tasks | POST | `/v2/tasks` | 201 | 200 | ❌ **FAILED** |
| 21 | Post All Tasks v2 UAT | Post tasks with valid configuration | POST | `/v2/tasks` | 201 | 200 | ❌ **FAILED** |
| 22 | Post All Tasks v2 UAT | Post tasks with invalid data | POST | `/v2/tasks` | 400 | 200 | ❌ **FAILED** |

---

## Issue Categories

### 🔴 **Endpoint Not Found** (5 scenarios)
- `/v2/tasks/nolookup` → 404
- `/v2/tasks/{id}/status` → 404

### 🟠 **Bad Request** (3 scenarios)
- `/v2/tasks/lookup` → 400

### 🟡 **Status Code Mismatch** (3 scenarios)
- POST `/v2/tasks` → Returns 200 instead of 201

### 🟢 **Passed** (11 scenarios)
- GET `/v2/tasks` with various filters → All working ✅

---

## Quick Stats by Feature

| Feature | Passed | Failed | Total | Pass Rate |
|---------|--------|--------|-------|-----------|
| Get All Tasks v2 UAT | 4 | 1 | 5 | 80% |
| Get Task By ID No Lookup v2 UAT | 1 | 2 | 3 | 33% |
| Get Task By ID v2 UAT | 1 | 3 | 4 | 25% |
| Get Task Status v2 UAT | 7 | 1 | 8 | 88% |
| Post All Tasks v2 UAT | 0 | 3 | 3 | 0% |
| **TOTAL** | **11** | **11** | **22** | **50%** |

---

## Reports Available

1. **HTML Report** (Visual): `reports/html/index.html`
2. **JSON Report** (Data): `reports/tasks-v2-uat-detailed.json`
3. **Detailed Report** (Analysis): `TASKS_V2_UAT_DETAILED_REPORT.md`
4. **Summary Table** (This file): `TASKS_V2_UAT_SUMMARY_TABLE.md`

---

**Environment**: UAT | **Base URL**: https://api.opsera-uat.opsera.io/api | **Customer ID**: 67caf6137242d37590c9f060
