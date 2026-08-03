# API Test Reporting

## Standard Report Formats

This framework generates **TWO standard reports** after test execution:

### 1. API Defect Report
**Format**: Professional defect-focused report  
**File**: `API-Defect-Report-{ENV}-{DATE}_{TIME}.html`  
**Purpose**: Identifies and categorizes API failures by severity

**Features**:
- Defect summary with severity levels (Critical 5xx, High 403/404, Medium 400)
- Detailed defect table with method, endpoint, error details
- Defects organized by API category
- Pass rate and test execution summary

**Generate**: 
```bash
npm run report:defect
```

### 2. API Comprehensive Report
**Format**: Full test execution report with filtering  
**File**: `API-Comprehensive-Report-{ENV}-{DATE}_{TIME}.html`  
**Purpose**: Complete test results with interactive filtering

**Features**:
- Summary dashboard with metrics (Total, Passed, Failed, Duration)
- API category breakdown with pass rates
- Detailed test results table (filterable: All/Passed/Failed)
- Method, endpoint, status code, duration for each test

**Generate**:
```bash
npm run report:comprehensive
```

## Generate Both Reports

After running tests, generate both standard reports:

```bash
npm run report:all
```

This will create both reports in the `reports` folder.

## Workflow

1. **Run Tests**:
   ```bash
   npm run test:prod    # For PROD environment
   npm run test:uat     # For UAT environment
   ```

2. **Generate Reports**:
   ```bash
   npm run report:all
   ```

3. **View Reports**:
   - Open `reports/API-Defect-Report-{ENV}-{DATE}_{TIME}.html`
   - Open `reports/API-Comprehensive-Report-{ENV}-{DATE}_{TIME}.html`

## Clean Up Old Reports

To delete all existing reports before a new run:

```bash
npm run clean:reports
```

## Configuration

### Cucumber Output
Located in `cucumber.js`:
- Only generates JSON format: `reports/cucumber-report.json`
- No HTML or XML generated (handled by standard reports)

### Report Scripts
- `generate_api_defect_report.js` - Defect report generator
- `generate_api_comprehensive_report.js` - Comprehensive report generator
- `delete_all_reports.js` - Report cleanup utility

## Environment Support

Both reports automatically detect the environment:
- Reads from `process.env.ENV`
- Defaults to PROD if not specified
- Shows environment in report header

## Report Naming Convention

```
API-Defect-Report-{ENV}-{YYYY-MM-DD}_{HH-MM-SS}.html
API-Comprehensive-Report-{ENV}-{YYYY-MM-DD}_{HH-MM-SS}.html
```

Example:
- `API-Defect-Report-PROD-2026-06-27_17-30-45.html`
- `API-Comprehensive-Report-PROD-2026-06-27_17-30-45.html`
