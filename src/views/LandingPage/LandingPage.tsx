import { FC, useState } from 'react';
import { useAuth } from '../../auth/hooks';
import { Navigate } from 'react-router-dom';
import {
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Shield,
  Target,
  Clock,
  Users,
  Mail,
  Hexagon,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { LandingNavbar } from './LandingNavbar';
import './LandingPage.css';

const universityLogos = ['UMICH', 'STANFORD', 'DUKE', 'ND', 'UCLA', 'USC'];

const traits = [
  {
    title: 'Proven Discipline',
    description:
      'A results-focused mindset, built through years of high-stakes competition where there are no excuses.',
    icon: Shield,
  },
  {
    title: 'Resilience & Focus',
    description:
      "These candidates work well under pressure and in demanding roles \u2014 they've been doing it since they were 18.",
    icon: Target,
  },
  {
    title: 'Open to Feedback and Direction',
    description:
      "Years of coaching build people who take direction, improve quickly, and don't take criticism personally.",
    icon: Users,
  },
  {
    title: 'Skilled at Managing Heavy Workloads',
    description:
      'Balancing a full academic schedule with a varsity sport creates professionals who know how to prioritize and execute.',
    icon: Clock,
  },
];

const sourcingBenefits = [
  {
    title: 'Early Access',
    description: 'Reach driven, dependable candidates before they appear on standard job boards.',
    icon: Star,
  },
  {
    title: 'Direct Access',
    description:
      "A dedicated connection to qualified student-athletes that standard job boards don't reach.",
    icon: ArrowRight,
  },
  {
    title: 'Measurable Results',
    description:
      'This candidate group outperforms peers in graduation rates (68%) and workplace engagement (42%).',
    icon: CheckCircle,
  },
];

export const LandingPage: FC = () => {
  const { isAuthenticated, initialized, register } = useAuth();
  const [activeTab, setActiveTab] = useState<'athlete' | 'company' | 'school'>('athlete');

  if (!initialized) {
    return <div className="lp-loading-container">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="lp-root">
      <LandingNavbar registerText="Get Started" />

      {/* Hero Section - Dark */}
      <section className="lp-hero lp-gradient-mesh">
        <div className="lp-hero-floats">
          <div className="lp-hero-float lp-hero-float-1" />
          <div className="lp-hero-float lp-hero-float-2" />
          <div className="lp-hero-float lp-hero-float-3" />
        </div>
        <div className="lp-container lp-hero-content">
          <div className="lp-hero-badge">
            <Sparkles className="lp-hero-badge-icon" />
            The Career Platform Built for Student-Athletes
          </div>
          <h1 className="lp-hero-title">
            Where Student-Athletes Build Their <span className="lp-text-accent">Careers</span>
          </h1>
          <p className="lp-hero-subtitle">
            Portal connects NCAA athletes with employers, internships, and NIL opportunities — while
            giving universities the tools to support every step.
          </p>
          <div className="lp-hero-actions">
            <div className="lp-hero-action-group">
              <button onClick={() => register('athlete')} className="lp-btn lp-btn-cta">
                Create Free Profile
              </button>
              <span className="lp-hero-label">For athletes — always free</span>
            </div>
            <div className="lp-hero-action-group">
              <button onClick={() => register('company')} className="lp-btn lp-btn-outline-light">
                Request a Demo
              </button>
              <span className="lp-hero-label">For employers &amp; universities</span>
            </div>
          </div>
        </div>
        <div className="lp-hero-fade" />
      </section>

      {/* Logo Cloud - White */}
      <section className="lp-section-white lp-logo-cloud">
        <div className="lp-container">
          <p className="lp-logo-cloud-title">Trusted by leading athletic programs</p>
          <div className="lp-logo-cloud-grid">
            {universityLogos.map((name) => (
              <span key={name} className="lp-logo-cloud-item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Student-Athletes - White */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container lp-text-center">
          <div className="lp-badge-light">
            <Hexagon className="lp-badge-icon" />
            Why Student-Athletes
          </div>
          <h2 className="lp-heading-dark">The Candidate Most Companies Overlook</h2>
          <p className="lp-body-muted">
            Student-athletes have been tested in ways most candidates never are. They show up, they
            perform, and they don&apos;t need to be motivated — that habit was built years before
            they applied.
          </p>
        </div>
      </section>

      {/* Stats Section - Dark */}
      <section className="lp-gradient-mesh lp-section-padded">
        <div className="lp-container">
          <div className="lp-text-center lp-mb-16">
            <div className="lp-badge-dark">
              <BarChart3 className="lp-badge-icon" />
              The Athlete Advantage
            </div>
            <h2 className="lp-heading-white">Athletes Lead in Business</h2>
            <p className="lp-body-white-muted">
              The traits that make great athletes — discipline, resilience, coachability — are the
              same traits that define top performers in the workplace.
            </p>
          </div>
          <div className="lp-stats-grid">
            {[
              {
                label: 'Fortune 500 Leadership',
                body: 'Of Fortune 500 executives, and 94% of female C-suite leaders, come from competitive athletic backgrounds.',
              },
              {
                label: 'CEO Backgrounds',
                body: 'Of CEOs at leading companies played collegiate sports.',
              },
              {
                label: 'Corporate Leadership',
                body: 'Student-athletes dominate corporate leadership — and have for decades.',
              },
            ].map((stat) => (
              <div key={stat.label} className="lp-glass-card lp-text-center">
                <div className="lp-stat-number-large">0</div>
                <div className="lp-stat-card-label">{stat.label}</div>
                <p className="lp-stat-card-body">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traits Section - White */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container">
          <div className="lp-traits-layout">
            <div className="lp-traits-text">
              <div className="lp-badge-light">
                <Zap className="lp-badge-icon" />
                What Sets Them Apart
              </div>
              <h2 className="lp-heading-dark">What Sets Them Apart</h2>
              <p className="lp-body-muted">
                Student-athletes develop qualities that translate directly to workplace success —
                through years of training, not a weekend seminar.
              </p>
              <p className="lp-traits-quote">
                Most new hires need months to prove their work ethic. Student-athletes come with it
                already built in.
              </p>
            </div>
            <div className="lp-traits-grid">
              {traits.map((trait) => (
                <div key={trait.title} className="lp-trait-card-light">
                  <div className="lp-trait-icon-light">
                    <trait.icon className="lp-trait-icon-svg-light" />
                  </div>
                  <h3 className="lp-trait-card-title-light">{trait.title}</h3>
                  <p className="lp-trait-card-body-light">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Section - Dark */}
      <section className="lp-gradient-mesh lp-section-padded">
        <div className="lp-container">
          <div className="lp-text-center lp-mb-16">
            <h2 className="lp-heading-white">
              Find Strong Candidates Before Your Competitors Do
            </h2>
            <p className="lp-body-white-muted">
              Portal gives your hiring team early access to qualified student-athletes before they
              hit the open market.
            </p>
          </div>
          <div className="lp-sourcing-grid">
            {sourcingBenefits.map((benefit) => (
              <div key={benefit.title} className="lp-glass-card">
                <div className="lp-glass-icon">
                  <benefit.icon className="lp-glass-icon-svg" />
                </div>
                <h3 className="lp-glass-card-title">{benefit.title}</h3>
                <p className="lp-glass-card-body">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - White */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container lp-text-center">
          <h2 className="lp-heading-dark">Ready to Get Started?</h2>
          <p className="lp-body-muted">
            Join the waitlist and be first to access Portal when we launch.
          </p>
          <div className="lp-cta-form-wrapper">
            <div className="lp-cta-tabs-light">
              <button
                className={`lp-cta-tab-light ${activeTab === 'athlete' ? 'lp-cta-tab-light-active' : ''}`}
                onClick={() => setActiveTab('athlete')}
              >
                Athlete
              </button>
              <button
                className={`lp-cta-tab-light ${activeTab === 'company' ? 'lp-cta-tab-light-active' : ''}`}
                onClick={() => setActiveTab('company')}
              >
                Employer
              </button>
              <button
                className={`lp-cta-tab-light ${activeTab === 'school' ? 'lp-cta-tab-light-active' : ''}`}
                onClick={() => setActiveTab('school')}
              >
                University
              </button>
            </div>
            <button
              onClick={() => register(activeTab)}
              className="lp-btn lp-btn-cta lp-cta-submit"
            >
              Join the Waitlist — Free
            </button>
            <p className="lp-cta-legal-light">
              By signing up you agree to our Privacy Policy and Terms of Service
            </p>
          </div>
          <div className="lp-cta-badges-light">
            <span>
              <span className="lp-dot-green" />
              Free for athletes
            </span>
            <span>
              <span className="lp-dot-green" />
              No credit card required
            </span>
            <span>
              <span className="lp-dot-green" />
              Early access priority
            </span>
          </div>
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
                <a href="/athletes" className="lp-footer-link">
                  Overview
                </a>
                <a href="/athletes" className="lp-footer-link">
                  Jobs & Internships
                </a>
                <a href="/athletes" className="lp-footer-link">
                  NIL Opportunities
                </a>
              </div>
              <div className="lp-footer-col">
                <h4 className="lp-footer-col-title">For Universities</h4>
                <a href="/universities" className="lp-footer-link">
                  Overview
                </a>
                <a href="/universities" className="lp-footer-link">
                  Admin Dashboard
                </a>
                <a href="/universities" className="lp-footer-link">
                  NIL Compliance
                </a>
              </div>
              <div className="lp-footer-col">
                <h4 className="lp-footer-col-title">For Employers</h4>
                <a href="/employers" className="lp-footer-link">
                  Overview
                </a>
                <a href="/employers" className="lp-footer-link">
                  Start Recruiting
                </a>
                <a href="/employers" className="lp-footer-link">
                  ROI Advantage
                </a>
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
