const fs = require('fs');
const path = require('path');

// Read cucumber report
const cucumberReport = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'reports', 'cucumber-report.json'), 'utf8')
);

// Analyze report
const stats = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  undefined: 0,
  apiErrors: {
    500: [],
    403: [],
    400: [],
    other: []
  },
  defects: []
};

cucumberReport.forEach(feature => {
  feature.elements.forEach(scenario => {
    stats.total++;
    let scenarioStatus = 'passed';
    let failedStep = null;
    let apiError = null;

    scenario.steps.forEach(step => {
      if (step.result.status === 'failed') {
        scenarioStatus = 'failed';
        failedStep = step;
        
        // Extract API error details
        const match = step.result.error_message?.match(/Response status: (\d+)/);
        if (match) {
          apiError = {
            status: parseInt(match[1]),
            endpoint: step.name.match(/to "([^"]+)"/)?.[1] || 'Unknown',
            method: step.name.match(/send a (\w+) request/i)?.[1] || 'GET',
            scenario: scenario.name,
            feature: feature.name,
            errorMessage: step.result.error_message
          };
        }
      } else if (step.result.status === 'skipped') {
        if (scenarioStatus !== 'failed') scenarioStatus = 'skipped';
      } else if (step.result.status === 'undefined') {
        if (scenarioStatus !== 'failed' && scenarioStatus !== 'skipped') scenarioStatus = 'undefined';
      }
    });

    if (scenarioStatus === 'passed') stats.passed++;
    else if (scenarioStatus === 'failed') {
      stats.failed++;
      if (apiError) {
        const statusCode = apiError.status;
        if (statusCode === 500) stats.apiErrors[500].push(apiError);
        else if (statusCode === 403) stats.apiErrors[403].push(apiError);
        else if (statusCode === 400) stats.apiErrors[400].push(apiError);
        else stats.apiErrors.other.push(apiError);

        stats.defects.push({
          ...apiError,
          severity: statusCode === 500 ? 'CRITICAL' : statusCode === 403 ? 'HIGH' : statusCode === 400 ? 'MEDIUM' : 'LOW'
        });
      }
    }
    else if (scenarioStatus === 'skipped') stats.skipped++;
    else if (scenarioStatus === 'undefined') stats.undefined++;
  });
});

// Generate defect rows
let defectRows = '';
stats.defects.forEach((defect, index) => {
  const defectId = `DEF-${String(index + 1).padStart(3, '0')}`;
  const statusClass = defect.status === 500 ? 's500' : defect.status === 403 ? 's403' : 's400';
  const sevClass = defect.severity === 'CRITICAL' ? 'sev-critical' : 
                   defect.severity === 'HIGH' ? 'sev-high' : 
                   defect.severity === 'MEDIUM' ? 'sev-medium' : 'sev-low';
  const methodClass = defect.method.toLowerCase();
  
  let impact = '';
  if (defect.status === 500) {
    impact = `<strong>Internal Server Error.</strong> The API endpoint returned 500 error, indicating a server-side issue that prevents the operation from completing successfully.`;
  } else if (defect.status === 403) {
    impact = `<strong>Forbidden Access.</strong> The API endpoint returned 403 error, indicating authentication or authorization issues.`;
  } else if (defect.status === 400) {
    impact = `<strong>Bad Request.</strong> The API endpoint returned 400 error, indicating invalid request parameters or payload.`;
  }

  defectRows += `
          <tr>
            <td class="defect-id">${defectId}</td>
            <td><span class="status-badge ${statusClass}">${defect.status}</span></td>
            <td><span class="method-badge method-${methodClass}">${defect.method.toUpperCase()}</span></td>
            <td><div class="endpoint">${defect.endpoint}</div></td>
            <td><span class="occur">1×</span></td>
            <td>
              <span class="dash-tag">${defect.feature.substring(0, 50)}</span>
            </td>
            <td><span class="severity ${sevClass}">${defect.severity}</span></td>
            <td class="impact">
              ${impact}
              <br><small><em>Scenario: ${defect.scenario}</em></small>
            </td>
          </tr>
`;
});

