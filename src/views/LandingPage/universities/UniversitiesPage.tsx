import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Trophy,
  LayoutDashboard,
  Shield,
  BarChart3,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  FileCheck,
  Bell,
  Database,
  PieChart,
  Settings,
} from 'lucide-react';
import '../LandingPage.css';
import { LandingNavbar } from '../LandingNavbar';

export const UniversitiesPage: FC = () => {
  return (
    <div className="lp-root min-h-screen bg-background">
      {/* Navigation */}
      <LandingNavbar registerText="Partner With Us" />

      {/* Hero Section */}
      <section className="lp-hero relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              For Universities
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Centralized Oversight for{' '}
              <span className="text-primary">Student-Athlete Success</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-balance leading-relaxed">
              Modernize your career services with a powerful admin dashboard. Track placements,
              ensure NIL compliance, and give your athletes the tools they need to succeed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:info@portaljobs.net"
                className="lp-btn lp-btn-cta"
                style={{ color: 'white' }}
              >
                Request a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              {/* <button className="lp-btn lp-btn-outline">View Case Studies</button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Dashboard Features */}
      <section className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <LayoutDashboard className="w-4 h-4" />
              Admin Dashboard
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Visibility and Control
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One platform to manage all student-athlete career activities, NIL deals, and employer
              relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
                icon: PieChart,
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
            ].map((feature, index) => (
              <div key={index} className="lp-card lp-stat-card-large overflow-hidden">
                <div className="h-1.5 bg-primary" />
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NIL Compliance Section */}
      <section className="lp-section py-20 md:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                NIL Compliance Made Simple
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Stay Compliant, Stay Competitive
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Navigate the complex NIL landscape with confidence. Portal provides the tools you
                need to support your athletes while maintaining full compliance.
              </p>

              <div className="space-y-4">
                {[
                  'Review and approve all NIL opportunities before athletes commit',
                  'Automated compliance checks against NCAA and state regulations',
                  'Complete audit trail for all NIL activities',
                  'Real-time notifications for pending approvals',
                  'Generate compliance reports for athletic directors and administrators',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lp-card lp-stat-card-large overflow-hidden">
              <div className="h-2 bg-primary" />
              <div className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-primary" />
                  NIL Compliance Checklist
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Athlete eligibility verified', status: 'complete' },
                    { label: 'Deal terms reviewed', status: 'complete' },
                    { label: 'NCAA guidelines check', status: 'complete' },
                    { label: 'State regulation compliance', status: 'complete' },
                    { label: 'University policy alignment', status: 'pending' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                    >
                      <span className="text-foreground">{item.label}</span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          item.status === 'complete'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.status === 'complete' ? 'Complete' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="lp-section py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Why Partner With Portal
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Benefits for Your Institution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Improve Placement Rates',
                description:
                  'Give your athletes direct access to employers actively seeking their unique skills. Track and report improved outcomes.',
              },
              {
                title: 'Reduce Administrative Burden',
                description:
                  'Automate NIL approvals, employer vetting, and placement tracking. Free your staff to focus on strategy.',
              },
              {
                title: 'Enhance Recruiting Pitch',
                description:
                  'Show prospective athletes that your program invests in their career success beyond graduation.',
              },
              {
                title: 'Build Employer Relationships',
                description:
                  'Create lasting partnerships with companies who want to recruit your athletes year after year.',
              },
            ].map((benefit, index) => (
              <div key={index} className="lp-card lp-trait-card">
                <div className="lp-trait-icon">
                  <Settings className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lp-section lp-advantage-section py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Modernize Your Career Services?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join leading universities using Portal to support their student-athletes and maintain
            compliance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-lg text-primary bg-white px-6 py-3 rounded-lg border border-white/30">
              Schedule a Demo:{' '}
              <a href="mailto:info@portaljobs.net" className="font-semibold hover:underline">
                info@portaljobs.net
              </a>
            </div>
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
