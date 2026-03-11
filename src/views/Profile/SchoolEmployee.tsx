import { useState, useEffect } from 'react';
import { useAuthHeader } from '../../auth/hooks';
import { useAuthUser } from '../../auth/hooks';
import { toast } from 'react-toastify';
import {
  getSchoolEmployeeById,
  IUpdateSchoolEmployeePayload,
  updateSchoolEmployee,
} from '../../api/schoolEmployee';
import './Profiles.css';
import { AccountDeniedBanner } from '../../components/AccountDeniedBanner';
import { Pencil, Info, Save, X } from 'lucide-react';
import { formatPhone, normalizePhoneDigits } from '../../util/phone';

export const SchoolEmployeeProfile = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const id = user?.id;

  const [schoolEmployee, setSchoolEmployee] = useState<IUpdateSchoolEmployeePayload>({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSchool = async () => {
    try {
      const data = await getSchoolEmployeeById(id as string, authHeader);
      setSchoolEmployee(data);
    } catch {
      toast.error('Failed to load profile');
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchSchool();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateSchoolEmployee(schoolEmployee, authHeader);
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      const data = await getSchoolEmployeeById(id as string, authHeader);
      setSchoolEmployee(data);
      setEditMode(false);
    } catch {
      toast.error('Failed to refresh profile');
    }
  };

  const update = (field: keyof IUpdateSchoolEmployeePayload, value: string) => {
    setSchoolEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const renderField = (
    label: string,
    value: string,
    field: keyof IUpdateSchoolEmployeePayload,
    options?: {
      required?: boolean;
      disabled?: boolean;
      type?: 'text' | 'tel' | 'textarea';
      placeholder?: string;
      helperText?: string;
    }
  ) => {
    const { required, disabled, type = 'text', placeholder, helperText } = options || {};

    return (
      <div className="ep-field">
        <label className="ep-label">
          {label}
          {required && <span className="ep-required">*</span>}
        </label>
        {editMode && !disabled ? (
          <>
            {type === 'textarea' ? (
              <textarea
                className="ep-textarea"
                value={value}
                onChange={(e) => update(field, e.target.value)}
                placeholder={placeholder}
                rows={4}
              />
            ) : type === 'tel' ? (
              <input
                className="ep-input"
                type="tel"
                inputMode="tel"
                value={formatPhone(value)}
                onChange={(e) => update(field, normalizePhoneDigits(e.target.value))}
                placeholder={placeholder}
              />
            ) : (
              <input
                className="ep-input"
                type="text"
                value={value}
                onChange={(e) => update(field, e.target.value)}
                placeholder={placeholder}
              />
            )}
            {helperText && <span className="ep-helper">{helperText}</span>}
          </>
        ) : (
          <div className="ep-readonly">
            {type === 'tel' ? formatPhone(value) || '-' : value || '-'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="ep-container">
      <AccountDeniedBanner />

      {/* Header */}
      <div className="ep-header">
        <div>
          <h2 className="ep-title">{editMode ? 'Edit Your Profile' : 'Your Profile'}</h2>
          <p className="ep-subtitle">
            {editMode
              ? 'Update your personal information and preferences.'
              : 'View your personal information and preferences.'}
          </p>
        </div>
        <div className="ep-header-actions">
          {editMode ? (
            <>
              <button
                type="button"
                className="ep-btn ep-btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                <X size={16} /> Cancel
              </button>
              <button
                type="button"
                className="ep-btn ep-btn-primary"
                onClick={handleSave}
                disabled={loading}
              >
                <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              type="button"
              className="ep-btn ep-btn-primary"
              onClick={() => setEditMode(true)}
            >
              <Pencil size={16} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Editing Mode Banner */}
      {editMode && (
        <div className="ep-banner">
          <Pencil size={18} />
          <div>
            <strong>Editing Mode</strong>
            <p>Make changes below, then click Save Changes when you&apos;re done.</p>
          </div>
        </div>
      )}

      {/* Required notice */}
      {editMode && (
        <div className="ep-notice">
          <Info size={16} />
          <span>
            Complete all sections below. Fields marked with <span className="ep-required">*</span>{' '}
            are required.
          </span>
        </div>
      )}

      {/* Section 1: Basic Information */}
      <div className="ep-section">
        <div className="ep-section-header">
          <span className="ep-section-number">1</span>
          <div>
            <h3 className="ep-section-title">Basic Information</h3>
            <p className="ep-section-subtitle">Your name, photo, and contact details</p>
          </div>
        </div>
        <div className="ep-section-body">
          <div className="ep-grid-2">
            {renderField('First Name', schoolEmployee.firstName ?? '', 'firstName', {
              required: true,
              disabled: true,
            })}
            {renderField('Last Name', schoolEmployee.lastName ?? '', 'lastName', {
              required: true,
              disabled: true,
            })}
          </div>
          <div className="ep-grid-2">
            {renderField('Email', schoolEmployee.email ?? '', 'email', {
              required: true,
              disabled: true,
            })}
            {renderField('Phone Number', schoolEmployee.phone ?? '', 'phone', {
              type: 'tel',
            })}
          </div>
          {renderField('LinkedIn Profile', schoolEmployee.linkedIn ?? '', 'linkedIn', {
            placeholder: 'linkedin.com/in/yourname',
          })}
        </div>
      </div>

      {/* Section 2: Professional Role */}
      <div className="ep-section">
        <div className="ep-section-header">
          <span className="ep-section-number">2</span>
          <div>
            <h3 className="ep-section-title">Professional Role</h3>
            <p className="ep-section-subtitle">Your position and university information</p>
          </div>
        </div>
        <div className="ep-section-body">
          <div className="ep-grid-2">
            {renderField('Position', schoolEmployee.position ?? '', 'position', {
              required: true,
              placeholder: 'e.g., Academic Advisor',
            })}
            {renderField('Department', schoolEmployee.department ?? '', 'department', {
              placeholder: 'e.g., Athletics Department',
            })}
          </div>
          {renderField('University', schoolEmployee.school?.schoolName ?? '', 'schoolId', {
            required: true,
            disabled: true,
            helperText: "This should match your university's profile on Portal Jobs.",
          })}
        </div>
      </div>

      {/* Section 3: Office Information */}
      <div className="ep-section">
        <div className="ep-section-header">
          <span className="ep-section-number">3</span>
          <div>
            <h3 className="ep-section-title">Office Information</h3>
            <p className="ep-section-subtitle">Your office location and availability</p>
          </div>
        </div>
        <div className="ep-section-body">
          <div className="ep-grid-2">
            {renderField('Office Location', schoolEmployee.officeLocation ?? '', 'officeLocation', {
              placeholder: 'e.g., Smith Hall, Room 204',
            })}
            {renderField('Office Hours', schoolEmployee.officeHours ?? '', 'officeHours', {
              placeholder: 'e.g., Mon-Fri 9am-5pm',
            })}
          </div>
        </div>
      </div>

      {/* Section 4: About You */}
      <div className="ep-section">
        <div className="ep-section-header">
          <span className="ep-section-number">4</span>
          <div>
            <h3 className="ep-section-title">About You</h3>
            <p className="ep-section-subtitle">
              Tell students and employers about yourself and your role
            </p>
          </div>
        </div>
        <div className="ep-section-body">
          {renderField('Professional Bio', schoolEmployee.bio ?? '', 'bio', {
            type: 'textarea',
            placeholder: 'Tell others about your professional background and role...',
            helperText:
              'This will be visible to users viewing your profile. Keep it professional but personable.',
          })}
        </div>
      </div>
    </div>
  );
};
