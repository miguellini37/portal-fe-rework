import { io, Socket } from 'socket.io-client';
import { url } from '../config/url';
import { IMessage } from './message';

export interface ISubscribeResponse {
  success: boolean;
  message: string;
  error?: string;
}

let socket: Socket | null = null;

export const initializeSocket = (authToken: string): Socket => {
  if (socket && socket.connected) {
    return socket;
  }

  socket = io(url || '', {
    path: '/messages',
    transports: ['websocket', 'polling'],
    auth: {
      token: authToken,
    },
    query: {
      token: authToken,
    },
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToMessages = (
  userId: string,
  callback: (response: ISubscribeResponse) => void
): void => {
  if (!socket) {
    console.error('Socket not initialized');
    return;
  }

  socket.emit('subscribe', { userId }, callback);
};

export const unsubscribeFromMessages = (userId: string): void => {
  if (!socket) {
    console.error('Socket not initialized');
    return;
  }

  socket.emit('unsubscribe', { userId });
};

export const onNewMessage = (callback: (message: IMessage) => void): void => {
  if (!socket) {
    console.error('Socket not initialized');
    return;
  }

  socket.on('newMessage', callback);
};

export const offNewMessage = (callback: (message: IMessage) => void): void => {
  if (!socket) {
    return;
  }

  socket.off('newMessage', callback);
};
