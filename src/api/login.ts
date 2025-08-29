import axios from 'axios';
import { IUserData, USER_PERMISSIONS } from '../auth/store';
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
  const response = await axios.post(`${url}/login`, {
    email,
    password,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.data as ILoginResponse;
};

export interface ICreateUserInput {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  permission?: USER_PERMISSIONS;

  companyId?: string;
  schoolId?: string;
}

export const register = async (data: ICreateUserInput): Promise<IUserData> => {
  const response = await axios.post(`${url}/register`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.data;
};
