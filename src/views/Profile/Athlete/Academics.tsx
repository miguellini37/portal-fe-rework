import React from 'react';

import { IUpdateAthletePayload } from '../../../api/athlete';
import { SchoolDropdown } from '../../../components/Dropdowns/SchoolDropdown';
import { MajorDropdown } from '../../../components/Dropdowns/MajorDropdown';

interface AcademicsTabProps {
  athlete: IUpdateAthletePayload;
  editMode: boolean;
  setAthlete: React.Dispatch<React.SetStateAction<IUpdateAthletePayload>>;
}

export const AcademicsTab: React.FC<AcademicsTabProps> = ({ athlete, editMode, setAthlete }) => {
  const academics = athlete.academics || {};
  return (
    <div className="academic-tab-container card">
      <h2 className="academic-section-title">
        <span className="icon" role="img" aria-label="Academic Cap">
          🎓
        </span>
        Academic Information
      </h2>
      <div className="academic-grid">
        <div className="academic-field">
          <div className="academic-label">University</div>
          <div className="academic-value">
            {editMode ? (
              <SchoolDropdown
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    schoolId: e?.value,
                  }))
                }
                selected={athlete.schoolRef?.id}
              />
            ) : (
              (athlete.schoolRef?.schoolName ?? <span className="academic-placeholder-mock" />)
            )}
          </div>
        </div>
        <div className="academic-field">
          <div className="academic-label">Major</div>
          <div className="academic-value">
            {editMode ? (
              <MajorDropdown
                selected={academics.major || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    academics: { ...a.academics, major: e?.value },
                  }))
                }
              />
            ) : (
              academics.major || <span className="academic-placeholder-mock" />
            )}
          </div>
        </div>
        <div className="academic-field">
          <div className="academic-label">Minor (Optional)</div>
          <div className="academic-value">
            {editMode ? (
              <MajorDropdown
                selected={academics.minor || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    academics: { ...a.academics, minor: e?.value },
                  }))
                }
              />
            ) : (
              academics.minor || <span className="academic-placeholder-mock" />
            )}
          </div>
        </div>
        <div className="academic-field">
          <div className="academic-label">GPA</div>
          <div className="academic-value">
            {editMode ? (
              <input
                className="academic-input"
                type="number"
                step="0.01"
                value={academics.gpa ?? ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    academics: {
                      ...a.academics,
                      gpa: e.target.value === '' ? undefined : parseFloat(e.target.value),
                    },
                  }))
                }
              />
            ) : (
              academics.gpa?.toString() || <span className="academic-placeholder-mock" />
            )}
          </div>
        </div>
        <div className="academic-field">
          <div className="academic-label">Expected Graduation</div>
          <div className="academic-value">
            {editMode ? (
              <input
                className="academic-input"
                type="date"
                value={academics.graduationDate || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    academics: { ...a.academics, graduationDate: e.target.value },
                  }))
                }
              />
            ) : (
              academics.graduationDate || <span className="academic-placeholder-mock" />
            )}
          </div>
        </div>
        {/* <div className="academic-field">
          <div className="academic-label">Class Rank (Optional)</div>
          <div className="academic-value">No classRank in BE, leave blank or remove</div>
        </div> */}
        <div className="academic-field academic-field-full">
          <div className="academic-label">Academic Honors & Awards</div>
          <div className="academic-value">
            {editMode ? (
              <textarea
                className="academic-textarea"
                value={academics.awards || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    academics: { ...a.academics, awards: e.target.value },
                  }))
                }
                placeholder=" "
              />
            ) : (
              <textarea
                className="academic-textarea"
                value={academics.awards || ''}
                disabled
                placeholder=" "
              />
            )}
          </div>
        </div>
        <div className="academic-field academic-field-full">
          <div className="academic-label">Relevant Coursework</div>
          <div className="academic-value">
            {editMode ? (
              <textarea
                className="academic-textarea"
                value={academics.coursework || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    academics: { ...a.academics, coursework: e.target.value },
                  }))
                }
                placeholder=" "
              />
            ) : (
              <textarea
                className="academic-textarea"
                value={academics.coursework || ''}
                disabled
                placeholder=" "
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
