import Header from "./Header";
import { AiFillHome } from "react-icons/ai";
import { IoMdOptions } from "react-icons/io";
import Busqueda from "./BarraBusqueda";
import CardProducto from "./CardProduct";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsCategory } from "../../services/Producto";

const opcionesFiltro = ["talla", "color", "precio", ""];

const categories = [
  {
    id: 1,
    name: "Playeras",
    img: "/src/images/categoriasImagenes/categoriaCamisa.png",
  },
  {
    id: 2,
    name: "Pantalones",
    img: "/src/images/categoriasImagenes/categoriaPantalones.png",
  },
  {
    id: 3,
    name: "Abrigos",
    img: "/src/images/categoriasImagenes/categoriaAbrigos.png",
  },
  {
    id: 4,
    name: "Zapatos",
    img: "/src/images/categoriasImagenes/categoriaZapatos.png",
  },
  {
    id: 5,
    name: "Vestidos",
    img: "/src/images/categoriasImagenes/categoriaVestidos.png",
  },
  {
    id: 6,
    name: "Blusas",
    img: "/src/images/categoriasImagenes/categoriaBlusas.png",
  },
  {
    id: 7,
    name: "Accesorios",
    img: "/src/images/categoriasImagenes/categoriaAccesorios.png",
  },
  {
    id: 8,
    name: "Ropa interior",
    img: "/src/images/categoriasImagenes/categoriaRopaInterior.png",
  },
  {
    id: 9,
    name: "Shorts",
    img: "/src/images/categoriasImagenes/categoriaShorts.png",
  },
];

function CategoriaProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [opcionSeleccionado, setOpcionSeleccionado] = useState("");
  const [imagenCategoria, setImagenCategoria] = useState("");
  const [productos, setProductos] = useState([]);

  const { nombreCategoria } = useParams();

  useEffect(() => {
    async function showProducts() {
      const data = await getProductsCategory(nombreCategoria);
      setProductos(data);
    }
    showProducts();
    getImageCategory(nombreCategoria);
  }, [nombreCategoria]);

  const handleOpcionElejida = (opcion) => {
    setOpcionSeleccionado(opcion);
  };

  const handleOpenButton = () => {
    setIsOpen((prev) => !prev);
  };
  const getImageCategory = (nombreCategoria) => {
    categories.map((categoriaName) => {
      if (nombreCategoria == categoriaName.name) {
        setImagenCategoria(categoriaName.img);
      }
    });
  };

  return (
    <>
      <main className="relative">
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
              src={imagenCategoria}
              alt={"img"}
              className="w-[180px] h-[160px] mr-10"
            ></img>
          </div>
        </div>

        <div className="flex flex-row ml-5 justify-between mr-10 absolute z-50 mb-[50px]">
          <div className="-ml-10 mr-10 ">
            <Busqueda
              placeholder="Buscar por nombre"
              tipoBusqueda="categoria"
              categoria={nombreCategoria}
            />
          </div>

          <button
            type="button"
            id="opciones-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={handleOpenButton}
            className="mr-[100px] h-1 mt-12 bg-black"
          >
            {isOpen ? (
              <>
                <section className="flex flex-col fixed -mt-[15px] -ml-[36px] mb-[10px]  ">
                  <div className="rounded-[5px] bg-[#004643] -ml-5 -mt-3 w-[130px] h-[45px] flex  flex-row items-center ">
                    <IoMdOptions
                      className="text-4xl mt-2 mb-3 ml-[10px]"
                      color="white"
                    />
                    <p className="ml-2 text-white font-ralewayFont font-semibold text-xl ">
                      Filtros
                    </p>
                  </div>

                  <div className="bg-[#004643] font-ralewayFont font-light text-[20px] text-white  w-[130px] -ml-[18px] rounded-[5px] rounded-t-none ">
                    <lu className="list-none">
                      <li className="hover:bg-white hover:text-[#004643]">
                        Talla
                      </li>
                      <li className="hover:bg-white hover:text-[#004643]">
                        Precio
                      </li>
                      <li className="hover:bg-white hover:text-[#004643]">
                        Valoracion
                      </li>
                    </lu>
                  </div>
                </section>
              </>
            ) : (
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
              </>
            )}
          </button>
        </div>

        {/* Despliegue de los productos */}

        <section className="static mt-[120px]">
          <h1 className="font-ralewayFont font-semibold text-[35px] ml-[100px]">
            Productos
          </h1>

          <div className=" ml-[100px] mr-8 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-5">
            {productos.map((product) => (
              <>
                <CardProducto
                  key={product.idProducto}
                  idProducto={product.idProducto}
                  rutaActual="/producto"
                  nombreProducto={product.nomProducto}
                  precio={product.precio}
                  imagenProducto={product.imagen}
                />
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default CategoriaProducts;
