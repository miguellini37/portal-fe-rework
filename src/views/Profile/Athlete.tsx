import { useEffect, useState } from 'react';
import { getAthleteById, IUpdateAthletePayload, updateAthlete } from '../../api/athlete';
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../api/store';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';

export const AthleteProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { id } = useAuthUser<IUserData>() as IUserData;

  const [athlete, setAthlete] = useState<IUpdateAthletePayload>({});

  const fetchAthlete = async () => {
    try {
      const athlete = await getAthleteById(Number(id), authHeader);
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
      toast.success('Profile updated succesfully');
    } catch {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-2">Create Your Athlete Profile</h2>
      <p className="text-gray-400 mb-6">
        Fill out your details to join the Portal and unlock career opportunities.
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Athlete Info */}
        <input
          placeholder="Sport"
          value={athlete.sport ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, sport: e.target.value }))}
          required
          className="form-input"
        />
        <input
          placeholder="Position"
          value={athlete.position ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, position: e.target.value }))}
          required
          className="form-input"
        />
        <input
          placeholder="School"
          value={athlete.school ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, school: e.target.value }))}
          required
          className="form-input"
        />
        <input
          placeholder="Major"
          value={athlete.major ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, major: e.target.value }))}
          required
          className="form-input"
        />
        <input
          type="number"
          step="0.1"
          placeholder="GPA"
          value={athlete.gpa ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, gpa: parseFloat(e.target.value) }))}
          required
          className="form-input"
        />
        <select
          value={athlete.division ?? ''}
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
          value={athlete.accolades ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, accolades: e.target.value }))}
          className="form-input"
        />
        <input
          placeholder="Team Role"
          value={athlete.teamRole ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, teamRole: e.target.value }))}
          className="form-input"
        />
        <input
          placeholder="Coachability"
          value={athlete.coachability ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, coachability: e.target.value }))}
          className="form-input"
        />
        <input
          placeholder="Industry Preference"
          value={athlete.industry ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, industry: e.target.value }))}
          className="form-input"
        />
        <input
          placeholder="Graduation Date"
          value={athlete.graduationDate ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, graduationDate: e.target.value }))}
          className="form-input"
        />

        {/* Stats */}
        <input
          type="number"
          placeholder="Points Per Game"
          value={athlete.points ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, points: parseFloat(e.target.value) }))}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Assists Per Game"
          value={athlete.assists ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, assists: parseFloat(e.target.value) }))}
          className="form-input"
        />

        {/* Work Experience */}
        <input
          placeholder="Job Title"
          value={athlete.jobTitle ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, jobTitle: e.target.value }))}
          className="form-input"
        />
        <input
          placeholder="Company"
          value={athlete.company ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, company: e.target.value }))}
          className="form-input"
        />
        <input
          placeholder="Location"
          value={athlete.location ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, location: e.target.value }))}
          className="form-input"
        />
        <textarea
          placeholder="Internship/Job Description"
          value={athlete.description ?? ''}
          onChange={(e) => setAthlete((prev) => ({ ...prev, description: e.target.value }))}
          className="form-textarea md:col-span-2"
          rows={4}
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
