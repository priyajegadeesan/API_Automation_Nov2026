import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIHelper } from '../utils/apiHelper';
import { config } from '../config/config';
import logger from '../utils/logger';

export class BaseService {
  protected apiHelper: APIHelper;
  protected baseURL: string;

  constructor(request: APIRequestContext) {
    this.apiHelper = new APIHelper(request);
    this.baseURL = config.baseURL;
  }

  protected getFullUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }

  protected async handleResponse(response: APIResponse): Promise<any> {
    const body = await this.apiHelper.getResponseBody(response);
    const status = response.status();
    logger.info(`Response Body: ${JSON.stringify(body)}`);
    return { status, data: body };
  }

  protected getHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (config.bearerToken || config.authToken) {
      defaultHeaders['Authorization'] = `Bearer ${config.bearerToken || config.authToken}`;
    }

    if (config.customerID) {
      defaultHeaders['X-Customer-ID'] = config.customerID;
    }

    return { ...defaultHeaders, ...additionalHeaders };
  }
}
