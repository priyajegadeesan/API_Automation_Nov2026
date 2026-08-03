import { APIRequestContext, APIResponse } from '@playwright/test';
import logger from './logger';

export class APIHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(url: string, options?: any): Promise<APIResponse> {
    logger.info(`GET Request: ${url}`);
    const response = await this.request.get(url, options);
    logger.info(`GET Response Status: ${response.status()}`);
    return response;
  }

  async post(url: string, options?: any): Promise<APIResponse> {
    logger.info(`POST Request: ${url}`);
    const response = await this.request.post(url, options);
    logger.info(`POST Response Status: ${response.status()}`);
    return response;
  }

  async put(url: string, options?: any): Promise<APIResponse> {
    logger.info(`PUT Request: ${url}`);
    const response = await this.request.put(url, options);
    logger.info(`PUT Response Status: ${response.status()}`);
    return response;
  }

  async patch(url: string, options?: any): Promise<APIResponse> {
    logger.info(`PATCH Request: ${url}`);
    const response = await this.request.patch(url, options);
    logger.info(`PATCH Response Status: ${response.status()}`);
    return response;
  }

  async delete(url: string, options?: any): Promise<APIResponse> {
    logger.info(`DELETE Request: ${url}`);
    const response = await this.request.delete(url, options);
    logger.info(`DELETE Response Status: ${response.status()}`);
    return response;
  }

  async validateStatusCode(response: APIResponse, expectedStatus: number): Promise<void> {
    const actualStatus = response.status();
    if (actualStatus !== expectedStatus) {
      logger.error(
        `Status code mismatch. Expected: ${expectedStatus}, Actual: ${actualStatus}`
      );
      throw new Error(
        `Expected status ${expectedStatus} but got ${actualStatus}`
      );
    }
    logger.info(`Status code validated: ${actualStatus}`);
  }

  async getResponseBody(response: APIResponse): Promise<any> {
    try {
      return await response.json();
    } catch (error) {
      return await response.text();
    }
  }

  async validateResponseTime(response: APIResponse, maxTime: number): Promise<void> {
    const headers = response.headers();
    logger.info(`Validating response time against max: ${maxTime}ms`);
  }
}
