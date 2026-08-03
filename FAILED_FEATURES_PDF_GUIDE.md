# 📄 Failed Features List - PDF Guide

**File Generated:** `Failed_Features_List_2026-06-22_05-25-pm.html`  
**Location:** `C:\Users\priya\API_BDD_Playwright\reports\`  
**Status:** ✅ Opened in browser (ready to save as PDF)

---

## 🚀 How to Save as PDF

### Quick Steps:

1. **The HTML file is already open in your browser**
2. **Press `Ctrl + P`** (or go to Menu → Print)
3. **Select "Save as PDF"** from the printer dropdown
4. **Click "Save"**
5. **Choose location** and save the PDF

### Detailed Instructions:

#### For Chrome/Edge:
1. File is open in browser ✅
2. Press `Ctrl + P`
3. Under "Destination", click "Change"
4. Select "Save as PDF"
5. Click "Save" button
6. Choose your preferred location (e.g., Desktop, Documents)
7. Name it: `Failed_Features_UAT_2026-06-22.pdf`
8. Click "Save"

#### For Firefox:
1. File is open in browser ✅
2. Press `Ctrl + P`
3. Select "Microsoft Print to PDF" or "Save as PDF"
4. Click "Print"
5. Choose location and save

---

## 📊 Report Contents

### Summary Section
- **Total Failures:** 125 out of 159 scenarios
- **Feature Areas Affected:** 15 different areas
- **HTTP 500 Errors:** 41 failures (server errors)
- **HTTP 400 Errors:** 41 failures (bad requests)
- **HTTP 404 Errors:** 28 failures (not found)

### Table of Contents
Quick overview showing failures grouped by feature area:
- Node-Public-API-Service: 43 failures
- Pipeline-monitoring-APIs-PROD: 23 failures
- Pipelines-v2-Prod: 9 failures
- And more...

### Detailed Failure List
For each failed feature, you'll see:
1. **Failure Number** (1-125)
2. **HTTP Status Code** (400, 404, 500, etc.)
3. **File Path** (exact location)
4. **Scenario Name** (what was being tested)
5. **Error Preview** (first 150 characters of error)

---

## 📋 Failure Breakdown by Feature Area

### Top 10 Areas with Most Failures:

1. **Node-Public-API-Service** - 43 failures
   - Mostly HTTP 500 and 404 errors
   - Missing request bodies

2. **Pipeline-monitoring-APIs-PROD** - 23 failures
   - Mixed 404/500/403 errors
   - Authentication/configuration issues

3. **Pipelines-v2-Prod** - 9 failures
   - Pipeline creation endpoints
   - Request validation issues

4. **Group-APIs** - 10 failures
   - Create/delete operations
   - Request format problems

5. **UATv2-Pipeline** - 9 failures
   - UAT-specific configuration needed

6. **User-Management** - 7 failures
   - User operations failing

7. **Tasks-v2-UAT** - 8 failures
   - UAT environment issues

8. **SCIM-APIs** - 7 failures
   - SCIM operations failing

9. **People-API** - 4 failures
   - Person management endpoints

10. **Global-Parameter-Api** - 3 failures
    - Parameter operations

---

## 🎯 How to Use This List

### For Fixing Failures:

1. **Start with High-Impact Areas**
   - Node-Public-API-Service (43 failures)
   - Pipeline-monitoring-APIs-PROD (23 failures)

2. **Group by Error Type**
   - HTTP 500: Server-side issues (41 failures)
   - HTTP 400: Request body issues (41 failures)
   - HTTP 404: Endpoint/path issues (28 failures)

3. **Work Through Each File**
   - Use the file path to locate the feature file
   - Check the scenario description
   - Review the error message
   - Fix and re-test

### Priority Approach:

**Priority 1 - Quick Wins (HTTP 404 - 28 failures)**
- Check endpoint paths
- Verify API exists in UAT
- Update base URLs if needed

**Priority 2 - Data Issues (HTTP 400 - 41 failures)**
- Add proper request bodies
- Validate required fields
- Fix data types

**Priority 3 - Server Issues (HTTP 500 - 41 failures)**
- Check server logs
- Verify services are running
- Report to dev team if backend issues

---

## 📁 File Format

### What's in the PDF:

**Page 1: Header & Summary**
- Report title
- Timestamp
- Failure statistics

**Page 2: Table of Contents**
- All 15 feature areas
- Failure count for each
- Sorted by most failures first

**Pages 3+: Detailed Failures**
- Grouped by feature area
- Each failure includes:
  - Number (1-125)
  - HTTP status code (color-coded)
  - File path (full path to feature file)
  - Scenario name
  - Error preview

---

## 💡 Tips for Working with This List

### Efficient Workflow:

1. **Print the PDF** (or keep it open on second monitor)
2. **Work through one feature area at a time**
3. **Check off each file as you fix it**
4. **Re-run tests after fixing a batch**
5. **Generate new report to track progress**

### Tracking Progress:

Create a simple checklist:
```
☐ Node-Public-API-Service (43 files)
☐ Pipeline-monitoring-APIs-PROD (23 files)
☐ Pipelines-v2-Prod (9 files)
☐ Group-APIs (10 files)
...and so on
```

### Before Fixing:

For each failure, ask:
1. Is the endpoint correct?
2. Is the request body provided?
3. Is the API available in UAT?
4. Are the credentials valid?
5. Is the expected status code correct?

---

## 🔄 Regenerate Report

After fixing some failures, regenerate the report:

```bash
# Run tests
$env:ENV="uat"; npx cucumber-js features/

