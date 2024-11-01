import { faStar as StarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./CardTestimonio.css"



export const CardTestimonio = () => {
    return (
        <div className="cart--testimony">
            <img src="/user1.jpg" alt="" />
            <div>
                <div>
                    <div><FontAwesomeIcon icon={StarSolid} /></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt velit dolorem aut nam similique libero suscipit dolorum beatae odit dolores perspiciatis doloribus odio reiciendis rerum fugit assumenda, ipsa consequuntur. Laboriosam?</p>
                </div>
                <div>
                    <span><b>John Doe</b></span><br />
                    <span>12 de Agosto, 2024</span>
                </div>
            </div>
        </div>
    )
}
