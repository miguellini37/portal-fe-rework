import { FC, useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getJobById, IJobPayload } from '../../../api/job';
import { IUserData } from '../../../auth/store';
import { Overview } from './Overview';
import { Requirements } from './Requirements';
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

  const handleSuccess = () => {
    setEditModalOpen(false);
    fetchJob();
  };

  const canEdit = user?.companyRefId && job?.company?.id && user.companyRefId === job.company.id;

  const TABS = [
    {
      key: 'overview',
      label: 'Overview',
      component: (job: IJobPayload) => <Overview job={job} onJobUpdate={fetchJob} />,
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

  const EditButton: FC = () => (
    <div className="absolute top-0 right-0 z-10">
      <button onClick={() => setEditModalOpen(true)} className="btn btn-primary">
        Edit Job
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 relative">
      {isEditModalOpen && (
        <JobModal job={job} onClose={() => setEditModalOpen(false)} onSuccess={handleSuccess} />
      )}
      {/* Tabs + Edit/Save Button */}
      <div className="relative border-b border-gray-300 pb-0 mb-0">
        {canEdit && <EditButton />}
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
      </div>

      {/* Tab Content */}
      <div className="m-4 min-h-[400px] relative">{currentTab?.component(job)}</div>
    </div>
  );
};
