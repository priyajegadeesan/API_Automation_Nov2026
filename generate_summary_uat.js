const fs = require('fs');

const data = JSON.parse(fs.readFileSync('reports/cucumber-uat-report.json', 'utf8'));
const categories = {};

data.forEach(feature => {
  const name = feature.name || 'Unknown Feature';
  feature.elements.forEach(scenario => {
    if (!categories[name]) {
      categories[name] = { total: 0, passed: 0, failed: 0 };
    }
    categories[name].total++;
    
    const failed = scenario.steps.find(step => step.result && step.result.status === 'failed');
    if (failed) {
      categories[name].failed++;
    } else {
      categories[name].passed++;
    }
  });
});

console.log('\n📊 Test Results by Category:\n');
console.log('='.repeat(80));

const sortedCategories = Object.entries(categories).sort((a, b) => a[0].localeCompare(b[0]));

sortedCategories.forEach(([name, stats]) => {
  const successRate = ((stats.passed / stats.total) * 100).toFixed(1);
  const icon = stats.failed === 0 ? '✅' : '❌';
  
  console.log(`${icon} ${name}`);
  console.log(`   Total: ${stats.total} | Passed: ${stats.passed} | Failed: ${stats.failed} | Success: ${successRate}%`);
  console.log('-'.repeat(80));
});

const totalTests = Object.values(categories).reduce((sum, cat) => sum + cat.total, 0);
const totalPassed = Object.values(categories).reduce((sum, cat) => sum + cat.passed, 0);
const totalFailed = Object.values(categories).reduce((sum, cat) => sum + cat.failed, 0);
const overallSuccess = ((totalPassed / totalTests) * 100).toFixed(2);

console.log(`\n📈 Overall Statistics:`);
console.log(`   Total Tests: ${totalTests}`);
console.log(`   Passed: ${totalPassed}`);
console.log(`   Failed: ${totalFailed}`);
console.log(`   Success Rate: ${overallSuccess}%`);
console.log('='.repeat(80) + '\n');
