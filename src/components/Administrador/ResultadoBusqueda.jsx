import Header from "../Administrador/HeaderAdministrador";
import BarraBusqueda from './BarraBusqueda'
import CardTienda from "./CardTienda";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { buscarTiendas } from "../../services/Tiendas";

function ResultadosBusqueda() {
  const { resultado } = useParams();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    async function mostrarResultadoBusqueda() {
      const data = await buscarTiendas(resultado);
      setResultados(data);
      console.log(data);
    }

    mostrarResultadoBusqueda();
  }, [resultados]);

  return (
    <>
      <main className="relative">
        <section>
          <Header />
        </section>
        <section className="absolute z-50">
          <BarraBusqueda
            placeholder="Buscar producto por nombre.."
            tipoBusqueda="producto"
          />
        </section>
        {resultados ? (
          <section className="static mt-[110px]">
            <div className="flex flex-col">
              <h1 className="text-[#004643] text-[35px] font-ralewayFont font-medium ml-[100px]">
                Resultados para: <strong>{resultado}</strong>
              </h1>
              <section className=" ml-[100px] mr-8 grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
                {resultados.map((tienda) => (
                  <>
                    <CardTienda
                      key={tienda.idNegocio}
                      idNegocio={tienda.idNegocio}
                      nombreTienda={tienda.nomNegocio}
                      imagenTienda={tienda.logo}
                    />
                  </>
                ))}
              </section>
            </div>
          </section>
        ) : (
          <div className="bg-gray-400">
            <p></p>
          </div>
        )}
      </main>
    </>
  );
}

export default ResultadosBusqueda;
