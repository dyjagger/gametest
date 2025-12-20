# Testing Methodology - [PROJECT_NAME]

This document defines the testing strategy for this project. It's designed to guide both humans and AI assistants toward code quality and reliability.

---

## Testing Philosophy

> **For AI**: When generating code, always consider how it will be tested. Suggest tests alongside implementation.

- **Test-Driven Development (TDD)**: Write tests before or alongside implementation when possible
- **Fast Feedback**: Tests should run quickly and provide clear failure messages
- **Isolation**: Unit tests should not depend on external services
- **Automation First**: Automate what can be automated, document what can't

---

## Test Types

### 1. Unit Tests

**Goal**: Test individual functions, methods, and classes in isolation

**Characteristics**:
- Fast (milliseconds per test)
- No external dependencies (databases, APIs, file systems mocked)
- Test one thing per test
- Descriptive test names that explain what's being tested

**What to Test**:
- [ ] Input validation and edge cases
- [ ] Error handling paths
- [ ] Business logic calculations
- [ ] Data transformations
- [ ] Boundary conditions

**Example Structure**:
```
tests/
├── unit/
│   ├── test_[module_name].py    # or .js, .ts, .go, etc.
│   └── ...
```

### 2. Integration Tests

**Goal**: Test component interactions with mocked external services

**Characteristics**:
- Slower than unit tests (but still < 1 second ideally)
- May use test databases or mock servers
- Test contracts between components

**What to Test**:
- [ ] API endpoint request/response cycles
- [ ] Database operations (with test database)
- [ ] Service-to-service communication
- [ ] Authentication/authorization flows

**Example Structure**:
```
tests/
├── integration/
│   ├── test_api_[feature].py
│   └── ...
```

### 3. End-to-End Tests (E2E)

**Goal**: Test complete user workflows in production-like environment

**Characteristics**:
- Slowest test type (seconds to minutes)
- Uses real or staging services
- Tests critical user journeys

**What to Test**:
- [ ] Core user workflows (signup, purchase, etc.)
- [ ] Cross-system integrations
- [ ] Performance under realistic conditions

---

## Test Structure Pattern

> **For AI**: Follow this pattern when generating tests.

```
# Arrange-Act-Assert (AAA) Pattern

def test_[function]_[scenario]_[expected_result]():
    """
    Test that [function] [does something] when [condition].
    """
    # Arrange - Set up test data and conditions
    input_data = ...
    expected = ...
    
    # Act - Execute the code under test
    result = function_under_test(input_data)
    
    # Assert - Verify the result
    assert result == expected
```

---

## Test Naming Convention

Use descriptive names that explain:
1. **What** is being tested
2. **Under what conditions**
3. **What the expected outcome is**

**Pattern**: `test_[unit]_[scenario]_[expected]`

**Examples**:
- `test_calculate_total_with_discount_returns_reduced_price`
- `test_user_login_with_invalid_password_returns_401`
- `test_parse_config_with_missing_required_field_raises_error`

---

## Running Tests

> **Note**: Fill in commands once tech stack is chosen

### Quick Reference

| Task | Command |
|------|---------|
| Run all tests | `[TBD]` |
| Run unit tests only | `[TBD]` |
| Run integration tests | `[TBD]` |
| Run with coverage | `[TBD]` |
| Run specific test file | `[TBD]` |
| Run tests matching pattern | `[TBD]` |

### Coverage Requirements

- **Minimum coverage target**: [TBD]% (recommend 80%+)
- **Critical paths**: Must have 100% coverage
- **New code**: Should include tests

---

## Mocking Guidelines

### When to Mock
- External APIs and services
- Database connections in unit tests
- Time-dependent functions
- Random number generators
- File system operations (in unit tests)

### When NOT to Mock
- The code you're actually testing
- Simple data structures
- Pure functions with no side effects

### Mock Pattern
```
# Pseudo-code pattern - adapt to your language/framework

def test_function_with_external_dependency():
    # Create mock
    mock_service = create_mock(ExternalService)
    mock_service.method.returns(expected_value)
    
    # Inject mock
    result = function_under_test(service=mock_service)
    
    # Verify interaction
    assert mock_service.method.was_called_with(expected_args)
    assert result == expected_value
```

---

## Test Data Management

### Fixtures
- Use fixtures for common test setup
- Keep fixtures close to where they're used
- Avoid global mutable state

### Test Databases
- Use separate database for tests
- Reset state between tests
- Use transactions for isolation when possible

---

## Continuous Integration

### Pre-commit Checks
- [ ] Linting passes
- [ ] Unit tests pass
- [ ] No security vulnerabilities

### PR Requirements
- [ ] All tests pass
- [ ] Coverage doesn't decrease
- [ ] New features have tests

### Main Branch Protection
- [ ] All CI checks pass
- [ ] Code review approved

---

## Manual Testing Checklist

For features that can't be fully automated:

### Before Release
- [ ] Test on target platforms/browsers
- [ ] Verify error messages are user-friendly
- [ ] Check accessibility requirements
- [ ] Test with realistic data volumes
- [ ] Verify logging captures necessary information

---

## Adding New Tests

### Checklist for AI/Developers

When adding a new feature:
1. [ ] Write unit tests for new functions/methods
2. [ ] Add integration test if it involves external systems
3. [ ] Update this document if new test patterns emerge
4. [ ] Verify coverage didn't decrease

When fixing a bug:
1. [ ] Write a failing test that reproduces the bug
2. [ ] Fix the bug
3. [ ] Verify the test now passes
4. [ ] Consider if similar bugs could exist elsewhere

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | [Date] | Initial testing methodology |
