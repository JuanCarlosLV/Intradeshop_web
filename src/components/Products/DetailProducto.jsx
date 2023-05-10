import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducto } from "../../services/Producto";

function DetailProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    async function showData() {
      const data = await getProducto(id);
      setProducto(data);
    }
    showData();
  }, [id]);

  return (
    <>
      <div>
        <div className="flex justify-center items-center mt-8">
          {producto ? (
            <div className="w-1/2 h-64 max-w-full max-h-full">
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
                {producto.cantidad}
              </p>
              <p>{producto.imagen}</p>
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
      </div>
    </>
  );
}

export default DetailProducto;
