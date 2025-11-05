import { useKeycloak } from '@react-keycloak/web';

export enum USER_PERMISSIONS {
  ATHLETE = 'athlete',
  COMPANY = 'company',
  SCHOOL = 'school',
  ADMIN = 'admin',
}

export interface IUserData {
  id?: string;
  email?: string;
  permission?: USER_PERMISSIONS;
  firstName?: string;
  lastName?: string;
  companyId?: string;
  schoolId?: string;
  isOrgVerified?: boolean;
}

/**
 * Hook to get authentication state
 */
export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();

  return {
    isAuthenticated: keycloak.authenticated ?? false,
    initialized,
    login: () => keycloak.login(),
    logout: () => keycloak.logout(),
    register: () => keycloak.register(),
    refresh: () => keycloak.updateToken(-1),
  };
};

/**
 * Hook to get the auth header for API requests
 */
export const useAuthHeader = (): string | null => {
  const { keycloak } = useKeycloak();

  if (keycloak.authenticated && keycloak.token) {
    return `Bearer ${keycloak.token}`;
  }

  return null;
};

/**
 * Hook to get the current user data from Keycloak token
 */
export const useAuthUser = (): IUserData | null => {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated || !keycloak.tokenParsed) {
    return null;
  }

  // Map Keycloak token claims to IUserData
  const tokenParsed = keycloak.tokenParsed as any;

  return {
    id: tokenParsed.sub,
    email: tokenParsed.email,
    firstName: tokenParsed.given_name,
    lastName: tokenParsed.family_name,
    permission: tokenParsed.permission as USER_PERMISSIONS,
    companyId: tokenParsed.companyId,
    schoolId: tokenParsed.schoolId,
    isOrgVerified: tokenParsed.isOrgVerified,
  };
};

/**
 * Hook to check if user is authenticated (similar to useIsAuthenticated)
 */
export const useIsAuthenticated = (): boolean => {
  const { keycloak } = useKeycloak();
  return keycloak.authenticated ?? false;
};
