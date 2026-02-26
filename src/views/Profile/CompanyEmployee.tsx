import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from '../../auth/hooks';
import { useAuthUser } from '../../auth/hooks';
import { toast } from 'react-toastify';
import { CompanyDropdown } from '../../components/Dropdowns/CompanyDropdown';
import {
  getCompanyEmployeeById,
  IUpdateCompanyEmployeePayload,
  updateCompanyEmployee,
} from '../../api/companyEmployee';
import './Profiles.css';
import { AccountDeniedBanner } from '../../components/AccountDeniedBanner';

export const CompanyEmployeeProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const user = useAuthUser();
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
    <div className="profile-container">
      <AccountDeniedBanner />

      <h2 className="profile-title">Edit Your Profile</h2>
      <form onSubmit={onSubmit} className="profile-form">
        <div>
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            value={companyEmployee?.firstName ?? ''}
            disabled
            className="form-control"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            value={companyEmployee?.lastName ?? ''}
            disabled
            className="form-control"
          />
        </div>

        <div className="full-width">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <CompanyDropdown
            onChange={(e) => setCompanyEmployee((prev) => ({ ...prev, companyId: e?.value }))}
            selected={companyEmployee.companyId}
            disabled
          />
        </div>

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
