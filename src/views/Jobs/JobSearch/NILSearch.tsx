import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { getAllJobs, IJobPayload, IJobsFilter } from '../../../api/job';
import { NILModal } from '../NILModal';
import { NILCard } from './NILCard';
import './JobPostingsDashboard.css';
import '../../../styles/searchPage.css';
import { createApplication } from '../../../api/application';

interface NILSearchProps {
  pageTitle: string;
  pageSubtitle: string;
  canEditNIL?: boolean;
  canApplyToNIL?: boolean;
}

export const NILSearch = ({
  pageTitle,
  pageSubtitle,
  canEditNIL,
  canApplyToNIL,
}: NILSearchProps) => {
  const authHeader = useAuthHeader();

  const [nilOpportunities, setNilOpportunities] = useState<IJobPayload[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNIL, setSelectedNIL] = useState<IJobPayload | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNILOpportunities = async () => {
    try {
      // Filter for NIL type jobs
      const nilFilter: IJobsFilter = { type: 'nil' };
      const jobs = await getAllJobs(authHeader, nilFilter);
      setNilOpportunities(jobs);
    } catch {
      toast.error('Failed to fetch NIL opportunities');
    }
  };

  useEffect(() => {
    fetchNILOpportunities();
  }, []);

  const handleViewNIL = (nil: IJobPayload) => {
    setSelectedNIL(nil);
    setShowModal(true);
  };

  const applyToNIL = async (nil: IJobPayload) => {
    try {
      await createApplication(authHeader, { jobId: nil.id });
      toast.success('Successfully applied to NIL opportunity');
    } catch {
      toast.error('Failed to apply to NIL opportunity');
    }
  };

  const filteredNILOpportunities = nilOpportunities.filter(
    (nil) =>
      nil.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nil.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nil.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nil.experience?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">{pageTitle}</h1>
        <div className="search-page-subtitle">{pageSubtitle}</div>
        <div className="header-actions">
          {canEditNIL && (
            <button className="post-job-btn" onClick={() => setShowModal(true)}>
              + Add NIL Opportunity
            </button>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search by position, opportunity type, industry, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">{filteredNILOpportunities.length} results</div>
      </div>

      {/* NIL Cards */}
      <div className="search-page-grid">
        {filteredNILOpportunities.map((nil) => (
          <NILCard
            key={nil.id}
            nil={nil}
            onView={handleViewNIL}
            canEdit={canEditNIL}
            canApply={!nil.hasApplied && canApplyToNIL}
            onApply={applyToNIL}
          />
        ))}
      </div>

      {filteredNILOpportunities.length === 0 && (
        <div className="empty-state">
          <p>No NIL opportunities found.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <NILModal
          nil={selectedNIL}
          onClose={() => {
            setShowModal(false);
            setSelectedNIL(null);
          }}
          onSuccess={fetchNILOpportunities}
        />
      )}
    </div>
  );
};
