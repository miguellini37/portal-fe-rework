import { FC, useState } from 'react';
import Modal from 'react-modal';
import { UserDropdown, UserOption } from './Dropdowns/UserDropdown';
import { SingleValue } from 'react-select';
import { IGetAllUsersInput } from '../api/admin';

interface ChangeOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ownerId: string) => Promise<void>;
  userFilter?: IGetAllUsersInput;
  title?: string;
}

export const ChangeOwnerModal: FC<ChangeOwnerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userFilter,
  title = 'Change Owner',
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId) {
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(selectedUserId);
      setSelectedUserId('');
      onClose();
    } catch (error) {
      console.error('Error changing owner:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUserChange = (newValue: SingleValue<UserOption>) => {
    setSelectedUserId(newValue?.value || '');
  };

  const handleClose = () => {
    setSelectedUserId('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel={title}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '500px',
          width: '90%',
          padding: '2rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--card)',
          overflow: 'visible',
        },
      }}
    >
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="ownerId"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
          >
            Select New Owner <span style={{ color: 'red' }}>*</span>
          </label>
          <UserDropdown
            id="ownerId"
            selected={selectedUserId}
            onChange={handleUserChange}
            disabled={submitting}
            filter={userFilter}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: 'var(--muted)',
              color: 'var(--foreground)',
              borderRadius: '0.375rem',
              border: '1px solid var(--border)',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontWeight: '500',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !selectedUserId}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: submitting || !selectedUserId ? 'var(--muted)' : 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: submitting || !selectedUserId ? 'not-allowed' : 'pointer',
              fontWeight: '500',
            }}
          >
            {submitting ? 'Updating...' : 'Update Owner'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
