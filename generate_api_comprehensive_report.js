const fs = require('fs');
const path = require('path');

// Read the Cucumber JSON report
const reportPath = path.join(__dirname, 'reports', 'cucumber-report.json');
const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Get current date/time
const now = new Date();
const dateStr = now.toISOString().split('T')[0];
const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
const displayDateTime = now.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});

// Get environment from process.env or default to PROD
const environment = process.env.ENV ? process.env.ENV.toUpperCase() : 'PROD';

// Process results
let totalScenarios = 0;
let passedScenarios = 0;
let failedScenarios = 0;
let undefinedScenarios = 0;
let skippedScenarios = 0;
let totalSteps = 0;
let passedSteps = 0;
let failedSteps = 0;

const allTests = [];

reportData.forEach(feature => {
  feature.elements.forEach(scenario => {
    if (scenario.type === 'scenario') {
      totalScenarios++;
      let scenarioStatus = 'passed';
      let scenarioDuration = 0;
      let failureDetails = '';
      let endpoint = '';
      let method = '';
      let statusCode = '';
      
      scenario.steps.forEach(step => {
        totalSteps++;
        if (step.result) {
          scenarioDuration += step.result.duration || 0;
          
          if (step.result.status === 'passed') {
            passedSteps++;
          } else if (step.result.status === 'failed') {
            failedSteps++;
            scenarioStatus = 'failed';
            failureDetails = step.result.error_message || 'Unknown error';
            
            const endpointMatch = step.name.match(/"([^"]+)"/);
            if (endpointMatch) endpoint = endpointMatch[1];
            
            const methodMatch = step.name.match(/(GET|POST|PUT|DELETE|PATCH|OPTIONS)/i);
            if (methodMatch) method = methodMatch[0].toUpperCase();
            
            const statusMatch = failureDetails.match(/(\d{3})/);
            if (statusMatch) statusCode = statusMatch[0];
          } else if (step.result.status === 'undefined') {
            scenarioStatus = 'undefined';
            failureDetails = 'Step definition not implemented';
          } else if (step.result.status === 'skipped') {
            scenarioStatus = 'skipped';
          }
        }
      });
      
      if (scenarioStatus === 'passed') {
        passedScenarios++;
      } else if (scenarioStatus === 'failed') {
        failedScenarios++;
      } else if (scenarioStatus === 'undefined') {
        undefinedScenarios++;
      } else if (scenarioStatus === 'skipped') {
        skippedScenarios++;
      }
      
      allTests.push({
        feature: feature.name,
        scenario: scenario.name,
        status: scenarioStatus,
        duration: (scenarioDuration / 1000000000).toFixed(3),
        endpoint,
        method,
        statusCode,
        failureDetails: failureDetails.split('\n').slice(0, 2).join(' ').substring(0, 200)
      });
    }
  });
});

const passRate = ((passedScenarios / totalScenarios) * 100).toFixed(1);
const totalDuration = allTests.reduce((sum, t) => sum + parseFloat(t.duration), 0).toFixed(2);

// Categorize by API
const apiCategories = {};
allTests.forEach(test => {
  const category = test.feature.split('/')[0] || 'Other';
  if (!apiCategories[category]) {
    apiCategories[category] = { passed: 0, failed: 0, total: 0 };
  }
  apiCategories[category].total++;
  if (test.status === 'passed') {
    apiCategories[category].passed++;
  } else if (test.status === 'failed') {
    apiCategories[category].failed++;
  }
});

