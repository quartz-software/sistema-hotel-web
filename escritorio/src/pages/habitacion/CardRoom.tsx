import { FC } from "react";
import Button from "../common/components/Button"
import "./CardRoom.css"

type Props = {
    numHab: number;
    tipo: string;
    capacida: number;
    estado: string;
}

const CardRoom: FC<Props> = ({ numHab, tipo, capacida, estado }) => {

    const estadoClase = `room--card ${estado.toLowerCase()}`

    return (
        <div className={estadoClase}>
            <div>
                <div className="room--info">
                    <span className="tag">{estado}</span>
                    <h1>{numHab}</h1>
                    <h3>{tipo}</h3>
                    <div>
                        {capacida} personas
                    </div>
                </div>
                <img src="./room1.jpg" alt="" />
            </div>
            <Button>
                Reservar
            </Button>
        </div>
    )
}
export default CardRoom