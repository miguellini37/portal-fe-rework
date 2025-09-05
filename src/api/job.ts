import axios from 'axios';
import { url } from '../config/url';

export enum JobStatus {
  Open = 'open',
  Closed = 'closed',
  Filled = 'filled',
}

export interface IJobPayload {
  id: string;
  position?: string;
  location?: string;
  salary?: number;
  benefit?: string;
  benefits?: string; // Added for benefits field
  description?: string;
  requirements?: string;
  type?: string; // 'internship' | 'job'
  experience?: string; // Added for experience level
  industry?: string; // Added for industry field
  applicationDeadline?: Date; // Added for application deadline
  createdDate?: Date;
  company?: {
    id?: string;
    companyName?: string;
    industry?: string;
  };
  status?: JobStatus;
  hasApplied?: boolean; // Indicates if the current user has applied to this job
}

export const getJobById = async (id: string, authHeader: string | null): Promise<IJobPayload> => {
  const response = await axios.get(`${url}/getJob/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export interface IJobsFilter {
  companyId?: string;
  type?: string | string[];
}

export const getAllJobs = async (
  authHeader: string | null,
  filter?: IJobsFilter
): Promise<IJobPayload[]> => {
  const response = await axios.get(`${url}/getJobs`, {
    params: filter,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export interface ICreateOrUpdateJobPayload {
  id?: string;
  companyId?: string; // if you pass company ref separately
  position?: string;
  description?: string;
  industry?: string;
  experience?: string; // Added for experience level
  applicationDeadline?: Date; // Added for application deadline
  benefits?: string;
  type?: string; // 'internship' | 'job'
  requirements?: string;
  location?: string;
  salary?: number;
  status?: JobStatus;
}

export const createJob = async (
  data: ICreateOrUpdateJobPayload,
  authHeader: string | null
): Promise<IJobPayload> => {
  const response = await axios.post(`${url}/createJob`, data, {
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
  const response = await axios.put(`${url}/updateJob`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};
