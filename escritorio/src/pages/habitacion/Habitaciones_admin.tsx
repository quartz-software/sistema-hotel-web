import { useEffect, useState } from "react";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import "./Habitaciones_admin.css"

type Room = {
    id: string,
    roomNumber: string,
    type: string,
    pricePerNight: number,
    status: string,
    capacity: number,
    description: string
}

const Habitaciones_admin = () => {
    const [roomsData, setRoomsData] = useState([]);
    function getData() {
        let url = "http://localhost:8000/api/rooms"
        let cont = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(url, cont)
            .then((res) => {
                if (res.status == 200) {
                    return res.json();
                }
            })
            .then((data) => {
                setRoomsData(data);
            })
            .catch((error) => {
                console.error(error.toString());
            });
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <h1>Habitaciones</h1>
            <div className="div--filter">
                <label>Buscar</label>
                <Input placeholder="Buscar" type="search" />
            </div>
            <table className="table--rooms">
                <thead>
                    <th>Id</th>
                    <th>Num</th>
                    <th>Tipo</th>
                    <th>Capacidad</th>
                    <th>Precio/noche</th>
                    <th></th>
                </thead>
                {
                    roomsData.length != 0 ?
                        <div className="div--nd">No se encomtraron cuartos</div>
                        :
                        <tbody>
                            {
                                roomsData.map((habitacion: Room) => {
                                    return (
                                        <tr>
                                            <td>{habitacion.id}</td>
                                            <td>{habitacion.roomNumber}</td>
                                            <td>{habitacion.type}</td>
                                            <td>{habitacion.capacity}</td>
                                            <td>{habitacion.pricePerNight}</td>
                                            <td className="td--btn">
                                                <Button disabled={false} handleClick={() => {
                                                    console.log(habitacion);
                                                }}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                }
            </table>
        </>
    )
}

export default Habitaciones_admin;