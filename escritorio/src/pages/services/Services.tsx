import React, { useEffect, useState } from "react";
import "./components/Services.css";
import ServiceModal from "./components/ServiceModal";
import ServiceList from "./components/ServiceList";

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddService = (service: Service) => {
    const newService: Service = { ...service, id: Date.now() };
    fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data: Service) => {
        newService.id = data.id;
        setServices([...services, newService]);
        setIsModalOpen(false);
      });
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

  useEffect(() => {
    fetch("/api/services")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data: Service[]) => {
        let result: Service[] = [];
        data.forEach((i) => {
          result.push({
            id: i.id,
            name: i.name,
            description: i.description,
            restrictions: i.restrictions,
            type: i.type,
            currency: i.currency,
            price: i.price,
            openHour: i.openHour,
            closeHour: i.closeHour,
            available: i.available,
          });
        });

        setServices(result);
      });
  }, []);

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
