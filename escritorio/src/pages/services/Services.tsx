import React, { useState } from "react";
import "./components/Services.css";
import ServiceModal from "./components/ServiceModal";
import ServiceList from "./components/ServiceList";

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

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddService = (service: Omit<Service, "id">) => {
    const newService: Service = { ...service, id: Date.now() };
    setServices([...services, newService]);
    setIsModalOpen(false);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleEditService = (updatedService: Service) => {
    setServices(
      services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  return (
    <div className="services-container">
      <h1>Gestión de Servicios</h1>
      <button
        className="add-service-button"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Servicio
      </button>
      <ServiceList
        services={services}
        onDelete={handleDeleteService}
        onEdit={handleEditService}
      />
      {isModalOpen && (
        <ServiceModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddService}
        />
      )}
    </div>
  );
};

export default Services;
