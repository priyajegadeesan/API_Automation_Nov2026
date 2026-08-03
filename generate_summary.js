const fs = require('fs');

const data = JSON.parse(fs.readFileSync('reports/cucumber-prod-report.json', 'utf8'));
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

Object.keys(categories).sort().forEach(category => {
  const cat = categories[category];
  const rate = ((cat.passed / cat.total) * 100).toFixed(1);
  const status = rate >= 70 ? '✅' : rate >= 50 ? '⚠️' : '❌';
  console.log(`${status} ${category}`);
  console.log(`   Total: ${cat.total} | Passed: ${cat.passed} | Failed: ${cat.failed} | Success: ${rate}%`);
  console.log('-'.repeat(80));
});

console.log('\n📈 Overall Statistics:');
const totals = Object.values(categories).reduce((acc, cat) => ({
  total: acc.total + cat.total,
  passed: acc.passed + cat.passed,
  failed: acc.failed + cat.failed
}), { total: 0, passed: 0, failed: 0 });

console.log(`   Total Tests: ${totals.total}`);
console.log(`   Passed: ${totals.passed}`);
console.log(`   Failed: ${totals.failed}`);
console.log(`   Success Rate: ${((totals.passed / totals.total) * 100).toFixed(2)}%`);
console.log('='.repeat(80));
