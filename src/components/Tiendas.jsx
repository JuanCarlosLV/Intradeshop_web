import Header from "../components/partials/Header";
import CardTienda from "./partials/CardTienda";
import Busqueda from "../components/partials/BarraBusqueda";
import HeaderCliente from "../components/Cliente/HeaderCliente";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { getTiendas } from "../services/Tiendas";
import { useEffect, useState } from "react";


function Tiendas() {
  const [tiendas, setTiendas] = useState([]);

  useEffect(()=>{
    async function mostrarTiendas() {
      const data = await getTiendas();
      setTiendas(data);
      console.log(data);
    }
    mostrarTiendas()
  },[])

  return (
    <>
      <Header />

      <div className=" flex flex-row items-center mb-[20px]">
        <div className="-mt-5 ml-10">
          <NavLink to="/">
            <AiFillHome className="text-[40px]" color="004643" />
          </NavLink>
        </div>

        <div className="ml-2 mr-10 ">
          <form>
            <Busqueda placeholder="Buscar por nombre"/>
          </form>
        </div>
      </div>
 
      <div className="">
        <h1 className="text-3xl font-ralewayFont font-semibold ml-[35px] mt-3">
          Tiendas Asociadas
        </h1>
      </div>

      {/* Aqui estarian las cards de tiendas */}

      <div className=" relative grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tiendas.map((tienda) => (
          <>
            <CardTienda
              key={tienda.idNegocio}
              nombreTienda={tienda.nomNegocio}
              imagenTienda={tienda.logo}
            />
          </>
        ))}
      </div>
    </>
  );
}

export default Tiendas;
