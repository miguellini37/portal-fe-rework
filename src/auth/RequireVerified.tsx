import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUser, USER_PERMISSIONS, useIsSchoolVerified } from './hooks';
import { isNil } from 'lodash';

interface RequireVerifiedProps {
  children: ReactNode;
  nilRoute?: boolean;
}

/**
 * Route guard that enforces verification-based access control:
 * - Company/School not verified: redirects to /profile for all routes (except /profile itself)
 * - Athlete without schoolId: redirects to /profile for all routes (except /profile itself)
 * - Student not verified or school not verified: redirects to /profile only for NIL routes
 */
export const RequireVerified: FC<RequireVerifiedProps> = ({ children, nilRoute = false }) => {
  const user = useAuthUser();
  const isSchoolVerified = useIsSchoolVerified();
  const location = useLocation();
  console.log(user);

  if (!user) {
    return <>{children}</>;
  }

  const { permission, isVerified } = user;

  // Company or School accounts that are not verified: lock down to profile only
  // Skip redirect if already on /profile to avoid infinite redirect loop
  if (
    (permission === USER_PERMISSIONS.COMPANY || permission === USER_PERMISSIONS.SCHOOL) &&
    !isVerified &&
    location.pathname !== '/profile'
  ) {
    return <Navigate to="/profile" replace />;
  }

  // Athletes without a schoolId: lock down to profile only until they select a school
  if (
    permission === USER_PERMISSIONS.ATHLETE &&
    isNil(user.schoolId) &&
    location.pathname !== '/profile'
  ) {
    return <Navigate to="/profile" replace />;
  }

  // For NIL routes: redirect if student is not verified or school is not verified
  if (nilRoute && permission === USER_PERMISSIONS.ATHLETE) {
    if (!isVerified || isSchoolVerified === false) {
      return <Navigate to="/profile" replace />;
    }
  }

  return <>{children}</>;
};
