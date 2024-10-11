import Input from "../components/Button/Input/Input"
import "./FormField.css"
import { FC, useState } from "react"

type Props={title:string}

const FormField:FC<Props>=({title}) =>{
    const [Nombre, setNombre] = useState("");
    return(
        <div className="contenedor">
            <label className="contenedor__label">
                {title}
            </label>
            <Input
                inpuType="text"
                className="contenedor__input"
                setValue={setNombre}
                placeText="SET"
            />
            
        </div>
    )

}
export default FormField