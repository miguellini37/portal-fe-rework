// src/views/ActivityPage.tsx
import { FC, useEffect, useState, useCallback } from 'react';
import { IActivity, getActivity } from '../../api/activity';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { formatDateTime } from '../../util/date';
import { useNavigate } from 'react-router-dom'; // added
import {buildActivityPath} from './ActivityHelper';

interface ActivityListItemProps {
  activity: IActivity;
  onClick: (a: IActivity) => void; // added
}


const ActivityListItem: FC<ActivityListItemProps> = ({ activity, onClick }) => {
  const activityTime = formatDateTime(activity.date);

  switch (activity.type) {
    case 'application': {
      const job = activity.application?.job;
      return (
        <li
          className="activity-clickable flex flex-col gap-1 border-b last:border-b-0 border-gray-100 py-4 px-2"
          onClick={() => onClick(activity)} // click-only
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-blue-700 text-sm">Application</span>
            <span className="text-gray-400 text-xs">{activityTime}</span>
          </div>
          <div className="text-gray-800 text-base">
            Applied to {job?.position ?? 'Unknown position'} at {job?.company?.companyName ?? 'Unknown company'}
          </div>
          {activity.message && <div className="text-gray-500 text-sm">{activity.message}</div>}
        </li>
      );
    }
    case 'interview': {
      const when = activity.interview?.dateTime ? formatDateTime(activity.interview.dateTime) : 'TBD';
      return (
        <li
          className="activity-clickable flex flex-col gap-1 border-b last:border-b-0 border-gray-100 py-4 px-2"
          onClick={() => onClick(activity)} // click-only
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-blue-700 text-sm">Interview</span>
            <span className="text-gray-400 text-xs">{activityTime}</span>
          </div>
          <div className="text-gray-800 text-base">Interview scheduled {when}</div>
          {activity.message && <div className="text-gray-500 text-sm">{activity.message}</div>}
        </li>
      );
    }
    case 'other': {
      return (
        <li
          className="activity-clickable flex flex-col gap-1 border-b last:border-b-0 border-gray-100 py-4 px-2"
          onClick={() => onClick(activity)} // click-only
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-blue-700 text-sm">Other</span>
            <span className="text-gray-400 text-xs">{activityTime}</span>
          </div>
          <div className="text-gray-800 text-base">{activity.message}</div>
        </li>
      );
    }
    default:
      return null;
  }
};

export const ActivityPage: FC = () => {
  const [all, setAll] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const authHeader = useAuthHeader();
  const navigate = useNavigate(); // added


  const handleClick = useCallback(
    (a: IActivity) => {
      navigate(buildActivityPath(a));
    },
    [navigate, buildActivityPath]
  );

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    getActivity(authHeader ?? '')
      .then(setAll)
      .catch(() => setError('Failed to load activity.'))
      .finally(() => setLoading(false));
  }, [authHeader]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="border-b border-gray-300 mb-6">
        <h2 className="text-2xl font-semibold py-2 px-2">Activity</h2>
      </div>

      <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
        {loading && <div className="text-gray-500 py-8 text-center">Loading...</div>}
        {error && <div className="text-red-500 py-8 text-center">{error}</div>}

        {!loading && !error && (
          <ul className="activity-list">
            {all.length === 0 && <li className="text-gray-400 text-center py-8">No activity found.</li>}
            {all.map((a) => (
              <ActivityListItem key={a.activityId} activity={a} onClick={handleClick} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
