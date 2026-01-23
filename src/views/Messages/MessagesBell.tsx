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

  // Initialize WebSocket and listen for new messages
  useEffect(() => {
    if (!authHeader || !user?.id) {
      return;
    }

    const token = authHeader.replace('Bearer ', '');
    const socket = initializeSocket(token);

    socket.on('connect', () => {
      console.log('MessagesBell: Connected to WebSocket');
      subscribeToMessages(user.id!, (response) => {
        if (response.success) {
          console.log('MessagesBell: Successfully subscribed to messages');
        } else {
          console.error('MessagesBell: Subscription failed:', response.error);
        }
      });
    });

    const handleNewMessage = () => {
      // Update unread count when a new message arrives
      updateUnreadCount();
    };

    onNewMessage(handleNewMessage);

    return () => {
      offNewMessage(handleNewMessage);
    };
  }, [authHeader, user?.id, updateUnreadCount]);

  // Listen for message-read events from other components
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
