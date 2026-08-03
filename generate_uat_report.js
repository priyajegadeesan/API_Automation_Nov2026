const fs = require('fs');
const path = require('path');

// Read the cucumber JSON report
const reportPath = path.join(__dirname, 'reports', 'cucumber-uat-report.json');
const cucumberData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Parse test results
const testResults = [];
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

cucumberData.forEach(feature => {
  feature.elements.forEach(scenario => {
    totalTests++;
    
    // Determine scenario status
    const failedStep = scenario.steps.find(step => step.result && step.result.status === 'failed');
    const status = failedStep ? 'failed' : 'passed';
    
    if (status === 'passed') {
      passedTests++;
    } else {
      failedTests++;
    }
    
    // Extract request details from steps
    let method = 'GET';
    let endpoint = '';
    let statusCode = '';
    let responseTime = 0;
    let errorMessage = '';
    
    scenario.steps.forEach(step => {
      if (step.name && step.name.includes('GET request')) {
        method = 'GET';
        const match = step.name.match(/"([^"]+)"/);
        if (match) endpoint = match[1];
      } else if (step.name && step.name.includes('POST request')) {
        method = 'POST';
        const match = step.name.match(/"([^"]+)"/);
        if (match) endpoint = match[1];
      } else if (step.name && step.name.includes('PUT request')) {
        method = 'PUT';
        const match = step.name.match(/"([^"]+)"/);
        if (match) endpoint = match[1];
      } else if (step.name && step.name.includes('DELETE request')) {
        method = 'DELETE';
        const match = step.name.match(/"([^"]+)"/);
        if (match) endpoint = match[1];
      } else if (step.name && step.name.includes('PATCH request')) {
        method = 'PATCH';
        const match = step.name.match(/"([^"]+)"/);
        if (match) endpoint = match[1];
      }
      
      if (step.name && step.name.includes('status code should be')) {
        const codeMatch = step.name.match(/(\d{3})/);
        if (codeMatch) statusCode = codeMatch[1];
      }
      
      if (step.result && step.result.duration) {
        responseTime += step.result.duration / 1000000; // Convert nanoseconds to milliseconds
      }
      
      if (step.result && step.result.status === 'failed' && step.result.error_message) {
        errorMessage = step.result.error_message.split('\n')[0]; // First line only
      }
    });
    
    testResults.push({
      feature: feature.name,
      scenario: scenario.name,
      method: method,
      endpoint: endpoint,
      statusCode: statusCode || (status === 'passed' ? '200' : '500'),
      status: status,
      responseTime: Math.round(responseTime),
      errorMessage: errorMessage,
      featureFile: feature.uri || ''
    });
  });
});

const successRate = ((passedTests / totalTests) * 100).toFixed(2);

// Group by feature for category summary
const categories = {};
testResults.forEach(test => {
  if (!categories[test.feature]) {
    categories[test.feature] = { total: 0, passed: 0, failed: 0 };
  }
  categories[test.feature].total++;
  if (test.status === 'passed') {
    categories[test.feature].passed++;
  } else {
    categories[test.feature].failed++;
  }
});

