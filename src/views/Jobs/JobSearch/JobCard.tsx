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
import { useAuthUser, USER_PERMISSIONS, useIsStudentNotVerified } from '../../../auth/hooks';
import { ExternalLink } from 'lucide-react';

export interface JobCardProps {
  job: IJobPayload;
  onView: (job: IJobPayload) => void;
  canEdit?: boolean;
  canApply?: boolean;
  onApply?: (job: IJobPayload) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, canEdit, canApply, onApply }) => {
  const user = useAuthUser();
  const isStudentNotVerified = useIsStudentNotVerified();

  if (job.status !== JobStatus.Open && !canEdit) {
    return null;
  }

  const statusText = (job.status ?? JobStatus.Open)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const rows = [
    {
      label: 'Salary:',
      value: job.salary ? (
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
      ) : (
        '-'
      ),
    },
    { label: 'Type:', value: job.type || '-' },
    { label: 'Location:', value: job.location || '-' },
    { label: 'Experience:', value: job.experience || '-' },
    {
      label: 'Posted:',
      value: job.createdDate ? new Date(job.createdDate).toLocaleDateString() : '-',
    },
    { label: 'Industry:', value: job.industry || '-' },
    {
      label: 'Apply by:',
      value: job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : '-',
    },
  ];

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
                margin: '0 0 0.25rem 0',
                lineHeight: 1.3,
                letterSpacing: '-0.025em',
              }}
            >
              {job.position || 'Associate'}{' '}
              <a
                href={`/job/${job.id}`}
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
            {job.company?.companyName && (
              <NavLink
                to={`/company/${job.company.id}`}
                style={{
                  fontSize: '1rem',
                  fontWeight: 550,
                  color: '#2563eb',
                  textDecoration: 'none',
                  display: 'block',
                  marginTop: '0.25rem',
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
                {job.company.companyName}
              </NavLink>
            )}
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
        {!canEdit && user?.permission == USER_PERMISSIONS.ATHLETE && (
          <>
            {job.hasApplied ? (
              <CardButton variant="primary" disabled>
                Applied
              </CardButton>
            ) : isStudentNotVerified ? (
              <CardButton variant="primary" disabled title="User is Not Validated">
                Apply
              </CardButton>
            ) : (
              <CardButton variant="primary" disabled={!canApply} onClick={() => onApply?.(job)}>
                Apply
              </CardButton>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};
