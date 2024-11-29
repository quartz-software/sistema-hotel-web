import Input from "../common/components/Input"
import FormField from "../common/components/FormField"
import Button from "../common/components/Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

type RoomRate = {
  id: number,
  startDate: string,
  endDate: string,
  pricePerNight: number,
  isActive: boolean,
}

const formatDate = (isoDate: string) => {

  let date = isoDate.split("T")[0];
  let dateParts = date.split("-");

  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};

const RoomRates = () => {
  const nav = useNavigate();
  const [roomRatesData, setRoomRatesData] = useState([]);

  function getData() {
    let url = "/api/rates"
    fetch(url)
      .then((res) => {
        if (res.status == 200) {
          return res.json()
        }
      })
      .then((data) => {
        console.log(data);
        setRoomRatesData(data)
      })
      .catch((error) => {
        console.error(error.toString())
      })
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <h1>Tarifas de habitacion</h1>
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
          nav(`/room_rate/form`)
        }}>
          Agregar
        </Button>
      </div>
      <table className="table--rooms">
        <thead>
          <th>Id</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Precio/noche</th>
          <th>Estado</th>
          <th></th>
        </thead>
        {
          roomRatesData.length == 0 ?
            <div className="div--nd">No se encomtraron cuartos</div>
            :
            <tbody >
              {
                roomRatesData.map((roomRate: RoomRate) => {
                  return (
                    <tr>
                      <td>{roomRate.id}</td>
                      <td>{formatDate(roomRate.startDate)}</td>
                      <td>{formatDate(roomRate.endDate)}</td>
                      <td>{roomRate.pricePerNight}</td>
                      <td>{roomRate.isActive ? "Activo" : "Deshabilitado"}</td>
                      <td>
                        <Button disabled={false} handleClick={() => {
                          nav(`/room_rate/form?id=${roomRate.id}`)
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

export default RoomRates