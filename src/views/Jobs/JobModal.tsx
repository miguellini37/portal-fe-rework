import { useState } from 'react';
import { createJob, updateJob, IJobPayload } from '../../api/job';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';

interface JobModalProps {
  job?: IJobPayload | null; // If present, edit/view mode
  onClose: () => void;
  onSuccess?: () => void; // Refresh list after creation or update
  companyId?: string;
  isEdit?: boolean; // NEW: determines if fields are editable
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
    if (!isEdit) return; // prevent updates if not in edit mode
    setJobData((prev: IJobPayload) => ({ ...prev, [field]: value }));
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg text-white">
        <h2 className="text-2xl font-bold mb-4">
          {job ? (isEdit ? 'Edit Job' : 'View Job') : 'Create Job'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {!isEdit && <div>{job?.company?.companyName}</div>}
          <input
            className="form-input bg-gray-700 p-2 rounded"
            placeholder="Position"
            value={jobData.position ?? ''}
            onChange={(e) => handleChange('position', e.target.value)}
            disabled={!isEdit}
            required
          />
          <input
            className="form-input bg-gray-700 p-2 rounded"
            placeholder="Location"
            value={jobData.location ?? ''}
            onChange={(e) => handleChange('location', e.target.value)}
            disabled={!isEdit}
          />
          <input
            className="form-input bg-gray-700 p-2 rounded"
            placeholder="Salary"
            value={jobData.salary ?? ''}
            onChange={(e) => handleChange('salary', e.target.value)}
            disabled={!isEdit}
          />
          <input
            className="form-input bg-gray-700 p-2 rounded"
            placeholder="Benefit"
            value={jobData.benefit ?? ''}
            onChange={(e) => handleChange('benefit', e.target.value)}
            disabled={!isEdit}
          />
          <textarea
            className="form-input bg-gray-700 p-2 rounded"
            placeholder="Description"
            value={jobData.description ?? ''}
            onChange={(e) => handleChange('description', e.target.value)}
            disabled={!isEdit}
          />
          <textarea
            className="form-input bg-gray-700 p-2 rounded"
            placeholder="Requirements"
            value={jobData.requirements ?? ''}
            onChange={(e) => handleChange('requirements', e.target.value)}
            disabled={!isEdit}
          />
          <select
            className="form-input bg-gray-700 p-2 rounded"
            value={jobData.type ?? ''}
            onChange={(e) => handleChange('type', e.target.value)}
            disabled={!isEdit}
          >
            <option value="">Select Type</option>
            <option value="internship">Internship</option>
            <option value="job">Job</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
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
