/**
 * Lint-Staged Configuration
 * Runs checks on staged files before commit
 */

module.exports = {
  // Check all staged files for secrets
  '*.{js,ts,jsx,tsx,json,yaml,yml,env}': [
    'node scripts/scan-secrets.js'
  ],
  
  // Prevent committing actual env files
  '.env*': (filenames) => {
    const forbidden = filenames.filter(f => 
      f.includes('.env.uat') || 
      f.includes('.env.prod') || 
      f.includes('.env.test') ||
      f === '.env'
    );
    
    if (forbidden.length > 0) {
      throw new Error(
        `❌ Cannot commit real environment files:\n${forbidden.join('\n')}\n` +
        'Only .env.example and .env.*.template files should be committed.'
      );
    }
    
    return [];
  }
};
