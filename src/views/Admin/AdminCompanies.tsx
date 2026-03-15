import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getAllCompanies,
  CompanyWithOwner,
  createCompany,
  ICreateCompanyInput,
  updateCompanyOwner,
  IUpdateCompanyOwnerInput,
} from '../../api/admin';
import { useAuthHeader, USER_PERMISSIONS } from '../../auth/hooks';
import { UserDropdown, UserOption } from '../../components/Dropdowns/UserDropdown';
import { SingleValue } from 'react-select';
import { ChangeOwnerModal } from '../../components/ChangeOwnerModal';
import '../../components/Table/Table.css';

export const AdminCompanies: FC = () => {
  const [companies, setCompanies] = useState<CompanyWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');
  const authHeader = useAuthHeader();

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await getAllCompanies(authHeader);
      setCompanies(data);
    } catch (error) {
      toast.error('Failed to fetch companies');
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim()) {
      toast.error('Company name is required');
      return;
    }

    try {
      setSubmitting(true);
      const input: ICreateCompanyInput = {
        companyName: companyName.trim(),
        ownerId: selectedUserId || undefined,
      };

      await createCompany(input, authHeader);
      toast.success('Company created successfully');

      // Reset form
      setCompanyName('');
      setSelectedUserId('');

      // Refresh the companies list
      fetchCompanies();
    } catch (error) {
      toast.error('Failed to create company');
      console.error('Error creating company:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUserChange = (newValue: SingleValue<UserOption>) => {
    setSelectedUserId(newValue?.value || '');
  };

  const handleChangeOwnerClick = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setIsModalOpen(true);
  };

  const handleChangeOwnerSubmit = async (ownerId: string) => {
    const input: IUpdateCompanyOwnerInput = {
      companyId: selectedCompanyId,
      ownerId,
    };

    await updateCompanyOwner(input, authHeader);
    toast.success('Company owner updated successfully');
    fetchCompanies();
  };

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) =>
      company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.ownerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">Company Management</h1>
        <div className="search-page-subtitle">View and manage all companies in the system</div>
      </div>

      {/* Create Company Form */}
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
          Create New Company
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
                htmlFor="companyName"
                style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
              >
                Company Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
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
                Company Profile Owner
              </label>
              <UserDropdown
                id="userId"
                selected={selectedUserId}
                onChange={handleUserChange}
                disabled={submitting}
                filter={{ permission: USER_PERMISSIONS.COMPANY }}
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
            {submitting ? 'Creating...' : 'Create Company'}
          </button>
        </form>
      </div>

      {/* Search Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search companies by name, owner, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">
          {filteredCompanies.length} result{filteredCompanies.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="table-empty">Loading companies...</div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead className="thead">
              <tr>
                <th className="th">ID</th>
                <th className="th">Company Name</th>
                <th className="th">Owner Name</th>
                <th className="th">Owner Email</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company.id} className="tr">
                    <td
                      className="td"
                      style={{
                        fontSize: '0.75rem',
                        maxWidth: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {company.id}
                    </td>
                    <td className="td">{company.companyName || '-'}</td>
                    <td className="td">{company.ownerName || '-'}</td>
                    <td className="td">{company.ownerEmail || '-'}</td>
                    <td className="td">
                      <button
                        onClick={() => handleChangeOwnerClick(company.id)}
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
                      ? `No companies found matching "${searchTerm}"`
                      : 'No companies available.'}
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
          permission: USER_PERMISSIONS.COMPANY,
        }}
        title="Change Company Owner"
      />
    </div>
  );
};
