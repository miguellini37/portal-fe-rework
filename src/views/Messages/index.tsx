import { FC, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRecentConversation, getRecentMessages } from '../../api/message';
import { useAuthHeader, useAuthUser, useIsStudentNotVerified } from '../../auth/hooks';
import { MessageSquare, Plus } from 'lucide-react';
import {
  initializeSocket,
  subscribeToMessages,
  onNewMessage,
  offNewMessage,
} from '../../api/websocket';
import './Messages.css';

export const Messages: FC = () => {
  const [conversations, setConversations] = useState<IRecentConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const navigate = useNavigate();

  const loadConversations = useCallback(async () => {
    if (!authHeader) {
      return;
    }

    try {
      const data = await getRecentMessages(authHeader);
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  }, [authHeader]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Initialize WebSocket
  useEffect(() => {
    if (!authHeader || !user?.id) {
      return;
    }

    const token = authHeader.replace('Bearer ', '');
    const socket = initializeSocket(token);

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
      subscribeToMessages(user.id!, (response) => {
        if (response.success) {
          console.log('Successfully subscribed to messages');
        } else {
          console.error('Subscription failed:', response.error);
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    const handleNewMessage = () => {
      // Reload conversations when a new message arrives
      loadConversations();
    };

    onNewMessage(handleNewMessage);

    return () => {
      offNewMessage(handleNewMessage);
    };
  }, [authHeader, user?.id, loadConversations]);

  const isStudentNotVerified = useIsStudentNotVerified();

  const handleConversationClick = (otherUserId: string) => {
    navigate(`/messages/${otherUserId}`);
  };

  const handleNewConversation = () => {
    navigate('/messages/new');
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const messageDate = new Date(date);

    // Reset time to start of day for accurate day comparison
    const nowStartOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDateStartOfDay = new Date(
      messageDate.getFullYear(),
      messageDate.getMonth(),
      messageDate.getDate()
    );

    const diffTime = nowStartOfDay.getTime() - messageDateStartOfDay.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today - show time
      return messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  if (loading) {
    return (
      <div className="messages-container">
        <div className="messages-header">
          <h1>Messages</h1>
        </div>
        <div className="messages-loading">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h1>Messages</h1>
        <button
          className="new-conversation-btn"
          onClick={handleNewConversation}
          disabled={isStudentNotVerified}
          title={isStudentNotVerified ? 'User is Not Validated' : undefined}
        >
          <Plus size={20} />
          <span>New Conversation</span>
        </button>
      </div>

      {conversations.length === 0 ? (
        <div className="messages-empty">
          <MessageSquare size={64} className="messages-empty-icon" />
          <h2>No messages yet</h2>
          <p>Start a conversation by clicking the "New Conversation" button</p>
        </div>
      ) : (
        <div className="conversations-list">
          {conversations.map((conversation) => (
            <div
              key={conversation.conversationId}
              className="conversation-item"
              onClick={() => handleConversationClick(conversation.otherUserId)}
            >
              <div className="conversation-avatar">
                {conversation.otherUserName.charAt(0).toUpperCase()}
              </div>
              <div className="conversation-content">
                <div className="conversation-header">
                  <h3 className="conversation-name">{conversation.otherUserName}</h3>
                  <span className="conversation-date">
                    {formatDate(conversation.lastMessageDate)}
                  </span>
                </div>
                <div className="conversation-preview">
                  <p className={conversation.unreadCount > 0 ? 'unread' : ''}>
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="unread-badge">{conversation.unreadCount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
