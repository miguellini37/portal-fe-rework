import { useEffect, useMemo, useState } from 'react';
import { getCompanyById, ICompanyPaylod } from '../api/company';
import { updateCompany } from '../api/company';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData } from '../api/store';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { JobModal } from './Jobs/JobModal';
import { IJobPayload } from '../api/job';
import { capitalize } from 'lodash';

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
    return user?.companyRef?.ownerRefId === company.ownerRefId;
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
    <div className="ProfileSetup relative min-h-screen p-8 bg-gray-900 text-white">
      <div className="ProfileSetup">
        <h2 className="text-4xl font-bold mb-2">{company.companyName || 'Company'}</h2>
        <form
          onSubmit={onSubmit}
          className="bg-gray-800 p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            {canEditPage ? (
              <input
                placeholder="Company Name"
                value={company?.companyName ?? ''}
                onChange={(e) => setCompany((prev) => ({ ...prev, companyName: e.target.value }))}
                required
                className="form-input w-full"
              />
            ) : (
              <p className="text-lg">{company?.companyName || 'Not Provided'}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            {canEditPage ? (
              <input
                placeholder="Industry"
                value={company?.industry ?? ''}
                onChange={(e) => setCompany((prev) => ({ ...prev, industry: e.target.value }))}
                required
                className="form-input w-full"
              />
            ) : (
              <p className="text-lg">{company?.industry || 'Not Provided'}</p>
            )}
          </div>

          {/* Action Buttons */}
          {canEditPage && (
            <div className="md:col-span-2 flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Submit Profile
              </button>
              <button
                type="button"
                className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-500"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Create Job Button */}
      {canEditPage && (
        <div className="mt-6">
          <button
            onClick={() => {
              setSelectedJob(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Job
          </button>
        </div>
      )}

      {/* Jobs Table */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Jobs</h3>
        {company?.jobs && company.jobs.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-gray-800 text-white rounded-lg">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Position</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Salary</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {company.jobs.map((job) => (
                  <tr key={job.id} className="border-t border-gray-700">
                    <td className="px-4 py-2">{job.position || 'N/A'}</td>
                    <td className="px-4 py-2">{job.location || 'N/A'}</td>
                    <td className="px-4 py-2">{job.salary || 'N/A'}</td>
                    <td className="px-4 py-2">{capitalize(job.type) || 'N/A'}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowModal(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-300">No jobs posted for this company yet.</p>
        )}
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
