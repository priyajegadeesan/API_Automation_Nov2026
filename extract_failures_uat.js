const fs = require('fs');

const reportPath = 'reports/cucumber-uat-report.json';
const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

const failedFeatures = new Set();

data.forEach(feature => {
  feature.elements.forEach(scenario => {
    const hasFailed = scenario.steps.some(step => step.result && step.result.status === 'failed');
    if (hasFailed) {
      failedFeatures.add(feature.uri || feature.name);
    }
  });
});

const sortedFailures = Array.from(failedFeatures).sort();

const outputPath = 'reports/failed_features_uat.txt';
const output = `Total Failing Feature Files: ${sortedFailures.length}\n\n${'='.repeat(80)}\n\n${sortedFailures.join('\n')}`;

fs.writeFileSync(outputPath, output, 'utf8');

console.log(`\n✅ Failed features list saved to: ${outputPath}`);
console.log(`\n📋 Total Failing Feature Files: ${sortedFailures.length}\n`);
console.log('Failed Feature Files:');
console.log('='.repeat(80));
sortedFailures.forEach(file => console.log(file));
