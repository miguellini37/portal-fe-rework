import React from 'react';
import { IJobPayload } from '../../../api/job';

interface OverviewTabProps {
  job: IJobPayload;
}

export const Overview: React.FC<OverviewTabProps> = ({ job }) => {
  const formatSalary = (salary: number | undefined) => {
    if (!salary) {
      return 'Not specified';
    }
    return `$${salary.toLocaleString()}`;
  };
  const formatDate = (date: Date | string | undefined) => {
    if (!date) {
      return '-';
    }
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {job.position || 'Position Not Specified'}
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              {job.company?.companyName || 'Company Not Specified'}
            </p>
          </div>

          {/* Only show salary here; actions moved to JobPage header */}
          <div className="text-right ml-6">
            <p className="text-xl font-bold text-green-600 mb-1">{formatSalary(job.salary)}</p>
            {job.type && (
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-gray-100">
          <div className="text-center md:text-left">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Location
            </div>
            <div className="text-base font-medium text-gray-900">
              {job.location || 'Not specified'}
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Experience
            </div>
            <div className="text-base font-medium text-gray-900">
              {job.experience || 'Not specified'}
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Industry
            </div>
            <div className="text-base font-medium text-gray-900">
              {job.industry || 'Not specified'}
            </div>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="pt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 font-medium">Posted</span>
                <span className="text-gray-900 font-medium">{formatDate(job.createdDate)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600 font-medium">Application Deadline</span>
                <span className="text-gray-900 font-medium">
                  {formatDate(job.applicationDeadline)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Description */}
      {job.description && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
              {job.description}
            </div>
          </div>
        </div>
      )}

      {/* Benefits */}
      {(job.benefits || job.benefit) && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
              {job.benefits || job.benefit}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
