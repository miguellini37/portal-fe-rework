import { FC, useEffect, useMemo, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { ApplicationCard } from '../../Applications/ApplicationCard';
import { getApplications, IApplicationPayload, ApplicationStatus } from '../../../api/application';

interface CompanyApplicationsProps {
  jobId?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  onUpdateStatus?: (
    applicationId?: string,
    status?: ApplicationStatus
  ) => IApplicationPayload | Promise<IApplicationPayload>;
}

export const Application: FC<CompanyApplicationsProps> = ({
  jobId,
  pageTitle = 'Job Applications',
  pageSubtitle = 'Review applications submitted to your jobs',
  onUpdateStatus,
}) => {
  const [applications, setApplications] = useState<IApplicationPayload[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const authHeader = useAuthHeader();

  const fetchApplications = async (): Promise<void> => {
    if (!authHeader) return;
    setLoading(true);
    try {
      const data = await getApplications(authHeader, jobId);
      setApplications(data ?? []);
    } catch {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [authHeader, jobId]);

  // search + sort (unchanged)
  const filteredApplications = useMemo(() => {
    const q = searchTerm.toLowerCase();
    const getCreatedAtMs = (app: IApplicationPayload): number => {
      const creationDate = app.creationDate;
      if (!creationDate) return 0;
      if (creationDate instanceof Date) return creationDate.getTime();
      const ms = Date.parse(creationDate);
      return Number.isNaN(ms) ? 0 : ms;
    };

    const filtered = applications.filter((application) => {
      const pos = (application.job?.position ?? '').toLowerCase();
      const status = (application.status as ApplicationStatus | undefined)?.toLowerCase?.() ?? '';
      const firstName = (application.athlete?.firstName ?? '').toLowerCase();
      const lastName = (application.athlete?.lastName ?? '').toLowerCase();
      const fullName = `${firstName} ${lastName}`.trim();
      const fullNameReverse = `${lastName} ${firstName}`.trim();

      return (
        pos.includes(q) ||
        status.includes(q) ||
        firstName.includes(q) ||
        lastName.includes(q) ||
        fullName.includes(q) ||
        fullNameReverse.includes(q)
      );
    });

    return filtered.sort((a, b) =>
      sortOrder === 'desc'
        ? getCreatedAtMs(b) - getCreatedAtMs(a)
        : getCreatedAtMs(a) - getCreatedAtMs(b)
    );
  }, [applications, searchTerm, sortOrder]);

  return (
    <div className="search-page-root">
      <div className="search-page-header">
        <h1 className="search-page-title">{pageTitle}</h1>
        <div className="search-page-subtitle">{pageSubtitle}</div>
      </div>

      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search applications by position, athlete name, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="search-page-sort-button"
          onClick={() => setSortOrder((p) => (p === 'desc' ? 'asc' : 'desc'))}
          aria-label="Toggle sort by created date"
          style={{ marginLeft: 8 }}
        >
          {sortOrder === 'desc' ? 'Date: Newest' : 'Date: Oldest'}
        </button>
        <div className="search-page-results-count" style={{ marginLeft: 8 }}>
          {filteredApplications.length} result{filteredApplications.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="search-page-grid">
        {filteredApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onUpdateStatus={onUpdateStatus}
            showJobPosition={false}
          />
        ))}
      </div>

      {loading && (
        <div className="loading-state">
          <p>Loading applications...</p>
        </div>
      )}

      {!loading && filteredApplications.length === 0 && (
        <div className="empty-state">
          <p>
            {searchTerm
              ? `No applications found matching "${searchTerm}"`
              : applications.length === 0
                ? 'No applications found for this company.'
                : 'No applications match your search criteria.'}
          </p>
        </div>
      )}
    </div>
  );
};
