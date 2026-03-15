import { LandingPage } from './views/LandingPage';
import { AthletesPage } from './views/LandingPage/athletes';
import { EmployersPage } from './views/LandingPage/employers';
import { UniversitiesPage } from './views/LandingPage/universities';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RequireAuth } from './auth/RequireAuth';
import { RequireVerified } from './auth/RequireVerified';
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
import { Messages } from './views/Messages';
import { Conversation } from './views/Messages/Conversation';
import { NewConversation } from './views/Messages/NewConversation';
import { InstallPage } from './views/Install/InstallPage';
import { CareerOutcomes } from './views/Schools/CareerOutcomes';
import { UniversityCompanies } from './views/Schools/UniversityCompanies';
import { NILOversight } from './views/Schools/NILOversight';
import { OrgAdminTab } from './views/Profile/OrgAdminTab';
import { PrivacyPolicy } from './views/LandingPage/PrivacyPolicy';

type PageRoute = {
  path: string;
  element: JSX.Element;
  withSidebar: boolean;
  noAuth?: boolean;
  nilRoute?: boolean;
};

export const AppRoutes = () => {
  const routes: PageRoute[] = [
    { path: '/activity', element: <ActivityPage />, withSidebar: true },

    { path: '/messages', element: <Messages />, withSidebar: true },
    { path: '/messages/new', element: <NewConversation />, withSidebar: true },
    { path: '/messages/:userId', element: <Conversation />, withSidebar: true },

    { path: '/profile', element: <ProfileEdit />, withSidebar: true },
    { path: '/company/:id', element: <CompanyProfile />, withSidebar: true },
    { path: '/school/:id', element: <SchoolPage />, withSidebar: true },
    { path: '/school/dashboard', element: <SchoolDashboard />, withSidebar: true },
    { path: '/athlete/:id', element: <AthleteProfile />, withSidebar: true },
    { path: '/job/:id', element: <JobPage />, withSidebar: true },

    { path: '/jobs', element: <JobSearchPage />, withSidebar: true },
    { path: '/nil/search', element: <NILSearchPage />, withSidebar: true, nilRoute: true },
    { path: '/internships/search', element: <InternshipSearchPage />, withSidebar: true },
    { path: '/company/search', element: <CompanySearch />, withSidebar: true },
    { path: '/applications', element: <ApplicationSearch />, withSidebar: true },
    { path: '/interviews', element: <InterviewSearch />, withSidebar: true },

    // Company Pages
    { path: '/talent-pool', element: <TalentPool />, withSidebar: true },
    { path: '/company/jobs', element: <CompanyJobsPage />, withSidebar: true },
    { path: '/company/nil', element: <CompanyNILPage />, withSidebar: true, nilRoute: true },

    // School Pages
    { path: '/staff-directory', element: <StaffDirectory />, withSidebar: true },
    { path: '/current-students', element: <CurrentStudents />, withSidebar: true },
    { path: '/school/career-outcomes', element: <CareerOutcomes />, withSidebar: true },
    { path: '/school/companies', element: <UniversityCompanies />, withSidebar: true },
    { path: '/school/nil-oversight', element: <NILOversight />, withSidebar: true },

    // Org owner admin pages
    { path: '/school/users', element: <OrgAdminTab showAthletes />, withSidebar: true },
    { path: '/company/users', element: <OrgAdminTab />, withSidebar: true },

    // Admin Pages
    { path: '/admin/users', element: <AdminUsers />, withSidebar: true },
    { path: '/admin/schools', element: <AdminSchools />, withSidebar: true },
    { path: '/admin/companies', element: <AdminCompanies />, withSidebar: true },

    // Landing Pages
    { path: '/', element: <LandingPage />, withSidebar: false, noAuth: true },
    { path: '/athletes', element: <AthletesPage />, withSidebar: false, noAuth: true },
    { path: '/employers', element: <EmployersPage />, withSidebar: false, noAuth: true },
    { path: '/universities', element: <UniversitiesPage />, withSidebar: false, noAuth: true },
    { path: '/install', element: <InstallPage />, withSidebar: false, noAuth: true },
    { path: '/privacy', element: <PrivacyPolicy />, withSidebar: false, noAuth: true },
    { path: '*', element: <LandingPage />, withSidebar: false, noAuth: true },
  ];

  return (
    <Routes>
      {routes.map(({ path, element, withSidebar, noAuth, nilRoute }) => {
        let content = element;

        if (withSidebar) {
          content = <Sidebar> {element} </Sidebar>;
        }

        if (!noAuth) {
          content = (
            <RequireAuth fallbackPath={'/'}>
              <RequireVerified nilRoute={nilRoute}>{content}</RequireVerified>
            </RequireAuth>
          );
        }

        return <Route key={path} path={path} element={content} />;
      })}
    </Routes>
  );
};
