# React Workshop Project Overview

## Purpose
This is a React workshop project demonstrating a modern web application with authentication and admin dashboard functionality. The project serves as a learning template for building React applications with best practices.

## Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (using rolldown-vite@7.1.14)
- **Styling**: TailwindCSS 4.1.14
- **Routing**: React Router 7.9.4
- **State Management**: TanStack React Query 5.90.5
- **Form Handling**: React Hook Form 7.65.0
- **HTTP Client**: Axios 1.12.2
- **Testing**: Vitest 4.0.4 with Playwright browser testing
- **Linting**: ESLint 9.36.0 with TypeScript support

## Key Features
- Authentication system with login page
- Protected admin routes with auth middleware
- Reusable component library (Button, Checkbox, Input)
- Centralized HTTP client with error handling
- Custom React hooks for auth and API mutations
- Layout system (Auth layout, Admin layout)

## Project Structure
```
src/
├── apis/           - API endpoint functions
├── components/     - Reusable UI components
│   ├── button/
│   ├── check-box/
│   └── input/
├── constant/       - Application constants (auth tokens, URLs)
├── hooks/          - Custom React hooks
├── http/           - HTTP client configuration (Axios)
├── layouts/        - Layout components
│   ├── admin/      - Admin panel layout
│   └── auth/       - Authentication layout
├── pages/          - Page components
│   ├── dashboard/  - Dashboard page
│   └── login/      - Login page
├── routes/         - Routing configuration
└── types/          - TypeScript type definitions
```

## Development Environment
- **System**: Windows
- **Node Version**: Uses npm with package-lock.json
- **Port**: Vite default port (typically 5173)
