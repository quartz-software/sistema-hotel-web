import {
  faBoxes,
  faCalendarCheck,
  faDollarSign,
  faDoorClosed,
  faHome,
  faPlusCircle,
  faSignOut,
  faTags,
  faTasks,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Layout.css";
import useLogout from "./hooks/useLogout";
import useHasRole from "./hooks/useHasRole";

const Layout = () => {
  const isAdmin = useHasRole("admin");
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout(): Promise<void> {
    let loggedout = await useLogout();
    if (loggedout == true) navigate("/login");
  }
  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <div className="app_container">
      <nav className="navbar">
        <ul className="navbar__list">
          <li className={`navbar__item ${isActiveLink("/") ? "active" : ""}`}>
            <Link className="navbar__link" to="/">
              <i>
                <FontAwesomeIcon icon={faHome} />
              </i>
              <span>Inicio</span>
            </Link>
          </li>
          {isAdmin && (
            <li
              className={`navbar__item ${isActiveLink("/services") ? "active" : ""
                }`}
            >
              <Link className="navbar__link" to="/services">
                <i>
                  <FontAwesomeIcon icon={faTools} />
                </i>
                <span>Servicios</span>
              </Link>
            </li>
          )}
          <li
            className={`navbar__item ${isActiveLink("/tasks") ? "active" : ""}`}
          >
            <Link className="navbar__link" to="/tasks">
              <i>
                <FontAwesomeIcon icon={faTasks} />
              </i>
              <span>Tareas</span>
            </Link>
          </li>
          {isAdmin && (
            <li
              className={`navbar__item ${isActiveLink("/rooms") ? "active" : ""
                }`}
            >
              <Link className="navbar__link" to="/rooms">
                <i>
                  <FontAwesomeIcon icon={faDoorClosed} />
                </i>
                <span>Habitaciones</span>
              </Link>
            </li>
          )}
          {isAdmin && (
            <li
              className={`navbar__item ${isActiveLink("/promotions") ? "active" : ""
                }`}
            >
              <Link className="navbar__link" to="/promotions">
                <i>
                  <FontAwesomeIcon icon={faTags} />
                </i>
                <span>Promociones</span>
              </Link>
            </li>
          )}
          {isAdmin && (
            <li
              className={`navbar__item ${isActiveLink("/rates") ? "active" : ""
                }`}
            >
              <Link className="navbar__link" to="/rates">
                <i>
                  <FontAwesomeIcon icon={faDollarSign} />
                </i>
                <span>Tarifas</span>
              </Link>
            </li>
          )}
          <li
            className={`navbar__item ${isActiveLink("/addservices") ? "active" : ""
              }`}
          >
            <Link className="navbar__link" to="/addservices">
              <i>
                <FontAwesomeIcon icon={faPlusCircle} />
              </i>
              <span>Solicitudes</span>
            </Link>
          </li>
          <li
            className={`navbar__item ${isActiveLink("/bookings") ? "active" : ""
              }`}
          >
            <Link className="navbar__link" to="/bookings">
              <i>
                <FontAwesomeIcon icon={faCalendarCheck} />
              </i>
              <span>Reservaciones</span>
            </Link>
          </li>
          {isAdmin && (
            <li
              className={`navbar__item ${isActiveLink("/stock") ? "active" : ""
                }`}
            >
              <Link className="navbar__link" to="/stock">
                <i>
                  <FontAwesomeIcon icon={faBoxes} />
                </i>
                <span>Inventario</span>
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar__list">
          <li className="navbar__item">
            <button
              className="navbar__link navbar__link--danger"
              onClick={handleLogout}
            >
              <i>
                <FontAwesomeIcon icon={faSignOut} />
              </i>
              <span>Salir</span>
            </button>
          </li>
          <li className="navbar__item">
            <Link className="navbar__link" to="/rooms">
              habitaciones Admin
            </Link>
          </li>
        </ul>
      </nav>
      <div id="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
