import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Users,
  GraduationCap,
  Plus,
  Search,
  FileText,
  Calendar,
  Clock,
} from 'lucide-react';
import './SchoolDashboard.css';

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
  // Mock data - API not equipped to return this information yet
  const mockMetrics = [
    {
      title: 'Placed Graduates',
      value: '120',
      change: '+12%',
      changeDirection: 'up' as const,
      description: 'Student-athletes placed in careers',
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      title: 'NIL Compliance Rate',
      value: '85%',
      change: '+5%',
      changeDirection: 'up' as const,
      description: 'Compliance with NIL regulations',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'Active Sponsors',
      value: '230',
      change: '+18',
      changeDirection: 'up' as const,
      description: 'Current sponsorship partnerships',
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Community Members',
      value: '1,247',
      change: '+89',
      changeDirection: 'up' as const,
      description: 'Active alumni and students',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const mockRecentActivity: ActivityItem[] = [
    {
      id: '1',
      title: 'New NIL deal approved',
      timestamp: '2 hours ago',
      type: 'approved',
    },
    {
      id: '2',
      title: 'Career placement recorded',
      timestamp: '4 hours ago',
      type: 'info',
    },
    {
      id: '3',
      title: 'Compliance review completed',
      timestamp: '1 day ago',
      type: 'compliance',
    },
    {
      id: '4',
      title: 'New employer partnership',
      timestamp: '2 days ago',
      type: 'partnership',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Student',
      icon: <Plus className="w-5 h-5" />,
      onClick: () => {
        // Mock action - opens student profile creation form
        console.log('Opening student profile creation form...');
      },
    },
    {
      title: 'Review NIL Deal',
      icon: <Search className="w-5 h-5" />,
      onClick: () => {
        // Mock action - opens NIL Oversight module
        console.log('Opening NIL Oversight module...');
      },
    },
    {
      title: 'Generate Report',
      icon: <FileText className="w-5 h-5" />,
      onClick: () => {
        // Mock action - launches reporting tool
        console.log('Launching reporting tool...');
      },
    },
    {
      title: 'Schedule Meeting',
      icon: <Calendar className="w-5 h-5" />,
      onClick: () => {
        // Mock action - opens calendar integration
        console.log('Opening calendar integration...');
      },
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

        {/* Overview Metrics */}
        <div className="overview-section">
          <div className="metrics-grid">
            {mockMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        </div>

        <div className="dashboard-content">
          {/* Recent Activity */}
          <div className="activity-section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              {mockRecentActivity.map((item) => (
                <ActivityItem key={item.id} item={item} />
              ))}
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
