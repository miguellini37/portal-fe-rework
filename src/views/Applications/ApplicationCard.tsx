import React from 'react';
import { IApplicationPayload } from '../../api/application';
import '../Companies/company.css';
import './applications.css';

export interface ApplicationCardProps {
  application: IApplicationPayload;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '#f59e0b'; // amber
      case 'accepted':
        return '#10b981'; // green
      case 'rejected':
        return '#ef4444'; // red
      case 'reviewed':
        return '#3b82f6'; // blue
      default:
        return '#6b7280'; // gray
    }
  };

  return (
    <div className="company-card">
      <div className="company-card-layout">
        <div className="company-content">
          <div className="company-header">
            <div className="company-title-section">
              <h3 className="company-title">
                {application.job?.position || 'Position not specified'}
              </h3>
              <div className="company-industry">
                {application.job?.company?.companyName || 'Company not specified'}
              </div>
            </div>
          </div>

          <div className="company-details">
            <div className="application-info">
              <div className="info-row">
                <span className="info-label">Applied Date:</span>
                <span className="info-value">
                  {formatDate(new Date(application.createdDate ?? new Date()))}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span
                  className="info-value status-badge"
                  style={{
                    color: getStatusColor(application.status),
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {application.status || 'Pending'}
                </span>
              </div>
              {/* {application.athlete && (
                <div className="info-row">
                  <span className="info-label">Applicant:</span>
                  <span className="info-value">
                    {`${application.athlete.firstName || ''} ${
                      application.athlete.lastName || ''
                    }`.trim() || 'N/A'}
                  </span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
