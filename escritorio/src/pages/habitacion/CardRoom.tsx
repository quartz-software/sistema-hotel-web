import { FC, MouseEvent } from "react";
import Button from "../common/components/Button"
import "./CardRoom.css"
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
    }
}

const CardRoom: FC<Props> = ({ room }) => {

    const estadoClase = `room--card ${room.status}`
    const nav = useNavigate()


    return (
        <div className={estadoClase}>
            <div>
                <div className="room--info">
                    <span className="tag">{room.status}</span>
                    <h1>{room.roomNumber}</h1>
                    <h3>{room.type}</h3>
                    <div>
                        {room.capacity} personas
                    </div>
                </div>
                <img src="./room1.jpg" alt="" />
            </div>
            <Button
                handleClick={
                    function (event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
                        nav("/reserva", { state: { room } })
                    }
                }
                disabled={false} >
                Reservar
            </Button>
        </div>
    )
}
export default CardRoom