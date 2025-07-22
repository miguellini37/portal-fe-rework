import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from '../auth/store';
import { ISchoolPaylod } from './school';

export interface IUpdateSchoolEmployeePayload {
  firstName?: string;
  lastName?: string;
  schoolRef?: ISchoolPaylod;
}

export const updateSchoolEmployee = async (
  data: IUpdateSchoolEmployeePayload,
  authHeader: string | null
): Promise<IUserData> => {
  const response = await axios.put(`${url}/schoolEmployee/`, data, {
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
  const response = await axios.get(`${url}/schoolEmployee/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
