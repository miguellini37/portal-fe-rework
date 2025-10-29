// src/components/ActivityBell.tsx
import { FC, useEffect, useState, useCallback } from 'react';
import { IActivity, getActivity, ActivityType } from '../../api/activity';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, X } from 'lucide-react';
import Modal from 'react-modal';
import { useAuthHeader } from '../../auth/hooks';
import { formatDateTime } from '../../util/date';
import { buildActivityPath } from './ActivityHelper';
import './ActivityPage.css';

interface ActivityBellProps {
  isCollapsed?: boolean;
  className?: string;
}

export const ActivityBell: FC<ActivityBellProps> = ({ isCollapsed, className }) => {
  const [recent, setRecent] = useState<IActivity[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    getActivity(authHeader ?? '', { limit: 10 })
      .then(setRecent)
      .catch(() => setRecent([]));
  }, [isOpen, authHeader]);

  // Accessibility label uses activity timestamp
  const renderLabel = (a: IActivity): string => {
    const when = formatDateTime(a.date);
    return `${a.message} • ${when}`;
  };

  // Build display parts for each row
  const buildDisplay = (
    a: IActivity
  ): {
    primary: string;
    secondary?: string;
    dateText?: string;
    dateISO?: Date;
  } => {
    // Right-side meta shows the activity time for all types
    const dateISO = a.date;
    const dateText = formatDateTime(a.date);

    if (a.type === ActivityType.INTERVIEW) {
      const interviewDt = a.interview?.dateTime;
      const secondary = [
        'Scheduled for ' + (interviewDt ? formatDateTime(interviewDt) : undefined),
        a.interview?.interviewer,
        a.interview?.location,
      ]
        .filter(Boolean)
        .join(' - ');
      return { primary: a.message, secondary, dateText, dateISO };
    }

    // Applications and others
    const primary = a.message;
    const secondary =
      a.type === ActivityType.APPLICATION
        ? [a.application?.job?.company?.companyName, a.application?.job?.position]
            .filter(Boolean)
            .join(' - ')
        : undefined;

    return { primary, secondary, dateText, dateISO };
  };

  const handleItemActivate = useCallback(
    (a: IActivity) => {
      const to = buildActivityPath(a);
      setIsOpen(false);
      navigate(to);
    },
    [navigate]
  );

  return (
    <>
      <button
        aria-label="Show recent activity"
        onClick={() => setIsOpen(true)}
        className={`sidebar-action-btn ${className ?? ''}`}
        type="button"
        title="Activity"
      >
        <Bell size={22} />
        {!isCollapsed && <span>Activity</span>}
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Recent Activity"
        ariaHideApp={false}
        className="activity-modal"
        overlayClassName="activity-modal-overlay"
      >
        <div className="activity-modal-header">
          <h3 className="activity-modal-title">
            <span className="activity-modal-title-icon" aria-hidden="true">
              <Bell size={16} />
            </span>
            <span>Recent Activity</span>
          </h3>
          <button
            type="button"
            aria-label="Close"
            className="activity-close-btn"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        <ul className="activity-timeline">
          {recent.length === 0 ? (
            <li className="activity-empty">No recent activity.</li>
          ) : (
            recent.map((a) => {
              const { primary, secondary, dateText, dateISO } = buildDisplay(a);
              const label = renderLabel(a);
              const dateAttr = dateISO ? new Date(dateISO).toISOString() : undefined;
              return (
                <li
                  key={a.activityId}
                  className="activity-item activity-clickable"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleItemActivate(a)}
                  aria-label={label}
                >
                  <span className="activity-node" aria-hidden="true" />
                  <div className="activity-content" title={label}>
                    <div className="activity-text">
                      <div className="activity-primary">{primary}</div>
                      {secondary && <div className="activity-secondary">{secondary}</div>}
                    </div>
                    {dateText && (
                      <time className="activity-meta" dateTime={dateAttr}>
                        {dateText}
                      </time>
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>

        <div className="activity-footer">
          <Link to="/activity" onClick={() => setIsOpen(false)} className="activity-see-all">
            See all
          </Link>
        </div>
      </Modal>
    </>
  );
};
