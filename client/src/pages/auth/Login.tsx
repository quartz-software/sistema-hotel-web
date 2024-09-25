import Llamarada from "./assets/LLamarada.svg"
import Google from "./assets/Google.svg"
import Facebook from "./assets/Facebook.svg"
import Twiter from "./assets/twiter.svg"

import {Children, FC} from "react"

import "./Login.css"
const Login = () => {
  return (
    <div className="contenedor">
      <div className="border">
          <img src={Llamarada} alt="LLamarada" />
          <h2>Inicia Sesion</h2>
          <p>aun no tienes una cuenta?</p>
          <a href="">Registrate</a>
          <Input
            textInput={"Usuario"}
            textPlace={"Usuario"}
          />
          <Input
            textInput={"Contraseña"}
            textPlace={"Contraseña"}
          />
          <a href="">olvidaste tu contraseña?</a>
          <BotonInicio/>
          <p>o <br /> ingresa con</p>
          <div className="RedesSociales">
            <Redes
              Red={Google}
            />
                        <Redes
              Red={Facebook}
            />
                        <Redes
              Red={Twiter}
            />
          </div>
    </div>
    </div>    
  );
};

type Props={textInput:string,textPlace:string}

const Input:FC<Props>=({textInput,textPlace, children})=>{
  return(
    <div className="input">
      <p>{textInput}</p>
      {children}
      <input type="text" placeholder={textPlace}/>
    </div>
  );
}

const BotonInicio=()=>{
  return(
    <button className="botonInicio">
      Iniciar Sesion
    </button>
  )
}

const Redes=({Red})=>{
  return(
    <div>
      <a href="">
        <img src={Red} alt="Google" />
      </a>
    </div>
  );
}

export default Login;
