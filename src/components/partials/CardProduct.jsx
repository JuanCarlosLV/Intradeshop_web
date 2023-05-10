import { NavLink } from "react-router-dom";
import Imgix from "react-imgix";

function CardProduct(props) {
  return (
    <>
      <div class=" mr-auto ml-auto mt-6  w-80 transform overflow-hidden rounded-e-lg bg-[#F6BE9A]  shadow-md duration-100 hover:scale-105 hover:shadow-lg text-center items-center flex flex-col">
        {/* aca iria imagen de buckets */}
        <img
          className="h-[250px] w-[200px] object-cover "
          src={props.imagenProducto}
          alt={props.nombreProducto}
        />
        <div class="">
          <h2 class="text-center text-[25px] font-ralewayFont font-semibold text-black ">
            {props.nombreProducto}
          </h2>
        </div>
        <div className="p-4 items-center space-y-2 flex flex-col ">
          <NavLink className="font-ralewayFont font-semibold text-white text-[20px] ml-5 rounded-[6px] w-[160px] h-[40px] items-center bg-[#004643]"
          to={`${props.idProducto}`}
          >
            Ver Producto
          </NavLink>
          <NavLink className="font-ralewayFont font-semibold text-white text-[20px] ml-5 rounded-[6px] w-[180px] h-[40px]  bg-[#004643]">
            Agregar al carrito
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default CardProduct;
