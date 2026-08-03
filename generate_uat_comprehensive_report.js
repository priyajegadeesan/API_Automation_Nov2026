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
  duration: 0,
  features: [],
  scenarios: []
};

cucumberReport.forEach(feature => {
  const featureStats = {
    name: feature.name,
    uri: feature.uri,
    scenarios: [],
    passed: 0,
    failed: 0,
    total: 0
  };

  feature.elements.forEach(scenario => {
    stats.total++;
    featureStats.total++;
    
    let scenarioStatus = 'passed';
    let scenarioSteps = [];
    let scenarioDuration = 0;
    let failureMessage = '';

    scenario.steps.forEach(step => {
      const stepDuration = step.result.duration || 0;
      scenarioDuration += stepDuration;
      
      scenarioSteps.push({
        keyword: step.keyword,
        name: step.name,
        status: step.result.status,
        duration: stepDuration / 1000000, // Convert to ms
        errorMessage: step.result.error_message
      });

      if (step.result.status === 'failed') {
        scenarioStatus = 'failed';
        failureMessage = step.result.error_message || 'Unknown error';
      } else if (step.result.status === 'skipped' && scenarioStatus !== 'failed') {
        scenarioStatus = 'skipped';
      }
    });

    stats.duration += scenarioDuration;

    const scenarioInfo = {
      name: scenario.name,
      status: scenarioStatus,
      duration: scenarioDuration / 1000000, // Convert to ms
      steps: scenarioSteps,
      failureMessage
    };

    if (scenarioStatus === 'passed') {
      stats.passed++;
      featureStats.passed++;
    } else if (scenarioStatus === 'failed') {
      stats.failed++;
      featureStats.failed++;
    } else {
      stats.skipped++;
    }

    featureStats.scenarios.push(scenarioInfo);
    stats.scenarios.push({
      ...scenarioInfo,
      feature: feature.name
    });
  });

  stats.features.push(featureStats);
});

const totalDurationSeconds = stats.duration / 1000000000;

// Generate feature rows
let featureRows = '';
stats.features.forEach((feature, index) => {
  const passRate = feature.total > 0 ? ((feature.passed / feature.total) * 100).toFixed(1) : 0;
  const statusClass = passRate >= 90 ? 'status-pass' : passRate >= 50 ? 'status-warn' : 'status-fail';
  
  featureRows += `
          <tr>
            <td>${index + 1}</td>
            <td><strong>${feature.name}</strong></td>
            <td>${feature.total}</td>
            <td class="status-pass">${feature.passed}</td>
            <td class="status-fail">${feature.failed}</td>
            <td><span class="badge ${passRate >= 90 ? 'badge-success' : passRate >= 50 ? 'badge-warning' : 'badge-danger'}">${passRate}%</span></td>
          </tr>`;
});

// Generate failed scenario rows
let failedRows = '';
stats.scenarios.filter(s => s.status === 'failed').slice(0, 50).forEach((scenario, index) => {
  const requestStep = scenario.steps.find(s => s.name && s.name.includes('request to'));
  const endpoint = requestStep?.name.match(/to "([^"]+)"/)?.[1] || 'N/A';
  const method = requestStep?.name.match(/send a (\w+)/i)?.[1] || 'GET';
  const statusCode = scenario.failureMessage?.match(/Response status: (\d+)/)?.[1] || scenario.failureMessage?.match(/expected.*actual\s+(\d+)/s)?.[1] || '500';
  
  failedRows += `
          <tr>
            <td>${index + 1}</td>
            <td>${scenario.feature.substring(0, 60)}</td>
            <td>${scenario.name.substring(0, 80)}</td>
            <td><span class="method method-${method.toLowerCase()}">${method}</span></td>
            <td class="endpoint">${endpoint}</td>
            <td><span class="badge badge-danger">${statusCode}</span></td>
            <td class="error-msg">${scenario.failureMessage?.substring(0, 150) || 'Unknown error'}</td>
          </tr>`;
});

