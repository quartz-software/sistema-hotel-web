import { useNavigate } from "react-router-dom";
import "./Error.css";

const Forbbiden = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-code">403</div>
        <div className="error-message">Acción no permitida</div>
        <div className="error-description">
          No tienes permisos para acceder a esta página.
        </div>
        <a
          href="/"
          className="error-link"
          onClick={(e) => {
            e.preventDefault();
            handleRedirect();
          }}
        >
          Volver a la página de inicio
        </a>
      </div>
    </div>
  );
};

export default Forbbiden;
