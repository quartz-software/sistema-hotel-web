import { FC } from "react";


type Props={textInput:string,textPlace:string,setValue: Function,inputType:string}

const Input:FC<Props>=({textInput,textPlace,setValue,inputType})=>{
  return(
<div className="input">
      <p>{textInput}</p>
      <input onInput={(e)=>{
        setValue(e.target.value)
      }} type={inputType} placeholder={textPlace}/>
    </div>
  );
}

export default Input

