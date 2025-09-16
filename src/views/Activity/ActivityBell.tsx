// src/components/ActivityBell.tsx
import { FC, useEffect, useState, useCallback } from 'react';
import { IActivity, getActivity, ActivityType } from '../../api/activity';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, X } from 'lucide-react';
import Modal from 'react-modal';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { formatDateTime } from '../../util/date';
import {buildActivityPath} from './ActivityHelper';
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
    if (!isOpen) return;
    getActivity(authHeader ?? '', { limit: 10 })
      .then(setRecent)
      .catch(() => setRecent([]));
  }, [isOpen, authHeader]);

  // Build a compact label for accessibility/tooltips
  const renderLabel = (a: IActivity): string => {
    const when =
      a.type === ActivityType.INTERVIEW
        ? formatDateTime(a.interview?.dateTime ?? a.date)
        : formatDateTime(a.date);
    return `${a.message} • ${when}`;
  };

  // Compute primary/secondary text and right-side date
  const buildDisplay = (a: IActivity): {
    primary: string;
    company?: string;
    dateText: string;
    dateISO?: Date;
  } => {
    const dateISO =
      (a.type === ActivityType.INTERVIEW ? a.interview?.dateTime : a.date) ?? undefined;

    const dateText =
      a.type === ActivityType.INTERVIEW
        ? formatDateTime(a.interview?.dateTime ?? a.date)
        : formatDateTime(a.date);

    // message on first line
    const primary = a.message;

    // company on second line when we know it (applications)
    const company =
      a.type === ActivityType.APPLICATION
        ? a.application?.job?.company?.companyName + ' - ' + a.application?.job?.position
        : undefined;

    return { primary, company, dateText, dateISO };
  };

  const handleItemActivate = useCallback((a: IActivity) => {
    const to = buildActivityPath(a);
    setIsOpen(false);
    navigate(to);
  }, [navigate]);

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
            recent.map(a => {
              const { primary, company, dateText, dateISO } = buildDisplay(a);
              const label = renderLabel(a);
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
                      {company && (
                        <div className="activity-secondary">{company}</div>
                      )}
                    </div>
                    <time className="activity-meta" dateTime={formatDateTime(dateISO)}>
                      {dateText}
                    </time>
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
