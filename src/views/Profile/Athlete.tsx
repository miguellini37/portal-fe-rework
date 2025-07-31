import { useEffect, useState } from 'react';
import { getAthleteById, IUpdateAthletePayload, updateAthlete } from '../../api/athlete';
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../auth/store';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { SchoolDropdown } from '../../components/Dropdowns/SchoolDropdown';
import './Profiles.css';

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
    if (!id) return;
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
    <div className="profile-container">
      <h2 className="profile-title">{`Edit Your Athlete Profile`}</h2>
      <form onSubmit={onSubmit} className="profile-form">
        <div>
          <label className="form-label">Sport</label>
          <input
            value={athlete?.sport ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, sport: e.target.value }))}
            required
            className="form-control"
          />
        </div>

        <div>
          <label className="form-label">Position</label>
          <input
            value={athlete?.position ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, position: e.target.value }))}
            required
            className="form-control"
          />
        </div>

        <div className="full-width">
          <label className="form-label">School</label>
          <SchoolDropdown
            selected={athlete.schoolRef?.id}
            onChange={(e) => setAthlete((prev) => ({ ...prev, schoolId: e?.value }))}
          />
        </div>

        <div>
          <label className="form-label">Major</label>
          <input
            value={athlete?.major ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, major: e.target.value }))}
            required
            className="form-control"
          />
        </div>

        <div>
          <label className="form-label">GPA</label>
          <input
            type="number"
            step="0.1"
            value={athlete?.gpa ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, gpa: parseFloat(e.target.value) }))}
            required
            className="form-control"
          />
        </div>

        <div>
          <label className="form-label">Division</label>
          <select
            value={athlete?.division ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, division: e.target.value }))}
            required
            className="form-control"
          >
            <option value="">Select Division</option>
            <option value="D1">D1</option>
            <option value="D2">D2</option>
            <option value="D3">D3</option>
          </select>
        </div>

        <div>
          <label className="form-label">Accolades</label>
          <input
            value={athlete?.accolades ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, accolades: e.target.value }))}
            className="form-control"
          />
        </div>

        <div>
          <label className="form-label">Team Role</label>
          <input
            value={athlete?.teamRole ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, teamRole: e.target.value }))}
            className="form-control"
          />
        </div>

        <div>
          <label className="form-label">Graduation Date</label>
          <input
            value={athlete?.graduationDate ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, graduationDate: e.target.value }))}
            className="form-control"
          />
        </div>

        <div className="full-width">
          <label className="form-label">Statistics</label>
          <textarea
            value={athlete?.statistics ?? ''}
            onChange={(e) => setAthlete((prev) => ({ ...prev, statistics: e.target.value }))}
            className="form-control min-height"
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
