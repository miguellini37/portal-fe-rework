import { useEffect, useMemo, useState } from 'react';
import { OverviewTab } from './Overview';
import './company.css'; // Ensure styles are applied globally
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast } from 'react-toastify';
import { IUserData } from '../../../auth/store';
import { useParams } from 'react-router-dom';
import { ICompanyPaylod, getCompanyById, updateCompany } from '../../../api/company';
import { IUpdateCompanyEmployeePayload } from '../../../api/companyEmployee';
import { CultureTab } from './Culture';
import { BenefitsTab } from './Benefits';
import { RecruitingTab } from './Recruiting';
import { AnalyticsTab } from './Analytics';

export const CompanyProfile = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();
  const { id } = useParams<{ id: string }>();

  const [company, setCompany] = useState<ICompanyPaylod>({});
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  const fetchCompany = async () => {
    try {
      const company = await getCompanyById(id as string, authHeader);
      setCompany(company);
    } catch {
      toast.error('Failed to fetch company');
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchCompany();
  }, [id]);

  const canEditPage = useMemo(() => {
    return user?.id === company.ownerRefId;
  }, [user, company]);

  const handleEditClick = () => setEditMode(true);
  const handleSaveClick = async () => {
    setLoading(true);
    try {
      await updateCompany(company, authHeader);
      toast.success('Company updated successfully');
      setEditMode(false);
    } catch {
      toast.error('Error updating company');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = async () => {
    if (!id) return;
    try {
      const refreshedData = await getCompanyById(id as string, authHeader);
      setCompany(refreshedData);
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
      component: (company: IUpdateCompanyEmployeePayload) => (
        <OverviewTab company={company} editMode={editMode} setCompany={setCompany} />
      ),
    },
    {
      key: 'culture',
      label: 'Culture',
      component: (company: IUpdateCompanyEmployeePayload) => (
        <CultureTab company={company} editMode={editMode} setCompany={setCompany} />
      ),
    },
    {
      key: 'benefits',
      label: 'Benefits',
      component: (company: IUpdateCompanyEmployeePayload) => (
        <BenefitsTab company={company} editMode={editMode} setCompany={setCompany} />
      ),
    },
    {
      key: 'recruiting',
      label: 'Recruiting',
      component: (company: IUpdateCompanyEmployeePayload) => (
        <RecruitingTab company={company} editMode={editMode} setCompany={setCompany} />
      ),
    },
    {
      key: 'analytics',
      label: 'Analytics',
      component: (company: IUpdateCompanyEmployeePayload) => (
        <AnalyticsTab company={company} editMode={editMode} setCompany={setCompany} />
      ),
    },
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
      <div className="m-4 min-h-[400px] relative">{currentTab?.component(company)}</div>
    </div>
  );
};
