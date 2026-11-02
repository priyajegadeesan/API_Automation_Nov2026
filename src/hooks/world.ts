import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { APIRequestContext, request } from '@playwright/test';
import { TasksV2Service } from '../services/TasksV2Service';
import { config } from '../config/config';
import logger from '../utils/logger';

export interface ICustomWorld extends World {
  request: APIRequestContext;
  scimRequest: APIRequestContext;
  tasksV2Service: TasksV2Service;
  response: any;
  responseBody: any;
  testData: Map<string, any>;
  init(): Promise<void>;
  cleanup(): Promise<void>;
  setResponse(response: any): void;
  setResponseBody(body: any): void;
  setTestData(key: string, value: any): void;
  getTestData(key: string): any;
}

export class CustomWorld extends World implements ICustomWorld {
  public request!: APIRequestContext;
  public scimRequest!: APIRequestContext;
  public tasksV2Service!: TasksV2Service;
  public response: any;
  public responseBody: any;
  public testData: Map<string, any>;

  constructor(options: IWorldOptions) {
    super(options);
    this.testData = new Map();
    this.response = null;
    this.responseBody = null;
  }

  async init() {
    logger.info(`Initializing API Request Context for ${config.env.toUpperCase()} environment`);
    logger.info(`Base URL: ${config.baseURL}`);
    logger.info(`Customer ID: ${config.customerID}`);
    logger.info(`Bearer Token: ${config.bearerToken ? 'Present' : 'Missing'}`);
    
    this.request = await request.newContext({
      baseURL: config.baseURL,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(config.customerID && { 'X-Customer-ID': config.customerID }),
        ...(config.bearerToken && { 'Authorization': `Bearer ${config.bearerToken}` }),
      },
      timeout: config.apiTimeout,
      ignoreHTTPSErrors: true, // Ignore SSL certificate errors for testing
    });

    this.tasksV2Service = new TasksV2Service(this.request);
    logger.info('API Services initialized successfully');
  }

  async cleanup() {
    if (this.request) {
      logger.info('Disposing API Request Context');
      await this.request.dispose();
    }
    if (this.scimRequest) {
      logger.info('Disposing SCIM Request Context');
      await this.scimRequest.dispose();
    }
  }

  setResponse(response: any) {
    this.response = response;
  }

  setResponseBody(body: any) {
    this.responseBody = body;
  }

  setTestData(key: string, value: any) {
    this.testData.set(key, value);
  }

  getTestData(key: string): any {
    return this.testData.get(key);
  }
}

setWorldConstructor(CustomWorld);
