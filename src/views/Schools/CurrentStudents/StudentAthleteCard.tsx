import React from 'react';
import { StudentAthlete } from './types';
import { getInitials } from '../../../util/name';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardActions,
  FormattedCardBody,
  CardButton,
} from '../../../components/Card';

export interface StudentAthleteCardProps {
  student: StudentAthlete;
}

const getStudentInitials = (student: StudentAthlete): string => {
  return getInitials({ firstName: student.firstName, lastName: student.lastName });
};

export const StudentAthleteCard: React.FC<StudentAthleteCardProps> = ({ student }) => {
  const rows = [
    { label: 'Class Year:', value: student.classYear },
    { label: 'Major:', value: student.major },
    { label: 'GPA:', value: student.gpa.toFixed(1) },
    { label: 'Expected Graduation:', value: student.expectedGraduation },
  ];

  if (student.location) {
    rows.push({ label: 'Location:', value: student.location });
  }

  console.log(student.id);

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
            {getStudentInitials(student)}
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
              {student.firstName} {student.lastName}
            </div>
            <div
              style={{
                color: 'var(--primary, #3b82f6)',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {student.sport}
              {student.position ? ` • ${student.position}` : ''}
            </div>
          </div>
        </div>
      </CardHeader>
      <FormattedCardBody rows={rows} />
      <CardActions>
        <CardButton variant="primary">
          <NavLink to={`/athlete/${student.id}`}>View Profile</NavLink>
        </CardButton>
      </CardActions>
    </Card>
  );
};
