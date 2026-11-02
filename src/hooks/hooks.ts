import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { ICustomWorld } from './world';
import logger from '../utils/logger';
import * as fs from 'fs';
import * as path from 'path';

// Set default timeout to 2 minutes for slow API endpoints like logs and user management
setDefaultTimeout(300000);

BeforeAll(async function () {
  logger.info('========== Test Execution Started ==========');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
});

Before(async function (this: ICustomWorld, { pickle }) {
  logger.info(`========== Scenario Started: ${pickle.name} ==========`);
  await this.init();
});

// Helper function to redact sensitive data from responses
function redactSensitiveData(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  
  const sensitiveKeys = [
    'token', 'bearer', 'authorization', 'password', 'secret', 'apikey', 'api_key',
    'credential', 'auth', 'jwt', 'key', 'value', 'encrypted', 'vault'
  ];
  
  const redacted = Array.isArray(data) ? [...data] : { ...data };
  
  for (const key in redacted) {
    if (typeof key === 'string') {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitiveKeys.some(sensitiveKey => lowerKey.includes(sensitiveKey));
      
      if (isSensitive) {
        if (typeof redacted[key] === 'string' && redacted[key].length > 0) {
          redacted[key] = '[REDACTED]';
        } else if (typeof redacted[key] === 'object') {
          redacted[key] = '[REDACTED]';
        }
      } else if (typeof redacted[key] === 'object' && redacted[key] !== null) {
        redacted[key] = redactSensitiveData(redacted[key]);
      }
    }
  }
  
  return redacted;
}

After(async function (this: ICustomWorld, { pickle, result }) {
  if (result?.status === Status.FAILED) {
    logger.error(`Scenario Failed: ${pickle.name}`);
    if (result.message) {
      logger.error(`Error: ${result.message}`);
    }
  } else {
    logger.info(`Scenario Passed: ${pickle.name}`);
  }
  
  // SECURITY FIX: Redact sensitive data before attaching to reports
  if (this.response) {
    let safeResponseBody = this.responseBody;
    
    // Redact sensitive fields from response body for report attachments
    if (typeof safeResponseBody === 'object' && safeResponseBody !== null) {
      safeResponseBody = redactSensitiveData(safeResponseBody);
    }
    
    const responseText = typeof safeResponseBody === 'string' 
      ? safeResponseBody 
      : JSON.stringify(safeResponseBody, null, 2);
    
    this.attach(`Response Status: ${this.response.status}\nResponse Body: ${responseText}`, 'text/plain');
  }

  await this.cleanup();
  logger.info(`========== Scenario Ended: ${pickle.name} ==========`);
});

AfterAll(async function () {
  logger.info('========== Test Execution Completed ==========');
});
