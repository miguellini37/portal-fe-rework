import { useState } from 'react';
import { createJob, updateJob, IJobPayload } from '../../api/job';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';

interface JobModalProps {
  job?: IJobPayload | null;
  onClose: () => void;
  onSuccess?: () => void;
  companyId?: string;
  isEdit?: boolean;
}

export const JobModal: React.FC<JobModalProps> = ({
  job,
  onClose,
  onSuccess,
  companyId,
  isEdit = false,
}) => {
  const authHeader = useAuthHeader();
  const [jobData, setJobData] = useState<IJobPayload>(job ?? {});

  const handleChange = (field: keyof IJobPayload, value: string) => {
    if (!isEdit) return;
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (job?.id) {
        await updateJob({ ...jobData, id: job.id }, authHeader);
        toast.success('Job updated successfully');
      } else {
        await createJob({ ...jobData, companyId }, authHeader);
        toast.success('Job created successfully');
      }
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save job');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl text-white">
        <h2 className="text-2xl font-bold mb-4">
          {job ? (isEdit ? 'Edit Job' : 'View Job') : 'Create Job'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isEdit && <div className="md:col-span-2">{job?.company?.companyName}</div>}
          <div>
            <label htmlFor="type" className="block text-sm text-gray-300 mb-1">
              Type
            </label>
            <select
              id="type"
              className="form-input bg-gray-700 p-2 rounded w-full"
              value={jobData.type ?? ''}
              onChange={(e) => handleChange('type', e.target.value)}
              disabled={!isEdit}
            >
              <option value="">Select Type</option>
              <option value="internship">Internship</option>
              <option value="job">Job</option>
            </select>
          </div>
          <div></div>

          <div>
            <label htmlFor="position" className="block text-sm text-gray-300 mb-1">
              Position
            </label>
            <input
              id="position"
              className="form-input bg-gray-700 p-2 rounded w-full"
              value={jobData.position ?? ''}
              onChange={(e) => handleChange('position', e.target.value)}
              disabled={!isEdit}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm text-gray-300 mb-1">
              Location
            </label>
            <input
              id="location"
              className="form-input bg-gray-700 p-2 rounded w-full"
              value={jobData.location ?? ''}
              onChange={(e) => handleChange('location', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm text-gray-300 mb-1">
              Salary
            </label>
            <input
              id="salary"
              className="form-input bg-gray-700 p-2 rounded w-full"
              value={jobData.salary ?? ''}
              onChange={(e) => handleChange('salary', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div>
            <label htmlFor="benefit" className="block text-sm text-gray-300 mb-1">
              Benefit
            </label>
            <input
              id="benefit"
              className="form-input bg-gray-700 p-2 rounded w-full"
              value={jobData.benefit ?? ''}
              onChange={(e) => handleChange('benefit', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              className="form-input bg-gray-700 p-2 rounded w-full"
              value={jobData.description ?? ''}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="requirements" className="block text-sm text-gray-300 mb-1">
              Requirements
            </label>
            <textarea
              id="requirements"
              className="form-input bg-gray-700 p-2 rounded w-full"
              value={jobData.requirements ?? ''}
              onChange={(e) => handleChange('requirements', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Close
            </button>
            {isEdit && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {job ? 'Update Job' : 'Create Job'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
