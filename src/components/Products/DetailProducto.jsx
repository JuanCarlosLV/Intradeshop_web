import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducto } from "../../services/Producto";

function DetailProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState([]);
  useEffect(() => {
    async function showData() {
      const data = await getProducto(id);
      setProducto(data);
    }
    showData();
  }, [id]);

  return (
    <>
      <div className="flex items-center mt-10">
        {producto ? (
          <div className="top-1 left-60 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto p-4 ml-80">
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1 ">
              Nombre del producto
            </label>
            <p className="w-full rounded-md border bg-gray-200 py-3 px-6 font-medium text-black outline-none focus:shadow-md font-ralewayFont text-sm md:text-base lg:text-lg ">
              {producto.nomProducto}
            </p>
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Precio del producto
            </label>
            <p className="w-full rounded-md border bg-gray-200 py-3 px-6 font-medium text-black outline-none focus:shadow-md font-ralewayFont text-sm md:text-base lg:text-lg">
              {producto.precio}
            </p>
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Cantidad del producto
            </label>
            <p className="w-full rounded-md border bg-gray-200 py-3 px-6 font-medium text-black outline-none focus:shadow-md font-ralewayFont text-sm md:text-base lg:text-lg">
              {producto.cantidadTotal}
            </p>
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Descripcion del producto
            </label>
            <p className="w-full rounded-md border bg-gray-200 py-3 px-6 font-medium text-black outline-none focus:shadow-md font-ralewayFont text-sm md:text-base lg:text-lg">
              {producto.descripcion}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="shadow-md rounded-md top-40 left-60 mx-auto p-1 ml-60">
        <img
          src={producto.imagen}
          className="object-contain float-left mr-4 shadow-md rounded-md h-64 w-3/12"
          alt={producto.nomProducto}
        />
      </div>
    </>
  );
}

export default DetailProducto;
