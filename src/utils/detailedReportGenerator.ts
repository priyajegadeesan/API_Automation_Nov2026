import * as fs from 'fs';
import * as path from 'path';

interface CucumberStep {
  keyword: string;
  name: string;
  result: {
    status: string;
    duration?: number;
    error_message?: string;
  };
}

interface CucumberScenario {
  name: string;
  steps: CucumberStep[];
  tags?: Array<{ name: string }>;
}

interface CucumberFeature {
  name: string;
  uri: string;
  elements: CucumberScenario[];
}

interface ReportRow {
  featureFile: string;
  featureName: string;
  scenarioName: string;
  endpoint: string;
  method: string;
  expectedStatusCode: string;
  actualStatusCode: string;
  status: string;
  duration: string;
  errorMessage?: string;
}

function extractEndpointDetails(steps: CucumberStep[]): { endpoint: string; method: string; expectedStatusCode: string; actualStatusCode: string } {
  let endpoint = 'N/A';
  let method = 'N/A';
  let expectedStatusCode = 'N/A';
  let actualStatusCode = 'N/A';

  for (const step of steps) {
    // Extract HTTP method and endpoint
    if (step.keyword.trim() === 'When' && step.name.includes('send a')) {
      const methodMatch = step.name.match(/send a (GET|POST|PUT|PATCH|DELETE|OPTIONS) request/i);
      if (methodMatch) {
        method = methodMatch[1].toUpperCase();
      }

      // Extract endpoint from step name
      const endpointMatch = step.name.match(/to ["']([^"']+)["']/);
      if (endpointMatch) {
        endpoint = endpointMatch[1];
      } else {
        // Try to extract from other patterns
        const altMatch = step.name.match(/request to ([^\s]+)/);
        if (altMatch) {
          endpoint = altMatch[1];
        }
      }
    }

    // Extract expected status code
    if (step.keyword.trim() === 'Then' && step.name.includes('status code should be')) {
      const statusMatch = step.name.match(/status code should be (\d+)/);
      if (statusMatch) {
        expectedStatusCode = statusMatch[1];
      }
      
      // Extract actual status code from error message if step failed
      if (step.result.status === 'failed' && step.result.error_message) {
        // Try to extract actual status code from error message
        const actualStatusMatch = step.result.error_message.match(/(?:status|code|received|actual).*?(\d{3})/i);
        if (actualStatusMatch) {
          actualStatusCode = actualStatusMatch[1];
        } else {
          // Try another pattern
          const altStatusMatch = step.result.error_message.match(/(\d{3})/);
          if (altStatusMatch) {
            actualStatusCode = altStatusMatch[1];
          }
        }
      } else if (step.result.status === 'passed') {
        // If passed, actual status code matches expected
        actualStatusCode = expectedStatusCode;
      }
    }
  }

  return { endpoint, method, expectedStatusCode, actualStatusCode };
}

