import axios from 'axios';
import { url } from '../config/url';
import { IJobPayload } from './job';
import { ICompanyPaylod } from './company';

// Status enum inferred; adjust values if backend differs
export enum InterviewStatus {
  Scheduled = 'scheduled',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export interface IInterviewPayload {
  id: string;
  applicationId: string;
  dateTime: Date; // ISO string
  location?: string;
  interviewer?: string;
  preparationTips?: string;
  status?: InterviewStatus;
  job?: IJobPayload;
  company?: ICompanyPaylod;
}

export interface ICreateInterviewInput {
  applicationId: string;
  dateTime: Date; // ISO string
  location?: string;
  interviewer?: string;
  preparationTips?: string;
  status?: InterviewStatus;
}

export interface IUpdateInterviewInput {
  id: string;
  status: InterviewStatus;
  dateTime: Date; // ISO string
  location?: string;
  preparationTips?: string;
}

export interface IGetInterviewInput {
  interviewId?: string;
  applicationId?: string;
}

export interface IListInterviewsInput {
  applicationId?: string;
}

export const createInterview = async (
  authHeader: string | null,
  data: ICreateInterviewInput
): Promise<IInterviewPayload> => {
  const response = await axios.post(`${url}/createInterview`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export const getInterview = async (
  authHeader: string | null,
  input: IGetInterviewInput
): Promise<IInterviewPayload | null> => {
  const response = await axios.get(`${url}/getInterview`, {
    params: input,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export const getInterviews = async (
  authHeader: string | null,
  params?: IListInterviewsInput
): Promise<IInterviewPayload[]> => {
  const response = await axios.get(`${url}/getInterviews`, {
    params,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};

export const updateInterview = async (
  authHeader: string | null,
  data: IUpdateInterviewInput
): Promise<IInterviewPayload> => {
  const response = await axios.patch(`${url}/updateInterview`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
};
