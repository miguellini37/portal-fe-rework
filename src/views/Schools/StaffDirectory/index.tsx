import React, { FC, useState, useMemo } from 'react';
import { Search, Filter, Download, X } from 'lucide-react';
import './StaffDirectory.css';

// Mock data interfaces
export interface StaffMember {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  yearsAtPortal: number;
  teamsResponsibleFor: string[];
  specialties: string[];
  availability: 'Available' | 'Limited';
  bio: string;
}

export interface StaffDirectoryStats {
  totalStaff: number;
  totalStaffChange: number;
  departments: number;
  departmentsChange: number;
  sportsCovered: number;
  sportsCoveredChange: number;
  studentAthletes: number;
  studentAthletesChange: number;
}

// Mock data
const MOCK_STATS: StaffDirectoryStats = {
  totalStaff: 47,
  totalStaffChange: 3,
  departments: 8,
  departmentsChange: 1,
  sportsCovered: 12,
  sportsCoveredChange: 0,
  studentAthletes: 340,
  studentAthletesChange: 25,
};

const MOCK_STAFF: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Director of Career Services',
    department: 'Career Services',
    email: 's.johnson@portaluniversity.edu',
    phone: '(555) 123-4567',
    location: 'Student Services Building, Room 201',
    yearsAtPortal: 8,
    teamsResponsibleFor: ['All Sports'],
    specialties: ['Career Counseling', 'Resume Development', 'Interview Preparation'],
    availability: 'Available',
    bio: 'Dr. Johnson leads our career services team with over 15 years of experience in student-athlete career development.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Career Counselor',
    department: 'Career Services',
    email: 'm.chen@portaluniversity.edu',
    phone: '(555) 123-4568',
    location: 'Student Services Building, Room 203',
    yearsAtPortal: 4,
    teamsResponsibleFor: ['Basketball', 'Football', 'Baseball'],
    specialties: ['Job Search Strategy', 'Networking', 'LinkedIn Optimization'],
    availability: 'Available',
    bio: 'Michael specializes in helping student-athletes transition from sports to professional careers.',
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    title: 'Industry Relations Coordinator',
    department: 'Career Services',
    email: 'l.rodriguez@portaluniversity.edu',
    phone: '(555) 123-4569',
    location: 'Student Services Building, Room 205',
    yearsAtPortal: 3,
    teamsResponsibleFor: ['Soccer', 'Tennis', 'Swimming'],
    specialties: ['Employer Relations', 'Internship Placement', 'Industry Partnerships'],
    availability: 'Limited',
    bio: 'Lisa focuses on building relationships with employers and creating internship opportunities.',
  },
  {
    id: '4',
    name: 'Robert Williams',
    title: 'NIL Compliance Director',
    department: 'NIL Oversight',
    email: 'r.williams@portaluniversity.edu',
    phone: '(555) 123-4570',
    location: 'Athletic Department, Room 150',
    yearsAtPortal: 6,
    teamsResponsibleFor: ['All Sports'],
    specialties: ['NIL Compliance', 'Contract Review', 'Legal Guidance'],
    availability: 'Available',
    bio: 'Robert ensures all NIL activities comply with university and NCAA regulations.',
  },
  {
    id: '5',
    name: 'Dr. Amanda Foster',
    title: 'Academic Support Coordinator',
    department: 'Academic Support',
    email: 'a.foster@portaluniversity.edu',
    phone: '(555) 123-4571',
    location: 'Academic Center, Room 110',
    yearsAtPortal: 7,
    teamsResponsibleFor: ['Track & Field', 'Cross Country', 'Golf'],
    specialties: ['Academic Planning', 'Study Skills', 'Tutoring Coordination'],
    availability: 'Available',
    bio: 'Dr. Foster helps student-athletes balance their academic and athletic commitments.',
  },
  {
    id: '6',
    name: 'Coach Marcus Thompson',
    title: 'Head Basketball Coach',
    department: 'Coaching Staff',
    email: 'm.thompson@portaluniversity.edu',
    phone: '(555) 123-4572',
    location: 'Athletic Center, Room 250',
    yearsAtPortal: 5,
    teamsResponsibleFor: ['Basketball'],
    specialties: ['Leadership Development', 'Team Building', 'Performance Coaching'],
    availability: 'Limited',
    bio: 'Coach Thompson leads the basketball program with a focus on both athletic and personal development.',
  },
];

const DEPARTMENTS = [
  'All Departments',
  'Career Services',
  'NIL Oversight',
  'Academic Support',
  'Coaching Staff',
  'Mental Health & Wellness',
];

const SPORTS = [
  'All Sports',
  'Basketball',
  'Football',
  'Soccer',
  'Tennis',
  'Swimming',
  'Baseball',
  'Track & Field',
  'Cross Country',
  'Golf',
];

