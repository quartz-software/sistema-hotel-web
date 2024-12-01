import { useEffect, useState } from "react";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import "./Habitaciones_admin.css"
import { useNavigate } from "react-router-dom";
import FormField from "../common/components/FormField";

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
    const nav = useNavigate()
    const [roomsData, setRoomsData] = useState([]);
    function getData() {
        let url = "/api/rooms"
        fetch(url)
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
            <div className="div--search">
                <FormField label="Buscar" errorMessage="">
                    <Input
                        handleInput={() => { }}
                        resetMessage={() => { }}
                        placeholder="Buscar"
                        type="search"
                        value=""
                    />
                </FormField>
                <Button disabled={false} handleClick={() => {
                    nav(`/admin/habitaciones/form`)
                }}>
                    Agregar
                </Button>
            </div>
            <table className="table--rooms">
                <thead>
                    <th>Id</th>
                    <th>Numero</th>
                    <th>Tipo</th>
                    <th>Capacidad</th>
                    <th>Precio/noche</th>
                    <th>Estado</th>
                    <th></th>
                </thead>
                {
                    roomsData.length == 0 ?
                        <div className="div--nd">No se encomtraron cuartos</div>
                        :
                        <tbody >
                            {
                                roomsData.map((habitacion: Room) => {
                                    return (
                                        <tr>
                                            <td>{habitacion.id}</td>
                                            <td>{habitacion.roomNumber}</td>
                                            <td>{habitacion.type}</td>
                                            <td>{habitacion.capacity}</td>
                                            <td>{habitacion.pricePerNight}</td>
                                            <td>{habitacion.status}</td>
                                            <td>
                                                <Button disabled={false} handleClick={() => {
                                                    nav(`/admin/habitaciones/form?id=${habitacion.id}`)
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