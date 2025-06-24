import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanyById, IUpdateCompanyPayload, updateCompany } from '../../api/company';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../api/store';
import { toast } from 'react-toastify';

export const CompanyProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { id } = useAuthUser<IUserData>() as IUserData;

  const [company, setCompany] = useState<IUpdateCompanyPayload>({});

  const fetchCompany = async () => {
    try {
      const company = await getCompanyById(Number(id), authHeader);
      setCompany(company);
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
      await updateCompany(company, authHeader);
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-2">Create Your Company Profile</h2>
      <p className="text-gray-400 mb-6">
        Fill out your details to join the Portal and unlock hiring opportunities.
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          placeholder="Company Name"
          value={company.companyName ?? ''}
          onChange={(e) => setCompany((prev) => ({ ...prev, companyName: e.target.value }))}
          required
          className="form-input"
        />

        <input
          placeholder="Industry Preference"
          value={company.industry ?? ''}
          onChange={(e) => setCompany((prev) => ({ ...prev, industry: e.target.value }))}
          className="form-input"
        />

        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Save Profile
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
  );
};
