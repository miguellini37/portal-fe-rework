import { IActivity,ActivityType } from '../../api/activity';

export const buildActivityPath = (a: IActivity): string => {
  if (a.type === ActivityType.APPLICATION) {
    const jobId = a.application?.job?.id;
    return jobId ? `/job/${jobId}` : '/applications';
  }
  if (a.type === ActivityType.INTERVIEW) {
    return `/interviews`;
  }
  return '/activity';
};
