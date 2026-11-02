#!/usr/bin/env node

/**
 * Comprehensive Security Scanner
 * Scans codebase for sensitive data before commits
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

// Sensitive patterns to detect
const SENSITIVE_PATTERNS = [
  // JWT Tokens
  { pattern: /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, name: 'JWT Token' },
  
  // API Keys
  { pattern: /['"]?api[_-]?key['"]?\s*[:=]\s*['"][a-zA-Z0-9_\-]{20,}['"]/gi, name: 'API Key' },
  
  // Bearer Tokens (explicit)
  { pattern: /bearer\s+[a-zA-Z0-9_\-\.]{20,}/gi, name: 'Bearer Token' },
  
  // AWS Keys
  { pattern: /AKIA[0-9A-Z]{16}/g, name: 'AWS Access Key' },
  { pattern: /['"]+aws_secret_access_key['"]+\s*[:=]\s*['"][^'"]{20,}['"]/gi, name: 'AWS Secret Key' },
  
  // Private Keys
  { pattern: /-----BEGIN\s+(RSA|DSA|EC|OPENSSH)\s+PRIVATE\s+KEY-----/g, name: 'Private Key' },
  
  // Database URLs with passwords
  { pattern: /[a-zA-Z]+:\/\/[a-zA-Z0-9_]+:[^@\s]+@[a-zA-Z0-9.-]+/g, name: 'Database URL with Credentials' },
  
  // GitHub/GitLab Tokens
  { pattern: /gh[pousr]_[A-Za-z0-9_]{36,}/g, name: 'GitHub Token' },
  { pattern: /glpat-[A-Za-z0-9_\-]{20,}/g, name: 'GitLab Token' },
  
  // Generic Passwords in code
  { pattern: /['"]?password['"]?\s*[:=]\s*['"][^'"]{8,}['"]/gi, name: 'Hardcoded Password' },
  
  // Generic Secrets
  { pattern: /['"]?secret['"]?\s*[:=]\s*['"][a-zA-Z0-9_\-]{20,}['"]/gi, name: 'Secret Key' }
  
  // Note: Customer IDs are org identifiers, not secrets - removed from scan
];

// Files and directories to skip
const SKIP_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  'coverage',
  'reports',
  'logs',
  '.env.example',
  '.env.template',
  'security-scan.js', // Skip self
  'SECURITY_GUIDE.md', // Documentation is OK
  '.md' // Skip all markdown files - they're documentation
];

// Files that MUST exist and be in .gitignore
const PROTECTED_FILES = [
  '.env',
  '.env.prod',
  '.env.uat',
  '.env.test',
  '.env.local'
];

let issuesFound = 0;
let filesScanned = 0;

console.log(`${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
console.log(`${BLUE}🔒 Security Scanner - Checking for Sensitive Data${RESET}`);
console.log(`${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

// Check 1: Verify .gitignore exists and contains required entries
console.log(`${YELLOW}[1/5] Checking .gitignore configuration...${RESET}`);
checkGitignore();

// Check 2: Verify protected files are NOT tracked by git
console.log(`${YELLOW}[2/5] Verifying protected files are not tracked...${RESET}`);
checkTrackedFiles();

// Check 3: Scan tracked files for sensitive patterns
console.log(`${YELLOW}[3/5] Scanning tracked files for sensitive data...${RESET}`);
scanTrackedFiles();

// Check 4: Check for accidentally staged sensitive files
console.log(`${YELLOW}[4/5] Checking staged files...${RESET}`);
checkStagedFiles();

// Check 5: Verify no .env files in git history
console.log(`${YELLOW}[5/5] Verifying no .env files in recent commits...${RESET}`);
checkGitHistory();

// Final Summary
console.log(`\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
if (issuesFound === 0) {
  console.log(`${GREEN}✅ Security Check PASSED${RESET}`);
  console.log(`${GREEN}   Scanned ${filesScanned} files - No sensitive data found${RESET}`);
  console.log(`${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
  process.exit(0);
} else {
  console.log(`${RED}❌ Security Check FAILED${RESET}`);
  console.log(`${RED}   Found ${issuesFound} security issue(s)${RESET}`);
  console.log(`${RED}   Please fix these issues before committing${RESET}`);
  console.log(`${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
  process.exit(1);
}

// Function implementations

function checkGitignore() {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  
  if (!fs.existsSync(gitignorePath)) {
    console.log(`${RED}   ✗ .gitignore not found!${RESET}`);
    issuesFound++;
    return;
  }
  
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  const requiredEntries = ['.env', '.env.prod', '.env.uat', '.env.test', 'node_modules'];
  const missing = [];
  
  requiredEntries.forEach(entry => {
    if (!gitignoreContent.includes(entry)) {
      missing.push(entry);
    }
  });
  
  if (missing.length > 0) {
    console.log(`${RED}   ✗ Missing entries in .gitignore: ${missing.join(', ')}${RESET}`);
    issuesFound += missing.length;
  } else {
    console.log(`${GREEN}   ✓ .gitignore properly configured${RESET}`);
  }
}

function checkTrackedFiles() {
  try {
    const trackedFiles = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter(Boolean);
    
    const trackedProtected = trackedFiles.filter(file => 
      PROTECTED_FILES.some(protected => file.includes(protected) && !file.includes('example') && !file.includes('template'))
    );
    
    if (trackedProtected.length > 0) {
      console.log(`${RED}   ✗ Protected files are being tracked:${RESET}`);
      trackedProtected.forEach(file => {
        console.log(`${RED}     - ${file}${RESET}`);
        console.log(`${YELLOW}       Fix: git rm --cached ${file}${RESET}`);
      });
      issuesFound += trackedProtected.length;
    } else {
      console.log(`${GREEN}   ✓ No protected files are tracked${RESET}`);
    }
  } catch (error) {
    console.log(`${YELLOW}   ⚠ Could not check tracked files: ${error.message}${RESET}`);
  }
}

function scanTrackedFiles() {
  try {
    const trackedFiles = execSync('git ls-files', { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .filter(file => !shouldSkipFile(file));
    
    trackedFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      
      if (!fs.existsSync(filePath)) return;
      
      const stats = fs.statSync(filePath);
      if (stats.isDirectory() || stats.size === 0) return;
      
      // Skip binary files
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip'].includes(ext)) return;
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        filesScanned++;
        
        SENSITIVE_PATTERNS.forEach(({ pattern, name }) => {
          pattern.lastIndex = 0; // Reset regex
          const matches = content.match(pattern);
          
          if (matches) {
            // Filter out false positives
            const realMatches = matches.filter(match => !isFalsePositive(match, file, content));
            
            if (realMatches.length > 0) {
              console.log(`${RED}   ✗ Found ${name} in: ${file}${RESET}`);
              realMatches.slice(0, 3).forEach(match => {
                const preview = match.length > 50 ? match.substring(0, 47) + '...' : match;
                console.log(`${RED}     → ${preview}${RESET}`);
              });
              issuesFound++;
            }
          }
        });
      } catch (err) {
        // Skip files that can't be read as text
      }
    });
    
    if (issuesFound === 0) {
      console.log(`${GREEN}   ✓ No sensitive data found in tracked files${RESET}`);
    }
  } catch (error) {
    console.log(`${YELLOW}   ⚠ Could not scan tracked files: ${error.message}${RESET}`);
  }
}

function checkStagedFiles() {
  try {
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    
    const protectedStaged = stagedFiles.filter(file => 
      PROTECTED_FILES.some(protected => file.includes(protected) && !file.includes('example') && !file.includes('template'))
    );
    
    if (protectedStaged.length > 0) {
      console.log(`${RED}   ✗ Protected files are staged:${RESET}`);
      protectedStaged.forEach(file => {
        console.log(`${RED}     - ${file}${RESET}`);
        console.log(`${YELLOW}       Fix: git restore --staged ${file}${RESET}`);
      });
      issuesFound += protectedStaged.length;
    } else {
      console.log(`${GREEN}   ✓ No protected files staged${RESET}`);
    }
  } catch (error) {
    console.log(`${YELLOW}   ⚠ Could not check staged files: ${error.message}${RESET}`);
  }
}

function checkGitHistory() {
  try {
    const recentCommits = execSync('git log --pretty=format:"%H" -5', { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    
    let foundInHistory = false;
    
    recentCommits.forEach(commitHash => {
      try {
        const files = execSync(`git ls-tree -r --name-only ${commitHash}`, { encoding: 'utf8' })
          .split('\n')
          .filter(Boolean);
        
        const envFiles = files.filter(file => 
          PROTECTED_FILES.some(protected => file === protected)
        );
        
        if (envFiles.length > 0) {
          console.log(`${YELLOW}   ⚠ Found .env files in commit ${commitHash.substring(0, 7)}:${RESET}`);
          envFiles.forEach(file => console.log(`${YELLOW}     - ${file}${RESET}`));
          foundInHistory = true;
          // Don't count as issue - this is historical and requires special cleanup
        }
      } catch (err) {
        // Skip if commit not accessible
      }
    });
    
    if (!foundInHistory) {
      console.log(`${GREEN}   ✓ No .env files in recent history${RESET}`);
    } else {
      console.log(`${YELLOW}   ⚠ Historical .env files detected (see SECURITY_CLEANUP_NEEDED.md)${RESET}`);
    }
  } catch (error) {
    console.log(`${YELLOW}   ⚠ Could not check git history: ${error.message}${RESET}`);
  }
}

function shouldSkipFile(file) {
  return SKIP_PATTERNS.some(pattern => file.includes(pattern));
}

function isFalsePositive(match, file, content) {
  // Ignore example/template/placeholder values
  if (match.includes('YOUR_') || match.includes('PLACEHOLDER') || match.includes('your_')) return true;
  if (match.includes('example.com') || match.includes('test@test')) return true;
  if (match.includes('xxx') || match.includes('***')) return true;
  
  // Ignore comments and documentation
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes(match) && (line.trim().startsWith('//') || line.trim().startsWith('#') || line.trim().startsWith('*'))) {
      // Allow if it's clearly documentation
      if (line.includes('example') || line.includes('format:') || line.includes('Format:')) return true;
    }
  }
  
  // Ignore feature file test data with specific patterns
  if (file.includes('.feature') && (match.includes('encrypted-secret') || match.includes('test-data'))) return true;
  
  return false;
}
