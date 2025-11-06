import React from 'react';
import { StudentAthlete } from './types';
import { getInitials } from '../../../util/name';
import { Eye } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './CurrentStudents.css';

export interface StudentAthleteCardProps {
  student: StudentAthlete;
}

const getStudentInitials = (student: StudentAthlete): string => {
  return getInitials({ firstName: student.firstName, lastName: student.lastName });
};

export const StudentAthleteCard: React.FC<StudentAthleteCardProps> = ({ student }) => {
  return (
    <div className="student-card">
      <div className="student-card-header">
        <div className="student-avatar">{getStudentInitials(student)}</div>
        <div>
          <div className="student-name">
            {student.firstName} {student.lastName}
          </div>
          <div className="student-sport">
            {student.sport}
            {student.position ? ` • ${student.position}` : ''}
          </div>
        </div>
      </div>

      <div className="student-card-body">
        {/* Core Info */}
        <div className="student-section">
          <div className="student-section-title">Academic Info</div>
          <div className="student-info-grid">
            <div className="student-info-row">
              <span className="student-info-label">Class Year:</span>
              <span>{student.classYear}</span>
            </div>
            <div className="student-info-row">
              <span className="student-info-label">Major:</span>
              <span>{student.major}</span>
            </div>
            <div className="student-info-row">
              <span className="student-info-label">GPA:</span>
              <span>{student.gpa.toFixed(1)}</span>
            </div>
            <div className="student-info-row">
              <span className="student-info-label">Expected Graduation:</span>
              <span>{student.expectedGraduation}</span>
            </div>
            {student.location && (
              <div className="student-info-row">
                <span className="student-info-label">Location:</span>
                <span>{student.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="student-card-actions">
        <NavLink to={`/athlete/${student.id}`} className="student-action-btn primary">
          <Eye size={16} />
          View Profile
        </NavLink>
      </div>
    </div>
  );
};
