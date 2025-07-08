import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData, USER_PERMISSIONS } from '../api/store';

export const Sidebar = () => {
  const isLoggedIn = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const user = useAuthUser<IUserData>();
  const permission = user?.permission;

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

            {(!permission || permission == USER_PERMISSIONS.ATHLETE) && (
              <div>
                <li className="mb-4">
                  <DisabledNavLink to="/dashboard">Dashboard</DisabledNavLink>
                </li>
                <li className="mb-4">
                  <DisabledNavLink to="/jobs">Jobs</DisabledNavLink>
                </li>
              </div>
            )}
            {permission == USER_PERMISSIONS.SCHOOL && (
              <div>
                <li className="mb-4">
                  <DisabledNavLink to={`/school/${user?.schoolRef?.id}`}>
                    School Profile
                  </DisabledNavLink>
                </li>
                <li className="mb-4">
                  <DisabledNavLink to="/messages">Messages</DisabledNavLink>
                </li>
              </div>
            )}

            {permission == USER_PERMISSIONS.COMPANY && (
              <div>
                <li className="mb-4">
                  <DisabledNavLink to={`/company/${user?.companyRef?.id}`}>
                    Company Profile
                  </DisabledNavLink>
                </li>
                <li className="mb-4">
                  <DisabledNavLink to="/messages">Messages</DisabledNavLink>
                </li>
              </div>
            )}
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
              <NavLink to="/register/athlete" className="text-blue-400 hover:text-blue-300">
                Register
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li className="mb-4">
              <NavLink to="/profile" className="text-blue-400 hover:text-blue-300">
                Profile
              </NavLink>
            </li>

            <li className="mb-4">
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 focus:outline-none"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
