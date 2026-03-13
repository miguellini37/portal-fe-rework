import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Handshake,
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react';
import { toast } from 'react-toastify';
import {
  getUniversityNILOversight,
  UniversityNILOversightResponse,
} from '../../../api/school';
import { useAuthHeader } from '../../../auth/hooks';
import './NILOversight.css';

const formatCurrency = (value: number | undefined): string => {
  if (value == null) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const NILOversight: React.FC = () => {
  const [data, setData] = useState<UniversityNILOversightResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getUniversityNILOversight(authHeader);
        setData(result);
      } catch (error) {
        console.error('Error fetching NIL oversight data:', error);
        toast.error('Failed to load NIL oversight data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const metrics = data?.metrics;
  const deals = data?.recentDeals || [];

  const yoyChange =
    metrics?.totalAcceptedDeals && metrics.totalAcceptedDeals.lastYear > 0
      ? Math.round(
          ((metrics.totalAcceptedDeals.currentYear - metrics.totalAcceptedDeals.lastYear) /
            metrics.totalAcceptedDeals.lastYear) *
            100
        )
      : 0;
  const yoyDirection: 'up' | 'down' = yoyChange >= 0 ? 'up' : 'down';

  if (loading) {
    return (
      <div className="nil-oversight">
        <div className="nil-oversight-container">
          <div className="nil-oversight-header">
            <h1 className="nil-oversight-title">NIL Oversight</h1>
            <p className="nil-oversight-subtitle">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nil-oversight">
      <div className="nil-oversight-container">
        <div className="nil-oversight-header">
          <h1 className="nil-oversight-title">NIL Oversight</h1>
          <p className="nil-oversight-subtitle">
            Monitor and manage NIL activities across your programs
          </p>
        </div>

        {/* Metrics */}
        <div className="nil-metrics-section">
          <div className="nil-metrics-grid">
            <div className="nil-metric-card">
              <div className="nil-metric-header">
                <div className="nil-metric-icon">
                  <Handshake className="w-6 h-6" />
                </div>
                <div className="nil-metric-label">Total Accepted Deals</div>
              </div>
              <div className="nil-metric-value">
                {metrics?.totalAcceptedDeals?.currentYear ?? 0}
              </div>
              <div className="nil-metric-change">
                {yoyDirection === 'up' ? (
                  <TrendingUp className="nil-change-icon up" />
                ) : (
                  <TrendingDown className="nil-change-icon down" />
                )}
                <span className={`nil-change-text ${yoyDirection}`}>
                  {yoyChange > 0 ? '+' : ''}
                  {yoyChange}% from last year
                </span>
              </div>
            </div>

            <div className="nil-metric-card">
              <div className="nil-metric-header">
                <div className="nil-metric-icon">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="nil-metric-label">Total Applications</div>
              </div>
              <div className="nil-metric-value">{metrics?.totalApplications ?? 0}</div>
            </div>

            <div className="nil-metric-card">
              <div className="nil-metric-header">
                <div className="nil-metric-icon">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="nil-metric-label">Approval Rate</div>
              </div>
              <div className="nil-metric-value">
                {metrics?.approvalRate != null ? `${metrics.approvalRate}%` : '0%'}
              </div>
            </div>

            <div className="nil-metric-card">
              <div className="nil-metric-header">
                <div className="nil-metric-icon">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="nil-metric-label">Under Review</div>
              </div>
              <div className="nil-metric-value">{metrics?.applicationsUnderReview ?? 0}</div>
            </div>

            <div className="nil-metric-card">
              <div className="nil-metric-header">
                <div className="nil-metric-icon">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="nil-metric-label">Total Value</div>
              </div>
              <div className="nil-metric-value">{formatCurrency(metrics?.totalValue)}</div>
            </div>
          </div>
        </div>

        {/* Recent Deals Table */}
        <div className="nil-deals-section">
          <h2 className="nil-section-title">Recent Deals</h2>
          {deals.length > 0 ? (
            <div className="nil-deals-table-wrapper">
              <table className="nil-deals-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Athlete</th>
                    <th>Industry</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id}>
                      <td>{deal.position || '-'}</td>
                      <td>{deal.company?.companyName || '-'}</td>
                      <td>{deal.athleteName || '-'}</td>
                      <td>{deal.industry || deal.company?.industry || '-'}</td>
                      <td>{formatCurrency(deal.salary)}</td>
                      <td>
                        <span className={`nil-status-badge ${deal.status || 'pending'}`}>
                          {deal.status || 'pending'}
                        </span>
                      </td>
                      <td>{deal.createdDate || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="nil-empty-state">No recent deals found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
