import { FC, useEffect, useMemo, useState } from 'react';
import { useAuthHeader } from '../../auth/hooks';
import { toast } from 'react-toastify';
import { getInterviews, IInterviewPayload } from '../../api/interview';
import { InterviewCard } from './InterviewCard';
import { CardTable } from '../../components/CardTable';
import '../Companies/company.css';
import '../Applications/applications.css';

interface Props {
  pageTitle?: string;
  pageSubtitle?: string;
}

export const InterviewSearch: FC<Props> = ({
  pageTitle = 'My Interviews',
  pageSubtitle = 'View and manage your scheduled interviews',
}) => {
  const authHeader = useAuthHeader();
  const [interviews, setInterviews] = useState<IInterviewPayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInterviews = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await getInterviews(authHeader);
      setInterviews(data);
    } catch {
      toast.error('Failed to fetch interviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [authHeader]);

  const filtered = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return interviews.filter((i) => {
      const location = i.location?.toLowerCase() ?? '';
      const interviewer = i.interviewer?.toLowerCase() ?? '';
      const date = new Date(i.dateTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return (
        location.includes(query) ||
        interviewer.includes(query) ||
        date.toLowerCase().includes(query)
      );
    });
  }, [interviews, searchTerm]);

  if (loading) {
    return (
      <div className="search-page-root">
        <div className="search-page-header">
          <h1 className="search-page-title">{pageTitle}</h1>
          <div className="search-page-subtitle">{pageSubtitle}</div>
        </div>
        <div className="loading-state">
          <p>Loading interviews...</p>
        </div>
      </div>
    );
  }

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
          placeholder="Search interviews by location, interviewer, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      <CardTable minCardWidth={350}>
        {filtered.map((i) => (
          <InterviewCard key={i.id} interview={i} />
        ))}
      </CardTable>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>
            {searchTerm
              ? `No interviews found matching "${searchTerm}"`
              : interviews.length === 0
                ? 'No interviews yet.'
                : 'No interviews match your search criteria.'}
          </p>
        </div>
      )}
    </div>
  );
};
