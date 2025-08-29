import { FC, useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getJobById, IJobPayload } from '../../../api/job';
import { IUserData } from '../../../auth/store';
import { Overview } from './Overview';
import { Requirements } from './Requirements';
import { createApplication } from '../../../api/application';
import { JobModal } from '../JobModal';

export const JobPage: FC = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<IJobPayload>();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const fetchJob = async () => {
    try {
      const jobData = await getJobById(id as string, authHeader);
      setJob(jobData);
    } catch {
      toast.error('Failed to fetch job');
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchJob();
  }, [id]);

  const applyToJob = async () => {
    if (!job) return;
    try {
      await createApplication(authHeader, { jobId: job.id });
      toast.success('Successfully applied to job');
    } catch {
      toast.error('Failed to apply to job');
    }
  };

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    fetchJob();
  };

  const canEdit = Boolean(
    user?.companyRefId && job?.company?.id && user.companyRefId === job.company.id
  );

  const TABS = [
    {
      key: 'overview',
      label: 'Overview',
      component: (job: IJobPayload) => (
        <Overview job={job}  />
      ),
    },
    {
      key: 'requirements',
      label: 'Requirements',
      component: (job: IJobPayload) => <Requirements job={job} />,
    },
    {
      key: 'applications',
      label: 'Applications',
      component: () => (
        <div className="p-8 text-center text-gray-500">Applications tab coming soon</div>
      ),
    },
    {
      key: 'performance',
      label: 'Performance',
      component: () => (
        <div className="p-8 text-center text-gray-500">Performance tab coming soon</div>
      ),
    },
  ];

  const currentTab = TABS.find((tab) => tab.key === activeTab);

  if (!job) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-6 text-center">
        <p>Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      {isEditModalOpen && job && (
        <JobModal job={job} onClose={() => setEditModalOpen(false)} onSuccess={handleEditSuccess} />
      )}

      <div className="border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 mt-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === tab.key
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Top-right actions */}
          <div className="flex items-center gap-2">
            {canEdit ? (
              <button
                onClick={() => setEditModalOpen(true)}
                className="btn btn-primary btn-sm"
              >
                Edit Job
              </button>
            ) : (
              <button
                onClick={applyToJob}
                className="btn btn-primary btn-sm"
                disabled={!job}
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="m-4 min-h-[400px]">{currentTab?.component(job)}</div>
    </div>
  );
};