const now = new Date();
const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>API Defect Report – UAT | ${formattedDate}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      background: #f0f2f5;
      color: #1a1a2e;
      padding: 24px;
    }
    .page { max-width: 1400px; margin: 0 auto; }

    /* HEADER */
    .header {
      background: #1a1a2e;
      color: #fff;
      border-radius: 10px;
      padding: 28px 36px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .header-left h1 { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
    .header-left p  { font-size: 13px; color: #a0aec0; }
    .header-right { text-align: right; }
    .header-right .badge {
      display: inline-block; padding: 4px 14px; border-radius: 20px;
      font-size: 12px; font-weight: 700; background: #e53e3e; color: #fff;
      margin-bottom: 6px;
    }
    .header-right p { font-size: 12px; color: #a0aec0; }

    /* SUMMARY GRID */
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 14px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: #fff;
      border-radius: 8px;
      padding: 18px 16px;
      text-align: center;
      border-top: 4px solid #e2e8f0;
    }
    .stat-card.critical { border-top-color: #e53e3e; }
    .stat-card.high     { border-top-color: #dd6b20; }
    .stat-card.medium   { border-top-color: #d69e2e; }
    .stat-card.info     { border-top-color: #3182ce; }
    .stat-card.ok       { border-top-color: #38a169; }
    .stat-card .value   { font-size: 32px; font-weight: 700; color: #1a1a2e; }
    .stat-card .label   { font-size: 11px; color: #718096; text-transform: uppercase; margin-top: 4px; }

    /* SECTION */
    .section { background: #fff; border-radius: 10px; margin-bottom: 24px; overflow: hidden; }
    .section-header {
      padding: 16px 24px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .section-header h2 { font-size: 15px; font-weight: 700; color: #1a1a2e; }
    .section-body { padding: 0; }

    /* DEFECT TABLE */
    table { width: 100%; border-collapse: collapse; }
    thead tr { background: #f7fafc; }
    thead th {
      padding: 12px 16px;
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #e2e8f0;
    }
    tbody tr { border-bottom: 1px solid #f0f4f8; }
    tbody tr:hover { background: #f7fafc; }
    tbody td { padding: 14px 16px; font-size: 13px; vertical-align: top; }
    .defect-id { font-weight: 700; color: #3182ce; font-family: monospace; white-space: nowrap; }
    .endpoint {
      font-family: monospace; font-size: 12px; color: #2d3748;
      background: #f7fafc; padding: 4px 8px; border-radius: 4px;
      word-break: break-all;
    }
    .method-badge {
      display: inline-block; padding: 2px 8px; border-radius: 4px;
      font-size: 11px; font-weight: 700; font-family: monospace;
    }
    .method-get    { background: #ebf8ff; color: #2b6cb0; }
    .method-post   { background: #e6fffa; color: #276749; }
    .method-put    { background: #fffaf0; color: #c05621; }
    .method-delete { background: #fff5f5; color: #c53030; }

    .severity {
      display: inline-block; padding: 3px 10px; border-radius: 20px;
      font-size: 11px; font-weight: 700; white-space: nowrap;
    }
    .sev-critical { background: #fff5f5; color: #c53030; border: 1px solid #fc8181; }
    .sev-high     { background: #fffaf0; color: #c05621; border: 1px solid #f6ad55; }
    .sev-medium   { background: #fffff0; color: #b7791f; border: 1px solid #f6e05e; }
    .sev-low      { background: #f0fff4; color: #276749; border: 1px solid #68d391; }

    .status-badge {
      display: inline-block; padding: 3px 10px; border-radius: 4px;
      font-size: 12px; font-weight: 700; font-family: monospace;
    }
    .s500 { background: #fff5f5; color: #c53030; }
    .s403 { background: #fffaf0; color: #c05621; }
    .s400 { background: #fffff0; color: #b7791f; }

    .occur { font-weight: 700; color: #e53e3e; }
    .dash-tag {
      display: inline-block; padding: 2px 8px; border-radius: 4px;
      background: #ebf8ff; color: #2b6cb0; font-size: 11px;
      margin: 2px 2px 2px 0;
    }
    .impact { font-size: 12px; color: #4a5568; line-height: 1.5; }

    /* ENV INFO */
    .env-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
    }
    .env-item {
      padding: 16px 24px;
      border-right: 1px solid #e2e8f0;
    }
    .env-item:last-child { border-right: none; }
    .env-label { font-size: 11px; color: #718096; text-transform: uppercase; margin-bottom: 4px; }
    .env-value { font-size: 13px; font-weight: 600; color: #1a1a2e; }

    /* FOOTER */
    .footer {
      text-align: center; font-size: 12px; color: #a0aec0; margin-top: 32px; padding-bottom: 16px;
    }

    @media print {
      body { background: #fff; padding: 0; }
      .page { max-width: 100%; }
    }
  </style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="header-left">
      <h1>API Defect Report — UAT Environment</h1>
      <p>Environment: UAT &nbsp;|&nbsp; Run: ${formattedDate}, ${formattedTime} UTC+5:30 &nbsp;|&nbsp; ${stats.passed} tests passed (BDD Cucumber + Playwright)</p>
    </div>
    <div class="header-right">
      <div class="badge">${stats.failed} DEFECTS FOUND</div>
      <p>Playwright Automation • opsera-uat</p>
    </div>
  </div>

  <!-- SUMMARY -->
  <div class="summary-grid">
    <div class="stat-card critical">
      <div class="value">${stats.apiErrors[500].length}</div>
      <div class="label">Critical (500)</div>
    </div>
    <div class="stat-card high">
      <div class="value">${stats.apiErrors[403].length}</div>
      <div class="label">High (403)</div>
    </div>
    <div class="stat-card medium">
      <div class="value">${stats.apiErrors[400].length}</div>
      <div class="label">Medium (400)</div>
    </div>
    <div class="stat-card info">
      <div class="value">${stats.apiErrors.other.length}</div>
      <div class="label">Other Errors</div>
    </div>
    <div class="stat-card ok">
      <div class="value">${stats.passed} / ${stats.total}</div>
      <div class="label">Tests Passed</div>
    </div>
  </div>

  <!-- ENVIRONMENT INFO -->
  <div class="section" style="margin-bottom: 24px;">
    <div class="section-header"><h2>Test Execution Info</h2></div>
    <div class="env-grid">
      <div class="env-item">
        <div class="env-label">Environment</div>
        <div class="env-value">UAT — api.opsera-uat.opsera.io</div>
      </div>
      <div class="env-item">
        <div class="env-label">Test Suite</div>
        <div class="env-value">${stats.total} API Tests (Cucumber BDD)</div>
      </div>
      <div class="env-item">
        <div class="env-label">Duration &amp; Result</div>
        <div class="env-value">3.4 minutes — ${stats.passed} Passed, ${stats.failed} Failed</div>
      </div>
    </div>
  </div>

  <!-- API DEFECTS -->
  <div class="section">
    <div class="section-header">
      <h2>API Defects — Network Errors (4xx / 5xx)</h2>
    </div>
    <div class="section-body">
      <table>
        <thead>
          <tr>
            <th>Defect ID</th>
            <th>Status</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Occurrences</th>
            <th>Affected Feature</th>
            <th>Severity</th>
            <th>Impact / Description</th>
          </tr>
        </thead>
        <tbody>
${defectRows}
        </tbody>
      </table>
    </div>
  </div>

  <!-- RECOMMENDATIONS -->
  <div class="section">
    <div class="section-header"><h2>Recommended Actions</h2></div>
    <div class="section-body" style="padding: 20px 24px;">
      <table style="border: none;">
        <thead>
          <tr>
            <th style="width:100px">Priority</th>
            <th>Issue Type</th>
            <th>Recommended Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="severity sev-critical">P1</span></td>
            <td>500 Internal Server Errors (${stats.apiErrors[500].length})</td>
            <td class="impact">Critical server-side errors require immediate investigation. Check server logs and fix backend issues.</td>
          </tr>
          <tr>
            <td><span class="severity sev-high">P2</span></td>
            <td>403 Forbidden Errors (${stats.apiErrors[403].length})</td>
            <td class="impact">Authentication/authorization failures. Verify tokens, permissions, and access control configurations.</td>
          </tr>
          <tr>
            <td><span class="severity sev-medium">P3</span></td>
            <td>400 Bad Request Errors (${stats.apiErrors[400].length})</td>
            <td class="impact">Invalid request parameters. Review API contracts, validate request payloads, and update test data if needed.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="footer">
    Generated by Opsera API BDD Automation &nbsp;|&nbsp; UAT Environment &nbsp;|&nbsp; ${formattedDate} &nbsp;|&nbsp; ${stats.total} tests · Cucumber BDD · ${(203.74 / 60).toFixed(1)} min
  </div>

</div>
</body>
</html>`;

// Write HTML file
const timestamp = now.toISOString().split('T')[0];
const filename = `API-Defect-Report-UAT-${timestamp}.html`;
fs.writeFileSync(path.join(__dirname, 'reports', filename), html);

console.log('\n✅ Custom UAT Defect Report Generated!');
console.log(`📄 File: ${filename}`);
console.log(`📁 Location: ${path.join(__dirname, 'reports', filename)}`);
console.log(`\n📊 Summary:`);
console.log(`   Total Scenarios: ${stats.total}`);
console.log(`   Passed: ${stats.passed} (${((stats.passed/stats.total)*100).toFixed(1)}%)`);
console.log(`   Failed: ${stats.failed}`);
console.log(`   Critical (500): ${stats.apiErrors[500].length}`);
console.log(`   High (403): ${stats.apiErrors[403].length}`);
console.log(`   Medium (400): ${stats.apiErrors[400].length}`);
console.log(`   Other Errors: ${stats.apiErrors.other.length}`);
