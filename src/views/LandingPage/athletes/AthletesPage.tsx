import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { LandingNavbar } from '../LandingNavbar';
import { useAuth } from '../../../auth/hooks';
import {
  Users,
  Trophy,
  Briefcase,
  DollarSign,
  CheckCircle,
  Zap,
  Star,
  Rocket,
  Clock,
  Target,
  Award,
  TrendingUp,
  FileText,
  MessageSquare,
  Calendar,
  ChevronDown,
  MapPin,
  Building2,
  Sparkles,
  Check,
  X,
  Minus,
  Mail,
  Shield,
} from 'lucide-react';
import '../LandingPage.css';

const jobListings = [
  {
    title: 'Operations & Sales Development NIL Fellow',
    company: 'Arrive Logistics',
    salary: '$1,500/mo',
    type: 'NIL',
    typeColor: '#a855f7',
    typeBg: 'rgba(168, 85, 247, 0.1)',
    location: 'Remote or Austin, TX',
    experience: 'Entry Level',
    industry: 'Logistics & Supply Chain',
    applyBy: 'Oct 22, 2026',
  },
  {
    title: 'Business Development Representative',
    company: 'Arrive Logistics',
    salary: '$48,000/yr',
    type: 'Full-Time',
    typeColor: '#046ee5',
    typeBg: 'rgba(4, 110, 229, 0.1)',
    location: 'Austin, TX',
    experience: 'Entry Level',
    industry: 'Logistics & Supply Chain',
    applyBy: 'Feb 11, 2026',
  },
  {
    title: 'Sports Marketing Intern',
    company: 'Nike',
    salary: '$22/hr',
    type: 'Internship',
    typeColor: '#f59e0b',
    typeBg: 'rgba(245, 158, 11, 0.1)',
    location: 'Beaverton, OR',
    experience: 'Entry Level',
    industry: 'Apparel & Sports',
    applyBy: 'Mar 15, 2026',
  },
  {
    title: 'Financial Analyst \u2014 Athlete Program',
    company: 'Goldman Sachs',
    salary: '$75,000/yr',
    type: 'Full-Time',
    typeColor: '#046ee5',
    typeBg: 'rgba(4, 110, 229, 0.1)',
    location: 'New York, NY',
    experience: 'Entry Level',
    industry: 'Finance',
    applyBy: 'Apr 1, 2026',
  },
  {
    title: 'Brand Ambassador NIL Deal',
    company: 'Gatorade',
    salary: '$2,000/mo',
    type: 'NIL',
    typeColor: '#a855f7',
    typeBg: 'rgba(168, 85, 247, 0.1)',
    location: 'Remote',
    experience: 'Any Level',
    industry: 'Sports & Nutrition',
    applyBy: 'May 30, 2026',
  },
  {
    title: 'Sales Development Representative',
    company: 'HubSpot',
    salary: '$55,000/yr',
    type: 'Full-Time',
    typeColor: '#046ee5',
    typeBg: 'rgba(4, 110, 229, 0.1)',
    location: 'Remote',
    experience: 'Entry Level',
    industry: 'Technology',
    applyBy: 'Mar 31, 2026',
  },
];

const comparisonRows = [
  { feature: 'Built for student-athletes', portal: 'check', linkedin: 'x', handshake: 'x' },
  {
    feature: 'Employers who value athletic backgrounds',
    portal: 'check',
    linkedin: 'x',
    handshake: 'minus',
  },
  { feature: 'Career-based NIL opportunities', portal: 'check', linkedin: 'x', handshake: 'x' },
  {
    feature: 'University compliance integration',
    portal: 'check',
    linkedin: 'x',
    handshake: 'check',
  },
  {
    feature: 'Schedule-flexible opportunities',
    portal: 'check',
    linkedin: 'x',
    handshake: 'minus',
  },
  { feature: 'Direct employer messaging', portal: 'check', linkedin: 'check', handshake: 'check' },
  {
    feature: 'Jobs, internships, and NIL in one place',
    portal: 'check',
    linkedin: 'x',
    handshake: 'x',
  },
  { feature: 'Free for athletes', portal: 'check', linkedin: 'check', handshake: 'check' },
];

