import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ICustomWorld } from '../hooks/world';
import { DataTable } from '@cucumber/cucumber';
import { config } from '../config/config';
import logger from '../utils/logger';
import { request } from '@playwright/test';

// =====================================================
// SCIM AUTHENTICATION
// =====================================================

Given('I am authenticated with valid SCIM credentials', async function (this: ICustomWorld) {
  // Create a new request context with SCIM token
  if (this.scimRequest) {
    await this.scimRequest.dispose();
  }
  
  // Extract base URL without the /api path for SCIM endpoints
  const scimBaseUrl = config.baseURL.replace(/\/api\/?$/, '');
  logger.info(`Creating SCIM context with baseURL: ${scimBaseUrl}`);
  logger.info(`SCIM Bearer Token present: ${config.scimBearerToken ? 'Yes' : 'No'}`);
  logger.info(`Customer ID: ${config.customerID}`);
  
  this.scimRequest = await request.newContext({
    baseURL: scimBaseUrl,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.scimBearerToken}`,
    },
    timeout: config.apiTimeout,
  });
  
  logger.info('SCIM authentication configured with SCIM bearer token (without X-Customer-ID)');
});

Given('I am authenticated with valid SCIM PROD credentials', async function (this: ICustomWorld) {
  // Create a new request context with SCIM PROD token
  // For now, using the same token as UAT, but this can be configured separately
  if (this.scimRequest) {
    await this.scimRequest.dispose();
  }
  
  this.scimRequest = await request.newContext({
    baseURL: config.baseURL,
    extraHTTPHeaders: {
      'Accept': 'application/scim+json',
      'Content-Type': 'application/scim+json',
      'Authorization': `Bearer ${config.scimBearerToken}`,
      ...(config.customerID && { 'X-Customer-ID': config.customerID }),
    },
    timeout: config.apiTimeout,
  });
  
  logger.info('SCIM PROD authentication configured with SCIM bearer token');
});

Given('I have an existing SCIM user ID', async function (this: ICustomWorld) {
  // Set a default SCIM user ID for testing
  // In a real scenario, this would be fetched from a previous test or database
  const defaultScimUserId = '6a0ac21845577a4c76f8a7c94'; // Example SCIM user ID
  this.setTestData('scimUserId', defaultScimUserId);
  logger.info(`SCIM User ID set to: ${defaultScimUserId}`);
});

// =====================================================
// SCIM USER OPERATIONS
// =====================================================

When('I send a POST request to {string} with user data:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const userData = dataTable.rowsHash();
    
    // Build SCIM user object
    const scimUser = {
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      userName: userData.userName,
      name: {
        givenName: userData.givenName,
        familyName: userData.familyName
      },
      emails: [{
        value: userData.userName,
        primary: true
      }],
      active: true
    };
    
    logger.info(`Creating SCIM user: ${JSON.stringify(scimUser, null, 2)}`);
    
    const response = await this.scimRequest.post(endpoint, { data: scimUser });
    this.setResponse({ status: response.status() });
    
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    
    logger.info(`SCIM User creation response status: ${response.status()}`);
    logger.info(`Response body: ${JSON.stringify(responseBody, null, 2)}`);
  } catch (error: any) {
    logger.error(`SCIM User creation failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a GET request to {string} for SCIM users', async function (this: ICustomWorld, endpoint: string) {
  try {
    const response = await this.scimRequest.get(endpoint);
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    logger.info(`SCIM Users retrieved, status: ${response.status()}`);
  } catch (error: any) {
    logger.error(`SCIM Users retrieval failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a GET request to {string} for SCIM user by ID', async function (this: ICustomWorld, endpoint: string) {
  try {
    const userId = this.getTestData('scimUserId') || '65a1234567890abcdef12345';
    const url = endpoint.replace('{userId}', userId);
    const response = await this.scimRequest.get(url);
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    logger.info(`SCIM User retrieved, status: ${response.status()}`);
  } catch (error: any) {
    logger.error(`SCIM User retrieval failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a PUT request to {string} to update SCIM user with:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const userId = this.getTestData('scimUserId') || '65a1234567890abcdef12345';
    const url = endpoint.replace('{userId}', userId);
    const updateData = dataTable.rowsHash();
    
    const scimUpdate = {
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      userName: updateData.userName,
      name: {
        givenName: updateData.givenName,
        familyName: updateData.familyName
      }
    };
    
    const response = await this.scimRequest.put(url, { data: scimUpdate });
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    logger.info(`SCIM User updated, status: ${response.status()}`);
  } catch (error: any) {
    logger.error(`SCIM User update failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a PATCH request to {string} to modify SCIM user', async function (this: ICustomWorld, endpoint: string) {
  try {
    const userId = this.getTestData('scimUserId') || '65a1234567890abcdef12345';
    const url = endpoint.replace('{userId}', userId);
    
    const patchOperations = {
      schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
      Operations: [
        {
          op: "replace",
          path: "active",
          value: false
        }
      ]
    };
    
    const response = await this.scimRequest.patch(url, { data: patchOperations });
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    logger.info(`SCIM User patched, status: ${response.status()}`);
  } catch (error: any) {
    logger.error(`SCIM User patch failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

// =====================================================
// SCIM GROUP OPERATIONS
// =====================================================

When('I send a POST request to {string} with group data:', async function (this: ICustomWorld, endpoint: string, dataTable: DataTable) {
  try {
    const groupData = dataTable.rowsHash();
    
    const scimGroup = {
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:Group"],
      displayName: groupData.displayName,
      members: []
    };
    
    const response = await this.scimRequest.post(endpoint, { data: scimGroup });
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    logger.info(`SCIM Group created, status: ${response.status()}`);
  } catch (error: any) {
    logger.error(`SCIM Group creation failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a GET request to {string} for SCIM groups', async function (this: ICustomWorld, endpoint: string) {
  try {
    const response = await this.scimRequest.get(endpoint);
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    logger.info(`SCIM Groups retrieved, status: ${response.status()}`);
  } catch (error: any) {
    logger.error(`SCIM Groups retrieval failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

When('I send a PATCH request to {string} to modify SCIM group', async function (this: ICustomWorld, endpoint: string) {
  try {
    const groupId = this.getTestData('scimGroupId') || '65a1234567890abcdef12345';
    const url = endpoint.replace('{groupId}', groupId);
    
    const patchOperations = {
      schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
      Operations: [
        {
          op: "add",
          path: "members",
          value: [
            {
              value: "65a1234567890abcdef12346",
              display: "Test User"
            }
          ]
        }
      ]
    };
    
    const response = await this.scimRequest.patch(url, { data: patchOperations });
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    logger.info(`SCIM Group patched, status: ${response.status()}`);
  } catch (error: any) {
    logger.error(`SCIM Group patch failed: ${error.message}`);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

// =====================================================
// SCIM ASSERTIONS
// =====================================================

Then('the response should contain SCIM user schema', async function (this: ICustomWorld) {
  expect(this.responseBody).to.have.property('schemas');
  expect(this.responseBody.schemas).to.include('urn:ietf:params:scim:schemas:core:2.0:User');
  logger.info('Verified SCIM user schema');
});

Then('the user should have a unique SCIM ID', async function (this: ICustomWorld) {
  expect(this.responseBody).to.have.property('id');
  expect(this.responseBody.id).to.be.a('string').and.not.be.empty;
  this.setTestData('scimUserId', this.responseBody.id);
  logger.info(`SCIM User ID: ${this.responseBody.id}`);
});

Then('the response should contain SCIM group schema', async function (this: ICustomWorld) {
  expect(this.responseBody).to.have.property('schemas');
  expect(this.responseBody.schemas).to.include('urn:ietf:params:scim:schemas:core:2.0:Group');
  logger.info('Verified SCIM group schema');
});

Then('the group should have a unique SCIM ID', async function (this: ICustomWorld) {
  expect(this.responseBody).to.have.property('id');
  expect(this.responseBody.id).to.be.a('string').and.not.be.empty;
  this.setTestData('scimGroupId', this.responseBody.id);
  logger.info(`SCIM Group ID: ${this.responseBody.id}`);
});

Then('the response should contain a list of SCIM users', async function (this: ICustomWorld) {
  expect(this.responseBody).to.have.property('Resources');
  expect(this.responseBody.Resources).to.be.an('array');
  logger.info(`SCIM Users count: ${this.responseBody.Resources.length}`);
});

Then('the response should contain a list of SCIM groups', async function (this: ICustomWorld) {
  expect(this.responseBody).to.have.property('Resources');
  expect(this.responseBody.Resources).to.be.an('array');
  logger.info(`SCIM Groups count: ${this.responseBody.Resources.length}`);
});

Then('the response should contain SCIM ListResponse schema', async function (this: ICustomWorld) {
  // Validate SCIM ListResponse format according to RFC 7644
  expect(this.responseBody).to.have.property('schemas');
  expect(this.responseBody.schemas).to.be.an('array');
  expect(this.responseBody.schemas).to.include('urn:ietf:params:scim:api:messages:2.0:ListResponse');
  
  // Validate required ListResponse properties
  expect(this.responseBody).to.have.property('Resources');
  expect(this.responseBody.Resources).to.be.an('array');
  
  expect(this.responseBody).to.have.property('totalResults');
  expect(this.responseBody.totalResults).to.be.a('number');
  
  // Optional properties that might be present
  if (this.responseBody.startIndex !== undefined) {
    expect(this.responseBody.startIndex).to.be.a('number');
  }
  
  if (this.responseBody.itemsPerPage !== undefined) {
    expect(this.responseBody.itemsPerPage).to.be.a('number');
  }
  
  logger.info(`✅ SCIM ListResponse schema validated - Total Results: ${this.responseBody.totalResults}, Resources: ${this.responseBody.Resources.length}`);
});

Then('the SCIM user should be updated', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
  expect(this.responseBody).to.have.property('id');
  logger.info('SCIM user updated successfully');
});

Then('the SCIM group should be updated', async function (this: ICustomWorld) {
  expect(this.response.status).to.equal(200);
  expect(this.responseBody).to.have.property('id');
  logger.info('SCIM group updated successfully');
});
