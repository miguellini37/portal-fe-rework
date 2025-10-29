import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from '../auth/hooks';
import { ISchoolPaylod } from './school';

export interface IUpdateSchoolEmployeePayload {
  firstName?: string;
  lastName?: string;
  school?: ISchoolPaylod;
}

export const updateSchoolEmployee = async (
  data: IUpdateSchoolEmployeePayload,
  authHeader: string | null
): Promise<IUserData> => {
  const response = await axios.put(`${url}/updateSchoolEmployee`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getSchoolEmployeeById = async (
  id: string,
  authHeader: string | null
): Promise<IUpdateSchoolEmployeePayload> => {
  const response = await axios.get(`${url}/getSchoolEmployee/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
