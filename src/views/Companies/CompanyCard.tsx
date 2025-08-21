import React from 'react';
import { Link } from 'react-router-dom';
import { ICompanyPaylod } from '../../api/company';
import './company.css';

export interface CompanyCardProps {
  company: ICompanyPaylod;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const jobCount = company.jobs?.filter((j) => j.type === 'job').length ?? 0;
  const internshipCount = company.jobs?.filter((j) => j.type === 'internship').length ?? 0;
  const nilCount = company.jobs?.filter((j) => j.type === 'nil').length ?? 0;
  const totalOpportunities = jobCount + internshipCount + nilCount;

  return (
    <div className="company-card">
      <div className="company-card-layout">
        <div className="company-content">
          <div className="company-header">
            <div className="company-title-section">
              <h3 className="company-title">
                <Link to={`/company/${company.id}`} className="company-link">
                  {company.companyName || 'Unknown Company'}
                </Link>
              </h3>
              <div className="company-industry">{company.industry || 'Industry not specified'}</div>
            </div>
          </div>

          <div className="company-details">
            <div className="company-stats">
              <div className="stat-item">
                <span className="stat-number">{totalOpportunities}</span>
                <span className="stat-label">Total Opportunities</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{jobCount}</span>
                <span className="stat-label">Full-time Jobs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{internshipCount}</span>
                <span className="stat-label">Internships</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{nilCount}</span>
                <span className="stat-label">NIL Opportunities</span>
              </div>
            </div>
          </div>
        </div>

        <div className="company-actions">
          <Link to={`/company/${company.id}`} className="action-btn primary">
            View Company
          </Link>
          {totalOpportunities > 0 && (
            <Link to={`/company/${company.id}/jobs`} className="action-btn secondary">
              View Jobs ({totalOpportunities})
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
