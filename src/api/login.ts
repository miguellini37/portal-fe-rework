import axios from 'axios';
import { IUserData } from './store';
import { url } from '../config/url';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshTokenExpireIn: number;
  tokenType: string;
  authState: IUserData;
}

export const login = async (email: string, password: string): Promise<ILoginResponse> => {
  const response = await axios.post(`${url}/auth/login`, {
    email,
    password,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.data as ILoginResponse;
};
