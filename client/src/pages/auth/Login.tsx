import Llamarada from "./assets/LLamarada.svg";
import Google from "./assets/Google.svg";
import Facebook from "./assets/Facebook.svg";
import Twiter from "./assets/twiter.svg";
import Input from "../common/components/Input";
import Button from "../common/components/Button";

import { useState } from "react";

import "./Login.css";
import Social from "./components/Social";
import FormField from "../common/components/FormField";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isFetching, setIsFetching] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const navigate = useNavigate();

  function postData() {
    let emailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    let validForm = true;
    if (emailReg.test(userData.email) === false) {
      validForm = false;
      setEmailMessage("Ingrese un correo valido");
    }
    if (passwordReg.test(userData.password) === false) {
      validForm = false;
      setPasswordMessage(
        "Tu contraseña debe tener entre 6 y 16 caracteres, incluir al menos un número y un carácter especial (!@#$%^&*)"
      );
    }
    if (!validForm) return;

    setIsFetching(true);
    let url = "/api/auth/login";
    let cont = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    };
    fetch(url, cont)
      .then((res) => {
        if (res.status == 200) {
          navigate("/");
        }
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  }

  return (
    <form
      className="form login-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <img className="login-form__img" src={Llamarada} alt="LLamarada" />
      <h2 className="login-form__title">Inicia Sesion</h2>
      <p className="login-form__register">
        ¿Aún no tienes una cuenta?
        <br />
        Registrate <a href="./Signup">aquí</a>
      </p>

      <FormField label="Usuario" errorMessage={emailMessage}>
        <Input
          autocomplete="email"
          placeholder={"Correo"}
          handleInput={(value: string) => {
            setUserData({ ...userData, email: value });
          }}
          type="text"
          resetMessage={() => {
            setEmailMessage("");
          }}
          value={userData.email}
        />
      </FormField>
      <FormField label="Contraseña" errorMessage={passwordMessage}>
        <Input
          autocomplete="current-password"
          placeholder={"Contraseña"}
          handleInput={(value: string) => {
            setUserData({ ...userData, password: value });
          }}
          type="password"
          resetMessage={() => {
            setPasswordMessage("");
          }}
          value={userData.password}
        />
      </FormField>
      <p className="login-form__reset-password">
        <a>¿Olvidaste tu contraseña?</a>
      </p>

      <Button handleClick={postData} disabled={isFetching}>
        {isFetching ? "Cargando..." : "Iniciar Sesion"}
      </Button>

      <p className="login-form__text">
        o <br /> ingresa con
      </p>
      <div className="login-form__social">
        <Social red={Google} />
        <Social red={Facebook} />
        <Social red={Twiter} />
      </div>
    </form>
  );
};

export default Login;
