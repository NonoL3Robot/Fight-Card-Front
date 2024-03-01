import { httpClient } from '../services/http.client.js';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            httpClient.api
              .post(
                'auth/register',
                Object.fromEntries(new FormData(e.target).entries()),
              )
              .then(() => navigate('/login'));
          }}
        >
          <h5>Register to our platform</h5>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="JohnDoe"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="•••••••••"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
