import { useState } from 'react';
import { StudentAthlete, mockStudentAthletes } from './types';
import { StudentAthleteCard } from './StudentAthleteCard';
import { Download } from 'lucide-react';
import './CurrentStudents.css';

export const CurrentStudents = () => {
  const [students] = useState<StudentAthlete[]>(mockStudentAthletes);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.firstName.toLowerCase().includes(searchLower) ||
      student.lastName.toLowerCase().includes(searchLower) ||
      student.sport.toLowerCase().includes(searchLower) ||
      student.major.toLowerCase().includes(searchLower) ||
      student.status.toLowerCase().includes(searchLower) ||
      (student.preferredIndustry &&
        student.preferredIndustry.toLowerCase().includes(searchLower)) ||
      (student.location && student.location.toLowerCase().includes(searchLower))
    );
  });

  const handleExportList = () => {
    // Create CSV content
    const headers = [
      'Name',
      'Sport',
      'Position',
      'Class Year',
      'Major',
      'GPA',
      'Expected Graduation',
      'Preferred Industry',
      'Internships',
      'Connections',
      'Location',
      'Status',
      'Offer Employer',
      'Offer Salary',
      'Email',
      'Phone',
    ];

    const csvContent = [
      headers.join(','),
      ...filteredStudents.map((student) =>
        [
          `"${student.firstName} ${student.lastName}"`,
          `"${student.sport}"`,
          `"${student.position || ''}"`,
          `"${student.classYear}"`,
          `"${student.major}"`,
          student.gpa,
          `"${student.expectedGraduation}"`,
          `"${student.preferredIndustry || ''}"`,
          student.internships.length,
          student.connections,
          `"${student.location || ''}"`,
          `"${student.status}"`,
          `"${student.offer?.employer || ''}"`,
          student.offer?.salary || '',
          `"${student.email}"`,
          `"${student.phone || ''}"`,
        ].join(',')
      ),
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `current_students_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          placeholder="Search by name, sport, major, status, industry, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="current-students-actions">
          <div className="current-students-results-count">{filteredStudents.length} students</div>
          <button
            className="current-students-export-btn"
            onClick={handleExportList}
            title="Export student list to CSV"
          >
            <Download size={16} />
            Export List
          </button>
        </div>
      </div>

      <div className="current-students-grid">
        {filteredStudents.map((student) => (
          <StudentAthleteCard key={student.id} student={student} />
        ))}
      </div>

      {filteredStudents.length === 0 && searchTerm && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted-foreground)' }}>
          No students found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};
