import React, { JSX } from 'react';

import { IUpdateAthletePayload } from '../../../api/athlete';
import { isNil } from 'lodash';

interface OverviewTabProps {
  athlete: IUpdateAthletePayload;
  editMode: boolean;
  setAthlete: React.Dispatch<React.SetStateAction<IUpdateAthletePayload>>;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ athlete, editMode, setAthlete }) => {
  const skills = [
    'Leadership',
    'Team Collaboration',
    'Time Management',
    'Communication',
    'Problem Solving',
    'Adaptability',
    'Work Ethic',
    'Goal Setting',
  ];
  const initials = `${athlete.firstName?.[0] || ''}${athlete.lastName?.[0] || ''}`.toUpperCase();

  // Recursively count all fields and filled fields
  const countFields = (obj: any): { total: number; filled: number } => {
    if (typeof obj !== 'object' || obj === null) return { total: 0, filled: 0 };
    let total = 0;
    let filled = 0;
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        const nested = countFields(value);
        total += nested.total;
        filled += nested.filled;
      } else {
        total += 1;
        if (!isNil(value) && value !== '') filled += 1;
      }
    }
    return { total, filled };
  };

  const getProfileCompletion = (
    fields: Partial<IUpdateAthletePayload>
  ): { colorClassName: string; percentComplete: number } => {
    const { total, filled } = countFields(fields);
    if (total === 0) {
      return { colorClassName: 'incomplete', percentComplete: 0 };
    }
    const percentComplete = Math.round((filled / total) * 100);
    if (percentComplete === 100) {
      return { colorClassName: 'complete', percentComplete };
    }
    if (percentComplete >= 60) {
      return { colorClassName: 'warning', percentComplete };
    }
    return { colorClassName: 'incomplete', percentComplete };
  };

  const renderProfileCompletion = (
    category: string,
    fields: Partial<IUpdateAthletePayload>
  ): JSX.Element => {
    const { colorClassName, percentComplete } = getProfileCompletion(fields);

    return (
      <li className={`profile-completion ${colorClassName}`}>
        <span>{category}</span>
        <span className="progress-percent">
          {percentComplete == 100 ? 'Complete' : `${percentComplete}%`}
        </span>
      </li>
    );
  };

  const { academics, athletics, schoolRef, ...overViewInfo } = athlete;
  const { percentComplete } = getProfileCompletion(athlete);

  return (
    <div className="overview-grid overview-tab-container">
      {/* Personal Information */}
      <div className="personal-info card">
        <h2 className="section-title">
          <span className="icon">👤</span> Personal Information
        </h2>

        <div className="info-row">
          <div className="avatar">{initials || '--'}</div>

          <div className="info-fields">
            <div className="two-column">
              <div className="field">
                <label>First Name</label>
                <input
                  type="text"
                  className="first-name"
                  value={athlete.firstName || ''}
                  readOnly
                  tabIndex={-1}
                />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input
                  type="text"
                  className="last-name"
                  value={athlete.lastName || ''}
                  readOnly
                  tabIndex={-1}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="text"
                  className="email"
                  value={athlete.email || ''}
                  readOnly
                  tabIndex={-1}
                />
              </div>
              <div className="field">
                <label>Phone</label>
                <input
                  type="text"
                  value={athlete.phone || ''}
                  readOnly={!editMode}
                  onChange={(e) => setAthlete((a) => ({ ...a, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="field full-width">
              <label>Location</label>
              <input
                type="text"
                value={athlete.location || ''}
                readOnly={!editMode}
                onChange={(e) => setAthlete((a) => ({ ...a, location: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="bio">
          <label>Professional Bio</label>
          <textarea
            rows={3}
            readOnly={!editMode}
            value={athlete.bio || ''}
            onChange={(e) => setAthlete((a) => ({ ...a, bio: e.target.value }))}
          />
        </div>
      </div>

      {/* Profile Completion */}
      {percentComplete === 100 ? (
        <></>
      ) : (
        <div className="completion-card card">
          <h2 className="section-title">Profile Completion</h2>

          <div className="progress-header">
            <span>Overall Progress</span>
            <span className="progress-percent">{percentComplete}%</span>
          </div>

          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${percentComplete}%` }} />
          </div>

          <ul className="completion-list">
            {renderProfileCompletion('🧍 Personal Info', overViewInfo)}
            {renderProfileCompletion('🎓 Academic Info', { academics, schoolRef })}
            {renderProfileCompletion('🏆 Athletic Info', { athletics })}
            {/* <li className="warning">
            <span>📄 Resume</span>
            <span>Needs Update</span>
          </li>
          <li className="incomplete">
            <span>📷 Media</span>
            <span>Incomplete</span>
          </li> */}
          </ul>
        </div>
      )}

      {/* Skills & Interests */}
      <div className="skills-card card">
        <h2 className="section-title">Skills & Interests</h2>
        <div className="skills-description">
          These are some of the skills and interests that set you apart as a student-athlete:
        </div>
        <div className="skills-list">
          {skills.map((skill) => (
            <span className="skill-tag" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
