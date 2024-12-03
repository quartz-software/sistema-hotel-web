import React, { useState } from "react";
import "./ServiceModal.css";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import FormField from "../../common/components/FormField";

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
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (
          e.target instanceof HTMLDivElement &&
          e.target.classList.contains("modal-overlay")
        ) {
          onClose();
        }
      }}
    >
      <div className="modal-content">
        <h2>Agregar Servicio</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormField errorMessage="" label="Nombre:">
            <Input
              type="text"
              placeholder="Nombre del servicio"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, name: value });
              }}
              resetMessage={() => {}}
              value={serviceData.name}
            />
          </FormField>
          <FormField errorMessage="" label="Descripcion (opcional):">
            <textarea
              placeholder="Descripción "
              onChange={(e) => {
                setServiceData({ ...serviceData, description: e.target.value });
              }}
              value={serviceData.description ?? ""}
            ></textarea>
          </FormField>
          <FormField errorMessage="" label="Restricciones (opcional):">
            <textarea
              placeholder="Restricciones"
              onChange={(e) => {
                setServiceData({
                  ...serviceData,
                  restrictions: e.target.value,
                });
              }}
              value={serviceData.restrictions ?? ""}
            ></textarea>
          </FormField>
          <div>
            <label htmlFor="service-type">Tipo de servicio:</label>
            <select
              id="service-type"
              value={serviceData.type}
              onChange={(e) => {
                setServiceData({ ...serviceData, type: e.target.value });
              }}
            >
              <option value="room service">Servicio a la Habitacion</option>
              <option value="cleaning">Limpieza</option>
              <option value="wellness">Bienestar</option>
              <option value="transport">Transporte</option>
              <option value="other">Otros</option>
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
          <FormField errorMessage="" label="Hora de Apertura">
            <Input
              type="time"
              handleInput={(value: string) =>
                setServiceData({ ...serviceData, openHour: value })
              }
              resetMessage={() => {}}
              value={serviceData.openHour}
            />
          </FormField>
          <FormField label="Hora de Cierre:" errorMessage="">
            <Input
              type="time"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, closeHour: value });
              }}
              resetMessage={() => {}}
              value={serviceData.closeHour}
            />
          </FormField>
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
