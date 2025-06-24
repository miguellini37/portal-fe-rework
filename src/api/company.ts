import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from './store';

export interface ICreateCompanyPayload {
  email: string;
  password: string;
  companyName?: string;
  industry?: string;
}

export const createCompany = async (data: ICreateCompanyPayload): Promise<IUserData> => {
  const response = await axios.post(`${url}/companies/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.data;
};

export type IUpdateCompanyPayload = Omit<ICreateCompanyPayload, 'email' | 'password'>;

export const updateCompany = async (
  data: IUpdateCompanyPayload,
  authHeader: string | null
): Promise<IUserData> => {
  const response = await axios.put(`${url}/companies/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getCompanyById = async (
  id: number,
  authHeader: string | null
): Promise<IUpdateCompanyPayload> => {
  const response = await axios.get(`${url}/companies/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
