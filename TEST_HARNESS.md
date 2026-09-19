# Clear Path NEMT - Test Harness Guide

**Purpose:** Automated testing to ensure code changes don't break functionality

---

## 🚀 Quick Start

### Run All Tests
```bash
npm test
```

### Run Tests by Package
```bash
# Backend only
npm run test:backend

# Frontend only
npm run test:frontend

# Shared types only
npm run test:shared
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:cov
```

---

## 📋 Test Suites

### Backend Tests (`packages/backend`)
- **Auth Module** - Login, registration, JWT validation
- **Bookings Module** - Create booking, get rides, booking confirmation
- **Insurance Module** - Verify eligibility, get benefits
- **Providers Module** - Get provider info, provider applications
- **Driver Module** - Location updates, driver tracking
- **Chat Module** - Send messages, get conversation history

### Frontend Tests (`packages/frontend`)
- **Components** - Navigation, Chat Widget, Immediate Help
- **Pages** - Login, Register, Book Ride, Dashboard
- **Hooks** - useAuth, useBooking (if needed)
- **Integration** - Form submission, page flow

### Shared Types Tests (`packages/shared`)
- **Type exports** - All types are properly exported
- **Type validation** - Types match API contracts

---

## 🧪 Running Tests Locally

### Before Making Changes
```bash
npm test
```
This ensures the codebase is in a working state.

### After Making Changes
```bash
npm test
```
This verifies your changes don't break anything.

### For Specific Module Changes
```bash
# If you changed auth code
npm run test:backend -- --testPathPattern=auth

# If you changed booking pages
npm run test:frontend -- --testPathPattern=book-ride
```

---

## 📊 Test Coverage

Target coverage levels:
- **Backend:** 70%+ (critical paths)
- **Frontend:** 60%+ (components and pages)
- **Shared:** 80%+ (type safety)

View coverage:
```bash
npm run test:cov
```

Reports are generated in:
- `packages/backend/coverage/`
- `packages/frontend/coverage/`
- `packages/shared/coverage/`

---

## 🔄 CI/CD Integration

Tests automatically run on:
- ✅ Pre-commit (via husky)
- ✅ Pre-push (via husky)
- ✅ Pull requests (via GitHub Actions)

---

## 📝 Test Organization

```
packages/backend/
├── src/
│   ├── auth/
│   │   ├── auth.service.ts
│   │   └── __tests__/
│   │       ├── auth.service.spec.ts
│   │       └── auth.controller.spec.ts
│   ├── bookings/
│   │   └── __tests__/
│   │       └── bookings.service.spec.ts
│   └── ...
└── jest.config.js

packages/frontend/
├── pages/
│   ├── auth/
│   │   └── __tests__/
│   │       ├── login.test.tsx
│   │       └── register.test.tsx
│   └── ...
└── jest.config.js
```

---

## 🛠️ Writing New Tests

### Backend (NestJS + Jest)
```typescript
// packages/backend/src/auth/__tests__/auth.service.spec.ts
import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();
    service = module.get(AuthService);
  });

  it('should register a user', async () => {
    const result = await service.register({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'patient',
    });
    expect(result).toHaveProperty('accessToken');
  });
});
```

### Frontend (React Testing Library)
```typescript
// packages/frontend/pages/auth/__tests__/login.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../login';

describe('Login Page', () => {
  it('renders login form', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('submits form with email and password', async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    // Assert behavior
  });
});
```

---

## ✅ Pre-Commit Testing Checklist

Before pushing code:
- [ ] `npm test` passes (all tests)
- [ ] `npm run lint` passes (no style issues)
- [ ] `npm run type-check` passes (no TypeScript errors)
- [ ] Code coverage hasn't decreased
- [ ] No console errors in browser

---

## 🚨 Common Test Issues

### Port Already in Use
```bash
# Kill Node processes
taskkill /F /IM node.exe

# Restart tests
npm test
```

### Module Not Found
```bash
# Reinstall dependencies
rm -r node_modules packages/*/node_modules
npm install

# Rebuild shared types
npm run build --workspace=packages/shared

# Retry tests
npm test
```

### TypeScript Errors in Tests
```bash
# Ensure tsconfig.json is correct for tests
npm run type-check

# Rebuild if needed
npm run build
```

---

## 📚 Test Categories

### Unit Tests
- Service methods (auth, bookings, etc.)
- Utility functions
- Type validation

### Integration Tests
- API endpoints (Auth, Bookings, etc.)
- Database operations
- External service calls (insurance eligibility)

### E2E Tests
- User registration flow
- Ride booking flow
- Login and authentication flow

---

## 🎯 Key Test Paths

### Critical Path - Authentication
```bash
npm run test:backend -- --testPathPattern=auth
```
Tests: login, register, JWT validation, role-based access

### Critical Path - Booking
```bash
npm run test:backend -- --testPathPattern=booking
```
Tests: create booking, get rides, booking confirmation

### Critical Path - Frontend Forms
```bash
npm run test:frontend -- --testPathPattern=auth
```
Tests: login form, register form, form validation

---

## 📞 Test Maintenance

- Review and update tests monthly
- Add tests for new features before implementing
- Refactor tests when code changes significantly
- Keep test data realistic

---

## 🔗 Resources

- [Jest Documentation](https://jestjs.io)
- [React Testing Library](https://testing-library.com/react)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)

---

**Last Updated:** 2026-09-19  
**Status:** Test harness ready for implementation  
**Next Steps:** Run `npm test` to verify setup
