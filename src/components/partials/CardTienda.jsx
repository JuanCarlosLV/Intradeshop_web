import { NavLink, useNavigate } from "react-router-dom";

function CardTienda(props) {
  const navigate = useNavigate();
  const handleVerTienda = () => {
    navigate(`/tiendas-asociadas/${props.nombreTienda}`);
  };

  return (
    <>
      <section class=" mr-auto ml-auto mt-6  w-80 transform overflow-hidden rounded-e-lg bg-[#FAF4D3]  shadow-md duration-100 hover:scale-105 hover:shadow-lg text-center">
        <article className="justify-center items-center mr-3 ml-3 mt-4 rounded-[5px]">
          <img
            className="w-[280px object-cover object-center rounded-[5px]"
            src={props.imagenTienda}
            alt={props.nombreTienda}
          />
        </article>

        <div class="p-4">
          <h2 class="text-center text-[30px] font-ralewayFont font-semibold text-black ">
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
