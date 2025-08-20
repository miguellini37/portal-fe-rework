import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { getAllJobs, IJobPayload } from '../../../api/job';
import { JobModal } from '../JobModal';
import { JobCard } from './JobCard';
import './JobPostingsDashboard.css';
import '../../../styles/searchPage.css';

interface CompanyJobsPageProps {
  onView?: (job: IJobPayload) => void;
  onEdit?: (job: IJobPayload) => void;
  onCreate?: () => void;
  companyName?: string;
}

export const CompanyJobsPage = ({ onView, onEdit, onCreate }: CompanyJobsPageProps) => {
  const authHeader = useAuthHeader();

  const [jobs, setJobs] = useState<IJobPayload[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJobPayload | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = async () => {
    try {
      const jobs = await getAllJobs(authHeader, { type: 'job' });
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
    if (onView) onView(job);
  };

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">Company Job Postings</h1>
        <div className="search-page-subtitle">
          Manage open positions and track student-athlete applications
        </div>
        <div className="header-actions">
          <button className="post-job-btn" onClick={() => setShowModal(true)}>
            + Post New Job
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search job titles, departments, job codes, or hiring managers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">{jobs.length} results</div>
      </div>

      {/* Job Cards */}
      <div className="search-page-grid">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onView={handleViewJob} onEdit={onEdit} />
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="empty-state">
          <p>No job postings found.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && <JobModal job={selectedJob} onClose={() => setShowModal(false)} />}
    </div>
  );
};
