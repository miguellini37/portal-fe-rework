import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { IUserData } from '../../auth/store';
import { login } from '../../api/login';
import './Form.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signIn = useSignIn<IUserData>();
  const signOut = useSignOut();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(email, password)
      .then((res) => {
        if (res.accessToken) {
          signIn({
            auth: {
              token: res.accessToken,
              type: 'Bearer',
            },
            refresh: res.refreshToken,
            userState: res.authState,
          });
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          toast.error('Invalid Credentials');
        } else {
          toast.error('Login Unsuccessful');
        }
        signOut();
      });
  };

  return (
    <>
      <ToastContainer />
      <section className="form-center-section">
        <div className="form-container">
          <form name="loginForm" className="form" onSubmit={handleLogin}>
            <div className="form-header">
              <h2>Login</h2>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="text"
                id="email"
                name="username"
                placeholder="jappleseed@yahoo.com"
                required
                autoComplete="username email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                name="password"
                placeholder="···"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <a style={{ textDecoration: 'none' }} href="/forgot-password">
              Forgot Password? (Doesn't work yet)
            </a>
            <div id="form-error">Invalid email and password combination</div>
            <button className="form-button" type="submit">
              Submit
            </button>
            <p>
              Don't have an account? <a href="/register/athlete">Register here</a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
