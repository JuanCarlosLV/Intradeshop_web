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
      <div >
        <div className="flex flex-row">
          <div className="w-3/6 ml-40 mt-10">
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Nombre del producto
            </label>
            <p className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]">
              {producto.nomProducto}
            </p>
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Precio del producto
            </label>
            <p className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]">
              {producto.precio}
            </p>
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Cantidad del producto
            </label>
            <p className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]">
              {producto.cantidadTotal}
            </p>
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Descripcion del producto
            </label>
            <p className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643]">
              {producto.descripcion}
            </p>
          </div>

          <div className="mt-20 ml-40 w-auto h-auto rounded-r-md shadow-lg">
            <img
              src={producto.imagen}
              className="w-80 h-80 object-cover bg-center rounded-r-md rounded-md"
              alt={producto.nomProducto}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProducto;
