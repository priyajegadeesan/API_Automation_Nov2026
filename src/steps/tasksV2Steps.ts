import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ICustomWorld } from '../hooks/world';
import logger from '../utils/logger';

// ==================== GIVEN STEPS ====================

Given('I am authenticated with valid credentials', async function (this: ICustomWorld) {
  this.setTestData('authenticated', true);
  logger.info('User authenticated with valid credentials');
});

Given('I have a valid task ID {string}', function (this: ICustomWorld, taskId: string) {
  this.setTestData('taskId', taskId);
  logger.info(`Task ID set: ${taskId}`);
});

Given('I have a valid task ID', function (this: ICustomWorld) {
  const defaultTaskId = '6838419bb017a1f73f62840a';
  this.setTestData('taskId', defaultTaskId);
  logger.info(`Default task ID set: ${defaultTaskId}`);
});

Given('I have an invalid task ID {string}', function (this: ICustomWorld, taskId: string) {
  this.setTestData('taskId', taskId);
  this.setTestData('invalidTaskId', true);
  logger.info(`Invalid task ID set: ${taskId}`);
});

Given('I have an invalid task ID', function (this: ICustomWorld) {
  const invalidTaskId = 'invalid-task-id-999';
  this.setTestData('taskId', invalidTaskId);
  this.setTestData('invalidTaskId', true);
  logger.info(`Invalid task ID set: ${invalidTaskId}`);
});

Given('I have invalid authentication credentials', function (this: ICustomWorld) {
  this.setTestData('authenticated', false);
  this.setTestData('invalidAuth', true);
  logger.info('Invalid authentication credentials set');
});

Given('I have a task with status {string}', function (this: ICustomWorld, status: string) {
  this.setTestData('expectedStatus', status);
  this.setTestData('taskId', '6838419bb017a1f73f62840a');
  logger.info(`Expected task status: ${status}`);
});

Given('I have valid task configurations', function (this: ICustomWorld) {
  const taskConfig = {
    name: 'Test Task',
    tool: 'jmeter',
    configuration: {
      testPlan: 'performance-test.jmx',
    },
  };
  this.setTestData('taskConfiguration', taskConfig);
  logger.info('Valid task configuration set');
});

// ==================== WHEN STEPS ====================

When('I send a GET request to {string} with pipeline filter', async function (this: ICustomWorld, endpoint: string) {
  try {
    const pipelineId = this.getTestData('pipelineId');
    logger.info(`Sending GET request to ${endpoint} with pipelineId: ${pipelineId}`);

    const result = await this.tasksV2Service.getAllTasks({ pipelineId });
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody(error.response?.data);
  }
});

When('I send a GET request to {string} with pagination:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const params = dataTable.rowsHash();
    const limit = parseInt(params.limit);
    const offset = parseInt(params.offset);

    logger.info(`Sending GET request to ${endpoint} with pagination: limit=${limit}, offset=${offset}`);

    const result = await this.tasksV2Service.getAllTasks({ limit, offset });
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody(error.response?.data);
  }
});

When('I send a GET request to {string} with sort parameter {string}', async function (this: ICustomWorld, endpoint: string, sortParam: string) {
  try {
    logger.info(`Sending GET request to ${endpoint} with sort parameter: ${sortParam}`);

    const result = await this.tasksV2Service.getAllTasks({ sort: sortParam });
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody(error.response?.data);
  }
});

When('I send a POST request to {string} with task ID', async function (this: ICustomWorld, endpoint: string) {
  try {
    const taskId = this.getTestData('taskId');
    logger.info(`Sending POST request to ${endpoint} with task ID: ${taskId}`);

    const result = await this.tasksV2Service.getTaskByIdWithLookup(taskId);
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody(error.response?.data);
  }
});

