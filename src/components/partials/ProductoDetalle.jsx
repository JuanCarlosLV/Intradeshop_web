import { NavLink, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useState, useEffect } from "react";
import {
  obtenerDetalleProducto,
  insertarACarrito,
  getImagenesProducto,
} from "../../services/Producto";

function ProductoDetalle() {
  const [isGeneratorOpen, setisGeneratorOpen] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [producto, setProducto] = useState("");
  const [imagenes, setimagenes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { idProducto } = useParams();

  const navigate = useNavigate();
  const regresar = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function getData() {
      const data = await obtenerDetalleProducto(idProducto);
      setProducto(data);
    }
    getData();
  }, [idProducto]);
  


  const handleOpenButton = () => {
    setisGeneratorOpen((prev) => !prev);
  };

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    setCantidad(cantidad - 1);
  };

  function handlePrevClick() {
    setCurrentIndex(currentIndex - 1);
  }

  function handleNextClick() {
    setCurrentIndex(currentIndex + 1);
  }

  const agregarCarrito = async () => {
    const data = await insertarACarrito(
      producto.idProduct,
      producto.nomProduct,
      cantidad,
      cantidad * producto.precio
    );
    if (data) {
      console.log(data);
    }
  };

  return (
    <>
      <Header />
      <div className="flow flow-col">
        <div className="mt-5 ml-5 w-[30px]">
          <NavLink onClick={regresar}>
            <BsArrowLeftCircleFill className="text-5xl" color="D1AC00" />
          </NavLink>
        </div>

        <div className="flex flex-row mt-7">
          {/* Area de generador de ropa */}

          <div className="flex flex-row ml-20">
            <aside className="bg-[#D1AC00] h-[480px] w-[320px] ml-10 flex flex-col">
              <button
                type="button"
                id="opciones-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={handleOpenButton}
              >
                {isGeneratorOpen ? (
                  <>
                    <div className="flex flex-col h-auto">
                      <div className="flex flex-row items-center h-[80px]">
                        <MdKeyboardArrowLeft
                          className="text-[70px] ml-auto mr-1 "
                          color="004643"
                        />
                        <h1 className="text-[18px] font-ralewayFont font-semibold mt.auto">
                          Generador de atuendo
                        </h1>
                        <button className="bg-[#004643] rounded-[10px] text-white font-ralewayFont w-[120px] h-[40px] mr-2">
                          Modificar
                        </button>
                      </div>
                      <div className="flex flex-col bg-black h-[500px] ">
                        <div className="flex flex-row"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <MdKeyboardArrowRight
                      className="text-[50px] ml-auto mr-1 mt-3 "
                      color="004643"
                    />
                    <h1 className="text-[26px] font-ralewayFont font-semibold text-black text-center mt-[250px] ">
                      GENERADOR DE ATUENDO
                    </h1>
                  </>
                )}
              </button>
            </aside>
            <div>
              
              <img
                src={producto.imagen}
                alt={producto.nomProducto}
                className="w-auto h-[450px] mt-5 bg-red-400"
              ></img>
            </div>

            <div className="flex flex-col ml-10 w-[600px] ">
              <h1 className="text-[30px] font-ralewayFont font-bold text-black">
                {producto.nomProducto}
              </h1>
              <p className="font-ralewayFont text-[20px] mt-[25px]">
                {producto.descripcion}
              </p>
              <p
                id="precio"
                className="font-ralewayFont font-semibold text-[25px] text-green-800 mb-5 mt-5"
              >
                $ {producto.precio}
              </p>

              <div className="rounded-[5px] bg-[#004643] flex flex-row h-[40px] items-center w-[330px]">
                <p className="font-ralewayFont text-white text-[20px] ml-[15px]">
                  Tallas
                </p>
                <div className="flex flex-row ml-5 space-x-[10px] ">
                  <button className="text-white text-[22px] font-ralewayFont hover:bg-black h-auto w-[50px]">
                    S
                  </button>
                  <button className="text-white text-[22px] font-ralewayFont hover:bg-black h-auto w-[50px]">
                    M
                  </button>
                  <button className="text-white text-[22px] font-ralewayFont hover:bg-black h-auto w-[50px]">
                    G
                  </button>
                  <button className="text-white text-[22px] font-ralewayFont hover:bg-black h-auto w-[50px]">
                    XG
                  </button>
                </div>
              </div>
              <br></br>
              <div className="rounded-[5px] bg-[#004643] flex flex-row h-[45px] items-center w-[230px]">
                <p className="font-ralewayFont text-white text-[20px] ml-[15px]">
                  Cantidad
                </p>
                <input
                  type="number"
                  disabled="true"
                  value={cantidad}
                  className="h-[28px] ml-4 w-[50px] rounded-[5px]"
                ></input>
                <div className="flex flex-col ml-6 space-y-[5px]">
                  <button
                    onClick={aumentarCantidad}
                    disabled={cantidad > producto.cantidad - 1 ?? true}
                    className="disabled:text-gray-500 text-[#D1AC00]"
                  >
                    <IoIosArrowDropupCircle />
                  </button>
                  <button
                    onClick={disminuirCantidad}
                    disabled={cantidad < 1 ?? true}
                    className="disabled:text-gray-500 text-[#D1AC00]"
                  >
                    <IoIosArrowDropdownCircle />
                  </button>
                </div>
              </div>

              <button className="bg-[#004643] text-[30px] font-ralewayFont text-white rounded-[5px] mt-10 w-[300px]">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>

        {/* carrusel de imagenes, todavia no funciona pq aun no hay imagenes
        <div className="flex flex-row ">
          <button
            className="mb-16 mr-5 rounded-full disabled:text-gray-500 text-[#004643]"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <IoIosArrowDropleftCircle className="text-5xl" />
          </button>
          <div className="carousel flex ml-10 ">
            {imagenes.slice(currentIndex, currentIndex +1).map((imagen) => (
              <>
                <div className="mt-2  carousel-item  mr-[50px]  rounded-3xl transform overflow-hidden    shadow-2xl duration-100 hover:scale-105 hover:shadow-lg">
                  <img
                    src={imagen.imagenUrl}
                    className="mr-2 ml-2 w-[200px] h-[200px]"
                  ></img>
                </div>
              </>
            ))}
          </div>
          <button
            className="mb-20 m-5 rounded-full disabled:text-gray-500 text-[#004643]"
            onClick={handleNextClick}
            disabled={currentIndex >= imagenes.length}
          >
            <IoIosArrowDroprightCircle
              aria-disabled="black"
              className="text-5xl  "
            />
          </button>
        </div>
        */}
      </div>
    </>
  );
}

export default ProductoDetalle;
