import { Homepage } from './views/Homepage';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Dashboard } from './views/Dashboard';
import { Alumni } from './views/Alumni';
import { Jobs } from './views/Jobs';
import { Internships } from './views/Internships';
import { NIL } from './views/NilDeals';
import { Analytics } from './views/Analytics';
import { CareerDevelopment } from './views/CareerDevelopment';
import { Messages } from './views/Messages';
import { SidebarLayout } from './components/SidebarLayout';
import AuthProvider from 'react-auth-kit';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import { JSX } from 'react';
import { authStore, IUserData } from './api/store';
import { LoginPage } from './views/Login/Login';
import { AthleteRegister } from './views/Login/AthleteRegister';
import { ProfileEdit } from './views/Profile';
import { ToastContainer } from 'react-toastify';
import { CompanyRegister } from './views/Login/CompanyRegister';
import { SchoolRegister } from './views/Login/SchoolRegister';

type PageRoute = {
  path: string;
  element: JSX.Element;
  withSidebar: boolean;
  noAuth?: boolean;
};

export const App = () => {
  const routes: PageRoute[] = [
    { path: '/login', element: <LoginPage />, withSidebar: false, noAuth: true },
    { path: '/register/athlete', element: <AthleteRegister />, withSidebar: false, noAuth: true },
    { path: '/register/company', element: <CompanyRegister />, withSidebar: false, noAuth: true },
    { path: '/register/school', element: <SchoolRegister />, withSidebar: false, noAuth: true },
    { path: '/', element: <Homepage />, withSidebar: true, noAuth: true },
    { path: '/dashboard', element: <Dashboard />, withSidebar: true },
    { path: '/alumni', element: <Alumni />, withSidebar: true },
    { path: '/jobs', element: <Jobs />, withSidebar: true },
    { path: '/internships', element: <Internships />, withSidebar: true },
    { path: '/nil', element: <NIL />, withSidebar: true },
    { path: '/analytics', element: <Analytics />, withSidebar: true },
    { path: '/careerDevelopment', element: <CareerDevelopment />, withSidebar: true },
    { path: '/messages', element: <Messages />, withSidebar: true },
    { path: '/profile', element: <ProfileEdit />, withSidebar: true },
    { path: '*', element: <Homepage />, withSidebar: true, noAuth: true },
  ];

  return (
    <div style={{ height: '100vh' }}>
      <AuthProvider<IUserData> store={authStore}>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
          />
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
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
