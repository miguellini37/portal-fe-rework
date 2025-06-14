import createStore from 'react-auth-kit/createStore';
import { refreshToken } from './refreshToken';

export interface IUserData {
  id: string;
  email: string;
  permission: string;
}

export const authStore = createStore<IUserData>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: refreshToken,
});
