import React, { useState } from "react";
import "./ServiceModal.css";
import Button from "../../common/components/Button";
import Input from "../../common/components/Input";

interface ServiceModalProps {
  onClose: () => void;
  onSave: (service: {
    name: string;
    description?: string;
    restrictions?: string;
    type: string;
    currency: string;
    price: number;
    openHour: string;
    closeHour: string;
    available: boolean;
  }) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [type, setType] = useState("room service");
  const [currency, setCurrency] = useState("usd");
  const [price, setPrice] = useState("");
  const [openHour, setOpenHour] = useState("08:00");
  const [closeHour, setCloseHour] = useState("18:00");
  const [available, setAvailable] = useState(false);

  const handleSave = () => {
    if (!name || !type || !currency || !price || !openHour || !closeHour) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    onSave({
      name,
      description,
      restrictions,
      type,
      currency,
      price: parseFloat(price),
      openHour,
      closeHour,
      available,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Servicio</h2>
        <form>
          <Input
            type="text"
            placeholder="Nombre del servicio"
            handleInput={(value: string) => setName(value)}
            resetMessage={() => {}}
            autocomplete="email"
          />
          <Input
            type="textarea"
            placeholder="Descripción del servicio (opcional)"
            handleInput={(value: string) => setDescription(value)}
            resetMessage={() => {}}
            autocomplete="email"
          />
          <Input
            type="textarea"
            placeholder="Restricciones (opcional)"
            handleInput={(value: string) => setRestrictions(value)}
            resetMessage={() => {}}
            autocomplete="email"
          />
          <div>
  <label htmlFor="service-type">Tipo de servicio:</label>
  <select
    id="service-type"
    value={type}
    onChange={(e) => setType(e.target.value)}
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
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
  >
    <option value="usd">USD</option>
    <option value="bs">BS</option>
  </select>
</div>

          <Input
            type="number"
            placeholder="Precio"
            handleInput={(value: string) => setPrice(value)}
            resetMessage={() => {}}
            autocomplete="email"
          />
          <div>
            <label>Hora de Apertura:</label>
            <Input
              type="time"
              placeholder=""
              handleInput={(value: string) => setOpenHour(value)}
              resetMessage={() => {}}
              autocomplete="email"
            />
          </div>
          <div>
            <label>Hora de Cierre:</label>
            <Input
              type="time"
              placeholder=""
              handleInput={(value: string) => setCloseHour(value)}
              resetMessage={() => {}}
              autocomplete="email"
            />
          </div>

          {/* Disponibilidad */}
          <div>
            <label>
              ¿Disponible?
              <Input
                type="checkbox"
                placeholder=""
                handleInput={(value: boolean) => setAvailable(value)}
                resetMessage={() => {}}
                autocomplete="email"
              />
            </label>
          </div>

          {/* Botones */}
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
