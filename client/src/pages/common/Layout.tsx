import { Link, Outlet } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Layout.css";
import viteLogo from "/vite.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Layout = () => {
  return (
    <>
      <nav className="navbar">

        <div className="navbar__menu">
          MENU  <FontAwesomeIcon icon={faBars} />
        </div>

        <Link className="navbar__link navbar__logo" to="/">
          <img src={viteLogo}></img>
        </Link>

        <ul className="navbar__list">
          <li className="navbar__item">
            <Link className="navbar__link" to="/login">
              Log in
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link btn--reserva" to="/signup">
              Reserva ahora
            </Link>
          </li>
        </ul>

      </nav>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
