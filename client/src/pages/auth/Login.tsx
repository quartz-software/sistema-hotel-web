import Llamarada from "./assets/LLamarada.svg";
import Google from "./assets/Google.svg";
import Facebook from "./assets/Facebook.svg";
import Twiter from "./assets/twiter.svg";
import Input from "../common/components/Input";
import Button from "../common/components/Button";

import { useState } from "react";

import "./Login.css";
import Redes from "../common/Redes/Redes";
import FormField from "../common/components/FormField";
const Login = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [isFetching, setIsFetching] = useState(false);

  function postData() {
    console.log(userData);
    setIsFetching(true);
    let url = "/api/auth/login";
    let cont = {
      method: "POST",
      body: JSON.stringify({
        email: userData.username,
        password: userData.password,
      }),
    };
    setTimeout(() => {
      fetch(url, cont)
        .then((respsoe) => respsoe.json())
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
    <div className="contenedor">
      <div className="border">
        <img src={Llamarada} alt="LLamarada" />
        <h2>Inicia Sesion</h2>
        <p>aun no tienes una cuenta?</p>
        <a href="./Signup">Registrate</a>
        <FormField label="Usuario">
          <Input
            placeholder={"Usuario"}
            handleInput={(value: string) => {
              setUserData({ ...userData, username: value });
            }}
            type="text"
            onSuccess={() => {}}
            onError={() => {}}
          />
        </FormField>
        <FormField label="Contraseña">
          <Input
            placeholder={"Contraseña"}
            handleInput={(value: string) => {
              setUserData({ ...userData, password: value });
            }}
            type="password"
            onSuccess={() => {}}
            onError={() => {}}
          />
        </FormField>
        <a href="">¿Olvidaste tu contraseña?</a>

        <Button handleClick={postData} disabled={isFetching}>
          {isFetching ? "Cargando..." : "Iniciar Sesion"}
        </Button>

        <p>
          o <br /> ingresa con
        </p>
        <div className="RedesSociales">
          <Redes red={Google} />
          <Redes red={Facebook} />
          <Redes red={Twiter} />
        </div>
      </div>
    </div>
  );
};

export default Login;
