import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData, USER_PERMISSIONS } from '../../auth/store';
import { AthleteProfile } from './Athlete/';
import { SchoolEmployeeProfile } from './SchoolEmployee';
import { CompanyEmployeeProfile } from './CompanyEmployee';

export const ProfileEdit = () => {
  const user = useAuthUser<IUserData>();
  const permission = user?.permission;

  if (permission == USER_PERMISSIONS.ATHLETE) {
    return <AthleteProfile />;
  }

  if (permission == USER_PERMISSIONS.SCHOOL) {
    return <SchoolEmployeeProfile />;
  }

  if (permission == USER_PERMISSIONS.COMPANY) {
    return <CompanyEmployeeProfile />;
  }

  return <div>Logged in user doesn't have correct permission</div>;
};
