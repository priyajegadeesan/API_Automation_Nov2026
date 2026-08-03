const fs = require('fs');
const path = require('path');

// Read the Cucumber JSON report
const reportPath = path.join(__dirname, 'reports', 'cucumber-report.json');
const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Get current date/time
const now = new Date();
const dateStr = now.toISOString().split('T')[0];
const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
const displayDate = now.toLocaleString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false 
});

// Get environment from process.env or default to PROD
const environment = process.env.ENV ? process.env.ENV.toUpperCase() : 'PROD';

// Process results
let totalScenarios = 0;
let passedScenarios = 0;
let failedScenarios = 0;
let undefinedScenarios = 0;
let ambiguousScenarios = 0;

const defects = [];
let defectId = 1;

reportData.forEach(feature => {
  feature.elements.forEach(scenario => {
    if (scenario.type === 'scenario') {
      totalScenarios++;
      let scenarioStatus = 'passed';
      let failedStep = null;
      
      for (const step of scenario.steps) {
        if (step.result) {
          if (step.result.status === 'failed') {
            scenarioStatus = 'failed';
            failedStep = step;
            failedScenarios++;
            
            // Extract defect details
            const errorMsg = step.result.error_message || '';
            const endpoint = step.name.match(/"([^"]+)"/)?.[1] || 'N/A';
            const method = step.name.match(/(GET|POST|PUT|DELETE|PATCH|OPTIONS)/i)?.[0]?.toUpperCase() || 'UNKNOWN';
            
            // Extract expected vs actual status
            let expectedStatus = 'N/A';
            let actualStatus = 'N/A';
            const statusMatch = errorMsg.match(/expected.*?(\d{3}).*?actual.*?(\d{3})/i);
            if (statusMatch) {
              expectedStatus = statusMatch[1];
              actualStatus = statusMatch[2];
            } else {
              const altMatch = errorMsg.match(/(\d{3})/g);
              if (altMatch && altMatch.length >= 2) {
                actualStatus = altMatch[0];
                expectedStatus = altMatch[1];
              }
            }
            
            defects.push({
              id: `DEF-${String(defectId++).padStart(3, '0')}`,
              status: actualStatus,
              method,
              endpoint,
              feature: feature.name,
              scenario: scenario.name,
              errorMsg: errorMsg.split('\n').slice(0, 3).join(' '),
              severity: actualStatus >= 500 ? 'CRITICAL' : actualStatus >= 400 ? 'HIGH' : 'MEDIUM'
            });
            break;
          } else if (step.result.status === 'undefined') {
            scenarioStatus = 'undefined';
            undefinedScenarios++;
            break;
          } else if (step.result.status === 'ambiguous') {
            scenarioStatus = 'ambiguous';
            ambiguousScenarios++;
            break;
          }
        }
      }
      
      if (scenarioStatus === 'passed') {
        passedScenarios++;
      }
    }
  });
});

const passRate = ((passedScenarios / totalScenarios) * 100).toFixed(1);

// Count defects by status code
const critical500 = defects.filter(d => d.status >= 500).length;
const high403 = defects.filter(d => d.status == 403).length;
const high404 = defects.filter(d => d.status == 404).length;
const medium400 = defects.filter(d => d.status == 400).length;

