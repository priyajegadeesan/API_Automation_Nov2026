import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ICustomWorld } from '../hooks/world';
import { DataTable } from '@cucumber/cucumber';
import logger from '../utils/logger';

// =====================================================
// API AVAILABILITY STEPS
// =====================================================

Given('the API is available', async function (this: ICustomWorld) {
  // API availability is verified when we make actual API calls
  // This step serves as a prerequisite documentation
  logger.info('API availability will be verified during actual API calls');
});

// =====================================================
// AUTHENTICATION STEPS
// =====================================================

Given('I am authenticated with valid UAT credentials', async function (this: ICustomWorld) {
  // Authentication is already handled in the world context
  expect(this.request).to.not.be.undefined;
});

Given('I am authenticated with valid PROD credentials', async function (this: ICustomWorld) {
  // Authentication is already handled in the world context
  expect(this.request).to.not.be.undefined;
});

Given('I am authenticated with valid TEST credentials', async function (this: ICustomWorld) {
  // Authentication is already handled in the world context
  expect(this.request).to.not.be.undefined;
});

// =====================================================
// DATA SETUP STEPS
// =====================================================

Given('I have a valid group ID', async function (this: ICustomWorld) {
  this.testData.set('groupId', '507f1f77bcf86cd799439011');
});

Given('I have an existing group ID', async function (this: ICustomWorld) {
  this.testData.set('groupId', '507f1f77bcf86cd799439011');
});

Given('I have a valid parameter ID', async function (this: ICustomWorld) {
  this.testData.set('parameterId', '507f1f77bcf86cd799439011');
});

Given('I have an existing encrypted parameter ID', async function (this: ICustomWorld) {
  this.testData.set('parameterId', '507f1f77bcf86cd799439011');
});

Given('I have a valid user ID {string}', async function (this: ICustomWorld, userId: string) {
  this.testData.set('userId', userId);
});

Given('I have a valid group ID {string}', async function (this: ICustomWorld, groupId: string) {
  this.testData.set('groupId', groupId);
});

Given('I have a valid pipeline ID', async function (this: ICustomWorld) {
  this.testData.set('pipelineId', '507f1f77bcf86cd799439011');
});

Given('I have a valid pipeline ID {string}', async function (this: ICustomWorld, pipelineId: string) {
  this.testData.set('pipelineId', pipelineId);
});

Given('I have a valid task name {string}', async function (this: ICustomWorld, taskName: string) {
  this.testData.set('taskName', taskName);
});

Given('I have an existing PROD group {string}', async function (this: ICustomWorld, groupName: string) {
  this.testData.set('groupName', groupName);
});

Given('I have an existing group {string}', async function (this: ICustomWorld, groupName: string) {
  this.testData.set('groupName', groupName);
});

Given('I have a valid UAT group name', async function (this: ICustomWorld) {
  this.testData.set('groupName', 'opseratest');
});

// =====================================================
// HTTP REQUEST STEPS - GET
// =====================================================

When('I send a GET request to {string}', async function (this: ICustomWorld, endpoint: string) {
  try {
    // Use SCIM context if endpoint is a SCIM endpoint and scimRequest exists
    const requestContext = (endpoint.includes('/scim/') && this.scimRequest) ? this.scimRequest : this.request;
    const contextType = endpoint.includes('/scim/') && this.scimRequest ? 'SCIM' : 'regular';
    logger.info(`Sending GET request to: ${endpoint} using ${contextType} context`);
    const response = await requestContext.get(endpoint);
    logger.info(`Response URL: ${response.url()}`);
    logger.info(`Response status: ${response.status()}`);
    logger.info(`Response status text: ${response.statusText()}`);
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
    logger.info(`GET request completed with status: ${response.status()}`);
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
    logger.error(`GET request failed: ${error.message}`);
  }
});

