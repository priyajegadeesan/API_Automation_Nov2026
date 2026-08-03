export const testConfig = {
  name: 'TEST',
  baseURL: 'https://api.opsera-test.opsera.io/api',
  customerID: '6389f1a83527c100737ece11',
  apiTimeout: 30000,
  retries: 2,
  endpoints: {
    users: '/users',
    search: '/users/search',
    groups: '/groups',
    projects: '/projects',
    pipelines: '/pipelines',
    tasks: '/tasks',
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};
