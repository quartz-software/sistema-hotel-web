import { Link, Outlet } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Llamarada from "./assets/LLamarada.svg";
const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar__menu">
          <FontAwesomeIcon icon={faBars} />
        </div>

        <Link className="navbar__link navbar__logo" to="/">
          <img src={Llamarada}></img>
        </Link>

        <ul className="navbar__list">
          <li className="navbar__item">
            <Link className="navbar__link" to="/login">
              Ingresar
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link btn" to="/bookings">
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
