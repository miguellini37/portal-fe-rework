import React, { FC, useState, useMemo, useEffect } from 'react';
import {
  getSchoolEmployees,
  GetSchoolEmployeesFilter,
  GetSchoolEmployeesResponse,
} from '../../../api/schoolEmployee';
import { EmployeeCard } from '../../../components/EmployeeCard';
import { CardTable } from '../../../components/CardTable';
import './StaffDirectory.css';
import { useAuthHeader, useAuthUser } from '../../../auth/hooks';

export const StaffDirectory: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [staff, setStaff] = useState<GetSchoolEmployeesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();
  const user = useAuthUser();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const filter: GetSchoolEmployeesFilter = {};

        // Filter by school if user is a school employee
        if (user?.schoolId) {
          filter.schoolId = user.schoolId;
        }

        const response = await getSchoolEmployees(filter, authHeader);
        setStaff(response);
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [authHeader, user?.schoolId]);

  const filteredStaff = useMemo(() => {
    return staff.filter((employee) => {
      if (searchQuery === '') {
        return true;
      }

      const fullName = `${employee.firstName || ''} ${employee.lastName || ''}`.toLowerCase();
      const email = (employee.email || '').toLowerCase();
      const schoolName = (employee.schoolRef?.schoolName || '').toLowerCase();
      const query = searchQuery.toLowerCase();

      return fullName.includes(query) || email.includes(query) || schoolName.includes(query);
    });
  }, [searchQuery, staff]);

  if (loading) {
    return (
      <div className="staff-directory-root">
        <div className="staff-directory-header">
          <h1 className="staff-directory-title">Staff Directory</h1>
          <div className="staff-directory-subtitle">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-directory-root">
      <div className="staff-directory-header">
        <h1 className="staff-directory-title">Staff Directory</h1>
        <div className="staff-directory-subtitle">
          Meet the dedicated team supporting our student-athletes across academics, athletics, and
          career development.
        </div>
      </div>

      <div className="staff-directory-searchbar-row">
        <input
          className="staff-directory-searchbar"
          type="text"
          placeholder="Search by name, email, or school..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <CardTable maxColumns={4} minCardWidth={320}>
        {filteredStaff.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </CardTable>
    </div>
  );
};
