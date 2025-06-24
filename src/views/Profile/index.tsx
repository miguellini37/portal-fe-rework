import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData, USER_PERMISSIONS } from '../../api/store';
import { AthleteProfile } from './Athlete';
import { SchoolProfile } from './School';
import { CompanyProfile } from './Company';

export const ProfileEdit = () => {
  const { permission } = useAuthUser<IUserData>() as IUserData;

  if (permission == USER_PERMISSIONS.ATHLETE) {
    return <AthleteProfile />;
  }

  if (permission == USER_PERMISSIONS.SCHOOL) {
    return <SchoolProfile />;
  }

  if (permission == USER_PERMISSIONS.COMPANY) {
    return <CompanyProfile />;
  }

  return <div>Logged in user doesn't have correct permission</div>;
};
