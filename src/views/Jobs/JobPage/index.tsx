import './job.css';
import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { getJobById, IJobPayload, updateJob, JobStatus } from '../../../api/job';
import {
  createApplication,
  updateApplicationStatus,
  ApplicationStatus,
  IApplicationRequest,
  getApplications,
  IApplicationPayload,
} from '../../../api/application';
import { IUserData, USER_PERMISSIONS } from '../../../auth/store';

import { Overview } from './Overview';
import { Requirements } from './Requirements';
import { JobModal } from '../JobModal';
import { Application } from './Applications';
import { toTitleCase } from '../../../util/name';

type TabKey = 'overview' | 'requirements' | 'applications' | 'performance';

export const JobPage: FC = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<IJobPayload>();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [myApplication, setMyApplication] = useState<IApplicationPayload>();
  const [withdrawing, setWithdrawing] = useState(false);

  // Job status dropdown state for company users who can edit
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const isCompany = user?.permission === USER_PERMISSIONS.COMPANY;
  const canEdit = Boolean(
    isCompany && user?.companyRefId && job?.company?.id && user.companyRefId === job.company.id
  );
  const canApply =
    user?.permission === USER_PERMISSIONS.ATHLETE &&
    job?.status === JobStatus.Open &&
    !job.hasApplied;
  const canViewApplications = Boolean(isCompany && canEdit);

  const canWithdraw =
    Boolean(myApplication) &&
    [
      ApplicationStatus.Applied,
      ApplicationStatus.UnderReview,
      ApplicationStatus.InterviewRequested,
    ].includes(myApplication?.status ?? ApplicationStatus.Applied);

  const fetchJob = useCallback(async () => {
    if (!id) {
      return;
    }
    try {
      const jobData = await getJobById(id, authHeader);
      setJob(jobData);
    } catch {
      toast.error('Failed to fetch job');
    }
  }, [id, authHeader]);

  const fetchMyApplication = useCallback(async () => {
    if (!authHeader || !job?.id || isCompany) {
      return;
    }
    try {
      const apps = await getApplications(authHeader, job.id);
      if (apps?.length) {
        setMyApplication(apps[0]);
      } else {
        setMyApplication(undefined);
      }
    } catch {
      /* silent */
    }
  }, [authHeader, job?.id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  useEffect(() => {
    fetchMyApplication();
  }, [fetchMyApplication]);

  useEffect(() => {
    if (!canViewApplications && activeTab === 'applications') {
      setActiveTab('overview');
    }
  }, [canViewApplications, activeTab]);

  const applyToJob = useCallback(async () => {
    if (!job?.id) {
      return;
    }
    try {
      await createApplication(authHeader, { jobId: job.id });
      toast.success('Successfully applied to job');
      await fetchMyApplication();
    } catch {
      toast.error('Failed to apply to job');
    }
  }, [authHeader, job?.id, fetchMyApplication]);

  const updateStatus = useCallback(
    async (applicationId?: string, status?: ApplicationStatus): Promise<IApplicationPayload> => {
      if (!applicationId) {
        toast.error('No application ID provided');
        return Promise.reject();
      }

      try {
        const req: IApplicationRequest = { id: applicationId, status };
        const result = await updateApplicationStatus(authHeader, req);
        toast.success('Application status updated');
        if (myApplication?.id === applicationId) {
          setMyApplication(result);
        }
        return result;
      } catch (e) {
        toast.error('Failed to update application status');
        return Promise.reject(e);
      }
    },
    [authHeader, myApplication?.id]
  );

  const withdrawApplication = useCallback(async () => {
    if (!authHeader || !myApplication?.id) {
      return;
    }
    setWithdrawing(true);

    const prev = myApplication;
    const withdrawn = 'withdrawn' as ApplicationStatus;
    setMyApplication({ ...prev, status: withdrawn });

    try {
      await updateApplicationStatus(authHeader, { id: prev.id!, status: withdrawn });
      toast.success('Application withdrawn');
      await fetchMyApplication();
    } catch {
      setMyApplication(prev);
      toast.error('Failed to withdraw application');
    } finally {
      setWithdrawing(false);
    }
  }, [authHeader, myApplication, fetchMyApplication]);

  const TABS = useMemo(
    () =>
      [
        {
          key: 'overview',
          label: 'Overview',
          render: (j: IJobPayload) => <Overview job={j} />,
        },
        {
          key: 'requirements',
          label: 'Requirements',
          render: (j: IJobPayload) => <Requirements job={j} />,
        },
        ...(canViewApplications
          ? [
              {
                key: 'applications',
                label: 'Applications',
                render: (j: IJobPayload) => (
                  <Application jobId={j?.id} onUpdateStatus={updateStatus} />
                ),
              } as const,
            ]
          : []),
        {
          key: 'performance',
          label: 'Performance',
          render: () => (
            <div className="p-8 text-center text-gray-500">Performance tab coming soon</div>
          ),
        },
      ] as const,
    [canViewApplications, updateStatus]
  );

  const currentTab = TABS.find((t) => t.key === activeTab) ?? TABS[0];

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    fetchJob();
  };

  const handleChangeJobStatus = useCallback(
    async (newStatus: JobStatus) => {
      if (!job?.id) {
        return;
      }
      setUpdatingStatus(true);
      setStatusMenuOpen(false);
      const prevJob = job;
      // optimistic update
      setJob({ ...job, status: newStatus });
      try {
        const newJob = { ...job, status: newStatus } as IJobPayload;
        await updateJob(newJob, authHeader);
        setJob(newJob);
        toast.success('Job status updated');
      } catch {
        setJob(prevJob);
        toast.error('Failed to update job status');
      } finally {
        setUpdatingStatus(false);
      }
    },
    [authHeader, job]
  );

  // derive current application status (lowercased for CSS class) and title-cased label for UI
  const myAppStatus = String(myApplication?.status ?? ApplicationStatus.Applied).toLowerCase();
  const myAppStatusLabel = toTitleCase(myAppStatus);

  const jobStatus = String(job?.status ?? JobStatus.Open).toLowerCase();
  const jobStatusLabel = toTitleCase(jobStatus);

  if (!job) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-6 text-center">
        <p>Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
      <div className="border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Always show job status */}
            <div className="relative">
              {canEdit ? (
                <button
                  type="button"
                  className={`job-status-pill job-status-${job?.status ?? JobStatus.Open}`}
                  onClick={() => setStatusMenuOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={statusMenuOpen}
                  disabled={updatingStatus}
                  title="Change job status"
                >
                  {jobStatusLabel ?? JobStatus.Open} <span aria-hidden="true">▾</span>
                </button>
              ) : (
                <span
                  className={`job-status-pill job-status-${job?.status ?? JobStatus.Open}`}
                  aria-label={`Job status: ${jobStatusLabel}`}
                >
                  {jobStatusLabel}
                </span>
              )}

              {canEdit && statusMenuOpen && (
                <ul role="menu" className="status-dropdown">
                  {Object.values(JobStatus).map((opt) => (
                    <li key={opt} role="none">
                      <button
                        role="menuitem"
                        type="button"
                        className={`status-dropdown-item ${job?.status === opt ? 'active' : ''}`}
                        onClick={() => handleChangeJobStatus(opt)}
                        disabled={updatingStatus}
                        aria-pressed={job?.status === opt}
                      >
                        {toTitleCase(String(opt))}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {canEdit ? (
              <button onClick={() => setEditModalOpen(true)} className="btn btn-primary btn-sm">
                Edit Job
              </button>
            ) : canApply ? (
              myApplication ? (
                <>
                  <span
                    className={`status-pill status-${myApplication.status?.toString().toLowerCase()}`}
                  >
                    {myAppStatusLabel}
                  </span>
                  {canWithdraw && (
                    <button
                      onClick={withdrawApplication}
                      className="btn btn-secondary btn-sm"
                      disabled={withdrawing}
                      aria-label="Withdraw application"
                    >
                      {withdrawing ? 'Withdrawing...' : 'Withdraw Application'}
                    </button>
                  )}
                </>
              ) : (
                <button onClick={applyToJob} className="btn btn-primary btn-sm">
                  Apply
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>

      <div className="m-4 min-h-[400px]">{currentTab.render(job)}</div>

      {isEditModalOpen && (
        <JobModal onClose={() => setEditModalOpen(false)} job={job} onSuccess={handleEditSuccess} />
      )}
    </div>
  );
};
