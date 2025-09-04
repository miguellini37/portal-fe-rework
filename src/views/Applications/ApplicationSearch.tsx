import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { getApplications, IApplicationPayload } from '../../api/application';
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
  const [applications, setApplications] = useState<IApplicationPayload[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const authHeader = useAuthHeader();

  const fetchApplications = async () => {
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
        {filteredApplications.map((application) => (
          <ApplicationCard key={application.id} application={application}/>
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
