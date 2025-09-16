import { IActivity } from '../../api/activity';

export const buildActivityPath = (a: IActivity): string => {
  if (a.type === 'application') {
    const jobId = a.application?.job?.id;
    return jobId ? `/job/${jobId}` : '/applications';
  }
  if (a.type === 'interview') {
    const id = a.interview?.id;
    return id ? `/interviews/${id}` : '/interviews';
  }
  return '/activity';
};