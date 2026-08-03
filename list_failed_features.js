const fs = require('fs');
const path = require('path');

// Read the cucumber JSON report
const cucumberReportPath = path.join(__dirname, 'reports', 'cucumber-report.json');
const cucumberData = JSON.parse(fs.readFileSync(cucumberReportPath, 'utf8'));

// Track failed features
const failedFeatures = new Map();

cucumberData.forEach(feature => {
  const featureName = feature.name;
  const featureUri = feature.uri;
  let failedScenarios = [];

  feature.elements.forEach(scenario => {
    const scenarioName = scenario.name;
    let hasFailed = false;

    scenario.steps.forEach(step => {
      if (step.result && step.result.status === 'failed') {
        hasFailed = true;
      }
    });

    if (hasFailed) {
      failedScenarios.push(scenarioName);
    }
  });

  if (failedScenarios.length > 0) {
    failedFeatures.set(featureUri, {
      name: featureName,
      failedCount: failedScenarios.length,
      scenarios: failedScenarios
    });
  }
});

// Print results
console.log('\n' + '='.repeat(80));
console.log('FAILED FEATURE FILES - UAT ENVIRONMENT');
console.log('='.repeat(80) + '\n');

const sortedFeatures = Array.from(failedFeatures.entries()).sort((a, b) => 
  a[0].localeCompare(b[0])
);

sortedFeatures.forEach(([uri, info], index) => {
  console.log(`${index + 1}. ${uri}`);
  console.log(`   Feature: ${info.name}`);
  console.log(`   Failed Scenarios: ${info.failedCount}`);
  info.scenarios.forEach(scenario => {
    console.log(`      - ${scenario}`);
  });
  console.log('');
});

console.log('='.repeat(80));
console.log(`Total Failed Feature Files: ${failedFeatures.size} out of ${cucumberData.length}`);
console.log('='.repeat(80) + '\n');

// Write to file
const outputPath = path.join(__dirname, 'FAILED_FEATURES_LIST.txt');
let output = 'FAILED FEATURE FILES - UAT ENVIRONMENT\n';
output += '='.repeat(80) + '\n\n';

sortedFeatures.forEach(([uri, info], index) => {
  output += `${index + 1}. ${uri}\n`;
  output += `   Feature: ${info.name}\n`;
  output += `   Failed Scenarios: ${info.failedCount}\n`;
  info.scenarios.forEach(scenario => {
    output += `      - ${scenario}\n`;
  });
  output += '\n';
});

output += '='.repeat(80) + '\n';
output += `Total Failed Feature Files: ${failedFeatures.size} out of ${cucumberData.length}\n`;
output += '='.repeat(80) + '\n';

fs.writeFileSync(outputPath, output);
console.log(`✅ Failed features list saved to: ${outputPath}`);
