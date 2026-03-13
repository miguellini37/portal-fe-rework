import axios from 'axios';
import { url } from '../config/url';

export interface ISchoolPaylod {
  id?: string;
  schoolName?: string;
  ownerId?: string;
}

export const getSchoolById = async (
  id: string,
  authHeader: string | null
): Promise<ISchoolPaylod> => {
  const response = await axios.get(`${url}/getSchool/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const updateSchool = async (
  data: ISchoolPaylod,
  authHeader: string | null
): Promise<ISchoolPaylod> => {
  const response = await axios.put(`${url}/updateSchool`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getSchools = async (): Promise<ISchoolPaylod[]> => {
  const response = await axios.get(`${url}/getSchools`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return response.data;
};

export interface ISchoolPaylodLite {
  id?: string;
  schoolName?: string;
}

export const getSchoolsForDropdown = async (
  authHeader: string | null,
  wildcardTerm?: string
): Promise<ISchoolPaylod[]> => {
  const response = await axios.get(`${url}/getSchoolsForDropdown`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
    params: wildcardTerm ? { wildcardTerm } : undefined,
  });

  return response.data;
};

// ── University Overview ──────────────────────────────────────────────────────

export interface MonthComparison {
  currentMonth: number;
  previousMonth: number;
}

export interface RecentActivityItem {
  activityId: string;
  type: string;
  message: string;
  date: string;
  studentName?: string;
}

export interface UniversityOverview {
  placedGraduates: MonthComparison;
  activeSponsors: MonthComparison;
  communityNumbers: { totalStudents: number };
  recentActivity: RecentActivityItem[];
}

export const getUniversityOverview = async (
  authHeader: string | null
): Promise<UniversityOverview> => {
  const response = await axios.get(`${url}/getUniversityOverview`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

// ── Companies for University ─────────────────────────────────────────────────

export interface CompanyForUniversity {
  id: string;
  companyName?: string;
  industry?: string;
  createdAtDate: string;
  openJobsCount: number;
}

export interface CompaniesForUniversityResponse {
  totalPartners: { current: number; previousMonth: number };
  openPositions: number;
  placementsYTD: number;
  medianSalary: number;
  companies: CompanyForUniversity[];
}

export const getCompaniesForUniversity = async (
  authHeader: string | null
): Promise<CompaniesForUniversityResponse> => {
  const response = await axios.get(`${url}/getCompaniesForUniversity`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

// ── University NIL Oversight ─────────────────────────────────────────────────

export interface NILOversightMetrics {
  totalAcceptedDeals: { currentYear: number; lastYear: number };
  totalApplications: number;
  approvalRate: number;
  applicationsUnderReview: number;
  totalValue: number;
}

export interface NILDeal {
  id: string;
  position?: string;
  description?: string;
  industry?: string;
  createdDate: string;
  salary?: number;
  status?: string;
  company?: { id: string; companyName?: string; industry?: string };
  athleteName?: string;
}

export interface UniversityNILOversightResponse {
  metrics: NILOversightMetrics;
  recentDeals: NILDeal[];
}

export const getUniversityNILOversight = async (
  authHeader: string | null
): Promise<UniversityNILOversightResponse> => {
  const response = await axios.get(`${url}/getUniversityNILOversight`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

// ── Career Outcomes ──────────────────────────────────────────────────────────

export interface YearComparison {
  current: number;
  lastYear: number;
}

export interface StudentJobOutcomes {
  placementRate: YearComparison;
  averageSalary: YearComparison;
  timeToPlacement: YearComparison;
  activeJobSeekers: YearComparison;
}

export const getStudentJobOutcomes = async (
  authHeader: string | null
): Promise<StudentJobOutcomes> => {
  const response = await axios.get(`${url}/getStudentJobOutcomes`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export interface OutcomeFilters {
  sport?: string;
  industry?: string;
  year?: string;
  hasJob?: boolean;
}

export interface PlacementBySport {
  sport: string;
  totalAthletes: number;
  athletesWithJobs: number;
}

export const getPlacementBySport = async (
  authHeader: string | null,
  filters?: OutcomeFilters
): Promise<PlacementBySport[]> => {
  const response = await axios.get(`${url}/getPlacementBySport`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
    params: filters,
  });

  return response.data;
};

export interface SalaryDistribution {
  over100k: number;
  range80kTo99k: number;
  range60kTo79k: number;
  range40kTo59k: number;
  under40k: number;
}

export const getSalaryDistribution = async (
  authHeader: string | null,
  filters?: OutcomeFilters
): Promise<SalaryDistribution> => {
  const response = await axios.get(`${url}/getSalaryDistribution`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
    params: filters,
  });

  return response.data;
};

export interface StudentOutcome {
  id: string;
  name: string;
  sport?: string;
  hasJob: boolean;
  major?: string;
  gpa?: number;
  industry?: string;
  graduationDate?: string;
  internshipCount: number;
  nilCount: number;
  location?: string;
}

export const getStudentOutcomes = async (
  authHeader: string | null,
  filters?: OutcomeFilters
): Promise<StudentOutcome[]> => {
  const response = await axios.get(`${url}/getStudentOutcomes`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
    params: filters,
  });

  return response.data;
};
