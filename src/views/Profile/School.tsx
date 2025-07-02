import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../api/store';
import { SchoolDropdown } from '../../components/SchoolDropdown';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getSchoolEmployeeById,
  IUpdateSchoolEmployeePayload,
  updateSchoolEmployee,
} from '../../api/schoolEmployee';

export const SchoolProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { id } = useAuthUser<IUserData>() as IUserData;

  const [schoolEmployee, setSchoolEmployee] = useState<IUpdateSchoolEmployeePayload>({});

  const fetchSchool = async () => {
    try {
      const schoolEmployee = await getSchoolEmployeeById(id, authHeader);
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
        <h2 className="text-4xl font-bold mb-2">Edit Your School Employee Profile</h2>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Auth fields */}
          {/* <input
            placeholder="Email"
            value={schoolEmployee?.email}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="form-input"
            disabled
          />
          <input
            placeholder="Password"
            type="password"
            value={schoolEmployee?.password}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, password: e.target.value }))}
            required
            className="form-input"
            disabled
          /> */}

          {/* Name */}
          <input
            placeholder="First Name"
            value={schoolEmployee?.firstName}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, firstName: e.target.value }))}
            required
            className="form-input"
            disabled
          />
          <input
            placeholder="Last Name"
            value={schoolEmployee?.lastName}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, lastName: e.target.value }))}
            required
            className="form-input"
            disabled
          />

          <SchoolDropdown
            selected={schoolEmployee.schoolName}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, schoolName: e?.value }))}
            disabled
          />

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