// Generate HTML report
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Experience - API Test Report (UAT)</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .header p {
      font-size: 16px;
      opacity: 0.9;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      padding: 30px;
      background: #f8f9fa;
    }
    .summary-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      text-align: center;
    }
    .summary-card h3 {
      color: #666;
      font-size: 14px;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .summary-card .value {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .summary-card .label {
      color: #999;
      font-size: 12px;
    }
    .total { color: #667eea; }
    .passed { color: #10b981; }
    .failed { color: #ef4444; }
    .success-rate { color: #f59e0b; }
    .filters {
      padding: 20px 30px;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      align-items: center;
    }
    .filter-btn {
      padding: 8px 16px;
      border: 1px solid #d1d5db;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .filter-btn:hover {
      background: #f3f4f6;
    }
    .filter-btn.active {
      background: #667eea;
      color: white;
      border-color: #667eea;
    }
    .table-container {
      padding: 30px;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead {
      background: #f8f9fa;
    }
    th {
      padding: 12px;
      text-align: left;
      font-size: 13px;
      color: #666;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #e5e7eb;
    }
    td {
      padding: 12px;
      font-size: 14px;
      border-bottom: 1px solid #f3f4f6;
    }
    tr:hover {
      background: #f9fafb;
    }
    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }
    .status-passed {
      background: #d1fae5;
      color: #065f46;
    }
    .status-failed {
      background: #fee2e2;
      color: #991b1b;
    }
    .method-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      display: inline-block;
      font-family: 'Courier New', monospace;
    }
    .method-get { background: #dbeafe; color: #1e40af; }
    .method-post { background: #d1fae5; color: #065f46; }
    .method-put { background: #fef3c7; color: #92400e; }
    .method-delete { background: #fee2e2; color: #991b1b; }
    .method-patch { background: #e0e7ff; color: #3730a3; }
    .error-message {
      color: #dc2626;
      font-size: 12px;
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Developer Experience - API Test Report</h1>
      <p>Environment: UAT | Generated: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Total Tests</h3>
        <div class="value total">${totalTests}</div>
        <div class="label">Test Scenarios</div>
      </div>
      <div class="summary-card">
        <h3>Passed</h3>
        <div class="value passed">${passedTests}</div>
        <div class="label">Successful</div>
      </div>
      <div class="summary-card">
        <h3>Failed</h3>
        <div class="value failed">${failedTests}</div>
        <div class="label">Need Attention</div>
      </div>
      <div class="summary-card">
        <h3>Success Rate</h3>
        <div class="value success-rate">${successRate}%</div>
        <div class="label">Pass Rate</div>
      </div>
    </div>
    
    <div class="filters">
      <button class="filter-btn active" onclick="filterTests('all')">All (${totalTests})</button>
      <button class="filter-btn" onclick="filterTests('passed')">✅ Passed (${passedTests})</button>
      <button class="filter-btn" onclick="filterTests('failed')">❌ Failed (${failedTests})</button>
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Scenario</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Status Code</th>
            <th>Status</th>
            <th>Response Time</th>
            <th>Error Message</th>
          </tr>
        </thead>
        <tbody id="testResultsBody">
          ${testResults.map(test => `
            <tr class="test-row" data-status="${test.status}">
              <td><strong>${test.feature}</strong></td>
              <td>${test.scenario}</td>
              <td><span class="method-badge method-${test.method.toLowerCase()}">${test.method}</span></td>
              <td><code>${test.endpoint}</code></td>
              <td>${test.statusCode}</td>
              <td><span class="status-badge status-${test.status}">${test.status.toUpperCase()}</span></td>
              <td>${test.responseTime}ms</td>
              <td><span class="error-message">${test.errorMessage || '-'}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  
  <script>
    function filterTests(filter) {
      const rows = document.querySelectorAll('.test-row');
      const buttons = document.querySelectorAll('.filter-btn');
      
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      rows.forEach(row => {
        if (filter === 'all' || row.dataset.status === filter) {
          row.classList.remove('hidden');
        } else {
          row.classList.add('hidden');
        }
      });
    }
  </script>
</body>
</html>`;

// Write HTML report
const outputPath = path.join(__dirname, 'reports', `API_UAT_Report_${new Date().toISOString().split('T')[0]}.html`);
fs.writeFileSync(outputPath, html);

console.log('\n✅ Report generated successfully!');
console.log(`📄 Report location: ${outputPath}`);
console.log(`\n📊 Test Summary:`);
console.log(`   Total Tests: ${totalTests}`);
console.log(`   Passed: ${passedTests}`);
console.log(`   Failed: ${failedTests}`);
console.log(`   Success Rate: ${successRate}%\n`);