const faqItems = [
  {
    question: 'Is Portal free for athletes?',
    answer:
      'Yes. Portal is completely free for student-athletes. We believe every athlete deserves access to career opportunities without any financial barriers. You will never be charged to create a profile, browse jobs, or apply to opportunities.',
  },
  {
    question: 'How is Portal different from LinkedIn or Handshake?',
    answer:
      'Portal is built specifically for NCAA athletes. Unlike LinkedIn or Handshake, every employer on Portal actively wants to hire student-athletes and values your athletic background. We also combine jobs, internships, and career-based NIL opportunities in one place \u2014 something no other platform does.',
  },
  {
    question: 'What is career-based NIL?',
    answer:
      'Career-based NIL connects your name, image, and likeness to real professional opportunities \u2014 like paid internships, consulting roles, and ambassador positions. Instead of just posting on social media, you gain real work experience while earning NIL income.',
  },
  {
    question: 'Do I need my school\u2019s approval?',
    answer:
      'No approval needed to sign up and create your profile. Portal is designed to work alongside your university\u2019s career center and compliance office. Your school can see and support your activities to help you stay compliant.',
  },
  {
    question: 'What types of employers are on Portal?',
    answer:
      'Companies ranging from startups to Fortune 500s across industries like technology, finance, consulting, sports, healthcare, and more. Every employer on Portal has opted in because they specifically want to hire student-athletes.',
  },
  {
    question: 'When should I create my profile?',
    answer:
      'As early as possible. Whether you\u2019re a freshman or a senior, creating your profile early gives you access to more opportunities and lets employers discover you sooner. Many of our best opportunities are filled well before graduation.',
  },
];

const ComparisonIcon: FC<{ type: string }> = ({ type }) => {
  if (type === 'check') {
    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Check style={{ width: 14, height: 14, color: '#22c55e' }} />
      </div>
    );
  }
  if (type === 'x') {
    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <X style={{ width: 14, height: 14, color: '#ef4444' }} />
      </div>
    );
  }
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Minus style={{ width: 14, height: 14, color: '#f59e0b' }} />
    </div>
  );
};

