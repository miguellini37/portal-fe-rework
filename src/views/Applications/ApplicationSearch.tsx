import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import {
  getApplications,
  updateApplicationStatus,
  IApplicationPayload,
  ApplicationStatus,
} from '../../api/application';
import { ApplicationCard } from './ApplicationCard';
import '../Companies/company.css';
import './applications.css';

interface ApplicationSearchProps {
  pageTitle?: string;
  pageSubtitle?: string;
}

export const ApplicationSearch: React.FC<ApplicationSearchProps> = ({
  pageTitle = 'My Applications',
  pageSubtitle = 'Track your job applications and their status',
}) => {
  const authHeader = useAuthHeader();
  const [applications, setApplications] = useState<IApplicationPayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchApplications = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await getApplications(authHeader);
      setApplications(data);
    } catch {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [authHeader]);

  // Provide an updater so ApplicationCard can change status from this page
  const handleUpdateStatus = async (
    applicationId?: string,
    status?: ApplicationStatus
  ): Promise<IApplicationPayload> => {
    if (!applicationId) throw new Error('Missing applicationId');

    const updated = await updateApplicationStatus(authHeader, { id: applicationId, status });
    setApplications(prev => prev.map(a => (a.id === updated.id ? updated : a)));

    const s = String(updated.status ?? '').replace(/_/g, ' ');
    toast.success(`Application ${s || 'updated'}`);
    return updated;
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter((application) => {
    const query = searchTerm.toLowerCase();
    const position = application.job?.position?.toLowerCase() ?? '';
    const company = application.job?.company?.companyName?.toLowerCase() ?? '';
    const status = application.status ? application.status.toString().toLowerCase() : '';
    return position.includes(query) || company.includes(query) || status.includes(query);
  });

  if (loading) {
    return (
      <div className="search-page-root">
        <div className="search-page-header">
          <h1 className="search-page-title">{pageTitle}</h1>
          <div className="search-page-subtitle">{pageSubtitle}</div>
        </div>
        <div className="loading-state">
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">{pageTitle}</h1>
        <div className="search-page-subtitle">{pageSubtitle}</div>
      </div>

      {/* Search Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search applications by position, company, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">
          {filteredApplications.length} result{filteredApplications.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="search-page-grid">
        {filteredApplications.map(app => (
          <ApplicationCard
            key={app.id}
            application={app}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="empty-state">
          <p>
            {searchTerm
              ? `No applications found matching "${searchTerm}"`
              : applications.length === 0
                ? "You haven't applied to any jobs yet."
                : 'No applications match your search criteria.'}
          </p>
        </div>
      )}
    </div>
  );
};
