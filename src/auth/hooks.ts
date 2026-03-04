import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import { getSchoolById } from '../api/school';

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
  isVerified?: boolean;
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
    register: async (role?: string) => {
      const redirectUri = window.location.origin + '/';
      if (role) {
        const registerUrl = await keycloak.createRegisterUrl({ redirectUri });
        window.location.href = registerUrl + `&role=${encodeURIComponent(role)}`;
      } else {
        keycloak.register({ redirectUri });
      }
    },
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
    isVerified: tokenParsed.isVerified,
  };
};

/**
 * Hook to check if user is authenticated (similar to useIsAuthenticated)
 */
export const useIsAuthenticated = (): boolean => {
  const { keycloak } = useKeycloak();
  return keycloak.authenticated ?? false;
};

/**
 * Hook to check if the current student user is not verified.
 * Returns true if the user is an athlete whose organization has not verified them.
 */
export const useIsStudentNotVerified = (): boolean => {
  const user = useAuthUser();
  return user?.permission === USER_PERMISSIONS.ATHLETE && !user?.isVerified;
};

/**
 * Hook to check if the athlete's school is verified.
 * A school is considered verified if it has an ownerId.
 * Returns undefined while loading, true/false once resolved.
 */
export const useIsSchoolVerified = (): boolean | undefined => {
  const user = useAuthUser();
  const authHeader = useAuthHeader();
  const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (user?.permission !== USER_PERMISSIONS.ATHLETE || !user?.schoolId || !authHeader) {
      setIsVerified(undefined);
      return;
    }

    getSchoolById(user.schoolId, authHeader)
      .then((school) => {
        setIsVerified(Boolean(school?.ownerId));
      })
      .catch(() => {
        setIsVerified(undefined);
      });
  }, [user?.permission, user?.schoolId, authHeader]);

  return isVerified;
};
