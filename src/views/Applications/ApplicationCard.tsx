import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IApplicationPayload, ApplicationStatus } from '../../api/application';
import '../Companies/company.css';
import './applications.css';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData, USER_PERMISSIONS } from '../../auth/store';
import { getFullName } from '../../util/name';
import { toast } from 'react-toastify';

interface Props {
  application: IApplicationPayload;
  onUpdateStatus?: (
    applicationId?: string,
    status?: ApplicationStatus
  ) => IApplicationPayload | Promise<IApplicationPayload>;
}

export const ApplicationCard: FC<Props> = ({ application, onUpdateStatus }) => {
  const navigate = useNavigate();
  const user = useAuthUser<IUserData>();
  const isCompanyPermission = user?.permission === USER_PERMISSIONS.COMPANY;
  const isAthletePermission = user?.permission === USER_PERMISSIONS.ATHLETE;

  const [loading, setLoading] = useState(false);
  const [currentApp, setCurrentApp] = useState<IApplicationPayload>(application);

  useEffect(() => {
    setCurrentApp(application);
  }, [application]);

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return 'N/A';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status: string | undefined): string => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return '#6b7280';
      case 'under_review':
        return '#3b82f6';
      case 'interview_requested':
        return '#6d28d9';
      case 'accepted':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Unified helper for status updates (Reject / Accept / Request Interview / Withdraw)
  const handleUpdate = useCallback(
    async (status: string) => {
      if (!currentApp?.id) return;
      setLoading(true);
      try {
        let result: IApplicationPayload | undefined;

        if (onUpdateStatus) {
          result = await onUpdateStatus(currentApp.id, status as unknown as ApplicationStatus);
        }

        if (result) {
          setCurrentApp(result);
        } else {
          // If parent didn't return payload, optimistically update status
          setCurrentApp(prev => ({ ...(prev ?? {}), status: status as unknown as any }));
        }
      } catch {
        toast.error('Failed to update application');
      } finally {
        setLoading(false);
      }
    },
    [currentApp?.id, onUpdateStatus]
  );

  const statusStr = String(currentApp?.status ?? 'applied').toLowerCase();
  const statusColor = getStatusColor(statusStr);

  const openJob = useCallback(() => {
    const jobId = currentApp?.job?.id;
    if (!jobId) return;
    // navigate to JobPage route and include application id in location state (optional)
    navigate(`/job/${jobId}`, { state: { applicationId: currentApp?.id } });
  }, [currentApp?.job?.id, currentApp?.id, navigate]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openJob();
    }
  };

  return (
    <div
      className="company-card clickable-card"
      role="button"
      tabIndex={0}
      onClick={openJob}
      onKeyDown={onKeyDown}
      aria-label={`Open job ${currentApp?.job?.position ?? 'job'}`}
    >
      <div className="company-card-layout">
        <div className="company-content">
          <div className="company-header">
            <div className="company-title-section">
              <h3 className="company-title">
                {currentApp?.job?.position || 'Position not specified'}
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
                <span className="info-value">
                  {formatDate(
                    (currentApp as IApplicationPayload & { creationDate?: string }).creationDate ??
                      currentApp?.createdDate
                  )}
                </span>
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
                    aria-label={`Status: ${statusStr}`}
                  >
                    {statusStr.replace(/_/g, ' ')}
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
                <button
                  type="button"
                  className="action-btn primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdate('accepted');
                  }}
                  disabled={loading}
                  aria-label="Accept application"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="action-btn secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdate('interview_requested');
                  }}
                  disabled={loading}
                  aria-label="Request interview"
                >
                  Request Interview
                </button>
                <button
                  type="button"
                  className="action-btn danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdate('rejected');
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
                {['applied', 'under_review', 'interview_requested'].includes(statusStr) ? (
                  <button
                    type="button"
                    className="action-btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate('withdrawn');
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
    </div>
  );
};
