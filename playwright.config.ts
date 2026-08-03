import { defineConfig } from '@playwright/test';
import { config } from './src/config/config';

export default defineConfig({
  use: {
    baseURL: config.baseURL,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  timeout: config.apiTimeout,
});
