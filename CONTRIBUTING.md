# Contributing to API BDD Playwright Framework

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use async/await for asynchronous operations

### Project Structure

```
src/
├── services/    # API service objects (one per resource)
├── steps/       # Step definitions (group related steps)
├── hooks/       # Setup and teardown code
├── utils/       # Helper functions and utilities
├── config/      # Configuration files
└── data/        # Test data files
```

### Adding New Features

#### 1. Adding a New API Service

Create a new service class in `src/services/`:

```typescript
import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseService } from './BaseService';

export class NewService extends BaseService {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getResource(): Promise<APIResponse> {
    const url = this.getFullUrl('/resource');
    return await this.apiHelper.get(url, {
      headers: this.getHeaders(),
    });
  }
}
```

#### 2. Adding Step Definitions

Create step definitions in `src/steps/`:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../hooks/world';

When('I perform an action', async function (this: ICustomWorld) {
  // Implementation
});
```

#### 3. Adding Feature Files

Create feature files in `features/`:

```gherkin
Feature: Resource Testing
  
  @smoke
  Scenario: Get resource
    When I perform an action
    Then the response status code should be 200
```

### Testing Your Changes

1. Run all tests: `npm test`
2. Run specific tests: `npm run test:tags "@your-tag"`
3. Check for linting errors (if eslint configured)
4. Generate and review reports: `npm run report`

### Commit Guidelines

Use conventional commit messages:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

Examples:
```
feat: add authentication service
fix: resolve timeout issue in user service
docs: update README with new examples
test: add negative test scenarios for posts
```

### Pull Request Process

1. Update documentation for any new features
2. Add tests for new functionality
3. Ensure all tests pass
4. Update README.md if needed
5. Create a pull request with a clear description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Code Review

All contributions require code review:

1. At least one approval required
2. All comments must be resolved
3. All checks must pass
4. No merge conflicts

## Reporting Issues

When reporting issues, please include:

1. Clear description of the problem
2. Steps to reproduce
3. Expected vs actual behavior
4. Environment details (OS, Node version, etc.)
5. Relevant logs or screenshots

## Questions?

Feel free to open an issue for:
- Questions about the framework
- Feature requests
- Bug reports
- Documentation improvements

## License

By contributing, you agree that your contributions will be licensed under the project's ISC License.
