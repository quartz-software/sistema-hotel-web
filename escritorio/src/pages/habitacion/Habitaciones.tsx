import Input from "../common/components/Input"
import CardRoom from "./CardRoom"

import "./Habitaciones.css"

const habitaciones = [
    {
        numHab: 101,
        tipo: "Suite Presidencial",
        capacida: 4,
        estado: "Disponible"
    },
    {
        numHab: 102,
        tipo: "Habitación Doble",
        capacida: 2,
        estado: "Reservada"
    },
    {
        numHab: 103,
        tipo: "Habitación Individual",
        capacida: 1,
        estado: "Limpieza"
    },
    {
        numHab: 104,
        tipo: "Suite Lujo",
        capacida: 3,
        estado: "Ocupado"
    },
    {
        numHab: 105,
        tipo: "Habitación Familiar",
        capacida: 5,
        estado: "Disponible"
    }
];


const Habitaciones = () => {
    return (
        <>
            <h1>Habitaciones</h1>
            <div className="div--filter">
                <label>Buscar</label>
                <Input
                    placeholder="Buscar"
                    type="search"
                />
            </div>
            <div className="content--rooms">
                {
                    habitaciones.map((room, index) => (
                        <CardRoom
                            key={index}
                            numHab={room.numHab}
                            tipo={room.tipo}
                            capacida={room.capacida}
                            estado={room.estado}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default Habitaciones