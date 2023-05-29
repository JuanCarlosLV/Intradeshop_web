import Header from "../components/partials/Header";
import CardTienda from "./partials/CardTienda";
import Busqueda from "../components/partials/BarraBusqueda";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { getTiendas } from "../services/Tiendas";
import { useEffect, useState } from "react";

function Tiendas() {
  const [tiendas, setTiendas] = useState([]);

  useEffect(() => {
    async function mostrarTiendas() {
      const data = await getTiendas();
      setTiendas(data);
      console.log(data);
    }
    mostrarTiendas();
  }, []);

  return (
    <>
      <main className="relative">
        <Header />

        <section className=" flex flex-row mt-12 ">
          <div>
            <NavLink to="/">
              <AiFillHome
                className="text-[40px] mb-5 ml-[50px]"
                color="004643"
              />
            </NavLink>
          </div>
          <div className="absolute z-50 items-center flex ml-12 -mt-8 ">
            <Busqueda placeholder="Buscar por nombre" tipoBusqueda="producto" />
          </div>
        </section>

        <div className="static mt-[80px]">
          <h1 className="text-3xl font-ralewayFont font-semibold ml-[35px] ">
            Tiendas Asociadas
          </h1>

          <div className=" relative grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-5 ">
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
        </div>
      </main>
    </>
  );
}

export default Tiendas;
