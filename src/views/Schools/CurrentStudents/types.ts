export interface StudentAthlete {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;

  // Core Info
  sport: string;
  position?: string;
  classYear: string;
  major: string;
  gpa: number;
  expectedGraduation: string;

  // Career Info
  preferredIndustry?: string;
  internships: string[];
  connections: number;
  location?: string;

  // Status
  status: 'Actively Seeking' | 'Offer Received' | 'Exploring Options' | 'Placed';

  // Offer Details
  offer?: {
    employer: string;
    salary: number;
  };
}

export const mockStudentAthletes: StudentAthlete[] = [
  {
    id: '1',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus.johnson@university.edu',
    phone: '(555) 123-4567',
    sport: 'Basketball',
    position: 'Point Guard',
    classYear: 'Senior',
    major: 'Business Administration',
    gpa: 3.7,
    expectedGraduation: 'May 2024',
    preferredIndustry: 'Technology',
    internships: ['Goldman Sachs Summer Analyst', 'Microsoft SDE Intern'],
    connections: 145,
    location: 'Atlanta, GA',
    status: 'Offer Received',
    offer: {
      employer: 'Google',
      salary: 125000,
    },
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@university.edu',
    phone: '(555) 987-6543',
    sport: 'Soccer',
    position: 'Midfielder',
    classYear: 'Junior',
    major: 'Computer Science',
    gpa: 3.9,
    expectedGraduation: 'May 2025',
    preferredIndustry: 'Software Engineering',
    internships: ['Meta Software Engineer Intern'],
    connections: 87,
    location: 'Austin, TX',
    status: 'Actively Seeking',
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Rodriguez',
    email: 'david.rodriguez@university.edu',
    phone: '(555) 456-7890',
    sport: 'Track and Field',
    position: 'Sprinter',
    classYear: 'Sophomore',
    major: 'Marketing',
    gpa: 3.5,
    expectedGraduation: 'May 2026',
    preferredIndustry: 'Marketing',
    internships: ['Nike Marketing Intern'],
    connections: 63,
    location: 'Los Angeles, CA',
    status: 'Exploring Options',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@university.edu',
    phone: '(555) 321-0987',
    sport: 'Tennis',
    classYear: 'Senior',
    major: 'Finance',
    gpa: 3.8,
    expectedGraduation: 'December 2024',
    preferredIndustry: 'Investment Banking',
    internships: ['JP Morgan Chase Investment Banking Analyst', 'BlackRock Summer Analyst'],
    connections: 203,
    location: 'New York, NY',
    status: 'Placed',
    offer: {
      employer: 'Goldman Sachs',
      salary: 150000,
    },
  },
  {
    id: '5',
    firstName: 'Tyler',
    lastName: 'Brown',
    email: 'tyler.brown@university.edu',
    phone: '(555) 654-3210',
    sport: 'Football',
    position: 'Quarterback',
    classYear: 'Junior',
    major: 'Communications',
    gpa: 3.4,
    expectedGraduation: 'May 2025',
    preferredIndustry: 'Sports Media',
    internships: ['ESPN Production Intern'],
    connections: 298,
    location: 'Denver, CO',
    status: 'Actively Seeking',
  },
  {
    id: '6',
    firstName: 'Ashley',
    lastName: 'Davis',
    email: 'ashley.davis@university.edu',
    phone: '(555) 789-0123',
    sport: 'Volleyball',
    position: 'Outside Hitter',
    classYear: 'Senior',
    major: 'Psychology',
    gpa: 3.6,
    expectedGraduation: 'May 2024',
    preferredIndustry: 'Healthcare',
    internships: ['Kaiser Permanente HR Intern', 'Mayo Clinic Research Assistant'],
    connections: 156,
    location: 'Seattle, WA',
    status: 'Offer Received',
    offer: {
      employer: 'Microsoft',
      salary: 95000,
    },
  },
];
