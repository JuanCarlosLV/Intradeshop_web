import Header from "./Header";
import { AiFillHome } from "react-icons/ai";
import { IoMdOptions } from "react-icons/io";
import Busqueda from "./BarraBusqueda";
import CardProducto from "./CardProduct";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { filtrarProducto } from "../../services/Producto";
import { ChromePicker } from "react-color";

const opcionesFiltro = ["talla", "color", "precio", ""];

const categories = [
  {
    id: 1,
    name: "Playeras",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaCamisa.png",
  },
  {
    id: 2,
    name: "Pantalones",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaPantalones.png",
  },
  {
    id: 3,
    name: "Abrigos",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaAbrigos.png",
  },
  {
    id: 4,
    name: "Zapatos",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaZapatos.png",
  },
  {
    id: 5,
    name: "Vestidos",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaVestidos.png",
  },
  {
    id: 6,
    name: "Blusas",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaBlusas.png",
  },
  {
    id: 7,
    name: "Accesorios",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaAccesorios.png",
  },
  {
    id: 8,
    name: "Ropa interior",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaRopaInterior.png",
  },
  {
    id: 9,
    name: "Shorts",
    img: "/Intradeshop_web/src/images/categoriasImagenes/categoriaShorts.png",
  },
];

function CategoriaProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const [opcionSeleccionado, setOpcionSeleccionado] = useState("");
  const [imagenCategoria, setImagenCategoria] = useState("");
  const [productos, setProductos] = useState([]);

  const { nombreCategoria } = useParams();
  const [criterioPrecio, setCriterioPrecio] = useState("menorPrecio");
  const [criterioColor, setCriterioColor] = useState(null);
  const [statePicker, setStatePicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  useEffect(() => {
    async function showProducts() {
      const data = await filtrarProducto(nombreCategoria, criterioPrecio, criterioColor);
      setProductos(data);
    }
    showProducts();
    getImageCategory(nombreCategoria);
  }, [nombreCategoria, criterioPrecio, criterioColor]);

  const handleOpcionElejida = (opcion) => {
    setOpcionSeleccionado(opcion);
  };

  const handleOpenButton = () => {
    setIsOpen((prev) => !prev);
  };
  const handleShowPicker = () => {
    setStatePicker(true);
  };
  const handleClosePicker = () => {
    setStatePicker(false);
  };
  const getImageCategory = (nombreCategoria) => {
    categories.map((categoriaName) => {
      if (nombreCategoria == categoriaName.name) {
        setImagenCategoria(categoriaName.img);
      }
    });
  };
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    setCriterioColor(color.hex); // Actualizar el estado criterioColor con el valor seleccionado
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

        </div>

        {/* Despliegue de los productos */}

        <section className="static mt-[120px]">
          <h1 className="font-ralewayFont font-semibold text-[35px] ml-[100px]">
            Productos
          </h1>
          <div>
            <select id="criterioUno" onChange={(evt) => setCriterioPrecio(evt.target.value)} className="ml-[1100px] mt-2 font-ralewayFont">
              <option value="mayorPrecio">Mayor precio</option>
              <option value="menorPrecio">Menor precio</option>
            </select>
            <span
              className="rounded-md border text-black outline-none hover:bg-gray-200 ml-[20px] py-3 px-10 font-ralewayFont"
              onMouseEnter={handleShowPicker}
              onClick={handleClosePicker}
            >
              Selecciona el color
            </span>
            {statePicker && (
              <ChromePicker
                id="color"
                name="color"
                color={selectedColor}
                onChange={handleColorChange}
                className="ml-[1200px] font-ralewayFont"
              />
            )}

          </div>

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
