import { BrowserRouter } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './config/keycloak';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './Routes';
import Modal from 'react-modal';

export const App = () => {
  // Set the app element for accessibility (only needs to be set once)
  Modal.setAppElement('#root');

  // Keycloak initialization config
  const keycloakInitOptions = {
    onLoad: 'check-sso',
    checkLoginIframe: false,
    redirectUri: window.location.origin + '/profile',
  };

  return (
    <>
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
            <AppRoutes />
          </BrowserRouter>
        </ReactKeycloakProvider>
      </div>
    </>
  );
};
