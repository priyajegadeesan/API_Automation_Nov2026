import { Given } from '@cucumber/cucumber';
import { ICustomWorld } from '../../src/hooks/world';
import logger from '../../src/utils/logger';

Given('the API is available', async function (this: ICustomWorld) {
  logger.info('API is ready for testing');
});
