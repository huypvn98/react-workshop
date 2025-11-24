# Architecture and Design Patterns

## Architectural Overview
This project follows a modern React application architecture with clear separation of concerns:

### Layered Architecture
```
Presentation Layer (Components/Pages)
    ↓
Business Logic Layer (Hooks)
    ↓
Data Access Layer (APIs)
    ↓
HTTP Layer (Axios Instance)
```

## Design Patterns

### 1. Custom Hooks Pattern
- **Purpose**: Encapsulate reusable stateful logic
- **Examples**: 
  - `useAuth` - Authentication state and logic
  - `useLoginMutation` - Login API mutation with React Query
- **Location**: `src/hooks/`

### 2. Layout Pattern
- **Purpose**: Consistent page structure across different sections
- **Examples**:
  - `AuthLayout` - Layout for authentication pages (login, register)
  - `AdminLayout` - Layout for admin dashboard pages
- **Location**: `src/layouts/`
- **Implementation**: Parent route components that render `<Outlet />`

### 3. Route Protection Pattern
- **Purpose**: Restrict access to authenticated users
- **Implementation**: Middleware functions in routing config
- **Example**: `requireAuth` function checks localStorage token
- **Location**: `src/routes/index.tsx`

### 4. Centralized HTTP Client Pattern
- **Purpose**: Single source of truth for HTTP configuration
- **Implementation**:   
- **Features**:
  - Base URL from environment variables
  - Response error handling
  - Error message normalization
- **Location**: `src/http/index.ts`

### 5. Constants Pattern
- **Purpose**: Single source of truth for application constants
- **Examples**:
  - `TOKEN` - localStorage key for auth token
  - `AUTH_URL`, `ADMIN_URL` - Route URL constants
- **Location**: `src/constant/`

### 6. API Layer Pattern
- **Purpose**: Separate API calls from components
- **Implementation**: Pure functions that return promises
- **Location**: `src/apis/`
- **Usage**: Combined with React Query hooks

### 7. Component Composition Pattern
- **Purpose**: Build complex UIs from simple components
- **Structure**: Atomic components (Button, Input, Checkbox)
- **Location**: `src/components/`
- **Each component**: Own folder with index.tsx and spec.tsx

## State Management Strategy

### Local State
- Use `useState` for component-local state
- Use `useReducer` for complex state logic

### Server State
- React Query (TanStack Query) for all server data
- Automatic caching, refetching, and synchronization
- Custom mutation hooks for write operations

### Auth State
- localStorage for token persistence
- Custom `useAuth` hook for auth logic
- Route-level protection via middleware

### Form State
- React Hook Form for form handling
- Built-in validation and error handling

## Directory Structure Philosophy
- **Feature-based organization**: Each feature has related files grouped
- **Colocation**: Tests live next to components
- **Separation of concerns**: Clear boundaries between layers
- **Scalability**: Structure supports growing complexity

## Error Handling Strategy
- **HTTP Errors**: Intercepted at Axios layer
- **API Errors**: Handled by React Query error states
- **Component Errors**: Local error state and user feedback
- **Normalization**: Consistent error message format

## Routing Strategy
- **Declarative routes**: Using React Router's data API
- **Nested routes**: Layouts as parent routes
- **Route protection**: Middleware pattern for auth checks
- **Redirects**: `redirect()` utility for navigation
- **URL constants**: Centralized route definitions
