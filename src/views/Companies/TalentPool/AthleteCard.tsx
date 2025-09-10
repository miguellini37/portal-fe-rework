import React from 'react';
import './talentPool.css';
import { GetAthletesResponse } from '../../../api/athlete';
import { getFullName, getInitials } from '../../../util/name';
import { Eye } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export interface AthleteCardProps {
  athlete: GetAthletesResponse;
}

export const AthleteCard: React.FC<AthleteCardProps> = ({ athlete }) => {
  const { academics, athletics, schoolRef, location } = athlete;

  return (
    <div className="athlete-card">
      <div className="athlete-card-header">
        <div className="athlete-avatar">{getInitials(athlete)}</div>
        <div>
          <div className="athlete-name">{getFullName(athlete)}</div>
          <div className="athlete-sport">
            {athletics?.sport}
            {athletics?.position ? ` • ${athletics?.position}` : ''}
          </div>
        </div>
      </div>
      <div className="athlete-card-body">
        <div className="athlete-info-row">
          <span className="athlete-info-label">🏫</span> {schoolRef?.schoolName}
        </div>
        <div className="athlete-info-row">
          <span className="athlete-info-label">📍</span> {location}
        </div>
        <div className="athlete-info-row">
          <span className="athlete-info-label">🎓 GPA:</span> {academics?.gpa}
          {athletics?.division && <span className="athlete-division">{athletics?.division}</span>}
        </div>
        <div className="athlete-info-row">
          <b>Major:</b> {academics?.major}
        </div>
        <div className="athlete-info-row">
          <b>Graduation:</b> {academics?.graduationDate}
        </div>
        {/* <div className="athlete-info-row">
          <b>Industry Interest:</b> {industryInterest}
        </div> */}
        <div className="athlete-skills">
          {/* {skills.slice(0, 3).map((skill, i) => (
            <span className="athlete-skill" key={i}>
              {skill}
            </span>
          ))} */}
          {/* {skills.length > 3 && <span className="athlete-skill">+{skills.length - 3} more</span>} */}
        </div>
      </div>
      <div className="athlete-card-actions">
        <NavLink className="action-btn primary" to={`/athlete/${athlete.id}`}>
          <Eye size={18} style={{ marginRight: 6, marginBottom: -2 }} />
          View Profile
        </NavLink>
        {/* <button className="athlete-contact" onClick={() => {}}>
          <MessageCircle size={18} style={{ marginRight: 6, marginBottom: -2 }} />
          Contact
        </button> */}
      </div>
    </div>
  );
};
