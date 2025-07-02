import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSchoolEmployee, ICreateSchoolEmployeePayload } from '../../api/schoolEmployee';
import { SchoolDropdown } from '../../components/SchoolDropdown';

export const SchoolRegister = () => {
  const navigate = useNavigate();

  const [schoolEmployee, setSchoolEmployee] = useState<ICreateSchoolEmployeePayload>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createSchoolEmployee(schoolEmployee as ICreateSchoolEmployeePayload);
      navigate('/login');
    } catch (error) {
      console.error('Error creating school employee:', error);
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">Create Your School Employee Profile</h2>
        <p className="text-gray-400 mb-6">
          Fill out your details to join the Portal and unlock opportunities for your students.
        </p>
        <div className="absolute top-4 right-8 text-sm text-gray-400 text-right">
          <div>Not a School Employee? Register as</div>
          <a href="/register/company" className="block text-blue-400 underline hover:text-blue-300">
            Company Employee
          </a>
          <a
            href="/register/schoolEmployee"
            className="block text-blue-400 underline hover:text-blue-300"
          >
            Athlete
          </a>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Auth fields */}
          <input
            placeholder="Email"
            value={schoolEmployee?.email}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={schoolEmployee?.password}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, password: e.target.value }))}
            required
            className="form-input"
          />

          {/* Name */}
          <input
            placeholder="First Name"
            value={schoolEmployee?.firstName}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, firstName: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Last Name"
            value={schoolEmployee?.lastName}
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, lastName: e.target.value }))}
            required
            className="form-input"
          />

          <SchoolDropdown
            onChange={(e) => setSchoolEmployee((prev) => ({ ...prev, schoolName: e?.value }))}
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
