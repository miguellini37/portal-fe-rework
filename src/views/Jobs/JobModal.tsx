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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{job ? (isEdit ? 'Edit Job' : 'View Job') : 'Create Job'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          {!isEdit && <div className="full-span">{job?.company?.companyName}</div>}

          <div>
            <label htmlFor="type" className="modal-label">
              Type
            </label>
            <select
              id="type"
              className="modal-input"
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
            <label htmlFor="position" className="modal-label">
              Position
            </label>
            <input
              id="position"
              className="modal-input"
              value={jobData.position ?? ''}
              onChange={(e) => handleChange('position', e.target.value)}
              disabled={!isEdit}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="modal-label">
              Location
            </label>
            <input
              id="location"
              className="modal-input"
              value={jobData.location ?? ''}
              onChange={(e) => handleChange('location', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div>
            <label htmlFor="salary" className="modal-label">
              Salary
            </label>
            <input
              id="salary"
              className="modal-input"
              value={jobData.salary ?? ''}
              onChange={(e) => handleChange('salary', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div>
            <label htmlFor="benefit" className="modal-label">
              Benefit
            </label>
            <input
              id="benefit"
              className="modal-input"
              value={jobData.benefit ?? ''}
              onChange={(e) => handleChange('benefit', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div className="full-span">
            <label htmlFor="description" className="modal-label">
              Description
            </label>
            <textarea
              id="description"
              className="modal-textarea"
              value={jobData.description ?? ''}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div className="full-span">
            <label htmlFor="requirements" className="modal-label">
              Requirements
            </label>
            <textarea
              id="requirements"
              className="modal-textarea"
              value={jobData.requirements ?? ''}
              onChange={(e) => handleChange('requirements', e.target.value)}
              disabled={!isEdit}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Close
            </button>
            {isEdit && (
              <button type="submit" className="btn-primary">
                {job ? 'Update Job' : 'Create Job'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
