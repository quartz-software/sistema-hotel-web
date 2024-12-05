import React, { useEffect, useState } from "react";
import './components/AditionalService.css';  
const AditionalServices: React.FC = () => {
  const [services, setServices] = useState<AdditionalService[]>([]);

  useEffect(() => {
    fetch("/api/additional-services")
      .then((response) => {
        if (!response.ok) {
          throw new Error("error consulta");
        }
        return response.json();  
      })
      .then((data) => {
        setServices(data);  
      })
      .catch((error) => {
        console.error("Error:", error);  
      });
  }, []);  

  return (
    <div className="services-container">
      <h1>Servicios Adicionales</h1>
      <table className="services-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{new Date(service.date).toLocaleString()}</td>
              <td>{service.status}</td>
              <td>{service.description || "Sin descripción"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AditionalServices;
