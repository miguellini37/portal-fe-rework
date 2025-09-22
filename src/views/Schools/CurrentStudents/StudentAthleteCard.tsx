import React from 'react';
import { StudentAthlete } from './types';
import { getInitials } from '../../../util/name';
import { Eye, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './CurrentStudents.css';

export interface StudentAthleteCardProps {
  student: StudentAthlete;
}

const getStatusColor = (status: StudentAthlete['status']): string => {
  switch (status) {
    case 'Actively Seeking':
      return 'status-seeking';
    case 'Offer Received':
      return 'status-offer';
    case 'Exploring Options':
      return 'status-exploring';
    case 'Placed':
      return 'status-placed';
    default:
      return 'status-default';
  }
};

const formatSalary = (salary: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(salary);
};

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
        <div className={`student-status ${getStatusColor(student.status)}`}>{student.status}</div>
      </div>

      <div className="student-card-body">
        {/* Core Info */}
        <div className="student-section">
          <div className="student-section-title">Core Info</div>
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
          </div>
        </div>

        {/* Career Info */}
        <div className="student-section">
          <div className="student-section-title">Career Info</div>
          <div className="student-info-grid">
            {student.preferredIndustry && (
              <div className="student-info-row">
                <span className="student-info-label">Preferred Industry:</span>
                <span>{student.preferredIndustry}</span>
              </div>
            )}
            <div className="student-info-row">
              <span className="student-info-label">Internships:</span>
              <span>{student.internships.length} completed</span>
            </div>
            <div className="student-info-row">
              <span className="student-info-label">Connections:</span>
              <span>{student.connections}</span>
            </div>
            {student.location && (
              <div className="student-info-row">
                <span className="student-info-label">Location:</span>
                <span>{student.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Offer Details */}
        {student.offer && (
          <div className="student-section">
            <div className="student-offer-details">
              <strong>Offer Received:</strong> {student.offer.employer},{' '}
              {formatSalary(student.offer.salary)}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="student-card-actions">
        <NavLink to={`/athlete/${student.id}`} className="student-action-btn primary">
          <Eye size={16} />
          View Profile
        </NavLink>
        <button
          className="student-action-btn secondary"
          onClick={() => window.open(`mailto:${student.email}`, '_blank')}
        >
          <Mail size={16} />
          Contact
        </button>
      </div>
    </div>
  );
};
