import axios from 'axios';
import { IUserData, USER_PERMISSIONS } from '../auth/hooks';
import { url } from '../config/url';

export interface ICreateUserInput {
  permission?: USER_PERMISSIONS;

  companyId?: string;
  schoolId?: string;
}

export const createProfile = async (
  authHeader: string | null,
  data: ICreateUserInput
): Promise<IUserData> => {
  const response = await axios.post(`${url}/createProfile`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export interface IGetAllOrgUsersInput {
  name?: string;
  email?: string;
  isVerified?: boolean | null;
}

export interface IOrgUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

export interface IAllOrgUsersResponse {
  students: IOrgUserResponse[];
  employees: IOrgUserResponse[];
}

export const getAllOrgUsers = async (
  authHeader: string | null,
  data: IGetAllOrgUsersInput
): Promise<IAllOrgUsersResponse> => {
  const response = await axios.post(`${url}/getAllOrgUsers`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export interface IWhiteListUserInput {
  email: string;
  orgId: string;
  isActive: boolean;
}

export const whiteListUser = async (
  authHeader: string | null,
  data: IWhiteListUserInput
): Promise<boolean> => {
  const response = await axios.post(`${url}/whiteListUser`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
