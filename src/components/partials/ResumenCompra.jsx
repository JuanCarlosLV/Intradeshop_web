import Header from "../partials/Header";
import { supabase } from "../../supabase/connection";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { useState, useEffect, useContext } from "react";
import { mostrarArticulos } from "../../services/Carrito";

function ResumenCompra() {
  const [productosCarrito, setproductosCarrito] = useState([]);
  const [total, settotal] = useState(0);
  const [cantidadProductos, setcantidadProductos] = useState(0);
  const navigate = useNavigate();
  const regresar = () => {
    navigate(-1);
  };

  const [session, setSession] = useState(null);
  const [idusuario, setIdUsuario] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session?.user?.id) {
        setIdUsuario(session.user.id);
      }
    });
  }, []);

  useEffect(() => {
    if (idusuario) {
      async function getItemsCarrito() {
        const data = await mostrarArticulos(idusuario);
        setproductosCarrito(data);
      }
      getItemsCarrito();
    }
  }, [idusuario]);

  useEffect(() => {
    if (productosCarrito.length > 0) {
      const cantidadTotal = productosCarrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
      );
      const costoTotal = productosCarrito.reduce(
        (total, producto) => total + producto.subtotal,
        0
      );
      setcantidadProductos(cantidadTotal);
      settotal(costoTotal);
    } else {
      settotal(0);
    }
  }, [productosCarrito]);

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="flex flex-row items-center">
          <NavLink onClick={regresar}>
            <BsArrowLeftCircleFill
              className="text-4xl ml-10 mt-[25px]"
              color="D1AC00"
            />
          </NavLink>
          <div className="flex flex-row">
            <h1 className="mt-6 font-ralewayFont font-semibold text-4xl ml-16">
              Opciones de Pago
            </h1>
            <MdPayments className="mt-6 text-4xl ml-10" color="004643" />
          </div>

          <div className="mr-16 mt-6 ml-auto">
            <Link to="/">
              <AiFillHome color="004643" className="text-4xl" />
            </Link>
          </div>
        </section>

        <section className="flex flex-col mt-12 items-center">
          <section className="bg-[#D1AC00] mr-auto ml-[150px] w-[1200px] rounded-[5px] ">
            <p className="font-ralewayFont font-bold mt-6 ml-10">
              Resúmen de compra
            </p>
            <div className="flex flex-row font-ralewayFont justify-between mt-5 mb-5 ml-10 mr-10">
              <p>Cantidad de productos: {cantidadProductos} </p>
              <p>Total de compra: $ {total} mx</p>
            </div>
          </section>
          <section className="bg-[#D1AC00] ml-[150px] mr-auto mt-10 w-[1200px] rounded-[5px] justify-center items-center">
            <p className="font-ralewayFont font-bold mt-6 ml-10">
              Selecciona método de pago
            </p>
            <section className="flex flex-row font-ralewayFont justify-center items-center space-x-[300px] mt-7 mb-6">
              <button
                className="bg-black rounded-[5px] disabled:bg-gray-500 items-center justify-center flex flex-col w-[250px] h-[120px]"
                disabled="true"
              >
                <p className="text-gray-200">Transferencia Electrónica</p>
                <img
                  src="/src/images/transferenica.png"
                  alt="metodo de pago transferenica"
                  title="metodo de pago transferenica"
                  className="mt-3"
                ></img>
              </button>
              <NavLink
                className="bg-black rounded-[5px]  items-center justify-center flex flex-col w-[250px] h-[120px] hover:bg-gray-900"
                to="/contra-entrega"
              >
                <p className="text-white disabled:text-red-600">
                  Contra-Entrega
                </p>

                <img
                  src="/src/images/contra-reembolso.png"
                  alt="contra entrega"
                  className="h-[70px] w-[70px] mt-2"
                />
              </NavLink>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

export default ResumenCompra;
