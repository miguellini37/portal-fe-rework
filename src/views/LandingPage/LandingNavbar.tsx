import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Trophy, X } from 'lucide-react';
import { useAuth } from '../../auth/hooks';

interface LandingNavbarProps {
  registerText?: string;
  role?: string;
}

export const LandingNavbar: FC<LandingNavbarProps> = ({ registerText = 'Get Started', role }) => {
  const { login, register } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/athletes', label: 'For Athletes' },
    { path: '/universities', label: 'For Universities' },
    { path: '/employers', label: 'For Employers' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogin = () => {
    login();
  };

  const handleRegister = () => {
    register(role);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="lp-nav fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Portal</span>
          </Link>
          <div className="lp-nav-desktop-links items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) || (link.path === '/' && isActive(''))
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="lp-nav-desktop-actions items-center gap-3">
            <button onClick={handleLogin} className="lp-btn lp-btn-ghost">
              Login
            </button>
            <button onClick={handleRegister} className="lp-btn lp-btn-primary">
              {registerText}
            </button>
          </div>
          <button
            type="button"
            className="lp-nav-mobile-toggle"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div className="lp-nav-mobile-menu">
            <div className="lp-nav-mobile-links">
              {navLinks.map((link) => (
                <Link
                  key={`mobile-${link.path}`}
                  to={link.path}
                  className={`lp-nav-mobile-link ${
                    isActive(link.path) || (link.path === '/' && isActive(''))
                      ? 'lp-nav-mobile-link-active text-primary'
                      : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="lp-nav-mobile-actions">
              <button
                type="button"
                onClick={handleLogin}
                className="lp-nav-mobile-link lp-nav-mobile-action-link text-muted-foreground"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleRegister}
                className="lp-nav-mobile-link lp-nav-mobile-action-link text-muted-foreground"
              >
                {registerText}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};