export const AthletesPage: FC = () => {
  const { register } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGetStarted = () => {
    register('athlete');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="lp-root">
      <LandingNavbar registerText="Sign Up Free" role="athlete" />

      {/* ===== 1. Hero Section (dark) ===== */}
      <section className="lp-hero lp-gradient-mesh">
        <div className="lp-hero-floats">
          <div className="lp-hero-float lp-hero-float-1" />
          <div className="lp-hero-float lp-hero-float-2" />
          <div className="lp-hero-float lp-hero-float-3" />
        </div>
        <div className="lp-container lp-hero-content">
          <div className="lp-hero-badge">
            <Users className="lp-hero-badge-icon" />
            For Student-Athletes
          </div>
          <h1 className="lp-hero-title">
            Your Career. <span className="lp-text-accent">One Platform.</span> Zero Hassle.
          </h1>
          <p className="lp-hero-subtitle">
            Jobs. Internships. Career-based NIL deals. Everything you need to win now and set
            yourself up for life after sports — all in one place.
          </p>
          <div className="lp-hero-actions">
            <button onClick={handleGetStarted} className="lp-btn lp-btn-cta">
              <Rocket style={{ width: 20, height: 20 }} />
              Get Started Free
            </button>
            <button className="lp-btn lp-btn-outline-light">See How It Works</button>
          </div>
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['100% Free', '5-Minute Setup', 'No Credit Card'].map((text) => (
              <span
                key={text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <CheckCircle style={{ width: 16, height: 16, color: '#22c55e' }} />
                {text}
              </span>
            ))}
          </div>
        </div>
        <div className="lp-hero-fade" />
      </section>

      {/* ===== 2. Opportunities Section (white) ===== */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container lp-text-center">
          <div className="lp-badge-light">
            <Target className="lp-badge-icon" />
            Everything In One Place
          </div>
          <h2 className="lp-heading-dark">One Platform. Every Opportunity.</h2>
          <p className="lp-body-muted" style={{ marginBottom: '3rem' }}>
            No more switching between LinkedIn, Handshake, and random NIL platforms. Portal brings
            it all together.
          </p>
        </div>
        <div className="lp-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                title: 'Jobs & Internships',
                description:
                  'Access exclusive opportunities from companies who specifically want to hire athletes like you.',
                icon: Briefcase,
                color: '#3b82f6',
              },
              {
                title: 'Career-Based NIL',
                description:
                  'Get paid for internships and professional opportunities — not just posting on social media. Real experience, real money.',
                icon: DollarSign,
                color: '#22c55e',
              },
              {
                title: 'Direct Employer Access',
                description:
                  'Skip the resume black hole. Connect directly with recruiters who value your athletic background.',
                icon: MessageSquare,
                color: '#a855f7',
              },
            ].map((feature, index) => (
              <div key={index} className="lp-light-card" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ height: 4, backgroundColor: feature.color }} />
                <div style={{ padding: '2rem' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '1rem',
                      backgroundColor: feature.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <feature.icon style={{ width: 28, height: 28, color: 'white' }} />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#0a0f2e',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: 1.6 }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. Job Listings Preview (gray) ===== */}
      <section className="lp-section-gray lp-section-padded">
        <div className="lp-container lp-text-center">
          <div className="lp-badge-light">
            <Briefcase className="lp-badge-icon" />
            Live Opportunities
          </div>
          <h2 className="lp-heading-dark">Jobs Built for Your Schedule</h2>
          <p className="lp-body-muted" style={{ marginBottom: '3rem' }}>
            Browse real opportunities from employers who want to hire student-athletes.
          </p>
        </div>
        <div className="lp-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {jobListings.map((job, index) => (
              <div key={index} className="lp-job-card">
                <div className="lp-job-card-bar" />
                <div style={{ padding: '1.5rem' }}>
                  <h3
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      color: '#0a0f2e',
                      marginBottom: '0.25rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {job.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                  >
                    <Building2 style={{ width: 14, height: 14, color: '#94a3b8' }} />
                    {job.company}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.25rem 0.625rem',
                        borderRadius: 9999,
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        color: '#16a34a',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                      }}
                    >
                      <DollarSign style={{ width: 13, height: 13 }} />
                      {job.salary}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.25rem 0.625rem',
                        borderRadius: 9999,
                        backgroundColor: job.typeBg,
                        color: job.typeColor,
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                      }}
                    >
                      {job.type}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.375rem',
                      fontSize: '0.8125rem',
                      color: '#64748b',
                      marginBottom: '1rem',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <MapPin style={{ width: 13, height: 13, color: '#94a3b8' }} />
                      {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Star style={{ width: 13, height: 13, color: '#94a3b8' }} />
                      {job.experience}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Briefcase style={{ width: 13, height: 13, color: '#94a3b8' }} />
                      {job.industry}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Calendar style={{ width: 13, height: 13, color: '#94a3b8' }} />
                      Apply by {job.applyBy}
                    </span>
                  </div>
                  <button
                    className="lp-btn lp-btn-cta"
                    style={{ width: '100%', padding: '0.625rem 1rem', fontSize: '0.875rem' }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lp-text-center" style={{ marginTop: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Showing 6 of 200+ open roles
            </p>
            <button className="lp-btn lp-btn-cta">View All Opportunities</button>
          </div>
        </div>
      </section>

      {/* ===== 4. Comparison Section (dark) ===== */}
      <section className="lp-gradient-mesh lp-section-padded">
        <div className="lp-container lp-text-center lp-mb-16">
          <div className="lp-badge-dark">
            <Shield className="lp-badge-icon" />
            Comparison
          </div>
          <h2 className="lp-heading-white">Why Athletes Choose Portal</h2>
          <p className="lp-body-white-muted">See how Portal stacks up against the alternatives.</p>
        </div>
        <div className="lp-container">
          <div className="lp-comparison-table" style={{ maxWidth: '56rem', margin: '0 auto' }}>
            <div className="lp-comparison-header">
              <div
                style={{
                  padding: '1rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Feature
              </div>
              <div style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 9999,
                    backgroundColor: 'rgba(4, 110, 229, 0.3)',
                    border: '1px solid rgba(4, 110, 229, 0.5)',
                    color: 'white',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  Portal
                </span>
              </div>
              <div
                style={{
                  padding: '1rem 0.75rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                LinkedIn
              </div>
              <div
                style={{
                  padding: '1rem 0.75rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                Handshake
              </div>
            </div>
            {comparisonRows.map((row, index) => (
              <div key={index} className="lp-comparison-row">
                <div
                  style={{
                    padding: '0.875rem 1.25rem',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {row.feature}
                </div>
                <div
                  style={{
                    padding: '0.875rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ComparisonIcon type={row.portal} />
                </div>
                <div
                  style={{
                    padding: '0.875rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ComparisonIcon type={row.linkedin} />
                </div>
                <div
                  style={{
                    padding: '0.875rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ComparisonIcon type={row.handshake} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. NIL Section (gray) ===== */}
      <section className="lp-section-gray lp-section-padded">
        <div className="lp-container">
          <div
            style={{
              display: 'grid',
              gap: '4rem',
              alignItems: 'center',
              gridTemplateColumns: '1fr',
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: '4rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'start',
              }}
            >
              {/* Left column */}
              <div>
                <div className="lp-badge-light">
                  <Star className="lp-badge-icon" />
                  Career-Based NIL
                </div>
                <h2 className="lp-heading-dark" style={{ textAlign: 'left' }}>
                  NIL That Actually Builds Your Future
                </h2>
                <p
                  style={{
                    fontSize: '1.125rem',
                    color: '#64748b',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  Forget one-off sponsorship posts. Career-based NIL connects your name, image, and
                  likeness to real professional opportunities — paid internships, consulting gigs,
                  and entry-level roles where companies value your athletic brand AND want to
                  develop you professionally.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    'Get paid while gaining real work experience',
                    'Build professional skills alongside your athletic career',
                    'Create relationships with companies before graduation',
                    'Stand out with a resume that shows more than just sports',
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                    >
                      <CheckCircle
                        style={{
                          width: 20,
                          height: 20,
                          color: '#046ee5',
                          marginTop: 2,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ color: '#0a0f2e' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column - sample NIL cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    title: 'Marketing Intern + NIL Deal',
                    company: 'Tech Startup',
                    location: 'Remote',
                    hours: '10 hrs/week',
                    pay: '$2,500/mo',
                    color: '#22c55e',
                    icon: DollarSign,
                  },
                  {
                    title: 'Sales Development + Ambassador',
                    company: 'Fortune 500',
                    location: 'Hybrid',
                    hours: '15 hrs/week',
                    pay: '$3,000/mo',
                    color: '#3b82f6',
                    icon: Briefcase,
                  },
                  {
                    title: 'Finance Analyst Apprentice',
                    company: 'Investment Firm',
                    location: 'In-Person',
                    hours: 'Summer',
                    pay: '$5,000/mo',
                    color: '#a855f7',
                    icon: TrendingUp,
                  },
                ].map((card, index) => (
                  <div
                    key={index}
                    className="lp-light-card"
                    style={{ overflow: 'hidden', padding: 0 }}
                  >
                    <div style={{ height: 4, backgroundColor: card.color }} />
                    <div style={{ padding: '1.25rem' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            backgroundColor: `${card.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <card.icon style={{ width: 22, height: 22, color: card.color }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0a0f2e', fontSize: '0.9375rem' }}>
                            {card.title}
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                            {card.company} &middot; {card.location}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.5rem',
                          fontSize: '0.8125rem',
                          color: '#64748b',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock style={{ width: 14, height: 14 }} />
                          {card.hours}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <DollarSign style={{ width: 14, height: 14 }} />
                          {card.pay}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. Process Section (white) ===== */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container lp-text-center">
          <div className="lp-badge-light">
            <Zap className="lp-badge-icon" />
            Simple Process
          </div>
          <h2 className="lp-heading-dark">Get Started in Minutes</h2>
          <p className="lp-body-muted" style={{ marginBottom: '3rem' }}>
            No complicated setup. No resume writing courses needed. Just you, your profile, and
            opportunities waiting.
          </p>
        </div>
        <div className="lp-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description:
                  'Add your sport, school, achievements, and career interests. Takes 5 minutes.',
                icon: Users,
              },
              {
                step: '02',
                title: 'Get Matched',
                description:
                  'Our system surfaces opportunities that fit your schedule, interests, and goals.',
                icon: Target,
              },
              {
                step: '03',
                title: 'Apply & Connect',
                description:
                  'One-click applications. Direct messaging with recruiters. No black holes.',
                icon: MessageSquare,
              },
              {
                step: '04',
                title: 'Land Opportunities',
                description:
                  'Jobs, internships, or career-based NIL deals. Your choice, your career.',
                icon: Award,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="lp-light-card"
                style={{ textAlign: 'center', padding: '2rem 1.5rem' }}
              >
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#046ee5',
                    marginBottom: '0.75rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: '#046ee5',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                  }}
                >
                  <item.icon style={{ width: 28, height: 28, color: 'white' }} />
                </div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#0a0f2e',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. Schedule Section (dark) ===== */}
      <section className="lp-gradient-mesh lp-section-padded">
        <div className="lp-container">
          <div className="lp-text-center lp-mb-16">
            <h2 className="lp-heading-white">Built By Athletes, For Athletes</h2>
            <p className="lp-body-white-muted">
              We know your schedule is insane. We know you have practice, games, and classes. Portal
              works around your life.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                title: 'Flexible Opportunities',
                description:
                  'Filter by hours per week, remote options, and season compatibility. Find opportunities that fit your athletic schedule.',
                icon: Calendar,
              },
              {
                title: 'Your Athlete Advantage',
                description:
                  'Employers on Portal already value what you bring \u2014 discipline, teamwork, resilience. No need to prove yourself.',
                icon: Trophy,
              },
              {
                title: 'School Approved',
                description:
                  'Your university career center can see and support your activities. Stay compliant, stay focused.',
                icon: FileText,
              },
            ].map((feature, index) => (
              <div key={index} className="lp-glass-card">
                <div className="lp-glass-icon">
                  <feature.icon className="lp-glass-icon-svg" />
                </div>
                <h3 className="lp-glass-card-title">{feature.title}</h3>
                <p className="lp-glass-card-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. FAQ Section (gray) ===== */}
      <section className="lp-section-gray lp-section-padded">
        <div className="lp-container lp-text-center" style={{ marginBottom: '3rem' }}>
          <div className="lp-badge-light">
            <Sparkles className="lp-badge-icon" />
            FAQ
          </div>
          <h2 className="lp-heading-dark">Common Questions</h2>
        </div>
        <div className="lp-container" style={{ maxWidth: '48rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqItems.map((item, index) => (
              <div key={index} className="lp-faq-item">
                <button className="lp-faq-trigger" onClick={() => toggleFaq(index)}>
                  {item.question}
                  <ChevronDown
                    className={`lp-faq-chevron ${openFaq === index ? 'lp-faq-chevron-open' : ''}`}
                  />
                </button>
                {openFaq === index && <div className="lp-faq-content">{item.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. Athletes CTA (white) ===== */}
      <section className="lp-section-white lp-section-padded">
        <div className="lp-container lp-text-center">
          <h2 className="lp-heading-dark">Start Building What Comes Next</h2>
          <p className="lp-body-muted" style={{ marginBottom: '2rem' }}>
            Your athletic career prepared you for this. Take advantage of your situation while you
            can.
          </p>
          <button onClick={handleGetStarted} className="lp-btn lp-btn-cta">
            <Rocket style={{ width: 20, height: 20 }} />
            Create Your Free Profile
          </button>
          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
              fontSize: '0.875rem',
              color: '#64748b',
            }}
          >
            {['Free for Athletes', 'No Credit Card Required', 'Early Access Priority'].map(
              (text) => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <CheckCircle style={{ width: 16, height: 16, color: '#22c55e' }} />
                  {text}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== Footer (dark) ===== */}
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
                  Jobs &amp; Internships
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
