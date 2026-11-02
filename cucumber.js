module.exports = {
  default: {
    require: ['src/steps/**/*.ts', 'src/hooks/**/*.ts', 'features/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    parallel: 1,
    timeout: 300000 // 300 seconds timeout for slow API endpoints like retrieve-all-users (takes 53+ seconds)
  }
};
