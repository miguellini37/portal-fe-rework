import createStore from 'react-auth-kit/createStore';
import { refreshToken } from './refreshToken';

export enum USER_PERMISSIONS {
  ATHLETE = 'athlete',
  COMPANY = 'company',
  SCHOOL = 'school',
}
export interface IUserData {
  id?: string;
  email?: string;
  permission?: USER_PERMISSIONS;
  firstName?: string;
  lastName?: string;
  companyRefId?: string;
  schoolRefId?: string;
}

export const authStore = createStore<IUserData>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: refreshToken,
});
