import { FC } from "react";
import Llamarada from "./assets/LLamarada.svg"
import "./Signup.css"


const Signup = () => {
  return (
    <div className="contenedor">
      <div className="border">
          <img src={Llamarada} alt="LLamarada" />
          <h2>Crear Cuenta</h2>
          <Input
            textInput={"User"}
            textPlace={"User"}
          />

          <Input
            textInput={"Mail"}
            textPlace={"Mail"}
          />

          <Input
            textInput={"Password"}
            textPlace={"Password"}
          />
          <BotonRegistrar/>
    </div>
    </div>
    
  );
};

const BotonRegistrar=()=>{
  return(
    <button className="botonRegistrar">
      Registrar
    </button>
  )
}

type Props={textInput:string,textPlace:string}

const Input:FC<Props>=({textInput,textPlace})=>{
  return(
    <div className="input">
      <p>{textInput}</p>
      <input type="text" placeholder={textPlace}/>
    </div>
  );
}

export default Signup;
