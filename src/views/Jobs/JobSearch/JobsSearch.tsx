import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { getAllJobs, IJobPayload, IJobsFilter } from '../../../api/job';
import { JobModal } from '../JobModal';
import { JobCard } from './JobCard';
import './JobPostingsDashboard.css';
import '../../../styles/searchPage.css';

interface JobSearchProps {
  pageTitle: string;
  pageSubtitle: string;
  canEditJobs?: boolean;
  additionalFilters?: Partial<IJobsFilter>;
}

export const JobSearch = ({
  pageTitle,
  pageSubtitle,
  canEditJobs,
  additionalFilters,
}: JobSearchProps) => {
  const authHeader = useAuthHeader();

  const [jobs, setJobs] = useState<IJobPayload[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJobPayload | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = async () => {
    try {
      const jobs = await getAllJobs(authHeader, { ...additionalFilters });
      setJobs(jobs);
    } catch {
      toast.error('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleViewJob = (job: IJobPayload) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">{pageTitle}</h1>
        <div className="search-page-subtitle">{pageSubtitle}</div>
        <div className="header-actions">
          {canEditJobs && (
            <button className="post-job-btn" onClick={() => setShowModal(true)}>
              + Post New Job
            </button>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search by titles, departments, job codes, or hiring managers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">{jobs.length} results</div>
      </div>

      {/* Job Cards */}
      <div className="search-page-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onView={handleViewJob} canEdit={canEditJobs} />
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="empty-state">
          <p>No results found.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && <JobModal job={selectedJob} onClose={() => setShowModal(false)} />}
    </div>
  );
};