// Generate HTML - using exact format from user's example
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>API Defect Report – ${environment} | ${displayDate}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      background: #f0f2f5;
      color: #1a1a2e;
      padding: 24px;
    }
    .page { max-width: 1200px; margin: 0 auto; }

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
    .method-patch  { background: #faf5ff; color: #6b46c1; }
    .method-options { background: #f0fff4; color: #22543d; }

    .severity {
      display: inline-block; padding: 3px 10px; border-radius: 20px;
      font-size: 11px; font-weight: 700; white-space: nowrap;
    }
    .sev-critical { background: #fff5f5; color: #c53030; border: 1px solid #fc8181; }
    .sev-high     { background: #fffaf0; color: #c05621; border: 1px solid #f6ad55; }
    .sev-medium   { background: #fffff0; color: #b7791f; border: 1px solid #f6e05e; }

    .status-badge {
      display: inline-block; padding: 3px 10px; border-radius: 4px;
      font-size: 12px; font-weight: 700; font-family: monospace;
    }
    .s500 { background: #fff5f5; color: #c53030; }
    .s403 { background: #fffaf0; color: #c05621; }
    .s404 { background: #fffaf0; color: #c05621; }
    .s400 { background: #fffff0; color: #b7791f; }

    .impact { font-size: 12px; color: #4a5568; line-height: 1.5; max-width: 600px; }

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

  <div class="header">
    <div class="header-left">
      <h1>API Defect Report — BDD Automation Framework</h1>
      <p>Environment: ${environment} &nbsp;|&nbsp; Run: ${displayDate} &nbsp;|&nbsp; ${totalScenarios} scenarios executed</p>
    </div>
    <div class="header-right">
      <div class="badge">${failedScenarios} DEFECTS FOUND</div>
      <p>Playwright API Testing • ${passedScenarios} Passed</p>
    </div>
  </div>

  <div class="summary-grid">
    <div class="stat-card critical">
      <div class="value">${critical500}</div>
      <div class="label">Critical (5xx)</div>
    </div>
    <div class="stat-card high">
      <div class="value">${high403 + high404}</div>
      <div class="label">High (403/404)</div>
    </div>
    <div class="stat-card medium">
      <div class="value">${medium400}</div>
      <div class="label">Medium (400)</div>
    </div>
    <div class="stat-card info">
      <div class="value">${passRate}%</div>
      <div class="label">Pass Rate</div>
    </div>
    <div class="stat-card ok">
      <div class="value">${passedScenarios} / ${totalScenarios}</div>
      <div class="label">Tests Passed</div>
    </div>
  </div>

  <div class="section" style="margin-bottom: 24px;">
    <div class="section-header"><h2>Test Execution Info</h2></div>
    <div class="env-grid">
      <div class="env-item">
        <div class="env-label">Environment</div>
        <div class="env-value">${environment} — Production API Server</div>
      </div>
      <div class="env-item">
        <div class="env-label">Test Suite</div>
        <div class="env-value">${totalScenarios} API Scenarios (Cucumber BDD)</div>
      </div>
      <div class="env-item">
        <div class="env-label">Result Summary</div>
        <div class="env-value">${passedScenarios} Passed, ${failedScenarios} Failed, ${undefinedScenarios} Undefined</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-header">
      <h2>API Defects — Failed Scenarios (4xx / 5xx Errors)</h2>
    </div>
    <div class="section-body">
      <table>
        <thead>
          <tr>
            <th>Defect ID</th>
            <th>Status</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Feature</th>
            <th>Scenario</th>
            <th>Severity</th>
            <th>Error Details</th>
          </tr>
        </thead>
        <tbody>
${defects.map(d => `
          <tr>
            <td class="defect-id">${d.id}</td>
            <td><span class="status-badge s${d.status}">${d.status}</span></td>
            <td><span class="method-badge method-${d.method.toLowerCase()}">${d.method}</span></td>
            <td><div class="endpoint">${d.endpoint}</div></td>
            <td style="font-size: 12px;">${d.feature}</td>
            <td style="font-size: 12px;">${d.scenario}</td>
            <td><span class="severity sev-${d.severity.toLowerCase()}">${d.severity}</span></td>
            <td class="impact">${d.errorMsg.substring(0, 150)}${d.errorMsg.length > 150 ? '...' : ''}</td>
          </tr>
`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div class="section">
    <div class="section-header"><h2>Defects by API Category</h2></div>
    <div class="section-body" style="padding: 20px 24px;">
      <table style="border: none;">
        <thead>
          <tr>
            <th>API Category</th>
            <th style="text-align: center;">Failed</th>
            <th style="text-align: center;">Passed</th>
            <th style="text-align: center;">Total</th>
          </tr>
        </thead>
        <tbody>
${(() => {
  const categories = {};
  reportData.forEach(feature => {
    const category = feature.uri.split('/')[1] || 'Other';
    if (!categories[category]) {
      categories[category] = { passed: 0, failed: 0, total: 0 };
    }
    
    feature.elements.forEach(scenario => {
      if (scenario.type === 'scenario') {
        categories[category].total++;
        let hasFailed = false;
        for (const step of scenario.steps) {
          if (step.result && step.result.status === 'failed') {
            hasFailed = true;
            break;
          }
        }
        if (hasFailed) {
          categories[category].failed++;
        } else {
          categories[category].passed++;
        }
      }
    });
  });
  
  return Object.entries(categories)
    .sort((a, b) => b[1].failed - a[1].failed)
    .map(([cat, stats]) => `
          <tr>
            <td><strong>${cat}</strong></td>
            <td style="text-align: center; color: #c53030; font-weight: 700;">${stats.failed}</td>
            <td style="text-align: center; color: #38a169; font-weight: 700;">${stats.passed}</td>
            <td style="text-align: center;">${stats.total}</td>
          </tr>
`).join('');
})()}
        </tbody>
      </table>
    </div>
  </div>

  <div class="footer">
    Generated by API BDD Playwright Automation &nbsp;|&nbsp; ${environment} Environment &nbsp;|&nbsp; ${displayDate} &nbsp;|&nbsp; ${totalScenarios} scenarios
  </div>

</div>
</body>
</html>`;

// Write the report
const reportFileName = `API-Defect-Report-${environment}-${dateStr}_${timeStr}.html`;
const reportFilePath = path.join(__dirname, 'reports', reportFileName);
fs.writeFileSync(reportFilePath, html);

console.log(`\n✅ API Defect Report Generated!`);
console.log(`📄 File: ${reportFileName}`);
console.log(`📁 Location: ${reportFilePath}`);
console.log(`\n📊 Summary:`);
console.log(`   Total Scenarios: ${totalScenarios}`);
console.log(`   Passed: ${passedScenarios} (${passRate}%)`);
console.log(`   Failed: ${failedScenarios}`);
console.log(`   Defects Identified: ${defects.length}`);
