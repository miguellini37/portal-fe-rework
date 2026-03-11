import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
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
    <nav className="lp-nav">
      <div className="lp-container">
        <div className="lp-nav-inner">
          <Link to="/" className="lp-nav-logo">
            <div className="lp-nav-logo-icon">
              <Zap className="lp-nav-zap" />
            </div>
            <span className="lp-nav-logo-text">Portal</span>
          </Link>
          <div className="lp-nav-desktop-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`lp-nav-link ${
                  isActive(link.path) || (link.path === '/' && isActive(''))
                    ? 'lp-nav-link-active'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="lp-nav-desktop-actions">
            <button onClick={handleLogin} className="lp-btn lp-btn-ghost-dark">
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
            {isMobileMenuOpen ? (
              <X className="lp-nav-toggle-icon" />
            ) : (
              <Menu className="lp-nav-toggle-icon" />
            )}
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
                      ? 'lp-nav-mobile-link-active'
                      : ''
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
                className="lp-nav-mobile-link lp-nav-mobile-action-link"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleRegister}
                className="lp-nav-mobile-link lp-nav-mobile-action-link"
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
