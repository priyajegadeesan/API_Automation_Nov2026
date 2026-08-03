import * as dotenv from 'dotenv';
import { getEnvironmentConfig, EnvironmentConfig } from './environments';
import * as path from 'path';

// Load environment-specific .env file
const currentEnv = process.env.ENV || 'test';
const envPath = path.resolve(process.cwd(), `.env.${currentEnv}`);
dotenv.config({ path: envPath });

const envConfig: EnvironmentConfig = getEnvironmentConfig(currentEnv);

export const config = {
  env: currentEnv,
  baseURL: process.env.BASE_URL || envConfig.baseURL,
  customerID: process.env.CUSTOMER_ID || envConfig.customerID,
  apiTimeout: parseInt(process.env.API_TIMEOUT || envConfig.apiTimeout.toString()),
  apiKey: process.env.API_KEY || '',
  authToken: process.env.AUTH_TOKEN || '',
  bearerToken: process.env.BEARER_TOKEN || '',
  scimBearerToken: process.env.SCIM_BEARER_TOKEN || '',
  parallelWorkers: parseInt(process.env.PARALLEL_WORKERS || '2'),
  retries: envConfig.retries,
};

export const endpoints = {
  users: envConfig.endpoints.users,
  search: envConfig.endpoints.search,
  groups: envConfig.endpoints.groups,
  projects: envConfig.endpoints.projects,
  pipelines: envConfig.endpoints.pipelines,
  tasks: envConfig.endpoints.tasks,
  // Legacy endpoints for backward compatibility
  posts: '/posts',
  comments: '/comments',
  albums: '/albums',
  photos: '/photos',
  todos: '/todos',
};