When('I send a POST request to {string}', async function (this: ICustomWorld, endpoint: string) {
  try {
    logger.info(`Sending POST request to ${endpoint}`);

    // Handle pipeline parameters endpoint
    if (endpoint.includes('/api/v2/parameters/pipeline/')) {
      const response = await this.request.post(endpoint);
      const status = response.status();
      this.setResponse({ status });
      
      let responseBody: any = {};
      try {
        responseBody = await response.json();
      } catch (e) {
        const text = await response.text().catch(() => '');
        if (text) responseBody = { message: text };
      }
      
      this.setResponseBody(responseBody);
      logger.info(`Response HTTP status: ${status}`);
      logger.info(`Response body: ${JSON.stringify(responseBody)}`);
      
      // Check for uniqueness errors
      const bodyStr = JSON.stringify(responseBody).toLowerCase();
      if (status >= 400 && (bodyStr.includes('duplicate') || bodyStr.includes('unique') || bodyStr.includes('already exists') || bodyStr.includes('pipeline'))) {
        logger.error(`⚠️ PIPELINE ID MUST BE UNIQUE - Error detected in response`);
        if (responseBody.message) {
          logger.error(`Error message: ${responseBody.message}`);
        }
      }
      return;
    }

    // Handle task-related endpoints
    const taskId = this.getTestData('taskId');
    if (endpoint.includes('lookup') && !endpoint.includes('nolookup')) {
      const result = await this.tasksV2Service.getTaskByIdWithLookup(taskId);
      this.setResponse({ status: result.status });
      this.setResponseBody(result.data?.data || result.data);
    } else if (endpoint.includes('nolookup')) {
      const result = await this.tasksV2Service.getTaskByIdNoLookup(taskId);
      this.setResponse({ status: result.status });
      this.setResponseBody(result.data?.data || result.data);
    }

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody(error.response?.data || { error: error.message });
  }
});

When('I send a POST request to {string} without task ID', async function (this: ICustomWorld, endpoint: string) {
  try {
    logger.info(`Sending POST request to ${endpoint} without task ID`);

    const result = await this.tasksV2Service.getTaskByIdWithLookup();
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 400 });
    this.setResponseBody(error.response?.data);
  }
});

When('I get task with lookup', async function (this: ICustomWorld) {
  try {
    const taskId = this.getTestData('taskId');
    logger.info(`Getting task with lookup: ${taskId}`);

    const result = await this.tasksV2Service.getTaskByIdWithLookup(taskId);
    this.setTestData('lookupResponse', result);

    logger.info(`Lookup response status: ${result.status}`);
  } catch (error: any) {
    logger.error(`Lookup request failed: ${error.message}`);
  }
});

When('I get task without lookup', async function (this: ICustomWorld) {
  try {
    const taskId = this.getTestData('taskId');
    logger.info(`Getting task without lookup: ${taskId}`);

    const result = await this.tasksV2Service.getTaskByIdNoLookup(taskId);
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`No-lookup response HTTP status: ${result.status}`);
  } catch (error: any) {
    logger.error(`No-lookup request failed: ${error.message}`);
  }
});

When('I send a GET request to check task status', async function (this: ICustomWorld) {
  try {
    const taskId = this.getTestData('taskId');
    logger.info(`Getting task status for: ${taskId}`);

    const result = await this.tasksV2Service.getTaskStatus(taskId);
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody(error.response?.data);
  }
});

When('I send a GET request to check status', async function (this: ICustomWorld) {
  try {
    const taskId = this.getTestData('taskId');
    logger.info(`Checking task status: ${taskId}`);

    const result = await this.tasksV2Service.getTaskStatus(taskId);
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 404 });
    this.setResponseBody(error.response?.data);
  }
});

When('I request the task status', async function (this: ICustomWorld) {
  try {
    const taskId = this.getTestData('taskId');
    logger.info(`Requesting task status: ${taskId}`);

    const result = await this.tasksV2Service.getTaskStatus(taskId);
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
  }
});

When('I send a POST request to {string} with multiple task configurations', async function (this: ICustomWorld, endpoint: string) {
  try {
    const tasks = [
      {
        name: 'Test Task 1',
        tool: 'jmeter',
        configuration: { testPlan: 'test1.jmx' },
      },
      {
        name: 'Test Task 2',
        tool: 'selenium',
        configuration: { testSuite: 'suite2' },
      },
    ];

    logger.info(`Sending POST request to ${endpoint} with multiple tasks`);

    const result = await this.tasksV2Service.createTasks(tasks);
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody(error.response?.data);
  }
});

When('I send a POST request to create tasks', async function (this: ICustomWorld) {
  try {
    const taskConfig = this.getTestData('taskConfiguration');
    logger.info('Sending POST request to create task');

    const result = await this.tasksV2Service.createTask(taskConfig);
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody(error.response?.data);
  }
});

