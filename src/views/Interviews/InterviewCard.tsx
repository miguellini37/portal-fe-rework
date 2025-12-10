import { FC, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Card, CardHeader, FormattedCardBody } from '../../components/Card';
import { IInterviewPayload, InterviewStatus } from '../../api/interview';
import { ExternalLink } from 'lucide-react';

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

  const rows = [{ label: 'Date & Time:', value: dateLabel }];

  if (interview?.interviewer) {
    rows.push({ label: 'Interviewer:', value: interview.interviewer });
  }

  if (interview?.status) {
    rows.push({
      label: 'Status:',
      value: String(status).replace(/_/g, ' '),
    });
  }

  if (interview?.preparationTips) {
    rows.push({ label: 'Preparation:', value: interview.preparationTips });
  }

  return (
    <Card variant="blue" ariaLabel="Interview card">
      <CardHeader>
        <div style={{ marginBottom: '0.75rem' }}>
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
            <Link
              to={`/job/${interview.job?.id}`}
              style={{
                color: '#111827',
                textDecoration: 'none',
              }}
            >
              {interview.job?.position}
            </Link>{' '}
            <a
              href={`/job/${interview.job?.id}`}
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
          {interview?.company?.companyName && (
            <NavLink
              to={`/company/${interview.company.id}`}
              style={{
                fontSize: '1rem',
                fontWeight: 550,
                color: '#2563eb',
                textDecoration: 'none',
                display: 'block',
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
              {interview.company.companyName}
            </NavLink>
          )}
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          {interview?.location || 'Location TBD'}
        </div>
      </CardHeader>
      <FormattedCardBody rows={rows} />
    </Card>
  );
};
