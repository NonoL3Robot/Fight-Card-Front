import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { httpClient } from './services/http.client.js';
import { effect } from '@preact/signals';

export const NavBar = () => {
  const [logged, setLogged] = useState(httpClient.logged.value);
  const navigate = useNavigate();

  useEffect(() => {
    effect(() => setLogged(httpClient.logged.value));
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 border-b mb-5">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl" href="/">
            FightCard
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/licences">Licences</Link>
            </li>
            <li>
              <Link to="/cartes">Cartes</Link>
            </li>
            {logged ? (
              <button
                onClick={() => {
                  httpClient.logout();
                  navigate('/login');
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
