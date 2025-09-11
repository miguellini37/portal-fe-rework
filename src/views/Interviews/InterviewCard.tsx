import { FC, useMemo } from 'react';
import '../Companies/company.css';
import '../Applications/applications.css';
import { IInterviewPayload, InterviewStatus } from '../../api/interview';

interface Props {
  interview: IInterviewPayload;
}

export const InterviewCard: FC<Props> = ({ interview }) => {
  const dateLabel = useMemo(() => {
    if (!interview?.dateTime) {
      return 'TBD';
    }
    try {
      const d = new Date(interview.dateTime);
      return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid date';
    }
  }, [interview?.dateTime]);

  const status = interview?.status ?? InterviewStatus.Scheduled;

  return (
    <div className="company-card" tabIndex={0} aria-label="Interview card">
      <div className="company-card-layout">
        <div className="company-content">
          <div className="company-header">
            <div className="company-title-section">
              <h3 className="company-title">{interview.job?.position}</h3>
              <div className="company-industry">{interview?.company?.companyName}</div>
              <div className="company-industry">{interview?.location || 'Location TBD'}</div>
            </div>
          </div>

          <div className="company-details">
            <div className="application-info">
              <div className="info-row">
                <span className="info-label">Date & Time:</span>
                <span className="info-value">{dateLabel}</span>
              </div>
              {interview?.interviewer && (
                <div className="info-row">
                  <span className="info-label">Interviewer:</span>
                  <span className="info-value">{interview.interviewer}</span>
                </div>
              )}
              {interview?.status && (
                <div className="info-row">
                  <span className="info-label">Status:</span>
                  <span className="info-value" style={{ textTransform: 'capitalize' }}>
                    {String(status).replace(/_/g, ' ')}
                  </span>
                </div>
              )}
              {interview?.preparationTips && (
                <div className="info-row">
                  <span className="info-label">Preparation:</span>
                  <span className="info-value">{interview.preparationTips}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
