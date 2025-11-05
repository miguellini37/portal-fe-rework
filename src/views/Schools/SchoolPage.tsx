import { useEffect, useMemo, useState } from 'react';
import { getSchoolById, ISchoolPaylod, updateSchool } from '../../api/school';
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

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
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

  const handleEditClick = () => setEditMode(true);
  const handleSaveClick = async () => {
    setLoading(true);
    try {
      await updateSchool(school, authHeader);
      toast.success('School updated successfully');
      setEditMode(false);
    } catch {
      toast.error('Error updating coschoolmpany');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = async () => {
    if (!id) {
      return;
    }
    try {
      const refreshedData = await getSchoolById(id as string, authHeader);
      setSchool(refreshedData);
      setEditMode(false);
    } catch {
      toast.error('Failed to refresh profile');
    }
  };

  const EditSaveButton = () => (
    <div className="absolute top-0 right-0 flex gap-2 z-10">
      {editMode && (
        <button
          className="px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition shadow"
          onClick={handleCancelClick}
          disabled={loading}
        >
          Cancel
        </button>
      )}
      <button
        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition shadow"
        onClick={editMode ? handleSaveClick : handleEditClick}
        disabled={loading}
      >
        {editMode ? (loading ? 'Saving...' : 'Save') : 'Edit'}
      </button>
    </div>
  );

  const TABS = [
    {
      key: 'overview',
      label: 'Overview',
      component: () => <>placehold</>,
    },
    ...(canEditPage
      ? [
          {
            key: 'admin',
            label: 'Admin',
            component: () => <OrgAdminTab />,
          },
        ]
      : []),
  ];

  const currentTab = TABS.find((tab) => tab.key === activeTab);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 relative">
      {/* Tabs + Edit/Save Button */}
      <div className="relative border-b border-gray-300 pb-0 mb-0">
        {canEditPage && <EditSaveButton />}
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
