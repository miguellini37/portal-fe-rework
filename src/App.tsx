import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import { authStore, IUserData } from './auth/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './Routes';

export const App = () => {
  // useEffect(() => {
  //   toast('hi');
  // }, []);

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
        <AuthProvider<IUserData> store={authStore}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
};
