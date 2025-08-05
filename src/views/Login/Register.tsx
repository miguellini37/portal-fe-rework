import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ICreateUserInput, register } from '../../api/login';
import { ProfileTypeDropdown } from '../../components/Dropdowns/ProfileTypeDropdown';
import { USER_PERMISSIONS } from '../../auth/store';
import { toast } from 'react-toastify';
import { CompanyDropdown } from '../../components/Dropdowns/CompanyDropdown';
import { SchoolDropdown } from '../../components/Dropdowns/SchoolDropdown';
import './Form.css';

export const Register = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const registerType = searchParams.get('type') ?? 'athlete';
  const [user, setUser] = useState<ICreateUserInput>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.password !== user?.confirmPassword) {
      toast.error(`Passwords don't match`);
      return;
    }

    try {
      await register({ permission: registerType, ...user } as ICreateUserInput);
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <section className="form-center-section">
      <div className="form-container">
        <form name="registerForm" className="form" onSubmit={onSubmit}>
          <div className="form-header" style={{ marginBottom: '0px' }}>
            <h2 className="form-header">Create Your User Profile</h2>
            <p className="form-subtitle">
              Fill out your details to join the Portal and unlock career opportunities.
            </p>
          </div>

          <div className="double-form-field-wrap">
            <div className="form-field">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={user?.firstName || ''}
                onChange={(e) => setUser((prev) => ({ ...prev, firstName: e.target.value }))}
                required
                className="form-input"
                autoComplete="given-name"
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={user?.lastName || ''}
                onChange={(e) => setUser((prev) => ({ ...prev, lastName: e.target.value }))}
                required
                className="form-input"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={user?.email || ''}
              onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
              required
              className="form-input"
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="profileType">
              Profile Type
            </label>
            <ProfileTypeDropdown
              id="profileType"
              onChange={(e) => {
                setUser((prev) => ({ ...prev, permission: e?.value }));
                const newParams = new URLSearchParams(searchParams);
                newParams.set('type', e?.value as USER_PERMISSIONS);
                setSearchParams(newParams);
              }}
              selected={user?.permission ?? registerType ?? USER_PERMISSIONS.ATHLETE}
            />
          </div>

          <div className="double-form-field-wrap">
            <div className="form-field">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={user?.password || ''}
                onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                required
                className="form-input"
                autoComplete="new-password"
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={user?.confirmPassword || ''}
                onChange={(e) => setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                required
                className="form-input"
                autoComplete="new-password"
              />
            </div>
          </div>

          {registerType === USER_PERMISSIONS.COMPANY && (
            <div className="form-field">
              <label className="form-label" htmlFor="companyDropdown">
                <span className="label-with-icon">
                  Company
                  <div className="tooltip-container">
                    <div className="tooltip-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tooltip-svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="16"
                        height="16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                      </svg>
                    </div>
                    <div className="tooltip-text">
                      If you don't see your company then create it in the dropdown!
                    </div>
                  </div>
                </span>
              </label>
              <CompanyDropdown
                id="companyDropdown"
                onChange={(e) => setUser((prev) => ({ ...prev, companyName: e?.label }))}
              />
            </div>
          )}

          {(registerType === USER_PERMISSIONS.SCHOOL ||
            registerType === USER_PERMISSIONS.ATHLETE) && (
            <div className="form-field">
              <label className="form-label" htmlFor="companyDropdown">
                <span className="label-with-icon">
                  School
                  <div className="tooltip-container">
                    <div className="tooltip-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tooltip-svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="16"
                        height="16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                      </svg>
                    </div>
                    <div className="tooltip-text">
                      If you don't see your school then create it in the dropdown!
                    </div>
                  </div>
                </span>
              </label>
              <SchoolDropdown
                id="schoolDropdown"
                onChange={(e) => setUser((prev) => ({ ...prev, schoolName: e?.label }))}
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="form-button primary" style={{ padding: '14px 10px' }}>
              Submit Profile
            </button>
            <button
              type="button"
              className="form-button secondary"
              style={{ padding: '14px 10px', marginLeft: '10px' }}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
