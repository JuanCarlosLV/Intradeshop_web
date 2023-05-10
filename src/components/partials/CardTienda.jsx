import { NavLink, useNavigate } from "react-router-dom";

function CardTienda(props) {
  const navigate = useNavigate();
  const handleVerTienda = (nombreTienda) => {
    navigate(`/tiendas-asociadas/${nombreTienda}`);
  };

  return (
    <>
      <div class=" mr-auto ml-auto mt-6  w-80 transform overflow-hidden rounded-e-lg bg-[#FAF4D3]  shadow-md duration-100 hover:scale-105 hover:shadow-lg text-center">
        {/* aca iria imagen de buckets */}
        <img
          class="h-48 w-full object-cover object-center"
          src={props.imagenTienda}
          alt={props.nombreTienda}
        />
        <div class="p-4">
          <h2 class="text-center text-[30px] font-ralewayFont font-semibold text-black ">
            {props.nombreTienda}
          </h2>
        </div>
        <div className="p-4 items-center flex flex-row bg-white rounded-lg w-[200px] h-[50px] mb-5 ml-auto mr-auto">
          <NavLink
            to="intrade"
            className="font-ralewayFont font-semibold text-[#004643] text-2xl ml-5"
          >
            Ver Tienda
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default CardTienda;
