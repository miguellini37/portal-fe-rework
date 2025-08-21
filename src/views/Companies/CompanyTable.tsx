import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCompanies, ICompanyPaylod } from '../../api/company';
import { CompanyCard } from './CompanyCard';

interface CompanySearchProps {
  pageTitle?: string;
  pageSubtitle?: string;
}

export const CompanySearch: React.FC<CompanySearchProps> = ({
  pageTitle = 'Search Companies',
  pageSubtitle = 'Discover companies and explore their opportunities',
}) => {
  const [companies, setCompanies] = useState<ICompanyPaylod[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch {
      toast.error('Failed to fetch companies');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) =>
      company.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page-root">
      {/* Header */}
      <div className="search-page-header">
        <h1 className="search-page-title">{pageTitle}</h1>
        <div className="search-page-subtitle">{pageSubtitle}</div>
      </div>

      {/* Search Section */}
      <div className="search-page-searchbar-row">
        <input
          className="search-page-searchbar"
          type="text"
          placeholder="Search companies by name, industry, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-page-results-count">
          {filteredCompanies.length} result{filteredCompanies.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="search-page-grid">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="empty-state">
          <p>
            {searchTerm
              ? `No companies found matching "${searchTerm}"`
              : 'No companies available for search.'}
          </p>
        </div>
      )}
    </div>
  );
};
