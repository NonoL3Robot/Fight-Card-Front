import { httpClient } from '../services/http.client.js';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            httpClient
              .authenticate(
                'auth/authenticate',
                Object.fromEntries(new FormData(e.target).entries()),
              )
              .then(() => navigate('/'));
          }}
        >
          <h5>Sign in to our platform</h5>
          <div>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Your password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  name="remember"
                  onChange={(e) => (e.target.value = e.target.checked)}
                />
              </div>
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#">Lost Password?</a>
          </div>
          <button type="submit">Login to your account</button>
          <div>
            Not registered? <Link to="/register">Create account</Link>
          </div>
        </form>
      </div>
    </>
  );
};
