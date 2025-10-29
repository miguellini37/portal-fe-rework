import { IUserData } from '../auth/hooks';

export const getFullName = (user: Pick<IUserData, 'firstName' | 'lastName'>): string => {
  return `${user.firstName} ${user.lastName}`;
};

export const getInitials = (user: Pick<IUserData, 'firstName' | 'lastName'>): string => {
  return user.firstName?.at(0) + (user.lastName?.at(0) ?? '');
};

export const toTitleCase = (s?: string) => {
  return (s ?? '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};
