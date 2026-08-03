const fs = require('fs');
const path = require('path');

// Read the cucumber JSON report
const cucumberReportPath = path.join(__dirname, 'reports', 'cucumber-report.json');
const cucumberData = JSON.parse(fs.readFileSync(cucumberReportPath, 'utf8'));

// Track failed feature file paths
const failedFeaturePaths = new Set();

cucumberData.forEach(feature => {
  const featureUri = feature.uri;
  let hasFailed = false;

  feature.elements.forEach(scenario => {
    scenario.steps.forEach(step => {
      if (step.result && step.result.status === 'failed') {
        hasFailed = true;
      }
    });
  });

  if (hasFailed) {
    failedFeaturePaths.add(featureUri);
  }
});

// Sort paths
const sortedPaths = Array.from(failedFeaturePaths).sort();

// Print for console
console.log('\n' + '='.repeat(80));
console.log('FAILED FEATURE FILES - FOR RE-RUN');
console.log('='.repeat(80) + '\n');

sortedPaths.forEach((path, index) => {
  console.log(path);
});

console.log('\n' + '='.repeat(80));
console.log(`Total: ${sortedPaths.length} failed feature files`);
console.log('='.repeat(80) + '\n');

// Create a space-separated string for command line
const spaceDelimited = sortedPaths.map(p => `"${p}"`).join(' ');

// Write to multiple format files
const txtOutput = sortedPaths.join('\n');
fs.writeFileSync('FAILED_FEATURES_PATHS.txt', txtOutput);

const commandOutput = `# Command to re-run all failed tests:
npm run test:uat -- ${sortedPaths.map(p => `"${p}"`).join(' ')}

# Or run them one by one:
${sortedPaths.map(p => `npm run test:uat -- "${p}"`).join('\n')}
`;
fs.writeFileSync('RERUN_FAILED_TESTS.txt', commandOutput);

// Create a JSON file with the paths
fs.writeFileSync('failed_features.json', JSON.stringify(sortedPaths, null, 2));

console.log('✅ Files created:');
console.log('   1. FAILED_FEATURES_PATHS.txt - Simple list of paths');
console.log('   2. RERUN_FAILED_TESTS.txt - Ready-to-use commands');
console.log('   3. failed_features.json - JSON format');
console.log('\n📋 To re-run all failed tests:');
console.log(`   npm run test:uat -- ${sortedPaths.slice(0, 3).map(p => `"${p}"`).join(' ')} ...`);
