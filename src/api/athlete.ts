import axios from 'axios';
import { url } from '../config/url';
import { IUserData } from '../auth/hooks';
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
  skills?: string[];
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
  school?: ISchoolPaylod;
  schoolId?: string;
}

export const updateAthlete = async (
  data: IUpdateAthletePayload,
  authHeader: string | null
): Promise<IUserData> => {
  const response = await axios.put(`${url}/updateAthlete`, data, {
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
  const response = await axios.get(`${url}/getAthlete/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export class GetAthletesFilter {
  wildcardTerm?: string;
  schoolId?: string;
}

export type GetAthletesResponse = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  academics?: AcademicsPayload;
  athletics?: AthleticsPayload;
  school?: ISchoolPaylod;
  schoolId?: string;
};

export const getAthletes = async (
  filter: GetAthletesFilter,
  authHeader: string | null
): Promise<GetAthletesResponse[]> => {
  const response = await axios.get(`${url}/getAthletes`, {
    params: filter,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
