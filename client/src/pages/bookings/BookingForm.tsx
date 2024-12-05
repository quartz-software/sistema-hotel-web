import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./BookingForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

type Room = {
  id: number;
  roomNumber: string;
  type: string;
  pricePerNight: number;
  status: string;
  capacity: number;
  description?: string | null;
};

const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roomId = searchParams.get("id");
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(startDateParam || today);
  const [endDate, setEndDate] = useState<string>(endDateParam || today);

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
  const [nAdults, setNAdults] = useState<number>(1);
  const [nChild, setNChild] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const [totalPrice, setTotalPrice] = useState<number>(0); // Estado para manejar el precio total

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    const numOfDays =
      Math.floor(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 3600 * 24)
      ) + 1;
    const total = selectedRooms.reduce(
      (total, room) => total + room.pricePerNight * numOfDays,
      0
    );
    setTotalPrice(total);
  };

  // Fetch las habitaciones disponibles cuando cambian las fechas
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await fetch(
          `/api/bookings/available?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok)
          throw new Error("Error al recuperar habitaciones disponibles.");
        const data = await response.json();
        setAvailableRooms(data);

        // Después de obtener las habitaciones disponibles, calculamos el precio total
        calculateTotalPrice(); // Aseguramos que el precio se calcule con los datos más recientes
      } catch (err: any) {
        setError(err.message || "Error desconocido.");
      }
    };

    fetchAvailableRooms();
  }, [startDate, endDate]);

  // Cuando se selecciona una habitación desde la URL, la agregamos a las habitaciones seleccionadas
  useEffect(() => {
    if (roomId) {
      const roomInAvailable = availableRooms.find(
        (room) => room.id === Number(roomId)
      );
      if (roomInAvailable) {
        setSelectedRooms((prev) => [...prev, roomInAvailable]);
        setAvailableRooms((prev) =>
          prev.filter((room) => room.id !== Number(roomId))
        );
        calculateTotalPrice(); // Recalcular el precio después de añadir la habitación automáticamente
      }
    }
  }, [roomId, availableRooms]);

  // Recalcular el precio total cada vez que las habitaciones seleccionadas cambien
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedRooms, startDate, endDate]);

  // Manejar la adición de una habitación a las seleccionadas
  const handleAddRoom = (room: Room) => {
    setSelectedRooms((prev) => [...prev, room]);
    setAvailableRooms((prev) => prev.filter((r) => r.id !== room.id));
  };

  // Manejar la eliminación de una habitación de las seleccionadas
  const handleRemoveRoom = (room: Room) => {
    setSelectedRooms((prev) => prev.filter((r) => r.id !== room.id));
    setAvailableRooms((prev) => [...prev, room]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      nAdults,
      nChild,
      bookingDate: new Date().toISOString(),
      checkIn: startDate,
      checkOut: endDate,
      status: "pending",
      totalPrice: totalPrice, // Usamos el totalPrice del estado
      rooms: selectedRooms.map((room) => room.id),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error("Error al crear la reservación.");

      const booking = await response.json();
      navigate(`/bookings/success/${booking.id}`);
    } catch (err: any) {
      setError(err.message || "Error desconocido.");
    }
  };

  const calculateTotalCapacity = () => {
    return selectedRooms.reduce((total, room) => total + room.capacity, 0);
  };

  const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAdults = +e.target.value;
    const totalCapacity = calculateTotalCapacity();

    if (nChild < newAdults * 2 && newAdults + nChild <= totalCapacity) {
      setNAdults(newAdults);
    }
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChildren = +e.target.value;
    const totalCapacity = calculateTotalCapacity();

    if (newChildren < nAdults * 2 && newChildren + nAdults <= totalCapacity) {
      setNChild(newChildren);
    }
  };

  return (
    <div className="booking-form-container">
      <h1>Formulario de Reservación</h1>
      <form onSubmit={handleSubmit}>
        <div className="summary-and-inputs">
          <div className="summary">
            <h3>Resumen de la Reserva</h3>
            <p>
              Fecha de inicio: {startDate} <br />
              Fecha de fin: {endDate} <br />
              Adultos: {nAdults} <br />
              Niños: {nChild} <br />
              Capacidad máxima: {calculateTotalCapacity()} <br />
              Total: ${totalPrice}
            </p>
          </div>
          <div className="booking-form inputs">
            <div className="date-inputs">
              <label>
                Fecha de inicio:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setSelectedRooms([]); // Eliminar habitaciones seleccionadas al cambiar fecha
                  }}
                  required
                />
              </label>
            </div>
            <div className="date-inputs">
              <label>
                Fecha de fin:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setSelectedRooms([]); // Eliminar habitaciones seleccionadas al cambiar fecha
                  }}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Adultos:
                <input
                  type="number"
                  min="1"
                  value={nAdults}
                  onChange={handleAdultsChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Niños:
                <input
                  type="number"
                  min="0"
                  value={nChild}
                  onChange={handleChildrenChange}
                  required
                />
              </label>
            </div>
          </div>
        </div>

        <div className="form-container">
          <div className="rooms-column selected-rooms">
            <h3>Habitaciones Seleccionadas</h3>
            <div className="rooms-list">
              {selectedRooms.map((room) => (
                <div key={room.id} className="room-card">
                  <p>
                    {room.roomNumber} - {room.type} - ${room.pricePerNight}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(room)}
                    className="remove-room-btn"
                  >
                    <FontAwesomeIcon icon={faMinusCircle}></FontAwesomeIcon>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rooms-column available-rooms">
            <h3>Habitaciones Disponibles</h3>
            <div className="rooms-list">
              {availableRooms.map((room) => (
                <div key={room.id} className="room-card">
                  <p>
                    {room.roomNumber} - {room.type} - ${room.pricePerNight}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleAddRoom(room)}
                    className="add-room-btn"
                  >
                    <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}

        <button type="submit">Crear Reservación</button>
      </form>
    </div>
  );
};

export default BookingForm;
