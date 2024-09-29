import { FC } from "react";

type Props={red:string}

const Redes:FC<Props>=({red})=>{
    return(
      <div>
        <a href="">
          <img src={red} alt="Google" />
        </a>
      </div>
    );
  }
  export default Redes;
  