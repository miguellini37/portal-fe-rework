import React from 'react';
import './JobPostingsDashboard.css';
import { IJobPayload, JobStatus } from '../../../api/job';
import { NavLink } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export interface NILCardProps {
  nil: IJobPayload;
  onView: (nil: IJobPayload) => void;
  canEdit?: boolean;
  canApply?: boolean;
  onApply?: (nil: IJobPayload) => void;
}

export const NILCard: React.FC<NILCardProps> = ({ nil, onView, canEdit, canApply, onApply }) => {
  // Hide any card that is not explicitly open
  if (nil.status !== JobStatus.Open && !canEdit) {
    return null;
  }

  const statusText = (nil.status ?? JobStatus.Open)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const showAppliedBadge = Boolean(!canEdit && !canApply);

  // Check if compensation is over $600 for warning
  const showWarning = nil.salary && nil.salary > 600;

  return (
    <div className="job-card">
      <div className="job-content">
        <div className="job-header">
          <div className="job-title-section">
            <h3 className="job-title">{nil.position || 'NIL Opportunity'}</h3>
            <div className="job-tags">
              <span className="job-type-tag nil-tag">NIL</span>
              <span className="job-location-tag">{nil.location || 'Remote'}</span>
              <span className="job-experience-tag">{nil.experience || 'Opportunity Type'}</span>
            </div>
          </div>

          {/* Status pill */}
          {nil.status && (
            <span
              className={`job-status-pill job-status-${nil.status.toString().toLowerCase()}`}
              aria-label={`NIL status: ${statusText}`}
            >
              {statusText}
            </span>
          )}
        </div>

        <div className="job-details">
          <div className="job-info">
            {nil.salary && (
              <div className="salary-info">
                ${nil.salary.toLocaleString()}
                {showWarning && (
                  <span
                    className="compensation-warning"
                    title="Warning: anything over $600 has to be reported to NIL GO"
                    style={{ marginLeft: '8px', color: '#f59e0b' }}
                  >
                    <AlertTriangle size={16} />
                  </span>
                )}
              </div>
            )}
            <div className="job-meta-info">
              {nil.createdDate && (
                <div>Posted {new Date(nil.createdDate).toLocaleDateString()}</div>
              )}
              {nil.industry && <div>{nil.industry}</div>}
              {nil.applicationDeadline && (
                <div>Apply by {new Date(nil.applicationDeadline).toLocaleDateString()}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions: centered, same size, same row */}
      <div className="job-card-actions">
        {canEdit && (
          <button className="action-btn primary job-card-action" onClick={() => onView(nil)}>
            Edit NIL Opportunity
          </button>
        )}
        {showAppliedBadge && (
          <span
            className="applied-badge job-card-action"
            aria-label="You have applied to this NIL opportunity"
            aria-disabled="true"
          >
            Applied
          </span>
        )}
        {canApply && (
          <button className="action-btn primary job-card-action" onClick={() => onApply?.(nil)}>
            Apply
          </button>
        )}
        <NavLink className="action-btn secondary job-card-action" to={`/job/${nil.id}`}>
          View Full NIL Details
        </NavLink>
      </div>
    </div>
  );
};
