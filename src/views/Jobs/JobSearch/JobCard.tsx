import React from 'react';
import './JobPostingsDashboard.css';
import { IJobPayload } from '../../../api/job';

export interface JobCardProps {
  job: IJobPayload;
  onView: (job: IJobPayload) => void;
  canEdit?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, canEdit }) => {
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

      <div className="job-actions">
        {canEdit && (
          <button className="action-btn primary" onClick={() => onView(job)}>
            Edit Job
          </button>
        )}
        <button
          className="action-btn secondary"
          onClick={() => {
            /* Handle view applications */
          }}
        >
          View Full Job Details
        </button>
      </div>
    </div>
  );
};
