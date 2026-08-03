export const prodConfig = {
  name: 'PROD',
  baseURL: 'https://app.opsera.io/api',
  customerID: '5f75953446564c10379902bb',
  apiTimeout: 45000,
  retries: 1,
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
