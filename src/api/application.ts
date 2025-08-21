import axios from 'axios';
import { url } from '../config/url';

export interface IApplicationPayload {
  id?: string;
  jobId: string;
  athleteId?: string;
  createdDate?: Date;
  status?: string;
  job?: {
    id?: string;
    position?: string;
    company?: {
      id?: string;
      companyName?: string;
    };
  };
  athlete?: {
    firstName?: string;
    lastName?: string;
  };
}

export interface ICreateApplicationRequest {
  jobId: string;
}

export interface ICreateApplicationResponse {
  message: string;
  application: IApplicationPayload;
}

export const createApplication = async (
  authHeader: string | null,
  applicationData: ICreateApplicationRequest
): Promise<ICreateApplicationResponse> => {
  const response = await axios.post(`${url}/application`, applicationData, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export const getApplications = async (
  authHeader: string | null
): Promise<IApplicationPayload[]> => {
  const response = await axios.get(`${url}/application`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};
