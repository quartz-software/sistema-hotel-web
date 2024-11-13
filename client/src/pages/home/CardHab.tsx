import { FC } from "react";
import "./CardHab.css";

import Button from "../common/components/Button";

type Props = {
  tipo: string;
  capacidad: number;
  descripcion: string;
  urlImg: string;
};

export const CardHab: FC<Props> = ({
  tipo,
  capacidad,
  descripcion,
  urlImg,
}) => {
  function recervaHab() {
    console.log("Reservar Habitación");
  }
  return (
    <div className="room--card">
      <img src={urlImg} alt="" />
      <div className="room--card--info">
        <h2>{tipo}</h2>
        <div>
          <span>
            <b>{capacidad}</b> Personas
          </span>
          <span>{descripcion}</span>
          <Button handleClick={recervaHab} disabled={false}>
            Reservar ahora
          </Button>
        </div>
      </div>
    </div>
  );
};
