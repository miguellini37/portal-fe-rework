import { io, Socket } from 'socket.io-client';
import { url } from '../config/url';
import { IMessage } from './message';

export interface ISubscribeResponse {
  success: boolean;
  message: string;
  error?: string;
}

let socket: Socket | null = null;
let currentUserId: string | null = null;

export const initializeSocket = (authToken: string): Socket => {
  if (socket && socket.connected) {
    return socket;
  }

  // Disconnect stale socket before creating new one
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }

  socket = io(url || '', {
    path: '/subscription',
    transports: ['websocket', 'polling'],
    auth: {
      token: authToken,
    },
    query: {
      token: authToken,
    },
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 30000,
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
  currentUserId = null;
};

export const subscribeToMessages = (
  userId: string,
  callback?: (response: ISubscribeResponse) => void
): void => {
  if (!socket) {
    return;
  }

  // Don't re-subscribe if already subscribed for this user
  if (currentUserId === userId) {
    return;
  }

  currentUserId = userId;
  socket.emit('subscribe', { userId }, callback);
};

export const unsubscribeFromMessages = (): void => {
  if (!socket || !currentUserId) {
    return;
  }

  socket.emit('unsubscribe', { userId: currentUserId });
  currentUserId = null;
};

export const onNewMessage = (callback: (message: IMessage) => void): void => {
  if (!socket) {
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
