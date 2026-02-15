import { FC } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import '../LandingPage.css';

export const AthletesPage: FC = () => {
  const handleGetStarted = () => {
    // For now, redirect to register (will use auth in future)
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
              <Link to="/athletes" className="text-sm font-medium text-primary transition-colors">
                For Athletes
              </Link>
              <Link
                to="/universities"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                For Universities
              </Link>
              <Link
                to="/employers"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                For Employers
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button className="lp-btn lp-btn-ghost">Login</button>
              <button className="lp-btn lp-btn-primary">Sign Up Free</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              For Student-Athletes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Your Career. <span className="text-primary">One Platform.</span> Zero Hassle.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-balance leading-relaxed">
              Jobs. Internships. Career-based NIL deals. Everything you need to win now and set
              yourself up for life after sports—all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleGetStarted} className="lp-btn lp-btn-cta">
                <Rocket className="w-5 h-5 mr-2" />
                Get Started Free
              </button>
              <button className="lp-btn lp-btn-outline">See How It Works</button>
            </div>

            {/* Free Badge */}
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Always free for athletes. No credit card required.
            </div>
          </div>
        </div>
      </section>

      {/* One Platform Section */}
      <section className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Everything In One Place
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Stop Juggling. Start Winning.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No more switching between LinkedIn, Handshake, and random NIL platforms. Portal brings
              it all together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Jobs & Internships',
                description:
                  'Access exclusive opportunities from companies who specifically want to hire athletes like you.',
                icon: Briefcase,
                color: 'bg-blue-500',
              },
              {
                title: 'Career-Based NIL',
                description:
                  'Get paid for internships and professional opportunities—not just posting on social media. Real experience, real money.',
                icon: DollarSign,
                color: 'bg-green-500',
              },
              {
                title: 'Direct Employer Access',
                description:
                  'Skip the resume black hole. Connect directly with recruiters who value your athletic background.',
                icon: MessageSquare,
                color: 'bg-purple-500',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="lp-card lp-stat-card-large group hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`h-2 ${feature.color}`} />
                <div className="p-8">
                  <div
                    className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career-Based NIL Explanation */}
      <section className="lp-section py-20 md:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Career-Based NIL
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                NIL That Actually Builds Your Future
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Forget one-off sponsorship posts. Career-based NIL connects your name, image, and
                likeness to real professional opportunities.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Think: paid internships, consulting gigs, and entry-level roles where companies
                value your athletic brand AND want to develop you professionally. Win now with NIL
                income. Win later with experience that launches your career.
              </p>

              <div className="space-y-4">
                {[
                  'Get paid while gaining real work experience',
                  'Build professional skills alongside your athletic career',
                  'Create relationships with companies before graduation',
                  'Stand out with a resume that shows more than just sports',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="lp-card lp-stat-card-large overflow-hidden">
                <div className="h-2 bg-green-500" />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Marketing Intern + NIL Deal
                      </div>
                      <div className="text-sm text-muted-foreground">Tech Startup - Remote</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      10 hrs/week
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      $2,500/month
                    </span>
                  </div>
                </div>
              </div>

              <div className="lp-card lp-stat-card-large overflow-hidden">
                <div className="h-2 bg-blue-500" />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Sales Development + Ambassador
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Fortune 500 Company - Hybrid
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      15 hrs/week
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      $3,000/month
                    </span>
                  </div>
                </div>
              </div>

              <div className="lp-card lp-stat-card-large overflow-hidden">
                <div className="h-2 bg-purple-500" />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        Finance Analyst Apprentice
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Investment Firm - In-Person
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Summer Program
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      $5,000/month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No complicated setup. No resume writing courses needed. Just you, your profile, and
              opportunities waiting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                description:
                  'Add your sport, school, achievements, and career interests. Takes 5 minutes.',
                icon: Users,
              },
              {
                step: '2',
                title: 'Get Matched',
                description:
                  'Our system surfaces opportunities that fit your schedule, interests, and goals.',
                icon: Target,
              },
              {
                step: '3',
                title: 'Apply & Connect',
                description:
                  'One-click applications. Direct messaging with recruiters. No black holes.',
                icon: MessageSquare,
              },
              {
                step: '4',
                title: 'Land Opportunities',
                description:
                  'Jobs, internships, or career-based NIL deals. Your choice, your career.',
                icon: Award,
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">Step {item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Athletes Love Portal */}
      <section className="lp-section lp-advantage-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built By Athletes, For Athletes</h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              We know your schedule is insane. We know you have practice, games, and classes. Portal
              works around your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  'Employers on Portal already value what you bring—discipline, teamwork, resilience. No need to prove yourself.',
                icon: Trophy,
              },
              {
                title: 'School Approved',
                description:
                  'Your university career center can see and support your activities. Stay compliant, stay focused.',
                icon: FileText,
              },
            ].map((feature, index) => (
              <div key={index} className="lp-advantage-card">
                <div className="lp-advantage-icon">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Your Time Is Now
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Win Now. Win Later. Win Always.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Your athletic career prepared you for this. Take advantage of your situation while you
            can. Join thousands of student-athletes already building their futures.
          </p>
          <button onClick={handleGetStarted} className="lp-btn lp-btn-cta">
            <Rocket className="w-5 h-5 mr-2" />
            Create Your Free Profile
          </button>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              100% Free
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />5 Minute Setup
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No Credit Card
            </span>
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
