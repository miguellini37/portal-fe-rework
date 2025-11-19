import { useEffect, useState } from 'react';
import { useAuthHeader } from '../../../auth/hooks';
import { getAthletes, GetAthletesFilter, GetAthletesResponse } from '../../../api/athlete';
import { AthleteCard } from './AthleteCard';
import { CardTable } from '../../../components/CardTable';

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
    <div className="search-page-root">
      <div className="search-page-header">
        <h1 className="search-page-title">Talent Pool</h1>
        <div className="search-page-subtitle">
          Discover and connect with elite NCAA student-athletes
        </div>
      </div>
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search by name, school, major, or sport..."
          value={filter.wildcardTerm}
          onChange={(e) => setFilter((prev) => ({ ...prev, wildcardTerm: e.target.value }))}
        />
        {/* <button className="search-page-filters-btn">Filters</button> */}
        <div className="search-page-results-count">{athletes.length} results</div>
      </div>
      <CardTable minCardWidth={350}>
        {athletes.map((athlete, i) => (
          <AthleteCard key={i} athlete={athlete} />
        ))}
      </CardTable>
    </div>
  );
};
