import { useEffect, useMemo, useState } from 'react';
import { getSchoolById, ISchoolPaylod, updateSchool } from '../../api/school';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthUser } from '../../auth/hooks';
import { useAuthHeader } from '../../auth/hooks';
import { toast } from 'react-toastify';
import './SchoolPage.css';

export const SchoolPage = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const user = useAuthUser();
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
    if (!id) {
      return;
    }
    fetchSchool();
  }, [id]);

  const canEditPage = useMemo(() => {
    return user?.id === school.ownerId;
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
    <div className="school-page">
      <div className="school-page__container">
        <h2 className="school-page__title">{school.schoolName || 'School'}</h2>
        <form onSubmit={onSubmit} className="school-page__form">
          {/* School Name */}
          <div className="school-page__form-group">
            <label htmlFor="schoolName" className="school-page__label">
              School Name
            </label>
            {canEditPage ? (
              <input
                id="schoolName"
                placeholder="School Name"
                value={school?.schoolName ?? ''}
                onChange={(e) => setSchool((prev) => ({ ...prev, schoolName: e.target.value }))}
                required
                className="school-page__input"
              />
            ) : (
              <p className="school-page__text">{school?.schoolName || 'Not Provided'}</p>
            )}
          </div>

          {/* Action Buttons */}
          {canEditPage && (
            <div className="school-page__actions">
              <button type="submit" className="btn-primary">
                Submit Profile
              </button>
              <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
