import { useAuthUser, USER_PERMISSIONS, useIsSchoolVerified } from '../auth/hooks';

export const AccountDeniedBanner: React.FC = () => {
  const user = useAuthUser();
  const { permission, isVerified } = user || {};
  const isSchoolVerified = useIsSchoolVerified();

  const isUnverifiedAccount = !isVerified;
  const isVerifiedStudentUnverifiedSchool =
    permission === USER_PERMISSIONS.ATHLETE && isVerified && isSchoolVerified === false;

  if (!isUnverifiedAccount && !isVerifiedStudentUnverifiedSchool) {
    return null;
  }

  let message: string;
  if (isVerifiedStudentUnverifiedSchool) {
    message =
      'Your school has not yet been verified by Portal. Some features such as NIL opportunities may not be available until your school is verified. Reach out to your school administration to encourage them to complete the verification process, or contact help@portaljobs.net for assistance.';
  } else if (permission === USER_PERMISSIONS.ATHLETE) {
    message =
      'Your account has not been verified. You can browse the site, but some features may not be available until your account is verified.';
  } else if (permission === USER_PERMISSIONS.SCHOOL) {
    message =
      "Your email domain doesn't match a known university. Your account is under manual review. Contact help@portaljobs.net for assistance.";
  } else {
    message =
      'Your account has not been verified. Access is limited to your profile page until your account is verified.';
  }

  return (
    <div
      style={{
        backgroundColor: '#fff7ed',
        border: '1px solid #f97316',
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
          backgroundColor: '#f97316',
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
      <div style={{ color: '#9a3412', fontSize: '0.9375rem', lineHeight: '1.5' }}>{message}</div>
    </div>
  );
};
