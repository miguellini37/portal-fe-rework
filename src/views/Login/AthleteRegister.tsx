import { useState } from 'react';
import { createAthlete, ICreateAthletePayload } from '../../api/athlete';
import { useNavigate } from 'react-router-dom';

class AthleteProps {
  isCreate?: boolean;
}

export const AthleteRegister = ({ isCreate = false }: AthleteProps) => {
  const navigate = useNavigate();

  const [athlete, setAthlete] = useState<ICreateAthletePayload>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createAthlete(athlete as ICreateAthletePayload);
      navigate('/login');
    } catch (error) {
      console.error('Error creating athlete:', error);
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">Create Your Athlete Profile</h2>
        <p className="text-gray-400 mb-6">
          Fill out your details to join the Portal and unlock career opportunities.
        </p>
        <div className="absolute top-4 right-8 text-sm text-gray-400 text-right">
          <div>Not an athlete? Register as</div>
          <a href="/register/company" className="block text-blue-400 underline hover:text-blue-300">
            Company Employee
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
            value={athlete?.email}
            onChange={(e) => setAthlete((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Password"
            type="password"
            value={athlete?.password}
            onChange={(e) => setAthlete((prev) => ({ ...prev, password: e.target.value }))}
            required
            className="form-input"
          />

          {/* Name */}
          <input
            placeholder="First Name"
            value={athlete?.firstName}
            onChange={(e) => setAthlete((prev) => ({ ...prev, firstName: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Last Name"
            value={athlete?.lastName}
            onChange={(e) => setAthlete((prev) => ({ ...prev, lastName: e.target.value }))}
            required
            className="form-input"
          />

          {/* Athlete Info */}
          <input
            placeholder="Sport"
            value={athlete?.sport}
            onChange={(e) => setAthlete((prev) => ({ ...prev, sport: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Position"
            value={athlete?.position}
            onChange={(e) => setAthlete((prev) => ({ ...prev, position: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="School"
            value={athlete?.schoolName}
            onChange={(e) => setAthlete((prev) => ({ ...prev, schoolName: e.target.value }))}
            required
            className="form-input"
          />
          <input
            placeholder="Major"
            value={athlete?.major}
            onChange={(e) => setAthlete((prev) => ({ ...prev, major: e.target.value }))}
            required
            className="form-input"
          />
          <input
            type="number"
            step="0.1"
            placeholder="GPA"
            value={athlete?.gpa ?? ''}
            onChange={(e) =>
              setAthlete((prev) => ({ ...prev, gpa: e.target.value as unknown as number }))
            }
            required
            className="form-input"
          />
          <select
            value={athlete?.division}
            onChange={(e) => setAthlete((prev) => ({ ...prev, division: e.target.value }))}
            required
            className="form-select"
          >
            <option value="">Select Division</option>
            <option value="D1">D1</option>
            <option value="D2">D2</option>
            <option value="D3">D3</option>
          </select>

          {/* Extras */}
          <input
            placeholder="Accolades"
            value={athlete?.accolades}
            onChange={(e) => setAthlete((prev) => ({ ...prev, accolades: e.target.value }))}
            className="form-input"
          />
          <input
            placeholder="Team Role"
            value={athlete?.teamRole}
            onChange={(e) => setAthlete((prev) => ({ ...prev, teamRole: e.target.value }))}
            className="form-input"
          />
          <input
            placeholder="Graduation Date"
            value={athlete?.graduationDate}
            onChange={(e) => setAthlete((prev) => ({ ...prev, graduationDate: e.target.value }))}
            className="form-input"
          />

          {/* Stats */}
          <input
            type="textarea"
            placeholder="Stats"
            value={athlete?.statistics}
            onChange={(e) => setAthlete((prev) => ({ ...prev, statistics: e.target.value }))}
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
