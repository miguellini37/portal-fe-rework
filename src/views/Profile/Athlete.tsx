import { useEffect, useState } from 'react';
import { getAthleteById, IUpdateAthletePayload, updateAthlete } from '../../api/athlete';
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../auth/store';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { SchoolDropdown } from '../../components/Dropdowns/SchoolDropdown';

export const AthleteProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();
  const id = user?.id;

  const [athlete, setAthlete] = useState<IUpdateAthletePayload>({});

  const fetchAthlete = async () => {
    try {
      const athlete = await getAthleteById(id as string, authHeader);
      setAthlete(athlete);
    } catch {
      toast.error('Failed to fetch profile');
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchAthlete();
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateAthlete(athlete, authHeader);
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="ProfileSetup">
      <h2 className="text-3xl font-bold mb-4 m0-4">
        {`Edit Your Athlete Profile | ${athlete?.firstName} ${athlete?.lastName}`}
      </h2>
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto"
        style={{ width: '100%' }}
      >
        {/* Athlete Info */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Sport</label>
          <input
            value={athlete?.sport ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, sport: e.target.value }))}
            required
            className="form-input w-full bg-gray-700 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Position</label>
          <input
            value={athlete?.position ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, position: e.target.value }))}
            required
            className="form-input w-full bg-gray-700 p-2 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-300 mb-1">School</label>
          <SchoolDropdown
            selected={athlete.schoolRef?.id}
            onChange={(e) => setAthlete((prev) => ({ ...prev, schoolId: e?.value }))}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Major</label>
          <input
            value={athlete?.major ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, major: e.target.value }))}
            required
            className="form-input w-full bg-gray-700 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">GPA</label>
          <input
            type="number"
            step="0.1"
            value={athlete?.gpa ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, gpa: parseFloat(e.target.value) }))}
            required
            className="form-input w-full bg-gray-700 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Division</label>
          <select
            value={athlete?.division ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, division: e.target.value }))}
            required
            className="form-select w-full bg-gray-700 p-2 rounded"
          >
            <option value="">Select Division</option>
            <option value="D1">D1</option>
            <option value="D2">D2</option>
            <option value="D3">D3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Accolades</label>
          <input
            value={athlete?.accolades ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, accolades: e.target.value }))}
            className="form-input w-full bg-gray-700 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Team Role</label>
          <input
            value={athlete?.teamRole ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, teamRole: e.target.value }))}
            className="form-input w-full bg-gray-700 p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Graduation Date</label>
          <input
            value={athlete?.graduationDate ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, graduationDate: e.target.value }))}
            className="form-input w-full bg-gray-700 p-2 rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-300 mb-1">Statistics</label>
          <textarea
            value={athlete?.statistics ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, statistics: e.target.value }))}
            className="form-input w-full bg-gray-700 p-2 rounded min-h-[100px]"
          />
        </div>

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
  );
};
