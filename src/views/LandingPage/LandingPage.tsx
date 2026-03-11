import { FC, useState } from 'react';
import { useAuth } from '../../auth/hooks';
import { Navigate } from 'react-router-dom';
import {
  Trophy,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Shield,
  Target,
  Clock,
  Users,
  Mail,
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
      "These candidates work well under pressure and in demanding roles \u2014 they've been doing it since age 18.",
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
      'Balancing full academic schedule with varsity sport creates professionals who know how to prioritize and execute.',
    icon: Clock,
  },
];

const sourcingBenefits = [
  {
    title: 'Early Access',
    description: 'Reach driven, dependable candidates before they appear on standard job boards.',
    icon: Zap,
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

      {/* Hero Section */}
      <section className="lp-hero">
        <div className="lp-hero-bg" />
        <div className="lp-container lp-hero-content">
          <p className="lp-hero-eyebrow">The Career Platform Built for Student-Athletes</p>
          <h1 className="lp-hero-title">
            Where Student-Athletes Build Their <span className="lp-text-accent">Careers</span>
          </h1>
          <p className="lp-hero-subtitle">
            Portal connects NCAA athletes with employers, internships, and NIL opportunities — while
            giving universities the tools to support every step.
          </p>
          <div className="lp-hero-actions">
            <button onClick={() => register('athlete')} className="lp-btn lp-btn-cta">
              Create Free Profile
            </button>
            <button onClick={() => register('company')} className="lp-btn lp-btn-outline-light">
              Request a Demo
            </button>
          </div>
          <div className="lp-hero-labels">
            <span>For athletes — always free</span>
            <span>For employers & universities</span>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="lp-logo-cloud">
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

      {/* Why Student-Athletes Section */}
      <section className="lp-section lp-section-dark">
        <div className="lp-container">
          <div className="lp-two-col">
            <div className="lp-two-col-text">
              <p className="lp-section-eyebrow">Why Student-Athletes</p>
              <h2 className="lp-section-title">The Candidate Most Overlooked</h2>
              <p className="lp-section-body">
                Student-athletes have been tested in ways most candidates never are. They show up,
                they perform, and they don&apos;t need motivation — habit built years before.
              </p>
            </div>
            <div className="lp-advantage-box">
              <h3 className="lp-advantage-box-title">The Athlete Advantage</h3>
              <p className="lp-advantage-box-subtitle">Athletes Lead in Business</p>
              <p className="lp-advantage-box-body">
                The traits that make great athletes — discipline, resilience, coachability — are the
                same traits that define top performers in the workplace.
              </p>
              <div className="lp-stats-row">
                <div className="lp-stat-item">
                  <div className="lp-stat-number">
                    <Star className="lp-stat-icon" />
                  </div>
                  <div className="lp-stat-label">Fortune 500 Leadership</div>
                </div>
                <div className="lp-stat-item">
                  <div className="lp-stat-number">
                    <Trophy className="lp-stat-icon" />
                  </div>
                  <div className="lp-stat-label">CEO Backgrounds</div>
                </div>
                <div className="lp-stat-item">
                  <div className="lp-stat-number">
                    <Target className="lp-stat-icon" />
                  </div>
                  <div className="lp-stat-label">Corporate Leadership</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traits Section */}
      <section className="lp-section lp-section-dark">
        <div className="lp-container">
          <div className="lp-traits-header">
            <h2 className="lp-section-title">What Sets Them Apart</h2>
            <p className="lp-section-body lp-traits-intro">
              Student-athletes develop qualities that translate directly to workplace success —
              through years of training, not a weekend seminar. Most new hires need months to prove
              work ethic. Student-athletes come with it already built in.
            </p>
          </div>
          <div className="lp-traits-grid">
            {traits.map((trait) => (
              <div key={trait.title} className="lp-trait-card">
                <div className="lp-trait-icon">
                  <trait.icon className="lp-trait-icon-svg" />
                </div>
                <h3 className="lp-trait-card-title">{trait.title}</h3>
                <p className="lp-trait-card-body">{trait.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Section */}
      <section className="lp-section lp-section-dark">
        <div className="lp-container">
          <div className="lp-sourcing-header">
            <h2 className="lp-section-title">Find Strong Candidates Before Your Competitors Do</h2>
            <p className="lp-section-body">
              Portal gives your hiring team early access to qualified student-athletes before they
              hit the open market.
            </p>
          </div>
          <div className="lp-sourcing-grid">
            {sourcingBenefits.map((benefit) => (
              <div key={benefit.title} className="lp-sourcing-card">
                <div className="lp-sourcing-icon">
                  <benefit.icon className="lp-sourcing-icon-svg" />
                </div>
                <h3 className="lp-sourcing-card-title">{benefit.title}</h3>
                <p className="lp-sourcing-card-body">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-section lp-section-dark lp-cta-section">
        <div className="lp-container lp-cta-container">
          <h2 className="lp-section-title">Ready to Get Started?</h2>
          <p className="lp-section-body">
            Join the waitlist and be first to access Portal when we launch.
          </p>
          <div className="lp-cta-tabs">
            <button
              className={`lp-cta-tab ${activeTab === 'athlete' ? 'lp-cta-tab-active' : ''}`}
              onClick={() => setActiveTab('athlete')}
            >
              Athlete
            </button>
            <button
              className={`lp-cta-tab ${activeTab === 'company' ? 'lp-cta-tab-active' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              Employer
            </button>
            <button
              className={`lp-cta-tab ${activeTab === 'school' ? 'lp-cta-tab-active' : ''}`}
              onClick={() => setActiveTab('school')}
            >
              University
            </button>
          </div>
          <button onClick={() => register(activeTab)} className="lp-btn lp-btn-cta lp-cta-waitlist">
            Join the Waitlist — Free
          </button>
          <p className="lp-cta-legal">
            By signing up you agree to our Privacy Policy and Terms of Service
          </p>
          <div className="lp-cta-badges">
            <span>Free for athletes</span>
            <span>No credit card required</span>
            <span>Early access priority</span>
          </div>
        </div>
      </section>

      {/* Footer */}
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
