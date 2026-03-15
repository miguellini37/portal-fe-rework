import React, { useEffect, useState } from 'react';
import { useAuthHeader, useAuthUser, USER_PERMISSIONS } from '../../auth/hooks';
import { createProfile, ICreateUserInput } from '../../api/profile';
import { SchoolDropdown } from '../../components/Dropdowns/SchoolDropdown';
import keycloak from '../../config/keycloak';

export const SetupProfile: React.FC = () => {
  const authHeader = useAuthHeader();
  const user = useAuthUser();

  const [profile, setProfile] = useState<ICreateUserInput>({});
  const [loading, setLoading] = useState(false);

  const submitProfile = async () => {
    setLoading(true);
    try {
      await createProfile(authHeader, profile);
      await keycloak.updateToken(-1);
      window.location.reload();
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const minDelay = new Promise((resolve) => setTimeout(resolve, 3500));
    Promise.all([createProfile(authHeader, {}), minDelay])
      .then(async () => {
        await keycloak.updateToken(-1);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  }, [authHeader]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '24px',
          backgroundColor: '#f8fafc',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#1e293b',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          Setting up your profile
        </p>
        <p
          style={{
            fontSize: '14px',
            color: '#64748b',
            margin: 0,
          }}
        >
          This will only take a moment...
        </p>
        <div
          style={{
            width: '280px',
            height: '4px',
            backgroundColor: '#e2e8f0',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '40%',
              height: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: '2px',
              animation: 'loading-bar 1.5s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(250%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
    );
  }

  if (user?.permission === USER_PERMISSIONS.SCHOOL && !user?.schoolId) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '48px 24px',
          maxWidth: '600px',
          margin: '0 auto',
          gap: '24px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fcd34d',
            borderRadius: '8px',
            padding: '20px 24px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                backgroundColor: '#f59e0b',
                color: '#fff',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              !
            </div>
            <p style={{ margin: 0, color: '#92400e', fontSize: '15px', fontWeight: 600 }}>
              Your email address does not match the domain of any University in the United States.
            </p>
          </div>
          <p style={{ margin: 0, color: '#78350f', fontSize: '14px' }}>
            Manual review is needed to complete your account setup. Our team has been notified and
            will review your account shortly.
          </p>
          <p style={{ margin: 0, color: '#78350f', fontSize: '14px' }}>
            If you have questions, please contact us at{' '}
            <a href="mailto:help@portaljobs.net" style={{ color: '#b45309', fontWeight: 500 }}>
              help@portaljobs.net
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 24px',
        maxWidth: '600px',
        margin: '0 auto',
        gap: '24px',
      }}
    >
      {/* Banner prompting athlete to select school */}
      <div
        style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
        }}
      >
        <div
          style={{
            backgroundColor: '#3b82f6',
            color: '#fff',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '16px',
            fontWeight: 700,
          }}
        >
          !
        </div>
        <p style={{ margin: 0, color: '#1e40af', fontSize: '15px', fontWeight: 500 }}>
          Could not find your school using your provided email. Please select your school below to
          finish setting up your profile. You won&apos;t be able to access other features until this
          step is complete.
        </p>
      </div>

      {/* School Selection */}
      <div
        className="card"
        style={{
          width: '100%',
          padding: '24px',
        }}
      >
        <h2 className="section-title" style={{ marginBottom: '16px' }}>
          Select Your School
        </h2>

        <div className="form-field" style={{ marginBottom: '16px' }}>
          <label className="form-label" htmlFor="schoolDropdown">
            School
          </label>
          <SchoolDropdown
            id="schoolDropdown"
            onChange={(e) => setProfile((prev) => ({ ...prev, schoolId: e?.value }))}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={!profile.schoolId}
          onClick={() => {
            submitProfile();
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
