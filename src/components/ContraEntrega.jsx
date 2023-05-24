import Header from "../components/partials/Header";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { useState, useEffect } from "react";
import { supabase } from "../supabase/connection";
import { mostrarArticulos } from "../services/Carrito";

function ContraEntrega() {
  const [session, setSession] = useState(null);
  const [user, setuser] = useState("");
  const [productosCarrito, setproductosCarrito] = useState([]);
  const [total, settotal] = useState(0);
  const [cantidadProductos, setcantidadProductos] = useState(0);
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

        <section className="bg-[#D1AC00] rounded-[5px] flex flex-row items-center justify-center ml-[200px] mr-[200px] space-x-[150px] h-auto w-[1400px] mt-10">
          <section className="bg-white mt-5 rounded-[5px] items-center justify-center flex flex-col w-[300px] h-[300px] mb-6 font-ralewayFont ">
            <p className="font-bold text-[20px] mb-10">Resumen de compra</p>
            <p className="font-semibold text-[16px]" >Cantidad de productos: {cantidadProductos} </p>
            <p className="font-semibold text-[16px]">Total de compra: $ {total} mx</p>
          </section>
          <section className="bg-white mt-5 rounded-[5px] items-center  flex flex-col w-[700px] h-[300px] mb-6 font-ralewayFont ">
            <p className="font-bold text-[20px] mt-5">Lugares de entrega</p>
            
          </section>
        </section>

        <section className="flex items-center justify-end">
          <button className="rounded-[3px] bg-[#004643] flex justify-center items-center font-ralewayFont text-[23px] w-[230px] h-[46px] text-white hover:bg-[#014c48] mt-5 mr-[100px]">
            Pagar
          </button>
        </section>
      </main>
    </>
  );
}

export default ContraEntrega;
