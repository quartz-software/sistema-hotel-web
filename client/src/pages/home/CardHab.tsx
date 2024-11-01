import "./CardHab.css"


export const CardHab = () => {
    return (
        <div className="room--card">
            <img src="/room1.jpg" alt="" />
            <div className="room--card--info">
                <h2>Room 1</h2>
                <div>
                    <span>3 Personas</span>
                    <span>1 Cama Individual</span>
                    <span>1 Cama Doble</span>
                </div>
            </div>
        </div>
    )
}

