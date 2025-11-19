import React from 'react';
import { Link } from 'react-router-dom';
import { ICompanyPaylod } from '../../api/company';
import { Card, CardHeader, FormattedCardBody } from '../../components/Card';

export interface CompanyCardProps {
  company: ICompanyPaylod;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const jobCount = company.jobs?.filter((j) => j.type === 'job').length ?? 0;
  const internshipCount = company.jobs?.filter((j) => j.type === 'internship').length ?? 0;
  const nilCount = company.jobs?.filter((j) => j.type === 'nil').length ?? 0;
  const totalOpportunities = jobCount + internshipCount + nilCount;

  const rows = [
    { label: 'Total Opportunities', value: totalOpportunities.toString() },
    { label: 'Full-time Jobs', value: jobCount.toString() },
    { label: 'Internships', value: internshipCount.toString() },
    { label: 'NIL Opportunities', value: nilCount.toString() },
  ];

  return (
    <Card variant="blue">
      <CardHeader>
        <Link
          to={`/company/${company.id}`}
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.3,
          }}
        >
          {company.companyName || 'Unknown Company'}
        </Link>
        <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          {company.industry || 'Industry not specified'}
        </div>
      </CardHeader>
      <FormattedCardBody rows={rows} />
    </Card>
  );
};
