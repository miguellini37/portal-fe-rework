import { FC, useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import {
  createInterview,
  getInterview,
  ICreateInterviewInput,
  InterviewStatus,
  IUpdateInterviewInput,
  updateInterview,
} from '../../api/interview';
import { isoToLocalInputValue, localInputValueToISO } from '../../util/date';
import { toast } from 'react-toastify';

interface Props {
  applicationId: string;
  interviewId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewModal: FC<Props> = ({ interviewId, applicationId, isOpen, onClose }) => {
  const authHeader = useAuthHeader();

  const [form, setForm] = useState<ICreateInterviewInput>();

  useEffect(() => {
    if (!interviewId && !applicationId) {
      return;
    }

    getInterview(authHeader, { interviewId, applicationId }).then((data) => {
      setForm({
        applicationId,
        status: data?.status ?? InterviewStatus.Scheduled,
        dateTime: data?.dateTime ?? new Date(),
        location: data?.location ?? '',
        interviewer: data?.interviewer ?? '',
        preparationTips: data?.preparationTips ?? '',
      });
    });
  }, [interviewId, applicationId]);

  const handleChange = useCallback(
    <K extends keyof ICreateInterviewInput>(k: K, v: ICreateInterviewInput[K]) => {
      setForm((prev) => {
        // ensure dateTime defaults to a Date, not an empty string
        const base: ICreateInterviewInput = prev ?? { applicationId, dateTime: new Date() };
        return { ...base, [k]: v };
      });
    },
    [applicationId]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (interviewId) {
      await updateInterview(authHeader, { ...form, id: interviewId } as IUpdateInterviewInput);
    } else {
      await createInterview(authHeader, form as ICreateInterviewInput);
    }
    toast.success(`Interview ${interviewId ? 'updated' : 'scheduled'} successfully`);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      contentLabel="Interview Modal"
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2>{interviewId ? 'Update Interview' : 'Schedule Interview'}</h2>
        </div>

        <div className="modal-content-wrapper">
          <form id="interview-form" onSubmit={handleSubmit} className="job-modal-form">
            <div className="job-form-section">
              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Date & Time</label>
                  <input
                    type="datetime-local"
                    value={isoToLocalInputValue(form?.dateTime)}
                    onChange={(e) => {
                      const iso = localInputValueToISO(e.target.value);
                      handleChange('dateTime', new Date(iso));
                    }}
                    required
                  />
                </div>

                <div className="job-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Zoom, Office HQ, or phone"
                    value={form?.location ?? ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="job-form-row">
                <div className="job-form-group">
                  <label>Interviewer</label>
                  <input
                    type="text"
                    placeholder="Name of interviewer"
                    value={form?.interviewer ?? ''}
                    onChange={(e) => handleChange('interviewer', e.target.value)}
                    required
                  />
                </div>

                <div className="job-form-group">
                  <label>Preparation Tips</label>
                  <textarea
                    placeholder="Share any preparation tips or materials"
                    value={form?.preparationTips ?? ''}
                    onChange={(e) => handleChange('preparationTips', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" form="interview-form">
            {interviewId ? 'Update Interview' : 'Schedule'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
