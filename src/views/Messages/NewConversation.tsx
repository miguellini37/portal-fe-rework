import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { getUsersToMessage, IUserToMessage } from '../../api/message';
import './Messages.css';
import { useAuthHeader } from '../../auth/hooks';

export const NewConversation: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<IUserToMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const handleBack = () => {
    navigate('/messages');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getUsersToMessage(authHeader, {
          search: searchQuery.trim() || undefined,
        });
        setUsers(response.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, authHeader]);

  const handleStartConversation = (userId: string) => {
    navigate(`/messages/${userId}`);
  };

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={24} />
        </button>
        <h2>New Conversation</h2>
      </div>

      <div className="new-conversation-content">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading-message">Loading users...</div>
        ) : (
          <div className="users-list">
            {users.length === 0 ? (
              <div className="no-users-message">
                {searchQuery.trim() ? 'No users found' : 'Start typing to search for users'}
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="user-item"
                  onClick={() => handleStartConversation(user.id)}
                >
                  <div className="user-info">
                    <div className="user-name">
                      {user.firstName} {user.lastName}
                    </div>
                    {(user.companyName || user.schoolName) && (
                      <div className="user-affiliation">{user.companyName || user.schoolName}</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
