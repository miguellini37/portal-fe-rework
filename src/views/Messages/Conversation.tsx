import { FC, useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IMessage,
  getConversation,
  sendMessage,
  markMessageRead,
  getUserForMessaging,
  IUserToMessage,
} from '../../api/message';
import { useAuthHeader, useAuthUser, useIsStudentNotVerified } from '../../auth/hooks';
import { ArrowLeft, Send } from 'lucide-react';
import { onNewMessage, offNewMessage } from '../../api/websocket';
import './Messages.css';

export const Conversation: FC = () => {
  const { userId: otherUserId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState<IUserToMessage | null>(null);
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const loadConversation = useCallback(async () => {
    if (!authHeader || !otherUserId) {
      return;
    }

    try {
      const [conversationData, userData] = await Promise.all([
        getConversation(authHeader, otherUserId),
        getUserForMessaging(authHeader, { targetUserId: otherUserId }),
      ]);

      setMessages(conversationData.messages);
      setOtherUser(userData);

      // Mark unread messages as read
      const unreadMessages = conversationData.messages.filter(
        (msg) => msg.toUserId === user?.id && !msg.readAt
      );

      if (unreadMessages.length > 0) {
        for (const msg of unreadMessages) {
          try {
            await markMessageRead(authHeader, { messageId: msg.id });
          } catch (error) {
            console.error('Error marking message as read:', error);
          }
        }
        // Notify other components to refresh unread count
        window.dispatchEvent(new CustomEvent('message-read'));
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    } finally {
      setLoading(false);
    }
  }, [authHeader, otherUserId, user?.id]);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Listen for new messages
  useEffect(() => {
    const handleNewMessage = (message: IMessage) => {
      // Only add message if it's part of this conversation
      if (
        (message.fromUserId === otherUserId && message.toUserId === user?.id) ||
        (message.toUserId === otherUserId && message.fromUserId === user?.id)
      ) {
        setMessages((prev) => [...prev, message]);

        // Auto-mark as read if we're the recipient
        if (message.toUserId === user?.id && authHeader) {
          markMessageRead(authHeader, { messageId: message.id })
            .then(() => {
              // Notify other components to refresh unread count
              window.dispatchEvent(new CustomEvent('message-read'));
            })
            .catch((error) => {
              console.error('Error marking message as read:', error);
            });
        }
      }
    };

    onNewMessage(handleNewMessage);

    return () => {
      offNewMessage(handleNewMessage);
    };
  }, [otherUserId, user?.id, authHeader]);

  const isStudentNotVerified = useIsStudentNotVerified();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !authHeader || !otherUserId || sending) {
      return;
    }

    setSending(true);

    try {
      const sentMessage = await sendMessage(authHeader, {
        toUserId: otherUserId,
        message: newMessage.trim(),
      });

      setMessages((prev) => [...prev, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleBack = () => {
    navigate('/messages');
  };

  const formatMessageTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="conversation-container">
        <div className="conversation-header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={24} />
          </button>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={24} />
        </button>
        <div className="conversation-header-info">
          <div className="conversation-avatar-small">
            {otherUser
              ? `${otherUser.firstName.charAt(0)}${otherUser.lastName.charAt(0)}`.toUpperCase()
              : '?'}
          </div>
          <div>
            <h2>{otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Loading...'}</h2>
            {otherUser && (otherUser.companyName || otherUser.schoolName) && (
              <div className="conversation-user-affiliation">
                {otherUser.companyName || otherUser.schoolName}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="conversation-privacy-notice">
        <p>
          Do not share sensitive information through this messaging system. All messages will be
          automatically deleted 30 days after they are sent.
        </p>
      </div>

      <div className="messages-list">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isFromMe = message.fromUserId === user?.id;
            return (
              <div
                key={message.id}
                className={`message-item ${isFromMe ? 'message-sent' : 'message-received'}`}
              >
                <div className="message-bubble">
                  <p>{message.message}</p>
                  <span className="message-time">{formatMessageTime(message.createdAt)}</span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder={isStudentNotVerified ? 'User is Not Validated' : 'Type a message...'}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={sending || isStudentNotVerified}
          className="message-input"
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || sending || isStudentNotVerified}
          className="send-button"
          title={isStudentNotVerified ? 'User is Not Validated' : undefined}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
