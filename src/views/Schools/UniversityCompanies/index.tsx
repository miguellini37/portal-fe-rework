import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Building2, Briefcase, Award, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  getCompaniesForUniversity,
  CompaniesForUniversityResponse,
} from '../../../api/school';
import { useAuthHeader } from '../../../auth/hooks';
import './UniversityCompanies.css';

const formatCurrency = (value: number | undefined): string => {
  if (value == null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const UniversityCompanies: React.FC = () => {
  const [data, setData] = useState<CompaniesForUniversityResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCompaniesForUniversity(authHeader);
        setData(result);
      } catch (error) {
        console.error('Error fetching university companies:', error);
        toast.error('Failed to load partner companies');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPartners = data?.totalPartners;
  const momChange =
    totalPartners && totalPartners.previousMonth > 0
      ? Math.round(
          ((totalPartners.current - totalPartners.previousMonth) / totalPartners.previousMonth) *
            100
        )
      : 0;
  const momDirection: 'up' | 'down' = momChange >= 0 ? 'up' : 'down';

  const companies = data?.companies || [];

  if (loading) {
    return (
      <div className="university-companies">
        <div className="university-companies-container">
          <div className="university-companies-header">
            <h1 className="university-companies-title">Partner Companies</h1>
            <p className="university-companies-subtitle">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="university-companies">
      <div className="university-companies-container">
        <div className="university-companies-header">
          <h1 className="university-companies-title">Partner Companies</h1>
          <p className="university-companies-subtitle">
            View and manage corporate partnerships and hiring pipelines for your university.
          </p>
        </div>

        {/* Metrics */}
        <div className="uc-metrics-section">
          <div className="uc-metrics-grid">
            <div className="uc-metric-card">
              <div className="uc-metric-header">
                <div className="uc-metric-icon">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="uc-metric-label">Total Partners</div>
              </div>
              <div className="uc-metric-value">{totalPartners?.current ?? 0}</div>
              <div className="uc-metric-change">
                {momDirection === 'up' ? (
                  <TrendingUp className="uc-change-icon up" />
                ) : (
                  <TrendingDown className="uc-change-icon down" />
                )}
                <span className={`uc-change-text ${momDirection}`}>
                  {momChange > 0 ? '+' : ''}
                  {momChange}% from last month
                </span>
              </div>
            </div>

            <div className="uc-metric-card">
              <div className="uc-metric-header">
                <div className="uc-metric-icon">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="uc-metric-label">Open Positions</div>
              </div>
              <div className="uc-metric-value">{data?.openPositions ?? 0}</div>
            </div>

            <div className="uc-metric-card">
              <div className="uc-metric-header">
                <div className="uc-metric-icon">
                  <Award className="w-6 h-6" />
                </div>
                <div className="uc-metric-label">Placements YTD</div>
              </div>
              <div className="uc-metric-value">{data?.placementsYTD ?? 0}</div>
            </div>

            <div className="uc-metric-card">
              <div className="uc-metric-header">
                <div className="uc-metric-icon">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="uc-metric-label">Median Salary</div>
              </div>
              <div className="uc-metric-value">{formatCurrency(data?.medianSalary)}</div>
            </div>
          </div>
        </div>

        {/* Company Cards */}
        {companies.length > 0 ? (
          <div className="uc-companies-grid">
            {companies.map((company) => (
              <div key={company.id} className="uc-company-card">
                <h3 className="uc-company-name">{company.companyName || 'Unknown Company'}</h3>
                <span className="uc-company-industry">{company.industry || 'N/A'}</span>
                <span className="uc-company-jobs">
                  {company.openJobsCount ?? 0} open position
                  {company.openJobsCount !== 1 ? 's' : ''}
                </span>
                <button
                  className="uc-company-view-btn"
                  onClick={() => navigate(`/company/${company.id}`)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="uc-empty-state">No partner companies found.</div>
        )}
      </div>
    </div>
  );
};
