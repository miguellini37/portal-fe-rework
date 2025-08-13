import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from '../auth/store';
import { ISchoolPaylod } from './school';

export interface AcademicsPayload {
  major?: string;
  minor?: string;
  gpa?: number;
  graduationDate?: string;
  awards?: string;
  coursework?: string;
}

export interface AthleticsPayload {
  sport?: string;
  position?: string;
  division?: string;
  conference?: string;
  yearsPlayed?: string;
  leadershipRoles?: string;
  achievements?: string;
  statistics?: string;
}

export interface IUpdateAthletePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  academics?: AcademicsPayload;
  athletics?: AthleticsPayload;
  schoolRef?: ISchoolPaylod;
  schoolId?: string;
}

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

export class GetAthletesFilter {
  wildcardTerm?: string;
}

export type GetAthletesResponse = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  academics?: AcademicsPayload;
  athletics?: AthleticsPayload;
  schoolRef?: ISchoolPaylod;
  schoolId?: string;
};

export const getAthletes = async (
  filter: GetAthletesFilter,
  authHeader: string | null
): Promise<GetAthletesResponse[]> => {
  const response = await axios.get(`${url}/athlete/`, {
    params: filter,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
