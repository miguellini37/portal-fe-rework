import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

export const Sidebar = () => {
  const isLoggedIn = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const DisabledNavLink: React.FC<NavLinkProps> = ({ className = '', children, ...props }) => {
    const disabledClass = 'opacity-50 cursor-not-allowed pointer-events-none';

    return (
      <NavLink
        {...props}
        className={`${className} ${isLoggedIn ? '' : disabledClass}`}
        onClick={isLoggedIn ? undefined : (e) => e.preventDefault()}
      >
        {children}
      </NavLink>
    );
  };

  return (
    <div className="sidebar flex flex-col h-full justify-between" style={{ padding: '30px' }}>
      <div>
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Portal</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <NavLink to="/">Home</NavLink>
            </li>

            <li className="mb-4">
              <DisabledNavLink to="/dashboard">Dashboard</DisabledNavLink>
            </li>
            <li className="mb-4">
              <DisabledNavLink to="/alumni">Alumni</DisabledNavLink>
            </li>
            <li className="mb-4">
              <DisabledNavLink to="/jobs">Jobs</DisabledNavLink>
            </li>
            <li className="mb-4">
              <DisabledNavLink to="/internships">Internships</DisabledNavLink>
            </li>
            <li className="mb-4">
              <DisabledNavLink to="/nil">NIL Deals</DisabledNavLink>
            </li>
            <li className="mb-4">
              <DisabledNavLink to="/analytics">Analytics</DisabledNavLink>
            </li>
            <li className="mb-4">
              <DisabledNavLink to="/careerDevelopment">Career Development</DisabledNavLink>
            </li>
            <li className="mb-4">
              <DisabledNavLink to="/messages">Messages</DisabledNavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom auth controls */}
      <div className="mb-4">
        {!isLoggedIn ? (
          <ul>
            <li className="mb-4">
              <NavLink to="/login" className="text-blue-400 hover:text-blue-300">
                Login
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink to="/register" className="text-blue-400 hover:text-blue-300">
                Register
              </NavLink>
            </li>
          </ul>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 focus:outline-none"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
