import { useAuthUser } from '../auth/hooks';

export const AccountDeniedBanner: React.FC = () => {
  const user = useAuthUser();

  if (user?.isOrgVerified === false) {
    return (
      <div
        style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          !
        </div>
        <div style={{ color: '#991b1b', fontSize: '0.9375rem', lineHeight: '1.5' }}>
          Your chosen organization has denied your account. Please talk to the account admin if you
          think this was done incorrectly.
        </div>
      </div>
    );
  }
};