# Generate new failures list
node generate_failures_pdf.js
```

This creates a new dated file so you can compare progress!

---

## 📊 Statistics

### Current State:
- **Total Test Scenarios:** 159
- **Passing:** 34 (21%)
- **Failing:** 125 (79%) ← This document lists all 125
- **Pass Rate Goal:** 50%+ (need to fix ~50 failures)

### Error Distribution:
- **Server Errors (500):** 41 failures (33%)
- **Bad Requests (400):** 41 failures (33%)
- **Not Found (404):** 28 failures (22%)
- **Other (403, 405, etc.):** 15 failures (12%)

---

## ✅ Example Usage

### Working Through Node-Public-API-Service:

1. **Open PDF** - Go to Node-Public-API-Service section
2. **Pick first file:** `Node-Public-API-Service\create-dashboard.feature`
3. **Check error:** "HTTP 500" - Missing request body
4. **Fix:** Add proper dashboard configuration in feature file
5. **Test:** Run that specific feature
6. **Repeat:** Move to next file

---

## 📞 Quick Reference

### File Locations:

**HTML File (for PDF conversion):**
```
C:\Users\priya\API_BDD_Playwright\reports\Failed_Features_List_2026-06-22_05-25-pm.html
```

**Feature Files (to fix):**
```
C:\Users\priya\API_BDD_Playwright\features\[folder]\[file].feature
```

### Key Numbers to Remember:
- 125 total failures to fix
- 15 feature areas affected
- 41 HTTP 500 errors (priority for dev team)
- 41 HTTP 400 errors (priority for test data)
- 28 HTTP 404 errors (priority for path fixes)

---

## 🎯 Next Steps

1. ✅ **Save HTML as PDF** (Ctrl+P → Save as PDF)
2. 📋 **Print or keep PDF handy**
3. 🔨 **Start fixing high-priority failures**
4. ✅ **Re-run tests after each batch of fixes**
5. 📊 **Track progress with new reports**

---

## 📄 PDF Styling

The generated PDF will have:
- ✅ Clean, professional layout
- ✅ Color-coded HTTP status badges
- ✅ Grouped by feature area
- ✅ Page breaks between sections
- ✅ Print-optimized formatting
- ✅ Easy to read monospace fonts for file paths
- ✅ Error messages in highlighted boxes

---

## 🎉 Summary

**What You Have:**
- ✅ HTML file ready to convert to PDF
- ✅ All 125 failures listed with details
- ✅ Organized by feature area
- ✅ Color-coded by error type
- ✅ Complete file paths for fixing
- ✅ Error messages for debugging

**What To Do:**
1. Save as PDF (Ctrl+P)
2. Use it to systematically fix failures
3. Track your progress
4. Re-run tests
5. Generate new report to see improvements

---

**Generated:** Monday, June 22, 2026 at 5:25 PM IST  
**Environment:** UAT  
**Framework:** API BDD Playwright v1.1.0  
**Status:** Ready to convert to PDF and start fixing! 🚀
