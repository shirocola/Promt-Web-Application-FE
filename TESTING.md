# Testing Guide

This document describes the testing strategy and setup for the Promt Web Application Frontend.

## Overview

The project uses a comprehensive testing approach with:
- **Unit Tests**: Testing individual functions and services (Jest + React Testing Library)
- **Component Tests**: Testing React components in isolation
- **Integration Tests**: Testing component interactions with services
- **Manual E2E Tests**: Browser-based testing for complex user flows

## Test Coverage Goals

- **90%+ coverage** on business logic and utility functions
- **100% coverage** on core services (employeeService)
- **100% coverage** on utility functions (validation, form helpers)
- **Basic smoke tests** for React components
- **Manual testing framework** for complex UI flows

### Understanding Test Coverage Results

When you run `npm run test:coverage`, Jest generates a comprehensive coverage report with four key metrics:

#### Coverage Metrics Explained

1. **% Stmts (Statements)**: Percentage of executable statements that were executed during tests
   - **Current**: 100% - All executable code statements are covered by tests
   - **Goal**: 90%+ for all files

2. **% Branch (Branch Coverage)**: Percentage of decision branches (if/else, switch cases) that were tested
   - **Current**: 98.7% - Almost all code paths and conditional logic are tested
   - **Goal**: 90%+ for critical logic

3. **% Funcs (Functions)**: Percentage of functions that were called during tests
   - **Current**: 100% - All functions have been executed at least once
   - **Goal**: 90%+ for all modules

4. **% Lines (Line Coverage)**: Percentage of executable lines that were executed
   - **Current**: 100% - All executable lines of code were run during tests
   - **Goal**: 90%+ for all files

#### Uncovered Line Numbers

The "Uncovered Line #s" column shows specific line numbers that weren't executed during tests. For example:
- `employeeService.js | 25,75` means lines 25 and 75 are not covered by tests
- These are typically edge cases, error conditions, or defensive code paths

#### Coverage Thresholds

The project enforces minimum coverage thresholds via Jest configuration:
- **90% minimum** for all metrics (statements, branches, functions, lines)
- Tests will fail if coverage drops below these thresholds
- This ensures consistent code quality and test completeness

## Running Tests

### All Tests
```bash
npm test
```

### Tests with Coverage
```bash
npm run test:coverage
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

### Watch Mode (for development)
```bash
npm run test:watch
```

## Test Structure

### Unit Tests
Located in `src/services/__tests__/` and `src/utils/__tests__/`

#### Employee Service Tests
- **File**: `src/services/__tests__/employeeService.test.js`
- **Coverage**: 100% (17 test cases)
- **Tests**: CRUD operations, validation, error handling, search functionality

#### Validation Tests
- **File**: `src/utils/__tests__/validation.test.js`
- **Coverage**: 100% (14 test categories)
- **Tests**: Email, name, position, salary, date validation, complete employee validation

#### Form Helpers Tests
- **File**: `src/utils/__tests__/formHelpers.test.js`
- **Coverage**: 100% (10 test categories)
- **Tests**: Formatting, sanitization, debouncing, form handling utilities

### Component Tests
Located in `src/components/__tests__/` and `src/__tests__/`

#### App Component Tests
- **File**: `src/__tests__/App.test.js`
- **Coverage**: Basic smoke tests
- **Tests**: Rendering, navigation structure, routing setup

#### Dashboard Component Tests
- **File**: `src/components/__tests__/Dashboard.test.js`
- **Coverage**: Basic functionality tests
- **Tests**: Rendering, statistics display, action buttons

### Coverage Exclusions

The following files are excluded from coverage requirements:
- `src/index.js` - Application entry point
- `src/index.css` - Styling files
- `src/data/**` - Static data files
- `src/examples/**` - Example/demo files
- `src/components/EmployeeForm.js` - Complex form requiring manual testing
- `src/components/EmployeeList.js` - Complex list component requiring manual testing

## Manual Testing

For complex components that require manual verification, use the browser-based E2E testing framework:

### E2E Testing Framework
- **File**: `e2e-tests.html`
- **Purpose**: Manual testing of UI components and user workflows
- **Usage**: Open in browser and follow test scenarios

### Manual Test Scenarios

1. **Employee Creation Flow**
   - Navigate to Add Employee page
   - Fill form with valid data
   - Submit and verify success message
   - Test validation errors

2. **Employee List Display**
   - Navigate to Employees page
   - Verify employee cards display correctly
   - Test delete functionality
   - Test edit navigation

3. **Dashboard Statistics**
   - Navigate to Dashboard
   - Verify statistics are displayed
   - Test quick action buttons

4. **Form Validation**
   - Test all validation rules
   - Verify error messages
   - Test edge cases

## Test Data

### Sample Data
Sample employee data is available in `src/data/employees.js` for consistent testing.

### Test Fixtures
Each test file includes its own test data setup to ensure isolation.

## Best Practices

### Writing Tests
1. **Arrange-Act-Assert** pattern
2. **Descriptive test names** that explain what is being tested
3. **Test isolation** - each test should be independent
4. **Mock external dependencies** appropriately
5. **Test edge cases** and error conditions

### Component Testing
1. **Test behavior, not implementation**
2. **Use semantic queries** (getByRole, getByLabelText)
3. **Test user interactions** with user-event library
4. **Mock complex child components** when necessary

### Service Testing
1. **Test all CRUD operations**
2. **Test validation logic thoroughly**
3. **Test error conditions**
4. **Test edge cases and boundary conditions**

## Continuous Integration

The test suite is designed to run in CI environments:
- All tests must pass before code can be merged
- Coverage thresholds must be maintained
- Tests run on every pull request

## Troubleshooting

### Common Issues

1. **Tests timeout**: Increase timeout in test files or Jest configuration
2. **Coverage not met**: Check if new files need tests or exclusions
3. **React Router errors**: Ensure components are wrapped with proper router context
4. **Async test issues**: Use proper async/await or waitFor utilities

### Debugging Tests
```bash
# Run specific test file
npm test -- --testPathPattern=employeeService.test.js

# Run tests in debug mode
npm test -- --verbose

# Generate coverage report
npm run test:coverage
```

## Future Enhancements

Planned testing improvements:
1. **Automated E2E tests** with Playwright or Cypress
2. **Visual regression testing** for UI components
3. **Performance testing** for large data sets
4. **Accessibility testing** integration
5. **API integration tests** when backend is available

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)