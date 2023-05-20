import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { eliminarProducto, getDeleteUrlImg } from "../../services/Producto";
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
      await eliminarProducto(id);
      await getDeleteUrlImg(id);
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
        <div className="flex justify-between my-4">
          <NavLink to="/mis-productos">
            <BsFillArrowLeftCircleFill
              className="text-4xl mt-2 ml-10"
              color={"D1AC00"}
            />
          </NavLink>
          <h1 className="font-ralewayFont font-bold text-3xl  mt-2  ml-10 mr-auto">
            Eliminar producto
          </h1>
        </div>
        <DetailProducto />
        <div>
          <button
            className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8 flex justify-center"
            onClick={handleShowModal}
          >
            Eliminar
          </button>
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
