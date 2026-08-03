const fs = require('fs');
const path = require('path');

const reportsDir = './reports';

console.log('Starting cleanup of reports folder...\n');

try {
  // Get all files in reports directory
  const files = fs.readdirSync(reportsDir);
  
  let deletedCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    const filePath = path.join(reportsDir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isFile()) {
        fs.unlinkSync(filePath);
        console.log(`✅ Deleted: ${file}`);
        deletedCount++;
      }
    } catch (err) {
      console.error(`❌ Error deleting ${file}: ${err.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Cleanup Summary:`);
  console.log(`   Total files deleted: ${deletedCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Reports folder is now clean!`);
  console.log(`${'='.repeat(50)}`);
  
} catch (err) {
  console.error(`Fatal error: ${err.message}`);
  process.exit(1);
}
