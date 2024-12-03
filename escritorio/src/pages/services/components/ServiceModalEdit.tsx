import React, { useState, useEffect } from "react";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";

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
  console.log(service);
  useEffect(() => {
    setServiceData(service);
  }, [service]);

  const handleSave = () => {
    onSave(serviceData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Servicio</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Nombre del servicio"
            handleInput={(value: string) => {
              setServiceData({ ...serviceData, name: value });
            }}
            value={serviceData.name}
            resetMessage={() => {}}
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
