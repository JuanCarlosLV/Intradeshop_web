import Header from "./Header";
import { AiFillHome } from "react-icons/ai";
import { IoMdOptions } from "react-icons/io";
import Busqueda from "./BarraBusqueda";
import CardProducto from "./CardProduct";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsCategory } from "../../services/Producto";

const opcionesFiltro = ["talla", "color", "precio", ""];

function CategoriaProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [opcionSeleccionado, setOpcionSeleccionado] = useState("");
  const [productos, setProductos] = useState([]);

 const {nombreCategoria} = useParams()
 const datoCategoria = useParams()
 

  useEffect(() => {
    async function showProducts() {
      const data = await getProductsCategory(nombreCategoria);            
      setProductos(data);
      console.log(data)
    }
    showProducts()
   
  }, [nombreCategoria]);

  const handleOpcionElejida = (opcion) => {
    setOpcionSeleccionado(opcion);
  };

  const handleOpenButton = () => {
    setIsOpen((prev) => !prev);
    
  };

  return (
    <>
      <Header />
      <div className=" flex flex-row items-center mb-[20px]">
        <div className="-mt-5 ml-5">
          <NavLink to="/">
            <AiFillHome className="text-[40px]" color="004643" />
          </NavLink>
        </div>

        <div className="bg-[#F6BE9A] flex flex-row rounded-[10px] mt-5 justify-between w-full mr-10 ml-10 items-center h-[200px]">
          <h1 className="font-ralewayFont font-bold ml-12 text-[45px]">
            {nombreCategoria}
          </h1>
          <img
            src="/src/images/categoriasImagenes/categoriaAbrigos.png"
            className="w-[180px] h-[160px] mr-10"
          ></img>
        </div>
      </div>

      <div className="flex flex-row ml-5 justify-between mr-10">
        <div className="-ml-10 mr-10 ">
          <form>
            <Busqueda />
          </form>
        </div>

        <button
          type="button"
          id="opciones-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={handleOpenButton}
          className="mr-[100px]"
        >
          {isOpen ? (
            <>
              <div className="rounded-[5px] bg-[#004643] -ml-5 -mt-3 w-[130px] h-[45px] flex  flex-row items-center ">
                <IoMdOptions
                  className="text-4xl mt-2 mb-3 ml-[10px]"
                  color="white"
                />
                <p className="ml-2 text-white font-ralewayFont font-semibold text-xl ">
                  Filtros
                </p>
              </div>

              <div className="bg-[#004643] relative flex flex-col ">
                <ul>
                  <li>Talla</li>
                  <li>Precio</li>
                  <li>Valoracion</li>
                </ul>
              </div>
              {/* <div className="bg-[#004643] mt-10 flex flex-col">
                {opcionesFiltro.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOpcionElejida(option)}
                    className={`${
                      opcionSeleccionado === option
                        ? "bg-[#004643]"
                        : "hover:bg-white hover:text-[#004643]"
                    }  text-sm text-white  text-left font-ralewayFont font-semibold ` }
                    role="menuitem"
                  >
                    {option}
                  </button>
                ))}
              </div>*/}
            </>
          ) : (
            <>
              <IoMdOptions className="text-4xl mb-3" color="004643" />
            </>
          )}
        </button>
      </div>

      {/* Despliegue de los productos */}

      <div>
        <h1 className="font-ralewayFont font-semibold text-[35px] ml-[100px]">Productos</h1>
      </div>
      

      <div className=" ml-[100px] mr-8 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos.map((product) => (
          <>
            <CardProducto
              key={product.idProducto}
              idProducto = {product.idProducto}
              nombreProducto={product.nomProducto}
              imagenProducto={product.imagen}
            />
          </>
        ))}
      </div>
    </>
  );
}

export default CategoriaProducts;
