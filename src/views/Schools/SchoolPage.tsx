import { useEffect, useMemo, useState } from 'react';
import { getSchoolById, ISchoolPaylod } from '../../api/school';
import { useParams } from 'react-router-dom';
import { useAuthUser } from '../../auth/hooks';
import { useAuthHeader } from '../../auth/hooks';
import { toast } from 'react-toastify';
import './SchoolPage.css';
import { OrgAdminTab } from '../Profile/OrgAdminTab';

export const SchoolPage = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState('overview');
  const [school, setSchool] = useState<ISchoolPaylod>({});

  const fetchSchool = async () => {
    try {
      const school = await getSchoolById(id as string, authHeader);
      setSchool(school);
    } catch {
      toast.error('Failed to fetch school');
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchSchool();
  }, [id]);

  const canEditPage = useMemo(() => {
    return user?.id === school.ownerId;
  }, [user, school]);

  const TABS = [
    {
      key: 'overview',
      label: 'Overview',
      component: () => (
        <div className="profile-container">
          <div className="full-width">
            <label htmlFor="school" className="form-label">
              School
            </label>
            <h2>{school.schoolName}</h2>
          </div>
        </div>
      ),
    },
    ...(canEditPage
      ? [
          {
            key: 'admin',
            label: 'Admin',
            component: () => <OrgAdminTab showAthletes />,
          },
        ]
      : []),
  ];

  const currentTab = TABS.find((tab) => tab.key === activeTab);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 relative">
      <div className="relative border-b border-gray-300 pb-0 mb-0">
        <div className="flex space-x-4 mt-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === tab.key
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="m-4 min-h-[400px] relative">{currentTab?.component()}</div>
    </div>
  );
};
