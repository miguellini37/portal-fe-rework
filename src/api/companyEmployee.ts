import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from '../auth/store';

export interface ICreateCompanyEmployeePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  companyName?: string;
}

export const createCompanyEmployee = async (
  data: ICreateCompanyEmployeePayload
): Promise<IUserData> => {
  const response = await axios.post(`${url}/companyEmployee/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.data;
};

export type IUpdateCompanyEmployeePayload = Omit<
  ICreateCompanyEmployeePayload,
  'email' | 'password'
>;

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
