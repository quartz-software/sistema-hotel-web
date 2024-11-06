import { faBed, faComments, faHotel } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CardHab } from "./CardHab";
import CardTestimonio from "./CardTestimonio";

const testimonios = [
  {
    contenido: "Excelente servicio y habitaciones muy cómodas. Definitivamente volveremos.",
    persona: "Juan Pérez",
    fecha: "12 de Agosto, 2024",
    estrellas: 5
  },
  {
    contenido: "La vista desde la habitación era increíble. El personal muy amable.",
    persona: "María López",
    fecha: "23 de Septiembre, 2024",
    estrellas: 4
  },
  {
    contenido: "Buena ubicación, pero la limpieza podría mejorar.",
    persona: "Carlos Sánchez",
    fecha: "5 de Octubre, 2024",
    estrellas: 3
  },
  // Agrega más testimonios si es necesario
];



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
            {
              testimonios.map((testimonio, index) => {
                return (
                  <CardTestimonio
                    key={index}
                    contenido={testimonio.contenido}
                    persona={testimonio.persona}
                    fecha={testimonio.fecha}
                    estrellas={testimonio.estrellas}
                  />
                );
              })
            }
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
