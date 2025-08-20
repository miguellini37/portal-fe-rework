import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { getAllJobs, IJobPayload } from '../../api/job';
import { JobsTable } from './JobsTable';
import { JobModal } from './JobModal';

export const JobSearchPage = () => {
  const authHeader = useAuthHeader();
  const { id } = useParams<{ id: string }>();

  const [jobs, setJobs] = useState<IJobPayload[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJobPayload | null>(null);

  const fetchJobs = async () => {
    try {
      const jobs = await getAllJobs(authHeader, { type: ['full-time', 'part-time'] });
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
      <h2 className="text-4xl font-bold mb-2">{'Job Search'}</h2>

      {/* Jobs Table using reusable component */}
      <div className="mt-8">
        <JobsTable
          jobs={jobs}
          onView={(job: IJobPayload) => {
            setSelectedJob(job);
            setShowModal(true);
          }}
          fullTable
        />
      </div>

      {/* Modal */}
      {showModal && (
        <JobModal job={selectedJob} onClose={() => setShowModal(false)} companyId={id} />
      )}
    </div>
  );
};
