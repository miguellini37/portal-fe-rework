import axios from 'axios';
import { url } from '../config/url';

export interface ISchoolPaylod {
  id?: string;
  schoolName?: string;
  ownerId?: string;
}

export const getSchoolById = async (
  id: string,
  authHeader: string | null
): Promise<ISchoolPaylod> => {
  const response = await axios.get(`${url}/getSchool/${id}`, {
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
  const response = await axios.put(`${url}/updateSchool`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getSchools = async (): Promise<ISchoolPaylod[]> => {
  const response = await axios.get(`${url}/getSchools`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.data;
};

export interface SchoolDashboardMetrics {
  placedGraduates?: number;
  placedGraduatesChange?: number;
  nilComplianceRate?: number;
  nilComplianceRateChange?: number;
  activeSponsors?: number;
  activeSponsorsChange?: number;
  communityMembers?: number;
  communityMembersChange?: number;
}

export const getSchoolDashboardMetrics = async (
  schoolId: string,
  authHeader: string | null
): Promise<SchoolDashboardMetrics> => {
  const response = await axios.get(`${url}/getSchoolDashboardMetrics/${schoolId}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export interface SchoolActivity {
  id?: string;
  title?: string;
  timestamp?: string;
  type?: 'approved' | 'info' | 'compliance' | 'partnership';
}

export const getSchoolActivity = async (
  schoolId: string,
  authHeader: string | null
): Promise<SchoolActivity[]> => {
  const response = await axios.get(`${url}/getSchoolActivity/${schoolId}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export interface ISchoolPaylodLite {
  id?: string;
  schoolName?: string;
}
export const getSchoolsForDropdown = async (
  authHeader: string | null
): Promise<ISchoolPaylod[]> => {
  const response = await axios.get(`${url}/getSchoolsForDropdown`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
