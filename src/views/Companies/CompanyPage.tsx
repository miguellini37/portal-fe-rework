import { useEffect, useMemo, useState } from 'react';
import { getCompanyById, ICompanyPaylod, updateCompany } from '../../api/company';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../../auth/store';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { JobModal } from '../Jobs/JobModal';
import { IJobPayload } from '../../api/job';
import { JobsTable } from '../Jobs/JobsTable';
import './CompanyPage.css';

export const CompanyPage = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const user = useAuthUser<IUserData>();
  const { id } = useParams<{ id: string }>();

  const [company, setCompany] = useState<ICompanyPaylod>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<IJobPayload | null>(null);

  const fetchCompany = async () => {
    try {
      const company = await getCompanyById(id as string, authHeader);
      setCompany(company);
    } catch {
      toast.error('Failed to fetch company');
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchCompany();
  }, [id]);

  const canEditPage = useMemo(() => {
    return user?.id === company.ownerRefId;
  }, [user, company]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateCompany(company, authHeader);
      toast.success('Company updated successfully');
    } catch {
      toast.error('Error updating company');
    }
  };

  return (
    <div className="company-page">
      <div className="company-page__header">
        <h2 className="company-page__title">{company.companyName || 'Company'}</h2>
      </div>

      <form onSubmit={onSubmit} className="company-page__form">
        {/* Company Name */}
        <div className="company-page__form-group">
          <label htmlFor="companyName" className="company-page__label">
            Company Name
          </label>
          {canEditPage ? (
            <input
              id="companyName"
              className="form-input"
              placeholder="Company Name"
              value={company?.companyName ?? ''}
              onChange={(e) => setCompany((prev) => ({ ...prev, companyName: e.target.value }))}
              required
            />
          ) : (
            <p className="company-page__text">{company?.companyName || 'Not Provided'}</p>
          )}
        </div>

        {/* Industry */}
        <div className="company-page__form-group">
          <label htmlFor="industry" className="company-page__label">
            Industry
          </label>
          {canEditPage ? (
            <input
              id="industry"
              className="form-input"
              placeholder="Industry"
              value={company?.industry ?? ''}
              onChange={(e) => setCompany((prev) => ({ ...prev, industry: e.target.value }))}
              required
            />
          ) : (
            <p className="company-page__text">{company?.industry || 'Not Provided'}</p>
          )}
        </div>

        {/* Action Buttons */}
        {canEditPage && (
          <div className="company-page__actions">
            <button type="submit" className="btn btn-primary">
              Submit Profile
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        )}
      </form>

      {/* Create Job Button */}
      {canEditPage && (
        <div className="company-page__create-job">
          <button
            onClick={() => {
              setSelectedJob(null);
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            Create Job
          </button>
        </div>
      )}

      {/* Jobs Table */}
      <div className="company-page__jobs">
        <h3 className="company-page__jobs-title">Jobs</h3>
        <JobsTable
          jobs={company.jobs ?? []}
          onView={(job: IJobPayload) => {
            setSelectedJob(job);
            setShowModal(true);
          }}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <JobModal
          job={selectedJob}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchCompany();
            setShowModal(false);
          }}
          companyId={id}
          isEdit={canEditPage}
        />
      )}
    </div>
  );
};
