import React, { FC, useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import {
  getSchoolEmployees,
  GetSchoolEmployeesFilter,
  GetSchoolEmployeesResponse,
} from '../../../api/schoolEmployee';
import { EmployeeCard } from '../../../components/EmployeeCard';
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
      <div className="staff-directory">
        <div className="staff-directory-header">
          <h1>Staff Directory</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-directory">
      <div className="staff-directory-header">
        <h1>Staff Directory</h1>
        <p>
          Meet the dedicated team supporting our student-athletes across academics, athletics, and
          career development.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="search-filter-section">
        <div className="search-filter-header">
          <h2>
            <Search size={20} />
            Search Staff
          </h2>
        </div>

        <div className="search-filter-controls">
          <div className="search-bar">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search by name, email, or school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Staff Directory */}
      <div className="staff-list-section">
        <div className="staff-list-header">
          <h3>Staff Members ({filteredStaff.length})</h3>
        </div>

        <div className="staff-grid">
          {filteredStaff.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      </div>
    </div>
  );
};
