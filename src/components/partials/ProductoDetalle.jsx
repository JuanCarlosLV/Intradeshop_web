import { NavLink, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useState, useEffect } from "react";
import {
  obtenerProducto,
  obtenerDetalleProducto,
  getImagenesProducto,
} from "../../services/Producto";
import { insertarACarrito } from "../../services/Carrito";
import { supabase } from "../../supabase/connection";

function ProductoDetalle() {
  const [isGeneratorOpen, setisGeneratorOpen] = useState(false);
  const [producto, setProducto] = useState("");
  const [detalleProducto, setdetalleProducto] = useState([]);
  const [imagenes, setimagenes] = useState([]);
  const { idProducto } = useParams();
  const [cantidad, setcantidad] = useState(0);
  const [talla, settalla] = useState("");
  const [subtotal, setsubtotal] = useState(0.0);
  const [limiteCantidad, setLimiteCantidad] = useState(0);
  const [session, setSession] = useState(null);
  const [user, setuser] = useState("");

  const navigate = useNavigate();
  const regresar = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function getData() {
      const data = await obtenerProducto(idProducto);
      setProducto(data);
      console.log(producto);
    }
    async function getImagenes() {
      const data = await getImagenesProducto(idProducto);
      setimagenes(data);
    }
    async function getDetalleProducto() {
      const data = await obtenerDetalleProducto(idProducto);
      setdetalleProducto(data);
    }
    getData();
    getDetalleProducto();
    getImagenes();
  }, [idProducto]);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setuser(session.user.id);
    });
  }, []);

  const handleOpenButton = () => {
    setisGeneratorOpen((prev) => !prev);
  };

  const handleTallaChange = (evt) => {
    const selectedTalla = evt.target.value;

    const selectedDetalle = detalleProducto.find(
      (detalle) => detalle.talla === selectedTalla
    );
    console.log(selectedDetalle);

    settalla(selectedTalla);
    setcantidad(0);
    setLimiteCantidad(selectedDetalle.cantidad);
  };

  const aumentarCantidad = () => {
    if (cantidad < limiteCantidad) {
      setcantidad(cantidad + 1);
    }
  };

  const disminuirCantidad = () => {
    setcantidad(cantidad - 1);
  };

  const agregarCarrito = async (evt) => {
    if (session != null) {
      const data = await insertarACarrito(
        user,
        producto.idProducto,
        producto.imagen,
        producto.nomProducto,
        talla,
        cantidad,
        cantidad * producto.precio
      );
      if (data) {
        console.log(data);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <section className="flow flow-col ">
        <div className="mt-5 ml-5 w-[30px]">
          <NavLink onClick={regresar}>
            <BsArrowLeftCircleFill className="text-5xl" color="D1AC00" />
          </NavLink>
        </div>
        {/* area de producto */}
        <div className="flex flex-row mt-7 justify-center ">
          {/* Area de generador de ropa */}
          <div className="w-1/3 block">
            <aside className="bg-[#D1AC00] h-full w-auto mr-10 ml-5 flex flex-col ">
              <button
                type="button"
                id="opciones-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={handleOpenButton}
              ></button>
              {isGeneratorOpen ? (
                <>
                  <section className="flex flex-col h-auto absolute">
                    <div className="flex flex-row w-[452px] justify-between items-center">
                      <MdKeyboardArrowLeft
                        className="text-[50px] "
                        color="004643"
                        onClick={handleOpenButton}
                      />
                      <h2 className="text-[20px] font-ralewayFont font-semibold text-white">
                        Generador de ropa
                      </h2>
                      <button className="rounded-[5px] bg-[#004643] font-ralewayFont text-[20px] justify-center items-center w-[110px] mr-2 text-white">
                        Modificar
                      </button>
                    </div>
                    <div className="flex flex-col  bg-black w-auto h-full overflow-y-auto items-center">
                      {/* Aca estaran cada una de los productos del generador */}
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section className="">
                    <MdKeyboardArrowRight
                      className="text-[50px]  mt-3 "
                      color="004643"
                      onClick={handleOpenButton}
                    />
                    <h1 className="text-[26px] font-ralewayFont font-semibold text-black text-center mt-[20px] ">
                      GENERADOR DE ATUENDO
                    </h1>
                  </section>
                </>
              )}
            </aside>
          </div>
          {/* Area de iamgen ropa */}
          <div className="w-1/3  justify-center items-center block">
            <img
              id="imagen-seleccionada"
              src={producto.imagen}
              alt={producto.nomProducto}
              className="w-auto h-auto object-cover object-center mr-auto "
            ></img>
          </div>
          {/* Area de detalles de ropa */}
          <div className="block w-1/3 ">
            <div className="flex flex-col">
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
                $ {producto.precio}.00 mx
              </p>

              <div className="rounded-[5px] bg-[#004643] flex flex-row h-[40px] items-center w-[200px]">
                <p className="font-ralewayFont text-white text-[20px] ml-[15px]">
                  Tallas
                </p>
                <select
                  className="ml-6 outline-none text-[22px] text-center font-ralewayFont bg-black border-none justify-center items-center text-white w-[110px] rounded-[5px]"
                  value={talla}
                  onChange={handleTallaChange}
                >
                  {detalleProducto.map((detalle) => (
                    <>
                      <option
                        key={detalle.idDetalle}
                        className="text-white text-[22px] text-center font-ralewayFont bg-black hover:bg-[#004643]  h-auto w-[50px]"
                      >
                        {detalle.talla}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <br></br>
              <div className="rounded-[5px] bg-[#004643] flex flex-row h-[45px] items-center w-[230px]">
                <p className="font-ralewayFont text-white text-[20px] ml-[15px]">
                  Cantidad
                </p>
                <input
                  type="number"
                  value={cantidad}
                  disabled="true"
                  className="h-[28px] ml-4 w-[60px] rounded-[5px]"
                ></input>
                <div className="flex flex-col ml-6 space-y-[5px]">
                  <button
                    onClick={aumentarCantidad}
                    disabled={cantidad >= limiteCantidad ?? true}
                    className="disabled:text-gray-500 text-[#D1AC00]"
                  >
                    <IoIosArrowDropupCircle />
                  </button>
                  <button
                    onClick={disminuirCantidad}
                    disabled={cantidad <= 0 ?? true}
                    className="disabled:text-gray-500 text-[#D1AC00]"
                  >
                    <IoIosArrowDropdownCircle />
                  </button>
                </div>
              </div>

              <button
                className="bg-[#004643] text-[30px] font-ralewayFont text-white rounded-[5px] mt-10 w-[300px]"
                onClick={agregarCarrito}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>

        {/* carrusel de imagenes del producto*/}
        <div className="flex flex-row ">
          <div className="carousel flex ml-10  overflow-x-auto">
            {imagenes.map((imagen) => (
              <>
                <div className="mt-[100px] mb-[50px] static  carousel-item  mr-[50px]   overflow-hidden    shadow-2xl duration-100 hover:scale-105 hover:shadow-lg">
                  <img
                    src={imagen.urlimagen}
                    onClick={() => {
                      const imagenSeleccionada = imagen.urlimagen;
                      document.getElementById("imagen-seleccionada").src =
                        imagenSeleccionada;
                    }}
                    className="mr-2 ml-2 w-[200px] h-[200px]"
                  ></img>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductoDetalle;
