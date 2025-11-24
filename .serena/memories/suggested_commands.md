# Suggested Commands for React Workshop Project

## Development Commands
- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm test` - Run tests with Vitest in browser mode (Playwright/Chromium)
- `npm run lint` - Run ESLint to check code quality

## System Commands (Windows)
- `dir` - List directory contents
- `cd <directory>` - Change directory
- `type <file>` - View file contents
- `findstr /s /i "pattern" *.*` - Search for pattern in files
- `git status` - Check git status
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to remote

## Common Workflows
### Starting Development
```bash
npm run dev
```

### Before Committing Code
```bash
npm run lint
npm test
npm run build
```

### Installing Dependencies
```bash
npm install
```

### Updating Dependencies
```bash
npm update
```

## Environment Variables
The project uses environment variables defined in `.env` file:
- `VITE_API_URL` - API base URL for HTTP requests

## Testing
Tests are configured to run in browser mode using Playwright with Chromium.
Test files follow the pattern: `*.spec.tsx` or `*.test.tsx`
