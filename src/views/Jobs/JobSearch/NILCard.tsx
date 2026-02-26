import React from 'react';
import { IJobPayload, JobStatus } from '../../../api/job';
import { NavLink } from 'react-router-dom';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardActions,
  FormattedCardBody,
  CardButton,
} from '../../../components/Card';
import { useIsStudentNotVerified } from '../../../auth/hooks';

export interface NILCardProps {
  nil: IJobPayload;
  onView: (nil: IJobPayload) => void;
  canEdit?: boolean;
  canApply?: boolean;
  onApply?: (nil: IJobPayload) => void;
}

export const NILCard: React.FC<NILCardProps> = ({ nil, onView, canEdit, canApply, onApply }) => {
  const isStudentNotVerified = useIsStudentNotVerified();

  if (nil.status !== JobStatus.Open && !canEdit) {
    return null;
  }

  const statusText = (nil.status ?? JobStatus.Open)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const showAppliedBadge = Boolean(!canEdit && !canApply);
  const showWarning = nil.salary && nil.salary > 600;

  const rows = [
    {
      label: 'Compensation:',
      value: nil.salary ? (
        <span
          style={{
            fontWeight: 700,
            color: '#059669',
            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #a7f3d0',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          ${nil.salary.toLocaleString()}
          {showWarning && (
            <span title="NIL compensation over $600 requires reporting">
              <AlertTriangle size={16} color="#f59e0b" />
            </span>
          )}
        </span>
      ) : (
        '-'
      ),
    },
    { label: 'Location:', value: nil.location || '-' },
    { label: 'Type:', value: nil.experience || '-' },
    {
      label: 'Posted:',
      value: nil.createdDate ? new Date(nil.createdDate).toLocaleDateString() : '-',
    },
    { label: 'Industry:', value: nil.industry || '-' },
    {
      label: 'Apply by:',
      value: nil.applicationDeadline ? new Date(nil.applicationDeadline).toLocaleDateString() : '-',
    },
  ];

  return (
    <Card variant="purple">
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
              {nil.position || 'NIL Opportunity'}{' '}
              <a
                href={`/job/${nil.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#2563eb',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  verticalAlign: 'middle',
                }}
                aria-label="View NIL details in new tab"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            {nil.company?.companyName && (
              <NavLink
                to={`/company/${nil.company.id}`}
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
                {nil.company.companyName}
              </NavLink>
            )}
          </div>
          {nil.status && (
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
                  nil.status === JobStatus.Open
                    ? '#d1fae5'
                    : nil.status === JobStatus.Closed
                      ? '#fee2e2'
                      : '#fef3c7',
                color:
                  nil.status === JobStatus.Open
                    ? '#065f46'
                    : nil.status === JobStatus.Closed
                      ? '#991b1b'
                      : '#92400e',
              }}
              aria-label={`NIL status: ${statusText}`}
            >
              {statusText}
            </span>
          )}
        </div>
      </CardHeader>
      <FormattedCardBody rows={rows} />
      <CardActions>
        {canEdit && (
          <CardButton variant="primary" onClick={() => onView(nil)}>
            Edit NIL
          </CardButton>
        )}
        {!canEdit && (
          <>
            {nil.hasApplied || showAppliedBadge ? (
              <CardButton variant="primary" disabled>
                Applied
              </CardButton>
            ) : isStudentNotVerified ? (
              <CardButton variant="primary" disabled title="User is Not Validated">
                Apply
              </CardButton>
            ) : canApply ? (
              <CardButton variant="primary" onClick={() => onApply?.(nil)}>
                Apply
              </CardButton>
            ) : null}
          </>
        )}
      </CardActions>
    </Card>
  );
};
