import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from '../auth/store';

export interface ICreateAthletePayload {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  sport?: string;
  position?: string;
  major?: string;
  gpa?: number;
  division?: string;
  accolades?: string;
  teamRole?: string;
  graduationDate?: string;
  statistics?: string;
  schoolName?: string;
}

export const createAthlete = async (data: ICreateAthletePayload): Promise<IUserData> => {
  const response = await axios.post(`${url}/athlete/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.data;
};

export type IUpdateAthletePayload = Omit<
  ICreateAthletePayload,
  'email' | 'password' | 'firstName' | 'lastName'
>;

export const updateAthlete = async (
  data: IUpdateAthletePayload,
  authHeader: string | null
): Promise<IUserData> => {
  const response = await axios.put(`${url}/athlete/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getAthleteById = async (
  id: string,
  authHeader: string | null
): Promise<IUpdateAthletePayload> => {
  const response = await axios.get(`${url}/athlete/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
