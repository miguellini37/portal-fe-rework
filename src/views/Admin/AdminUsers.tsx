import { Check } from 'lucide-react';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { whiteListUser } from '../../api/profile';
import { getAllUsers, User } from '../../api/admin';
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

  const handleVerify = useCallback(
    async (user: User) => {
      const orgId = user.company?.id ?? user.school?.id ?? '';
      try {
        await whiteListUser(authHeader, { email: user.email ?? '', orgId, isActive: true });
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="td table-empty">
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
