import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="td table-empty">
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
