import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Layout from "./pages/common/Layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Habitaciones from "./pages/habitacion/Habitaciones";
import Habitaciones_admin from "./pages/habitacion/Habitaciones_admin";
import Habitaciones_formulario from "./pages/habitacion/Habitaciones_formulario";
import RoomRates from "./pages/RoomRate/RoomRates";
import RoomRatesForm from "./pages/RoomRate/RoomRatesForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="habitaciones" element={<Habitaciones />} />
          <Route path="admin/habitaciones" element={<Habitaciones_admin />} />
          <Route path="admin/habitaciones/form" element={<Habitaciones_formulario />} />
          <Route path="room_rate" element={<RoomRates />} />
          <Route path="room_rate/form" element={<RoomRatesForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