export const StaffDirectory: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedSport, setSelectedSport] = useState('All Sports');

  const filteredStaff = useMemo(() => {
    return MOCK_STAFF.filter((staff) => {
      const matchesSearch =
        searchQuery === '' ||
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDepartment =
        selectedDepartment === 'All Departments' || staff.department === selectedDepartment;

      const matchesSport =
        selectedSport === 'All Sports' ||
        staff.teamsResponsibleFor.includes(selectedSport) ||
        staff.teamsResponsibleFor.includes('All Sports');

      return matchesSearch && matchesDepartment && matchesSport;
    });
  }, [searchQuery, selectedDepartment, selectedSport]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All Departments');
    setSelectedSport('All Sports');
  };

  const handleExport = () => {
    // Mock export functionality
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="staff-directory">
      <div className="staff-directory-header">
        <h1>Staff Directory</h1>
        <p>Meet the dedicated team supporting our student-athletes across academics, athletics, and career development.</p>
      </div>

      {/* Statistics Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{MOCK_STATS.totalStaff}</div>
            <div className="stat-label">Total Staff</div>
            <div className="stat-change positive">+{MOCK_STATS.totalStaffChange} this semester</div>
            <div className="stat-description">Active staff members</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <div className="stat-number">{MOCK_STATS.departments}</div>
            <div className="stat-label">Departments</div>
            <div className="stat-change positive">+{MOCK_STATS.departmentsChange} this semester</div>
            <div className="stat-description">Service departments</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-number">{MOCK_STATS.sportsCovered}</div>
            <div className="stat-label">Sports Covered</div>
            <div className="stat-change neutral">{MOCK_STATS.sportsCoveredChange} this semester</div>
            <div className="stat-description">Athletic programs</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <div className="stat-number">{MOCK_STATS.studentAthletes}</div>
            <div className="stat-label">Student-Athletes Served</div>
            <div className="stat-change positive">+{MOCK_STATS.studentAthletesChange} this semester</div>
            <div className="stat-description">Active student-athletes</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-filter-section">
        <div className="search-filter-header">
          <h2>
            <Search size={20} />
            Search & Filter Staff
          </h2>
        </div>
        
        <div className="search-filter-controls">
          <div className="search-bar">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search by name, title, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-dropdowns">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="filter-dropdown"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="filter-dropdown"
            >
              {SPORTS.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={clearFilters}>
              <X size={16} />
              Clear Filters
            </button>
            <button className="export-btn" onClick={handleExport}>
              <Download size={16} />
              Export Directory
            </button>
          </div>
        </div>
      </div>

      {/* Staff Directory */}
      <div className="staff-list-section">
        <div className="staff-list-header">
          <h3>Staff Members ({filteredStaff.length})</h3>
          <button className="export-btn-mobile" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
        </div>

        <div className="staff-grid">
          {filteredStaff.map((staff) => (
            <div key={staff.id} className="staff-card">
              <div className="staff-card-header">
                <div className="staff-avatar">
                  {staff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="staff-basic-info">
                  <h3 className="staff-name">{staff.name}</h3>
                  <p className="staff-title">{staff.title}</p>
                  <div className="staff-department">
                    <Filter size={12} />
                    {staff.department}
                  </div>
                </div>
                <div className={`availability-badge ${staff.availability.toLowerCase()}`}>
                  {staff.availability}
                </div>
              </div>

              <div className="staff-contact-info">
                <div className="contact-item">
                  <span>📧</span>
                  <span>{staff.email}</span>
                </div>
                <div className="contact-item">
                  <span>📞</span>
                  <span>{staff.phone}</span>
                </div>
                <div className="contact-item">
                  <span>📍</span>
                  <span>{staff.location}</span>
                </div>
                <div className="contact-item">
                  <span>📅</span>
                  <span>{staff.yearsAtPortal} years at Portal</span>
                </div>
              </div>

              <div className="teams-responsible">
                <p className="section-label">Teams Responsible For:</p>
                <div className="tags">
                  {staff.teamsResponsibleFor.map((team) => (
                    <span key={team} className="tag team-tag">{team}</span>
                  ))}
                </div>
              </div>

              <div className="specialties">
                <p className="section-label">Specialties:</p>
                <div className="tags">
                  {staff.specialties.map((specialty) => (
                    <span key={specialty} className="tag specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>

              <div className="staff-bio">
                <p>{staff.bio}</p>
              </div>

              <div className="staff-actions">
                <button className="action-btn primary">
                  📧 Email
                </button>
                <button className="action-btn secondary">
                  📅 Schedule
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="no-results">
            <p>No staff members found matching your search criteria.</p>
            <button onClick={clearFilters} className="clear-filters-btn">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};