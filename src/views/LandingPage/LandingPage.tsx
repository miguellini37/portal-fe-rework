import { FC } from 'react';
import { useAuth } from '../../auth/hooks';
import { Navigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Briefcase,
  Trophy,
  Target,
  Clock,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Award,
  BarChart3,
} from 'lucide-react';
import { LandingNavbar } from './LandingNavbar';
import './LandingPage.css';

export const LandingPage: FC = () => {
  const { isAuthenticated, initialized, register } = useAuth();

  // Wait for auth to initialize
  if (!initialized) {
    return <div className="lp-loading-container">Loading...</div>;
  }

  // Redirect authenticated users to profile
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleRegister = () => {
    register();
  };

  return (
    <div className="lp-root min-h-screen bg-background">
      {/* Navigation */}
      <LandingNavbar registerText="Get Started" />

      {/* Hero Section */}
      <section className="lp-hero relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              The Future of Athletic Talent Recruitment
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              The Direct Pipeline to{' '}
              <span className="text-primary">Elite Student-Athlete Talent</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              A career platform that connects student-athletes and employers for jobs, internships,
              and NIL opportunities while modernizing university career systems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleRegister} className="lp-btn lp-btn-cta">
                <Users className="w-5 h-5 mr-2" />
                Join Now (Athletes)
              </button>
              <button onClick={handleRegister} className="lp-btn lp-btn-outline">
                <GraduationCap className="w-5 h-5 mr-2" />
                Partner with Portal (Schools)
              </button>
              <button onClick={handleRegister} className="lp-btn lp-btn-outline">
                <Briefcase className="w-5 h-5 mr-2" />
                Recruit Talent (Employers)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Student-Athletes Section */}
      <section id="athletes" className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              The Competitive Edge
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              The Student-Athlete Advantage:{' '}
              <span className="text-primary">Why They Are Your Best Hire</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Student-athletes are a pre-vetted source of high-performance talent who find work at
              higher rates than their peers.
            </p>
          </div>
        </div>
      </section>

      {/* Statistical Proof Section */}
      <section id="employers" className="lp-section py-20 md:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Data-Driven Results
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Statistical Proof
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The numbers speak for themselves. Student-athletes dominate corporate leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: '80%',
                highlight: 'Fortune 500 Executives',
                description:
                  'of Fortune 500 executives and 94% of female C-suite leaders come from athletic backgrounds.',
                icon: TrendingUp,
              },
              {
                stat: '68%',
                highlight: 'CEO Backgrounds',
                description: 'of top CEOs have backgrounds in collegiate athletics.',
                icon: Star,
              },
              {
                stat: '66%',
                highlight: 'Corporate Leaders',
                description:
                  'of corporate leaders played sports in college. Join this elite population.',
                icon: Trophy,
              },
            ].map((item, index) => (
              <div key={index} className="lp-card lp-stat-card-large">
                <div className="h-2 bg-primary lp-card-accent" />
                <div className="p-8">
                  <div className="lp-icon-container mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">{item.stat}</div>
                  <div className="text-lg font-semibold text-foreground mb-3">{item.highlight}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inherent Traits Section */}
      <section id="universities" className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Built Different
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Their Inherent Traits
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Success in demanding athletic roles requires a specific DNA that translates directly
                to corporate success.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Pre-Vetted Discipline',
                  description:
                    'Athletes possess a "win-now" mentality and proven discipline developed in highly demanding environments.',
                  icon: Shield,
                },
                {
                  title: 'Resilience & Focus',
                  description:
                    'These candidates thrive in fast-paced environments that require extreme focus and the ability to perform under pressure.',
                  icon: Target,
                },
                {
                  title: 'Teamwork & Coachability',
                  description:
                    'Years of high-level competition foster deep coachability and the teamwork skills necessary for modern organizations.',
                  icon: Users,
                },
                {
                  title: 'Time Management',
                  description:
                    'Balancing academic responsibilities with intense athletic commitments creates masters of time poverty and efficiency.',
                  icon: Clock,
                },
              ].map((trait, index) => (
                <div key={index} className="lp-card lp-trait-card">
                  <div className="lp-trait-icon">
                    <trait.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{trait.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recruiting Advantage Section */}
      <section className="lp-section lp-advantage-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Recruiting Advantage for You
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Gain the competitive edge in talent acquisition with exclusive access to elite
              candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Exclusive First-Look',
                description:
                  'Secure these high-resilience leaders before they ever hit general job boards like LinkedIn or Handshake.',
                icon: Star,
              },
              {
                title: 'Direct Pipeline',
                description:
                  'Connect your organization to an elite talent pool that is often overlooked by traditional recruitment channels.',
                icon: ArrowRight,
              },
              {
                title: 'Quantifiable Impact',
                description:
                  'Recruit from a population that already outperforms peers in graduation rates (68%) and workplace engagement (42%).',
                icon: CheckCircle,
              },
            ].map((advantage, index) => (
              <div key={index} className="lp-advantage-card">
                <div className="lp-advantage-icon">
                  <advantage.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Access Elite Talent?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the platform that connects you directly with pre-vetted, high-performance
            student-athletes ready to make an impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleRegister} className="lp-btn lp-btn-cta">
              <Users className="w-5 h-5 mr-2" />
              Join Now (Athletes)
            </button>
            <button onClick={handleRegister} className="lp-btn lp-btn-outline">
              <GraduationCap className="w-5 h-5 mr-2" />
              Partner with Portal (Schools)
            </button>
            <button onClick={handleRegister} className="lp-btn lp-btn-outline">
              <Briefcase className="w-5 h-5 mr-2" />
              Recruit Talent (Employers)
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Portal</span>
            </div>
            <p className="text-sm text-background/70">© 2026 Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
