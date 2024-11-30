import { useState } from "react";
import Button from "../common/components/Button";
import FormField from "../common/components/FormField";
import Input from "../common/components/Input";
import "./Habitaciones_formulario.css";
const Habitaciones_formulario = () => {
  const [userData, setUserData] = useState({
    numeroHabitacion: "",
    tipo: "",
    precioPorNoche: "",
    estado: "",
    capacidad: "",
    descripcion: "",
  });

  function postData() {
    let url = "http://localhost:8080/api/rooms/";
    let cont = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numeroHabitacion: userData.numeroHabitacion,
        tipo: userData.tipo,
        precioPorNoche: userData.precioPorNoche,
        estado: userData.estado,
        capacidad: userData.capacidad,
        descripcion: userData.descripcion,
      }),
    };

    fetch(url, cont)
      .then((res) => {
        if (res.status == 200) {
        }
        console.log("hola");
      })
      .catch((error) => {
        console.log(error.toString());
      });
  }
  return (
    <div>
      <h1>Habitaciones</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form">
          <div className="form__div">
            <FormField label="Numero Habitacion" errorMessage=" ">
              <Input
                placeholder="Numero Habitacion"
                type="text"
                handleInput={(value: string) => {
                  setUserData({ ...userData, numeroHabitacion: value });
                }}
                value={userData.numeroHabitacion}
                resetMessage={() => {}}
              />
            </FormField>

            <FormField label="Estado" errorMessage=" ">
              <Input
                type="text"
                placeholder="Estado"
                handleInput={(value: string) => {
                  setUserData({ ...userData, estado: value });
                }}
                value={userData.estado}
                resetMessage={() => {}}
              />
            </FormField>

            <FormField label="Capacidad" errorMessage=" ">
              <Input
                type="text"
                placeholder="Capacidad"
                handleInput={(value: string) => {
                  setUserData({ ...userData, capacidad: value });
                }}
                value={userData.capacidad}
                resetMessage={() => {}}
              />
            </FormField>

            <FormField label="Precio" errorMessage=" ">
              <Input
                type="text"
                placeholder="Precio"
                handleInput={(value: string) => {
                  setUserData({ ...userData, precioPorNoche: value });
                }}
                value={userData.precioPorNoche}
                resetMessage={() => {}}
              />
            </FormField>

            <FormField label="Descripcion" errorMessage=" ">
              <Input
                type="text"
                placeholder="Descripcion"
                handleInput={(value: string) => {
                  setUserData({ ...userData, descripcion: value });
                }}
                value={userData.descripcion}
                resetMessage={() => {}}
              />
            </FormField>
          </div>

          <div className="form__div">
            <FormField label="Tipo" errorMessage=" ">
              <Input
                type="text"
                placeholder="Tipo"
                handleInput={(value: string) => {
                  setUserData({ ...userData, tipo: value });
                }}
                value={userData.tipo}
                resetMessage={() => {}}
              />
            </FormField>
          </div>
        </div>
        <Button disabled={false} handleClick={postData}>
          guardar
        </Button>
      </form>
    </div>
  );
};

export default Habitaciones_formulario;
