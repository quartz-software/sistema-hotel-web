import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Llamarada from "./assets/LLamarada.svg";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import "./Signup.css";
import FormField from "../common/components/FormField";

const Signup = () => {
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
    let url = "/api/auth/register";
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
          navigate("/login");
        }
        setIsFetching(false);
      })
      .catch((error) => {});
  }
  return (
    <form
      className="signup-form form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate={true}
    >
      <img className="signup-form__img" src={Llamarada} alt="LLamarada" />
      <h2 className="signup-form__title">Crear Cuenta</h2>
      <FormField label="Correo" errorMessage={emailMessage}>
        <Input
          autocomplete="email"
          placeholder={"Correo"}
          type={"email"}
          handleInput={(value: string) => {
            setUserData({ ...userData, email: value });
          }}
          resetMessage={() => {
            setEmailMessage("");
          }}
        />
      </FormField>
      <FormField label="Contraseña" errorMessage={passwordMessage}>
        <Input
          autocomplete="new-password"
          placeholder={"Contraseña"}
          type={"password"}
          handleInput={(value: string) => {
            setUserData({ ...userData, password: value });
          }}
          resetMessage={() => {
            setPasswordMessage("");
          }}
        />
      </FormField>
      <Button disabled={false} handleClick={postData}>
        {isFetching ? "Cargando" : "Registrate"}
      </Button>
    </form>
  );
};
export default Signup;
