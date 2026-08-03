# API BDD Playwright Framework

A comprehensive BDD (Behavior-Driven Development) framework for API automation using Playwright and Cucumber with TypeScript.

## Features

- **BDD Framework**: Cucumber for writing test scenarios in Gherkin syntax
- **API Testing**: Playwright's powerful API request context
- **Page Object Model**: Service-based architecture for API endpoints
- **TypeScript**: Strongly typed codebase
- **Logging**: Winston logger for detailed test execution logs
- **Reporting**: Multiple report formats (HTML, JSON, JUnit)
- **Configuration Management**: Environment-based configuration using dotenv
- **Parallel Execution**: Support for parallel test execution

## Project Structure

```
API_BDD_Playwright/
├── features/                    # BDD Feature files
│   ├── users.feature           # User API scenarios
│   ├── posts.feature           # Post API scenarios
│   └── support/                # Common step definitions
├── src/
│   ├── config/                 # Configuration files
│   │   └── config.ts          # Environment configuration
│   ├── hooks/                  # Cucumber hooks
│   │   ├── world.ts           # Custom World context
│   │   └── hooks.ts           # Before/After hooks
│   ├── services/               # API Service Objects (POM)
│   │   ├── BaseService.ts     # Base service class
│   │   ├── UserService.ts     # User API service
│   │   └── PostService.ts     # Post API service
│   ├── steps/                  # Step definitions
│   │   ├── userSteps.ts       # User-related steps
│   │   └── postSteps.ts       # Post-related steps
│   └── utils/                  # Utility functions
│       ├── apiHelper.ts       # API helper methods
│       ├── logger.ts          # Winston logger configuration
│       └── reportGenerator.ts # Report generation utility
├── reports/                    # Test reports (generated)
├── logs/                       # Test execution logs (generated)
├── .env.example               # Environment variables template
├── cucumber.js                # Cucumber configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies

```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd API_BDD_Playwright
```

2. Install dependencies:
```bash
npm install
```

3. Choose your environment configuration:
```bash
# For TEST environment (default)
copy .env.test .env

# For UAT environment
copy .env.uat .env

# For PROD environment
copy .env.prod .env
```

4. Update `.env` file with your authentication credentials:
```env
BEARER_TOKEN=your_token_here
AUTH_TOKEN=your_auth_token_here
```

For detailed environment setup, see [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)

## Usage

### Run All Tests
```bash
npm test
```

### Run Tests with Specific Tags
```bash
npm run test:tags "@smoke"
npm run test:tags "@users"
npm run test:tags "@posts and @create"
```

### Run Tests in Parallel
```bash
npm run test:parallel
```

### Generate HTML Report
```bash
npm run report
```

### Clean Reports
```bash
npm run clean
```

## Writing Tests

### Feature File Example
```gherkin
Feature: User API Testing
  
  @smoke @users
  Scenario: Get all users
    When I send a GET request to retrieve all users
    Then the response status code should be 200
    And the response should contain a list of users
```

### Step Definition Example
```typescript
When('I send a GET request to retrieve all users', async function (this: ICustomWorld) {
  this.response = await this.userService.getAllUsers();
  this.responseBody = await this.response.json();
});
```

### Service Object Example (POM Pattern)
```typescript
export class UserService extends BaseService {
  async getAllUsers(): Promise<APIResponse> {
    const url = this.getFullUrl(endpoints.users);
    return await this.apiHelper.get(url, {
      headers: this.getHeaders(),
    });
  }
}
```

## Available Step Definitions

### Common Steps
- `Given the API is available`
- `Then the response status code should be {int}`
- `Then the response should have property {string}`

### User Steps
- `Given I have a valid user ID {string}`
- `When I send a GET request to retrieve all users`
- `When I send a GET request to retrieve user by ID`
- `When I send a POST request to create a new user with the following details:`
- `When I send a PUT request to update user with the following details:`
- `When I send a DELETE request to delete the user`

### Post Steps
- `Given I have a valid post ID {string}`
- `When I send a GET request to retrieve all posts`
- `When I send a GET request to retrieve post by ID`
- `When I send a GET request to retrieve posts by user ID {string}`
- `When I send a POST request to create a new post with the following details:`
- `When I send a PUT request to update post with the following details:`
- `When I send a DELETE request to delete the post`

## Configuration

### Environment Variables
Configure the following in `.env`:
- `BASE_URL`: API base URL
- `API_TIMEOUT`: Request timeout in milliseconds
- `API_KEY`: API key (if required)
- `AUTH_TOKEN`: Authentication token (if required)
- `ENV`: Environment name (dev, qa, prod)
- `PARALLEL_WORKERS`: Number of parallel workers

### Cucumber Configuration
Edit `cucumber.js` to customize:
- Report formats
- Parallel execution
- Step definition paths
- Required modules

## Reports

After test execution, reports are generated in the `reports/` directory:
- **HTML Report**: `reports/html/index.html`
- **JSON Report**: `reports/cucumber-report.json`
- **JUnit Report**: `reports/cucumber-report.xml`

## Logs

Detailed logs are generated in the `logs/` directory:
- **Combined Log**: `logs/combined.log` (all logs)
- **Error Log**: `logs/error.log` (errors only)
- Console output with color coding

## Best Practices

1. **Service Objects**: Create separate service classes for each API resource
2. **Step Reusability**: Write generic, reusable step definitions
3. **Data Management**: Use the World context to share data between steps
4. **Logging**: Log important actions and responses for debugging
5. **Error Handling**: Implement proper error handling in service methods
6. **Tags**: Use tags to organize and filter test scenarios
7. **Environment Config**: Never hardcode URLs or credentials

## Extending the Framework

### Add a New API Service
1. Create a new service class in `src/services/`
2. Extend `BaseService`
3. Implement API methods

### Add New Step Definitions
1. Create a new file in `src/steps/`
2. Import required dependencies
3. Define step patterns using `Given`, `When`, `Then`

### Add New Feature Files
1. Create a `.feature` file in `features/`
2. Write scenarios using Gherkin syntax
3. Use existing step definitions or create new ones

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all dependencies are installed (`npm install`)
2. **TypeScript Errors**: Check `tsconfig.json` configuration
3. **API Timeout**: Increase `API_TIMEOUT` in `.env`
4. **Report Not Generated**: Run `npm run report` after test execution

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For issues and questions, please create an issue in the repository.
