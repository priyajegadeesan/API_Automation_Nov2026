const fs = require('fs');
const path = require('path');

// Read the cucumber JSON report
const reportPath = path.join(__dirname, 'reports', 'cucumber-prod-report.json');
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
      } else if (step.name && step.name.includes('status code')) {
        const codeMatch = step.name.match(/(\d{3})/);
        if (codeMatch) statusCode = codeMatch[1];
      }
      
      if (step.result) {
        responseTime += (step.result.duration || 0) / 1000000; // Convert to ms
        
        if (step.result.status === 'failed' && step.result.error_message) {
          errorMessage = step.result.error_message.split('\n')[0]; // First line only
        }
      }
    });
    
    testResults.push({
      feature: feature.name || 'Unknown Feature',
      scenario: scenario.name,
      method: method,
      endpoint: endpoint,
      status: status,
      statusCode: statusCode || (status === 'passed' ? '200' : 'N/A'),
      responseTime: Math.round(responseTime),
      errorMessage: errorMessage
    });
  });
});

const successRate = ((passedTests / totalTests) * 100).toFixed(2);
const currentDate = new Date().toISOString().split('T')[0];
const currentTime = new Date().toLocaleString('en-US', { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric', 
  hour: '2-digit', 
  minute: '2-digit',
  hour12: false 
});

// Generate HTML report
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Experience - API Test Report (PROD)</title>
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
      color: ${successRate >= 70 ? '#28a745' : successRate >= 50 ? '#ffc107' : '#dc3545'};
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

    .badge-success {
      background: #d4edda;
      color: #155724;
    }

    .badge-danger {
      background: #f8d7da;
      color: #721c24;
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
    }

    .error-message {
      color: #dc3545;
      font-size: 0.8em;
      font-style: italic;
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .footer {
      background: #f8f9fa;
      padding: 20px 40px;
      text-align: center;
      color: #666;
      font-size: 0.9em;
    }

    .filter-buttons {
      margin-bottom: 20px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      background: #667eea;
      color: white;
      cursor: pointer;
      font-size: 0.9em;
      transition: background 0.2s;
    }

    .filter-btn:hover {
      background: #5568d3;
    }

    .filter-btn.active {
      background: #764ba2;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 API Test Report - PROD Environment</h1>
      <p>Generated on ${currentTime}</p>
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
        <h2>📊 Test Results Summary</h2>
        <div class="filter-buttons">
          <button class="filter-btn active" onclick="filterResults('all')">All (${totalTests})</button>
          <button class="filter-btn" onclick="filterResults('passed')">Passed (${passedTests})</button>
          <button class="filter-btn" onclick="filterResults('failed')">Failed (${failedTests})</button>
        </div>
        <table id="resultsTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Feature</th>
              <th>Scenario</th>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Status</th>
              <th>Status Code</th>
              <th>Response Time (ms)</th>
            </tr>
          </thead>
          <tbody>
            ${testResults.map((test, index) => `
            <tr class="test-row" data-status="${test.status}">
              <td>${index + 1}</td>
              <td>${test.feature}</td>
              <td>${test.scenario}</td>
              <td><span class="method method-${test.method.toLowerCase()}">${test.method}</span></td>
              <td><span class="endpoint">${test.endpoint}</span></td>
              <td>
                <span class="badge ${test.status === 'passed' ? 'badge-success' : 'badge-danger'}">
                  ${test.status.toUpperCase()}
                </span>
              </td>
              <td>${test.statusCode}</td>
              <td>${test.responseTime}</td>
            </tr>
            ${test.errorMessage ? `
            <tr class="test-row" data-status="${test.status}">
              <td colspan="8">
                <div class="error-message">Error: ${test.errorMessage}</div>
              </td>
            </tr>
            ` : ''}
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>📈 Test Categories Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total</th>
              <th>Passed</th>
              <th>Failed</th>
              <th>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            ${generateCategoryBreakdown(testResults)}
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer">
      <p>Generated by API BDD Playwright Framework</p>
      <p>Environment: PROD | Date: ${currentDate}</p>
    </div>
  </div>

  <script>
    function filterResults(status) {
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

function generateCategoryBreakdown(results) {
  const categories = {};
  
  results.forEach(test => {
    const category = test.feature;
    if (!categories[category]) {
      categories[category] = { total: 0, passed: 0, failed: 0 };
    }
    categories[category].total++;
    if (test.status === 'passed') {
      categories[category].passed++;
    } else {
      categories[category].failed++;
    }
  });
  
  return Object.keys(categories).map(cat => {
    const data = categories[cat];
    const rate = ((data.passed / data.total) * 100).toFixed(2);
    return `
      <tr>
        <td>${cat}</td>
        <td>${data.total}</td>
        <td class="status-pass">${data.passed}</td>
        <td class="status-fail">${data.failed}</td>
        <td>
          <span class="badge ${rate >= 70 ? 'badge-success' : rate >= 50 ? 'badge-warning' : 'badge-danger'}">
            ${rate}%
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// Write HTML report
const outputPath = path.join(__dirname, 'reports', `API_PROD_Report_${new Date().toISOString().split('T')[0]}.html`);
fs.writeFileSync(outputPath, html);

console.log(`\n✅ Report generated successfully!`);
console.log(`📄 Report location: ${outputPath}`);
console.log(`\n📊 Test Summary:`);
console.log(`   Total Tests: ${totalTests}`);
console.log(`   Passed: ${passedTests}`);
console.log(`   Failed: ${failedTests}`);
console.log(`   Success Rate: ${successRate}%`);