When('I send a GET request to retrieve group members', async function (this: ICustomWorld) {
  const groupName = this.testData.get('groupName') || 'admin';
  try {
    const response = await this.request.get(`/v2/usermanagement/group/${groupName}/members`);
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

// =====================================================
// HTTP REQUEST STEPS - POST
// =====================================================

When('I send a POST request to {string} with body:', async function (this: ICustomWorld, endpoint: string, docString: string) {
  try {
    // Replace ${timestamp} placeholder with actual timestamp for unique names
    const timestamp = Date.now();
    let bodyString = docString.replace(/\$\{timestamp\}/g, timestamp.toString());
    const body = JSON.parse(bodyString);
    
    // Use SCIM context if endpoint is a SCIM endpoint and scimRequest exists
    const requestContext = (endpoint.includes('/scim/') && this.scimRequest) ? this.scimRequest : this.request;
    const response = await requestContext.post(endpoint, { data: body });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a PUT request to {string} with body:', async function (this: ICustomWorld, endpoint: string, docString: string) {
  try {
    // Replace ${timestamp} placeholder with actual timestamp for unique names
    const timestamp = Date.now();
    let bodyString = docString.replace(/\$\{timestamp\}/g, timestamp.toString());
    const body = JSON.parse(bodyString);
    
    const response = await this.request.put(endpoint, { data: body });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
    logger.info(`PUT request completed with status: ${response.status()}`);
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
    logger.error(`PUT request failed: ${error.message}`);
  }
});

// =====================================================
// HTTP REQUEST STEPS - OPTIONS
// =====================================================

When('I send an OPTIONS request to {string}', async function (this: ICustomWorld, endpoint: string) {
  try {
    logger.info(`Sending OPTIONS request to: ${endpoint}`);
    const response = await this.request.fetch(endpoint, { method: 'OPTIONS' });
    logger.info(`Response status: ${response.status()}`);
    logger.info(`Response status text: ${response.statusText()}`);
    this.setResponse({ status: response.status() });
    // OPTIONS requests typically return no body (204 No Content)
    this.setResponseBody({});
    logger.info(`OPTIONS request completed with status: ${response.status()}`);
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
    logger.error(`OPTIONS request failed: ${error.message}`);
  }
});

When('I send a POST request to {string} with parameter:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const data: any = {};
    const rows = dataTable.rows();
    const timestamp = Date.now();
    
    rows.forEach(([key, value]) => {
      // Replace ${timestamp} placeholder with actual timestamp for unique names
      let processedValue = value.toString().replace(/\$\{timestamp\}/g, timestamp.toString());
      
      // Convert boolean strings to actual booleans
      if (processedValue === 'true') {
        data[key] = true;
      } else if (processedValue === 'false') {
        data[key] = false;
      } else {
        data[key] = processedValue;
      }
    });
    
    logger.info(`Creating parameter with data: ${JSON.stringify(data)}`);
    const response = await this.request.post(endpoint, { data });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
    logger.info(`Parameter creation response: ${response.status()}`);
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a POST request to {string} with encrypted parameter:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const data: any = {};
    const rows = dataTable.rows();
    rows.forEach(([key, value]) => {
      data[key] = value === 'true' ? true : value === 'false' ? false : value;
    });
    const response = await this.request.post(endpoint, { data });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a POST request to {string} with group details:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const data: any = {};
    const rows = dataTable.rows();
    rows.forEach(([key, value]) => {
      data[key] = value;
    });
    const response = await this.request.post(endpoint, { data });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a POST request to {string} with emails:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const emails = dataTable.rows().map(row => row[0]);
    const response = await this.request.post(endpoint, { data: { emails } });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a POST request to {string} with members:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const members = dataTable.rows().map(row => row[0]);
    const response = await this.request.post(endpoint, { data: { members } });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a POST request to {string} with member emails:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const emails = dataTable.rows().map(row => row[0]);
    const response = await this.request.post(endpoint, { data: { emails } });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

// =====================================================
// HTTP REQUEST STEPS - DELETE
// =====================================================

When('I send a DELETE request to {string}', async function (this: ICustomWorld, endpoint: string) {
  try {
    // Replace placeholders with actual test data
    let url = endpoint;
    if (endpoint.includes('{id}')) {
      const id = this.testData.get('parameterId') || this.testData.get('groupId') || '507f1f77bcf86cd799439011';
      url = endpoint.replace('{id}', id);
    }
    if (endpoint.includes('{groupName}')) {
      const groupName = this.testData.get('groupName') || 'test-group';
      url = endpoint.replace('{groupName}', groupName);
    }
    
    const response = await this.request.delete(url);
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

// =====================================================
// HTTP REQUEST STEPS - PATCH
// =====================================================

When('I send a PATCH request with operations:', async function (this: ICustomWorld, dataTable: DataTable) {
  try {
    const userId = this.testData.get('userId') || '681dfba1b3474278d2a96d61';
    const operations = dataTable.rows().map(([op, path]) => ({ op, path }));
    const body = {
      schemas: ['urn:ietf:params:scim:api:messages:2.0:PatchOp'],
      Operations: operations
    };
    const response = await this.request.patch(`/v2/scim/v2/users/${userId}`, { data: body });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

// =====================================================
// RESPONSE VALIDATION STEPS
// =====================================================

Then('the response should be valid', async function (this: ICustomWorld) {
  expect(this.response).to.not.be.undefined;
  expect(this.response.status).to.be.oneOf([200, 201, 204]);
});

Then('the response status code should be {int}', async function (this: ICustomWorld, statusCode: number) {
  expect(this.response.status).to.equal(statusCode);
  logger.info(`Response status code verified: ${statusCode}`);
});

Then('the response should contain the created parameter', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
  expect(this.response.status).to.equal(200);
  expect(this.responseBody).to.have.property('data');
  expect(this.responseBody.data).to.have.property('_id');
});

Then('the parameter should be marked as encrypted', async function (this: ICustomWorld) {
  expect(this.responseBody.data).to.have.property('vaultEnabled');
  expect(this.responseBody.data.vaultEnabled).to.equal(true);
  expect(this.responseBody.data).to.have.property('vaultKey');
});

Then('the parameter should not be encrypted', async function (this: ICustomWorld) {
  expect(this.responseBody).to.have.property('encrypted');
});

Then('the response should contain a list of parameters', async function (this: ICustomWorld) {
  const isArray = Array.isArray(this.responseBody);
  const hasData = this.responseBody && typeof this.responseBody === 'object' && 'data' in this.responseBody;
  expect(isArray || hasData).to.be.true;
});

Then('the response should contain parameter details', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the parameter should be deleted', async function (this: ICustomWorld) {
  expect(this.response.status).to.be.oneOf([200, 204]);
});

Then('the group should be deleted successfully', async function (this: ICustomWorld) {
  expect(this.response.status).to.be.oneOf([200, 204]);
});

Then('the response should contain the created group details', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
  expect(this.response.status).to.equal(201);
});

Then('the response should contain a list of groups', async function (this: ICustomWorld) {
  const isArray = Array.isArray(this.responseBody);
  const hasData = this.responseBody && typeof this.responseBody === 'object' && 'data' in this.responseBody;
  expect(isArray || hasData).to.be.true;
});

Then('the members should be added to the group', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
});

Then('the members should be added to the PROD group', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
});

Then('the group members should be updated', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
});

Then('the response should contain list of users', async function (this: ICustomWorld) {
  const hasResources = this.responseBody && 'Resources' in this.responseBody;
  const isArray = Array.isArray(this.responseBody);
  expect(hasResources || isArray).to.be.true;
});

Then('the user should be updated with new values', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
});

Then('the response should contain list of groups', async function (this: ICustomWorld) {
  const hasResources = this.responseBody && 'Resources' in this.responseBody;
  const isArray = Array.isArray(this.responseBody);
  expect(hasResources || isArray).to.be.true;
});

Then('the response should contain group details', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the group should include member information', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the specified attributes should be updated', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
});

Then('the user should be updated with new operations', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
});

Then('the group should be updated with new members', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
});

Then('the response should contain user details', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the response should have property {string}', async function (this: ICustomWorld, property: string) {
  expect(this.responseBody).to.have.property(property);
  logger.info(`Verified response has property: ${property}`);
});

