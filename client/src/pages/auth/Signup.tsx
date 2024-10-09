import { FC, useState } from "react";
import Llamarada from "./assets/LLamarada.svg"
import Input from "../common/Input/Input"
import Button from "../common/Button/Button"
import "./Signup.css"


const Signup = () => {
  //const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mail, setMail] = useState("")
  const[input,setInput]=useState(false)
  function enviar(){
    if(password!="" && mail!=""){
      
    }
  }
  return (
    <form className="contenedor">
      <div className="border">
          <img src={Llamarada} alt="LLamarada"/>
          <h2>Crear Cuenta</h2>

          <Input
            textInput={"Mail"}
            textPlace={"Mail"}
            setValue={setMail}
            inputType="text"
          />

          <Input
            textInput={"Password"}
            textPlace={"Password"}
            setValue={setPassword}
            inputType="password"
          />
          <Button
          text="Registarte"
          fun={enviar}
          />

          </div>
  </form>
    
  );
};
export default Signup;
