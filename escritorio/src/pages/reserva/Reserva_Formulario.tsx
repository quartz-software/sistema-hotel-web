import { useLocation, useNavigate } from "react-router-dom"
import Button from "../common/components/Button"
import FormField from "../common/components/FormField"
import Input from "../common/components/Input"

import "./Reserva_Formulario.css"
import { MouseEvent, useState } from "react"

type Room = {
    id: string;
    roomNumber: string;
    type: string;
    status: string;
    capacity: number;
    pricePerNight: string;
    description: string;
}

const Reserva_Formulario = () => {
    const nav = useNavigate()
    const location = useLocation();
    const room = location.state?.room as Room

    const [bookingData, setBookingData] = useState({
        nAdults: 0,
        nChild: 0,
        bookingDate: Date.now(),
        checkIn: new Date(),
        checkOut: new Date(),
        status: "pending",
        totalPrice: 0.00,
        bookingOrigin: "",
        employeeId: null,
        clientId: null
    })

    function calcularDiasEntreFechas() {
        const inicio = bookingData.checkIn;
        const fin = bookingData.checkOut;

        const diferenciaEnMilisegundos = fin.getTime() - inicio.getTime();

        const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

        return Math.round(diferenciaEnDias);
    }

    function postData() {
        let url = "http://localhost:8000/api/bookings";
        let cont = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nAdults: bookingData.nAdults,
                nChild: bookingData.nChild,
                bookingDate: bookingData.bookingDate,
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                status: bookingData.status,
                totalPrice: bookingData.totalPrice,
                bookingOrigin: bookingData.bookingOrigin,
                employeeId: bookingData.employeeId,
                clientId: bookingData.clientId
            })
        };

        fetch(url, cont)
            .then((res) => {
                if (res.status == 200) {
                    //ocultar modal
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <>
            <div className="info--room">
                <h3>DETALLES DE HABITACIÓN</h3>
                <div className="info--row">
                    <div>
                        <h4>N HABITACIÓN:</h4>
                        <span>{room.roomNumber}</span>
                    </div>
                    <div>
                        <h4>TIPO:</h4>
                        <span>{room.type}</span>
                    </div>
                    <div>
                        <h4>ESTADO:</h4>
                        <span>{room.status}</span>
                    </div>
                </div>
                <div className="info--row">
                    <div>
                        <h4>DESCIPCIÓN:</h4>
                        <span>{room.description}</span>
                    </div>
                    <div></div>
                    <div>
                        <h4>PRECIO:</h4>
                        <span>{room.pricePerNight}</span>
                    </div>
                </div>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="div--form">
                    <div className="div--form-field">
                        <FormField label="CLIENTE" errorMessage="">
                            <select name="" id=""
                                onChange={(e) => {
                                    setBookingData({ ...bookingData, clientId: parseInt(e.target.value) })
                                }}
                            >
                                <option value="1">Seleccione un cliente</option>
                            </select>
                        </FormField>
                    </div>
                    <div className="div--form-2">
                        <div className="div--form-field">
                            <FormField label="NUMERO DE ADULTOS:" errorMessage=" ">
                                <Input
                                    type="number"
                                    handleInput={(value: number) => {
                                        setBookingData({ ...bookingData, nAdults: value })
                                    }}
                                />
                            </FormField>
                        </div>
                        <div className="div--form-field">
                            <FormField label="NUMERO DE NIÑOS:" errorMessage=" ">
                                <Input
                                    type="number"
                                    handleInput={(value: number) => {
                                        setBookingData({ ...bookingData, nChil: value })
                                    }}
                                />
                            </FormField>
                        </div>
                    </div>
                </div>
                <div className="div--form">
                    <div className="div--form">
                        <div className="div--form-field">
                            <FormField label="FECHA DE ENTRADA:" errorMessage=" ">
                                <Input
                                    type="date"
                                    handleInput={(value: Date) => {
                                        setBookingData({ ...bookingData, checkIn: new Date(value) })
                                    }}
                                    onChange={(value: Date) => {
                                        console.log(value);
                                        setBookingData({ ...bookingData, checkIn: new Date(value) })
                                    }}
                                    resetMessage={() => {
                                        console.log("no reset");
                                    }}
                                />
                            </FormField>
                        </div>
                        <div className="div--form-field">
                            <FormField label="FECHA DE SALIDA:" errorMessage=" ">
                                <Input
                                    type="date"
                                    handleInput={(value: Date) => {
                                        setBookingData({ ...bookingData, checkIn: new Date(value) })
                                    }}
                                    onChange={(value: Date) => {
                                        console.log(value);
                                        setBookingData({ ...bookingData, checkIn: new Date(value) })
                                    }}
                                    resetMessage={() => {
                                        console.log("no reset");
                                    }}
                                />
                            </FormField>
                        </div>
                    </div>
                </div>
                <div className="div--form">
                    <div className="div--form-field">
                        <FormField label="DIRECCION DE ORIGEN" errorMessage="">
                            <Input
                                type="text"
                                placeholder="Dirección"
                                handleInput={(value: string) => {
                                    setBookingData({ ...bookingData, bookingOrigin: value })
                                }}
                            />
                        </FormField>
                    </div>
                    <div className="div--form-2">
                        <div className="div--form-field">
                            <FormField label="TOTAL A PAGAR:" errorMessage=" ">
                                <Input
                                    type="number"
                                    handleInput={(value: number) => {
                                        setBookingData({ ...bookingData, totalPrice: value })
                                    }}
                                />
                            </FormField>
                        </div>
                        <div className="div--form-field">
                            <FormField label="DESCUENTO:" errorMessage=" ">
                                <Input
                                    type="number"
                                    handleInput={(value: number) => {
                                        console.log("Descuento", value);
                                    }}
                                />
                            </FormField>
                        </div>
                    </div>
                </div>
                <div className="div--form">
                    <Button
                        disabled={false}
                        handleClick={postData}
                    >
                        Reservar
                    </Button>
                    <Button
                        disabled={false}
                        handleClick={
                            function (): void {
                                nav("/habitaciones")
                            }
                        }
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Reserva_Formulario