import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Room } from "./types/Room.t";

const Index = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await fetch(
        `/api/bookings/available?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Error al cargar las habitaciones");
      }

      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(
        "Error al cargar las habitaciones. Por favor, intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleReserve = (roomId: number) => {
    navigate(
      `/bookings/form?id=${roomId}&startDate=${startDate}&endDate=${endDate}`
    );
  };
  return (
    <div
      style={{
        paddingTop: "75px",
        paddingBlock: "auto",
        paddingBottom: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "90%",
      }}
    >
      <h1>Habitaciones Disponibles</h1>
      <div style={{ display: "flex", alignItems: "end" }}>
        <label>
          Fecha de entrada:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Fecha de salida:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <button
        onClick={fetchRooms}
        style={{
          marginBlock: "10px",
          padding: "5px 10px",
          cursor: "pointer",
          backgroundColor: "#0088aa",
        }}
      >
        Consultar
      </button>

      {loading && <p>Cargando habitaciones...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {rooms.length === 0 && !loading && (
          <p>No hay habitaciones disponibles.</p>
        )}
        {rooms.map((room) => (
          <div
            key={room.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              width: "300px",
            }}
          >
            <h3>Habitación {room.roomNumber}</h3>
            <p>Tipo: {room.type}</p>
            <p>Capacidad: {room.capacity} personas</p>
            <p>Precio por noche: ${room.pricePerNight}</p>
            <div>
              {room.images.map((image) => (
                <img
                  key={image.id}
                  src={image.url! || image.path!}
                  alt={image.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => handleReserve(room.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
