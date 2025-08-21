import { JobSearch } from './JobSearch/JobsSearch';

export const CompanyJobsPage = () => {
  return (
    <JobSearch
      pageTitle="Company Job Postings"
      pageSubtitle="Manage open positions and track student-athlete applications"
      canEditJobs
    />
  );
};
