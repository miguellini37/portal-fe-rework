import { useState } from 'react';

const MANIFEST_URL = 'https://beta.portaljobs.net/install/manifest.plist';
const INSTALL_URL = `itms-services://?action=download-manifest&url=${encodeURIComponent(MANIFEST_URL)}`;

export const InstallPage = () => {
  const [revealed, setRevealed] = useState(false);

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  if (!revealed) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.logo}>Portal</div>
          <p style={styles.subtitle}>Internal testing access</p>
          <input
            type="password"
            placeholder="Access code"
            style={styles.input}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.target as HTMLInputElement).value === 'portalbeta') {
                setRevealed(true);
              }
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>Portal</div>
        <p style={styles.version}>iOS Beta</p>

        {isIOS ? (
          <>
            <a href={INSTALL_URL} style={styles.button}>
              Install App
            </a>
            <p style={styles.hint}>
              After installing, go to<br />
              <strong>Settings → General → VPN & Device Management</strong><br />
              and trust the developer certificate.
            </p>
          </>
        ) : (
          <p style={styles.hint}>
            Open this page on your iPhone to install.
          </p>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a1628 0%, #1a2a4a 100%)',
    padding: 20,
  },
  card: {
    background: 'white',
    borderRadius: 16,
    padding: '48px 40px',
    textAlign: 'center' as const,
    maxWidth: 380,
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  logo: {
    fontSize: 32,
    fontWeight: 700,
    color: '#0a1628',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    marginBottom: 24,
    fontSize: 14,
  },
  version: {
    color: '#666',
    marginBottom: 32,
    fontSize: 14,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  button: {
    display: 'inline-block',
    background: '#0a1628',
    color: 'white',
    padding: '14px 40px',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 600,
    textDecoration: 'none',
    marginBottom: 24,
  },
  hint: {
    color: '#888',
    fontSize: 13,
    lineHeight: 1.5,
  },
};
