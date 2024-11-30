import Input from "../common/components/Input";
import CardRoom from "./components/CardRoom";

import "./Index.css";

const habitaciones = [
  {
    numHab: 101,
    tipo: "Suite Presidencial",
    capacida: 4,
    estado: "Disponible",
  },
  {
    numHab: 102,
    tipo: "Habitación Doble",
    capacida: 2,
    estado: "Reservada",
  },
  {
    numHab: 103,
    tipo: "Habitación Individual",
    capacida: 1,
    estado: "Limpieza",
  },
  {
    numHab: 104,
    tipo: "Suite Lujo",
    capacida: 3,
    estado: "Ocupado",
  },
  {
    numHab: 105,
    tipo: "Habitación Familiar",
    capacida: 5,
    estado: "Disponible",
  },
];

const Habitaciones = () => {
  return (
    <div>
      <h1>Habitaciones</h1>
      <div className="div--filter">
        <label>Buscar</label>
        <Input
          placeholder="Buscar"
          type="text"
          resetMessage={() => {}}
          value=""
          handleInput={(value: string) => {
            console.log(value);
          }}
        />
      </div>
      <div className="content--rooms">
        {habitaciones.map((room, index) => (
          <CardRoom
            key={index}
            numHab={room.numHab}
            tipo={room.tipo}
            capacida={room.capacida}
            estado={room.estado}
          />
        ))}
      </div>
    </div>
  );
};

export default Habitaciones;
