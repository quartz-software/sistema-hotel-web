import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BookingSuccess.css";

const BookingSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener los detalles de la reserva desde la API
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/bookings/${id}`);
        if (response.status === 404) {
          navigate("/404"); // Redirigir a 404 si no se encuentra la reserva
        } else if (response.status === 403) {
          navigate("/403"); // Redirigir a 403 si no se tiene acceso
        } else if (response.ok) {
          const data = await response.json();
          setBooking(data);
        } else {
          throw new Error("Error al obtener los detalles de la reserva");
        }
      } catch (error) {
        setError("Error al cargar la información de la reserva");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id, navigate]);

  const handleAction = async (action: "accept" | "reject") => {
    try {
      const response = await fetch(`/api/bookings/accept/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        navigate("/"); // Redirigir a la página principal si se acepta o rechaza
      } else {
        throw new Error("Error al procesar la acción");
      }
    } catch (error) {
      setError("Error al procesar la acción");
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="booking-success-container">
      <h1>Detalles de la Reserva</h1>
      {error && <p className="error-message">{error}</p>}
      {booking ? (
        <div className="booking-details">
          <h3>Reserva #{booking.id}</h3>
          <p>
            <strong>Fecha de inicio:</strong> {booking.checkIn}
          </p>
          <p>
            <strong>Fecha de fin:</strong> {booking.checkOut}
          </p>
          <p>
            <strong>Adultos:</strong> {booking.nAdults}
          </p>
          <p>
            <strong>Niños:</strong> {booking.nChild}
          </p>
          <p>
            <strong>Total:</strong> ${booking.totalPrice}
          </p>
          <p>
            <strong>Estado:</strong> {booking.status}
          </p>

          <div className="actions">
            <button
              onClick={() => handleAction("accept")}
              className="accept-button"
            >
              Aceptar
            </button>
            <button
              onClick={() => handleAction("reject")}
              className="reject-button"
            >
              Rechazar
            </button>
          </div>
        </div>
      ) : (
        <p>No se encontraron detalles de la reserva.</p>
      )}
    </div>
  );
};

export default BookingSuccess;
