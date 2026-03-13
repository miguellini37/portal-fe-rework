import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  ArrowRight,
  Zap,
  CheckCircle,
  Target,
  Users,
  Lock,
  Search,
  Mail,
  GraduationCap,
  MapPin,
  Star,
  BookOpen,
  Calendar,
  Sparkles,
  HeadphonesIcon,
} from 'lucide-react';
import '../LandingPage.css';
import { useAuth } from '../../../auth/hooks';
import { LandingNavbar } from '../LandingNavbar';

const athletes = [
  {
    initials: 'JJ',
    name: 'John Johnson',
    sport: 'Basketball',
    position: 'Forward',
    school: 'University of South Dakota',
    location: 'South Dakota',
    gpa: '3.4',
    major: 'Business Administration',
    graduation: 'May 2026',
  },
  {
    initials: 'TB',
    name: 'Tennel Bryant',
    sport: 'Football',
    position: 'HB',
    school: 'University of South Dakota',
    location: 'South Dakota',
    gpa: '3.1',
    major: 'Sociology',
    graduation: 'Dec 2025',
  },
  {
    initials: 'SC',
    name: 'Scott Corbutt',
    sport: 'Ice Hockey',
    position: 'Wing',
    school: 'University of South Dakota',
    location: 'Chicago, IL',
    gpa: '4.0',
    major: 'Business Administration',
    graduation: 'Feb 2026',
  },
  {
    initials: 'SP',
    name: 'Sierra Pokharel',
    sport: 'Volleyball',
    position: 'Defensive Specialist',
    school: 'University of South Dakota',
    location: 'South Dakota',
    gpa: '3.3',
    major: 'Anthropology',
    graduation: 'May 2026',
  },
  {
    initials: 'LP',
    name: 'LJ Phillips Jr',
    sport: 'Football',
    position: 'HB',
    school: 'University of South Dakota',
    location: 'South Dakota',
    gpa: '3.9',
    major: 'Environmental Science',
    graduation: 'May 2026',
  },
  {
    initials: 'SS',
    name: 'Smokey Silver',
    sport: 'Ice Hockey',
    position: 'Center',
    school: 'Miami University OH',
    location: 'Chicago, IL',
    gpa: '3.9',
    major: 'Supply Chain',
    graduation: 'May 2026',
  },
];