function generateDetailedReport() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('.')[0];
  const reportJsonPath = path.join(process.cwd(), 'reports', 'cucumber-report.json');

  if (!fs.existsSync(reportJsonPath)) {
    console.error('Cucumber JSON report not found at:', reportJsonPath);
    return;
  }

  const cucumberData: CucumberFeature[] = JSON.parse(fs.readFileSync(reportJsonPath, 'utf-8'));

  const reportRows: ReportRow[] = [];
  let totalScenarios = 0;
  let passedScenarios = 0;
  let failedScenarios = 0;

  cucumberData.forEach((feature) => {
    const featureFileName = path.basename(feature.uri);

    feature.elements.forEach((scenario) => {
      if (scenario.steps && scenario.steps.length > 0) {
        totalScenarios++;
        
        const { endpoint, method, expectedStatusCode, actualStatusCode } = extractEndpointDetails(scenario.steps);

        // Determine scenario status
        const failedStep = scenario.steps.find((step) => step.result.status !== 'passed');
        const scenarioStatus = failedStep ? 'FAILED' : 'PASSED';
        
        if (scenarioStatus === 'PASSED') {
          passedScenarios++;
        } else {
          failedScenarios++;
        }

        // Calculate total duration
        const totalDuration = scenario.steps.reduce((sum, step) => {
          return sum + (step.result.duration || 0);
        }, 0);
        const durationInSeconds = (totalDuration / 1_000_000_000).toFixed(2);

        reportRows.push({
          featureFile: featureFileName,
          featureName: feature.name,
          scenarioName: scenario.name,
          endpoint: endpoint,
          method: method,
          expectedStatusCode: expectedStatusCode,
          actualStatusCode: actualStatusCode,
          status: scenarioStatus,
          duration: `${durationInSeconds}s`,
          errorMessage: failedStep?.result.error_message,
        });
      }
    });
  });

  // Generate Markdown Report
  const markdownReport = generateMarkdownReport(reportRows, totalScenarios, passedScenarios, failedScenarios, timestamp);
  const markdownPath = path.join(process.cwd(), 'reports', `UAT_DETAILED_REPORT_${timestamp}.md`);
  fs.writeFileSync(markdownPath, markdownReport);
  console.log(`\n✅ Detailed Markdown Report generated: ${markdownPath}`);

  // Generate CSV Report
  const csvReport = generateCSVReport(reportRows);
  const csvPath = path.join(process.cwd(), 'reports', `UAT_DETAILED_REPORT_${timestamp}.csv`);
  fs.writeFileSync(csvPath, csvReport);
  console.log(`✅ CSV Report generated: ${csvPath}`);

  // Generate HTML Summary
  const htmlReport = generateHTMLReport(reportRows, totalScenarios, passedScenarios, failedScenarios, timestamp);
  const htmlPath = path.join(process.cwd(), 'reports', `UAT_DETAILED_REPORT_${timestamp}.html`);
  fs.writeFileSync(htmlPath, htmlReport);
  console.log(`✅ HTML Report generated: ${htmlPath}\n`);

  // Print summary to console
  console.log('='.repeat(80));
  console.log('TEST EXECUTION SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Scenarios: ${totalScenarios}`);
  console.log(`Passed: ${passedScenarios} (${((passedScenarios / totalScenarios) * 100).toFixed(2)}%)`);
  console.log(`Failed: ${failedScenarios} (${((failedScenarios / totalScenarios) * 100).toFixed(2)}%)`);
  console.log('='.repeat(80));
}

function generateMarkdownReport(rows: ReportRow[], total: number, passed: number, failed: number, timestamp: string): string {
  const passRate = ((passed / total) * 100).toFixed(2);

  let markdown = `# UAT Environment - Detailed Test Execution Report\n\n`;
  markdown += `**Execution Date & Time:** ${new Date().toLocaleString()}\n\n`;
  markdown += `**Environment:** UAT\n\n`;
  markdown += `## Summary\n\n`;
  markdown += `| Metric | Count | Percentage |\n`;
  markdown += `|--------|-------|------------|\n`;
  markdown += `| Total Scenarios | ${total} | 100% |\n`;
  markdown += `| Passed | ${passed} | ${passRate}% |\n`;
  markdown += `| Failed | ${failed} | ${(100 - parseFloat(passRate)).toFixed(2)}% |\n\n`;

  markdown += `## Detailed Test Results\n\n`;
  markdown += `| # | Feature Title | Method | Expected Status Code | Actual Status Code | Duration | Result |\n`;
  markdown += `|---|---------------|--------|---------------------|-------------------|----------|--------|\n`;

  rows.forEach((row, index) => {
    const statusIcon = row.status === 'PASSED' ? '✅' : '❌';
    markdown += `| ${index + 1} | ${row.featureName} | ${row.method} | ${row.expectedStatusCode} | ${row.actualStatusCode} | ${row.duration} | ${statusIcon} |\n`;
  });

  if (failed > 0) {
    markdown += `\n## Failed Features Details\n\n`;
    const failedRows = rows.filter((r) => r.status === 'FAILED');
    failedRows.forEach((row, index) => {
      markdown += `### ${index + 1}. ${row.featureName}\n\n`;
      markdown += `- **File:** ${row.featureFile}\n`;
      markdown += `- **Method:** ${row.method}\n`;
      markdown += `- **Expected Status Code:** ${row.expectedStatusCode}\n`;
      markdown += `- **Actual Status Code:** ${row.actualStatusCode}\n`;
      if (row.errorMessage) {
        markdown += `- **Error:** \`\`\`\n${row.errorMessage}\n\`\`\`\n`;
      }
      markdown += `\n`;
    });
  }

  return markdown;
}

