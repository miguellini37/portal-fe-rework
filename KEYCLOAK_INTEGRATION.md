# Keycloak Integration

This document describes the Keycloak authentication integration in the Portal Frontend application.

## Overview

The application now uses Keycloak for authentication and authorization, replacing the previous `react-auth-kit` implementation. Keycloak provides enterprise-grade authentication with features like Single Sign-On (SSO), token refresh, and centralized user management.

## Configuration

### Environment Variables

Add the following environment variables to your `.envrc` file:

```bash
# Keycloak Configuration
export REACT_APP_KEYCLOAK_URL="https://your-keycloak-server.com"
export REACT_APP_KEYCLOAK_REALM="portal"
export REACT_APP_KEYCLOAK_CLIENT_ID="portal-frontend"
```

- **REACT_APP_KEYCLOAK_URL**: The base URL of your Keycloak server
- **REACT_APP_KEYCLOAK_REALM**: The Keycloak realm name
- **REACT_APP_KEYCLOAK_CLIENT_ID**: The client ID configured in Keycloak for this application

### Keycloak Client Configuration

In your Keycloak admin console, configure the `portal-frontend` client with:

1. **Access Type**: public
2. **Valid Redirect URIs**: 
   - `http://localhost:3000/*` (for development)
   - `https://your-production-domain.com/*` (for production)
3. **Web Origins**: Same as redirect URIs
4. **Direct Access Grants**: Enabled (optional)

## Features

### Authentication Flow

1. Users accessing protected routes are redirected to Keycloak login page
2. After successful authentication, users are redirected back to the application
3. The application receives an access token and refresh token from Keycloak
4. Tokens are automatically managed by the Keycloak JS adapter

### Automatic Token Refresh

Keycloak automatically handles token refresh in the background. The `@react-keycloak/web` library:
- Monitors token expiration
- Refreshes tokens before they expire
- Updates the token in memory without user interaction

### Protected Routes

Routes that require authentication use the `RequireAuth` component:

```tsx
import { RequireAuth } from './auth/RequireAuth';

<RequireAuth fallbackPath="/login">
  <YourProtectedComponent />
</RequireAuth>
```

### Authentication Hooks

The application provides custom hooks for accessing authentication state:

#### useAuth()
Get authentication state and login/logout methods:
```tsx
import { useAuth } from './auth/hooks';

const { isAuthenticated, initialized, login, logout, register } = useAuth();
```

#### useAuthUser()
Get the current user information:
```tsx
import { useAuthUser } from './auth/hooks';

const user = useAuthUser();
// user contains: id, email, firstName, lastName, permission, companyRefId, schoolRefId
```

#### useAuthHeader()
Get the authorization header for API requests:
```tsx
import { useAuthHeader } from './auth/hooks';

const authHeader = useAuthHeader();
// Returns: "Bearer <token>" or null if not authenticated
```

#### useIsAuthenticated()
Check if the user is authenticated:
```tsx
import { useIsAuthenticated } from './auth/hooks';

const isAuthenticated = useIsAuthenticated();
```

## User Data Mapping

User information from Keycloak tokens is mapped to the application's `IUserData` interface:

- `sub` → `id`
- `email` → `email`
- `given_name` → `firstName`
- `family_name` → `lastName`
- `permission` → `permission` (custom claim: athlete, company, or school)
- `companyRefId` → `companyRefId` (custom claim)
- `schoolRefId` → `schoolRefId` (custom claim)

### Custom Claims

The following custom claims should be configured in Keycloak:

1. **permission**: User role (athlete, company, or school)
2. **companyRefId**: Reference ID for company employees
3. **schoolRefId**: Reference ID for school employees

Configure these as User Attributes in Keycloak and map them to token claims using Client Scopes.

## API Integration

All API calls automatically include the Keycloak access token:

```tsx
import { useAuthHeader } from './auth/hooks';

const MyComponent = () => {
  const authHeader = useAuthHeader();
  
  const fetchData = async () => {
    const response = await apiFunction(params, authHeader);
    // API function receives "Bearer <token>"
  };
};
```

## Login and Registration

### Login
- Navigating to `/login` automatically redirects to Keycloak login page
- After successful authentication, users are redirected back to `/profile`

### Registration
- Navigating to `/register` redirects to Keycloak registration page
- New users complete registration in Keycloak
- After registration, users are redirected back to the application

## Logout

Logout is handled by calling the Keycloak logout method:

```tsx
import { useAuth } from './auth/hooks';

const { logout } = useAuth();

const handleLogout = () => {
  logout();
  // User is logged out from Keycloak and all sessions are terminated
};
```

## Troubleshooting

### CORS Issues
Ensure your Keycloak server has proper CORS settings configured for your application domain.

### Token Refresh Failures
Check that:
1. Keycloak client has refresh token enabled
2. Token lifetimes are properly configured
3. Network connectivity to Keycloak server is stable

### User Data Not Available
Verify that:
1. Custom claims are properly configured in Keycloak
2. Token mapper is set up correctly
3. User attributes are set in Keycloak user profile

## Migration Notes

### Changes from react-auth-kit

1. **No more manual token refresh**: Keycloak handles this automatically
2. **Login/Register handled by Keycloak**: No more custom forms in the application
3. **Token storage**: Managed by Keycloak JS adapter (memory-based by default)
4. **Hook changes**: All auth hooks now use Keycloak instead of react-auth-kit

### Removed Files
- `src/auth/store.ts`
- `src/auth/refreshToken.ts`
- `src/api/login.ts` (login/register functions - now handled by Keycloak)

### New Files
- `src/auth/hooks.ts` - Custom auth hooks
- `src/auth/RequireAuth.tsx` - Protected route component
- `src/config/keycloak.ts` - Keycloak configuration
