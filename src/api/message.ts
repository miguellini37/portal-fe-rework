import axios from 'axios';
import { url } from '../config/url';

export interface IMessage {
  id: string;
  conversationId: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  readAt?: Date;
  createdAt: Date;
}

export interface IRecentConversation {
  conversationId: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadCount: number;
}

export interface IConversationResponse {
  messages: IMessage[];
}

export interface ISendMessageInput {
  toUserId: string;
  message: string;
}

export interface IMarkMessageReadInput {
  messageId: string;
}

export interface IMarkMessageReadResponse {
  success: boolean;
  readAt: Date;
}

export interface IGetUsersToMessageInput {
  search?: string;
}

export interface IUserToMessage {
  id: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  schoolName?: string;
}

export interface IGetUsersToMessageResponse {
  users: IUserToMessage[];
}

export interface IGetUserForMessagingInput {
  targetUserId: string;
}

export const getRecentMessages = async (
  authHeader: string | null
): Promise<IRecentConversation[]> => {
  const response = await axios.get(`${url}/getRecentMessages`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getConversation = async (
  authHeader: string | null,
  otherUserId: string
): Promise<IConversationResponse> => {
  const response = await axios.get(`${url}/getConversation`, {
    params: {
      otherUserId,
    },
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const sendMessage = async (
  authHeader: string | null,
  data: ISendMessageInput
): Promise<IMessage> => {
  const response = await axios.post(`${url}/sendMessage`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const markMessageRead = async (
  authHeader: string | null,
  data: IMarkMessageReadInput
): Promise<IMarkMessageReadResponse> => {
  const response = await axios.patch(`${url}/markMessageRead`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getUsersToMessage = async (
  authHeader: string | null,
  params: IGetUsersToMessageInput
): Promise<IGetUsersToMessageResponse> => {
  const response = await axios.get(`${url}/getUsersToMessage`, {
    params,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getUserForMessaging = async (
  authHeader: string | null,
  params: IGetUserForMessagingInput
): Promise<IUserToMessage | null> => {
  const response = await axios.get(`${url}/getUserForMessaging`, {
    params,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};
