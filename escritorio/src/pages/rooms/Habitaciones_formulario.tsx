import { useEffect, useState } from "react";
import Button from "../common/components/Button";
import FormField from "../common/components/FormField";
import Input from "../common/components/Input";
import "./Habitaciones_formulario.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import RoomImage from "./components/RoomImage";

type ImageRoom = {
  id?: number,
  name: string,
  type: string
}

type Room = {
  id: number,
  roomNumber: string,
  type: string,
  pricePerNight: string,
  status: string,
  capacity: number,
  description: string,
  images: ImageRoom[]
}

const Habitaciones_formulario = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [roomData, setRoomData] = useState<Room>({
    id: -1,
    roomNumber: "",
    type: "",
    pricePerNight: "",
    status: "available",
    capacity: 0,
    description: "",
    images: []
  });

  const [RoomImagesFiels, setRoomImagesFiels] = useState<RoomImage[]>([])

  function getData() {
    fetch(`/api/rooms/${id}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setRoomData({
          id: parseInt(id!),
          roomNumber: data.roomNumber,
          type: data.type,
          pricePerNight: data.pricePerNight,
          status: data.status,
          capacity: data.capacity,
          description: data.description,
          images: data.images
        })
      }
      );
  }

  function postData() {
    console.log(RoomImagesFiels)
    return
    const id = roomData.id != -1 ? roomData.id : null;
    let url = `/api/rooms/${id ? id : ""}`;

    let cont = {
      method: id == null ? "POST" : "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNumber: roomData.roomNumber,
        type: roomData.type,
        pricePerNight: parseFloat(roomData.pricePerNight),
        status: roomData.status,
        capacity: roomData.capacity,
        description: roomData.description,
      }),
    };

    fetch(url, cont)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          navigate("/rooms");
        }
      })
      .catch((error) => {
        console.log(error.toString());
      });
  }
  useEffect(() => {
    if (id != null) {
      getData();
    }
  }, []);
  return (
    <div>
      <h1>Habitación</h1>
      <form
        className="form--room"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormField label="Numero Habitacion" errorMessage=" ">
          <Input
            placeholder="Numero Habitacion"
            type="text"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, roomNumber: value });
            }}
            value={roomData.roomNumber}
            resetMessage={() => { }}
          />
        </FormField>

        <FormField label="Capacidad" errorMessage=" ">
          <Input
            type="number"
            placeholder="Capacidad"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, capacity: parseInt(value) });
            }}
            value={roomData.capacity.toString()}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Estado" errorMessage="">
          <select
            onChange={(e) => {
              setRoomData({ ...roomData, status: e.target.value });
            }}
          >
            <option value="unavailable">No disponible</option>
            <option value="available">Disponible</option>
            <option value="occupied">Ocupado</option>
            <option value="maintenance">Mantemiento</option>
            <option value="cleaning">Limpieza</option>
          </select>
        </FormField>

        <FormField label="Tipo" errorMessage=" ">
          <select
            onChange={(e) => {
              setRoomData({ ...roomData, type: e.target.value });
            }}
          >
            <option value="suite">Suite</option>
            <option value="normal">Normal</option>
            <option value="premium">Premium</option>
          </select>
        </FormField>
        <FormField label="Precio" errorMessage=" ">
          <Input
            type="number"
            placeholder="Precio"
            handleInput={(value: string) => {
              setRoomData({ ...roomData, pricePerNight: value });
            }}
            value={roomData.pricePerNight}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Descripcion" errorMessage=" " modifier="description">
          <textarea
            placeholder="Descripcion"
            onChange={(e) => {
              setRoomData({ ...roomData, description: e.target.value });
            }}
            value={roomData.description}
          >
          </textarea>
        </FormField>
        <div className="form__div--row">
          <h2>Promociones</h2>
          <div className="promotion__select">
            <select
              onChange={(e) => {
                console.log(e);
              }}
            >
              <option value="">Seleccione una promocion</option>
            </select>
            <Button handleClick={() => { }}>
              Añadir
            </Button>
          </div>
        </div>
        <div className="form__div--row">
          <div className="form__title-imgs">
            <h2>Imagenes</h2>
            <Button handleClick={() => {
              //setRoomData({ ...roomData, images: [...roomData.images, { name: "", type: "normal" }] });
              // setRoomImagesFiels([...RoomImagesFiels, <RoomImage model={{ name: "", type: "normal" }} setFile={undefined} />])
              setRoomImagesFiels([...RoomImagesFiels, { name: "", path: undefined, type: "normal", url: undefined, file: undefined }])
              console.log(RoomImagesFiels);
            }}>
              Añadir
            </Button>
          </div>
          {
            RoomImagesFiels.length == 0 ?
              <div className="div--msg-nd">No tiene imagenes</div> :
              <div className="div-images">
                {RoomImagesFiels.map((item, index) => {
                  return <RoomImage key={index} model={{ name: item.name, type: item.type, path: item.path, url: item.url, file: item.file }} onChange={(file) => {
                    const acFields = [...RoomImagesFiels]
                    acFields[index].file = file
                    console.log(typeof file)
                    setRoomImagesFiels(acFields)
                  }}></RoomImage>
                })}
              </div>
          }
        </div>

        <Button disabled={false} handleClick={postData}>
          Guardar
        </Button>
        <Button
          disabled={false}
          handleClick={() => {
            navigate("/rooms");
          }}
        >
          Cancelar
        </Button>
      </form>
    </div>
  );
};

export default Habitaciones_formulario;
