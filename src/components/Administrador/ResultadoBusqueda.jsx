import Header from "../Administrador/HeaderAdministrador";
import BarraBusqueda from "./BarraBusqueda";
import CardTienda from "./CardTienda";
import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { buscarTiendas } from "../../services/Tiendas";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function ResultadosBusqueda() {
  const navigate = useNavigate();
  const { resultado } = useParams();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    async function mostrarResultadoBusqueda() {
      const data = await buscarTiendas(resultado);
      setResultados(data);
    }

    mostrarResultadoBusqueda();
  }, [resultados]);

  const regresar = () => {
    navigate(-1);
  };

  return (
    <>
      <section>
        <Header />
      </section>
      <main className="relative">
        <section className="mt-10">
          <NavLink onClick={regresar}>
            <BsFillArrowLeftCircleFill
              className="text-4xl ml-10"
              color={"D1AC00"}
            />
          </NavLink>
        </section>
        <section className="flex flex-row">
          <section className="absolute z-50">
            <BarraBusqueda
              placeholder="Buscar producto por nombre.."
              tipoBusqueda="producto"
            />
          </section>
        </section>

        {resultados ? (
          <section className="static mt-[80px]">
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
            <p className="text-[20px] text-black font-ralewayFont font-semibold">
              No se encontraron resultados para <strong>{resultado}</strong>
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default ResultadosBusqueda;
