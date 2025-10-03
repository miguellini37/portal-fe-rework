import { useState } from 'react';
import {
  createJob,
  IJobPayload,
  ICreateOrUpdateJobPayload,
  updateJob,
  JobStatus,
} from '../../api/job';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { IndustryDropdown } from '../../components/Dropdowns/IndustryDropdown';
import { OpportunityTypeDropdown } from '../../components/Dropdowns/OpportunityTypeDropdown';
import CurrencyInput from 'react-currency-input-field';
import { AlertTriangle } from 'lucide-react';

interface NILModalProps {
  nil?: IJobPayload | null;
  onClose: () => void;
  onSuccess?: () => void;
  companyId?: string;
}

export const NILModal: React.FC<NILModalProps> = ({ nil, onClose, onSuccess, companyId }) => {
  const authHeader = useAuthHeader();
  const [nilData, setNilData] = useState<ICreateOrUpdateJobPayload>({
    position: nil?.position || '',
    location: nil?.location || '',
    salary: nil?.salary,
    benefits: nil?.benefits || '',
    description: nil?.description || '',
    requirements: nil?.requirements || '',
    type: 'nil', // Set type to 'nil' to distinguish from regular jobs
    experience: nil?.experience || '', // Maps to Opportunity Type
    industry: nil?.industry || '',
    applicationDeadline: nil?.applicationDeadline,
    companyId: companyId,
    status: nil?.status || JobStatus.Open,
  });

  const handleChange = (field: keyof ICreateOrUpdateJobPayload, value: string | number | Date) => {
    setNilData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (nil?.id) {
        await updateJob({ ...nilData, id: nil.id }, authHeader);
        toast.success('NIL opportunity updated successfully');
      } else {
        await createJob(nilData, authHeader);
        toast.success('NIL opportunity created successfully');
      }
      onSuccess?.();
      onClose();
    } catch {
      toast.error(nil ? 'Failed to update NIL opportunity' : 'Failed to create NIL opportunity');
    }
  };

  const formatApplicationDeadline = (date?: Date) => {
    if (!date) {
      return '';
    }
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const parseApplicationDeadline = (dateString: string): Date | undefined => {
    if (!dateString) {
      return undefined;
    }
    return new Date(dateString);
  };

  // Check if compensation is over $600 for warning
  const showWarning = nilData.salary && nilData.salary > 600;

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      contentLabel={nil ? 'Edit NIL Opportunity' : 'Create NIL Opportunity'}
      className="job-modal"
      overlayClassName="job-modal-overlay"
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2>{nil ? 'Edit NIL Opportunity' : 'Create New NIL Opportunity'}</h2>
        </div>

        <div className="modal-content-wrapper">
          <form id="nil-form" onSubmit={handleSubmit} className="job-modal-form">
            <div className="job-form-section">
              <h3>NIL Details</h3>
              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Opportunity Type</label>
                  <OpportunityTypeDropdown
                    selected={nilData.experience}
                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        handleChange('experience', selectedOption.value);
                      }
                    }}
                    required
                  />
                </div>

                <div className="job-form-group">
                  <label>Industry</label>
                  <IndustryDropdown
                    selected={nilData.industry}
                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        handleChange('industry', selectedOption.value);
                      }
                    }}
                    required
                  />
                </div>
              </div>

              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Position Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Brand Ambassador, Social Media Influencer"
                    value={nilData.position ?? ''}
                    onChange={(e) => handleChange('position', e.target.value)}
                    required
                  />
                </div>

                <div className="job-form-group">
                  <label>Application Deadline</label>
                  <input
                    type="date"
                    value={formatApplicationDeadline(nilData.applicationDeadline)}
                    onChange={(e) => {
                      const date = parseApplicationDeadline(e.target.value);
                      if (date) {
                        handleChange('applicationDeadline', date);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="job-form-row">
                <div className="job-form-group">
                  <label>
                    Total Compensation
                    {showWarning && (
                      <span
                        className="compensation-warning"
                        title="Warning: anything over $600 has to be reported to NIL GO"
                        style={{ marginLeft: '8px', color: '#f59e0b' }}
                      >
                        <AlertTriangle size={16} />
                      </span>
                    )}
                  </label>
                  <CurrencyInput
                    id="salary-input"
                    name="salary"
                    placeholder="$0"
                    defaultValue={nilData.salary}
                    decimalsLimit={2}
                    prefix="$"
                    onValueChange={(value) => {
                      const numericValue = value ? parseFloat(value) : undefined;
                      handleChange('salary', numericValue || 0);
                    }}
                    allowDecimals={false}
                    allowNegativeValue={false}
                  />
                  {showWarning && (
                    <div
                      className="warning-message"
                      style={{
                        fontSize: '12px',
                        color: '#f59e0b',
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <AlertTriangle size={12} />
                      Warning: anything over $600 has to be reported to NIL GO
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="job-form-section">
              <h3>Description</h3>
              <div className="job-form-group full-width">
                <label>NIL Description</label>
                <textarea
                  placeholder="Describe the NIL opportunity, responsibilities, and what the student-athlete will be doing..."
                  value={nilData.description ?? ''}
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
                    placeholder="List the required skills, qualifications, and eligibility requirements..."
                    value={nilData.requirements ?? ''}
                    onChange={(e) => handleChange('requirements', e.target.value)}
                  />
                </div>

                <div className="job-form-group">
                  <label>Perks</label>
                  <textarea
                    placeholder="List the perks and additional benefits offered..."
                    value={nilData.benefits ?? ''}
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
          <button type="submit" className="btn btn-primary" form="nil-form">
            {nil ? 'Update NIL Opportunity' : 'Create NIL Opportunity'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
