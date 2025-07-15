import axios from 'axios';
import { url } from '../config/url';
import { IJobPayload } from './job';

export interface ICompanyPaylod {
  id?: string;
  companyName?: string;
  ownerRefId?: string;
  industry?: string;
  jobs?: IJobPayload[];
}

export const getCompanyById = async (
  id: string,
  authHeader: string | null
): Promise<ICompanyPaylod> => {
  const response = await axios.get(`${url}/company/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const updateCompany = async (
  data: ICompanyPaylod,
  authHeader: string | null
): Promise<ICompanyPaylod> => {
  const response = await axios.put(`${url}/company/`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getCompanies = async (): Promise<ICompanyPaylod[]> => {
  const response = await axios.get(`${url}/company/`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.data;
};
