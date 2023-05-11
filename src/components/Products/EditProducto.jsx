import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getProducto, editarProducto } from "../../services/Producto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ConfirmacionAction from "../Modales/ConfirmacionAction";

function EditProducto() {
  const navigateMisProducts = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    cantidad: "",
    categoria: "",
    descripcion: "",
  });
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getProducto(id);
      setFormValues({
        nombre: data.nomProducto,
        precio: data.precio,
        imagen: data.imagen,
        cantidad: data.cantidad,
        categoria: data.categoria,
        descripcion: data.descripcion,
      });
    }
    getData();
  }, []);

  const handleInputChange = (evt) => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleEdit = async (evt) => {
    evt.preventDefault();
    editarProducto(
      id,
      formValues.nombre,
      formValues.precio,
      formValues.imagen,
      formValues.cantidad,
      formValues.categoria,
      formValues.descripcion
    );
    navigateMisProducts("/mis-productos");
  };
  const handleCloseModal = () => {
    setMostrarModal(false);
  };
  const handleShowModal = () => {
    setMostrarModal(true);
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
              name="nombre"
              value={formValues.nombre}
              onChange={handleInputChange}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            />
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Precio del producto
            </label>
            <input
              id="precio"
              name="precio"
              value={formValues.precio}
              onChange={handleInputChange}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            />

            <input
              type="file"
              id="imagen"
              name="imagen"
              value={formValues.imagen}
              onChange={handleInputChange}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-[#004643] focus:ring-2 focus:ring-[#004643] my-1"
            />
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Cantidad del producto
            </label>
            <input
              id="cantidad"
              name="cantidad"
              value={formValues.cantidad}
              onChange={handleInputChange}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            />
            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Categoria del producto
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formValues.categoria}
              onChange={handleInputChange}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            >
              <option value="Playeras">Playeras</option>
              <option value="Pantalones">Pantalones</option>
              <option value="Abrigos">Abrigos</option>
              <option value="Zapatos">Zapatos</option>
              <option value="Vestidos">Vestidos</option>
              <option value="Blusas">Blusas</option>
              <option value="Accesorios">Abrigos</option>
              <option value="RopaInterior">Ropa interior</option>
              <option value="Shorts">Shorts</option>
            </select>

            <label className="mb-3 block text-base text-left font-ralewayFont font-semibold my-1">
              Descripcion del producto
            </label>
            <input
              id="descripcion"
              name="descripcion"
              defaultValue={formValues.descripcion}
              onChange={handleInputChange}
              className="w-full rounded-md border  bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md  border-[#004643] focus:border-[#004643] focus:ring-2 focus:ring-[#004643] m-1"
            />
            <div className="px-96 ml-48 py-2">
              <button
                className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8"
                onClick={handleShowModal}
              >
                Modificar
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmacionAction
        mostrarModal={mostrarModal}
        titulo="Editar producto"
        cuerpo="¿Estás seguro de modificar la información?"
        cancelar={handleCloseModal}
        confirmar={handleEdit}
      />
    </>
  );
}

export default EditProducto;
