import axios from 'axios';
import { url } from '../config/url';

export interface User {
  id: string;
  email?: string;
  permission?: string;
  firstName?: string;
  lastName?: string;
  isVerified?: boolean;
  company?: {
    id?: string;
    companyName?: string;
  } | null;
  school?: {
    id?: string;
    schoolName?: string;
  } | null;
}

export interface SchoolWithOwner {
  id: string;
  schoolName?: string;
  ownerName: string;
  ownerEmail: string;
}

export interface CompanyWithOwner {
  id: string;
  companyName?: string;
  ownerName: string;
  ownerEmail: string;
}

export interface ICreateCompanyInput {
  companyName: string;
  ownerId?: string;
}

export interface ICreateSchoolInput {
  schoolName: string;
  ownerId?: string;
}

export interface IGetAllUsersInput {
  name?: string;
  permission?: string;
  schoolId?: string;
  companyId?: string;
}

export interface IUpdateSchoolOwnerInput {
  schoolId: string;
  ownerId: string;
}

export interface IUpdateCompanyOwnerInput {
  companyId: string;
  ownerId: string;
}

export const getAllUsers = async (
  authHeader: string | null,
  filter?: IGetAllUsersInput
): Promise<User[]> => {
  const response = await axios.get(`${url}/getAllUsers`, {
    params: filter,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getAllSchools = async (authHeader: string | null): Promise<SchoolWithOwner[]> => {
  const response = await axios.get(`${url}/getAllSchools`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getAllCompanies = async (authHeader: string | null): Promise<CompanyWithOwner[]> => {
  const response = await axios.get(`${url}/getAllCompanies`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const createCompany = async (
  data: ICreateCompanyInput,
  authHeader: string | null
): Promise<CompanyWithOwner> => {
  const response = await axios.post(`${url}/createCompany`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const createSchool = async (
  data: ICreateSchoolInput,
  authHeader: string | null
): Promise<SchoolWithOwner> => {
  const response = await axios.post(`${url}/createSchool`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const updateSchoolOwner = async (
  data: IUpdateSchoolOwnerInput,
  authHeader: string | null
): Promise<SchoolWithOwner> => {
  const response = await axios.patch(`${url}/updateSchoolOwner`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const updateCompanyOwner = async (
  data: IUpdateCompanyOwnerInput,
  authHeader: string | null
): Promise<CompanyWithOwner> => {
  const response = await axios.patch(`${url}/updateCompanyOwner`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
