import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getJobById, IJobPayload } from '../../../api/job';
import { Overview } from './Overview';
import { Requirements } from './Requirements';

export const JobPage = () => {
  const authHeader = useAuthHeader();
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<IJobPayload>();
  const [activeTab, setActiveTab] = useState('overview');

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

  const TABS = [
    {
      key: 'overview',
      label: 'Overview',
      component: (job: IJobPayload) => <Overview job={job} />,
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
      <div className="w-full max-w-6xl mx-auto mt-6 p-8 text-center">
        <div className="text-gray-500">Loading job details...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 relative">
      {/* Tabs + Edit/Save Button */}
      <div className="relative border-b border-gray-300 pb-0 mb-0">
        {/* {canEditPage && <EditSaveButton />} */}
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
