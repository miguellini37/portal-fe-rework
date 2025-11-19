import React from 'react';
import { GetAthletesResponse } from '../../../api/athlete';
import { getFullName, getInitials } from '../../../util/name';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardActions,
  FormattedCardBody,
  CardButton,
} from '../../../components/Card';

export interface AthleteCardProps {
  athlete: GetAthletesResponse;
}

export const AthleteCard: React.FC<AthleteCardProps> = ({ athlete }) => {
  const { academics, athletics, school, location } = athlete;

  const rows = [
    { label: 'School:', value: school?.schoolName || 'N/A' },
    { label: 'Location:', value: location || 'N/A' },
    {
      label: 'GPA:',
      value: (
        <span>
          {academics?.gpa || 'N/A'}
          {athletics?.division && (
            <span
              style={{
                background: 'var(--muted, #f3f4f6)',
                color: 'var(--primary, #3b82f6)',
                fontSize: '0.85em',
                fontWeight: 600,
                borderRadius: '6px',
                padding: '2px 8px',
                marginLeft: '8px',
              }}
            >
              {athletics.division}
            </span>
          )}
        </span>
      ),
    },
    { label: 'Major:', value: academics?.major || 'N/A' },
    { label: 'Graduation:', value: academics?.graduationDate || 'N/A' },
  ];

  return (
    <Card variant="blue">
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--primary, #3b82f6)',
              color: 'var(--primary-foreground, white)',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
              flexShrink: 0,
            }}
          >
            {getInitials(athlete)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--foreground, #111827)',
                margin: 0,
              }}
            >
              {getFullName(athlete)}
            </div>
            <div
              style={{
                color: 'var(--primary, #3b82f6)',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {athletics?.sport}
              {athletics?.position ? ` • ${athletics?.position}` : ''}
            </div>
          </div>
        </div>
      </CardHeader>
      <FormattedCardBody rows={rows} />
      <CardActions>
        <CardButton variant="primary">
          <NavLink to={`/athlete/${athlete.id}`}>View Profile</NavLink>
        </CardButton>
      </CardActions>
    </Card>
  );
};
