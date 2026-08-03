import { Given, When } from '@cucumber/cucumber';
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

    console.log(`🔑 Using Bearer Token: ${config.bearerToken ? 'Present' : 'Missing'}`);
      console.log(`📡 Sending POST to: ${config.baseURL}/api/v2/global-parameters/create`);
      console.log(`📦 Request Body:`, JSON.stringify(requestBody, null, 2));

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
    
    console.log(`✅ Response Status: ${response.status()}`);
    console.log(`📥 Response Body:`, JSON.stringify(responseBody, null, 2));
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
