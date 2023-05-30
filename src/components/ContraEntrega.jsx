import Header from "../components/partials/Header";
import Modal from '../components/Modales/ConfirmacionAction'
import ModalAviso from '../components/Modales/ModalAviso'
import { NavLink, useNavigate, Link } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { useState, useEffect } from "react";
import { supabase } from "../supabase/connection";
import {
  mostrarArticulos,
  mostrarDireccionesProducto,
} from "../services/Carrito";

import { procesoCompra, addDetalle } from "../services/Compra";

function ContraEntrega() {
  const [session, setSession] = useState(null);
  const [user, setuser] = useState("");
  const [productosCarrito, setproductosCarrito] = useState([]);
  const [direccionesProducto, setDireccionesProducto] = useState([]);
  const [total, settotal] = useState(0);
  const [cantidadProductos, setcantidadProductos] = useState(0);

  const [stateModal, setStateModal] = useState(false);

  const navigate = useNavigate();
  const regresar = () => {
    navigate(-1);
  };

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setuser(session.user.id);
    });
  }, []);

  useEffect(() => {
    if (user) {
      async function getItemsCarrito() {
        const data = await mostrarArticulos(user);
        
        setproductosCarrito(data);
      }
      getItemsCarrito();
    }
  }, [user]);

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

  useEffect(() => {
    if (productosCarrito.length > 0) {
      async function obtenerDirecciones() {
        const direcciones = await Promise.all(
          productosCarrito.map(async (producto) => {
            const direccion = await mostrarDireccionesProducto(
              producto.idProducto
            );
            return direccion;
          })
        );
        setDireccionesProducto(direcciones);
      }
      obtenerDirecciones();
    }
  }, [productosCarrito]);

  const realizarCompra = async (evt) => {
    evt.preventDefault();

    if (productosCarrito.length > 0) {
      const data = await procesoCompra(user, total, "proceso");
      console.log(data);
      if (data) {
        productosCarrito.map((producto) => {
          addDetalle(
            data,
            producto.idProducto,
            producto.nombreProducto,
            producto.cantidad,
            producto.tallaProducto,
            producto.subtotal,
            producto.imagenProducto
          );
        });
        console.log("agregado");
      } else {
        console.log("erorr");
      }
    }
  };

  const handleShowModal = (evt) => {
    evt.preventDefault();
    setStateModal(true);
  };
  const handleCloseModal = () => {
    setStateModal(false);
  };

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
              Contra Entrega
            </h1>
            <img
              src="/src/images/contra-entrega.png"
              alt="contra entrega"
              className="h-[45px] w-[45px] mt-5 ml-5"
            />
          </div>

          <div className="mr-16 mt-6 ml-auto">
            <Link to="/">
              <AiFillHome color="004643" className="text-4xl" />
            </Link>
          </div>
        </section>

        <section className="bg-[#D1AC00] rounded-[5px] flex flex-row items-center justify-start ml-[150px]  space-x-[100px] h-auto w-[1300px] mt-10">
          <section className="bg-white mt-5 rounded-[5px] items-center ml-[20px]  flex flex-col w-[300px] h-[300px] mb-6 font-ralewayFont ">
            <p className="font-bold text-[20px] mt-5 mb-10">
              Resumen de compra
            </p>
            <p className="font-semibold text-[16px]">
              Cantidad de productos: {cantidadProductos}{" "}
            </p>
            <p className="font-semibold text-[16px]">
              Total de compra: $ {total} mx
            </p>
          </section>
          <section className="bg-white mt-5 rounded-[5px] flex flex-col w-[800px] h-auto py-2 mb-6 font-ralewayFont ">
            <p className="font-bold text-[20px] mt-5 justify-start ml-8">
              Lugares de entrega
            </p>

            <section className="flex flex-row justify-between items-center mt-5 ml-8">
              <section className="font-ralewayFont">
                <h2 className="text-[20px] font-semibold">Productos</h2>
                {productosCarrito.map((producto) => (
                  <>
                    <h3 className="text-[18px] ">{producto.nombreProducto}</h3>
                  </>
                ))}
              </section>

              <section className=" font-ralewayFont mr-[160px]">
                  <h2 className="text-[20px] font-semibold ">Direcciones</h2>
                  {direccionesProducto.map((direcion) => (
                    <>
                      <h3 className="text-[18px] ">{direcion}</h3>
                    </>
                  ))}
                </section>
            </section>
          </section>
        </section>

        <section className="flex items-center justify-end">
          <button className="rounded-[3px] bg-[#004643] flex justify-center items-center font-ralewayFont text-[23px] w-[230px] h-[46px] text-white hover:bg-[#014c48] mt-5 mr-[100px]" onClick={handleShowModal}>
            Pagar
          </button>
        </section>

        <Modal  mostrarModal={stateModal} titulo={"Confirmar Compra"} cuerpo={"¿Estas seguro de realizar la compra?"} cancelar={handleCloseModal}
        confirmar={realizarCompra}/>
      </main>
    </>
  );
}

export default ContraEntrega;
