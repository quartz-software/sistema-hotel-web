import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../common/components/Button";
import FormField from "../common/components/FormField"
import Input from "../common/components/Input"
import { useEffect, useState } from "react";

const RoomRatesForm = () => {

  const navigate = useNavigate()
  const [params] = useSearchParams();
  const id = params.get("id");

  const [roomRateData, setRoomRateData] = useState({
    id: -1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    pricePerNight: "",
    isActive: true,
  })

  function getData() {
    fetch(`/api/rates/${id}`)
      .then(response => response.json())
      .then(data =>
        setRoomRateData({
          id: parseInt(id!),
          startDate: data.startDate.split('T')[0],
          endDate: data.endDate.split('T')[0],
          pricePerNight: data.pricePerNight,
          isActive: data.isActive
        }))
  }

  function postData() {
    const id = roomRateData.id != -1 ? roomRateData.id : null
    let url = `/api/rates/${id ? id : ""}`

    let cont = {
      method: id == null ? "POST" : "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: roomRateData.startDate,
        endDate: roomRateData.endDate,
        pricePerNight: parseFloat(roomRateData.pricePerNight),
        isActive: roomRateData.isActive,
      })
    };


    fetch(url, cont)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          navigate("/room_rate")
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    if (id != null) {
      getData()
    }
  }, [])

  return (
    <div>
      <h1>Tarifa</h1>
      <form className="form--room"
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <FormField label="Precio" errorMessage="">
          <Input
            placeholder="Precio"
            type="number"
            handleInput={(value: string) => {
              console.log(roomRateData);

              setRoomRateData({ ...roomRateData, pricePerNight: value })
            }}
            value={roomRateData.pricePerNight}
            resetMessage={() => { }} />
        </FormField>
        <FormField label="Estado" errorMessage="">
          <Input
            placeholder="Estado"
            type="text"
            handleInput={(value: string) => {
              setRoomRateData({ ...roomRateData, isActive: value == "Active" ? true : false })
            }}
            value={roomRateData.isActive ? "Activo" : "Deshactivado"}
            resetMessage={() => { }}
          />
        </FormField>


        <FormField label="Fecha de inicio" errorMessage="">
          <Input
            placeholder="Fecha de inicio"
            type="date"
            handleInput={(value: string) => {
              setRoomRateData({ ...roomRateData, startDate: value })
            }}
            value={roomRateData.startDate}
            resetMessage={() => { }}
          />
        </FormField>
        <FormField label="Fecha fin" errorMessage="">
          <Input
            placeholder="Fecha fin"
            type="date"
            handleInput={(value: string) => {
              setRoomRateData({ ...roomRateData, endDate: value })
            }}
            value={roomRateData.endDate}
            resetMessage={() => { }}
          />
        </FormField>



        <Button
          disabled={false}
          handleClick={postData}>
          Guardar
        </Button>
        <Button
          disabled={false}
          handleClick={() => {
            navigate("/room_rate")
          }}>
          Cancelar
        </Button>
      </form>
    </div>
  )

}

export default RoomRatesForm