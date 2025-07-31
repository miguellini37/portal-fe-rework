import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData, USER_PERMISSIONS } from '../../auth/store';
import {
  Home,
  Briefcase,
  Search,
  User,
  LogOut,
  LogIn,
  UserPlus,
  GraduationCap,
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
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
        className={({ isActive }) =>
          `${className} ${isLoggedIn ? '' : disabledClass} ${isActive ? 'active' : ''}`
        }
        onClick={isLoggedIn ? undefined : (e) => e.preventDefault()}
      >
        {children}
      </NavLink>
    );
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div>
          <h1 className="portal-title">
            <img src="/App Icon192.png" alt="Portal Icon" className="portal-icon" />
            Portal
          </h1>
          <nav>
            <ul>
              {!permission && (
                <li className="mb-4">
                  <NavLink to="/">
                    <Home /> Home
                  </NavLink>
                </li>
              )}
              {permission === USER_PERMISSIONS.ATHLETE && (
                <>
                  <li className="mb-4">
                    <DisabledNavLink to="/dashboard">
                      <Home /> Dashboard
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/jobs/search">
                      <Briefcase /> Jobs
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/internships/search">
                      <GraduationCap /> Internships
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/company/search">
                      <Search /> Company Search
                    </DisabledNavLink>
                  </li>
                </>
              )}
              {permission === USER_PERMISSIONS.SCHOOL && (
                <>
                  <li className="mb-4">
                    <DisabledNavLink to={`/school/${user?.schoolRef?.id}`}>
                      School Profile
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/messages">Messages</DisabledNavLink>
                  </li>
                </>
              )}
              {permission === USER_PERMISSIONS.COMPANY && (
                <>
                  <li className="mb-4">
                    <DisabledNavLink to={`/company/${user?.companyRef?.id}`}>
                      Company Profile
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/messages">Messages</DisabledNavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        <div className="mb-4">
          {!isLoggedIn ? (
            <ul>
              <li className="mb-4">
                <NavLink to="/login" className="text-blue-400 hover:text-blue-300">
                  <LogIn /> Login
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink to="/register" className="text-blue-400 hover:text-blue-300">
                  <UserPlus /> Register
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="mb-4">
                <NavLink to="/profile" className="text-blue-400 hover:text-blue-300">
                  <User /> Profile
                </NavLink>
              </li>
              <li className="mb-4">
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 focus:outline-none"
                >
                  <LogOut /> Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <main className="sidebar-main">{children}</main>
    </div>
  );
};
