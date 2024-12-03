import React from "react";
import Button from "../../common/components/Button";
import '../components/ServiceList.css';

interface ServiceListProps {
  services: Service[];
  onDelete: (id: number) => void;
  onEdit: (service: Service) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onDelete, onEdit }) => {
  return (
    <div className="service-list">
      <table className="service-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Horario</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.type}</td>
              <td>{service.price} {service.currency.toUpperCase()}</td>
              <td>{service.openHour} - {service.closeHour}</td>
              <td className={`service-availability ${service.available ? 'available' : 'unavailable'}`}>
              {service.available ? "Disponible" : "No Disponible"}
              </td>
              <td className="service-actions">
                <Button handleClick={() => onEdit(service)} disabled={false}>
                  Editar
                </Button>
                <Button handleClick={() => onDelete(service.id)} disabled={false}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
