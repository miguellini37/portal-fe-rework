import { useAuthUser, USER_PERMISSIONS } from '../../auth/hooks';
import { AthleteProfile } from './Athlete';
import { CompanyEmployeeProfile } from './CompanyEmployee';
import { SchoolEmployeeProfile } from './SchoolEmployee';
import { SetupProfile } from './SetupProfile';

export const ProfileEdit = () => {
  const user = useAuthUser();
  if (!user || !user.permission) {
    return <SetupProfile />;
  }
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
};
