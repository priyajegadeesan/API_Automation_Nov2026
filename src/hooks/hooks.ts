import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { ICustomWorld } from './world';
import logger from '../utils/logger';
import * as fs from 'fs';
import * as path from 'path';

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

After(async function (this: ICustomWorld, { pickle, result }) {
  if (result?.status === Status.FAILED) {
    logger.error(`Scenario Failed: ${pickle.name}`);
    if (result.message) {
      logger.error(`Error: ${result.message}`);
    }
  } else {
    logger.info(`Scenario Passed: ${pickle.name}`);
  }
  
  // Always attach response for reporting
  if (this.response) {
    const responseText = typeof this.responseBody === 'string' ? this.responseBody : JSON.stringify(this.responseBody);
    this.attach(`Response Status: ${this.response.status}\nResponse Body: ${responseText}`, 'text/plain');
  }

  await this.cleanup();
  logger.info(`========== Scenario Ended: ${pickle.name} ==========`);
});

AfterAll(async function () {
  logger.info('========== Test Execution Completed ==========');
});
