import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListProducto } from "../../services/Producto";
import { VscSearch } from "react-icons/vsc";

function GetProducto() {
  const [nombre, setNombre] = useState("");
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function showData() {
      const data = await getListProducto(nombre);
      setProductos(data);
    }
    showData();
  }, [nombre]);

  const handleConsultar = (evt) => {
    setNombre(evt.target.value);
  };

  function handleNavigateEditar(idProducto) {
    navigate(`/mis-productos/editar/${idProducto}`);
  }
  const handleNavigateEliminar = (idProducto) => {
    navigate(`/mis-productos/eliminar/${idProducto}`);
  };
  const handleNavigateDetalle = (idProducto) => {
    navigate(`/mis-productos/detalle/${idProducto}`);
  };

  return (
    <>
          <main className="flex flex-col">
        <div className="flex flex-row items-center absolute ml-[200px] mt-10">
          <VscSearch
            className="text-3xl  ml-[135px] mr-auto block absolute "
            color="#004643"
          />
          <input
            id="barra de busqueda"
            placeholder="Buscar por nombre del producto"
            onChange={handleConsultar}
            className="px-14  text-[#004643] text-xl w-[900px] h-[50px] rounded-2xl border-b-[6px]  border-[#004643] focus:border-[#004643] focus:outline-none focus:ring-1 focus:ring-[#004643] font-ralewayFont ml-[120px] hover:bg-green-50"
          ></input>
        </div>

        <div className="relative overflow-x-auto sm:rounded-lg  mt-[140px]  mb-8 ml-[350px] mr-[200px] ">
          <table className="w-[1350px] text-sm text-left text-gray-700 dark:text-gray-400">
            <thead className="w-[1350px] text-xs text-gray-700 uppercase bg-[#D1AC00]  font-medium font-ralewayFont">
              <tr>
                <th scope="col" className="px-4 py-3 text-base text-center">
                  id
                </th>
                <th scope="col" className="px-4 py-3 text-base text-center">
                  nombre
                </th>
                <th scope="col" className="px-4 py-3 text-base text-center">
                  cantidad
                </th>
                <th scope="col" className="text-base text-center ">
                  Acciones
                </th>
                <th scope="col" className="text-base text-center ">
                </th>
                
                <th scope="col" className="text-base text-center ">
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr
                  key={producto.idProducto}
                  className="bg-gray-100 border-b dark:bg-white-800 dark:border-gray-700"
                >
                  <td className="px-4 py-3 text-base text-center font-medium font-ralewayFont">
                    {producto.idProducto}
                  </td>
                  <td className="px-4 py-3 text-base text-center font-medium font-ralewayFont">
                    {producto.nomProducto}
                  </td>
                  <td className="px-4 py-3 text-base text-center font-medium font-ralewayFont">
                    {producto.cantidadTotal}
                  </td>
                  <td className="px-4 py-3 text-base text-center font-medium font-ralewayFont">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2 py-1 text-base"
                      onClick={() => handleNavigateEditar(producto.idProducto)}
                    >
                      Editar
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline px-2 py-2 text-base font-ralewayFont"
                      onClick={() =>
                        handleNavigateEliminar(producto.idProducto)
                      }
                    >
                      Eliminar
                    </button>
                    <button
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline px-2 py-2 text-base font-ralewayFont"
                      onClick={() => handleNavigateDetalle(producto.idProducto)}
                    >
                      Detalle
                    </button>
                  </td>     
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default GetProducto;
