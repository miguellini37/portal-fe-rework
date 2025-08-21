import { JobSearch } from './JobSearch/JobsSearch';

export const JobSearchPage = () => {
  return (
    <JobSearch
      pageTitle="Search Jobs"
      pageSubtitle="Search for job opportunities and apply"
      additionalFilters={{ type: ['full-time', 'part-time'] }}
      canApplyToJob
    />
  );
};
