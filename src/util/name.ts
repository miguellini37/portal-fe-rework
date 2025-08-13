import { IUserData } from '../auth/store';

export const getFullName = (user: IUserData): string => {
  return `${user.firstName} ${user.lastName}`;
};

export const getInitials = (user: IUserData): string => {
  return user.firstName?.at(0) + (user.lastName?.at(0) ?? '');
};
