import { FC } from "react";
import Button from "../../common/components/Button";
import "./CardRoom.css";
import { useNavigate } from "react-router-dom";

type Props = {
  room: {
    id: number;
    roomNumber: string;
    type: number;
    status: string;
    capacity: string;
    pricePerNight: string;
    description: string;
  };
};

const CardRoom: FC<Props> = ({ room }) => {
  const estadoClase = `room--card ${room.status}`;
  const nav = useNavigate();
  const roomStatus = {
    unavailable: "No Disponible",
    available: "Disponible",
    occupied: "Ocupado",
    maintenance: "En mantenimiento",
    cleaning: "Limpieza",
  };

  let cTag = roomStatus[room.status];

  return (
    <div className={estadoClase}>
      <div>
        <div className="room--info">
          <span className="tag">{cTag}</span>
          <h1>{room.roomNumber}</h1>
          <h3>{room.type}</h3>
          <div>{room.capacity} personas</div>
        </div>
        <img src="./room1.jpg" alt="" />
      </div>
      <Button
        handleClick={function (): void {
          nav("/reserva", { state: { room } });
        }}
        disabled={false}
      >
        Reservar
      </Button>
    </div>
  );
};
export default CardRoom;
