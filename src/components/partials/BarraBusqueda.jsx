import { VscSearch } from "react-icons/vsc";
import { useEffect, useState, useRef } from "react";
import {
  buscarProductos,
  buscarProductosCategoria,
} from "../../services/Producto";
import { buscarTiendas } from "../../services/Tiendas";
import { NavLink, useNavigate } from "react-router-dom";

function BarraBusqueda(props) {
  const navigate = useNavigate();

  const [datoBuscar, setdatoBuscar] = useState("");
  const [sugerenciasBusqueda, setSugerenciasBusqueda] = useState([]);
  const barraRef = useRef(null);

  useEffect(() => {
    if (datoBuscar.length > 1) {
      async function mostrarResultados() {
        if (props.tipoBusqueda === "producto") {
          const data = await buscarProductos(datoBuscar);
          setSugerenciasBusqueda(data);
        } else if (props.tipoBusqueda === "categoria") {
          const data = await buscarProductosCategoria(
            datoBuscar,
            props.categoria
          );
          setSugerenciasBusqueda(data);
        } else if (props.tipoBusqueda === "tienda") {
          const data = await buscarTiendas(datoBuscar);
          setSugerenciasBusqueda(data);
        }
      
      }
      mostrarResultados();
    } else {
      setSugerenciasBusqueda([]);
    }

    const cerrarBarraBusqueda = (evt) => {
      if (!barraRef.current.contains(evt.target)) {
        setdatoBuscar("");
        setSugerenciasBusqueda([]);
      }
    };
    document.addEventListener("mousedown", cerrarBarraBusqueda);
    return () => document.removeEventListener("mousedown", cerrarBarraBusqueda);
  }, [datoBuscar, barraRef]);

  const handleBuscar = (evt) => {
    setdatoBuscar(evt.target.value);
  };

  const handlePressEnterKey = (evt) => {
    if (evt.key === "Enter") {
      navigate("/search/" + datoBuscar);
    }
  };

  return (
    <>
      <main className=" mb-10 mt-8 w-[1200px] ml-[150px] " ref={barraRef}>
        <div className="flex flex-row items-center">
          <VscSearch
            className="text-3xl ml-[15px] mr-auto block absolute "
            color="#004643"
          />
          <input
            type="text"
            name="search"
            value={datoBuscar}
            onChange={handleBuscar}
            onKeyDown={handlePressEnterKey}
            placeholder={props.placeholder}
            className="px-14  text-[#004643] text-xl w-[1200px] h-[50px] rounded-2xl border-b-[6px]  border-[#004643] focus:border-[#004643] focus:outline-none focus:ring-1 focus:ring-[#004643] font-ralewayFont   "
          />
        </div>
        {datoBuscar && (
          <div className="bg-[#004643] text-xl h-full text-white w-[1200px] rounded-[2px] font-ralewayFont border-[#004643]  space-y-2 ">
            {sugerenciasBusqueda.map((resultado) => (
            
              <div>
                <NavLink to={props.tipoBusqueda === "producto" ? ("/producto/" + resultado.idProducto) : ("/tiendas-asociadas/"+ resultado.nomNegocio)}>
                  <div
                    key={resultado.idProducto || resultado.idNegocio}
                    className="hover:bg-white hover:text-[#004643] text-left "
                  >
                    {resultado.nomProducto || resultado.nomNegocio}
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default BarraBusqueda;
