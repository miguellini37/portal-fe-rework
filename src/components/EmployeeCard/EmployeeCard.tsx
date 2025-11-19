import React, { FC } from 'react';
import { Mail, Building2, Phone } from 'lucide-react';
import { GetSchoolEmployeesResponse } from '../../api/schoolEmployee';
import { Card, CardHeader, FormattedCardBody } from '../Card';

export interface EmployeeCardProps {
  employee: GetSchoolEmployeesResponse;
}

export const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
  const fullName = `${employee.firstName || ''} ${employee.lastName || ''}`.trim();
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const rows = [
    {
      label: 'Email:',
      value: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Mail size={14} />
          {employee.email}
        </span>
      ),
    },
    {
      label: 'Phone:',
      value: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Phone size={14} />
          {employee.phone}
        </span>
      ),
    },
  ];

  if (employee.schoolRef) {
    rows.push({
      label: 'School:',
      value: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Building2 size={14} />
          {employee.schoolRef.schoolName}
        </span>
      ),
    });
  }

  return (
    <Card variant="blue">
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#3b82f6',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '1rem',
              flexShrink: 0,
            }}
          >
            {initials || '??'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#1f2937',
                margin: 0,
              }}
            >
              {fullName || 'Unknown'}
            </div>
          </div>
        </div>
      </CardHeader>
      <FormattedCardBody rows={rows} />
    </Card>
  );
};
