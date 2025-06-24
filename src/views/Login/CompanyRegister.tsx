import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompany, ICreateCompanyPayload } from '../../api/company';

export const CompanyRegister = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: ICreateCompanyPayload = {
      email,
      password,
      companyName,
      industry,
    };

    try {
      await createCompany(payload);
      navigate('/login');
    } catch (error) {
      console.error('Error creating athlete:', error);
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">Create Your Company Profile</h2>
        <p className="text-gray-400 mb-6">
          Fill out your details to join the Portal and unlock hiring opportunities.
        </p>
        <div className="absolute top-4 right-8 text-sm text-gray-400 text-right">
          <div>Not a company? Register as</div>
          <a href="/register/athlete" className="block text-blue-400 underline hover:text-blue-300">
            Athlete
          </a>
          <a href="/register/school" className="block text-blue-400 underline hover:text-blue-300">
            School
          </a>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Auth fields */}
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />

          {/* Name */}
          <input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="form-input"
          />
          <input
            placeholder="Industry Preference"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="form-input"
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
