import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { IUserData, USER_PERMISSIONS } from '../../auth/store';
import {
  Home,
  Briefcase,
  FileText,
  User,
  LogOut,
  LogIn,
  UserPlus,
  School,
  Building,
  Building2,
  Users,
  Menu,
  CalendarClock,
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';
import { ActivityBell } from '../../views/Activity/ActivityBell';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const isLoggedIn = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const user = useAuthUser<IUserData>();
  const permission = user?.permission;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
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
      <div className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div>
          <div className="sidebar-header">
            <h1 className="portal-title">
              <img src="/App Icon192.png" alt="Portal Icon" className="portal-icon" />
              {!isCollapsed && <span>Portal</span>}
            </h1>
            {!isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="collapse-button"
                aria-label="Collapse sidebar"
                style={{
                  width: '50px',
                  height: '40px',
                  padding: '0',
                  margin: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Menu />
              </button>
            )}
          </div>
          {isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="collapse-button-collapsed"
              aria-label="Expand sidebar"
            >
              <Menu />
            </button>
          )}
          <nav>
            <ul>
              {!permission && (
                <li className="mb-4">
                  <NavLink to="/" title="Home">
                    <Home /> {!isCollapsed && <span>Home</span>}
                  </NavLink>
                </li>
              )}
              {permission === USER_PERMISSIONS.ATHLETE && (
                <>
                  <li className="mb-4">
                    <DisabledNavLink to="/jobs/" title="Jobs">
                      <Briefcase /> {!isCollapsed && <span>Jobs</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/internships/search" title="Internships">
                      <School /> {!isCollapsed && <span>Internships</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/company/search" title="Company Search">
                      <Building2 /> {!isCollapsed && <span>Company Search</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/applications" title="Applications">
                      <FileText /> {!isCollapsed && <span>Applications</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/interviews" title="Interviews">
                      <CalendarClock /> {!isCollapsed && <span>Interviews</span>}
                    </DisabledNavLink>
                  </li>
                </>
              )}
              {permission === USER_PERMISSIONS.SCHOOL && (
                <>
                  <li className="mb-4">
                    <DisabledNavLink to={`/school/${user?.schoolRefId}`} title="School Profile">
                      <Building /> {!isCollapsed && <span>School Profile</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/jobs" title="Jobs">
                      <Briefcase /> {!isCollapsed && <span>Jobs</span>}
                    </DisabledNavLink>
                  </li>
                </>
              )}
              {permission === USER_PERMISSIONS.COMPANY && (
                <>
                  <li className="mb-4">
                    <DisabledNavLink to={`/company/${user?.companyRefId}`} title="Company Profile">
                      <Building /> {!isCollapsed && <span>Company Profile</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/talent-pool" title="Talent Pool">
                      <Users /> {!isCollapsed && <span>Talent Pool</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/company/jobs" title="Jobs">
                      <Briefcase /> {!isCollapsed && <span>Jobs</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/applications" title="Applications">
                      <FileText /> {!isCollapsed && <span>Applications</span>}
                    </DisabledNavLink>
                  </li>
                  <li className="mb-4">
                    <DisabledNavLink to="/interviews" title="Interviews">
                      <CalendarClock /> {!isCollapsed && <span>Interviews</span>}
                    </DisabledNavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div>
          <div className="mb-4">
            <ul>
              {!isLoggedIn ? (
                <>
                  <li className="mb-4">
                    <NavLink
                      to="/login"
                      className="text-blue-400 hover:text-blue-300"
                      title="Login"
                    >
                      <LogIn /> {!isCollapsed && <span>Login</span>}
                    </NavLink>
                  </li>
                  <li className="mb-4">
                    <NavLink
                      to="/register"
                      className="text-blue-400 hover:text-blue-300"
                      title="Register"
                    >
                      <UserPlus /> {!isCollapsed && <span>Register</span>}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-4">
                   <li className="mb-4">
                    <ActivityBell
                      isCollapsed={isCollapsed}
                      className="text-blue-400 hover:text-blue-300 focus:outline-none"
                    />
                  </li>
                    <NavLink
                      to="/profile"
                      className="text-blue-400 hover:text-blue-300"
                      title="Profile"
                    >
                      <User /> {!isCollapsed && <span>Profile</span>}
                    </NavLink>
                  </li>
                  <li className="mb-4">
                    <button
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 focus:outline-none"
                      title="Logout"
                    >
                      <LogOut /> {!isCollapsed && <span>Logout</span>}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      <main className={`sidebar-main ${isCollapsed ? 'sidebar-main-collapsed' : ''}`}>
        {children}
      </main>
    </div>
  );
};
