import { isNil } from 'lodash';
import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthUser, USER_PERMISSIONS } from '../../auth/hooks';
import { AthleteProfile } from './Athlete';
import { CompanyEmployeeProfile } from './CompanyEmployee';
import { SchoolEmployeeProfile } from './SchoolEmployee';
import { SetupProfile } from './SetupProfile';

export const ProfileEdit = () => {
  const user = useAuthUser();

  const permission = user?.permission;

  if (permission === USER_PERMISSIONS.ADMIN) {
    return <Navigate to="/admin/users" replace />;
  }

  const showSetup = useMemo(() => {
    if (!user) {
      return true;
    }
    if (permission === USER_PERMISSIONS.ATHLETE && isNil(user.schoolId)) {
      return true;
    }
    if (permission === USER_PERMISSIONS.SCHOOL && !user.isVerified) {
      return true;
    }
    if (permission === USER_PERMISSIONS.COMPANY && !user.isVerified) {
      return true;
    }

    return false;
  }, [user]);

  if (showSetup) {
    return <SetupProfile />;
  }

  if (permission == USER_PERMISSIONS.ATHLETE) {
    return <AthleteProfile />;
  }

  if (permission == USER_PERMISSIONS.SCHOOL) {
    return <SchoolEmployeeProfile />;
  }

  if (permission == USER_PERMISSIONS.COMPANY) {
    return <CompanyEmployeeProfile />;
  }

  return <SetupProfile />;
};
