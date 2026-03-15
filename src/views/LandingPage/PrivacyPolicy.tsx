import { FC } from 'react';
import './LandingPage.css';

export const PrivacyPolicy: FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem', color: 'var(--foreground, #1a1a1a)', lineHeight: 1.7 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Last updated: March 15, 2026</p>

      <p>
        Portal Jobs ("we," "us," or "our") operates the portaljobs.net website and the PortalJobs mobile
        application (collectively, the "Service"). This Privacy Policy explains how we collect, use,
        disclose, and protect your personal information when you use our Service.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>Information You Provide</h3>
      <ul>
        <li><strong>Account information:</strong> name, email address, phone number, school or company affiliation, and role (athlete, employer, or school administrator).</li>
        <li><strong>Profile information:</strong> bio, location, skills, work experience, athletic achievements, and profile photos.</li>
        <li><strong>Communications:</strong> messages you send and receive through our messaging feature.</li>
        <li><strong>Applications and interviews:</strong> job applications, interview scheduling data, and related correspondence.</li>
      </ul>

      <h3>Information Collected Automatically</h3>
      <ul>
        <li><strong>Device and usage data:</strong> IP address, browser type, operating system, device identifiers, pages visited, and interaction timestamps.</li>
        <li><strong>Crash and performance data:</strong> error reports and performance metrics collected through Sentry for app stability.</li>
        <li><strong>Push notification tokens:</strong> device tokens for delivering push notifications, if you opt in.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide, maintain, and improve the Service.</li>
        <li>Facilitate connections between athletes, employers, and schools.</li>
        <li>Process job and NIL opportunity applications.</li>
        <li>Send you notifications about messages, applications, and interviews.</li>
        <li>Verify your identity and organizational affiliation.</li>
        <li>Monitor and improve app performance and fix bugs.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>We do not sell your personal information. We may share your information with:</p>
      <ul>
        <li><strong>Other users:</strong> your profile information is visible to other users of the platform as necessary for the Service to function (e.g., employers can view athlete profiles, athletes can view company profiles).</li>
        <li><strong>Service providers:</strong> third-party vendors who help us operate the Service, including cloud hosting (AWS), authentication (Keycloak), error tracking (Sentry), and email delivery (Amazon SES).</li>
        <li><strong>Legal requirements:</strong> when required by law, regulation, or legal process.</li>
        <li><strong>Business transfers:</strong> in connection with a merger, acquisition, or sale of assets.</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        We retain your personal information for as long as your account is active or as needed to
        provide the Service. You may request deletion of your account and associated data at any time
        by contacting us at{' '}
        <a href="mailto:privacyrequests@portaljobs.net">privacyrequests@portaljobs.net</a>.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal
        information, including encryption in transit (TLS), secure authentication via Keycloak with
        PKCE, and access controls. However, no method of transmission over the Internet is 100%
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>6. Your Rights Under GDPR (European Users)</h2>
      <p>If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have the following rights under the General Data Protection Regulation (GDPR):</p>
      <ul>
        <li><strong>Right of access:</strong> request a copy of the personal data we hold about you.</li>
        <li><strong>Right to rectification:</strong> request correction of inaccurate or incomplete data.</li>
        <li><strong>Right to erasure:</strong> request deletion of your personal data ("right to be forgotten").</li>
        <li><strong>Right to restrict processing:</strong> request that we limit how we use your data.</li>
        <li><strong>Right to data portability:</strong> receive your data in a structured, machine-readable format.</li>
        <li><strong>Right to object:</strong> object to processing of your data for certain purposes.</li>
        <li><strong>Right to withdraw consent:</strong> withdraw consent at any time where processing is based on consent.</li>
      </ul>
      <p>
        Our legal basis for processing your data is typically the performance of a contract (providing the Service),
        your consent, or our legitimate interests in operating and improving the Service.
      </p>
      <p>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:privacyrequests@portaljobs.net">privacyrequests@portaljobs.net</a>.
        We will respond within 30 days.
      </p>

      <h2>7. Your Rights Under CCPA/CPRA (California Residents)</h2>
      <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):</p>
      <ul>
        <li><strong>Right to know:</strong> request information about what personal data we collect, use, and disclose.</li>
        <li><strong>Right to delete:</strong> request deletion of your personal data, subject to certain exceptions.</li>
        <li><strong>Right to correct:</strong> request correction of inaccurate personal data.</li>
        <li><strong>Right to opt out of sale/sharing:</strong> we do not sell or share your personal information for cross-context behavioral advertising.</li>
        <li><strong>Right to non-discrimination:</strong> we will not discriminate against you for exercising your privacy rights.</li>
      </ul>
      <p>
        <strong>Categories of personal information collected:</strong> identifiers (name, email), professional information
        (school, company, role), internet activity (usage data), and communications (messages).
      </p>
      <p>
        To exercise your rights, contact us at{' '}
        <a href="mailto:privacyrequests@portaljobs.net">privacyrequests@portaljobs.net</a>.
        We will verify your identity and respond within 45 days.
      </p>

      <h2>8. Children's Privacy</h2>
      <p>
        The Service is not directed to individuals under the age of 13. We do not knowingly collect
        personal information from children under 13. If we become aware that we have collected data
        from a child under 13, we will take steps to delete it promptly. If you believe a child has
        provided us with personal information, please contact us at{' '}
        <a href="mailto:privacyrequests@portaljobs.net">privacyrequests@portaljobs.net</a>.
      </p>

      <h2>9. International Data Transfers</h2>
      <p>
        Your information may be transferred to and processed in the United States, where our servers
        are located. If you are located outside the United States, you consent to the transfer of your
        information to the United States. We take appropriate safeguards to ensure your data is
        protected in accordance with this Privacy Policy.
      </p>

      <h2>10. Cookies and Tracking</h2>
      <p>
        We use essential cookies and local storage for authentication and session management. We do
        not use third-party advertising cookies or cross-site tracking. Crash and performance
        monitoring is handled by Sentry, which collects technical data only.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of material changes
        by posting the updated policy on this page and updating the "Last updated" date. Your
        continued use of the Service after changes constitutes acceptance of the updated policy.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or wish to exercise your privacy rights,
        contact us at:
      </p>
      <p>
        <strong>Portal Jobs</strong><br />
        Email: <a href="mailto:privacyrequests@portaljobs.net">privacyrequests@portaljobs.net</a><br />
        General support: <a href="mailto:help@portaljobs.net">help@portaljobs.net</a>
      </p>

      <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.875rem' }}>
        If you are in the EEA and are unsatisfied with our response, you have the right to lodge a
        complaint with your local data protection authority.
      </p>
    </div>
  );
};
