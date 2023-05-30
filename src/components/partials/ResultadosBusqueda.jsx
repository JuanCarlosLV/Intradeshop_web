import React from "react";
import Header from "./Header";
import BarraBusqueda from "./BarraBusqueda";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { buscarProductos } from "../../services/Producto";
import CardProducto from "../partials/CardProduct";
import { BsArrowLeftCircleFill } from "react-icons/bs";

function ResultadosBusqueda() {
  const { resultado } = useParams();
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function mostrarResultadoBusqueda() {
      const data = await buscarProductos(resultado);
      setResultados(data);
    }

    mostrarResultadoBusqueda();
  }, [resultados]);

  const regresar = () => {
    navigate(-1);
  };

  return (
    <>
      <main className="relative">
        <section>
          <Header />
        </section>

        <section className="absolute z-50 flex flex-row">
          <NavLink onClick={regresar}>
            <BsArrowLeftCircleFill
              className="text-4xl ml-10 mt-[38px]"
              color="D1AC00"
            />
          </NavLink>

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
                {resultados.map((product) => (
                  <>
                    <CardProducto
                      key={product.idProducto}
                      idProducto={product.idProducto}
                      rutaActual="/producto"
                      nombreProducto={product.nomProducto}
                      precio={product.precio}
                      imagenProducto={product.imagen}
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
