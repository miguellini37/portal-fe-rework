import React from 'react';

import { ICompanyPaylod } from '../../../api/company';
import { isNil } from 'lodash';

interface OverviewTabProps {
  company: ICompanyPaylod;
  editMode: boolean;
  setCompany: React.Dispatch<React.SetStateAction<ICompanyPaylod>>;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ company, editMode, setCompany }) => {
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

  // Recursively count all fields and filled fields
  const countFields = (obj: any): { total: number; filled: number } => {
    if (typeof obj !== 'object' || obj === null) {
      return { total: 0, filled: 0 };
    }
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
        if (!isNil(value) && value !== '') {
          filled += 1;
        }
      }
    }
    return { total, filled };
  };

  const getProfileCompletion = (
    fields: Partial<ICompanyPaylod>
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

  const { percentComplete } = getProfileCompletion(company);

  return (
    <div className="overview-grid overview-tab-container">
      {/* Personal Information */}
      <div className="personal-info card">
        <h2 className="section-title">Company Information</h2>

        <div className="info-row">
          <div className="info-fields">
            <div className="field full-width">
              <label>Company Name</label>
              <input
                type="text"
                value={company.companyName || ''}
                readOnly={!editMode}
                tabIndex={editMode ? 0 : -1}
                onChange={(e) => setCompany((c) => ({ ...c, companyName: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="bio">
          <label>Professional Bio</label>
          {/* <textarea
            rows={3}
            readOnly={!editMode}
            value={company.bio || ''}
            onChange={(e) => setCompany((a) => ({ ...a, bio: e.target.value }))}
          /> */}
        </div>
      </div>

      {/* Profile Completion */}
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
          {/* {renderProfileCompletion('🧍 Personal Info', overViewInfo)}
          {renderProfileCompletion('🎓 Academic Info', { academics, school })}
          {renderProfileCompletion('🏆 Athletic Info', { athletics })} */}
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

      {/* Skills & Interests */}
      <div className="skills-card card">
        <h2 className="section-title">Skills & Interests</h2>
        <div className="skills-description">
          These are some of the skills and interests that set you apart as a student-company:
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
