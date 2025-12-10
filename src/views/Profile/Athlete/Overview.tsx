import React, { JSX, useState } from 'react';

import { IUpdateAthletePayload } from '../../../api/athlete';
import { isNil } from 'lodash';
import { formatPhone, normalizePhoneDigits } from '../../../util/phone';

interface OverviewTabProps {
  athlete: IUpdateAthletePayload;
  editMode: boolean;
  setAthlete: React.Dispatch<React.SetStateAction<IUpdateAthletePayload>>;
  canEdit: boolean;
}

const PREDEFINED_SKILLS = [
  'Leadership',
  'Team Collaboration',
  'Time Management',
  'Communication',
  'Problem Solving',
  'Adaptability',
  'Work Ethic',
  'Goal Setting',
];

export const OverviewTab: React.FC<OverviewTabProps> = ({
  athlete,
  editMode,
  setAthlete,
  canEdit,
}) => {
  const [customSkill, setCustomSkill] = useState('');
  const [showAllSkills, setShowAllSkills] = useState(false);

  const athleteSkills = athlete?.athletics?.skills || [];
  const allAvailableSkills = Array.from(new Set([...PREDEFINED_SKILLS, ...athleteSkills]));

  const handleSkillToggle = (skill: string) => {
    const newSkills = athleteSkills.includes(skill)
      ? athleteSkills.filter((s) => s !== skill)
      : [...athleteSkills, skill];
    setAthlete((a) => ({ ...a, athletics: { ...a?.athletics, skills: newSkills } }));
  };

  const handleAddCustomSkill = () => {
    if (customSkill && !athleteSkills.includes(customSkill)) {
      setAthlete((a) => ({
        ...a,
        athletics: { ...a?.athletics, skills: [...(a?.athletics?.skills || []), customSkill] },
      }));
      setCustomSkill('');
    }
  };

  const initials = `${athlete.firstName?.[0] || ''}${athlete.lastName?.[0] || ''}`.toUpperCase();

  // Recursively count all fields and filled fields
  const countFields = (obj: unknown): { total: number; filled: number } => {
    if (typeof obj !== 'object' || obj === null) {
      return { total: 0, filled: 0 };
    }
    let total = 0;
    let filled = 0;
    const rec = obj as Record<string, unknown>;
    for (const key of Object.keys(rec)) {
      const value = rec[key];
      if (typeof value === 'object' && value !== null) {
        const nested = countFields(value);
        total += nested.total;
        filled += nested.filled;
      } else {
        total += 1;
        if (!isNil(value) && value !== '') {
          filled += 1;
        }
      }
    }
    return { total, filled };
  };

  const getProfileCompletion = (
    fields: Partial<IUpdateAthletePayload>
  ): { color: string; percentComplete: number } => {
    const { total, filled } = countFields(fields);
    if (total === 0) {
      return { color: '#dc2626', percentComplete: 0 };
    }
    const percentComplete = Math.round((filled / total) * 100);
    if (percentComplete === 100) {
      return { color: '#16a34a', percentComplete };
    }
    if (percentComplete >= 60) {
      return { color: '#d97706', percentComplete };
    }
    return { color: '#dc2626', percentComplete };
  };

  const renderProfileCompletion = (
    category: string,
    fields: Partial<IUpdateAthletePayload>
  ): JSX.Element => {
    const { color, percentComplete } = getProfileCompletion(fields);

    return (
      <div>
        <div className="progress-header">
          <span>{category}</span>
          <span className="progress-percent">{percentComplete}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentComplete}%`, backgroundColor: color }}
          />
        </div>
      </div>
    );
  };

  const { academics, athletics, school, ...overViewInfo } = athlete;
  const { percentComplete } = getProfileCompletion(athlete);

  return (
    <div className="overview-grid overview-tab-container">
      {/* Personal Information */}
      <div className="personal-info card">
        <h2 className="section-title">Personal Information</h2>

        <div className="info-row">
          <div className="avatar">{initials || '--'}</div>

          <div className="info-fields">
            <div className="two-column">
              <div className="field">
                <label>First Name</label>
                {editMode ? (
                  <input
                    type="text"
                    className="first-name"
                    value={athlete?.firstName || ''}
                    readOnly
                    tabIndex={-1}
                  />
                ) : (
                  <div className="readonly-display">{athlete?.firstName || ''}</div>
                )}
              </div>
              <div className="field">
                <label>Last Name</label>
                {editMode ? (
                  <input
                    type="text"
                    className="last-name"
                    value={athlete?.lastName || ''}
                    readOnly
                    tabIndex={-1}
                  />
                ) : (
                  <div className="readonly-display">{athlete?.lastName || ''}</div>
                )}
              </div>
              <div className="field">
                <label>Email</label>
                {editMode ? (
                  <input
                    type="text"
                    className="email"
                    value={athlete?.email || ''}
                    readOnly
                    tabIndex={-1}
                  />
                ) : (
                  <div className="readonly-display">{athlete?.email || ''}</div>
                )}
              </div>
              <div className="field">
                <label>Phone</label>
                {editMode ? (
                  <input
                    value={formatPhone(athlete.phone || '')}
                    inputMode="tel"
                    type="tel"
                    onChange={(e) => {
                      const digits = normalizePhoneDigits(e.target.value);
                      setAthlete((a) => ({ ...a, phone: digits }));
                    }}
                  />
                ) : (
                  <div className="readonly-display">{formatPhone(athlete.phone || '')}</div>
                )}
              </div>
            </div>
            <div className="field full-width">
              <label>Location</label>
              {editMode ? (
                <input
                  type="text"
                  value={athlete.location || ''}
                  onChange={(e) => setAthlete((a) => ({ ...a, location: e.target.value }))}
                />
              ) : (
                <div className="readonly-display">{athlete.location || ''}</div>
              )}
            </div>
          </div>
        </div>

        <div className="bio">
          <label>Professional Bio</label>
          {editMode ? (
            <textarea
              rows={3}
              value={athlete.bio || ''}
              onChange={(e) => setAthlete((a) => ({ ...a, bio: e.target.value }))}
            />
          ) : (
            <div className="multiline-display">{athlete.bio || ''}</div>
          )}
        </div>
      </div>

      {/* Profile Completion */}
      {percentComplete === 100 || !canEdit ? (
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
            {renderProfileCompletion('Personal Info', {
              ...overViewInfo,
              athletics: { skills: athlete.athletics?.skills },
            })}
            {renderProfileCompletion('Academic Info', { academics, school })}
            {renderProfileCompletion('Athletic Info', { athletics })}
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
          {(editMode ? allAvailableSkills : athleteSkills)
            .slice(0, showAllSkills || !editMode ? undefined : 8)
            .map((skill) => (
              <span
                className={`skill-tag ${athleteSkills.includes(skill) ? 'selected' : ''} ${
                  editMode ? 'selectable' : ''
                }`}
                key={skill}
                onClick={() => editMode && handleSkillToggle(skill)}
              >
                {skill}
              </span>
            ))}
          {editMode && allAvailableSkills.length > 8 && !showAllSkills && (
            <span className="skill-tag selectable" onClick={() => setShowAllSkills(true)}>
              +{allAvailableSkills.length - 8} more
            </span>
          )}
        </div>
        {editMode && (
          <div className="add-skill-container">
            <input
              type="text"
              className="add-skill-input"
              placeholder="Add a custom skill"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
            />
            <button
              className="add-skill-button"
              onClick={handleAddCustomSkill}
              disabled={!customSkill || athleteSkills.includes(customSkill)}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
