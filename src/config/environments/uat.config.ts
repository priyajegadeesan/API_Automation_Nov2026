export const uatConfig = {
  name: 'UAT',
  baseURL: 'https://api.opsera-uat.opsera.io/api',
  customerID: '67caf6137242d37590c9f060',
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
