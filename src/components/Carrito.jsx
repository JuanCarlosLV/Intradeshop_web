import Header from "../components/partials/Header";
import Item from "./partials/ItemCarrito";

import { mostrarArticulos, eliminarProducto } from "../services/Carrito";

//prueba de compra
import { procesoCompra, addDetalle } from "../services/Compra";

import { useState, useEffect } from "react";
import { supabase } from "../supabase/connection";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill, BsFillCartFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

function Carrito() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [user, setuser] = useState("");
  const [productosCarrito, setproductosCarrito] = useState([]);
  const [total, settotal] = useState(0);

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setuser(session.user.id);
    });
  }, []);

  useEffect(() => {
    if (user !== "") {
      async function getItemsCarrito() {
        const data = await mostrarArticulos(user);
        setproductosCarrito(data);
      }
      getItemsCarrito();
    }
  }, [user]);

  useEffect(() => {
    if (productosCarrito.length > 0) {
      const costototal = productosCarrito.reduce(
        (total, producto) => total + producto.subtotal,
        0
      );
      settotal(costototal);
    } else {
      settotal(0);
    }
  }, [productosCarrito]);

  const regresar = () => {
    navigate(-1);
  };

  const añadirCompra = async (evt) => {
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

  return (
    <>
      <Header />
      <div className="flex flex-row items-center">
        <NavLink onClick={regresar}>
          <BsArrowLeftCircleFill
            className="text-4xl ml-10 mt-62"
            color="D1AC00"
          />
        </NavLink>
        <div className="flex flex-row">
          <h1 className="mt-6 font-ralewayFont font-semibold text-4xl ml-16">
            Carrito de Compras
          </h1>
          <BsFillCartFill className="mt-6 text-4xl ml-10" color="004643" />
        </div>

        <div className="mr-16 mt-6 ml-auto">
          <Link to="/">
            <AiFillHome color="004643" className="text-4xl" />
          </Link>
        </div>
      </div>

      {session != null ? (
        <>
          <section className="flex flex-col mt-5">
            <article className="ml-7 mb-5">
              <h1 className="font-ralewayFont font-semibold text-3xl">
                Productos
              </h1>
            </article>
            {productosCarrito.map((item) => (
              <>
                <section className="flex flex-col">
                  <Item
                    idproducto={item.idProducto}
                    imagen={item.imagenProducto}
                    nombreProducto={item.nombreProducto}
                    cantidad={item.cantidad}
                    talla={item.tallaProducto}
                    subtotal={item.subtotal}
                    idcliente={user}
                  />
                </section>
              </>
            ))}

            <section className="bg-[#FAF4D3] flex flex-row mb-4 justify-end mr-7 ml-[28px] items-center h-[60px]">
              <p className="font-ralewayFont font-semibold text-[23px] mr-5">
                Total de compra: <strong>$ {total} mx</strong>
              </p>
            </section>
          </section>
          <section className="flex flex-row mb-5 justify-end mr-7">
            <NavLink
              to="/proceso-pago"
              className="rounded-[3px] bg-[#004643] flex justify-center items-center font-ralewayFont text-[23px] w-[230px] h-[46px] text-white hover:bg-[#014c48]"
            >
              Procesar compra
            </NavLink>
          </section>
        </>
      ) : (
        <>
          <div className="mt-[100px] w-[800px] h-[300px] flex flex- justify-center bg-[#F6BE9A] rounded-[30px] mr-auto ml-auto">
            <div className="mt-20 mr-10">
              <RiErrorWarningFill color="white" className="text-7xl" />
            </div>
            <div className="mt-20">
              <h1 className="font-ralewayFont font-bold text-black  text-center text-3xl">
                No puedes visualizar el carrito de compras <br></br>Tienes que
                iniciar sesión
              </h1>

              <div className="bg-white rounded-[9px] h-[50px] w-[250px] flex flex-col mr-auto ml-auto mt-10 justify-center hover:bg-black hover:text-white">
                <NavLink
                  to="/login"
                  className="text-3xl font-ralewayFont font-semibold text-center"
                >
                  {" "}
                  Iniciar Sesión{" "}
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Carrito;
