import axios from 'axios';
import { url } from '../config/url';

export interface ApplicationStatus {
  applied: 'applied';
  under_review: 'under_review';
  interview_requested: 'interview_requested';
  accepted: 'accepted';
  rejected: 'rejected';
  withdrawn: 'withdrawn';
}

export interface IApplicationPayload {
  id?: string;
  jobId: string;
  athleteId?: string;
  createdDate?: Date;
  creationDate?: Date;
  status?: ApplicationStatus;
  job?: {
    id?: string;
    position?: string;
    company?: {
      id?: string;
      companyName?: string;
    };
  };
  athlete?: {
    id?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface IUpdateApplicationStatusRequest {
  id: string;
  status?: ApplicationStatus;
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
  const response = await axios.post(`${url}/createApplication`, applicationData, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export const getApplications = async (
  authHeader: string | null,
  jobId?: string
): Promise<IApplicationPayload[]> => {
  const response = await axios.get(`${url}/getApplications`, {
    params: jobId ? { jobId } : undefined,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data as IApplicationPayload[];
};

export const updateApplicationStatus = async (
  authHeader: string | null,
  data: IUpdateApplicationStatusRequest
): Promise<IApplicationPayload> => {
  if (!authHeader) throw new Error('Not authenticated');
  const resp = await axios.patch<IApplicationPayload>(`${url}/updateApplicationStatus`, data, {
    headers: { Authorization: authHeader },
  });
  return resp.data;
};
