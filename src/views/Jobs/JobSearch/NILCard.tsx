import React from 'react';
import { IJobPayload, JobStatus } from '../../../api/job';
import { NavLink } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardActions,
  FormattedCardBody,
  CardButton,
} from '../../../components/Card';

export interface NILCardProps {
  nil: IJobPayload;
  onView: (nil: IJobPayload) => void;
  canEdit?: boolean;
  canApply?: boolean;
  onApply?: (nil: IJobPayload) => void;
}

export const NILCard: React.FC<NILCardProps> = ({ nil, onView, canEdit, canApply, onApply }) => {
  if (nil.status !== JobStatus.Open && !canEdit) {
    return null;
  }

  const statusText = (nil.status ?? JobStatus.Open)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const showAppliedBadge = Boolean(!canEdit && !canApply);
  const showWarning = nil.salary && nil.salary > 600;

  const rows = [];

  if (nil.salary) {
    rows.push({
      label: 'Compensation:',
      value: (
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
          {showWarning && <AlertTriangle size={16} color="#f59e0b" />}
        </span>
      ),
    });
  }

  if (nil.location) {
    rows.push({ label: 'Location:', value: nil.location });
  }

  if (nil.experience) {
    rows.push({ label: 'Type:', value: nil.experience });
  }

  if (nil.createdDate) {
    rows.push({
      label: 'Posted:',
      value: new Date(nil.createdDate).toLocaleDateString(),
    });
  }

  if (nil.industry) {
    rows.push({ label: 'Industry:', value: nil.industry });
  }

  if (nil.applicationDeadline) {
    rows.push({
      label: 'Apply by:',
      value: new Date(nil.applicationDeadline).toLocaleDateString(),
    });
  }

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
                margin: '0 0 0.625rem 0',
                lineHeight: 1.3,
                letterSpacing: '-0.025em',
              }}
            >
              {nil.position || 'NIL Opportunity'}
            </div>
            <span
              style={{
                background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
                border: '1px solid #c4b5fd',
                color: '#7c3aed',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.025em',
              }}
            >
              NIL
            </span>
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
        {showAppliedBadge && (
          <CardButton variant="primary" disabled>
            Applied
          </CardButton>
        )}
        {canApply && (
          <CardButton variant="primary" onClick={() => onApply?.(nil)}>
            Apply
          </CardButton>
        )}
        <CardButton variant="secondary">
          <NavLink to={`/job/${nil.id}`}>View Details</NavLink>
        </CardButton>
      </CardActions>
    </Card>
  );
};
