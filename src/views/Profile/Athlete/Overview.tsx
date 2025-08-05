import React from 'react';

import { IUpdateAthletePayload } from '../../../api/athlete';

interface OverviewTabProps {
  athlete: IUpdateAthletePayload;
  editMode: boolean;
  EditSaveButton: React.ComponentType;
  setAthlete: React.Dispatch<React.SetStateAction<IUpdateAthletePayload>>;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  athlete,
  editMode,
  EditSaveButton,
  setAthlete,
}) => {
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
  return (
    <div className="overview-grid overview-tab-container">
      {/* Personal Information */}
      <div className="personal-info">
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

      {/* Edit/Save Button */}
      <EditSaveButton />
      {/* Profile Completion */}
      <div className="completion-card">
        <h2 className="section-title">Profile Completion</h2>

        <div className="progress-header">
          <span>Overall Progress</span>
          <span className="progress-percent">85%</span>
        </div>

        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: '85%' }} />
        </div>

        <ul className="completion-list">
          <li className="complete">
            <span>🧍 Personal Info</span>
            <span>Complete</span>
          </li>
          <li className="complete">
            <span>🎓 Academic Info</span>
            <span>Complete</span>
          </li>
          <li className="complete">
            <span>🏆 Athletic Info</span>
            <span>Complete</span>
          </li>
          <li className="warning">
            <span>📄 Resume</span>
            <span>Needs Update</span>
          </li>
          <li className="incomplete">
            <span>📷 Media</span>
            <span>Incomplete</span>
          </li>
        </ul>
      </div>

      {/* Skills & Interests */}
      <div className="skills-card">
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
