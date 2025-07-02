import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompanyEmployee, ICreateCompanyEmployeePayload } from '../../api/companyEmployee';
import { CompanyDropdown } from '../../components/CompanyDropdown';

export const CompanyRegister = () => {
  const navigate = useNavigate();

  const [companyEmployee, setCompanyEmployee] = useState<ICreateCompanyEmployeePayload>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createCompanyEmployee(companyEmployee as ICreateCompanyEmployeePayload);
      navigate('/login');
    } catch (error) {
      console.error('Error creating athlete:', error);
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">Create Your Company Employee Profile</h2>
        <p className="text-gray-400 mb-6">
          Fill out your details to join the Portal and unlock hiring opportunities.
        </p>
        <div className="absolute top-4 right-8 text-sm text-gray-400 text-right">
          <div>Not a company? Register as</div>
          <a href="/register/athlete" className="block text-blue-400 underline hover:text-blue-300">
            Athlete
          </a>
          <a href="/register/school" className="block text-blue-400 underline hover:text-blue-300">
            School Employee
          </a>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Auth fields */}
          <input
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
          />

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
