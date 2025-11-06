import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Shield, Users, GraduationCap, Plus, Clock } from 'lucide-react';
import {
  getSchoolDashboardMetrics,
  getSchoolActivity,
  SchoolDashboardMetrics,
  SchoolActivity,
} from '../../api/school';
import './SchoolDashboard.css';
import { useAuthHeader, useAuthUser } from '../../auth/hooks';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeDirection: 'up' | 'down';
  description: string;
  icon: React.ReactNode;
}

interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'approved' | 'info' | 'compliance' | 'partnership';
}

interface QuickActionProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeDirection,
  description,
  icon,
}) => {
  return (
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
};

const ActivityItem: React.FC<{ item: ActivityItem }> = ({ item }) => {
  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'approved':
        return 'green';
      case 'info':
        return 'blue';
      case 'compliance':
        return 'yellow';
      case 'partnership':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className="activity-item">
      <div className={`activity-dot ${getActivityColor(item.type)}`}></div>
      <div className="activity-content">
        <div className="activity-title">{item.title}</div>
        <div className="activity-timestamp">
          <Clock className="timestamp-icon" />
          {item.timestamp}
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<QuickActionProps> = ({ title, icon, onClick }) => {
  return (
    <button className="quick-action" onClick={onClick}>
      <div className="quick-action-icon">{icon}</div>
      <div className="quick-action-title">{title}</div>
    </button>
  );
};

export const SchoolDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SchoolDashboardMetrics>({});
  const [activity, setActivity] = useState<SchoolActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();
  const user = useAuthUser();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const schoolId = user?.schoolId;

        if (schoolId) {
          const [metricsData, activityData] = await Promise.all([
            getSchoolDashboardMetrics(schoolId, authHeader),
            getSchoolActivity(schoolId, authHeader),
          ]);

          setMetrics(metricsData);
          setActivity(activityData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Build metrics array from API data
  const displayMetrics = [
    {
      title: 'Placed Graduates',
      value: metrics.placedGraduates?.toString() || '0',
      change: metrics.placedGraduatesChange
        ? `${metrics.placedGraduatesChange > 0 ? '+' : ''}${metrics.placedGraduatesChange}%`
        : '0%',
      changeDirection:
        (metrics.placedGraduatesChange || 0) >= 0 ? ('up' as const) : ('down' as const),
      description: 'Student-athletes placed in careers',
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: 'NIL Compliance Rate',
      value: metrics.nilComplianceRate ? `${metrics.nilComplianceRate}%` : '0%',
      change: metrics.nilComplianceRateChange
        ? `${metrics.nilComplianceRateChange > 0 ? '+' : ''}${metrics.nilComplianceRateChange}%`
        : '0%',
      changeDirection:
        (metrics.nilComplianceRateChange || 0) >= 0 ? ('up' as const) : ('down' as const),
      description: 'Compliance with NIL regulations',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'Active Sponsors',
      value: metrics.activeSponsors?.toString() || '0',
      change: metrics.activeSponsorsChange
        ? `${metrics.activeSponsorsChange > 0 ? '+' : ''}${metrics.activeSponsorsChange}`
        : '0',
      changeDirection:
        (metrics.activeSponsorsChange || 0) >= 0 ? ('up' as const) : ('down' as const),
      description: 'Current sponsorship partnerships',
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Community Members',
      value: metrics.communityMembers?.toLocaleString() || '0',
      change: metrics.communityMembersChange
        ? `${metrics.communityMembersChange > 0 ? '+' : ''}${metrics.communityMembersChange}`
        : '0',
      changeDirection:
        (metrics.communityMembersChange || 0) >= 0 ? ('up' as const) : ('down' as const),
      description: 'Active alumni and students',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  // Map activity data from API
  const recentActivity: ActivityItem[] = activity.map((item) => ({
    id: item.id || '',
    title: item.title || 'Activity',
    timestamp: item.timestamp || 'Unknown',
    type: (item.type || 'info') as ActivityItem['type'],
  }));

  const quickActions = [
    {
      title: 'Add New Student',
      icon: <Plus className="w-5 h-5" />,
      onClick: () => {
        // Mock action - opens student profile creation form
        console.log('Opening student profile creation form...');
      },
    },
    // {
    //   title: 'Review NIL Deal',
    //   icon: <Search className="w-5 h-5" />,
    //   onClick: () => {
    //     // Mock action - opens NIL Oversight module
    //     console.log('Opening NIL Oversight module...');
    //   },
    // },
    // {
    //   title: 'Generate Report',
    //   icon: <FileText className="w-5 h-5" />,
    //   onClick: () => {
    //     // Mock action - launches reporting tool
    //     console.log('Launching reporting tool...');
    //   },
    // },
    // {
    //   title: 'Schedule Meeting',
    //   icon: <Calendar className="w-5 h-5" />,
    //   onClick: () => {
    //     // Mock action - opens calendar integration
    //     console.log('Opening calendar integration...');
    //   },
    // },
  ];

  if (loading) {
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

  return (
    <div className="school-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">University Overview</h1>
          <p className="dashboard-subtitle">
            Monitor student-athlete career development and NIL engagement across all programs.
          </p>
        </div>

        {/* Overview Metrics */}
        <div className="overview-section">
          <div className="metrics-grid">
            {displayMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        </div>

        <div className="dashboard-content">
          {/* Recent Activity */}
          <div className="activity-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.map((item) => <ActivityItem key={item.id} item={item} />)
              ) : (
                <p style={{ padding: '20px', color: 'var(--muted-foreground)' }}>
                  No recent activity
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <QuickAction key={index} {...action} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
