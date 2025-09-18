import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IApplicationPayload, ApplicationStatus } from '../../api/application';
import '../Companies/company.css';
import './applications.css';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData, USER_PERMISSIONS } from '../../auth/store';
import { getFullName, toTitleCase } from '../../util/name';
import { toast } from 'react-toastify';
import { InterviewModal } from '../Interviews/InterviewModal';

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
  const user = useAuthUser<IUserData>();
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
      return 'N/A';
    }
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return 'Invalid Date';
    }
  };

  const showInterviewButton =
    currentApp?.status === ApplicationStatus.UnderReview ||
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

  // Unified helper for status updates (Reject / Accept / Request Interview / Withdraw)
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
          // optimistic update
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
  return (
    <div
      className="company-card"
      tabIndex={0}
      aria-label={`Open job ${currentApp?.job?.position ?? 'job'}`}
    >
      <div className="company-card-layout">
        <div className="company-content">
          <div className="company-header">
            <div className="company-title-section">
              <h3 className="company-title">
                {showJobPosition && (
                  <Link to={`/job/${currentApp.job?.id}`} className="company-link">
                    {currentApp.job?.position}
                  </Link>
                )}
              </h3>
              {!isCompanyPermission && (
                <div className="company-industry">
                  {currentApp?.job?.company?.companyName || 'Company not specified'}
                </div>
              )}
            </div>
          </div>

          <div className="company-details">
            <div className="application-info">
              <div className="info-row">
                <span className="info-label">Applied Date:</span>
                <span className="info-value">{formatDate(currentApp?.creationDate)}</span>
              </div>

              <div className="info-row" style={{ alignItems: 'center', gap: 8 }}>
                <span className="info-label">Status:</span>
                <span
                  className="info-value"
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <span
                    className="status-pill"
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
                </span>
              </div>

              {isCompanyPermission && (
                <div className="info-row">
                  <span className="info-label">Applicant:</span>
                  <span className="info-value">
                    {`${getFullName(currentApp?.athlete ?? {}) || 'Name not specified'}`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="company-card-actions" style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            {isCompanyPermission && (
              <>
                {
                  <button
                    type="button"
                    className="action-btn primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(ApplicationStatus.Accepted);
                    }}
                    disabled={loading}
                    aria-label="Accept application"
                  >
                    Accept
                  </button>
                }
                {showInterviewButton && (
                  <button
                    type="button"
                    className="action-btn secondary"
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
                  </button>
                )}
                {!showInterviewButton && (
                  <button
                    type="button"
                    className="action-btn secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(ApplicationStatus.UnderReview);
                    }}
                    disabled={loading}
                    aria-label="Under review"
                  >
                    Under Review
                  </button>
                )}

                <button
                  type="button"
                  className="action-btn danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdate(ApplicationStatus.Rejected);
                  }}
                  disabled={loading}
                  aria-label="Reject application"
                >
                  Reject
                </button>
              </>
            )}

            {isAthletePermission && (
              <>
                {[
                  ApplicationStatus.Applied,
                  ApplicationStatus.UnderReview,
                  ApplicationStatus.InterviewRequested,
                ].includes(currentApp?.status ?? ApplicationStatus.Applied) ? (
                  <button
                    type="button"
                    className="action-btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(ApplicationStatus.Withdrawn);
                    }}
                    disabled={loading}
                    aria-label="Withdraw application"
                  >
                    Withdraw
                  </button>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
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
    </div>
  );
};
