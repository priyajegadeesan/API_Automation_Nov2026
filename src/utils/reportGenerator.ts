const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const reportsDir = path.join(process.cwd(), 'reports');
const jsonReportPath = path.join(reportsDir, 'cucumber-report.json');

if (fs.existsSync(jsonReportPath)) {
  report.generate({
    jsonDir: reportsDir,
    reportPath: path.join(reportsDir, 'html'),
    metadata: {
      browser: {
        name: 'API Tests',
        version: '1.0',
      },
      device: 'Local Machine',
      platform: {
        name: process.platform,
        version: process.version,
      },
    },
    customData: {
      title: 'API Automation Test Results',
      data: [
        { label: 'Project', value: 'API BDD Playwright' },
        { label: 'Release', value: '1.0.0' },
        { label: 'Execution Date', value: new Date().toLocaleString() },
      ],
    },
  });

  console.log('HTML Report generated successfully!');
} else {
  console.log('No JSON report found to generate HTML report.');
}
