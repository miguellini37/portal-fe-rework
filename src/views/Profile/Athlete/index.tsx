import { useEffect, useState } from 'react';
import { OverviewTab } from './Overview';
import { AcademicsTab } from './Academics';
import { AthleticsTab } from './AthleticsTab';
import './athlete.css'; // Ensure styles are applied globally
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast } from 'react-toastify';
import { IUpdateAthletePayload, getAthleteById, updateAthlete } from '../../../api/athlete';
import { IUserData } from '../../../auth/store';

export const AthleteProfile = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();
  const id = user?.id;

  const [athlete, setAthlete] = useState<IUpdateAthletePayload>({});
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
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

  const EditSaveButton = () => (
    <button
      className="float-right px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ml-2"
      onClick={editMode ? handleSaveClick : handleEditClick}
      disabled={loading}
      style={{ position: 'absolute', top: 24, right: 32 }}
    >
      {editMode ? (loading ? 'Saving...' : 'Save') : 'Edit'}
    </button>
  );

  const TABS = [
    {
      key: 'overview',
      label: 'Overview',
      component: (athlete: IUpdateAthletePayload) => (
        <OverviewTab
          athlete={athlete}
          editMode={editMode}
          EditSaveButton={EditSaveButton}
          setAthlete={setAthlete}
        />
      ),
    },
    {
      key: 'academic',
      label: 'Academic',
      component: (athlete: IUpdateAthletePayload) => (
        <AcademicsTab
          athlete={athlete}
          editMode={editMode}
          EditSaveButton={EditSaveButton}
          setAthlete={setAthlete}
        />
      ),
    },
    {
      key: 'athletic',
      label: 'Athletic',
      component: (athlete: IUpdateAthletePayload) => (
        <AthleticsTab
          athlete={athlete}
          editMode={editMode}
          EditSaveButton={EditSaveButton}
          setAthlete={setAthlete}
        />
      ),
    },
    // { key: 'resume', label: 'Resume', component: (athlete: IUpdateAthletePayload) => <ResumeTab athlete={athlete} editMode={editMode} EditSaveButton={EditSaveButton} setAthlete={setAthlete} /> },
    // { key: 'media', label: 'Media', component: (athlete: IUpdateAthletePayload) => <MediaTab athlete={athlete} editMode={editMode} EditSaveButton={EditSaveButton} setAthlete={setAthlete} /> },
  ];

  const currentTab = TABS.find((tab) => tab.key === activeTab);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 relative">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300">
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

      {/* Tab Content */}
      <div className="bg-white rounded-b-md shadow p-4 min-h-[400px] relative">
        {currentTab?.component(athlete)}
      </div>
    </div>
  );
};
