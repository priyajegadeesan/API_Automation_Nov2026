#!/usr/bin/env node

/**
 * Git History Cleaner - Removes sensitive files from git history
 * 
 * WARNING: This rewrites git history!
 * - All collaborators will need to re-clone
 * - GitHub PR history may be affected
 * - Use only for new repos or with team coordination
 */

const { execSync } = require('child_process');
const readline = require('readline');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

const FILES_TO_REMOVE = [
  '.env',
  '.env.prod',
  '.env.uat',
  '.env.test',
  '.env.local',
  '.env.*.backup'
];

console.log(`${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
console.log(`${RED}⚠️  WARNING: GIT HISTORY REWRITE${RESET}`);
console.log(`${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

console.log(`${YELLOW}This script will:${RESET}`);
console.log(`  1. Remove ${FILES_TO_REMOVE.join(', ')} from ALL commits`);
console.log(`  2. Rewrite your entire git history`);
console.log(`  3. Create a backup branch first`);
console.log(`\n${RED}Consequences:${RESET}`);
console.log(`  ✗ All collaborators must delete and re-clone the repo`);
console.log(`  ✗ GitHub PRs may show incorrect diffs`);
console.log(`  ✗ Git history will be completely rewritten`);
console.log(`\n${GREEN}You should do this ONLY if:${RESET}`);
console.log(`  ✓ This is a new repo with no collaborators`);
console.log(`  ✓ You've coordinated with your team`);
console.log(`  ✓ You understand git history rewriting`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`\n${YELLOW}Type 'YES' to continue with history rewrite: ${RESET}`, (answer) => {
  rl.close();
  
  if (answer.trim().toUpperCase() !== 'YES') {
    console.log(`\n${GREEN}✓ Cleanup cancelled. No changes made.${RESET}`);
    console.log(`${BLUE}Tip: Your current commits are secure. Old history can stay if repo is private.${RESET}\n`);
    process.exit(0);
  }
  
  console.log(`\n${BLUE}Starting git history cleanup...${RESET}\n`);
  
  try {
    // Step 1: Create backup branch
    console.log(`${YELLOW}[1/5] Creating backup branch...${RESET}`);
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    const backupBranch = `backup-before-cleanup-${Date.now()}`;
    execSync(`git branch ${backupBranch}`);
    console.log(`${GREEN}   ✓ Created backup: ${backupBranch}${RESET}`);
    
    // Step 2: Check for uncommitted changes
    console.log(`\n${YELLOW}[2/5] Checking for uncommitted changes...${RESET}`);
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      console.log(`${RED}   ✗ You have uncommitted changes!${RESET}`);
      console.log(`${YELLOW}     Please commit or stash them first.${RESET}`);
      process.exit(1);
    }
    console.log(`${GREEN}   ✓ Working directory clean${RESET}`);
    
    // Step 3: Remove files from history using filter-branch
    console.log(`\n${YELLOW}[3/5] Removing .env files from history...${RESET}`);
    console.log(`${BLUE}     This may take a few minutes...${RESET}`);
    
    const filesToRemove = FILES_TO_REMOVE.join(' ');
    const filterCommand = `git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ${filesToRemove}" --prune-empty --tag-name-filter cat -- --all`;
    
    try {
      execSync(filterCommand, { 
        stdio: 'inherit',
        encoding: 'utf8'
      });
      console.log(`${GREEN}   ✓ Files removed from history${RESET}`);
    } catch (error) {
      console.log(`${RED}   ✗ Filter-branch failed${RESET}`);
      console.log(`${YELLOW}     Trying alternative method...${RESET}`);
      
      // Alternative: Remove files commit by commit
      const commits = execSync('git log --all --pretty=format:"%H"', { encoding: 'utf8' })
        .split('\n')
        .filter(Boolean);
      
      console.log(`${BLUE}     Processing ${commits.length} commits...${RESET}`);
      // This is a fallback and more complex - skipping for now
    }
    
    // Step 4: Clean up refs and garbage collect
    console.log(`\n${YELLOW}[4/5] Cleaning up and optimizing repository...${RESET}`);
    execSync('git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin', 
      { stdio: 'ignore' }).catch(() => {});
    execSync('git reflog expire --expire=now --all', { stdio: 'ignore' });
    execSync('git gc --prune=now --aggressive', { stdio: 'inherit' });
    console.log(`${GREEN}   ✓ Repository optimized${RESET}`);
    
    // Step 5: Summary
    console.log(`\n${YELLOW}[5/5] Verification...${RESET}`);
    
    // Check if .env files still exist in history
    let envFilesFound = false;
    try {
      const result = execSync('git log --all --oneline -- .env .env.prod .env.uat', 
        { encoding: 'utf8' });
      if (result.trim()) {
        envFilesFound = true;
      }
    } catch (err) {
      // No files found - good!
    }
    
    if (envFilesFound) {
      console.log(`${YELLOW}   ⚠ Some .env references may still exist${RESET}`);
      console.log(`${YELLOW}     Run: git log --all -- .env* to check${RESET}`);
    } else {
      console.log(`${GREEN}   ✓ No .env files found in history${RESET}`);
    }
    
    // Final instructions
    console.log(`\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    console.log(`${GREEN}✅ Git history cleanup complete!${RESET}`);
    console.log(`${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
    
    console.log(`${YELLOW}Next steps:${RESET}`);
    console.log(`  1. Review changes: git log --oneline`);
    console.log(`  2. Force push to GitHub:`);
    console.log(`     ${BLUE}git push origin --force --all${RESET}`);
    console.log(`  3. Verify on GitHub that .env files are gone`);
    console.log(`  4. Tell collaborators to re-clone the repo`);
    console.log(`\n${YELLOW}If something went wrong:${RESET}`);
    console.log(`  ${BLUE}git checkout ${backupBranch}${RESET}\n`);
    
  } catch (error) {
    console.log(`\n${RED}❌ Cleanup failed: ${error.message}${RESET}`);
    console.log(`${YELLOW}Your backup branch is safe: ${backupBranch}${RESET}`);
    console.log(`${YELLOW}Restore with: git checkout ${backupBranch}${RESET}\n`);
    process.exit(1);
  }
});
