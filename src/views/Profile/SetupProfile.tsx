import React, { useState } from 'react';
import { useAuthHeader, useAuthUser, USER_PERMISSIONS } from '../../auth/hooks';
import { createProfile, ICreateUserInput } from '../../api/profile';
import { SchoolDropdown } from '../../components/Dropdowns/SchoolDropdown';
import { CompanyDropdown } from '../../components/Dropdowns/CompanyDropdown';
import { ProfileTypeDropdown } from '../../components/Dropdowns/ProfileTypeDropdown';

export const SetupProfile: React.FC = () => {
  const user = useAuthUser();
  const authHeader = useAuthHeader();

  const [profile, setProfile] = useState<ICreateUserInput>({
    permission: USER_PERMISSIONS.ATHLETE,
  });

  const submitProfile = async () => {
    await createProfile(authHeader, profile);
    window.location.reload();
  };

  return (
    <div className="overview-grid overview-tab-container">
      {/* Personal Information */}
      <div className="personal-info card">
        <h2 className="section-title">Setup Profile</h2>

        <div className="info-row">
          <div className="info-fields">
            <div className="two-column">
              <div className="field">
                <label>First Name</label>
                <input
                  type="text"
                  className="first-name"
                  value={user?.firstName || ''}
                  readOnly
                  tabIndex={-1}
                />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input
                  type="text"
                  className="last-name"
                  value={user?.lastName || ''}
                  readOnly
                  tabIndex={-1}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="text"
                  className="email"
                  value={user?.email || ''}
                  readOnly
                  tabIndex={-1}
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="profileType">
                  Profile Type
                </label>
                <ProfileTypeDropdown
                  id="profileType"
                  onChange={(e) => {
                    setProfile((prev) => ({ ...prev, permission: e?.value }));
                  }}
                  selected={profile?.permission}
                />
              </div>

              {profile.permission === USER_PERMISSIONS.COMPANY && (
                <div className="form-field">
                  <label className="form-label" htmlFor="companyDropdown">
                    Company
                  </label>
                  <CompanyDropdown
                    id="companyDropdown"
                    onChange={(e) => setProfile((prev) => ({ ...prev, companyId: e?.value }))}
                  />
                </div>
              )}

              {(profile.permission === USER_PERMISSIONS.SCHOOL ||
                profile.permission === USER_PERMISSIONS.ATHLETE) && (
                <div className="form-field">
                  <label className="form-label" htmlFor="companyDropdown">
                    School
                  </label>
                  <SchoolDropdown
                    id="schoolDropdown"
                    onChange={(e) => setProfile((prev) => ({ ...prev, schoolId: e?.value }))}
                  />
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ marginLeft: '40px', marginTop: '20px' }}
                  onClick={() => {
                    submitProfile();
                  }}
                >
                  Create Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
