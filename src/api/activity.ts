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

interface BaseActivity {
  activityId: string;
  date: Date; // ISO string
  message: string;
}
export interface IActivityPayload {
  limit: number;
}

export interface ApplicationActivity extends BaseActivity {
  type: ActivityType.APPLICATION;
  application: IApplicationPayload;
}

export interface InterviewActivity extends BaseActivity {
  type: ActivityType.INTERVIEW;
  interview: IInterviewPayload;
}

export interface OtherActivity extends BaseActivity {
  type: ActivityType.OTHER;
  message: string;
}

export type IActivity = ApplicationActivity | InterviewActivity | OtherActivity;

export async function getActivity(
  authHeader: string | null,
  payload?: IActivityPayload
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
