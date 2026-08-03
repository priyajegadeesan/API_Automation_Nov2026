const fs = require('fs');
const path = require('path');

// Read the cucumber JSON report
const cucumberReportPath = path.join(__dirname, 'reports', 'cucumber-report.json');
const cucumberData = JSON.parse(fs.readFileSync(cucumberReportPath, 'utf8'));

// Process the test results
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let testDetails = [];

cucumberData.forEach(feature => {
  const featureName = feature.name;
  
  feature.elements.forEach(scenario => {
    totalTests++;
    const scenarioName = scenario.name;
    const scenarioSteps = scenario.steps || [];

    let passed = true;
    let scenarioDuration = 0;
    let endpoint = '';
    let method = '';
    let statusCode = '';
    let failureReason = '';

    scenarioSteps.forEach(step => {
      if (step.result) {
        scenarioDuration += step.result.duration || 0;
        
        if (step.result.status === 'failed') {
          passed = false;
          failureReason = step.result.error_message || '';
          
          // Extract actual status code from error message
          const statusMatch = failureReason.match(/actual\s*\n\s*-(\d+)/);
          if (statusMatch) {
            statusCode = statusMatch[1];
          }
        }
      }

      // Extract endpoint and method from step name
      if (step.name && step.name.includes('request to')) {
        const requestMatch = step.name.match(/send a (GET|POST|PUT|DELETE|PATCH) request to "([^"]+)"/);
        if (requestMatch) {
          method = requestMatch[1];
          endpoint = requestMatch[2];
        }
      }

      // Extract status code from step name for passed tests
      if (step.name && step.name.includes('status code should be')) {
        const codeMatch = step.name.match(/status code should be (\d+)/);
        if (codeMatch && passed) {
          statusCode = codeMatch[1];
        }
      }
    });

    if (passed) {
      passedTests++;
    } else {
      failedTests++;
    }

    // Determine test type based on feature name or tags
    let testType = 'API Test';
    if (featureName.includes('Pipeline')) testType = 'Pipeline';
    else if (featureName.includes('Registry')) testType = 'Registry';
    else if (featureName.includes('Task')) testType = 'Task';
    else if (featureName.includes('Global Parameter')) testType = 'Parameter';
    else if (featureName.includes('Group')) testType = 'Group';
    else if (featureName.includes('User')) testType = 'User Management';
    else if (featureName.includes('Project')) testType = 'Project';
    else if (featureName.includes('SCIM')) testType = 'SCIM';

    testDetails.push({
      feature: featureName,
      scenario: scenarioName,
      type: testType,
      method: method || 'N/A',
      endpoint: endpoint || 'N/A',
      statusCode: statusCode || (passed ? '200' : 'N/A'),
      duration: Math.round(scenarioDuration / 1000000), // Convert to ms
      result: passed ? 'PASS' : 'FAIL'
    });
  });
});

const successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(2) : '0.00';

// Get current date and time
const now = new Date();
const dateStr = now.toLocaleDateString('en-GB').replace(/\//g, '/');
const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

// Generate HTML in the exact format
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UAT Environment - API Test Report</title>
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
      color: ${successRate >= 90 ? '#28a745' : successRate >= 70 ? '#ffc107' : '#dc3545'};
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

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85em;
      font-weight: 600;
    }

    .badge-info {
      background: #d1ecf1;
      color: #0c5460;
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
    .method-patch { color: #17a2b8; }

    .endpoint {
      font-family: 'Courier New', monospace;
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 UAT Environment</h1>
      <p>API Test Report - ${dateStr}, ${timeStr}</p>
      <p>Date Range: All Tests</p>
    </div>

    <div class="summary">
      <div class="summary-card">
        <h3>Total Tests</h3>
        <div class="value">${totalTests}</div>
      </div>
      <div class="summary-card success">
        <h3>Passed</h3>
        <div class="value">${passedTests}</div>
      </div>
      <div class="summary-card failed">
        <h3>Failed</h3>
        <div class="value">${failedTests}</div>
      </div>
      <div class="summary-card rate">
        <h3>Success Rate</h3>
        <div class="value">${successRate}%</div>
      </div>
    </div>

    <div class="content">
      <div class="section">
        <h2>📋 Test Results</h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Type</th>
              <th>Scenario Name</th>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Feature</th>
              <th>Status</th>
              <th>Time</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${testDetails.map((test, index) => `
            <tr>
              <td>${index + 1}</td>
              <td><span class="badge badge-info">${test.type}</span></td>
              <td>${test.scenario}</td>
              <td><span class="method method-${test.method.toLowerCase()}">${test.method}</span></td>
              <td class="endpoint" title="${test.endpoint}">${test.endpoint}</td>
              <td style="font-size: 0.85em;">${test.feature}</td>
              <td>${test.statusCode}</td>
              <td>${test.duration}ms</td>
              <td class="${test.result === 'PASS' ? 'status-pass' : 'status-fail'}">${test.result === 'PASS' ? '✅ PASS' : '❌ FAIL'}</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer">
      <p>Generated by Opsera API BDD Test Automation Framework</p>
      <p>Environment: UAT | Total Tests: ${totalTests}</p>
    </div>
  </div>
</body>
</html>`;

// Write the HTML report
const dateFileName = now.toISOString().split('T')[0];
const timeFileName = now.toTimeString().split(' ')[0].replace(/:/g, '-');
const reportFileName = `API_uat-all-tests-${dateFileName}T${timeFileName}.html`;
const reportPath = path.join(__dirname, 'reports', reportFileName);
fs.writeFileSync(reportPath, html);

console.log(`\n✅ UAT Report generated successfully!`);
console.log(`📊 Report saved to: ${reportPath}`);
console.log(`\n📈 Test Summary:`);
console.log(`   Total Tests: ${totalTests}`);
console.log(`   Passed: ${passedTests}`);
console.log(`   Failed: ${failedTests}`);
console.log(`   Success Rate: ${successRate}%`);
