import { Homepage } from './views/Homepage';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RequireAuth } from './auth/RequireAuth';
import { JSX } from 'react';
import { ProfileEdit } from './views/Profile';
import { SchoolPage } from './views/Schools/SchoolPage';
import { SchoolDashboard } from './views/Schools/SchoolDashboard';
import 'react-toastify/dist/ReactToastify.css';
import { JobSearchPage } from './views/Jobs/JobSearchPage';
import { CompanySearch } from './views/Companies/CompanyTable';
import { InternshipSearchPage } from './views/Jobs/InternshipSearchPage';
import { CompanyProfile } from './views/Companies/Profile';
import { TalentPool } from './views/Companies/TalentPool';
import { CompanyJobsPage } from './views/Jobs/CompanyJobsPage';
import { ApplicationSearch } from './views/Applications';
import { JobPage } from './views/Jobs/JobPage';
import { AthleteProfile } from './views/Profile/Athlete';
import { InterviewSearch } from './views/Interviews';
import { ActivityPage } from './views/Activity/ActivityPage';
import { StaffDirectory } from './views/Schools/StaffDirectory';
import { CurrentStudents } from './views/Schools/CurrentStudents';
import { NILSearchPage } from './views/Jobs/NILSearchPage';
import { CompanyNILPage } from './views/Jobs/CompanyNILPage';
import { AdminUsers } from './views/Admin/AdminUsers';
import { AdminSchools } from './views/Admin/AdminSchools';
import { AdminCompanies } from './views/Admin/AdminCompanies';

type PageRoute = {
  path: string;
  element: JSX.Element;
  withSidebar: boolean;
  noAuth?: boolean;
};

export const AppRoutes = () => {
  const routes: PageRoute[] = [
    { path: '/activity', element: <ActivityPage />, withSidebar: true },

    { path: '/profile', element: <ProfileEdit />, withSidebar: true },
    { path: '/company/:id', element: <CompanyProfile />, withSidebar: true },
    { path: '/school/:id', element: <SchoolPage />, withSidebar: true },
    { path: '/school/dashboard', element: <SchoolDashboard />, withSidebar: true },
    { path: '/athlete/:id', element: <AthleteProfile />, withSidebar: true },
    { path: '/job/:id', element: <JobPage />, withSidebar: true },

    { path: '/jobs', element: <JobSearchPage />, withSidebar: true },
    { path: '/nil/search', element: <NILSearchPage />, withSidebar: true },
    { path: '/internships/search', element: <InternshipSearchPage />, withSidebar: true },
    { path: '/company/search', element: <CompanySearch />, withSidebar: true },
    { path: '/applications', element: <ApplicationSearch />, withSidebar: true },
    { path: '/interviews', element: <InterviewSearch />, withSidebar: true },

    // Company Pages
    { path: '/talent-pool', element: <TalentPool />, withSidebar: true },
    { path: '/company/jobs', element: <CompanyJobsPage />, withSidebar: true },
    { path: '/company/nil', element: <CompanyNILPage />, withSidebar: true },

    // School Pages
    { path: '/staff-directory', element: <StaffDirectory />, withSidebar: true },
    { path: '/current-students', element: <CurrentStudents />, withSidebar: true },

    // Admin Pages
    { path: '/admin/users', element: <AdminUsers />, withSidebar: true },
    { path: '/admin/schools', element: <AdminSchools />, withSidebar: true },
    { path: '/admin/companies', element: <AdminCompanies />, withSidebar: true },

    { path: '/', element: <Homepage />, withSidebar: true, noAuth: true },
    { path: '*', element: <Homepage />, withSidebar: true, noAuth: true },
  ];

  return (
    <Routes>
      {routes.map(({ path, element, withSidebar, noAuth }) => {
        let content = element;

        if (withSidebar) {
          content = <Sidebar> {element} </Sidebar>;
        }

        if (!noAuth) {
          content = <RequireAuth fallbackPath={'/'}>{content}</RequireAuth>;
        }

        return <Route key={path} path={path} element={content} />;
      })}
    </Routes>
  );
};
