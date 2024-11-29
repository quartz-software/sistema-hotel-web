import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link className="navbar__link" to="/">
              Home
            </Link>
          </li>

          <li className="navbar__item">
            <Link className="navbar__link" to="/services">
              Services
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="/login">
              Log in
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="/signup">
              Sign up
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="/habitaciones">
              habitaciones
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="admin/habitaciones">
              habitaciones Admin
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="room_rate">
              Tarifas
            </Link>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="admin/habitaciones">
              Promociones
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
