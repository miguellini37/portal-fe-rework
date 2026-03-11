# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portal Frontend is a React 19 + TypeScript job portal connecting NCAA student-athletes with employers. Built with Create React App, it connects to the Portal backend API.

## Commands

```bash
# Install dependencies (use yarn, NOT npm — takes ~2 min, never cancel)
yarn install

# Development server at localhost:3000
yarn start

# Production build (~40s)
yarn build

# Lint and auto-fix
yarn lint
yarn lint:fix

# Type-check
yarn tsc --noEmit

# Tests (none exist yet)
yarn test --passWithNoTests --watchAll=false

# Pre-commit hook runs: yarn tsc && yarn lint-staged
```

## Environment Setup

Copy `sample.envrc` to `.envrc`. Default local dev values:

```bash
REACT_APP_BACKEND_URL="http://localhost:3001"        # prod: https://api.portaljobs.net
REACT_APP_KEYCLOAK_URL="https://auth.portaljobs.net" # local: http://localhost:8180
REACT_APP_KEYCLOAK_REALM="portal-jobs"
REACT_APP_KEYCLOAK_CLIENT_ID="portal-frontend"
```

## Architecture

### Authentication

Keycloak OAuth2 via `@react-keycloak/web`. User roles: `ATHLETE`, `COMPANY`, `SCHOOL`, `ADMIN` (defined in `USER_PERMISSIONS` enum in `auth/hooks.ts`). Routes are wrapped with `RequireAuth` and `RequireVerified` HOCs in `Routes.tsx`.

Key auth hooks in `src/auth/hooks.ts`: `useAuth()`, `useAuthUser()`, `useAuthHeader()`, `useIsAuthenticated()`.

### API Layer

All API functions live in `src/api/`. Each function takes `authHeader` from `useAuthHeader()` and uses Axios. Backend URL comes from `src/config/url.ts`. Pattern:

```typescript
export const getEntity = async (id: string, authHeader: string | null) => {
  return axios.get(`${url}/endpoint`, {
    headers: { 'Content-Type': 'application/json; charset=UTF-8', Authorization: authHeader }
  });
};
```

### Routing

`Routes.tsx` defines all routes using a `PageRoute` interface. Routes are split into sidebar pages (main app) vs non-sidebar pages (landing, login). NIL routes have a special access control flag.

### State Management

Local component state only (React hooks). No centralized store.

### Messaging

Real-time messaging via Socket.io (`src/api/websocket.ts`).

## Code Conventions

- **Function components only** with `FC<Props>` type annotation and explicit `Props` interface
- **Named exports**: `export const ComponentName: FC<Props> = ...`
- **CSS files** co-located with components — no inline styles. Use `box-sizing: border-box` for form elements
- **Icons**: use `lucide-react`, not emojis
- **Dropdowns**: `react-select` with `AsyncSelect` pattern (see `src/components/Dropdowns/`)
- **Modals**: `react-modal` with `isOpen` control prop
- **No new libraries** unless explicitly instructed

## Code Quality

- **Prettier**: single quotes, semicolons, 100 char width, 2-space indent, ES5 trailing commas
- **ESLint**: flat config (`eslint.config.mjs`), curly braces required, no unused imports
- **TypeScript**: strict mode. Avoid `any` — 16 existing `any` warnings are expected

## Known Warnings (Do Not Fix)

- 16 `@typescript-eslint/no-explicit-any` warnings in dropdown/company components
- Prettier CSS formatting issues
- React Router future flag warnings
- Webpack dev middleware deprecation warnings
