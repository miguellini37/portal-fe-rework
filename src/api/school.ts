import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from './store';

export interface ICreateSchoolPayload {
  email: string;
  password: string;
  schoolName?: string;
}

export const createSchool = async (data: ICreateSchoolPayload): Promise<IUserData> => {
  const response = await axios.post(`${url}/schools/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.data;
};

export type IUpdateSchoolPayload = Omit<ICreateSchoolPayload, 'email' | 'password'>;

export const updateSchool = async (
  data: IUpdateSchoolPayload,
  authHeader: string | null
): Promise<IUserData> => {
  const response = await axios.put(`${url}/schools/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getSchoolById = async (
  id: number,
  authHeader: string | null
): Promise<IUpdateSchoolPayload> => {
  const response = await axios.get(`${url}/schools/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
