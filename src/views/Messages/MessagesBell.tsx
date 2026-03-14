import { FC, useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { useAuthHeader, useAuthUser } from '../../auth/hooks';
import { getRecentMessages } from '../../api/message';
import {
  initializeSocket,
  subscribeToMessages,
  onNewMessage,
  offNewMessage,
} from '../../api/websocket';

interface MessagesBellProps {
  isCollapsed?: boolean;
  className?: string;
}

export const MessagesBell: FC<MessagesBellProps> = ({ isCollapsed, className }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const authHeader = useAuthHeader();
  const user = useAuthUser();

  const updateUnreadCount = useCallback(async () => {
    if (!authHeader) {
      return;
    }

    try {
      const conversations = await getRecentMessages(authHeader);
      const total = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
      setUnreadCount(total);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  }, [authHeader]);

  useEffect(() => {
    updateUnreadCount();
  }, [updateUnreadCount]);

  // Initialize WebSocket connection (single point of initialization)
  useEffect(() => {
    if (!authHeader || !user?.id) {
      return;
    }

    const token = authHeader.replace('Bearer ', '');
    const socket = initializeSocket(token);

    const handleConnect = () => {
      subscribeToMessages(user.id!);
    };

    socket.on('connect', handleConnect);

    // If already connected, subscribe immediately
    if (socket.connected) {
      subscribeToMessages(user.id!);
    }

    const handleNewMessage = () => {
      updateUnreadCount();
    };

    onNewMessage(handleNewMessage);

    return () => {
      socket.off('connect', handleConnect);
      offNewMessage(handleNewMessage);
      // Don't call disconnectSocket() here — it destroys all listeners
      // including those registered by Conversation. Socket persists until logout.
    };
  }, [authHeader, user?.id, updateUnreadCount]);

  // Listen for message-read events from Conversation component
  useEffect(() => {
    const handleMessageRead = () => {
      updateUnreadCount();
    };

    window.addEventListener('message-read', handleMessageRead);

    return () => {
      window.removeEventListener('message-read', handleMessageRead);
    };
  }, [updateUnreadCount]);

  return (
    <NavLink to="/messages" className={`sidebar-action-btn ${className ?? ''}`} title="Messages">
      <MessageSquare size={22} />
      {!isCollapsed && <span>Messages{unreadCount > 0 && ` (${unreadCount})`}</span>}
      {isCollapsed && unreadCount > 0 && <span className="sidebar-badge">{unreadCount}</span>}
    </NavLink>
  );
};
