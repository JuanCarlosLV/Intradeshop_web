import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getProducto, editarProducto } from "../../services/Producto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function EditProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState();
  const [imagen, setImagen] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [producto, setProducto] = useState("");
  const navigateMisProducts = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const data = await getProducto(id);
      setProducto(data);
    }
    getData();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    editarProducto(
      id,
      nombre,
      precio,
      imagen,
      cantidad,
      categoria,
      descripcion
    );
    navigateMisProducts("/mis-productos");
  };

  return (
    <>
      <div>
        <div className="flex justify-between my-4">
          <NavLink to="/mis-productos">
            <BsFillArrowLeftCircleFill
              className="text-4xl mt-2 ml-10"
              color={"D1AC00"}
            />
          </NavLink>
          <h1 className="font-ralewayFont font-bold text-3xl  mt-2  ml-10 mr-auto">
            Editar producto
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <form onSubmit={handleEdit} className="max-w-lg">
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Nombre del producto
            </label>
            <input
              id="nombre"
              defaultValue={producto.nomProducto}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            />
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Precio del producto
            </label>
            <input
              id="precio"
              defaultValue={producto.precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            />

            <input
              type="file"
              id="imagen"
              onChange={(e) => setImagen(e.target.value)}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
            />
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Cantidad del producto
            </label>
            <input
              id="cantidad"
              defaultValue={producto.cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            />
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Categoria del producto
            </label>
            <select
              id="categoria"
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            >
              <option value="Camisas">Camisas</option>
              <option value="Playera">Playera</option>
              <option value="Pantalon">Pantalon</option>
              <option value="Zapatos">Zapatos</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Bolsos">Bolsos</option>
            </select>

            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Descripcion del producto
            </label>
            <input
              id="descripcion"
              defaultValue={producto.descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            />
            <div className="px-96 ml-48 py-2">
              <button className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8">
                Modificar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProducto;
