# GitHub Copilot Instructions

## Project Context
- This is a React + TypeScript project (Create React App style) for a job portal frontend.
- Styling is managed with CSS files (global and component-level).
- Authentication uses `react-auth-kit` and `@auth-kit/react-router`.
- API calls are made with Axios.
- UI components are organized by feature in `src/views` and `src/components`.
- Yarn is used as the package manager.

## Technology Stack
- **React 19** with TypeScript
- **Axios** for API calls
- **React Router** for routing
- **CSS files** for styling (global and component-level)
- **ESLint** for code quality
- **Yarn** as the package manager

### Libraries
- Never introduce new libraries to the repo unless specifically instructed. If there is a library you think is necessary or would be helpful, bring it up and ask if we wantt use it.

## Code Structure and Organization

### File Organization
- `/src/components/` - Reusable UI components
- `/src/views/` - Page-level components and business logic
- `/src/api/` - API models and service functions
- `/src/auth/` - Authentication logic and utilities
- `/src/util/` - Utility functions
- `/src/config/` - Application configuration

### Component Patterns

#### Function Components
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

#### Component Structure
- Always use named exports
- Always define explicit `Props` interface
- Use optional properties with `?` when appropriate
- Include `children?: ReactNode` when component accepts children

## Copilot Usage Guidelines
- **UI/UX**: Follow the design mocks provided. Use dense, information-rich layouts for modals and forms. Match spacing, font sizes, and button placement to the mock.
- **CSS**: Prefer editing or extending existing CSS files. Use `box-sizing: border-box` for all form elements to avoid border/focus ring clipping. Avoid unnecessary padding that causes overflow or clipping.
- **TypeScript**: Never use `any`. Always use explicit types. Extend or create types/interfaces as needed for new fields.
- **Auth**: Use the provided `authStore` and `refreshToken` logic. Do not change authentication provider structure unless requested.
- **API**: Use the API models in `src/api/`. Add new fields to interfaces if the UI requires them.
- **Testing**: Ensure all UI changes are visually tested in the browser for overflow, focus, and responsiveness.

## Modal/Dialog Patterns
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

## State Management

### Local State
Use React hooks for local state:

```tsx
const [state, setState] = useState<StateType>(initialValue);
const [loading, setLoading] = useState(false);
```

## TypeScript Patterns
- Never use the `any` type - create proper interfaces/types instead
- Use explicit return types for functions when possible
- Prefer strict type checking

## Conditional Rendering
```tsx
{condition && <Component />}
{isEditable ? <EditMode /> : <ViewMode />}
```

## Performance Patterns
- Use `useCallback` for event handlers passed to child components
- Use `useMemo` for expensive calculations
- Avoid inline object/array creation in JSX

## Code Quality Guidelines

### Best Practices
- Keep components focused and single-responsibility
- Extract complex logic into custom hooks
- Use utility functions for reusable logic
- Use descriptive names for variables and functions
- Handle loading and error states explicitly

### Accessibility
- Use semantic HTML elements
- Ensure keyboard navigation works
- Include proper ARIA labels where needed

## Do/Don't
- **Do**: Match the mock exactly, keep code clean, and use TypeScript types.
- **Do**: Use function components with explicit Props interfaces.
- **Do**: Extract reusable logic into custom hooks.
- **Do**: Use named exports for components.
- **Don't**: Use `any`, add unnecessary wrappers, or break existing overflow/scroll behavior.
- **Don't**: Introduce new libraries without explicit instruction.
- **Don't**: Use inline styles - prefer CSS files.

## Special Notes
- If a visual bug is reported (e.g., input border cutoff), check for container padding/overflow and input box-sizing.
- If a new field is needed in a form, add it to the relevant TypeScript interface.
- Try to not use emojis. Instead use lucide-react icons or similar for visual elements.

---
For any questions, follow the latest design mock and keep the UI clean and accessible.