const now = new Date();
const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
const filename = `API_uat-all-tests-${now.toISOString().split('T')[0]}T${now.toTimeString().split(' ')[0].replace(/:/g, '-')}.html`;

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UAT API Test Report - All Tests</title>
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
      max-width: 1600px;
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
      color: ${((stats.passed/stats.total)*100) >= 70 ? '#28a745' : '#dc3545'};
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

    .status-warn {
      color: #ffc107;
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

    .badge-info {
      background: #d1ecf1;
      color: #0c5460;
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

    .endpoint {
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
      color: #666;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .error-msg {
      font-size: 0.85em;
      color: #666;
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 0.9em;
    }

    .chart-container {
      margin: 30px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1>UAT API Test Report</h1>
    <p>Comprehensive Test Results | ${formattedDate} at ${formattedTime}</p>
    <p>Environment: UAT (api.opsera-uat.opsera.io) | Cucumber BDD + Playwright</p>
  </div>

  <div class="summary">
    <div class="summary-card">
      <h3>Total Tests</h3>
      <div class="value">${stats.total}</div>
    </div>
    <div class="summary-card success">
      <h3>Passed</h3>
      <div class="value">${stats.passed}</div>
    </div>
    <div class="summary-card failed">
      <h3>Failed</h3>
      <div class="value">${stats.failed}</div>
    </div>
    <div class="summary-card rate">
      <h3>Pass Rate</h3>
      <div class="value">${((stats.passed/stats.total)*100).toFixed(1)}%</div>
    </div>
    <div class="summary-card">
      <h3>Duration</h3>
      <div class="value">${(totalDurationSeconds / 60).toFixed(1)}m</div>
    </div>
  </div>

  <div class="content">
    
    <div class="section">
      <h2>📊 Feature Summary</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Feature Name</th>
            <th>Total</th>
            <th>Passed</th>
            <th>Failed</th>
            <th>Pass Rate</th>
          </tr>
        </thead>
        <tbody>
${featureRows}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>❌ Failed Scenarios (Top 50)</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Feature</th>
            <th>Scenario</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Error Message</th>
          </tr>
        </thead>
        <tbody>
${failedRows}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>📈 Key Metrics</h2>
      <div class="chart-container">
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Total Test Scenarios</strong></td>
              <td><span class="badge badge-info">${stats.total}</span></td>
              <td>All API test scenarios executed</td>
            </tr>
            <tr>
              <td><strong>Success Rate</strong></td>
              <td><span class="badge ${((stats.passed/stats.total)*100) >= 70 ? 'badge-success' : 'badge-danger'}">${((stats.passed/stats.total)*100).toFixed(1)}%</span></td>
              <td>${stats.passed} passed out of ${stats.total} tests</td>
            </tr>
            <tr>
              <td><strong>Failure Rate</strong></td>
              <td><span class="badge badge-danger">${((stats.failed/stats.total)*100).toFixed(1)}%</span></td>
              <td>${stats.failed} failed scenarios requiring attention</td>
            </tr>
            <tr>
              <td><strong>Execution Time</strong></td>
              <td><span class="badge badge-info">${(totalDurationSeconds / 60).toFixed(1)} min</span></td>
              <td>Total time for all ${stats.total} tests</td>
            </tr>
            <tr>
              <td><strong>Average Test Duration</strong></td>
              <td><span class="badge badge-info">${(totalDurationSeconds / stats.total).toFixed(2)}s</span></td>
              <td>Mean execution time per test</td>
            </tr>
            <tr>
              <td><strong>Test Coverage</strong></td>
              <td><span class="badge badge-success">${stats.features.length} Features</span></td>
              <td>API modules covered by automated tests</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

  <div class="footer">
    <p><strong>Generated by Opsera API BDD Test Automation Framework</strong></p>
    <p>Report created on ${formattedDate} at ${formattedTime} | Environment: UAT</p>
    <p>Powered by Cucumber BDD + Playwright | Node.js v24.15.0</p>
  </div>

</div>
</body>
</html>`;

// Write HTML file
fs.writeFileSync(path.join(__dirname, 'reports', filename), html);

console.log('\n✅ Custom UAT Comprehensive Report Generated!');
console.log(`📄 File: ${filename}`);
console.log(`📁 Location: ${path.join(__dirname, 'reports', filename)}`);
console.log(`\n📊 Summary:`);
console.log(`   Total Scenarios: ${stats.total}`);
console.log(`   Passed: ${stats.passed} (${((stats.passed/stats.total)*100).toFixed(1)}%)`);
console.log(`   Failed: ${stats.failed}`);
console.log(`   Duration: ${(totalDurationSeconds / 60).toFixed(1)} minutes`);
console.log(`   Features: ${stats.features.length}`);
