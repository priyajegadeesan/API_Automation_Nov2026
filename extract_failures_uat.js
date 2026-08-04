const fs = require('fs');
const path = require('path');

// Read the cucumber JSON report
const reportPath = path.join(__dirname, 'reports', 'cucumber-uat-report.json');
const cucumberData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Parse test results
const failed = [];
let totalTests = 0;
let passedTests = 0;

cucumberData.forEach(feature => {
  feature.elements.forEach(scenario => {
    totalTests++;
    const hasFailed = scenario.steps.some(step => step.result && step.result.status === 'failed');
    
    if (hasFailed) {
      failed.push({
        feature: feature.name,
        scenario: scenario.name,
        file: feature.uri
      });
    } else {
      passedTests++;
    }
  });
});

console.log('\n========== TEST EXECUTION SUMMARY ==========\n');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failed.length}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(2)}%`);

console.log('\n========== FAILED TESTS DETAILS ==========\n');
failed.forEach((item, idx) => {
  console.log(`${idx + 1}. ${item.file}`);
  console.log(`   Feature: ${item.feature}`);
  console.log(`   Scenario: ${item.scenario}\n`);
});

const uniqueFiles = [...new Set(failed.map(f => f.file))];
console.log(`\n========== UNIQUE FAILED FILES (${uniqueFiles.length}) ==========\n`);
uniqueFiles.forEach((file, idx) => {
  console.log(`${idx + 1}. ${file}`);
});

// Save to text file
const outputPath = path.join(__dirname, 'reports', 'failed_features_uat.txt');
fs.writeFileSync(outputPath, uniqueFiles.join('\n'), 'utf8');
console.log(`\n✅ Failed files list saved to: ${outputPath}`);
