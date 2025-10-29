import { useEffect, useState } from 'react';
import { OverviewTab } from './Overview';
import { AcademicsTab } from './Academics';
import { AthleticsTab } from './AthleticsTab';
import './athlete.css';
import { useAuthHeader } from '../../../auth/hooks';
import { useAuthUser } from '../../../auth/hooks';
import { toast } from 'react-toastify';
import { IUpdateAthletePayload, getAthleteById, updateAthlete } from '../../../api/athlete';
import { useParams } from 'react-router-dom';

export const AthleteProfile = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const userId = user?.id;
  const params = useParams<{ id: string }>();

  const id = params.id ?? userId;
  const canEdit = id === userId;

  const [athlete, setAthlete] = useState<IUpdateAthletePayload>({});
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    getAthleteById(id as string, authHeader)
      .then((data) => {
        setAthlete(data);
      })
      .catch(() => {
        toast.error('Failed to fetch profile');
      });
  }, [id]);

  const handleEditClick = () => setEditMode(true);
  const handleSaveClick = async () => {
    setLoading(true);
    try {
      await updateAthlete(athlete, authHeader);
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch {
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = async () => {
    try {
      const refreshedData = await getAthleteById(id as string, authHeader);
      setAthlete(refreshedData);
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
      component: (athlete: IUpdateAthletePayload) => (
        <OverviewTab athlete={athlete} editMode={editMode} setAthlete={setAthlete} />
      ),
    },
    {
      key: 'academic',
      label: 'Academic',
      component: (athlete: IUpdateAthletePayload) => (
        <AcademicsTab athlete={athlete} editMode={editMode} setAthlete={setAthlete} />
      ),
    },
    {
      key: 'athletic',
      label: 'Athletic',
      component: (athlete: IUpdateAthletePayload) => (
        <AthleticsTab athlete={athlete} editMode={editMode} setAthlete={setAthlete} />
      ),
    },
    // { key: 'resume', label: 'Resume', component: (athlete: IUpdateAthletePayload) => <ResumeTab athlete={athlete} editMode={editMode} setAthlete={setAthlete} /> },
    // { key: 'media', label: 'Media', component: (athlete: IUpdateAthletePayload) => <MediaTab athlete={athlete} editMode={editMode} setAthlete={setAthlete} /> },
  ];

  const currentTab = TABS.find((tab) => tab.key === activeTab);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 relative">
      {/* Tabs + Edit/Save Button */}
      <div className="relative border-b border-gray-300 pb-0 mb-0">
        {canEdit && <EditSaveButton />}
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
      <div className="m-4 min-h-[400px] relative">{currentTab?.component(athlete)}</div>
    </div>
  );
};
