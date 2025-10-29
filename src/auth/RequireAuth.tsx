import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks';

interface RequireAuthProps {
  children: ReactNode;
  fallbackPath?: string;
}

export const RequireAuth: FC<RequireAuthProps> = ({ children, fallbackPath = '/login' }) => {
  const { isAuthenticated, initialized } = useAuth();

  // Wait for Keycloak to initialize
  if (!initialized) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};
