import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Shield,
  BarChart3,
  Users,
  TrendingUp,
  Bell,
  Database,
  CheckCircle,
  ArrowRight,
  Zap,
  Settings,
  AlertCircle,
  Mail,
} from 'lucide-react';
import '../LandingPage.css';
import { LandingNavbar } from '../LandingNavbar';

const dashboardFeatures = [
  {
    title: 'Placement Tracking',
    description:
      'Monitor job and internship placements in real-time. See which athletes are employed, where, and track success metrics.',
    icon: BarChart3,
  },
  {
    title: 'NIL Compliance',
    description:
      'Ensure all NIL activities meet NCAA regulations. Review and approve deals before they go live.',
    icon: Shield,
  },
  {
    title: 'Employer Management',
    description:
      'Vet and approve companies recruiting your athletes. Build relationships with top employers.',
    icon: Users,
  },
  {
    title: 'Analytics Dashboard',
    description:
      'Comprehensive reporting on placement rates, salary data, industry trends, and athlete engagement.',
    icon: TrendingUp,
  },
  {
    title: 'Automated Alerts',
    description:
      'Get notified about pending approvals, compliance issues, and milestone achievements.',
    icon: Bell,
  },
  {
    title: 'Centralized Database',
    description:
      'All athlete profiles, employer contacts, and historical data in one searchable location.',
    icon: Database,
  },
];

const complianceChecklist = [
  { label: 'NCAA Guidelines Review', status: 'complete' as const },
  { label: 'State Regulation Check', status: 'complete' as const },
  { label: 'Employer Verification', status: 'complete' as const },
  { label: 'Contract Terms Approval', status: 'pending' as const },
  { label: 'Final Compliance Sign-off', status: 'pending' as const },
];

const valueCards = [
  {
    title: 'Improve Placement Rates',
    description:
      'Give your athletes direct access to employers actively seeking their unique skills. Track and report improved outcomes.',
    icon: Settings,
  },
  {
    title: 'Reduce Administrative Burden',
    description:
      'Automate NIL approvals, employer vetting, and placement tracking. Free your staff to focus on strategy.',
    icon: Settings,
  },
  {
    title: 'Strengthen Your Recruiting Pitch',
    description:
      'Show prospective athletes that your program invests in their career success beyond graduation.',
    icon: Settings,
  },
  {
    title: 'Build Employer Relationships',
    description:
      'Create lasting partnerships with companies who want to recruit your athletes year after year.',
    icon: Settings,
  },
];

