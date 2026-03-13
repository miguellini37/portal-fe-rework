import { BrowserRouter } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import * as Sentry from '@sentry/react';
import keycloak from './config/keycloak';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './Routes';
import Modal from 'react-modal';
import { ScrollToTop } from './components/ScrollToTop';

export const App = () => {
  Modal.setAppElement('#root');

  const keycloakInitOptions = {
    onLoad: 'check-sso' as const,
    checkLoginIframe: false,
  };

  return (
    <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <div style={{ height: '100vh' }}>
        <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </ReactKeycloakProvider>
      </div>
    </Sentry.ErrorBoundary>
  );
};
