# Task Completion Checklist

When completing a development task, ensure the following steps are performed:

## Code Quality
1. **Linting**: Run `npm run lint` and fix any errors
   - ESLint should pass without errors
   - Address any warnings that are relevant

2. **Type Checking**: TypeScript compilation should succeed
   - The build command includes TypeScript checking
   - Fix any type errors before committing

3. **Testing**: Run `npm test` 
   - All existing tests should pass
   - Add tests for new features (co-located with components)
   - Tests run in browser mode with Playwright

4. **Build Verification**: Run `npm run build`
   - Ensure production build succeeds
   - Check for any build warnings

## Code Review
5. **Code Style**: Verify code follows project conventions
   - Functional components with hooks
   - TailwindCSS for styling
   - Proper TypeScript types
   - Named exports for components

6. **File Organization**: Check proper placement
   - Components in `src/components/`
   - Pages in `src/pages/`
   - Types in `src/types/`
   - Constants in `src/constant/`
   - API functions in `src/apis/`

7. **Clean Code**: Remove redundant code
   - No unused imports
   - No commented-out code
   - No console.log statements (unless necessary)
   - No temporary debug code

## Functionality
8. **Manual Testing**: Test the feature in browser
   - Run `npm run dev`
   - Navigate to relevant pages
   - Verify functionality works as expected
   - Test edge cases and error scenarios

9. **Error Handling**: Ensure proper error handling
   - API errors are handled gracefully
   - User-friendly error messages
   - Loading states are shown

## Documentation
10. **Comments**: Add comments only when necessary
    - Complex logic that isn't self-explanatory
    - WHY something is done, not WHAT
    - Avoid redundant comments

## Version Control
11. **Git Status**: Check what files are modified
    - Review all changes before committing
    - Ensure no unintended files are included
    - Verify `.env` is not committed

12. **Commit Message**: Write clear commit message
    - Describe what was changed and why
    - Follow conventional commits if applicable

## Final Check
- [ ] Linting passes
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Code follows conventions
- [ ] Redundant code removed
- [ ] Manual testing completed
- [ ] Error handling implemented
- [ ] Changes reviewed
- [ ] Ready to commit
