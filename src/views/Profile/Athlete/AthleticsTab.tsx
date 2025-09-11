import React from 'react';

import { IUpdateAthletePayload } from '../../../api/athlete';
import { SportsDropdown } from '../../../components/Dropdowns/SportsDropdown';
import { DivisionDropdown } from '../../../components/Dropdowns/DivisionDropdown';

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
              <SportsDropdown
                selected={athletics.sport || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, sport: e?.value },
                  }))
                }
              />
            ) : (
              <div className="readonly-display">{athletics.sport || ''}</div>
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
              <div className="readonly-display">{athletics.position || ''}</div>
            )}
          </div>
        </div>
        <div className="athletics-field">
          <div className="athletics-label">Division</div>
          <div className="athletics-value">
            {editMode ? (
              <DivisionDropdown
                selected={athletics.division || ''}
                onChange={(e) =>
                  setAthlete((a) => ({
                    ...a,
                    athletics: { ...a.athletics, division: e?.value },
                  }))
                }
              />
            ) : (
              <div className="readonly-display">{athletics.division || ''}</div>
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
              <div className="readonly-display">{athletics.conference || ''}</div>
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
              <div className="readonly-display">{athletics.yearsPlayed || ''}</div>
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
              <div className="readonly-display">{athletics.leadershipRoles || ''}</div>
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
              <div className="multiline-display">{athletics.achievements || ''}</div>
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
              <div className="multiline-display">{athletics.statistics || ''}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