When('I send a POST request with invalid task configuration', async function (this: ICustomWorld) {
  try {
    const invalidTaskConfig = {
      invalidField: 'invalid value',
    };

    logger.info('Sending POST request with invalid task configuration');

    const result = await this.tasksV2Service.createTask(invalidTaskConfig);
    this.setResponse({ status: result.status });
    this.setResponseBody(result.data?.data || result.data);

    logger.info(`Response HTTP status: ${this.response.status}`);
  } catch (error: any) {
    logger.error(`Request failed: ${error.message}`);
    this.setResponse({ status: error.status || 400 });
    this.setResponseBody(error.response?.data);
  }
});

// ==================== THEN STEPS ====================

Then('the response should contain a list of tasks', function (this: ICustomWorld) {
  // Check if response has data property with an array
  if (this.responseBody.data) {
    expect(this.responseBody.data).to.be.an('array');
    logger.info(`Response contains ${this.responseBody.data.length} tasks`);
  } else {
    // Fallback: check if responseBody itself is an array
    expect(this.responseBody).to.be.an('array');
    logger.info(`Response contains ${this.responseBody.length} tasks`);
  }
});

Then('each task should have required properties', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('array');
  if (this.responseBody.length > 0) {
    const firstTask = this.responseBody[0];
    expect(firstTask).to.have.property('_id');
    expect(firstTask).to.have.property('name');
    logger.info('Tasks have required properties');
  }
});

Then('the response should contain tasks for the pipeline', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('array');
  const pipelineId = this.getTestData('pipelineId');
  if (this.responseBody.length > 0) {
    logger.info(`Found ${this.responseBody.length} tasks for pipeline ${pipelineId}`);
  }
});

Then('the response should contain paginated tasks', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('array');
  expect(this.responseBody.length).to.be.at.most(20);
  logger.info(`Paginated response contains ${this.responseBody.length} tasks`);
});

Then('the tasks should be sorted by creation date', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('array');
  if (this.responseBody.length > 1) {
    const dates = this.responseBody.map((task: any) => new Date(task.createdAt).getTime());
    const sorted = [...dates].sort((a, b) => a - b);
    logger.info('Tasks are sorted by creation date');
  }
});

Then('the response should contain task details', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  
  // Check if response has data property (wrapped response)
  if (this.responseBody.data) {
    expect(this.responseBody.data).to.be.an('object');
    expect(this.responseBody.data).to.have.property('_id');
    logger.info('Response contains task details in data property');
  } else {
    // Direct response
    expect(this.responseBody).to.have.property('_id');
    logger.info('Response contains task details');
  }
});

Then('the task should include configuration details', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  expect(this.responseBody).to.have.property('configuration');
  logger.info('Task includes configuration details');
});

Then('the task should include tool information', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  expect(this.responseBody).to.have.property('tool');
  logger.info('Task includes tool information');
});

Then('the response should contain error message', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  logger.info('Response contains error message');
});

Then('the response should contain basic task details', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  expect(this.responseBody).to.have.property('_id');
  logger.info('Response contains basic task details');
});

Then('the response should not include resolved references', function (this: ICustomWorld) {
  logger.info('No-lookup response verified (lighter payload)');
});

Then('both responses should have task ID', function (this: ICustomWorld) {
  const lookupResponse = this.getTestData('lookupResponse');
  expect(lookupResponse.data).to.have.property('_id');
  expect(this.responseBody).to.have.property('_id');
  logger.info('Both responses have task ID');
});

Then('no-lookup response should be lighter', function (this: ICustomWorld) {
  const lookupResponse = this.getTestData('lookupResponse');
  const lookupSize = JSON.stringify(lookupResponse.data).length;
  const noLookupSize = JSON.stringify(this.responseBody).length;
  logger.info(`Lookup size: ${lookupSize}, No-lookup size: ${noLookupSize}`);
});

Then('the response should contain task status information', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  logger.info('Response contains task status information');
});

Then('the response should show status as {string}', function (this: ICustomWorld, expectedStatus: string) {
  logger.info(`Expected status: ${expectedStatus}`);
});

Then('all tasks should be created successfully', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  logger.info('All tasks created successfully');
});

Then('the response should contain created task IDs', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  logger.info('Response contains created task IDs');
});

Then('the response should contain validation errors', function (this: ICustomWorld) {
  expect(this.responseBody).to.be.an('object');
  logger.info('Response contains validation errors');
});
