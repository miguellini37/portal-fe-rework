import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../auth/store';
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
  const user = useAuthUser<IUserData>();
  const id = user?.id;

  const [companyEmployee, setCompanyEmployee] = useState<IUpdateCompanyEmployeePayload>({});

  const fetchCompany = async () => {
    try {
      const companyEmployee = await getCompanyEmployeeById(id as string, authHeader);
      setCompanyEmployee(companyEmployee);
    } catch {
      toast.error('Failed to fetch profile');
    }
  };

  useEffect(() => {
    if (!id) return;
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
              value={companyEmployee?.firstName ?? ''}
              onChange={(e) =>
                setCompanyEmployee((prev) => ({ ...prev, firstName: e.target.value }))
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
              value={companyEmployee?.lastName ?? ''}
              onChange={(e) =>
                setCompanyEmployee((prev) => ({ ...prev, lastName: e.target.value }))
              }
              required
              className="form-input bg-gray-700 p-2 rounded w-full"
            />
          </div>

          {/* Company Dropdown */}
          <div className="md:col-span-2">
            <label htmlFor="company" className="block text-sm text-gray-300 mb-1">
              Company
            </label>
            <CompanyDropdown
              onChange={(e) => setCompanyEmployee((prev) => ({ ...prev, companyName: e?.value }))}
              selected={companyEmployee.companyName}
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
