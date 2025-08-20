import { FC, useState } from 'react';
import { IJobPayload } from '../../api/job';
import './JobPostingsDashboard.css';

interface JobPostingsDashboardProps {
  jobs: IJobPayload[];
  onView: (job: IJobPayload) => void;
  onEdit?: (job: IJobPayload) => void;
  onCreate?: () => void;
  companyName?: string;
}

export const JobPostingsDashboard: FC<JobPostingsDashboardProps> = ({
  jobs,
  onView,
  onEdit: _onEdit,
  onCreate,
  companyName = 'Company',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="job-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <div className="company-icon">📦</div>
            <div>
              <h1>{companyName} Job Postings</h1>
              <p>Manage open positions and track student-athlete applications</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="post-job-btn" onClick={onCreate}>
              + Post New Job
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        {/* <div className="search-section">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search job titles, departments, job codes, or hiring managers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="filters-btn" onClick={() => setShowFilters(!showFilters)}>
            🔽 Filters
          </button>
        </div> */}
      </div>

      {/* Job Cards */}
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div className="job-title-section">
                <h3 className="job-title">{job.position || 'Associate'}</h3>
                <div className="job-tags">
                  <span className="job-type-tag">{job.type || 'full-time'}</span>
                  <span className="job-location-tag">📍 {job.location || 'Chicago'}</span>
                  <span className="job-experience-tag">🎯 {job.experience || 'Entry Level'}</span>
                </div>
              </div>
              <div className="job-actions-menu">
                <button className="action-menu-btn">⋯</button>
              </div>
            </div>

            <div className="job-details">
              <div className="job-info">
                {job.salary && <div className="salary-info">� ${job.salary.toLocaleString()}</div>}
                <div className="job-meta-info">
                  {job.createdDate && (
                    <div>📅 Posted {new Date(job.createdDate).toLocaleDateString()}</div>
                  )}
                  {job.industry && <div>🏢 {job.industry}</div>}
                  {job.applicationDeadline && (
                    <div>⏰ Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</div>
                  )}
                </div>
              </div>

              {(job.benefits || job.description) && (
                <div className="job-additional-info">
                  {job.description && (
                    <div className="job-description">
                      <strong>Description:</strong> {job.description.substring(0, 150)}
                      {job.description.length > 150 && '...'}
                    </div>
                  )}
                  {job.benefits && (
                    <div className="job-benefits">
                      <strong>Benefits:</strong> {job.benefits.substring(0, 100)}
                      {job.benefits.length > 100 && '...'}
                    </div>
                  )}
                </div>
              )}

              {job.requirements && (
                <div className="job-requirements">
                  <strong>Requirements:</strong> {job.requirements.substring(0, 120)}
                  {job.requirements.length > 120 && '...'}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="job-actions">
              <button className="action-btn secondary" onClick={() => onView(job)}>
                👁️ View Details
              </button>
              <button
                className="action-btn primary"
                onClick={() => {
                  /* Handle view applications */
                }}
              >
                👥 View Applications
              </button>
              <button
                className="action-btn tertiary"
                onClick={() => {
                  /* Handle analytics */
                }}
              >
                📊 Analytics
              </button>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="empty-state">
          <p>No job postings found.</p>
        </div>
      )}
    </div>
  );
};

// <div className="job-details">
//   <div className="job-info">
//     <div className="salary-info">💰 {formatSalary(job.salary)}</div>
//     <div className="job-meta-info">
//       📅 Posted {job ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
//       👤 {job.hiringManager || 'Hiring Manager'}
//       💼 Budget: {formatSalary(job.budget)}
//     </div>
//   </div>

//   <div className="job-tags">
//     <span className={`status-tag ${getStatusColor(job.status)}`}>
//       {job.status === 'active'
//         ? '✅ Active'
//         : job.status === 'high-priority'
//           ? '🔥 High Priority'
//           : '⏸️ Inactive'}
//     </span>
//     {getJobTypeTag(job).map((tag, index) => (
//       <span key={index} className="feature-tag">
//         {tag === 'Athlete-Friendly' && '🏃'}
//         {tag === 'Flexible Schedule' && '⏰'}
//         {tag === 'Recent Grad Friendly' && '🎓'}
//         {tag}
//       </span>
//     ))}
//   </div>
// </div>

// {/* Job Performance Metrics */}
// <div className="job-metrics">
//   <div className="metric">
//     <div className="metric-number">{job.applications?.length || 156}</div>
//     <div className="metric-label">Total Applications</div>
//   </div>
//   <div className="metric">
//     <div className="metric-number athlete-applications">
//       {Math.floor((job.applications?.length || 156) * 0.43)}
//     </div>
//     <div className="metric-label">Athlete Applications</div>
//     <div className="metric-percentage">43% of total</div>
//   </div>
//   <div className="metric">
//     <div className="metric-number interviews">
//       {Math.floor((job.applications?.length || 156) * 0.12)}
//     </div>
//     <div className="metric-label">Interviews Scheduled</div>
//     <div className="metric-percentage">12% conversion</div>
//   </div>
//   <div className="metric">
//     <div className="metric-number hires">{job.hires || 3}</div>
//     <div className="metric-label">Successful Hires</div>
//     <div className="metric-percentage">17% success rate</div>
//   </div>
// </div>
