import React, { FC } from 'react';
import { Mail, Building2, Phone } from 'lucide-react';
import { GetSchoolEmployeesResponse } from '../../api/schoolEmployee';
import './EmployeeCard.css';

export interface EmployeeCardProps {
  employee: GetSchoolEmployeesResponse;
}

export const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
  const fullName = `${employee.firstName || ''} ${employee.lastName || ''}`.trim();
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="employee-card">
      <div className="employee-card-header">
        <div className="employee-avatar">{initials || '??'}</div>
        <div className="employee-basic-info">
          <h3 className="employee-name">{fullName || 'Unknown'}</h3>
          <div className="employee-contact-details">
            <div className="employee-contact-item">
              <Mail size={14} />
              <span>{employee.email}</span>
            </div>
            <div className="employee-contact-item">
              <Phone size={14} />
              <span>{employee.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {employee.schoolRef && (
        <div className="employee-school-info">
          <Building2 size={14} />
          <span>{employee.schoolRef.schoolName}</span>
        </div>
      )}
    </div>
  );
};
