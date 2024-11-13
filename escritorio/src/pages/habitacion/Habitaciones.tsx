import Input from "../common/components/Input";
import CardRoom from "./CardRoom";

import { useEffect, useState } from "react";

import "./Habitaciones.css";


const Habitaciones = () => {
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
      <div className="content--rooms">
        {roomsData.map((room, index) => (
          <CardRoom
            key={index}
            room={room}
          />
        ))}
      </div>
    </>
  );
};

export default Habitaciones;
