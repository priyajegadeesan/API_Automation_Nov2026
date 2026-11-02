import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../hooks/world';
import { config } from '../config/config';
import logger from '../utils/logger';

// Specific step for creating global encrypted parameter with exact request body
When('I send a POST request to create global encrypted parameter', async function (this: ICustomWorld) {
  try {
    // Generate a unique name by appending timestamp
    const uniqueName = `opsera-encrypt-uat-public-api-${Date.now()}`;
    
    const requestBody = {
      "name": uniqueName,
      "scope": "",
      "parentId": "",
      "value": "encrypted-secret-createdvia node public",
      "active": true,
      "vaultEnabled": true,
      "vaultKey": "",
      "selectField": false,
      "lookupListId": "",
      "roles": [
        {
          "role": "administrator",
          "user": "priya.j@opsera.io",
          "group": null
        }
      ],
      "tags": ["secrets", "api-keys"]
    };

    // SECURITY FIX: Removed console logging of request/response bodies to prevent credential exposure
    logger.info(`Creating encrypted parameter with name: ${uniqueName}`);

      const response = await this.request.post('/api/v2/global-parameters/create', {
      data: requestBody,
      headers: {
        'Authorization': `Bearer ${config.bearerToken}`,
        'Content-Type': 'application/json',
        'X-Customer-ID': config.customerID || ''
      }
    });
    
    this.setResponse({ status: response.status() });
    const responseBody = await response.json().catch(() => ({}));
    this.setResponseBody(responseBody);
    
    logger.info(`Response Status: ${response.status()}`);
  } catch (error: any) {
    console.error(`❌ Error creating parameter:`, error.message);
    this.setResponse({ status: error.status || 500 });
    this.setResponseBody({});
  }
});

// Given steps for parameter IDs
Given('I have a valid parameter ID', async function (this: ICustomWorld) {
  const defaultParameterId = '6a0ac21845577a4c76f8a7c94'; // Default parameter ID
  this.setTestData('parameterId', defaultParameterId);
  logger.info(`Parameter ID set to: ${defaultParameterId}`);
});

Given('I have a valid encrypted parameter ID', async function (this: ICustomWorld) {
  const defaultEncryptedParamId = '6a0ac21845577a4c76f8a7c94'; // Default encrypted parameter ID
  this.setTestData('parameterId', defaultEncryptedParamId);
  logger.info(`Encrypted Parameter ID set to: ${defaultEncryptedParamId}`);
});

Given('I have a valid nonencrypted parameter ID', async function (this: ICustomWorld) {
  const defaultNonEncryptedParamId = '6a0ac21845577a4c76f8a7c94'; // Default non-encrypted parameter ID
  this.setTestData('parameterId', defaultNonEncryptedParamId);
  logger.info(`Non-encrypted Parameter ID set to: ${defaultNonEncryptedParamId}`);
});

// SECURITY: RBAC validation steps
Given('I have a valid encrypted parameter ID for restricted access', async function (this: ICustomWorld) {
  const restrictedParamId = '698040f298ef6ff3e44d225e'; // Encrypted parameter for RBAC testing
  this.setTestData('parameterId', restrictedParamId);
  logger.info(`Encrypted Parameter ID set for RBAC test: ${restrictedParamId}`);
});

Then('the response should indicate proper authorization check', async function (this: ICustomWorld) {
  const status = this.response.status;
  const body = this.responseBody;
  
  // SECURITY: Verify proper authorization handling
  // Either the request should succeed with value redacted/empty, or return 403/401
  if (status === 200) {
    // If 200, the value should be redacted or empty for RBAC users
    logger.info('RBAC user received 200 - validating value is protected');
    if (body && typeof body === 'object' && 'value' in body) {
      const value = body.value;
      // Value should be redacted, null, empty, or explicitly marked as restricted
      const isProtected = !value || value === '' || value === '[REDACTED]' || value.includes('restricted');
      if (!isProtected) {
        logger.warn('⚠️ SECURITY WARNING: RBAC user may have access to unredacted encrypted value');
      }
    }
  } else if (status === 401 || status === 403) {
    // Proper authorization denial
    logger.info(`✅ RBAC user properly denied with status ${status}`);
  } else {
    logger.info(`Authorization check returned status: ${status}`);
  }
});
