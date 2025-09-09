import React from 'react';
import './JobPostingsDashboard.css';
import { IJobPayload, JobStatus } from '../../../api/job';
import { NavLink } from 'react-router-dom';

export interface JobCardProps {
  job: IJobPayload;
  onView: (job: IJobPayload) => void;
  canEdit?: boolean;
  canApply?: boolean;
  onApply?: (job: IJobPayload) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, canEdit, canApply, onApply }) => {
  // Hide any card that is not explicitly open
  if (job.status !== JobStatus.Open && !canEdit) return null;

  const statusText = (job.status ?? JobStatus.Open)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const showAppliedBadge = Boolean(!canEdit && !canApply);

  return (
    <div className="job-card">
      <div className="job-content">
        <div className="job-header">
          <div className="job-title-section">
            <h3 className="job-title">{job.position || 'Associate'}</h3>
            <div className="job-tags">
              <span className="job-type-tag">{job.type || 'full-time'}</span>
              <span className="job-location-tag">{job.location || 'Chicago'}</span>
              <span className="job-experience-tag">{job.experience || 'Entry Level'}</span>
            </div>
          </div>

          {/* Status pill */}
          {job.status && (
            <span
              className={`job-status-pill job-status-${job.status.toString().toLowerCase()}`}
              aria-label={`Job status: ${statusText}`}
            >
              {statusText}
            </span>
          )}
        </div>

        <div className="job-details">
          <div className="job-info">
            {job.salary && <div className="salary-info">${job.salary.toLocaleString()}</div>}
            <div className="job-meta-info">
              {job.createdDate && (
                <div>Posted {new Date(job.createdDate).toLocaleDateString()}</div>
              )}
              {job.industry && <div>{job.industry}</div>}
              {job.applicationDeadline && (
                <div>Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions: centered, same size, same row */}
      <div className="job-card-actions">
        {canEdit && (
          <button className="action-btn primary job-card-action" onClick={() => onView(job)}>
            Edit Job
          </button>
        )}
        {showAppliedBadge && (
          <span className="applied-badge job-card-action" aria-label="You have applied to this job" aria-disabled="true">
            Applied
          </span>
        )}
        {canApply && (
          <button className="action-btn primary job-card-action" onClick={() => onApply?.(job)}>
            Apply
          </button>
        )}
        <NavLink className="action-btn secondary job-card-action" to={`/job/${job.id}`}>
          View Full Job Details
        </NavLink>
      </div>
    </div>
  );
};
