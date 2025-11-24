# Code Style and Conventions

## TypeScript
- **Strict typing**: TypeScript is enabled with strict mode
- **Type definitions**: All types are defined in `src/types/` directory
- **Import resolution**: Uses path aliases configured in tsconfig

## React Components
- **Component style**: Functional components with hooks (no class components)
- **File naming**: Components use PascalCase (e.g., `Button.tsx`, `Dashboard.tsx`)
- **Export style**: Named exports for components, default exports for pages/routes
- **Component structure**: 
  ```tsx
  type Props = {
    // prop definitions
  };
  
  export const ComponentName = ({ prop1, prop2 }: Props) => {
    // component logic
    return (
      // JSX
    );
  };
  
  export default ComponentName;
  ```

## Styling
- **Framework**: TailwindCSS utility classes
- **Dark mode**: Currently disabled in config
- **Component styles**: Inline Tailwind classes in JSX
- **Global styles**: Minimal global CSS in `App.css`

## File Organization
- **Component folders**: Each component has its own folder (e.g., `components/button/`)
- **Index files**: Components export from `index.tsx`
- **Test files**: Tests are co-located with components as `*.spec.tsx`
- **Constants**: Centralized in `src/constant/` directory
- **Types**: TypeScript types in `src/types/` directory

## API and Data Fetching
- **HTTP client**: Centralized Axios instance in `src/http/index.ts`
- **API functions**: Defined in `src/apis/` directory
- **Data fetching**: React Query (TanStack Query) for async state management
- **Mutations**: Custom hooks for mutations (e.g., `use-login-mutation.ts`)

## Routing
- **Router**: React Router 7 with `createBrowserRouter`
- **Route structure**: Nested routes with layouts
- **Auth protection**: Middleware functions for protected routes
- **Constants**: Route URLs defined in `src/constant/url.ts`

## State Management
- **Local state**: React `useState`, `useReducer` hooks
- **Server state**: React Query for caching and synchronization
- **Auth state**: localStorage for token storage, custom `useAuth` hook

## ESLint Configuration
- **Config file**: `eslint.config.js` (flat config format)
- **Rules**: 
  - JavaScript recommended rules
  - TypeScript recommended rules
  - React Hooks rules (recommended-latest)
  - React Refresh rules (vite)
- **Ignored**: `dist/` directory

## Naming Conventions
- **Files**: kebab-case for directories, PascalCase for components, kebab-case for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase
- **Hooks**: prefix with `use` (e.g., `useAuth`, `useLoginMutation`)
