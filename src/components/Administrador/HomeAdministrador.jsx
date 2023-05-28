import { useState, useEffect } from "react";
import Header from "../Administrador/HeaderAdministrador";
import CardProfile from "../Administrador/CardProfile";
import BarraBusqueda from "./BarraBusqueda";
import CardTienda from "../Administrador/CardTienda";
import { getTiendas, buscarTiendas } from "../../services/Tiendas";
function HomeAdministrador() {
  const [tiendas, setTiendas] = useState([]);
  const [resultadosBusqueda, setresultadosBusqueda] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    async function mostrarTiendas() {
      const data = await getTiendas();
      setTiendas(data);
      setresultadosBusqueda(data);
      console.log(data);
    }
    mostrarTiendas();
  }, []);



  return (
    <>
      <main className="">
        <Header />

        <section className="flex flex-col">
          <article className="">
            <CardProfile />
          </article>

          <header className="items-center mt-8 ml-[50px] mr-[50px] ">
            <h1 className="font-ralewayFont text-[30px] text-[#004643]">
              Tiendas Asociadas
            </h1>
            <hr className="border-[#D1AC00] border-y-2"></hr>
          </header>

          <article className="items-center">
            <BarraBusqueda placeholder="Buscar por nombre" />
          </article>

          <section className=" relative grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-5 mr-[50px] ml-[50px]">
            {tiendas.map((tienda) => (
              <CardTienda
                key={tienda.idNegocio}
                idNegocio={tienda.idNegocio}
                nombreTienda={tienda.nomNegocio}
                imagenTienda={tienda.logo}
              />
            ))}
          </section>
        </section>
      </main>
    </>
  );
}

export default HomeAdministrador;