function generateCSVReport(rows: ReportRow[]): string {
  let csv = 'Feature Title,HTTP Method,Expected Status Code,Actual Status Code,Duration,Result\n';

  rows.forEach((row) => {
    const resultIcon = row.status === 'PASSED' ? 'PASS' : 'FAIL';
    csv += `"${row.featureName}","${row.method}","${row.expectedStatusCode}","${row.actualStatusCode}","${row.duration}","${resultIcon}"\n`;
  });

  return csv;
}

function generateHTMLReport(rows: ReportRow[], total: number, passed: number, failed: number, timestamp: string): string {
  const passRate = ((passed / total) * 100).toFixed(2);
  const failRate = (100 - parseFloat(passRate)).toFixed(2);

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UAT Test Execution Report - ${timestamp}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1400px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
    .summary { display: flex; gap: 20px; margin: 20px 0; }
    .summary-card { flex: 1; padding: 20px; border-radius: 8px; text-align: center; }
    .total { background: #2196F3; color: white; }
    .passed { background: #4CAF50; color: white; }
    .failed { background: #f44336; color: white; }
    .summary-card h2 { margin: 0; font-size: 2.5em; }
    .summary-card p { margin: 5px 0; font-size: 1.1em; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { background: #333; color: white; padding: 12px; text-align: left; position: sticky; top: 0; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    tr:hover { background: #f5f5f5; }
    .passed-row { background: #e8f5e9; }
    .failed-row { background: #ffebee; }
    .status-badge { padding: 5px 10px; border-radius: 4px; font-weight: bold; display: inline-block; }
    .status-passed { background: #4CAF50; color: white; }
    .status-failed { background: #f44336; color: white; }
    .method-get { color: #2196F3; font-weight: bold; }
    .method-post { color: #4CAF50; font-weight: bold; }
    .method-put { color: #FF9800; font-weight: bold; }
    .method-patch { color: #9C27B0; font-weight: bold; }
    .method-delete { color: #f44336; font-weight: bold; }
    .timestamp { color: #666; font-size: 0.9em; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 UAT Environment - Detailed Test Execution Report</h1>
    <p><strong>Execution Date & Time:</strong> ${new Date().toLocaleString()}</p>
    <p><strong>Environment:</strong> UAT</p>
    
    <div class="summary">
      <div class="summary-card total">
        <h2>${total}</h2>
        <p>Total Scenarios</p>
      </div>
      <div class="summary-card passed">
        <h2>${passed}</h2>
        <p>Passed (${passRate}%)</p>
      </div>
      <div class="summary-card failed">
        <h2>${failed}</h2>
        <p>Failed (${failRate}%)</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Feature Title</th>
          <th>Method</th>
          <th>Expected Status Code</th>
          <th>Actual Status Code</th>
          <th>Duration</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>`;

  rows.forEach((row, index) => {
    const rowClass = row.status === 'PASSED' ? 'passed-row' : 'failed-row';
    const statusBadge = row.status === 'PASSED' ? 'status-passed' : 'status-failed';
    const methodClass = `method-${row.method.toLowerCase()}`;
    const statusIcon = row.status === 'PASSED' ? '✅' : '❌';

    html += `
        <tr class="${rowClass}">
          <td>${index + 1}</td>
          <td>${row.featureName}</td>
          <td class="${methodClass}">${row.method}</td>
          <td>${row.expectedStatusCode}</td>
          <td>${row.actualStatusCode}</td>
          <td>${row.duration}</td>
          <td><span class="status-badge ${statusBadge}">${statusIcon} ${row.status}</span></td>
        </tr>`;
  });

  html += `
      </tbody>
    </table>
    
    <div class="timestamp">
      Report generated on ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>`;

  return html;
}

// Execute the report generation
generateDetailedReport();
