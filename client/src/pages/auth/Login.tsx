import Llamarada from "./assets/LLamarada.svg"
import Google from "./assets/Google.svg"
import Facebook from "./assets/Facebook.svg"
import Twiter from "./assets/twiter.svg"
import Input from "../common/Input/Input"
import Button from "../common/Button/Button"

import {FC, useState} from "react"

import "./Login.css"
import Redes from "../common/Redes/Redes"
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function InicioSecion() {

    console.log(username, password);
    
    var url="/api"
    var cont={
      method:'POST',
      body:JSON.stringify({
        User: username,
        password:password

      })
    }
    fetch(url,cont)
      .then(respsoe=>respsoe.json())
      .then(data=>console.log(data))
      .catch(error=>console.error('Error:',error))
  }
  return (
    <div className="contenedor">
      <div className="border">
          <img src={Llamarada} alt="LLamarada" />
          <h2>Inicia Sesion</h2>
          <p>aun no tienes una cuenta?</p>
          <a href="./Signup">Registrate</a>
          <Input
            textInput={"Usuario"}
            textPlace={"Usuario"}
            setValue={setUsername}
            inputType="text"
            />
          <Input
            textInput={"Contraseña"}
            textPlace={"Contraseña"}
            setValue={setPassword}
            inputType="Password"
          />
          <a href="">olvidaste tu contraseña?</a>

          <Button text="Iniciar Sesion" fun={InicioSecion}/>
          
          <p>o <br /> ingresa con</p>
          <div className="RedesSociales">
            <Redes
            red={Google}
            />
                        <Redes
              red={Facebook}
            />
                        <Redes
              red={Twiter}
            />
          </div>
    </div>
    </div>    
  );
};

export default Login;
