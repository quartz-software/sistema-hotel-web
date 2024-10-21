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

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isFetching, setIsFetching] = useState(false);

  function postData() {
    setIsFetching(true);
    let url = "/api/auth/login";
    let cont = {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    };
    setTimeout(() => {
      fetch(url, cont)
        .then((res) => res.json())
        .then((data) => {
          setIsFetching(false);

          console.log(data);
        })
        .catch((error) => {
          setIsFetching(false);
          console.error("Error:", error);
        });
    }, 5000);
  }

  return (
    <form className="form login-form">
      <img className="login-form__img" src={Llamarada} alt="LLamarada" />
      <h2 className="login-form__title">Inicia Sesion</h2>
      <p className="login-form__register">
        ¿Aún no tienes una cuenta?
        <br />
        Registrate <a href="./Signup">aquí</a>
      </p>

      <FormField label="Usuario">
        <Input
          placeholder={"Usuario"}
          handleInput={(value: string) => {
            setUserData({ ...userData, email: value });
          }}
          type="text"
        />
      </FormField>
      <FormField label="Contraseña">
        <Input
          placeholder={"Contraseña"}
          handleInput={(value: string) => {
            setUserData({ ...userData, password: value });
          }}
          type="password"
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
