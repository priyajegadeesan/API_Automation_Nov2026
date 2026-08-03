# Pipeline monitoring APIs - PROD - Feature Files Summary

**Created**: June 20, 2026  
**Source**: Bruno Collection (.yml format)  
**Total Files**: 26 feature files  
**Scenarios**: 1 per file  
**Folder Structure**: Maintained (FR-01, FR-02, FR-03, FR-04)

---

## Overview

This collection uses **YML format** (not .bru format) and contains comprehensive pipeline monitoring API tests organized into 4 functional requirements (FR) folders.

---

## Folder Structure

```
features/Pipeline-monitoring-APIs-PROD/
├── FR-01-List-Pipelines/          (5 feature files)
├── FR-02-Get-Pipeline-Details/    (4 feature files)
├── FR-03-Get-Run-Status/          (10 feature files)
└── FR-04-List-Recent-Runs/        (7 feature files)
```

---

## FR-01: List Pipelines (5 files)

| # | Feature File | Endpoint | Method | Status Code |
|---|--------------|----------|--------|-------------|
| 1 | `01-list-pipelines-default-pagination.feature` | `/v2/pipelines` | GET | 200 |
| 2 | `02-list-pipelines-custom-pagination.feature` | `/v2/pipelines` | GET | 200 |
| 3 | `03-list-pipelines-search-filter.feature` | `/v2/pipelines` | GET | 200 |
| 4 | `04-list-pipelines-status-filter.feature` | `/v2/pipelines` | GET | 200 |
| 5 | `05-list-pipelines-without-auth.feature` | `/v2/pipelines` | GET | 401 |

**Purpose**: Test pipeline listing with various filters, pagination, and authentication

---

## FR-02: Get Pipeline Details (4 files)

| # | Feature File | Endpoint | Method | Status Code |
|---|--------------|----------|--------|-------------|
| 6 | `01-get-pipeline-details-valid-id.feature` | `/v2/pipelines/{id}` | GET | 200 |
| 7 | `02-get-pipeline-details-invalid-id-format.feature` | `/v2/pipelines/{id}` | GET | 400 |
| 8 | `03-get-pipeline-details-non-existent-id.feature` | `/v2/pipelines/{id}` | GET | 404 |
| 9 | `04-get-pipeline-details-without-auth.feature` | `/v2/pipelines/{id}` | GET | 401 |

**Purpose**: Test fetching individual pipeline details with validation and error handling

---

## FR-03: Get Run Status (10 files)

| # | Feature File | Endpoint | Method | Status Code |
|---|--------------|----------|--------|-------------|
| 10 | `01-get-run-status-valid-pipeline-and-run-count.feature` | `/v2/pipelines/{id}/runs/{count}/status` | GET | 200 |
| 11 | `02-get-run-status-completed-run.feature` | `/v2/pipelines/{id}/runs/1/status` | GET | 200 |
| 12 | `03-get-run-status-invalid-pipeline-id.feature` | `/v2/pipelines/invalid/runs/1/status` | GET | 400 |
| 13 | `04-get-run-status-invalid-run-count-non-numeric.feature` | `/v2/pipelines/{id}/runs/abc/status` | GET | 400 |
| 14 | `05-get-run-status-zero-run-count.feature` | `/v2/pipelines/{id}/runs/0/status` | GET | 400 |
| 15 | `06-get-run-status-exceeding-total.feature` | `/v2/pipelines/{id}/runs/999/status` | GET | 404 |
| 16 | `07-get-run-status-without-auth.feature` | `/v2/pipelines/{id}/runs/1/status` | GET | 401 |
| 17 | `08-get-run-status-both-ids-invalid.feature` | `/v2/pipelines/invalid/runs/abc/status` | GET | 400 |
| 18 | `09-get-run-status-non-existent-pipeline.feature` | `/v2/pipelines/{validId}/runs/1/status` | GET | 404 |
| 19 | `10-get-run-status-negative-run-count.feature` | `/v2/pipelines/{id}/runs/-1/status` | GET | 400 |

**Purpose**: Test pipeline run status retrieval with extensive validation and edge cases

---

## FR-04: List Recent Runs (7 files)

