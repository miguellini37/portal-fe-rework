import { useEffect, useMemo, useState } from 'react';
import { getSchoolById, ISchoolPaylod, updateSchool } from '../api/school';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../auth/store';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';

export const SchoolPage = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();
  const { id } = useParams<{ id: string }>();

  const [school, setSchool] = useState<ISchoolPaylod>({});

  const fetchSchool = async () => {
    try {
      const school = await getSchoolById(id as string, authHeader);
      setSchool(school);
    } catch {
      toast.error('Failed to fetch school');
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchSchool();
  }, [id]);

  const canEditPage = useMemo(() => {
    return user?.schoolRef?.ownerRefId === school.ownerRefId;
  }, [user, school]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateSchool(school, authHeader);
      toast.success('School updated successfully');
    } catch {
      toast.error('Error updating school');
    }
  };

  return (
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">{school.schoolName || 'School'}</h2>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* School Name */}
          <div>
            <label className="block text-sm font-medium mb-1">School Name</label>
            {canEditPage ? (
              <input
                placeholder="School Name"
                value={school?.schoolName ?? ''}
                onChange={(e) => setSchool((prev) => ({ ...prev, schoolName: e.target.value }))}
                required
                className="form-input w-full"
              />
            ) : (
              <p className="text-lg">{school?.schoolName || 'Not Provided'}</p>
            )}
          </div>

          {/* Action Buttons */}
          {canEditPage && (
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
          )}
        </form>
      </div>
    </div>
  );
};
