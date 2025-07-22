import { Homepage } from './views/Homepage';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './views/Dashboard';
import { SidebarLayout } from './components/SidebarLayout';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import { JSX } from 'react';
import { LoginPage } from './views/Login/Login';
import { ProfileEdit } from './views/Profile';
import { CompanyPage } from './views/Companies/CompanyPage';
import { SchoolPage } from './views/SchoolPage';
import 'react-toastify/dist/ReactToastify.css';
import { JobSearchPage } from './views/Jobs/JobSearchPage';
import { Register } from './views/Login/Register';
import { CompanySearch } from './views/Companies/CompanyTable';

type PageRoute = {
  path: string;
  element: JSX.Element;
  withSidebar: boolean;
  noAuth?: boolean;
};

export const AppRoutes = () => {
  const routes: PageRoute[] = [
    { path: '/login', element: <LoginPage />, withSidebar: false, noAuth: true },
    { path: '/register', element: <Register />, withSidebar: false, noAuth: true },

    { path: '/profile', element: <ProfileEdit />, withSidebar: true },
    { path: '/company/:id', element: <CompanyPage />, withSidebar: true },
    { path: '/school/:id', element: <SchoolPage />, withSidebar: true },

    { path: '/', element: <Homepage />, withSidebar: true, noAuth: true },
    { path: '/dashboard', element: <Dashboard />, withSidebar: true },

    { path: '/jobs/search', element: <JobSearchPage />, withSidebar: true },
    { path: '/company/search', element: <CompanySearch />, withSidebar: true },

    { path: '*', element: <Homepage />, withSidebar: true, noAuth: true },
  ];

  return (
    <Routes>
      {routes.map(({ path, element, withSidebar, noAuth }) => {
        let content = element;

        if (withSidebar) {
          content = <SidebarLayout> {element} </SidebarLayout>;
        }

        if (!noAuth) {
          content = <RequireAuth fallbackPath={'/login'}>{content}</RequireAuth>;
        }

        return <Route key={path} path={path} element={content} />;
      })}
    </Routes>
  );
};
