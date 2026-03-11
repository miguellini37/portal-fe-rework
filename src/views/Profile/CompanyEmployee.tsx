import { useEffect, useState } from 'react';
import { useAuthHeader } from '../../auth/hooks';
import { useAuthUser } from '../../auth/hooks';
import { toast } from 'react-toastify';
import {
  getCompanyEmployeeById,
  IUpdateCompanyEmployeePayload,
  updateCompanyEmployee,
} from '../../api/companyEmployee';
import './Profiles.css';
import { AccountDeniedBanner } from '../../components/AccountDeniedBanner';
import { Pencil, Info, Save, X } from 'lucide-react';
import { formatPhone, normalizePhoneDigits } from '../../util/phone';
import { SchoolDropdown } from '../../components/Dropdowns/SchoolDropdown';

const ROLE_TYPES = ['Recruiter', 'Hiring Manager', 'HR', 'Executive', 'Other'];
const SPORTS = [
  'Baseball',
  'Basketball',
  'Cross Country',
  'Football',
  'Golf',
  'Gymnastics',
  'Ice Hockey',
  'Lacrosse',
  'Soccer',
  'Softball',
  'Swimming',
  'Tennis',
  'Track & Field',
  'Volleyball',
  'Wrestling',
  'Other',
];

export const CompanyEmployeeProfile = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const id = user?.id;

  const [companyEmployee, setCompanyEmployee] = useState<IUpdateCompanyEmployeePayload>({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCompany = async () => {
    try {
      const data = await getCompanyEmployeeById(id as string, authHeader);
      setCompanyEmployee(data);
    } catch {
      toast.error('Failed to fetch profile');
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchCompany();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateCompanyEmployee(companyEmployee, authHeader);
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch {
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      const data = await getCompanyEmployeeById(id as string, authHeader);
      setCompanyEmployee(data);
      setEditMode(false);
    } catch {
      toast.error('Failed to refresh profile');
    }
  };

  const update = (field: keyof IUpdateCompanyEmployeePayload, value: string | boolean) => {
    setCompanyEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const renderField = (
    label: string,
    value: string,
    field: keyof IUpdateCompanyEmployeePayload,
    options?: {
      required?: boolean;
      disabled?: boolean;
      type?: 'text' | 'tel' | 'select' | 'textarea';
      selectOptions?: string[];
      placeholder?: string;
      helperText?: string;
    }
  ) => {
    const {
      required,
      disabled,
      type = 'text',
      selectOptions,
      placeholder,
      helperText,
    } = options || {};

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
            ) : type === 'select' ? (
              <select
                className="ep-select"
                value={value}
                onChange={(e) => update(field, e.target.value)}
              >
                <option value="">Select...</option>
                {selectOptions?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
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
            {renderField('First Name', companyEmployee.firstName ?? '', 'firstName', {
              required: true,
              disabled: true,
            })}
            {renderField('Last Name', companyEmployee.lastName ?? '', 'lastName', {
              required: true,
              disabled: true,
            })}
          </div>
          <div className="ep-grid-2">
            {renderField('Email', companyEmployee.email ?? '', 'email', {
              required: true,
              disabled: true,
            })}
            {renderField('Phone Number', companyEmployee.phone ?? '', 'phone', {
              type: 'tel',
            })}
          </div>
          {renderField('LinkedIn Profile', companyEmployee.linkedIn ?? '', 'linkedIn', {
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
            <p className="ep-section-subtitle">Your position and company information</p>
          </div>
        </div>
        <div className="ep-section-body">
          <div className="ep-grid-2">
            {renderField('Job Title', companyEmployee.position ?? '', 'position', {
              required: true,
            })}
            {renderField('Role Type', companyEmployee.roleType ?? '', 'roleType', {
              required: true,
              type: 'select',
              selectOptions: ROLE_TYPES,
            })}
          </div>
          {renderField('Company', companyEmployee.company?.companyName ?? '', 'companyId', {
            required: true,
            disabled: true,
            helperText: "This should match your organization's profile on Portal Jobs.",
          })}
        </div>
      </div>

      {/* Section 3: About You */}
      <div className="ep-section">
        <div className="ep-section-header">
          <span className="ep-section-number">3</span>
          <div>
            <h3 className="ep-section-title">About You</h3>
            <p className="ep-section-subtitle">
              Tell candidates about yourself and your background
            </p>
          </div>
        </div>
        <div className="ep-section-body">
          {renderField('Professional Bio', companyEmployee.bio ?? '', 'bio', {
            type: 'textarea',
            placeholder: 'Tell candidates about your professional background...',
            helperText:
              'This will be visible to candidates viewing your profile. Keep it professional but personable.',
          })}
        </div>
      </div>

      {/* Section 4: Athletic Background */}
      <div className="ep-section">
        <div className="ep-section-header">
          <span className="ep-section-number">4</span>
          <div>
            <h3 className="ep-section-title">Athletic Background</h3>
            <p className="ep-section-subtitle">Optional</p>
          </div>
          {editMode && (
            <div className="ep-toggle-group">
              <span className="ep-toggle-label">Former athlete</span>
              <button
                type="button"
                className={`ep-toggle ${companyEmployee.isFormerAthlete ? 'ep-toggle-on' : ''}`}
                onClick={() => update('isFormerAthlete', !companyEmployee.isFormerAthlete)}
                aria-pressed={companyEmployee.isFormerAthlete}
              >
                <span className="ep-toggle-knob" />
              </button>
            </div>
          )}
        </div>
        {(companyEmployee.isFormerAthlete ||
          (!editMode &&
            (companyEmployee.athleteSport ||
              companyEmployee.athletePosition ||
              companyEmployee.athleteUniversity ||
              companyEmployee.athleteGraduationYear ||
              companyEmployee.athleteAchievements))) && (
          <div className="ep-section-body">
            <div className="ep-grid-2">
              {renderField('Sport', companyEmployee.athleteSport ?? '', 'athleteSport', {
                required: companyEmployee.isFormerAthlete,
                type: 'select',
                selectOptions: SPORTS,
              })}
              {renderField('Position', companyEmployee.athletePosition ?? '', 'athletePosition')}
            </div>
            <div className="ep-grid-2">
              <div className="ep-field">
                <label className="ep-label">
                  University
                  {companyEmployee.isFormerAthlete && <span className="ep-required">*</span>}
                </label>
                {editMode ? (
                  <SchoolDropdown
                    selectedLabel={companyEmployee.athleteUniversity}
                    onChange={(newValue) => update('athleteUniversity', newValue?.label ?? '')}
                  />
                ) : (
                  <div className="ep-readonly">{companyEmployee.athleteUniversity || '-'}</div>
                )}
              </div>
              {renderField(
                'Graduation Year',
                companyEmployee.athleteGraduationYear ?? '',
                'athleteGraduationYear'
              )}
            </div>
            {renderField(
              'Notable Achievements',
              companyEmployee.athleteAchievements ?? '',
              'athleteAchievements',
              {
                placeholder: 'e.g., 2x All-Big 12, Team Captain 2015',
                helperText: 'Any athletic honors, awards, or leadership roles you held.',
              }
            )}
          </div>
        )}
      </div>

      {/* How it works */}
      {editMode && (
        <div className="ep-section ep-how-it-works">
          <h4 className="ep-how-title">How the profile process works:</h4>
          <div className="ep-step">
            <span className="ep-step-number">1</span>
            <span>
              <strong>Complete your personal profile</strong> — Add your information, role, and
              optionally your athletic background.
            </span>
          </div>
          <div className="ep-step">
            <span className="ep-step-number">2</span>
            <span>
              <strong>Save and continue</strong> — Click &quot;Save Changes&quot; to save your
              profile, then proceed to set up your Company Profile.
            </span>
          </div>
          <div className="ep-step">
            <span className="ep-step-number">3</span>
            <span>
              <strong>Start recruiting</strong> — Once both profiles are complete, you can browse
              the talent pool and connect with student-athletes.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
