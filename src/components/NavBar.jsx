function NavBar() {

    return (
      <>
        <div className="navbar bg-base-100 border-b mb-5">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl" href="/">FightCard</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <a href="/licences">Licences</a>
                </li>
                <li>
                    <a href="/cartes">Cartes</a>
                </li>
            </ul>
          </div>
        </div>
      </>
    );
}

export default NavBar