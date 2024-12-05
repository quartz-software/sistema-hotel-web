import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Bookings from "./pages/bookings/Index";
import Services from "./pages/services/Services";
import Layout from "./pages/common/Layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import BookingForm from "./pages/bookings/BookingForm";
import BookingSuccess from "./pages/bookings/BookingSuccess";
import NotFound from "./pages/errors/NotFound";
import Forbidden from "./pages/errors/Forbbiden";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="404" element={<NotFound />} />
          <Route path="403" element={<Forbidden />} />
          <Route path="bookings">
            <Route index element={<Bookings />} />
            <Route path="form" element={<BookingForm />} />
            <Route path="success/:id" element={<BookingSuccess />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
