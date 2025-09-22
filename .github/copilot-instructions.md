# GitHub Copilot Instructions

**ALWAYS** follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the information provided here.

## Project Overview
Portal Frontend is a React 19 + TypeScript job portal application for connecting NCAA student-athletes with employers. Built with Create React App, this is the frontend that connects to the Portal backend API.

## Technology Stack
- **React 19** with TypeScript
- **Create React App** (react-scripts 5.0.1)
- **Yarn** as package manager (required - do not use npm)
- **Axios** for API calls
- **React Router** for routing with authentication via `react-auth-kit`
- **ESLint** for code quality
- **Prettier** for code formatting
- **Husky** for git hooks

### Libraries
- Never introduce new libraries to the repo unless specifically instructed. If there is a library you think is necessary or would be helpful, bring it up and ask if we want to use it.

## Working Effectively

### Bootstrap and Setup (First Time)
Run these commands in order when working with a fresh clone:

```bash
# Install dependencies (takes ~2 minutes - NEVER CANCEL, set timeout to 300+ seconds)
yarn install

# Copy environment configuration
cp sample.envrc .envrc

# Optional: Enable direnv if available
direnv allow
```

### Build and Development Commands

#### Development Server
```bash
# Start development server (starts in ~15 seconds)
yarn start

# Alternative with environment variables
source .envrc && yarn start
```
- Application runs at [http://localhost:3000](http://localhost:3000)
- Hot reload enabled - changes appear immediately
- Console shows lint errors in real-time

#### Production Build
```bash
# Build for production (takes ~40 seconds - set timeout to 120+ seconds)
yarn build
```
- Creates optimized build in `build/` folder
- Minified and production-ready
- Never cancel build process - wait for completion

#### Code Quality
```bash
# Run ESLint (takes ~7 seconds)
yarn lint

# Auto-fix ESLint issues
yarn lint:fix

# Check TypeScript compilation (takes ~6 seconds)
yarn tsc --noEmit

# Check Prettier formatting
npx prettier --check src

# Fix Prettier formatting (CSS files currently have issues - this is expected)
npx prettier --write src
```

#### Testing
```bash
# Run tests (no tests currently exist)
yarn test --passWithNoTests --watchAll=false
```
- Project currently has no test suite
- Use `--passWithNoTests` flag to avoid exit code 1

### Development Workflow

#### Pre-commit Validation
ALWAYS run these commands before committing changes:
```bash
yarn tsc --noEmit && yarn lint:fix
```
This matches the husky pre-commit hook configuration.

#### Environment Variables
- Copy `sample.envrc` to `.envrc` for local development
- Backend URL configured via `REACT_APP_BACKEND_URL`
- Default points to production API: `https://api.portaljobs.net`
- For local development, uncomment and use: `http://localhost:3001`

## Manual Validation Requirements

### Critical User Scenarios to Test
After making ANY changes, ALWAYS test these scenarios:

1. **Application Startup**
   - Run `yarn start` and verify application loads at http://localhost:3000
   - Take screenshot to verify UI renders correctly
   
2. **Navigation Testing**
   - Test navigation between pages (Home, Login, Register)
   - Verify sidebar navigation works correctly
   - Ensure routing transitions work smoothly

3. **Authentication Flow** (if making auth-related changes)
   - Test login page functionality
   - Verify redirect behavior
   - Check authentication state management

4. **Component Functionality** (if making component changes)
   - Test all interactive elements (buttons, forms, dropdowns)
   - Verify responsive design works correctly
   - Check for console errors or warnings

## Code Structure and Navigation

### Primary Directories
```
/src/
├── components/     # Reusable UI components
│   ├── Dropdowns/  # Form dropdown components
│   ├── Sidebar/    # Navigation sidebar
│   └── Table/      # Data table components
├── views/          # Page-level components
│   ├── Applications/   # Application management pages
│   ├── Companies/      # Company-related pages
│   ├── Interviews/     # Interview management
│   ├── Jobs/          # Job listing and search
│   ├── Login/         # Authentication pages
│   └── Profile/       # User profile pages
├── api/           # API service functions and types
├── auth/          # Authentication utilities
├── config/        # Application configuration
├── util/          # Helper functions
└── styles/        # Global CSS files
```

### Key Files
- `App.tsx` - Main application component
- `Routes.tsx` - Route configuration
- `src/config/url.ts` - Backend URL configuration
- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration

### Component Patterns
- Always use function components with TypeScript
- Use named exports: `export const ComponentName: FC<Props> = ...`
- Define explicit `Props` interface for each component
- Follow existing CSS file patterns (component-level CSS files)

## Timing and Timeout Guidelines

### Command Timeouts (CRITICAL - NEVER CANCEL)
- **yarn install**: 300+ seconds (typically ~114 seconds)
- **yarn build**: 120+ seconds (typically ~37 seconds)  
- **yarn start**: 60+ seconds for full startup
- **yarn lint**: 30+ seconds
- **yarn tsc**: 30+ seconds

### Expected Build Times
- Fresh dependency install: ~2 minutes
- Production build: ~37 seconds
- Development server startup: ~15 seconds
- Lint check: ~7 seconds
- TypeScript compilation: ~6 seconds

## Known Issues and Workarounds

### Existing Warnings (Expected - Do Not Fix Unless Requested)
- ESLint warnings for `@typescript-eslint/no-explicit-any` in dropdown components and company profile components (16 total warnings)
- Prettier formatting issues with CSS files
- React Router future flag warnings (expected)
- Webpack deprecation warnings for dev middleware (expected)

### Development Server Notes
- Uses React Scripts development server
- Supports hot reload
- Console shows build progress and errors
- Network access available (shows local IP in console)

## API and Backend Integration
- Backend URL configured in `src/config/url.ts`
- Uses Axios for all API calls
- Authentication managed via `react-auth-kit`
- API types and interfaces in `src/api/` directory

## Git and Deployment Workflow
- Husky pre-commit hooks run TypeScript compilation and lint-staged
- Uses lint-staged for staged file linting
- No CI/CD workflow files detected in repository

## Troubleshooting Common Issues

### Build Failures
- Ensure all dependencies installed: `yarn install`
- Check TypeScript errors: `yarn tsc --noEmit`
- Verify environment variables copied: `cp sample.envrc .envrc`

### Development Server Issues
- Port 3000 must be available
- Check console for detailed error messages
- Verify all dependencies are installed

### Code Quality Issues
- Run `yarn lint:fix` to auto-fix ESLint issues
- Existing TypeScript `any` warnings are expected
- Use `yarn tsc --noEmit` to check for type errors

## Component Development Guidelines

### Function Components Pattern
Always use function components with TypeScript:

```tsx
import { FC, ReactNode } from 'react';

interface Props {
  id?: string;
  children?: ReactNode;
}

export const ComponentName: FC<Props> = ({ id, children }) => {
  return <div>{children}</div>;
};
```

### Modal/Dialog Patterns
When using modals, import and use React Modal:

```tsx
import Modal from 'react-modal';

const MyModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal Title"
    >
      <div>Modal content</div>
    </Modal>
  );
};
```

### State Management
Use React hooks for local state:

```tsx
const [state, setState] = useState<StateType>(initialValue);
const [loading, setLoading] = useState(false);
```

### TypeScript Best Practices
- Never use the `any` type - create proper interfaces/types instead
- Use explicit return types for functions when possible
- Extend or create types/interfaces as needed for new fields

### CSS and Styling
- Prefer editing or extending existing CSS files
- Use `box-sizing: border-box` for all form elements
- Follow existing CSS file patterns (component-level CSS files)
- Avoid inline styles - prefer CSS files

### Performance Patterns
- Use `useCallback` for event handlers passed to child components
- Use `useMemo` for expensive calculations
- Avoid inline object/array creation in JSX

## Do/Don't Guidelines
- **Do**: Follow design mocks exactly, keep code clean, and use TypeScript types
- **Do**: Use function components with explicit Props interfaces
- **Do**: Use named exports for components
- **Do**: Test all changes manually in the browser
- **Don't**: Use `any` type, add unnecessary wrappers, or break existing behavior
- **Don't**: Introduce new libraries without explicit instruction
- **Don't**: Use inline styles or skip manual validation

## Special Notes
- If a visual bug is reported (e.g., input border cutoff), check for container padding/overflow and input box-sizing.
- If a new field is needed in a form, add it to the relevant TypeScript interface.
- Try to not use emojis. Instead use lucide-react icons or similar for visual elements.

Remember: ALWAYS validate your changes by running the application and testing the affected functionality manually.
