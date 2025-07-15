import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ICreateUserInput, register } from '../../api/login';
import { ProfileTypeDropdown } from '../../components/ProfileTypeDropdown';
import { USER_PERMISSIONS } from '../../auth/store';
import { toast } from 'react-toastify';
import { CompanyDropdown } from '../../components/CompanyDropdown';
import { SchoolDropdown } from '../../components/SchoolDropdown';

export const Register = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const registerType = searchParams.get('type');

  const [user, setUser] = useState<ICreateUserInput>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.password !== user?.confirmPassword) {
      toast.error(`Passwords don't match`);
      return;
    }

    try {
      await register(user as ICreateUserInput);
      navigate('/login');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">Create Your user Profile</h2>
        <p className="text-gray-400 mb-6">
          Fill out your details to join the Portal and unlock career opportunities.
        </p>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <input
            placeholder="First Name"
            value={user?.firstName}
            onChange={(e) => setUser((prev) => ({ ...prev, firstName: e.target.value }))}
            required
            className="form-input"
            autoComplete="off"
          />

          <input
            placeholder="Last Name"
            value={user?.lastName}
            onChange={(e) => setUser((prev) => ({ ...prev, lastName: e.target.value }))}
            required
            className="form-input"
            autoComplete="off"
          />

          <input
            placeholder="Email"
            value={user?.email}
            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="form-input"
            autoComplete="off"
          />
          <ProfileTypeDropdown
            onChange={(e) => {
              setUser((prev) => ({ ...prev, permission: e?.value }));
              const newParams = new URLSearchParams(searchParams);
              newParams.set('type', e?.value as USER_PERMISSIONS);
              setSearchParams(newParams);
            }}
            selected={user?.permission ?? registerType ?? USER_PERMISSIONS.ATHLETE}
          />

          <input
            placeholder="Password"
            type="password"
            value={user?.password}
            onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
            required
            className="form-input"
            autoComplete="new-password"
          />

          <input
            placeholder="Confirm Password"
            type="password"
            value={user?.confirmPassword}
            onChange={(e) => setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            required
            className="form-input"
            autoComplete="new-password"
          />

          {registerType === USER_PERMISSIONS.COMPANY && <CompanyDropdown onChange={undefined} />}

          {(registerType === USER_PERMISSIONS.SCHOOL ||
            registerType === USER_PERMISSIONS.ATHLETE) && <SchoolDropdown onChange={undefined} />}
          <div className="relative flex items-center ml-2 group">
            <div className="bg-gray-300 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-0.5 w-56 p-2 rounded bg-gray-700 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              If you don't see your school (or company), then create it in the dropdown!
            </div>
          </div>

          <div className="col-span-full flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Submit Profile
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-500"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
