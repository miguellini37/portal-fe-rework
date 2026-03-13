import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Users, GraduationCap, Building2, Clock } from 'lucide-react';
import { getUniversityOverview, UniversityOverview } from '../../api/school';
import './SchoolDashboard.css';
import { useAuthHeader } from '../../auth/hooks';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeDirection: 'up' | 'down';
  description: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeDirection,
  description,
  icon,
}) => (
  <div className="metric-card">
    <div className="metric-header">
      <div className="metric-icon">{icon}</div>
      <div className="metric-title">{title}</div>
    </div>
    <div className="metric-value">{value}</div>
    <div className="metric-change">
      {changeDirection === 'up' ? (
        <TrendingUp className="change-icon up" />
      ) : (
        <TrendingDown className="change-icon down" />
      )}
      <span className={`change-text ${changeDirection}`}>{change} from last month</span>
    </div>
    <div className="metric-description">{description}</div>
  </div>
);

const ActivityItem: React.FC<{ item: UniversityOverview['recentActivity'][0] }> = ({ item }) => {
  const dotColor =
    item.type === 'approved' || item.type === 'partnership'
      ? 'green'
      : item.type === 'compliance'
        ? 'yellow'
        : 'blue';

  return (
    <div className="activity-item">
      <div className={`activity-dot ${dotColor}`}></div>
      <div className="activity-content">
        <div className="activity-title">{item.message}</div>
        <div className="activity-timestamp">
          <Clock className="timestamp-icon" />
          {item.studentName ? `${item.studentName} · ` : ''}
          {new Date(item.date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

function calcChange(current: number, previous: number): { text: string; direction: 'up' | 'down' } {
  if (previous === 0) return { text: '+0%', direction: 'up' };
  const pct = Math.round(((current - previous) / previous) * 100);
  return { text: `${pct >= 0 ? '+' : ''}${pct}%`, direction: pct >= 0 ? 'up' : 'down' };
}

export const SchoolDashboard: React.FC = () => {
  const [data, setData] = useState<UniversityOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const authHeader = useAuthHeader();

  useEffect(() => {
    if (!authHeader) return;
    setLoading(true);
    getUniversityOverview(authHeader)
      .then(setData)
      .catch(() => console.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, [authHeader]);

  if (loading || !data) {
    return (
      <div className="school-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">University Overview</h1>
            <p className="dashboard-subtitle">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const gradsChange = calcChange(data.placedGraduates.currentMonth, data.placedGraduates.previousMonth);
  const sponsorsChange = calcChange(data.activeSponsors.currentMonth, data.activeSponsors.previousMonth);

  const displayMetrics = [
    {
      title: 'Placed Graduates',
      value: data.placedGraduates.currentMonth.toString(),
      change: gradsChange.text,
      changeDirection: gradsChange.direction,
      description: 'Student-athletes placed in careers this month',
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: 'Active Sponsors',
      value: data.activeSponsors.currentMonth.toString(),
      change: sponsorsChange.text,
      changeDirection: sponsorsChange.direction,
      description: 'Current sponsorship partnerships',
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: 'Total Students',
      value: data.communityNumbers.totalStudents.toLocaleString(),
      change: '-',
      changeDirection: 'up' as const,
      description: 'Active student-athletes',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <div className="school-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">University Overview</h1>
          <p className="dashboard-subtitle">
            Monitor student-athlete career development and NIL engagement across all programs.
          </p>
        </div>

        <div className="overview-section">
          <div className="metrics-grid">
            {displayMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        </div>

        <div className="dashboard-content">
          <div className="activity-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              {data.recentActivity.length > 0 ? (
                data.recentActivity.map((item) => (
                  <ActivityItem key={item.activityId} item={item} />
                ))
              ) : (
                <p style={{ padding: '20px', color: 'var(--muted-foreground)' }}>
                  No recent activity
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
