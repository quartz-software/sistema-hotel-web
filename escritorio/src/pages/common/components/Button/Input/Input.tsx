import { FC } from "react"

type Props={inpuType:string,placeText:string,setValue:Function,className:string}

const Input:FC<Props>=({inpuType,placeText,setValue,className}) =>{
    return(
    <input className={className}
            type={inpuType}
            placeholder={placeText}
            onInput={(e)=>{
                setValue(e.target.value)
            }}
            >
    </input>)
}
export default Input