| # | Feature File | Endpoint | Method | Status Code |
|---|--------------|----------|--------|-------------|
| 20 | `01-list-recent-runs-default-limit.feature` | `/v2/pipelines/{id}/runs/recent` | GET | 200 |
| 21 | `02-list-recent-runs-custom-limit-10.feature` | `/v2/pipelines/{id}/runs/recent?limit=10` | GET | 200 |
| 22 | `03-list-recent-runs-limit-below-minimum.feature` | `/v2/pipelines/{id}/runs/recent?limit=2` | GET | 200 |
| 23 | `04-list-recent-runs-limit-above-maximum.feature` | `/v2/pipelines/{id}/runs/recent?limit=100` | GET | 200 |
| 24 | `05-list-recent-runs-invalid-pipeline-id.feature` | `/v2/pipelines/invalid/runs/recent` | GET | 400 |
| 25 | `06-list-recent-runs-non-existent-pipeline.feature` | `/v2/pipelines/{validId}/runs/recent` | GET | 404 |
| 26 | `07-list-recent-runs-without-auth.feature` | `/v2/pipelines/{id}/runs/recent` | GET | 401 |

**Purpose**: Test listing recent pipeline runs with limit clamping and validation

---

## Test Coverage

### By Test Type

| Type | Count | Description |
|------|-------|-------------|
| **Positive Tests** | 10 | Valid requests with expected 200 responses |
| **Negative Tests** | 16 | Invalid requests testing error handling |
| **Auth Tests** | 4 | Authentication validation (401 responses) |

### By HTTP Status Code

| Status Code | Count | Purpose |
|-------------|-------|---------|
| **200 OK** | 10 | Successful requests |
| **400 Bad Request** | 8 | Invalid input validation |
| **401 Unauthorized** | 4 | Authentication required |
| **404 Not Found** | 4 | Resource not found |

---

## API Endpoints Covered

1. **`GET /v2/pipelines`** - List pipelines with filters
2. **`GET /v2/pipelines/{pipelineId}`** - Get pipeline details
3. **`GET /v2/pipelines/{pipelineId}/runs/{runCount}/status`** - Get run status
4. **`GET /v2/pipelines/{pipelineId}/runs/recent`** - List recent runs

---

## Tags Used

- `@pipeline` - All pipeline-related tests
- `@list` - List operations
- `@details` - Detail retrieval operations
- `@run` - Run-related operations
- `@status` - Status operations
- `@pagination` - Pagination tests
- `@search` - Search functionality
- `@filter` - Filtering tests
- `@negative` - Negative test cases
- `@auth` - Authentication tests
- `@prod` - Production environment

---

## Special Notes

### Validation Coverage

**FR-03 (Get Run Status)** has the most comprehensive validation:
- ✅ Valid inputs
- ✅ Invalid pipeline ID format
- ✅ Non-existent pipeline ID
- ✅ Invalid run count (non-numeric, zero, negative)
- ✅ Run count exceeding total
- ✅ Combined invalid parameters
- ✅ Authentication validation

### Limit Clamping (FR-04)

Tests verify that the API properly clamps limit values:
- Minimum: 5
- Maximum: 10
- Below minimum → clamped to 5
- Above maximum → clamped to 10

---

## Comparison: .bru vs .yml Format

| Aspect | .bru Format | .yml Format (This Collection) |
|--------|-------------|-------------------------------|
| Structure | Bruno native | Bruno YAML format |
| Test Assertions | In scripts | Runtime scripts with expect() |
| Variables | Bruno vars | Dynamic variable capture |
| Organization | Flat structure | FR-based folders |

---

## How to Run Tests

```bash
# Run all Pipeline monitoring tests
npx cucumber-js features/Pipeline-monitoring-APIs-PROD/

# Run specific FR folder
npx cucumber-js features/Pipeline-monitoring-APIs-PROD/FR-01-List-Pipelines/

# Run by tag
npx cucumber-js --tags "@list"
npx cucumber-js --tags "@negative"
npx cucumber-js --tags "@auth"

# Run in PROD environment
npm run test:prod --features="features/Pipeline-monitoring-APIs-PROD/"
```

---

## Summary

✅ **26 feature files created**  
✅ **1 scenario per file**  
✅ **Folder structure maintained (FR-01 to FR-04)**  
✅ **Comprehensive test coverage**  
✅ **Positive, negative, and authentication tests**  
✅ **All endpoints covered**  

---

**Location**: `features/Pipeline-monitoring-APIs-PROD/`  
**Source Collection**: `Pipeline monitoring APIs - PROD` (.yml format)  
**Status**: ✅ **COMPLETE**

---

*Generated: June 20, 2026*
