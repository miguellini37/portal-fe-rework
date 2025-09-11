import { JobSearch } from './JobSearch/JobsSearch';

export const InternshipSearchPage = () => {
  return (
    <JobSearch
      pageTitle="Search Internships"
      pageSubtitle="Search for internship opportunities and apply"
      additionalFilters={{ type: ['internship'] }}
      canApplyToJob
    />
  );
};
