import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { eliminarProducto, eliminarImgProducto } from "../../services/Producto";
import DetailProducto from "../Products/DetailProducto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ConfirmacionAction from "../Modales/ConfirmacionAction";
import { useState } from "react";

function DeleteProducto() {
  const { id } = useParams();

  const navigateMisProductos = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleDelete = async () => {
    try {
      await eliminarImgProducto(id);
      await eliminarProducto(id);
      navigateMisProductos("/mis-productos");
    } catch (error) {
      console.error(error);
    }
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
        <div className="flex items-center  mt-5 mr-20 ">
          <NavLink to="/mis-productos">
            <BsFillArrowLeftCircleFill
              className="text-4xl mt-2 ml-10"
              color={"D1AC00"}
            />
          </NavLink>
          <h1 className="font-ralewayFont font-bold text-4xl text-white ml-20 mr-auto bg-[#004643]  border-[#004643] focus:border-[#004643] py-2 px-60 rounded-md">
            Eliminar producto
          </h1>
        </div>
        <DetailProducto />
        <div className="flex flex-row">
          <div className="w-3/6 ml-40 mt-10">
            <div className="px-96 ml-40 py-2">
              <button
                className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8"
                onClick={handleShowModal}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmacionAction
        mostrarModal={mostrarModal}
        titulo="Eliminar producto"
        cuerpo="¿Estás seguro de eliminar el producto?"
        cancelar={handleCloseModal}
        confirmar={handleDelete}
      />
    </>
  );
}

export default DeleteProducto;
