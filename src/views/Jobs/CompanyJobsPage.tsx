import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { JobModal } from './JobModal';
import { getAllJobs, IJobPayload } from '../../api/job';
import { JobPostingsDashboard } from './JobPostingsDashboard';

export const CompanyJobsPage = () => {
  const authHeader = useAuthHeader();

  const [jobs, setJobs] = useState<IJobPayload[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJobPayload | null>(null);

  const fetchJobs = async () => {
    try {
      const jobs = await getAllJobs(authHeader, { type: 'job' });
      setJobs(jobs);
    } catch {
      toast.error('Failed to fetch company');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <JobPostingsDashboard
        jobs={jobs}
        onView={(job: IJobPayload) => {
          setSelectedJob(job);
          setShowModal(true);
        }}
        onCreate={() => {
          setSelectedJob(null);
          setShowModal(true);
        }}
      />

      {/* Modal */}
      {showModal && <JobModal job={selectedJob} onClose={() => setShowModal(false)} />}
    </div>
  );
};
