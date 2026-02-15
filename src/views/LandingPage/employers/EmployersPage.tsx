import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Trophy,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Target,
  Building2,
} from 'lucide-react';
import '../LandingPage.css';

export const EmployersPage: FC = () => {
  const handleGetStarted = () => {
    window.location.href = '/';
  };

  return (
    <div className="lp-root min-h-screen bg-background">
      {/* Navigation */}
      <nav className="lp-nav fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Portal</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/athletes"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                For Athletes
              </Link>
              <Link
                to="/universities"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                For Universities
              </Link>
              <Link to="/employers" className="text-sm font-medium text-primary transition-colors">
                For Employers
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button className="lp-btn lp-btn-ghost">Login</button>
              <button className="lp-btn lp-btn-primary">Start Recruiting</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              For Employers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Maximize Your <span className="text-primary">Recruitment ROI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-balance leading-relaxed">
              Access pre-vetted, high-performance student-athletes who fill roles faster, stay
              longer, and outperform traditional hires.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleGetStarted} className="lp-btn lp-btn-cta">
                Start Recruiting Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="lp-btn lp-btn-outline">Schedule a Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Statistics */}
      <section className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              The ROI Advantage
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Numbers That Matter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Student-athletes deliver measurable business impact from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stat: '20-40%',
                label: 'Faster Role Fulfillment',
                description:
                  'Student-athletes fill positions significantly faster than traditional candidates',
                icon: Clock,
              },
              {
                stat: '50%',
                label: 'Lower Onboarding Costs',
                description:
                  "Portal's direct pipeline reduces recruiting overhead and onboarding time",
                icon: DollarSign,
              },
              {
                stat: '68%',
                label: 'Higher Graduation Rates',
                description:
                  'Demonstrating commitment, follow-through, and ability to complete goals',
                icon: TrendingUp,
              },
              {
                stat: '42%',
                label: 'Better Engagement',
                description: 'Student-athletes show higher workplace engagement scores',
                icon: Target,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="lp-card lp-stat-card-large group hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <div className="h-1.5 bg-primary" />
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-1">{item.stat}</div>
                  <div className="text-base font-semibold text-foreground mb-2">{item.label}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Portal */}
      <section className="lp-section py-20 md:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Your Competitive Edge
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Why Recruit Through Portal?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Traditional job boards give you volume. Portal gives you quality. Access candidates
                who are already proven performers.
              </p>

              <div className="space-y-4">
                {[
                  'Exclusive access before LinkedIn or Handshake',
                  'Pre-screened candidates with verified athletic backgrounds',
                  'Direct connection to university career centers',
                  'NIL-integrated opportunities for unique engagement',
                  'Detailed performance profiles and character assessments',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Exclusive First-Look',
                  description: 'Secure high-resilience leaders before they hit general job boards.',
                  icon: Target,
                },
                {
                  title: 'Direct Pipeline',
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
                  icon: Users,
                },
              ].map((feature, index) => (
                <div key={index} className="lp-card lp-trait-card">
                  <div className="lp-trait-icon">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Portal Works for Employers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to access elite student-athlete talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-primary/10 absolute -top-4 left-0">
                  {item.step}
                </div>
                <div className="relative pt-12 pl-4">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-section lp-advantage-section py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of companies already recruiting elite student-athletes through Portal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="lp-btn lp-btn-cta bg-white text-primary hover:bg-white/90"
            >
              Start Recruiting Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="lp-btn lp-btn-outline border-white text-white hover:bg-white hover:text-primary">
              Talk to Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Portal</span>
            </Link>
            <div className="flex items-center gap-8 text-sm text-background/70">
              <Link to="/athletes" className="hover:text-background transition-colors">
                For Athletes
              </Link>
              <Link to="/universities" className="hover:text-background transition-colors">
                For Universities
              </Link>
              <Link to="/employers" className="hover:text-background transition-colors">
                For Employers
              </Link>
            </div>
            <p className="text-sm text-background/70">© 2026 Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
