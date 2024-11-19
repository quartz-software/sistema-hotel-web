import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import Layout from "./pages/common/Layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Habitaciones from "./pages/habitacion/Habitaciones";
import Reserva_Formulario from "./pages/reserva/Reserva_Formulario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="Habitaciones" element={<Habitaciones />} />
          <Route path="reserva" element={<Reserva_Formulario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
