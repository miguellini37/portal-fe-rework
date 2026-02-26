import axios from 'axios';
import { url } from '../config/url';
import { IJobPayload } from './job';
import { IUpdateCompanyEmployeePayload } from './companyEmployee';

export interface CustomAnalytic {
  id?: string;
  label?: string;
  value?: number;
}

export interface AnalyticsNumbers {
  hiring: {
    totalHires?: number;
    totalHiresDeltaPct?: number;
    totalInternships?: number;
    totalInternshipsDelta?: number;
    conversionToFullTimePct?: number;
    conversionToFullTimeDeltaPct?: number;
    timeToFirstSaleDays?: number;
    timeToFirstSaleDeltaDays?: number;
  };
  nil: {
    totalInvestmentUSD?: number;
    activePartnerships?: number;
  };
  custom?: CustomAnalytic[];
}

export interface CulturePayload {
  cultureValues?: CultureValue[];
  environmentTiles?: EnvironmentTile[];
  thrivePoints?: string[];
}
export interface CultureValue {
  icon?: string;
  title?: string;
  description?: string;
}
export interface EnvironmentTile {
  title?: string;
  subtitle?: string;
}

export interface BenefitsPayload {
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  commissionMin?: number;
  commissionMax?: number;
  totalCompMin?: number;
  totalCompMax?: number;
  specificBenefits?: SpecificBenefits[];
}

export interface SpecificBenefits {
  title?: string;
  description?: string[];
  icon?: string;
}

export interface RecruitingCategory {
  icon?: string;
  title?: string;
  description?: string;
}

export interface IRecruitingPayload {
  strategy?: RecruitingCategory[];
  processSteps?: string[];
  recruiterIds?: string[]; // CompanyEmployee IDs
}

export interface ICompanyPaylod {
  id?: string;
  companyName?: string;
  ownerId?: string;
  industry?: string;
  jobs?: IJobPayload[];
  culture?: CulturePayload;
  benefits?: BenefitsPayload;
  companyEmployees?: IUpdateCompanyEmployeePayload[];
  recruiting?: IRecruitingPayload;
  analytics?: AnalyticsNumbers;
}

export const getCompanyById = async (
  id: string,
  authHeader: string | null
): Promise<ICompanyPaylod> => {
  const response = await axios.get(`${url}/getCompany/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const updateCompany = async (
  data: ICompanyPaylod,
  authHeader: string | null
): Promise<ICompanyPaylod> => {
  const response = await axios.put(`${url}/updateCompany`, data, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export const getCompanies = async (authHeader: string | null): Promise<ICompanyPaylod[]> => {
  const response = await axios.get(`${url}/getCompanies`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
  });

  return response.data;
};

export interface ICompanyPayloadLite {
  id?: string;
  companyName?: string;
}
export const getCompaniesForDropdown = async (
  authHeader: string | null,
  wildcardTerm?: string
): Promise<ICompanyPayloadLite[]> => {
  const response = await axios.get(`${url}/getCompaniesForDropdown`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: authHeader,
    },
    params: wildcardTerm ? { wildcardTerm } : undefined,
  });

  return response.data;
};
