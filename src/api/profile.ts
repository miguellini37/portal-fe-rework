import axios from 'axios';
import { IUserData, USER_PERMISSIONS } from '../auth/hooks';
import { url } from '../config/url';

export interface ICreateUserInput {
  permission?: USER_PERMISSIONS;

  companyId?: string;
  schoolId?: string;
}

export const createProfile = async (
  authHeader: string | null,
  data: ICreateUserInput
): Promise<IUserData> => {
  const response = await axios.post(`${url}/createProfile`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
