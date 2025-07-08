import axios from 'axios';
import { url } from '../config/url';

export interface ISchoolPaylod {
  id?: string;
  schoolName?: string;
  ownerRefId?: string;
}

export const getSchoolById = async (
  id: string,
  authHeader: string | null
): Promise<ISchoolPaylod> => {
  const response = await axios.get(`${url}/school/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const updateSchool = async (
  data: ISchoolPaylod,
  authHeader: string | null
): Promise<ISchoolPaylod> => {
  const response = await axios.put(`${url}/school/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