export const EmployersPage: FC = () => {
  const { register } = useAuth();

  const handleRegister = () => {
    register('company');
  };

  return (
    <div className="lp-root">
      <LandingNavbar registerText="Start Recruiting" role="company" />

      {/* ===== 1. Hero Section (dark) ===== */}
      <section className="lp-gradient-mesh lp-hero">
        <div className="lp-hero-floats">
          <div className="lp-hero-float lp-hero-float-1" />
          <div className="lp-hero-float lp-hero-float-2" />
          <div className="lp-hero-float lp-hero-float-3" />
        </div>

        <div className="lp-hero-content lp-container">
          <div className="lp-hero-badge">
            <Briefcase className="lp-hero-badge-icon" />
            For Employers
          </div>

          <h1 className="lp-hero-title">Hire Student-Athletes Who Are Ready to Work</h1>

          <p className="lp-hero-subtitle">
            Get direct access to driven, coachable, high-character candidates from NCAA programs
            across the country -- before they hit any other job board.
          </p>

          <div className="lp-hero-actions">
            <button onClick={handleRegister} className="lp-btn lp-btn-cta">
              Start Recruiting Today
              <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
            <a href="mailto:info@portaljobs.net" className="lp-btn lp-btn-outline-light">
              Schedule a Demo
            </a>
          </div>
        </div>

        <div className="lp-hero-fade" />
      </section>

      {/* ===== 2. ROI Section (white) ===== */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container">
          <div className="lp-text-center lp-mb-16">
            <div className="lp-badge-light">
              <Sparkles className="lp-badge-icon" />
              By the Numbers
            </div>
            <h2 className="lp-heading-dark">The Numbers That Matter</h2>
            <p className="lp-body-muted">
              Student-athletes deliver measurable results from day one.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                stat: '20-40%',
                label: 'Faster Hiring',
                description:
                  'Student-athletes fill positions significantly faster than traditional candidates.',
              },
              {
                stat: '50%',
                label: 'Lower Onboarding Costs',
                description:
                  "Portal's direct pipeline reduces recruiting overhead and onboarding time.",
              },
              {
                stat: '68%',
                label: 'Higher Graduation Rates',
                description:
                  'Demonstrating commitment, follow-through, and ability to complete goals.',
              },
              {
                stat: '42%',
                label: 'Better Engagement',
                description:
                  'Student-athletes show higher workplace engagement and retention scores.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  border: '1px solid rgba(10, 15, 46, 0.08)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                }}
              >
                <div
                  className="lp-text-gradient"
                  style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#0a0f2e',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.label}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Quality Section (gray) ===== */}
      <section className="lp-section-gray lp-section-padded">
        <div className="lp-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
            className="lp-quality-layout"
          >
            {/* Left column */}
            <div style={{ gridColumn: '1', textAlign: 'left' }}>
              <div className="lp-badge-light">
                <Zap className="lp-badge-icon" />
                Why Portal
              </div>
              <h2 className="lp-heading-dark" style={{ textAlign: 'left' }}>
                Standard Job Boards Give You Volume. Portal Gives You Quality.
              </h2>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#64748b',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                Traditional recruiting channels bury you in unqualified applicants. Portal connects
                you directly with verified student-athletes who bring discipline, resilience, and a
                competitive edge to every role.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Exclusive access before LinkedIn or Handshake',
                  'Pre-screened candidates with verified athletic backgrounds',
                  'Direct connection to university career centers',
                  'NIL-integrated opportunities for unique engagement',
                  'Detailed performance profiles and character assessments',
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                  >
                    <CheckCircle
                      style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        color: '#046ee5',
                        flexShrink: 0,
                        marginTop: '0.125rem',
                      }}
                    />
                    <span style={{ color: '#0a0f2e', fontSize: '1rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - 2x2 grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
              }}
            >
              {[
                {
                  title: 'Early Access',
                  description: 'Secure high-resilience leaders before they hit general job boards.',
                  icon: Target,
                },
                {
                  title: 'Direct Access',
                  description: 'Connect to elite talent often overlooked by traditional channels.',
                  icon: ArrowRight,
                },
                {
                  title: 'Quality Over Quantity',
                  description: 'Every candidate comes with athletic background verification.',
                  icon: CheckCircle,
                },
                {
                  title: 'Dedicated Support',
                  description: 'Our team helps you find the perfect athlete for your needs.',
                  icon: HeadphonesIcon,
                },
              ].map((feature, i) => (
                <div key={i} className="lp-light-card">
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
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#0a0f2e',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .lp-quality-layout {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ===== 4. Hiring Process Section (white) ===== */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container">
          <div className="lp-text-center lp-mb-16">
            <div className="lp-badge-light">
              <Briefcase className="lp-badge-icon" />
              Simple Process
            </div>
            <h2 className="lp-heading-dark">How Portal Works for Employers</h2>
            <p className="lp-body-muted">
              Three simple steps to find and hire qualified student-athletes.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description:
                  "Set up your company profile and define the roles, skills, and attributes you're looking for in candidates.",
              },
              {
                step: '02',
                title: 'Browse & Connect',
                description:
                  'Access our database of verified student-athletes. Filter by sport, school, major, skills, and availability.',
              },
              {
                step: '03',
                title: 'Hire Top Talent',
                description:
                  'Reach out directly, schedule interviews, and extend offers through our streamlined platform.',
              },
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative', padding: '1.5rem 0' }}>
                <div
                  style={{
                    fontSize: '6rem',
                    fontWeight: 700,
                    color: 'rgba(4, 110, 229, 0.06)',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.025em',
                  }}
                >
                  {item.step}
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#0a0f2e',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Talent Pool Preview (gray) ===== */}
      <section className="lp-section-gray lp-section-padded">
        <div className="lp-container">
          <div className="lp-text-center lp-mb-16">
            <div className="lp-badge-light">
              <Users className="lp-badge-icon" />
              Talent Pool
            </div>
            <h2 className="lp-heading-dark">Meet Your Next Hire</h2>
            <p className="lp-body-muted">
              Browse vetted student-athletes ready to make an impact at your organization.
            </p>
          </div>

          {/* Mock search bar */}
          <div
            style={{
              maxWidth: '36rem',
              margin: '0 auto 3rem',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                borderRadius: '9999px',
                border: '1px solid rgba(10, 15, 46, 0.08)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                padding: '0.75rem 1.25rem',
                gap: '0.75rem',
              }}
            >
              <Search style={{ width: '1.25rem', height: '1.25rem', color: '#94a3b8' }} />
              <span style={{ color: '#94a3b8', fontSize: '0.9375rem' }}>
                Search by sport, major, school...
              </span>
            </div>
          </div>

          {/* Athlete cards grid */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {athletes.map((a, i) => (
                <div
                  key={i}
                  className={`lp-athlete-card${i >= 3 ? ' lp-athlete-card-blurred' : ''}`}
                >
                  <div className="lp-athlete-card-bar" />
                  <div style={{ padding: '1.5rem' }}>
                    {/* Initials circle + name */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <div
                        style={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '50%',
                          backgroundColor: '#046ee5',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          flexShrink: 0,
                        }}
                      >
                        {a.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0a0f2e', fontSize: '1rem' }}>
                          {a.name}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                          {a.sport} &middot; {a.position}
                        </div>
                      </div>
                    </div>

                    {/* Info rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <GraduationCap
                          style={{ width: '1rem', height: '1rem', color: '#94a3b8' }}
                        />
                        <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>{a.school}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
                        <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                          {a.location}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Star style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
                          <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                            GPA: {a.gpa}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            color: '#94a3b8',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          NCAA Division I
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
                        <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>{a.major}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar style={{ width: '1rem', height: '1rem', color: '#94a3b8' }} />
                        <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                          {a.graduation}
                        </span>
                      </div>
                    </div>

                    {/* View Profile button */}
                    <button
                      style={{
                        marginTop: '1.25rem',
                        width: '100%',
                        padding: '0.625rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #046ee5',
                        background: 'transparent',
                        color: '#046ee5',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Lock overlay for bottom 3 blurred cards */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: '3rem',
                background: 'linear-gradient(to top, #f8fafc 30%, transparent)',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  pointerEvents: 'auto',
                }}
              >
                <div
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(4, 110, 229, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Lock style={{ width: '1.5rem', height: '1.5rem', color: '#046ee5' }} />
                </div>
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '1rem',
                    fontWeight: 500,
                    textAlign: 'center',
                  }}
                >
                  Request access to view all 200+ athlete profiles
                </p>
                <button onClick={handleRegister} className="lp-btn lp-btn-cta">
                  Request Early Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. Employers CTA (dark) ===== */}
      <section className="lp-gradient-mesh lp-section-padded">
        <div className="lp-container lp-text-center">
          <h2 className="lp-heading-white">Ready to Transform Your Hiring?</h2>
          <p className="lp-body-white-muted" style={{ marginBottom: '2.5rem' }}>
            Join hundreds of companies already recruiting elite student-athletes through Portal.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <button onClick={handleRegister} className="lp-btn lp-btn-cta">
              Start Recruiting Now
              <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem' }}>
              Or email us at{' '}
              <a
                href="mailto:info@portaljobs.net"
                style={{ color: 'white', fontWeight: 600, textDecoration: 'underline' }}
              >
                info@portaljobs.net
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
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
            <p className="lp-footer-copyright">&copy; 2026 Portal. All rights reserved.</p>
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
