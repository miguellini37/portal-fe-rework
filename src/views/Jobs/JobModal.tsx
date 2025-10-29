import { useState } from 'react';
import {
  createJob,
  IJobPayload,
  ICreateOrUpdateJobPayload,
  updateJob,
  JobStatus,
} from '../../api/job';
import { useAuthHeader } from '../../auth/hooks';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { IndustryDropdown } from '../../components/Dropdowns/IndustryDropdown';
import CurrencyInput from 'react-currency-input-field';

interface JobModalProps {
  job?: IJobPayload | null;
  onClose: () => void;
  onSuccess?: () => void;
  companyId?: string;
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose, onSuccess, companyId }) => {
  const authHeader = useAuthHeader();
  const [jobData, setJobData] = useState<ICreateOrUpdateJobPayload>({
    position: job?.position || '',
    location: job?.location || '',
    salary: job?.salary,
    benefits: job?.benefits || '',
    description: job?.description || '',
    requirements: job?.requirements || '',
    type: job?.type || '',
    experience: job?.experience || '',
    industry: job?.industry || '',
    applicationDeadline: job?.applicationDeadline,
    companyId: companyId,
    status: job?.status || JobStatus.Open,
  });

  const handleChange = (field: keyof ICreateOrUpdateJobPayload, value: string | number | Date) => {
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (job?.id) {
        await updateJob({ ...jobData, id: job.id }, authHeader);
        toast.success('Job updated successfully');
      } else {
        await createJob(jobData, authHeader);
        toast.success('Job created successfully');
      }
      onSuccess?.();
      onClose();
    } catch {
      toast.error('Failed to save job');
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      contentLabel="Job Modal"
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2>{job ? 'Edit Job' : 'Create New Job'}</h2>
        </div>

        <div className="modal-content-wrapper">
          <form id="job-form" onSubmit={handleSubmit} className="job-modal-form">
            <div className="job-form-section">
              <h3>Job Details</h3>
              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Job Type</label>
                  <select
                    value={jobData.type ?? ''}
                    onChange={(e) => handleChange('type', e.target.value)}
                    required
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div className="job-form-group">
                  <label>Experience Level</label>
                  <input
                    type="text"
                    placeholder="e.g., Entry Level, Mid Level, Senior"
                    value={jobData.experience ?? ''}
                    onChange={(e) => handleChange('experience', e.target.value)}
                  />
                </div>
              </div>

              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Industry</label>
                  <IndustryDropdown
                    selected={jobData.industry}
                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        handleChange('industry', selectedOption.value);
                      }
                    }}
                    required
                  />
                </div>

                <div className="job-form-group">
                  <label>Application Deadline</label>
                  <input
                    type="date"
                    value={
                      jobData?.applicationDeadline
                        ? new Date(jobData.applicationDeadline).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      const date = new Date(value);
                      if (
                        value &&
                        !isNaN(date.getTime()) &&
                        value === date.toISOString().split('T')[0]
                      ) {
                        handleChange('applicationDeadline', date);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Position Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Software Engineer"
                    value={jobData.position ?? ''}
                    onChange={(e) => handleChange('position', e.target.value)}
                    required
                  />
                </div>

                <div className="job-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="e.g., New York, NY or Remote"
                    value={jobData.location ?? ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>
              </div>

              <div className="job-form-group full-width">
                <label>Salary</label>
                <CurrencyInput
                  placeholder="$80,000"
                  value={jobData.salary}
                  onValueChange={(value) => {
                    const numericValue = value ? parseInt(value) : 0;
                    handleChange('salary', numericValue);
                  }}
                  prefix="$"
                  decimalsLimit={0}
                  allowDecimals={false}
                  allowNegativeValue={false}
                />
              </div>
            </div>

            <div className="job-form-section">
              <h3>Position Description</h3>
              <div className="job-form-group full-width">
                <label>Job Description</label>
                <textarea
                  placeholder="Describe the role, responsibilities, and what the candidate will be doing..."
                  value={jobData.description ?? ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="job-form-section">
              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Requirements</label>
                  <textarea
                    placeholder="List the required skills, qualifications, and experience..."
                    value={jobData.requirements ?? ''}
                    onChange={(e) => handleChange('requirements', e.target.value)}
                  />
                </div>

                <div className="job-form-group">
                  <label>Benefits</label>
                  <textarea
                    placeholder="List the benefits and perks offered..."
                    value={jobData.benefits ?? ''}
                    onChange={(e) => handleChange('benefits', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" form="job-form">
            {job ? 'Update Job' : 'Create Job'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
