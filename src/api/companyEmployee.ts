import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from '../auth/hooks';

export interface IUpdateCompanyEmployeePayload {
  bio?: string;
  companyId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  phone?: string;
  companyName?: string;
  id?: string;
  position?: string;
}

export const updateCompanyEmployee = async (
  data: IUpdateCompanyEmployeePayload,
  authHeader: string | null
): Promise<IUserData> => {
  const response = await axios.put(`${url}/updateCompanyEmployee`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getCompanyEmployeeById = async (
  id: string,
  authHeader: string | null
): Promise<IUpdateCompanyEmployeePayload> => {
  const response = await axios.get(`${url}/getCompanyEmployee/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
