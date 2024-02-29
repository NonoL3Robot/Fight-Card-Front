import { Link } from 'react-router-dom';

export const NavBar = () => {
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
          </ul>
        </div>
      </div>
    </>
  );
};
