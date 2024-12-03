import React, { useState, useEffect } from "react";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";
import FormField from "../../common/components/FormField";

interface ServiceModalEditProps {
  service: Service;
  onClose: () => void;
  onSave: (service: Service) => void;
}

const ServiceModalEdit: React.FC<ServiceModalEditProps> = ({
  service,
  onClose,
  onSave,
}) => {
  const [serviceData, setServiceData] = useState<Service>(service);
  useEffect(() => {
    setServiceData(service);
  }, [service]);

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
        <h2>Editar Servicio</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormField errorMessage="" label="Nombre:">
            <Input
              type="text"
              placeholder="Nombre del servicio"
              handleInput={(value: string) => {
                setServiceData({ ...serviceData, name: value });
              }}
              value={serviceData.name}
              resetMessage={() => {}}
            />
          </FormField>
          <FormField errorMessage="" label="Descripcion (opcional):">
            <textarea
              placeholder="Descripción"
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
            value={serviceData.price.toString()}
            resetMessage={() => {}}
          />
          <div>
            <label>Hora de Apertura:</label>
            <Input
              type="time"
              handleInput={(value: string) =>
                setServiceData({ ...serviceData, openHour: value })
              }
              value={serviceData.openHour}
              resetMessage={() => {}}
            />
          </div>
          <div>
            <label>Hora de Cierre:</label>
            <Input
              type="time"
              handleInput={(value: string) => {
                console.log(value);
                setServiceData({ ...serviceData, closeHour: value });
              }}
              value={serviceData.closeHour}
              resetMessage={() => {}}
            />
          </div>
          <div>
            <label>
              ¿Disponible?
              <input
                type="checkbox"
                checked={serviceData.available}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    available: e.target.checked,
                  })
                }
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

export default ServiceModalEdit;
