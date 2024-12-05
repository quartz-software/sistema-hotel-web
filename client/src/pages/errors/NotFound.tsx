import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-code">404</div>
        <div className="error-message">Página no encontrada</div>
        <div className="error-description">
          Lo sentimos, no podemos encontrar la página que estás buscando.
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

export default NotFound;
