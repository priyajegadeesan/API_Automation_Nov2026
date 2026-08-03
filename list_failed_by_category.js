const fs = require('fs');
const path = require('path');

// Read the cucumber JSON report
const cucumberReportPath = path.join(__dirname, 'reports', 'cucumber-report.json');
const cucumberData = JSON.parse(fs.readFileSync(cucumberReportPath, 'utf8'));

// Track failed features by category
const failedByCategory = {};

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
    // Extract category from path
    const pathParts = featureUri.split('\\');
    if (pathParts[0] === 'features-UAT' && pathParts.length > 1) {
      const category = pathParts[1];
      if (!failedByCategory[category]) {
        failedByCategory[category] = [];
      }
      failedByCategory[category].push(featureUri);
    }
  }
});

// Sort categories by count (descending)
const sortedCategories = Object.entries(failedByCategory)
  .sort((a, b) => b[1].length - a[1].length);

// Print results
console.log('\n' + '='.repeat(100));
console.log('FAILED FEATURE FILES BY CATEGORY - UAT ENVIRONMENT');
console.log('='.repeat(100) + '\n');

let output = 'FAILED FEATURE FILES BY CATEGORY - UAT ENVIRONMENT\n';
output += '='.repeat(100) + '\n\n';

sortedCategories.forEach(([category, files]) => {
  console.log(`\n${'*'.repeat(100)}`);
  console.log(`${category.toUpperCase()} - ${files.length} FILES`);
  console.log('*'.repeat(100));
  
  output += `\n${'*'.repeat(100)}\n`;
  output += `${category.toUpperCase()} - ${files.length} FILES\n`;
  output += '*'.repeat(100) + '\n';

  files.sort().forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
    output += `${index + 1}. ${file}\n`;
  });

  output += '\n';
});

console.log('\n' + '='.repeat(100));
console.log('SUMMARY BY CATEGORY');
console.log('='.repeat(100));

output += '\n' + '='.repeat(100) + '\n';
output += 'SUMMARY BY CATEGORY\n';
output += '='.repeat(100) + '\n';

sortedCategories.forEach(([category, files]) => {
  const line = `${category}: ${files.length} files`;
  console.log(line);
  output += line + '\n';
});

console.log('='.repeat(100) + '\n');
output += '='.repeat(100) + '\n';

// Write to file
fs.writeFileSync('FAILED_FEATURES_BY_CATEGORY.txt', output);

console.log('\n✅ Detailed breakdown saved to: FAILED_FEATURES_BY_CATEGORY.txt');
