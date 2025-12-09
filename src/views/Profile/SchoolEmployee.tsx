import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from '../../auth/hooks';
import { useAuthUser } from '../../auth/hooks';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getSchoolEmployeeById,
  IUpdateSchoolEmployeePayload,
  updateSchoolEmployee,
} from '../../api/schoolEmployee';
import { SchoolDropdown } from '../../components/Dropdowns/SchoolDropdown';
import './Profiles.css';
import { AccountDeniedBanner } from '../../components/AccountDeniedBanner';

export const SchoolEmployeeProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const user = useAuthUser();
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
    <div className="profile-container">
      <AccountDeniedBanner />

      <h2 className="profile-title">Edit Your Profile</h2>
      <form onSubmit={onSubmit} className="profile-form">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            value={schoolEmployee?.firstName ?? ''}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, firstName: e.target.value }))}
            required
            className="form-control w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            value={schoolEmployee?.lastName ?? ''}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, lastName: e.target.value }))}
            required
            className="form-control w-full"
          />
        </div>

        {/* School Dropdown */}
        <div className="full-width">
          <label htmlFor="School" className="form-label">
            School
          </label>
          <SchoolDropdown
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, schoolId: e?.value }))}
            selected={schoolEmployee.school?.id}
            disabled={user?.isOrgVerified}
          />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Submit Profile
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
