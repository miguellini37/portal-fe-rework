import { url } from '../config/url';
import axios from 'axios';

// src/api/activity.ts
// src/api/activity.ts
import { IApplicationPayload } from './application';
import { IInterviewPayload } from './interview';

export enum ActivityType {
  APPLICATION = 'application',
  INTERVIEW = 'interview',
  OTHER = 'other',
}

export interface IActivity {
  activityId: string;
  date: Date; // ISO string
  type: ActivityType;
  message: string;
  application?: IApplicationPayload;
  interview?: IInterviewPayload;
}
export interface IGetActivitiesInput {
  limit: number;
}

export async function getActivity(
  authHeader: string | null,
  payload?: IGetActivitiesInput
): Promise<IActivity[]> {
  const response = await axios.get(`${url}/activity`, {
    params: payload,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });
  return response.data;
}
