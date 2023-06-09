import DetailProducto from "../components/Products/DetailProducto";
import HeaderNegociante from "../components/Negocio/HeaderNegociante";
import { NavLink } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function DetalleProducto() {
  return (
    <>
      <HeaderNegociante />
      <div className="flex justify-between my-4">
        <NavLink to="/mis-productos">
          <BsFillArrowLeftCircleFill
            className="text-4xl mt-2 ml-10"
            color={"D1AC00"}
          />
        </NavLink>
        <h1 className="font-ralewayFont font-bold text-3xl  mt-2  ml-10 mr-auto">
          Detalle producto
        </h1>
      </div>
      <DetailProducto />
    </>
  );
}
export default DetalleProducto;
