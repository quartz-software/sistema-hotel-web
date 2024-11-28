import Button from "../../common/components/Button";
interface Service {
  id: number;
  name: string;
  description?: string;
  restrictions?: string;
  type: string;
  currency: string;
  price: number;
  openHour: string;
  closeHour: string;
  available: boolean;
}
interface ServiceListProps {
  services: Service[];
  onDelete: (id: number) => void;
  onEdit: (updatedService: Service) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onDelete, onEdit }) => {
  return (
    <div className="service-list">
      {services.map((service) => (
        <div key={service.id} className="service-item">
          <div className="service-details">
            <strong>{service.name}</strong>
            <p>{service.description || "Sin descripción"}</p>
            <p>Restricciones: {service.restrictions || "Ninguna"}</p>
            <p>Tipo: {service.type}</p>
            <p>
              Precio: {service.price} {service.currency.toUpperCase()}
            </p>
            <p>
              Horario: {service.openHour} - {service.closeHour}
            </p>
            <p>{service.available ? "Disponible" : "No Disponible"}</p>
          </div>
          <div className="service-actions">
            <Button handleClick={() => onEdit(service)} disabled={false}>
              Editar
            </Button>
            <Button handleClick={() => onDelete(service.id)} disabled={false}>
              Eliminar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