export const UniversitiesPage: FC = () => {
  return (
    <div className="lp-root">
      {/* Navigation */}
      <LandingNavbar registerText="Partner With Us" role="school" />

      {/* 1. Hero Section - Dark */}
      <section className="lp-hero lp-gradient-mesh">
        <div className="lp-hero-floats">
          <div className="lp-hero-float lp-hero-float-1" />
          <div className="lp-hero-float lp-hero-float-2" />
          <div className="lp-hero-float lp-hero-float-3" />
        </div>
        <div className="lp-container lp-hero-content">
          <div className="lp-hero-badge">
            <GraduationCap className="lp-hero-badge-icon" />
            For Universities
          </div>
          <h1 className="lp-hero-title">
            Centralized Oversight for{' '}
            <span className="lp-text-accent">Student-Athlete Success</span>
          </h1>
          <p className="lp-hero-subtitle">
            Modernize your career services with a powerful admin dashboard. Track placements, ensure
            NIL compliance, and give your athletes the tools they need to succeed.
          </p>
          <div className="lp-hero-actions">
            <a
              href="mailto:info@portaljobs.net"
              className="lp-btn lp-btn-cta"
              style={{ color: 'white' }}
            >
              Request a Demo
              <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </a>
          </div>
        </div>
        <div className="lp-hero-fade" />
      </section>

      {/* 2. Dashboard Section - White */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container">
          <div className="lp-text-center lp-mb-16">
            <div className="lp-badge-light">
              <BarChart3 className="lp-badge-icon" />
              Admin Dashboard
            </div>
            <h2 className="lp-heading-dark">Complete Visibility and Control</h2>
            <p className="lp-body-muted">
              One platform to manage all student-athlete career activities, NIL deals, and employer
              relationships.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}
          >
            {dashboardFeatures.map((feature, index) => (
              <div key={index} className="lp-light-card">
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    backgroundColor: 'rgba(4, 110, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <feature.icon style={{ width: '1.5rem', height: '1.5rem', color: '#046ee5' }} />
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#0a0f2e',
                    marginBottom: '0.5rem',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Compliance Section - Gray */}
      <section className="lp-section-gray lp-section-padded">
        <div className="lp-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Left column */}
            <div>
              <div className="lp-badge-light">
                <Shield className="lp-badge-icon" />
                NIL Compliance Made Simple
              </div>
              <h2 className="lp-heading-dark">Stay Compliant, Stay Competitive</h2>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#64748b',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                Navigate the complex NIL landscape with confidence. Portal provides the tools you
                need to support your athletes while maintaining full compliance.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Review and approve all NIL opportunities before athletes commit',
                  'Automated compliance checks against NCAA and state regulations',
                  'Complete audit trail for all NIL activities',
                  'Real-time notifications for pending approvals',
                  'Generate compliance reports for athletic directors and administrators',
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                  >
                    <CheckCircle
                      style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        color: '#046ee5',
                        marginTop: '0.125rem',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: '#0a0f2e' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Compliance checklist card */}
            <div className="lp-light-card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Card header */}
              <div
                style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  <Shield style={{ width: '1.25rem', height: '1.25rem', color: '#046ee5' }} />
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#0a0f2e',
                      margin: 0,
                    }}
                  >
                    NIL Compliance Checklist
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    margin: 0,
                    paddingLeft: '2rem',
                  }}
                >
                  Marketing Intern + NIL Deal
                </p>
              </div>

              {/* Checklist items */}
              <div style={{ padding: '1rem 1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {complianceChecklist.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.5rem',
                      }}
                    >
                      <span style={{ color: '#0a0f2e', fontSize: '0.9375rem' }}>{item.label}</span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          backgroundColor:
                            item.status === 'complete'
                              ? 'rgba(34, 197, 94, 0.1)'
                              : 'rgba(245, 158, 11, 0.1)',
                          color: item.status === 'complete' ? '#16a34a' : '#d97706',
                        }}
                      >
                        {item.status === 'complete' ? 'Complete' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom info bar */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <AlertCircle
                  style={{ width: '1rem', height: '1rem', color: '#d97706', flexShrink: 0 }}
                />
                <span style={{ fontSize: '0.875rem', color: '#d97706' }}>
                  2 items require your review
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Value Section - White */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container">
          <div className="lp-text-center lp-mb-16">
            <div className="lp-badge-light">
              <Zap className="lp-badge-icon" />
              Why Partner With Portal
            </div>
            <h2 className="lp-heading-dark">Benefits for Your Institution</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              maxWidth: '56rem',
              margin: '0 auto',
            }}
          >
            {valueCards.map((card, index) => (
              <div key={index} className="lp-light-card">
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    backgroundColor: 'rgba(4, 110, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <card.icon style={{ width: '1.5rem', height: '1.5rem', color: '#046ee5' }} />
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#0a0f2e',
                    marginBottom: '0.75rem',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    color: '#64748b',
                    lineHeight: 1.6,
                  }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section - Dark */}
      <section className="lp-gradient-mesh lp-section-padded">
        <div className="lp-container lp-text-center">
          <h2 className="lp-heading-white">Ready to Upgrade Your Career Services?</h2>
          <p className="lp-body-white-muted" style={{ marginBottom: '2.5rem' }}>
            Join leading universities using Portal to support their student-athletes and maintain
            compliance.
          </p>
          <a
            href="mailto:info@portaljobs.net"
            className="lp-btn lp-btn-cta"
            style={{ color: 'white' }}
          >
            Request a Demo
            <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
          </a>
        </div>
      </section>

      {/* Footer - Dark */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <div className="lp-footer-logo">
                <div className="lp-footer-logo-icon">
                  <Zap className="lp-footer-zap" />
                </div>
                <span className="lp-footer-logo-text">Portal</span>
              </div>
              <p className="lp-footer-tagline">
                The career platform connecting NCAA student-athletes with jobs, internships, and NIL
                opportunities.
              </p>
            </div>
            <div className="lp-footer-links-grid">
              <div className="lp-footer-col">
                <h4 className="lp-footer-col-title">For Athletes</h4>
                <Link to="/athletes" className="lp-footer-link">
                  Overview
                </Link>
                <Link to="/athletes" className="lp-footer-link">
                  Jobs & Internships
                </Link>
                <Link to="/athletes" className="lp-footer-link">
                  NIL Opportunities
                </Link>
              </div>
              <div className="lp-footer-col">
                <h4 className="lp-footer-col-title">For Universities</h4>
                <Link to="/universities" className="lp-footer-link">
                  Overview
                </Link>
                <Link to="/universities" className="lp-footer-link">
                  Admin Dashboard
                </Link>
                <Link to="/universities" className="lp-footer-link">
                  NIL Compliance
                </Link>
              </div>
              <div className="lp-footer-col">
                <h4 className="lp-footer-col-title">For Employers</h4>
                <Link to="/employers" className="lp-footer-link">
                  Overview
                </Link>
                <Link to="/employers" className="lp-footer-link">
                  Start Recruiting
                </Link>
                <Link to="/employers" className="lp-footer-link">
                  ROI Advantage
                </Link>
              </div>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <div className="lp-footer-contact">
              <Mail className="lp-footer-mail-icon" />
              <a href="mailto:info@portaljobs.net" className="lp-footer-link">
                info@portaljobs.net
              </a>
            </div>
            <p className="lp-footer-copyright">&copy; 2026 Portal</p>
            <div className="lp-footer-legal">
              <a href="#" className="lp-footer-link">
                Privacy Policy
              </a>
              <a href="#" className="lp-footer-link">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