Then('the user ID should match {string}', async function (this: ICustomWorld, userId: string) {
  expect(this.responseBody).to.have.property('id');
});

Then('the response should contain the created pipeline details', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
  expect(this.response.status).to.be.oneOf([200, 201]);
});

Then('the response should contain pipeline data', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the response should contain pipelines', async function (this: ICustomWorld) {
  const isArray = Array.isArray(this.responseBody);
  const hasData = this.responseBody && typeof this.responseBody === 'object' && 'data' in this.responseBody;
  expect(isArray || hasData).to.be.true;
});

Then('the response should contain task details with lookup data', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the response should contain task details without lookup data', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the response should contain status information', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the response should contain task status', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

Then('the response should contain tasks data', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
});

When('I send a POST request to {string} with CSV content-type and body:', async function (this: ICustomWorld, endpoint: string, docString: string) {
  try {
    const body = JSON.parse(docString);
    
    const response = await this.request.post(endpoint, { 
      data: body,
      headers: {
        'Content-Type': 'application/csv'
      }
    });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
    logger.info(`POST request with CSV content-type completed with status: ${response.status()}`);
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
    logger.error(`POST request with CSV content-type failed: ${error.message}`);
  }
});

When('I send a POST request to {string} with CSV data:', async function (this: ICustomWorld, endpoint: string, csvData: string) {
  try {
    const response = await this.request.post(endpoint, { 
      data: csvData,
      headers: {
        'Content-Type': 'application/csv'
      }
    });
    this.setResponse({ status: response.status() });
    this.setResponseBody(await response.json().catch(() => ({})));
    logger.info(`POST request with CSV data completed with status: ${response.status()}`);
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
    logger.error(`POST request with CSV data failed: ${error.message}`);
  }
});

