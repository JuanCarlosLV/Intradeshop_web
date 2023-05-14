import { VscSearch } from "react-icons/vsc";
import { useEffect, useState } from "react";
import {
  buscarProductos,
  buscarProductosCategoria,
} from "../../services/Producto";
import { NavLink } from "react-router-dom";

function BarraBusqueda(props) {
  const [datoBuscar, setdatoBuscar] = useState("");
  const [sugerenciasBusqueda, setSugerenciasBusqueda] = useState([]);

  useEffect(() => {
    if (datoBuscar.length > 1) {
      async function mostrarProductos() {
        if (props.tipoBusqueda === "producto") {
          const data = await buscarProductos(datoBuscar);
          setSugerenciasBusqueda(data);
        } else if (props.tipoBusqueda === "categoria") {
          const data = await buscarProductosCategoria(
            datoBuscar,
            props.categoria
          );
          setSugerenciasBusqueda(data);
        }
      }
      mostrarProductos();
    } else {
      setSugerenciasBusqueda([]);
    }
  }, [datoBuscar]);

  const handleBuscar = (evt) => {
    setdatoBuscar(evt.target.value);
  };

  return (
    <>
      <div className=" mb-10 mt-8 w-[1200px] ml-[150px] ">
        <div className="flex flex-row items-center">
          <VscSearch
            className="text-3xl ml-[15px] mr-auto block absolute "
            color="#004643"
          />
          <input
            type="text"
            name="barrabusqueda"
            value={datoBuscar}
            onChange={handleBuscar}
            placeholder={props.placeholder}
            className="px-14  text-[#004643] text-xl w-[1200px] h-[50px] rounded-2xl border-b-[6px]  border-[#004643] focus:border-[#004643] focus:outline-none focus:ring-1 focus:ring-[#004643] font-ralewayFont   "
          />
        </div>
        {datoBuscar && (
          <div className="bg-[#004643] text-xl h-full left-2 text-white w-[1200px] rounded-[2px] font-ralewayFont border-[#004643] ">
            {sugerenciasBusqueda.map((resultado) => (
              <div>
                <NavLink to="/productos">
                  <div
                    key={resultado.idProducto}
                    className="hover:bg-white hover:text-[#004643] text-left "
                  >
                    {resultado.nomProducto}
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default BarraBusqueda;
