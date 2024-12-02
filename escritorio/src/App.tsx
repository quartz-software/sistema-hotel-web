import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/common/Layout";

import Home from "./pages/home/Home";
import AddServices from "./pages/addservices/Index";
import Bookings from "./pages/bookings/Index";
import Login from "./pages/auth/Login";
import Rooms from "./pages/rooms/Index";
import Promotions from "./pages/promotions/Index";
import Services from "./pages/services/Index";
import Stock from "./pages/stock/Index";
import Tasks from "./pages/tasks/Index";
import RoomRates from "./pages/RoomRate/RoomRates";
import { useEffect, useState } from "react";
import useUserRole from "./pages/common/hooks/useUserRole";
import RoomRatesForm from "./pages/RoomRate/RoomRatesForm";

function App() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const { fetchRole } = useUserRole();

  // ! Quitar useeffect
  useEffect(() => {
    let url = "/api/auth/login";
    let cont = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@admin.com",
        password: "Admin123!",
      }),
    };
    fetch(url, cont)
      .then(async (res) => {
        if (res.status == 200) {
          setRole(await fetchRole());
          setIsAuth(true);
        }
      })
      .catch(() => { });
  }, []);

  /* 
  *Funcionalidad para verificar autenticacion
  useEffect(() => {
    fetch("/api/auth/check", { method: "POST", credentials: "include" })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        setIsAuth(false);
      })
      .then(async (data: { valid: boolean }) => {
        setIsAuth(data.valid);
        setRole(await fetchRole());
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, []);
  */
  if (isAuth === null) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              isAuth && (role === "admin" || role === "recepcionist") ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="home" element={<Home />} />
          <Route path="addservices" element={<AddServices />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="rates">
            <Route index element={<RoomRates />} />
            <Route path="edit" element={<RoomRatesForm />} />
          </Route>
          <Route path="rooms" element={<Rooms />} />
          <Route path="services" element={<Services />} />
          <Route path="stock" element={<Stock />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
