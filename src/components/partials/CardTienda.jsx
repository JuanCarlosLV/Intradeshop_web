import { NavLink, useNavigate } from "react-router-dom";

function CardTienda(props) {
  return (
    <>
      <section class=" mr-auto ml-auto mt-6  w-80 transform overflow-hidden rounded-e-lg bg-black  shadow-md duration-100 hover:scale-105 hover:shadow-lg text-center">
        <article className="flex justify-center items-center mt-5">
          <img
            className="w-[250px] h-[250px] object-center object-contain rounded-[5px] bg-black"
            src={props.imagenTienda}
            alt={props.nombreTienda}
          />
        </article>

        <div class="p-4">
          <h2 class="text-center text-[20px] font-ralewayFont font-semibold text-white ">
            {props.nombreTienda}
          </h2>
        </div>
        <div className="p-4 items-center flex flex-row bg-white rounded-lg w-[200px] h-[50px] mb-5 ml-auto mr-auto">
          <NavLink
            to={"/tiendas-asociadas/" + props.nombreTienda}
            className="font-ralewayFont font-semibold text-[#004643] text-2xl ml-5"
          >
            Ver Tienda
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default CardTienda;
