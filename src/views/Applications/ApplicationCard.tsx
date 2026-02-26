import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IApplicationPayload, ApplicationStatus } from '../../api/application';
import {
  Card,
  CardHeader,
  CardActions,
  FormattedCardBody,
  FormattedCardRow,
  CardButton,
} from '../../components/Card';
import { useAuthUser } from '../../auth/hooks';
import { USER_PERMISSIONS } from '../../auth/hooks';
import { getFullName, toTitleCase } from '../../util/name';
import { toast } from 'react-toastify';
import { InterviewModal } from '../Interviews/InterviewModal';
import { ExternalLink } from 'lucide-react';

interface Props {
  application: IApplicationPayload;
  onUpdateStatus?: (
    applicationId?: string,
    status?: ApplicationStatus
  ) => IApplicationPayload | Promise<IApplicationPayload>;
  showJobPosition?: boolean;
}

export const ApplicationCard: FC<Props> = ({
  application,
  onUpdateStatus,
  showJobPosition = true,
}) => {
  const user = useAuthUser();
  const isCompanyPermission = user?.permission === USER_PERMISSIONS.COMPANY;
  const isAthletePermission = user?.permission === USER_PERMISSIONS.ATHLETE;

  const [loading, setLoading] = useState(false);
  const [currentApp, setCurrentApp] = useState<IApplicationPayload>(application);
  const [interviewModalState, setInterviewModalState] = useState<{
    isOpen: boolean;
    interviewId?: string;
    applicationId?: string;
  }>();

  const myAppStatus = String(currentApp?.status ?? ApplicationStatus.Applied).toLowerCase();
  const statusText = toTitleCase(myAppStatus);

  useEffect(() => {
    setCurrentApp(application);
  }, [application]);

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) {
      return '-';
    }
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return 'Invalid Date';
    }
  };

  const showInterviewButton =
    currentApp?.status === ApplicationStatus.Applied ||
    currentApp?.status === ApplicationStatus.InterviewRequested;

  const getStatusColor = (status: ApplicationStatus | undefined): string => {
    switch (status) {
      case ApplicationStatus.Applied:
        return '#6b7280';
      case ApplicationStatus.UnderReview:
        return '#3b82f6';
      case ApplicationStatus.InterviewRequested:
        return '#6d28d9';
      case ApplicationStatus.Accepted:
        return '#10b981';
      case ApplicationStatus.Rejected:
        return '#ef4444';
      case ApplicationStatus.Withdrawn:
        return '#f97316';
      default:
        return '#6b7280';
    }
  };

  const handleUpdate = useCallback(
    async (status: ApplicationStatus) => {
      if (!currentApp?.id) {
        return;
      }
      setLoading(true);
      try {
        let result: IApplicationPayload | undefined;

        if (onUpdateStatus) {
          result = await onUpdateStatus(currentApp.id, status);
        }

        if (result) {
          setCurrentApp(result);
        } else {
          setCurrentApp((prev) => (prev ? { ...prev, status } : prev));
        }
      } catch {
        toast.error('Failed to update application');
      } finally {
        setLoading(false);
      }
    },
    [currentApp?.id, onUpdateStatus]
  );

  const statusColor = getStatusColor(currentApp?.status ?? ApplicationStatus.Applied);

  // Build the rows for FormattedCardBody
  const rows: FormattedCardRow[] = [
    {
      label: 'Applied Date:',
      value: formatDate(currentApp?.creationDate),
    },
    {
      label: 'Status:',
      value: (
        <span
          style={{
            backgroundColor: statusColor,
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 999,
            fontSize: 12,
            textTransform: 'capitalize',
            display: 'inline-block',
          }}
          aria-label={`Status: ${statusText}`}
        >
          {statusText}
        </span>
      ),
    },
  ];

  if (isCompanyPermission) {
    rows.push({
      label: 'Applicant:',
      value: `${getFullName(currentApp?.athlete ?? {}) || 'Name not specified'}`,
    });
  }

  return (
    <>
      <Card variant="blue" ariaLabel={`Open job ${currentApp?.job?.position ?? 'job'}`}>
        <CardHeader>
          <div style={{ marginBottom: '0.75rem' }}>
            {showJobPosition && currentApp.job?.position && (
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#111827',
                  margin: '0 0 0.25rem 0',
                  lineHeight: 1.3,
                  letterSpacing: '-0.025em',
                }}
              >
                <Link
                  to={`/job/${currentApp.job?.id}`}
                  style={{
                    color: '#111827',
                    textDecoration: 'none',
                  }}
                >
                  {currentApp.job.position}
                </Link>{' '}
                <a
                  href={`/job/${currentApp.job?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    verticalAlign: 'middle',
                  }}
                  aria-label="View job details in new tab"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
            {!isCompanyPermission && currentApp?.job?.company?.companyName && (
              <NavLink
                to={`/company/${currentApp.job.company.id}`}
                style={{
                  fontSize: '1rem',
                  fontWeight: 550,
                  color: '#2563eb',
                  textDecoration: 'none',
                  display: 'block',
                  lineHeight: 1.3,
                  letterSpacing: '-0.025em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                {currentApp.job.company.companyName}
              </NavLink>
            )}
          </div>
        </CardHeader>
        <FormattedCardBody rows={rows} />
        <CardActions>
          {isCompanyPermission && (
            <>
              <CardButton
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdate(ApplicationStatus.Accepted);
                }}
                disabled={loading}
                aria-label="Accept application"
              >
                Accept
              </CardButton>
              {showInterviewButton && (
                <CardButton
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInterviewModalState({
                      isOpen: true,
                      applicationId: currentApp.id,
                      interviewId: currentApp.interview?.id,
                    });
                  }}
                  disabled={loading}
                  aria-label="Setup interview"
                >
                  {`${currentApp?.interview?.id ? 'Edit' : 'Schedule'} Interview`}
                </CardButton>
              )}
              <CardButton
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdate(ApplicationStatus.Rejected);
                }}
                disabled={loading}
                aria-label="Reject application"
              >
                Reject
              </CardButton>
            </>
          )}

          {isAthletePermission && (
            <>
              {[
                ApplicationStatus.Applied,
                ApplicationStatus.UnderReview,
                ApplicationStatus.InterviewRequested,
              ].includes(currentApp?.status ?? ApplicationStatus.Applied) ? (
                <CardButton
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdate(ApplicationStatus.Withdrawn);
                  }}
                  disabled={loading}
                  aria-label="Withdraw application"
                >
                  Withdraw
                </CardButton>
              ) : null}
            </>
          )}
        </CardActions>
      </Card>
      {interviewModalState && currentApp?.id ? (
        <InterviewModal
          isOpen={interviewModalState.isOpen}
          applicationId={application.id as string}
          interviewId={interviewModalState.interviewId}
          onClose={() =>
            setInterviewModalState({
              isOpen: false,
              applicationId: undefined,
              interviewId: undefined,
            })
          }
        />
      ) : null}
    </>
  );
};
