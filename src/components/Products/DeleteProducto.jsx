import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { eliminarProducto } from "../../services/Producto";
import DetailProducto from "../Products/DetailProducto";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function DeleteProducto() {
  const { id } = useParams();

  const navigateMisProductos = useNavigate();

  const handleDelete = () => {
    eliminarProducto(id);
    navigateMisProductos("/misproductos");
  };

  return (
    <>
      <div>
        <div className="flex justify-between my-4">
          <a href="/misproductos">
            <BsFillArrowLeftCircleFill
              className="text-4xl mt-2 ml-10"
              color={"D1AC00"}
            />
          </a>
          <h1 className="font-ralewayFont font-bold text-3xl  mt-2  ml-10 mr-auto">
            Eliminar producto
          </h1>
        </div>
        <DetailProducto />
        <div>
          <button
            className="hover:bg-black rounded-md bg-[#004643] py-3 px-10  font-semibold text-white  font-ralewayFont m-8 flex justify-center"
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteProducto;
