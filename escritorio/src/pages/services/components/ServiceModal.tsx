import React, { useState } from "react";
import "./ServiceModal.css";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";

interface ServiceModalProps {
  onClose: () => void;
  onSave: (service: Service) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ onClose, onSave }) => {
  const [serviceData, setServiceData] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    restrictions: "",
    type: "room service",
    currency: "usd",
    price: 0,
    openHour: "08:00",
    closeHour: "18:00",
    available: false,
  });
  const handleSave = () => {
    onSave(serviceData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Servicio</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="text"
            placeholder="Nombre del servicio"
            handleInput={(value: string) => {
              setServiceData({ ...serviceData, name: value });
            }}
            resetMessage={() => {}}
            value={serviceData.name}
          />
          <textarea
            placeholder="Descripción del servicio (opcional)"
            onChange={(e) => {
              setServiceData({ ...serviceData, description: e.target.value });
            }}
            value={serviceData.description ?? ""}
          />
          <textarea
            placeholder="Restricciones (opcional)"
            onChange={(e) => {
              setServiceData({ ...serviceData, restrictions: e.target.value });
            }}
          >
            {serviceData.restrictions ?? ""}
          </textarea>
          <div>
            <label htmlFor="service-type">Tipo de servicio:</label>
            <select
              id="service-type"
              value={serviceData.type}
              onChange={(e) => {
                setServiceData({ ...serviceData, type: e.target.value });
              }}
            >
              <option value="room service">Room Service</option>
              <option value="cleaning">Cleaning</option>
              <option value="wellness">Wellness</option>
              <option value="transport">Transport</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="currency">Moneda:</label>
            <select
              id="currency"
              value={serviceData.currency}
              onChange={(e) =>
                setServiceData({ ...serviceData, currency: e.target.value })
              }
            >
              <option value="usd">USD</option>
              <option value="bs">BS</option>
            </select>
          </div>

          <Input
            type="number"
            placeholder="Precio"
            handleInput={(value: string) => {
              setServiceData({ ...serviceData, price: parseFloat(value) });
            }}
            resetMessage={() => {}}
            value={serviceData.price.toString()}
          />
          <div>
            <label>Hora de Apertura:</label>
            <Input
              type="time"
              handleInput={(value: string) =>
                setServiceData({ ...serviceData, openHour: value })
              }
              resetMessage={() => {}}
              value={serviceData.openHour}
            />
          </div>
          <div>
            <label>Hora de Cierre:</label>
            <Input
              type="time"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, closeHour: value });
              }}
              resetMessage={() => {}}
              value={serviceData.closeHour}
            />
          </div>
          <div>
            <label>
              ¿Disponible?
              <Input
                type="checkbox"
                handleInput={(value: boolean) => {
                  setServiceData({ ...serviceData, available: value });
                }}
                resetMessage={() => {}}
                value={serviceData.available}
              />
            </label>
          </div>
          <div className="modal-buttons">
            <Button handleClick={handleSave} disabled={false}>
              Guardar
            </Button>
            <Button handleClick={onClose} disabled={false}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
