import React from 'react';
import { IJobPayload, JobStatus } from '../../../api/job';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardActions,
  FormattedCardBody,
  CardButton,
} from '../../../components/Card';

export interface JobCardProps {
  job: IJobPayload;
  onView: (job: IJobPayload) => void;
  canEdit?: boolean;
  canApply?: boolean;
  onApply?: (job: IJobPayload) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, canEdit, canApply, onApply }) => {
  if (job.status !== JobStatus.Open && !canEdit) {
    return null;
  }

  const statusText = (job.status ?? JobStatus.Open)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const rows = [];

  if (job.salary) {
    rows.push({
      label: 'Salary:',
      value: (
        <span
          style={{
            fontWeight: 700,
            color: '#059669',
            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #a7f3d0',
          }}
        >
          ${job.salary.toLocaleString()}
        </span>
      ),
    });
  }

  if (job.type) {
    rows.push({ label: 'Type:', value: job.type });
  }

  if (job.location) {
    rows.push({ label: 'Location:', value: job.location });
  }

  if (job.experience) {
    rows.push({ label: 'Experience:', value: job.experience });
  }

  if (job.createdDate) {
    rows.push({
      label: 'Posted:',
      value: new Date(job.createdDate).toLocaleDateString(),
    });
  }

  if (job.industry) {
    rows.push({ label: 'Industry:', value: job.industry });
  }

  if (job.applicationDeadline) {
    rows.push({
      label: 'Apply by:',
      value: new Date(job.applicationDeadline).toLocaleDateString(),
    });
  }

  return (
    <Card variant="orange">
      <CardHeader>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            width: '100%',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#111827',
                margin: '0 0 0.625rem 0',
                lineHeight: 1.3,
                letterSpacing: '-0.025em',
              }}
            >
              {job.position || 'Associate'}
            </div>
          </div>
          {job.status && (
            <span
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                flexShrink: 0,
                background:
                  job.status === JobStatus.Open
                    ? '#d1fae5'
                    : job.status === JobStatus.Closed
                      ? '#fee2e2'
                      : '#fef3c7',
                color:
                  job.status === JobStatus.Open
                    ? '#065f46'
                    : job.status === JobStatus.Closed
                      ? '#991b1b'
                      : '#92400e',
              }}
              aria-label={`Job status: ${statusText}`}
            >
              {statusText}
            </span>
          )}
        </div>
      </CardHeader>
      <FormattedCardBody rows={rows} />
      <CardActions>
        {canEdit && (
          <CardButton variant="primary" onClick={() => onView(job)}>
            Edit Job
          </CardButton>
        )}
        {!canEdit && (
          <CardButton variant="primary" disabled={!canApply} onClick={() => onApply?.(job)}>
            Apply
          </CardButton>
        )}
        <CardButton variant="secondary">
          <NavLink to={`/job/${job.id}`}>View Job</NavLink>
        </CardButton>
      </CardActions>
    </Card>
  );
};
