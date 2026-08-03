import { uatConfig } from './uat.config';
import { testConfig } from './test.config';
import { prodConfig } from './prod.config';

export interface EnvironmentConfig {
  name: string;
  baseURL: string;
  customerID: string;
  apiTimeout: number;
  retries: number;
  endpoints: {
    users: string;
    search: string;
    groups: string;
    projects: string;
    pipelines: string;
    tasks: string;
  };
  headers: {
    [key: string]: string;
  };
}

export const environments: Record<string, EnvironmentConfig> = {
  uat: uatConfig,
  test: testConfig,
  prod: prodConfig,
};

export function getEnvironmentConfig(env: string = 'test'): EnvironmentConfig {
  const environment = env.toLowerCase();
  
  if (!environments[environment]) {
    throw new Error(
      `Environment "${env}" not found. Available environments: ${Object.keys(environments).join(', ')}`
    );
  }
  
  return environments[environment];
}

export { uatConfig, testConfig, prodConfig };
