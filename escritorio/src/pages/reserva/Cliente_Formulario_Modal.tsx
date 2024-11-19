import { FC, useState } from "react";
import Button from "../common/components/Button";
import FormField from "../common/components/FormField";
import Input from "../common/components/Input";
import "./Cliente_Formulario.css"

type Props = {
    isOpen: Function
}


const Cliente_Formulario_Modal = () => {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        role: "client"
    })
    const [clientData, setClientData] = useState({
        firstname: "",
        middlename: "",
        lastname1: "",
        lastname2: "",
        phone: "",
        dni: "",
        documentType: "",
        country: "",
        address: ""

    })

    function postDataClient() {
        let url = "http://localhost:8000/api/clients";
        let cont = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client: {
                    firstname: clientData.firstname,
                    middlename: clientData.middlename,
                    lastname1: clientData.lastname1,
                    lastname2: clientData.lastname2,
                    phone: clientData.phone,
                    dni: clientData.dni,
                    documentType: clientData.documentType,
                    country: clientData.country,
                    address: clientData.address
                },
                user: {
                    email: "juan.gomez@example.com",
                    password: "securePassword123",
                    role: "client"
                },
            })
        };

        fetch(url, cont)
            .then((res) => {
                if (res.status == 201) {
                    // cerrar modal
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-content">
                    <h2>NUEVO CLIENTE</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <FormField label="Primer nombre:" errorMessage="">
                            <Input type="text" placeholder="Primer nombre"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, firstname: value })
                                }}
                            />
                        </FormField>
                        <FormField label="Segundo nombre:" errorMessage="">
                            <Input type="text" placeholder="Segundo nombre"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, middlename: value })
                                }}
                            />
                        </FormField>
                        <FormField label="Primer apellido:" errorMessage="">
                            <Input type="text" placeholder="Primer Apellido"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, lastname1: value })
                                }}
                            />
                        </FormField>
                        <FormField label="Segundo apellido:" errorMessage="">
                            <Input type="text" placeholder="Segundo Apellido"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, lastname2: value })
                                }}
                            />
                        </FormField>
                        <FormField label="Email:" errorMessage="">
                            <Input autocomplete="email" placeholder="Correo Electronico"
                                handleInput={(value: string) => {
                                    setUserData({ ...userData, email: value })
                                }}
                                type="text"
                            />
                        </FormField>
                        <FormField label="Contraseña:" errorMessage="">
                            <Input type="text" placeholder="Contraseña"
                                handleInput={(value: string) => {
                                    setUserData({ ...userData, password: value })
                                }}
                            />
                        </FormField>
                        <FormField label="Celular:" errorMessage="">
                            <Input type="text" placeholder="Número de celular"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, phone: value })
                                }}
                            />
                        </FormField>
                        <FormField label="País:" errorMessage="">
                            <Input type="text" placeholder="País de procedencia"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, country: value })
                                }}
                            />
                        </FormField>
                        <FormField label="DNI:" errorMessage="">
                            <Input type="text" placeholder="DNI"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, dni: value })
                                }}
                            />
                        </FormField>
                        <FormField label="Tipo de documento:" errorMessage="">
                            <Input type="text" placeholder="Tipo de documento"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, documentType: value })
                                }}
                            />
                        </FormField>
                        <FormField label="Dirección:" errorMessage="">
                            <Input type="text" placeholder="Dirección"
                                handleInput={(value: string) => {
                                    setClientData({ ...clientData, address: value })
                                }}
                            />
                        </FormField>
                        <div className="div--btns">
                            <Button disabled={false}
                                handleClick={() => {
                                    console.log("Cerra modal");
                                }}>
                                Cerrar
                            </Button>
                            <Button disabled={false}
                                handleClick={postDataClient}>
                                Guardar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cliente_Formulario_Modal