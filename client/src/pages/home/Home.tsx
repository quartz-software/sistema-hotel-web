import { faBed, faComments, faStar as StarSolid, faHotel } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CardHab } from "./CardHab";
import { CardTestimonio } from "./CardTestimonio";


const Home = () => {
  return (
    <>
      <section className="home__section section--portada">
        <div className=" content--portada">
          <h1>Hotel Llamarada</h1>

          <div className="form--reserva">
            <div className="reserva--input">
              <label htmlFor="">Fecha ingreso:</label>
              <input type="date" />
            </div>
            <div className="reserva--input">
              <label htmlFor="">Fecha salida:</label>
              <input type="date" />
            </div>
            <div className="reserva--input">
              <label htmlFor="">Mayores:</label>
              <input type="text" />
            </div>
            <div className="reserva--input">
              <label htmlFor="">Menores:</label>
              <input type="text" />
            </div>
            <button className="btn--reservar">Reserva ahora</button>
          </div>


        </div>
      </section>

      <section className="home__section section--info">
        <FontAwesomeIcon icon={faHotel} />
        <div className="content--info content--home">
          <div>
            <div className="section--head">
              <span className="section--title">Calidez en cada estancia</span>
            </div>
            <p>¡Bienvenido a Llamarada! Aquí, la calidez de nuestro servicio hará de tu estancia una experiencia inolvidable. ¡Disfruta cada momento!</p>
            <p>Hotel Llamarada es un refugio contemporáneo en el corazón de la ciudad, rodeado de exuberantes jardines y una atmósfera de tranquilidad, donde cada rincón cuenta una historia de elegancia y tradición. Con un diseño que fusiona lo moderno con lo clásico, el hotel se erige como un homenaje al alma de la región, ofreciendo una experiencia única de hospitalidad y confort.
            </p>
          </div>
          <img src="/home.jpg" alt="" />
        </div>
      </section>

      <section className="home__section section--rooms">
        <div className="section--head">
          <FontAwesomeIcon icon={faBed} />
          <span className="section--title">Nuetras Habitaciones</span>
        </div>
        <div className="content--rooms">
          <CardHab />
          <CardHab />
          <CardHab />
        </div>
      </section>
      <section className="home__section section--testimonies">
        <div className="section--head">
          <FontAwesomeIcon icon={faComments} />
          <span className="section--title">Testimonios</span>
        </div>
        <div className="content--testimonies">
          <div>
            <CardTestimonio />
            <CardTestimonio />
            <CardTestimonio />
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