// Generate HTML - using exact format from user's comprehensive example
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Test Report - ${environment} - ${displayDateTime}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      color: #333;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }

    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .header p {
      font-size: 1.1em;
      opacity: 0.9;
    }

    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 40px;
      background: #f8f9fa;
    }

    .summary-card {
      background: white;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s;
    }

    .summary-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .summary-card h3 {
      font-size: 0.9em;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .summary-card .value {
      font-size: 2.5em;
      font-weight: bold;
      color: #333;
    }

    .summary-card.success .value {
      color: #28a745;
    }

    .summary-card.failed .value {
      color: #dc3545;
    }

    .summary-card.rate .value {
      color: #28a745;
    }

    .content {
      padding: 40px;
    }

    .section {
      margin-bottom: 40px;
    }

    .section h2 {
      font-size: 1.8em;
      margin-bottom: 20px;
      color: #667eea;
      border-bottom: 3px solid #667eea;
      padding-bottom: 10px;
    }

    .filters {
      margin-bottom: 20px;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 8px 16px;
      border: 2px solid #667eea;
      background: white;
      color: #667eea;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }

    .filter-btn:hover, .filter-btn.active {
      background: #667eea;
      color: white;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    thead {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    th {
      padding: 15px;
      text-align: left;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.85em;
      letter-spacing: 0.5px;
    }

    td {
      padding: 12px 15px;
      border-bottom: 1px solid #eee;
    }

    tr:hover {
      background: #f8f9fa;
    }

    .status-pass {
      color: #28a745;
      font-weight: bold;
    }

    .status-fail {
      color: #dc3545;
      font-weight: bold;
    }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85em;
      font-weight: 600;
    }

    .badge-success {
      background: #d4edda;
      color: #155724;
    }

    .badge-danger {
      background: #f8d7da;
      color: #721c24;
    }

    .badge-warning {
      background: #fff3cd;
      color: #856404;
    }

    .method {
      font-family: 'Courier New', monospace;
      font-weight: bold;
      font-size: 0.9em;
    }

    .method-get { color: #28a745; }
    .method-post { color: #007bff; }
    .method-put { color: #ffc107; }
    .method-delete { color: #dc3545; }
    .method-patch { color: #6f42c1; }
    .method-options { color: #17a2b8; }

    .endpoint {
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
      color: #666;
    }

    .error-details {
      font-size: 0.85em;
      color: #dc3545;
      font-family: monospace;
      max-width: 400px;
    }

    .footer {
      text-align: center;
      padding: 30px;
      background: #f8f9fa;
      color: #666;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1>API Test Report - ${environment} Environment</h1>
    <p>${displayDateTime} | Cucumber BDD Framework with Playwright</p>
  </div>

  <div class="summary">
    <div class="summary-card success">
      <h3>Total Scenarios</h3>
      <div class="value">${totalScenarios}</div>
    </div>
    <div class="summary-card success">
      <h3>Passed</h3>
      <div class="value">${passedScenarios}</div>
    </div>
    <div class="summary-card failed">
      <h3>Failed</h3>
      <div class="value">${failedScenarios}</div>
    </div>
    <div class="summary-card rate">
      <h3>Pass Rate</h3>
      <div class="value">${passRate}%</div>
    </div>
    <div class="summary-card">
      <h3>Duration</h3>
      <div class="value">${totalDuration}s</div>
    </div>
    <div class="summary-card">
      <h3>Total Steps</h3>
      <div class="value">${totalSteps}</div>
    </div>
  </div>

  <div class="content">
    
    <div class="section">
      <h2>📊 Test Results by API Category</h2>
      <table>
        <thead>
          <tr>
            <th>API Category</th>
            <th style="text-align: center;">Total</th>
            <th style="text-align: center;">Passed</th>
            <th style="text-align: center;">Failed</th>
            <th style="text-align: center;">Pass Rate</th>
          </tr>
        </thead>
        <tbody>
${Object.entries(apiCategories)
  .sort((a, b) => b[1].total - a[1].total)
  .map(([category, stats]) => {
    const catPassRate = ((stats.passed / stats.total) * 100).toFixed(1);
    return `
          <tr>
            <td><strong>${category}</strong></td>
            <td style="text-align: center;">${stats.total}</td>
            <td style="text-align: center;" class="status-pass">${stats.passed}</td>
            <td style="text-align: center;" class="status-fail">${stats.failed}</td>
            <td style="text-align: center;">${catPassRate}%</td>
          </tr>
`;
  }).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>📋 Detailed Test Results</h2>
      
      <div class="filters">
        <button class="filter-btn active" onclick="filterTests('all')">All Tests (${totalScenarios})</button>
        <button class="filter-btn" onclick="filterTests('passed')">Passed Only (${passedScenarios})</button>
        <button class="filter-btn" onclick="filterTests('failed')">Failed Only (${failedScenarios})</button>
      </div>

      <table id="resultsTable">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Scenario</th>
            <th>Status</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Status Code</th>
            <th>Duration (s)</th>
            <th>Error Details</th>
          </tr>
        </thead>
        <tbody>
${allTests.map(test => `
          <tr class="test-row" data-status="${test.status}">
            <td>${test.feature}</td>
            <td>${test.scenario}</td>
            <td>
              <span class="badge ${test.status === 'passed' ? 'badge-success' : test.status === 'failed' ? 'badge-danger' : 'badge-warning'}">
                ${test.status.toUpperCase()}
              </span>
            </td>
            <td>${test.method ? `<span class="method method-${test.method.toLowerCase()}">${test.method}</span>` : '-'}</td>
            <td><div class="endpoint">${test.endpoint || '-'}</div></td>
            <td style="text-align: center;">${test.statusCode || '-'}</td>
            <td style="text-align: center;">${test.duration}</td>
            <td><div class="error-details">${test.failureDetails || '-'}</div></td>
          </tr>
`).join('')}
        </tbody>
      </table>
    </div>

  </div>

  <div class="footer">
    <p><strong>Generated by API BDD Playwright Automation Framework</strong></p>
    <p>Environment: ${environment} | Execution Time: ${displayDateTime}</p>
    <p>Total Scenarios: ${totalScenarios} | Passed: ${passedScenarios} | Failed: ${failedScenarios} | Pass Rate: ${passRate}%</p>
  </div>

</div>

<script>
  function filterTests(status) {
    const rows = document.querySelectorAll('.test-row');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    rows.forEach(row => {
      if (status === 'all') {
        row.style.display = '';
      } else {
        row.style.display = row.dataset.status === status ? '' : 'none';
      }
    });
  }
</script>

</body>
</html>`;

// Write the report
const reportFileName = `API-Comprehensive-Report-${environment}-${dateStr}_${timeStr}.html`;
const reportFilePath = path.join(__dirname, 'reports', reportFileName);
fs.writeFileSync(reportFilePath, html);

console.log(`\n✅ Comprehensive API Report Generated!`);
console.log(`📄 File: ${reportFileName}`);
console.log(`📁 Location: ${reportFilePath}`);
console.log(`\n📊 Summary:`);
console.log(`   Total Scenarios: ${totalScenarios}`);
console.log(`   Passed: ${passedScenarios} (${passRate}%)`);
console.log(`   Failed: ${failedScenarios}`);
console.log(`   Total Duration: ${totalDuration}s`);
