import { faStar as StarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as StarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react";

import "./CardTestimonio.css"
type Props = {
    contenido: string;
    persona: string;
    fecha: string;
    estrellas: number;
};

// Formato de fecha 12 de Agosto, 2024

const CardTestimonio: FC<Props> = ({ contenido, persona, fecha, estrellas }) => {
    return (
        <div className="cart--testimony">
            <img src="/imgSN.jpg" alt="" />
            <div>
                <div>
                    <div>
                        {[...Array(5)].map((_, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={index < estrellas ? StarSolid : StarRegular}
                                className="star"
                            />
                        ))}
                    </div>
                    <p>{contenido}</p>
                </div>
                <div>
                    <span><b>{persona}</b></span><br />
                    <span>{fecha}</span>
                </div>
            </div>
        </div>
    )
}

export default CardTestimonio
