import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../auth/store';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getSchoolEmployeeById,
  IUpdateSchoolEmployeePayload,
  updateSchoolEmployee,
} from '../../api/schoolEmployee';
import { SchoolDropdown } from '../../components/SchoolDropdown';

export const SchoolProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();
  const id = user?.id;

  const [schoolEmployee, setSchoolEmployee] = useState<IUpdateSchoolEmployeePayload>({});

  const fetchSchool = async () => {
    try {
      const schoolEmployee = await getSchoolEmployeeById(id as string, authHeader);
      setSchoolEmployee(schoolEmployee);
    } catch {
      toast.error('Failed to load profile');
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchSchool();
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateSchoolEmployee(schoolEmployee, authHeader);
      toast.success('Profile updated successfully');
    } catch {
      toast.success('Failed to update profile');
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">Edit Your Profile</h2>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm text-gray-300 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              value={schoolEmployee?.firstName ?? ''}
              onChange={(e) =>
                setSchoolEmployee((prev) => ({ ...prev, firstName: e.target.value }))
              }
              required
              className="form-input bg-gray-700 p-2 rounded w-full"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm text-gray-300 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              value={schoolEmployee?.lastName ?? ''}
              onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, lastName: e.target.value }))}
              required
              className="form-input bg-gray-700 p-2 rounded w-full"
            />
          </div>

          {/* Company Dropdown */}
          <div className="md:col-span-2">
            <label htmlFor="company" className="block text-sm text-gray-300 mb-1">
              Company
            </label>
            <SchoolDropdown
              onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, companyName: e?.value }))}
              selected={schoolEmployee.schoolRef?.id}
              disabled
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4 mt-4">
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
