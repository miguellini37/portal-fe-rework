import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import './talentPool.css';
import { getAthletes, GetAthletesFilter, GetAthletesResponse } from '../../../api/athlete';
import { AthleteCard } from './AthleteCard';

export const TalentPool = () => {
  const authHeader = useAuthHeader();
  const [athletes, setAthletes] = useState<GetAthletesResponse[]>([]);
  const [filter, setFilter] = useState<GetAthletesFilter>({});

  useEffect(() => {
    const handler = setTimeout(() => {
      getAthletes(filter, authHeader).then((data) => setAthletes(data));
    }, 250); // 250ms debounce

    return () => clearTimeout(handler);
  }, [filter, authHeader]);

  return (
    <div className="talent-pool-root">
      <div className="talent-pool-header">
        <h1 className="talent-pool-title">Talent Pool</h1>
        <div className="talent-pool-subtitle">
          Discover and connect with elite NCAA student-athletes
        </div>
      </div>
      <div className="talent-pool-searchbar-row">
        <input
          className="talent-pool-searchbar"
          type="text"
          placeholder="Search by name, school, major, or sport..."
          value={filter.wildcardTerm}
          onChange={(e) => setFilter((prev) => ({ ...prev, wildcardTerm: e.target.value }))}
        />
        {/* <button className="talent-pool-filters-btn">Filters</button> */}
        <div className="talent-pool-results-count">{athletes.length} results</div>
      </div>
      <div className="talent-pool-grid">
        {athletes.map((athlete, i) => (
          <AthleteCard key={i} athlete={athlete} />
        ))}
      </div>
    </div>
  );
};
