import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getAllSchools,
  SchoolWithOwner,
  createSchool,
  ICreateSchoolInput,
  updateSchoolOwner,
  IUpdateSchoolOwnerInput,
} from '../../api/admin';
import { useAuthHeader, USER_PERMISSIONS } from '../../auth/hooks';
import { UserDropdown, UserOption } from '../../components/Dropdowns/UserDropdown';
import { SingleValue } from 'react-select';
import { ChangeOwnerModal } from '../../components/ChangeOwnerModal';
import '../../components/Table/Table.css';

export const AdminSchools: FC = () => {
  const [schools, setSchools] = useState<SchoolWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('');
  const authHeader = useAuthHeader();

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const data = await getAllSchools(authHeader);
      setSchools(data);
    } catch (error) {
      toast.error('Failed to fetch schools');
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!schoolName.trim()) {
      toast.error('School name is required');
      return;
    }

    try {
      setSubmitting(true);
      const input: ICreateSchoolInput = {
        schoolName: schoolName.trim(),
        ownerId: selectedUserId || undefined,
      };

      await createSchool(input, authHeader);
      toast.success('School created successfully');

      // Reset form
      setSchoolName('');
      setSelectedUserId('');

      // Refresh the schools list
      fetchSchools();
    } catch (error) {
      toast.error('Failed to create school');
      console.error('Error creating school:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUserChange = (newValue: SingleValue<UserOption>) => {
    setSelectedUserId(newValue?.value || '');
  };

  const handleChangeOwnerClick = (schoolId: string) => {
    setSelectedSchoolId(schoolId);
    setIsModalOpen(true);
  };

  const handleChangeOwnerSubmit = async (ownerId: string) => {
    const input: IUpdateSchoolOwnerInput = {
      schoolId: selectedSchoolId,
      ownerId,
    };

    await updateSchoolOwner(input, authHeader);
    toast.success('School owner updated successfully');
    fetchSchools();
  };

  // Filter schools based on search term
  const filteredSchools = schools.filter(
    (school) =>
      school.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.ownerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">School Management</h1>
        <div className="search-page-subtitle">View and manage all schools in the system</div>
      </div>

      {/* Create School Form */}
      <div
        style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: 'var(--card)',
          borderRadius: '0.5rem',
          border: '1px solid var(--border)',
        }}
      >
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
          Create New School
        </h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div>
              <label
                htmlFor="schoolName"
                style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
              >
                School Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="schoolName"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter school name"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="userId"
                style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
              >
                School Profile Owner
              </label>
              <UserDropdown
                id="userId"
                selected={selectedUserId}
                onChange={handleUserChange}
                disabled={submitting}
                filter={{ permission: USER_PERMISSIONS.SCHOOL }}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: submitting ? 'var(--muted)' : 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontWeight: '500',
            }}
          >
            {submitting ? 'Creating...' : 'Create School'}
          </button>
        </form>
      </div>

      {/* Search Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search schools by name, owner, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">
          {filteredSchools.length} result{filteredSchools.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="table-empty">Loading schools...</div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="thead">
              <tr>
                <th className="th">ID</th>
                <th className="th">School Name</th>
                <th className="th">Owner Name</th>
                <th className="th">Owner Email</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <tr key={school.id} className="tr">
                    <td
                      className="td"
                      style={{
                        fontSize: '0.75rem',
                        maxWidth: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {school.id}
                    </td>
                    <td className="td">{school.schoolName || '-'}</td>
                    <td className="td">{school.ownerName || '-'}</td>
                    <td className="td">{school.ownerEmail || '-'}</td>
                    <td className="td">
                      <button
                        onClick={() => handleChangeOwnerClick(school.id)}
                        className="btn"
                        style={{
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.875rem',
                        }}
                      >
                        Change Owner
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="td table-empty">
                    {searchTerm
                      ? `No schools found matching "${searchTerm}"`
                      : 'No schools available.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Change Owner Modal */}
      <ChangeOwnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleChangeOwnerSubmit}
        userFilter={{
          permission: USER_PERMISSIONS.SCHOOL,
        }}
        title="Change School Owner"
      />
    </div>
  );
};
