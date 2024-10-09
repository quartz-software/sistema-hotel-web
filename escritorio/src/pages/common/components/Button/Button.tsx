import { EventHandler, FC } from "react"

type Props={text:string}

const Button:FC<Props>=({text,fun})=>{
    return(
      <button className="botonRegistrar" onClick={fun}>
        {text}
      </button>
    )
}
export default Button