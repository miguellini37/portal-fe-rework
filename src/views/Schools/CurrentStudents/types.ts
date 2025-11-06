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
  location?: string;
}

// mockStudentAthletes removed - now using real API data from getAthletes()
// See MOCKED_FIELDS.md for fields that still need backend support