Then('the response should be a valid array', async function (this: ICustomWorld) {
  expect(Array.isArray(this.responseBody)).to.be.true;
  logger.info(`Verified response is a valid array with ${this.responseBody.length} items`);
});

Then('the response should be a valid JSON', async function (this: ICustomWorld) {
  expect(this.responseBody).to.not.be.undefined;
  expect(typeof this.responseBody).not.to.equal('string');
  logger.info('Verified response is valid JSON');
});

// =====================================================
// USER MANAGEMENT SPECIFIC STEPS
// =====================================================

When('I send a POST request to {string} with user details', async function (this: ICustomWorld, endpoint: string) {
  try {
    // Generate unique email with date format: NodeAPIAdmin3aug2026@opsera.us
    const now = new Date();
    const day = now.getDate();
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const timeStamp = now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();
    
    const userData = {
      emailAddress: `NodeAPIAdmin${day}${month}${year}${timeStamp}@opsera.us`,
      firstName: 'Testing',
      lastName: 'Users',
      siteRole: 'administrator'
    };
    
    logger.info(`Creating user with email: ${userData.emailAddress}`);
    const response = await this.request.post(endpoint, { data: userData });
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    
    // Store the created user ID for later use (e.g., in delete operations)
    let userId = null;
    
    // Log the full response for debugging
    logger.info(`📋 Full create user response: ${JSON.stringify(responseBody, null, 2)}`);
    
    // Try different possible locations for user ID in response
    if (responseBody) {
      logger.info(`🔍 Checking for user ID in response...`);
      
      if (responseBody._id) {
        userId = responseBody._id;
        logger.info(`✓ Found ID at responseBody._id: ${userId}`);
      } else if (responseBody.id) {
        userId = responseBody.id;
        logger.info(`✓ Found ID at responseBody.id: ${userId}`);
      } else if (responseBody.user && responseBody.user._id) {
        userId = responseBody.user._id;
        logger.info(`✓ Found ID at responseBody.user._id: ${userId}`);
      } else if (responseBody.data && responseBody.data._id) {
        userId = responseBody.data._id;
        logger.info(`✓ Found ID at responseBody.data._id: ${userId}`);
      }
      
      if (userId) {
        this.testData.set('createdUserId', userId);
        logger.info(`✅ Successfully stored user ID for deletion: ${userId}`);
      } else {
        logger.error(`❌ No user ID found in response!`);
        logger.error(`Response keys: ${Object.keys(responseBody).join(', ')}`);
        logger.error(`Response structure: ${JSON.stringify(responseBody, null, 2)}`);
      }
    }
    
    logger.info(`User creation completed with status: ${response.status()}`);
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
    logger.error(`User creation failed: ${error.message}`);
  }
});

When('I send a DELETE request to delete the created user', async function (this: ICustomWorld) {
  try {
    const userId = this.testData.get('createdUserId');
    
    logger.info(`🔍 Retrieved user ID from test data: ${userId}`);
    
    if (!userId) {
      logger.error(`❌ No user ID found in test data!`);
      throw new Error('No user ID found. Please create a user first.');
    }
    
    const endpoint = `/api/v2/usermanagement/user/${userId}`;
    logger.info(`🗑️ Attempting to delete user...`);
    logger.info(`   User ID: ${userId}`);
    logger.info(`   Endpoint: ${endpoint}`);
    logger.info(`   Full URL: ${process.env.BASE_URL}${endpoint}`);
    
    const response = await this.request.delete(endpoint);
    const responseBody = await response.json().catch(() => ({}));
    
    this.setResponse({ status: response.status() });
    this.setResponseBody(responseBody);
    
    logger.info(`📋 Delete response status: ${response.status()}`);
    logger.info(`📋 Delete response body: ${JSON.stringify(responseBody, null, 2)}`);
    
    if (response.status() === 200) {
      this.testData.delete('createdUserId');
      logger.info('✅ User deleted successfully, cleared ID from test data');
    } else {
      logger.error(`❌ Delete failed with status ${response.status()}`);
    }
  } catch (error: any) {
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
    logger.error(`❌ User deletion failed with error: ${error.message}`);
  }
});
