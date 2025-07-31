import axios from 'axios';
import { url } from '../config/url';

export interface IJobPayload {
  id?: string;
  companyId?: string; // if you pass company ref separately
  position?: string;
  location?: string;
  salary?: string;
  benefit?: string;
  description?: string;
  requirements?: string;
  type?: string; // 'internship' | 'job'
  company?: {
    id?: string;
    companyName?: string;
    industry?: string;
  };
}

export const getJobById = async (id: string, authHeader: string | null): Promise<IJobPayload> => {
  const response = await axios.get(`${url}/job/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export interface IJobsFilter {
  companyId?: string;
  type?: string;
}

export const getAllJobs = async (
  authHeader: string | null,
  filter?: IJobsFilter
): Promise<IJobPayload[]> => {
  const response = await axios.get(`${url}/job`, {
    params: filter,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export const createJob = async (
  data: IJobPayload,
  authHeader: string | null
): Promise<IJobPayload> => {
  const response = await axios.post(`${url}/job`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export const updateJob = async (
  data: IJobPayload,
  authHeader: string | null
): Promise<IJobPayload> => {
  const response = await axios.put(`${url}/job`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};
