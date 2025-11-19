import { useState, useEffect } from 'react';
import { StudentAthlete } from './types';
import { StudentAthleteCard } from './StudentAthleteCard';
import { CardTable } from '../../../components/CardTable';
import { getAthletes, GetAthletesFilter, GetAthletesResponse } from '../../../api/athlete';
import './CurrentStudents.css';
import { useAuthHeader, useAuthUser } from '../../../auth/hooks';

export const CurrentStudents = () => {
  const [students, setStudents] = useState<StudentAthlete[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const authHeader = useAuthHeader();
  const user = useAuthUser();

  // Helper function to calculate class year from graduation date
  const calculateClassYear = (graduationDate?: string): string => {
    if (!graduationDate) {
      return 'Unknown';
    }

    try {
      // Parse graduation date (format could be "May 2024", "2024-05-15", etc.)
      const yearMatch = graduationDate.match(/\d{4}/);
      if (!yearMatch) {
        return 'Unknown';
      }

      const gradYear = parseInt(yearMatch[0], 10);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth(); // 0-11

      // Academic year starts in August/September (month 7/8)
      // If we're past August, we're in the next academic year
      const academicYear = currentMonth >= 7 ? currentYear + 1 : currentYear;

      const yearsUntilGrad = gradYear - academicYear;

      if (yearsUntilGrad <= 0) {
        return 'Senior';
      }
      if (yearsUntilGrad === 1) {
        return 'Junior';
      }
      if (yearsUntilGrad === 2) {
        return 'Sophomore';
      }
      if (yearsUntilGrad === 3) {
        return 'Freshman';
      }

      return 'Freshman'; // For students more than 3 years out
    } catch {
      return 'Unknown';
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const filter: GetAthletesFilter = {};

        // Filter by school if user is a school employee
        if (user?.schoolId) {
          filter.schoolId = user.schoolId;
        }

        const response = await getAthletes(filter, authHeader);

        // Map backend response to StudentAthlete type
        const mappedStudents: StudentAthlete[] = response.map((athlete: GetAthletesResponse) => ({
          id: athlete.id || '',
          firstName: athlete.firstName || '',
          lastName: athlete.lastName || '',
          email: athlete.email || '',
          phone: athlete.phone,
          sport: athlete.athletics?.sport || 'Unknown',
          position: athlete.athletics?.position,
          classYear: calculateClassYear(athlete.academics?.graduationDate),
          major: athlete.academics?.major || 'Unknown',
          gpa: athlete.academics?.gpa || 0,
          expectedGraduation: athlete.academics?.graduationDate || 'Unknown',
          location: athlete.location,
        }));

        setStudents(mappedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.firstName.toLowerCase().includes(searchLower) ||
      student.lastName.toLowerCase().includes(searchLower) ||
      student.sport.toLowerCase().includes(searchLower) ||
      student.major.toLowerCase().includes(searchLower) ||
      student.classYear.toLowerCase().includes(searchLower) ||
      (student.location && student.location.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="current-students-root">
        <div className="current-students-header">
          <h1 className="current-students-title">Current Students</h1>
          <div className="current-students-subtitle">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="current-students-root">
      <div className="current-students-header">
        <h1 className="current-students-title">Current Students</h1>
        <div className="current-students-subtitle">
          Manage and track your current student-athletes' career progress
        </div>
      </div>

      <div className="current-students-searchbar-row">
        <input
          className="current-students-searchbar"
          type="text"
          placeholder="Search by name, sport, major, class year, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CardTable minCardWidth={350}>
        {filteredStudents.map((student) => (
          <StudentAthleteCard key={student.id} student={student} />
        ))}
      </CardTable>

      {filteredStudents.length === 0 && searchTerm && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted-foreground)' }}>
          No students found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};
