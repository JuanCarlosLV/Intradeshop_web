import { NavLink } from "react-router-dom";

function CardProduct(props) {
  return (
    <>
      <div className=" mr-auto ml-auto mt-6  w-80 transform overflow-hidden rounded-e-lg bg-[#F6BE9A]  shadow-md duration-100 hover:scale-105 hover:shadow-lg text-center items-center flex flex-col">
        {/* aca iria imagen de buckets */}

        <img
          className="h-[224px] w-[224px] object-cover object-center mt-6 rounded-sm"
          src={props.imagenProducto}
          alt={props.nombreProducto}
        ></img>

        <div className="">
          <h2 className="text-center text-[25px] font-ralewayFont font-semibold text-black ">
            {props.nombreProducto}
          </h2>
          <h2 className="text-center text-[25px] font-ralewayFont font-semibold text-[#004643] ">
            {"$ " + props.precio}
          </h2>
        </div>
        <div className="p-4 items-center  space-y-2 flex flex-col ">
          <NavLink
            className="font-ralewayFont font-semibold text-white text-[20px] ml-5 rounded-[6px] w-[160px] h-[40px]  bg-[#004643] "
            to={`${props.rutaActual + "/" + props.idProducto}`}
          >
            Ver Producto
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default CardProduct;
