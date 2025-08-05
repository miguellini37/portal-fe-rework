import React from 'react';

import { IUpdateAthletePayload } from '../../../api/athlete';

interface AthleticsTabProps {
  athlete: IUpdateAthletePayload;
  editMode: boolean;
  setAthlete: React.Dispatch<React.SetStateAction<IUpdateAthletePayload>>;
}

export const AthleticsTab: React.FC<AthleticsTabProps> = ({ athlete, editMode, setAthlete }) => {
  const athletics = athlete.athletics || {};
  return (
    <div className="athletics-tab-container card">
      <h2 className="athletics-section-title">
        <span className="icon" role="img" aria-label="Trophy">
          🏆
        </span>
        Athletic Information
      </h2>
      <div className="athletics-grid">
        <div className="athletics-field">
          <div className="athletics-label">Sport</div>
          <div className="athletics-value">
            {editMode ? (
              <input
                className="athletics-input"
                value={athletics.sport || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, sport: e.target.value },
                  }))
                }
              />
            ) : (
              athletics.sport || <span className="athletics-placeholder" />
            )}
          </div>
        </div>
        <div className="athletics-field">
          <div className="athletics-label">Position</div>
          <div className="athletics-value">
            {editMode ? (
              <input
                className="athletics-input"
                value={athletics.position || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, position: e.target.value },
                  }))
                }
              />
            ) : (
              athletics.position || <span className="athletics-placeholder" />
            )}
          </div>
        </div>
        <div className="athletics-field">
          <div className="athletics-label">Division</div>
          <div className="athletics-value">
            {editMode ? (
              <input
                className="athletics-input"
                value={athletics.division || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, division: e.target.value },
                  }))
                }
              />
            ) : (
              athletics.division || <span className="athletics-placeholder" />
            )}
          </div>
        </div>
        <div className="athletics-field">
          <div className="athletics-label">Conference</div>
          <div className="athletics-value">
            {editMode ? (
              <input
                className="athletics-input"
                value={athletics.conference || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, conference: e.target.value },
                  }))
                }
              />
            ) : (
              athletics.conference || <span className="athletics-placeholder" />
            )}
          </div>
        </div>
        <div className="athletics-field">
          <div className="athletics-label">Years Played</div>
          <div className="athletics-value">
            {editMode ? (
              <input
                className="athletics-input"
                value={athletics.yearsPlayed || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, yearsPlayed: e.target.value },
                  }))
                }
              />
            ) : (
              athletics.yearsPlayed || <span className="athletics-placeholder" />
            )}
          </div>
        </div>
        <div className="athletics-field">
          <div className="athletics-label">Leadership Role</div>
          <div className="athletics-value">
            {editMode ? (
              <input
                className="athletics-input"
                value={athletics.leadershipRoles || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, leadershipRoles: e.target.value },
                  }))
                }
              />
            ) : (
              athletics.leadershipRoles || <span className="athletics-placeholder" />
            )}
          </div>
        </div>
        <div className="athletics-field athletics-field-full">
          <div className="athletics-label">Athletic Achievements</div>
          <div className="athletics-value">
            {editMode ? (
              <textarea
                className="athletics-textarea"
                value={athletics.achievements || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, achievements: e.target.value },
                  }))
                }
                rows={2}
                placeholder=" "
              />
            ) : (
              <textarea
                className="athletics-textarea"
                value={athletics.achievements || ''}
                disabled
                rows={2}
                placeholder=" "
              />
            )}
          </div>
        </div>
        <div className="athletics-field athletics-field-full">
          <div className="athletics-label">Key Statistics</div>
          <div className="athletics-value">
            {editMode ? (
              <textarea
                className="athletics-textarea"
                value={athletics.statistics || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, statistics: e.target.value },
                  }))
                }
                rows={2}
                placeholder=" "
              />
            ) : (
              <textarea
                className="athletics-textarea"
                value={athletics.statistics || ''}
                disabled
                rows={2}
                placeholder=" "
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
