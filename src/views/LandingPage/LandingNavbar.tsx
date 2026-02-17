import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { useAuth } from '../../auth/hooks';

interface LandingNavbarProps {
  registerText?: string;
}

export const LandingNavbar: FC<LandingNavbarProps> = ({ registerText = 'Get Started' }) => {
  const { login, register } = useAuth();
  const location = useLocation();

  const handleLogin = () => {
    login();
  };

  const handleRegister = () => {
    register();
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
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') || isActive('')
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/athletes"
              className={`text-sm font-medium transition-colors ${
                isActive('/athletes') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              For Athletes
            </Link>
            <Link
              to="/universities"
              className={`text-sm font-medium transition-colors ${
                isActive('/universities')
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              For Universities
            </Link>
            <Link
              to="/employers"
              className={`text-sm font-medium transition-colors ${
                isActive('/employers') ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              For Employers
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleLogin} className="lp-btn lp-btn-ghost">
              Login
            </button>
            <button onClick={handleRegister} className="lp-btn lp-btn-primary">
              {registerText}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
