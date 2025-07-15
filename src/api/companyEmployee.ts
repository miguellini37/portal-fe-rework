import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from '../auth/store';

export interface IUpdateCompanyEmployeePayload {
  firstName?: string;
  lastName?: string;
  companyName?: string;
}

export const updateCompanyEmployee = async (
  data: IUpdateCompanyEmployeePayload,
  authHeader: string | null
): Promise<IUserData> => {
  const response = await axios.put(`${url}/companyEmployee/`, data, {
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
  const response = await axios.get(`${url}/companyEmployee/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
