import { FC, useMemo } from 'react';
import { Card, CardHeader, FormattedCardBody } from '../../components/Card';
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
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#111827',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {interview.job?.position}
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {interview?.company?.companyName}
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          {interview?.location || 'Location TBD'}
        </div>
      </CardHeader>
      <FormattedCardBody rows={rows} />
    </Card>
  );
};
