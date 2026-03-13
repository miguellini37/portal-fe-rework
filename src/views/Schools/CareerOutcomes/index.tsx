import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getStudentJobOutcomes,
  getPlacementBySport,
  getSalaryDistribution,
  getStudentOutcomes,
  StudentJobOutcomes,
  PlacementBySport,
  SalaryDistribution,
  StudentOutcome,
  OutcomeFilters,
} from '../../../api/school';
import { useAuthHeader } from '../../../auth/hooks';
import './CareerOutcomes.css';
import '../../../styles/searchPage.css';

const formatCurrency = (value: number): string => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value.toLocaleString()}`;
};

const formatDelta = (current: number, lastYear: number): { text: string; direction: 'up' | 'down' } => {
  if (lastYear === 0) return { text: '+0%', direction: 'up' };
  const pct = ((current - lastYear) / lastYear) * 100;
  const sign = pct >= 0 ? '+' : '';
  return {
    text: `${sign}${pct.toFixed(1)}% vs last year`,
    direction: pct >= 0 ? 'up' : 'down',
  };
};

export const CareerOutcomes: React.FC = () => {
  const authHeader = useAuthHeader();

  const [jobOutcomes, setJobOutcomes] = useState<StudentJobOutcomes | null>(null);
  const [placementBySport, setPlacementBySport] = useState<PlacementBySport[]>([]);
  const [salaryDist, setSalaryDist] = useState<SalaryDistribution | null>(null);
  const [students, setStudents] = useState<StudentOutcome[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [filterSport, setFilterSport] = useState<string>('');
  const [filterIndustry, setFilterIndustry] = useState<string>('');
  const [filterYear, setFilterYear] = useState<string>('');
  const [filterHasJob, setFilterHasJob] = useState<boolean>(false);

  const buildFilters = (): OutcomeFilters => {
    const filters: OutcomeFilters = {};
    if (filterSport) filters.sport = filterSport;
    if (filterIndustry) filters.industry = filterIndustry;
    if (filterYear) filters.year = filterYear;
    if (filterHasJob) filters.hasJob = true;
    return filters;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const filters = buildFilters();
        const [outcomes, sports, salary, studentList] = await Promise.all([
          getStudentJobOutcomes(authHeader),
          getPlacementBySport(authHeader, filters),
          getSalaryDistribution(authHeader, filters),
          getStudentOutcomes(authHeader, filters),
        ]);
        setJobOutcomes(outcomes);
        setPlacementBySport(sports);
        setSalaryDist(salary);
        setStudents(studentList);
      } catch (error) {
        console.error('Error fetching career outcomes:', error);
        toast.error('Failed to load career outcomes data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterSport, filterIndustry, filterYear, filterHasJob]);

  // Derive unique values for filter dropdowns
  const sportOptions = Array.from(new Set(students.map((s) => s.sport).filter(Boolean))) as string[];
  const industryOptions = Array.from(new Set(students.map((s) => s.industry).filter(Boolean))) as string[];

  // Salary distribution rendering helpers
  const salaryBuckets = salaryDist
    ? [
        { label: '$100k+', count: salaryDist.over100k },
        { label: '$80-99k', count: salaryDist.range80kTo99k },
        { label: '$60-79k', count: salaryDist.range60kTo79k },
        { label: '$40-59k', count: salaryDist.range40kTo59k },
        { label: '<$40k', count: salaryDist.under40k },
      ]
    : [];

  const maxBucketCount = Math.max(...salaryBuckets.map((b) => b.count), 1);

  // Metric cards data
  const metrics = jobOutcomes
    ? [
        {
          label: 'Placement Rate',
          value: `${jobOutcomes.placementRate.current}%`,
          ...formatDelta(jobOutcomes.placementRate.current, jobOutcomes.placementRate.lastYear),
        },
        {
          label: 'Average Salary',
          value: formatCurrency(jobOutcomes.averageSalary.current),
          ...formatDelta(jobOutcomes.averageSalary.current, jobOutcomes.averageSalary.lastYear),
        },
        {
          label: 'Time to Placement',
          value: `${jobOutcomes.timeToPlacement.current} days`,
          ...formatDelta(jobOutcomes.timeToPlacement.lastYear, jobOutcomes.timeToPlacement.current),
        },
        {
          label: 'Active Job Seekers',
          value: jobOutcomes.activeJobSeekers.current.toLocaleString(),
          ...formatDelta(jobOutcomes.activeJobSeekers.current, jobOutcomes.activeJobSeekers.lastYear),
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="career-outcomes">
        <div className="career-outcomes-container">
          <div className="career-outcomes-header">
            <h1 className="career-outcomes-title">Career Outcomes</h1>
            <p className="career-outcomes-subtitle">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="career-outcomes">
      <div className="career-outcomes-container">
        {/* Header */}
        <div className="career-outcomes-header">
          <h1 className="career-outcomes-title">Career Outcomes</h1>
          <p className="career-outcomes-subtitle">
            Track student-athlete career development and placement metrics
          </p>
        </div>

        {/* Top row: metric cards */}
        <div className="co-metrics-grid">
          {metrics.map((m, i) => (
            <div className="co-metric-card" key={i}>
              <div className="co-metric-label">{m.label}</div>
              <div className="co-metric-value">{m.value}</div>
              <div className={`co-metric-comparison ${m.direction}`}>
                <span className="arrow">{m.direction === 'up' ? '\u25B2' : '\u25BC'}</span>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Middle section: two columns */}
        <div className="co-middle-section">
          {/* Left: Placement by Sport */}
          <div className="co-panel">
            <h2 className="co-panel-title">Placement by Sport</h2>
            {placementBySport.length === 0 ? (
              <div className="co-empty">No placement data available</div>
            ) : (
              <table className="co-sport-table">
                <thead>
                  <tr>
                    <th>Sport</th>
                    <th>Athletes</th>
                    <th>Placed</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {placementBySport.map((row) => {
                    const pct =
                      row.totalAthletes > 0
                        ? Math.round((row.athletesWithJobs / row.totalAthletes) * 100)
                        : 0;
                    return (
                      <tr key={row.sport}>
                        <td>{row.sport}</td>
                        <td>{row.totalAthletes}</td>
                        <td>{row.athletesWithJobs}</td>
                        <td>
                          <div className="co-percentage-cell">
                            <div className="co-percentage-bar-bg">
                              <div
                                className="co-percentage-bar-fill"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="co-percentage-label">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Right: Salary Distribution */}
          <div className="co-panel">
            <h2 className="co-panel-title">Salary Distribution</h2>
            {salaryBuckets.length === 0 ? (
              <div className="co-empty">No salary data available</div>
            ) : (
              <div className="co-salary-bars">
                {salaryBuckets.map((bucket) => {
                  const widthPct = Math.max((bucket.count / maxBucketCount) * 100, 2);
                  return (
                    <div className="co-salary-row" key={bucket.label}>
                      <span className="co-salary-label">{bucket.label}</span>
                      <div className="co-salary-bar-bg">
                        <div
                          className="co-salary-bar-fill"
                          style={{ width: `${widthPct}%` }}
                        >
                          <span className="co-salary-bar-count">{bucket.count}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom section: Student Outcomes */}
        <div className="co-outcomes-section">
          <h2 className="co-panel-title">Student Outcomes</h2>

          {/* Filter bar */}
          <div className="co-filter-bar">
            <select
              className="co-filter-select"
              value={filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
            >
              <option value="">All Sports</option>
              {sportOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              className="co-filter-select"
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
            >
              <option value="">All Industries</option>
              {industryOptions.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>

            <select
              className="co-filter-select"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>

            <label className="co-filter-toggle">
              <input
                type="checkbox"
                checked={filterHasJob}
                onChange={(e) => setFilterHasJob(e.target.checked)}
              />
              Has Job
            </label>
          </div>

          {/* Table */}
          <div className="co-outcomes-table-wrapper">
            {students.length === 0 ? (
              <div className="co-empty">No student outcomes to display</div>
            ) : (
              <table className="co-outcomes-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sport</th>
                    <th>Major</th>
                    <th>GPA</th>
                    <th>Industry</th>
                    <th>Has Job</th>
                    <th>Internships</th>
                    <th>NIL Deals</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.sport || '-'}</td>
                      <td>{student.major || '-'}</td>
                      <td>{student.gpa != null ? student.gpa.toFixed(2) : '-'}</td>
                      <td>{student.industry || '-'}</td>
                      <td>
                        <span className={`co-badge ${student.hasJob ? 'green' : 'red'}`}>
                          {student.hasJob ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>{student.internshipCount}</td>
                      <td>{student.nilCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
