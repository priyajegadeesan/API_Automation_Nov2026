# Quick Start Guide

## Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Verify installation**:
```bash
npx playwright --version
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run smoke tests only
```bash
npm run test:tags "@smoke"
```

### Run specific feature tests
```bash
# Run only user tests
npm run test:tags "@users"

# Run only post tests
npm run test:tags "@posts"

# Run create operation tests
npm run test:tags "@create"
```

### Run tests in parallel
```bash
npm run test:parallel
```

## View Reports

After running tests:

1. **Generate HTML Report**:
```bash
npm run report
```

2. **Open the report**:
   - Navigate to: `reports/html/index.html`
   - Open in your browser

## Project Structure Quick Reference

```
features/               # Your test scenarios (Gherkin)
├── users.feature      # User API tests
└── posts.feature      # Post API tests

src/
├── services/          # API service classes (POM)
│   ├── UserService.ts
│   └── PostService.ts
├── steps/             # Step definitions
│   ├── userSteps.ts
│   └── postSteps.ts
└── hooks/             # Test setup/teardown
    └── world.ts       # Shared context
```

## Example: Adding a New Test

1. **Add scenario to feature file** (`features/users.feature`):
```gherkin
@users @smoke
Scenario: Get user profile
  Given I have a valid user ID "5"
  When I send a GET request to retrieve user by ID
  Then the response status code should be 200
  And the response should have property "name"
```

2. **Run the test**:
```bash
npm run test:tags "@smoke"
```

## Configuration

Edit `.env` file to change:
- `BASE_URL` - API endpoint
- `API_TIMEOUT` - Request timeout
- `PARALLEL_WORKERS` - Parallel execution count

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:parallel` | Run tests in parallel |
| `npm run test:tags "@smoke"` | Run smoke tests |
| `npm run report` | Generate HTML report |
| `npm run clean` | Clean reports folder |

## Troubleshooting

**Tests not running?**
- Ensure dependencies are installed: `npm install`
- Check `.env` file exists (copy from `.env.example`)

**Import errors?**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

**No reports generated?**
- Run tests first: `npm test`
- Then generate report: `npm run report`

## Next Steps

1. Explore feature files in `features/`
2. Check step definitions in `src/steps/`
3. Review service objects in `src/services/`
4. Read full documentation in `README.md`
