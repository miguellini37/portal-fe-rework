import { Check, KeyRound, ShieldOff, Ban } from 'lucide-react';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getAllUsers,
  sendResetPasswordEmail,
  verifyUser,
  unverifyUser,
  blockUser,
  User,
} from '../../api/admin';
import { useAuthHeader } from '../../auth/hooks';
import '../../components/Table/Table.css';

export const AdminUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const authHeader = useAuthHeader();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers(authHeader);
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = useCallback(
    async (user: User) => {
      try {
        await sendResetPasswordEmail(user.id, authHeader);
        toast.success(`Password reset email sent to ${user.email}`);
      } catch (error) {
        toast.error('Failed to send password reset email');
        console.error('Error sending reset password email:', error);
      }
    },
    [authHeader]
  );

  const handleUnverify = useCallback(
    async (user: User) => {
      if (!confirm(`Remove verification for ${user.email}?`)) {
        return;
      }
      try {
        await unverifyUser(user.id, authHeader);
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isVerified: false } : u)));
        toast.success('User verification removed');
      } catch (error) {
        toast.error('Failed to remove verification');
        console.error('Error unverifying user:', error);
      }
    },
    [authHeader]
  );

  const handleBlock = useCallback(
    async (user: User) => {
      if (!confirm(`Block ${user.email}? They will not be able to log in.`)) {
        return;
      }
      try {
        await blockUser(user.id, true, authHeader);
        toast.success(`${user.email} has been blocked`);
      } catch (error) {
        toast.error('Failed to block user');
        console.error('Error blocking user:', error);
      }
    },
    [authHeader]
  );

  const handleVerify = useCallback(
    async (user: User) => {
      try {
        await verifyUser(user.id, authHeader);
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isVerified: true } : u)));
        toast.success('User verified successfully');
      } catch (error) {
        toast.error('Failed to verify user');
        console.error('Error verifying user:', error);
      }
    },
    [authHeader]
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.school?.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">User Management</h1>
        <div className="search-page-subtitle">View and manage all users in the system</div>
      </div>

      {/* Search Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search users by name, email, company, or school..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">
          {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="table-empty">Loading users...</div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="thead">
              <tr>
                <th className="th">ID</th>
                <th className="th">Email</th>
                <th className="th">First Name</th>
                <th className="th">Last Name</th>
                <th className="th">School</th>
                <th className="th">Company</th>
                <th className="th">Verified</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="tr">
                    <td
                      className="td"
                      style={{
                        fontSize: '0.75rem',
                        maxWidth: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {user.id}
                    </td>
                    <td className="td">{user.email || '-'}</td>
                    <td className="td">{user.firstName || '-'}</td>
                    <td className="td">{user.lastName || '-'}</td>
                    <td className="td">{user.school?.schoolName || '-'}</td>
                    <td className="td">{user.company?.companyName || '-'}</td>
                    <td className="td" style={{ textAlign: 'center' }}>
                      {user.isVerified ? (
                        <Check size={18} color="green" />
                      ) : (
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                          onClick={() => handleVerify(user)}
                        >
                          Verify
                        </button>
                      )}
                    </td>
                    <td className="td" style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                          onClick={() => handleResetPassword(user)}
                          title="Send password reset email"
                        >
                          <KeyRound size={14} />
                        </button>
                        {user.isVerified && (
                          <button
                            className="btn btn-primary"
                            style={{
                              fontSize: '0.75rem',
                              padding: '4px 8px',
                              background: '#f59e0b',
                            }}
                            onClick={() => handleUnverify(user)}
                            title="Remove verification"
                          >
                            <ShieldOff size={14} />
                          </button>
                        )}
                        <button
                          className="btn btn-primary"
                          style={{ fontSize: '0.75rem', padding: '4px 8px', background: '#ef4444' }}
                          onClick={() => handleBlock(user)}
                          title="Block user"
                        >
                          <Ban size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="td table-empty">
                    {searchTerm ? `No users found matching "${searchTerm}"` : 'No users available.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
