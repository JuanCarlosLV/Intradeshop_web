import DetailProducto from "../components/Products/DetailProducto";
import HeaderNegociante from "../components/Negocio/HeaderNegociante";
import { NavLink } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function DetalleProducto() {
  return (
    <>
      <HeaderNegociante />
      <div className="flex items-center  mt-5 mr-20">
        <NavLink to="/mis-productos">
          <BsFillArrowLeftCircleFill
            className="text-4xl mt-2 ml-10"
            color={"D1AC00"}
          />
        </NavLink>

        <h1 className="font-ralewayFont font-bold text-4xl text-white ml-20 mr-auto bg-[#004643]  border-[#004643] focus:border-[#004643] py-2 px-60 rounded-md">
          Detalle del producto
        </h1>
      </div>
      <DetailProducto />
    </>
  );
}
export default DetalleProducto;
