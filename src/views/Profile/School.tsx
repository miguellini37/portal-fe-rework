import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSchoolById, IUpdateSchoolPayload, updateSchool } from '../../api/school';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../api/store';
import { toast } from 'react-toastify';

export const SchoolProfile = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { id } = useAuthUser<IUserData>() as IUserData;

  const [school, setSchool] = useState<IUpdateSchoolPayload>({});

  const fetchSchool = async () => {
    try {
      const school = await getSchoolById(Number(id), authHeader);
      setSchool(school);
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
      await updateSchool(school, authHeader);
      toast.success('Profile updated successfully');
    } catch {
      toast.success('Failed to update profile');
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-2">Create Your School Profile</h2>
      <p className="text-gray-400 mb-6">
        Fill out your details to join the Portal and unlock opportunities for your students.
      </p>

      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          placeholder="School Name"
          value={school.schoolName ?? ''}
          onChange={(e) => setSchool((prev) => ({ ...prev, schoolName: e.target.value }))}
          required
          className="form-input"
          style={{ width: '400px' }}
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
