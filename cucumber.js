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
    parallel: 1
  }
};
