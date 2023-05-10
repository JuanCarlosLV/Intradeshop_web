import { Button } from "flowbite-react";
import GetProducto from "../components/Products/GetProducto";
import { useNavigate } from "react-router-dom";
import SidebarNegociante from "../components/Negocio/SidebarNegociante";
import HeaderNegociante from "../components/Negocio/HeaderNegociante";

function MisProductos() {
  const navigateNewProduct = useNavigate();
  const handleNewProduct = () => {
    navigateNewProduct("nuevoproducto");
  };
  return (
    <>
    <HeaderNegociante/>
    <SidebarNegociante/>
    <div className="">
      <div className="absolute top-50 right-0 m-4">
        <button
          className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-4"
          onClick={handleNewProduct}
        >
          Nuevo Producto
        </button>
      </div>
      <GetProducto />
      </div>
    </>
  );
}
export default MisProductos;
