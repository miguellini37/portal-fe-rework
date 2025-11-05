import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getAllOrgUsers,
  IAllOrgUsersResponse,
  IOrgUserResponse,
  whiteListUser,
} from '../../api/profile';
import { useAuthHeader, useAuthUser } from '../../auth/hooks';
import '../../components/Table/Table.css';

export const OrgAdminTab: FC = () => {
  const [orgUsers, setOrgUsers] = useState<IAllOrgUsersResponse>({ students: [], employees: [] });
  const [loading, setLoading] = useState(true);
  const [whitelistingEmail, setWhitelistingEmail] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [isVerifiedFilter, setIsVerifiedFilter] = useState<boolean | undefined>(undefined);
  const authHeader = useAuthHeader();
  const currentUser = useAuthUser();

  const fetchOrgUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllOrgUsers(authHeader, {
        name: nameFilter || undefined,
        email: emailFilter || undefined,
        isVerified: isVerifiedFilter,
      });
      setOrgUsers(data);
    } catch (error) {
      toast.error('Failed to fetch organization users');
      console.error('Error fetching organization users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgUsers();
  }, [nameFilter, emailFilter, isVerifiedFilter]);

  const handleWhitelistUser = async (email: string, isActive: boolean) => {
    const orgId = currentUser?.companyId || currentUser?.schoolId;

    if (!orgId) {
      toast.error('Organization ID not found');
      return;
    }

    try {
      setWhitelistingEmail(email);
      await whiteListUser(authHeader, {
        email,
        orgId,
        isActive,
      });
      toast.success(`User ${isActive ? 'whitelisted' : 'removed from whitelist'} successfully`);
      await fetchOrgUsers();
    } catch (error) {
      toast.error('Failed to whitelist user');
      console.error('Error whitelisting user:', error);
    } finally {
      setWhitelistingEmail(null);
    }
  };

  const allUsers: (IOrgUserResponse & { type: string })[] = [
    ...orgUsers.employees.map((user) => ({ ...user, type: 'Employee' })),
    ...orgUsers.students.map((user) => ({ ...user, type: 'Student' })),
  ];

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">Organization Users</h1>
        <div className="search-page-subtitle">View and manage users in your organization</div>
      </div>

      {/* Filter Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={{ flex: 1, marginRight: '10px' }}
        />
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Filter by email..."
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          style={{ flex: 1, marginRight: '10px' }}
        />
        <select
          className="search-page-searchbar"
          value={isVerifiedFilter === undefined ? '' : isVerifiedFilter ? 'true' : 'false'}
          onChange={(e) =>
            setIsVerifiedFilter(e.target.value === '' ? undefined : e.target.value === 'true')
          }
          style={{ flex: 0.5 }}
        >
          <option value="">All Verification Status</option>
          <option value="true">Verified</option>
          <option value="false">Not Verified</option>
        </select>
      </div>

      <div className="search-page-results-count">
        {allUsers.length} user{allUsers.length !== 1 ? 's' : ''}{' '}
        {!currentUser?.companyId &&
          `(${orgUsers.employees.length} employee${orgUsers.employees.length !== 1 ? 's' : ''}, ${orgUsers.students.length} student${orgUsers.students.length !== 1 ? 's' : ''})`}
      </div>

      {/* Table */}
      {loading ? (
        <div className="table-empty">Loading users...</div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="thead">
              <tr>
                <th className="th">First Name</th>
                <th className="th">Last Name</th>
                <th className="th">Email</th>
                <th className="th">Type</th>
                <th className="th">Verified</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 ? (
                allUsers.map((user, index) => (
                  <tr key={`${user.email}-${index}`} className="tr">
                    <td className="td">{user.firstName || '-'}</td>
                    <td className="td">{user.lastName || '-'}</td>
                    <td className="td">{user.email || '-'}</td>
                    <td className="td">{user.type}</td>
                    <td className="td">
                      <span
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          backgroundColor:
                            user.isVerified === true
                              ? '#dcfce7'
                              : user.isVerified === false
                                ? '#fee2e2'
                                : '#f3f4f6',
                          color:
                            user.isVerified === true
                              ? '#166534'
                              : user.isVerified === false
                                ? '#991b1b'
                                : '#6b7280',
                        }}
                      >
                        {user.isVerified === true
                          ? 'Yes'
                          : user.isVerified === false
                            ? 'Denied'
                            : 'No'}
                      </span>
                    </td>
                    <td className="td">
                      {currentUser?.id !== user.id && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleWhitelistUser(user.email, true)}
                            disabled={whitelistingEmail === user.email || user.isVerified === true}
                            style={{
                              padding: '6px 12px',
                              fontSize: '0.875rem',
                              borderRadius: '4px',
                              border: 'none',
                              backgroundColor: user.isVerified === true ? '#d1d5db' : '#10b981',
                              color: 'white',
                              cursor: user.isVerified === true ? 'not-allowed' : 'pointer',
                              opacity: whitelistingEmail === user.email ? 0.6 : 1,
                            }}
                          >
                            {whitelistingEmail === user.email ? 'Processing...' : 'Whitelist'}
                          </button>
                          {user.isVerified !== true && (
                            <button
                              onClick={() => handleWhitelistUser(user.email, false)}
                              disabled={
                                whitelistingEmail === user.email || user.isVerified === false
                              }
                              style={{
                                padding: '6px 12px',
                                fontSize: '0.875rem',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: user.isVerified === false ? '#d1d5db' : '#ef4444',
                                color: 'white',
                                cursor: user.isVerified === false ? 'not-allowed' : 'pointer',
                                opacity: whitelistingEmail === user.email ? 0.6 : 1,
                              }}
                            >
                              Deny
                            </button>
                          )}
                          {user.isVerified === true && (
                            <button
                              onClick={() => handleWhitelistUser(user.email, false)}
                              disabled={whitelistingEmail === user.email}
                              style={{
                                padding: '6px 12px',
                                fontSize: '0.875rem',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                cursor: 'pointer',
                                opacity: whitelistingEmail === user.email ? 0.6 : 1,
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="td table-empty">
                    No users found matching the current filters
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
