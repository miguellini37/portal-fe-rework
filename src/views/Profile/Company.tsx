import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../api/store';
import { toast } from 'react-toastify';
import { CompanyDropdown } from '../../components/CompanyDropdown';
import {
  getCompanyEmployeeById,
  IUpdateCompanyEmployeePayload,
  updateCompanyEmployee,
} from '../../api/companyEmployee';

export const CompanyProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { id } = useAuthUser<IUserData>() as IUserData;

  const [companyEmployee, setCompanyEmployee] = useState<IUpdateCompanyEmployeePayload>({});

  const fetchCompany = async () => {
    try {
      const companyEmployee = await getCompanyEmployeeById(id, authHeader);
      setCompanyEmployee(companyEmployee);
    } catch {
      toast.error('Failed to fetch profile');
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchCompany();
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateCompanyEmployee(companyEmployee, authHeader);
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">Edit Your Company Employee Profile</h2>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Auth fields */}
          {/* <input
            placeholder="Email"
            value={companyEmployee?.email}
            onChange={(e) => setCompanyEmployee((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={companyEmployee?.password}
            onChange={(e) => setCompanyEmployee((prev) => ({ ...prev, password: e.target.value }))}
            required
            className="form-input"
          /> */}

          {/* Name */}
          <input
            placeholder="First Name"
            value={companyEmployee?.firstName}
            onChange={(e) => setCompanyEmployee((prev) => ({ ...prev, firstName: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Last Name"
            value={companyEmployee?.lastName}
            onChange={(e) => setCompanyEmployee((prev) => ({ ...prev, lastName: e.target.value }))}
            required
            className="form-input"
          />

          <CompanyDropdown
            onChange={(e) => setCompanyEmployee((prev) => ({ ...prev, companyName: e?.value }))}
            disabled
            selected={companyEmployee.companyName}
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
