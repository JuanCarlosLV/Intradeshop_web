import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modales/ModalAviso";
import { eliminarProducto } from "../../services/Carrito";
function ItemCarrito(props) {
  let eliminado;
  const [mostrarModal, setmostrarModal] = useState(false);
  const eliminarItem = async () => {
    const { data, error } = await eliminarProducto(
      props.idproducto,
      props.idcliente,
      props.talla
    );
    console.log(data)
    setmostrarModal(true);

    if (data) {
      eliminado = true;
    } else {
      eliminado = false;
    }
  };

  const cerrarModal = () => {
    setmostrarModal(false);
  };

  return (
    <>
      <section className="flex flex-row  items-center rounded-[5px] mr-[30px] ml-[30px] h-auto mb-5  bg-[#D1AC00]">
        <article className="w-[200px] h-auto justify-center items-center">
          <Link to={`/producto/${props.idproducto}`}>
            <img
              src={props.imagen}
              alt="imagen producto"
              className=" w-[130px] h-[140px]"
            />
          </Link>
        </article>
        <article className="w-1/5">
          <h2 className="font-ralewayFont text-[20px] text-white">
            {props.nombreProducto}
          </h2>
        </article>
        <article className="w-1/5 flex flex-row items-center ml-10">
          <label className="font-ralewayFont text-[20px] text-white">
            Cantidad
          </label>
          <input
            type="number"
            disabled="true"
            className="h-[28px] ml-2 w-[60px] rounded-[5px]"
            value={props.cantidad}
          />
        </article>
        <article className="w-1/5">
          <h2 className="font-ralewayFont text-[20px] text-white">
            Talla: <strong>{props.talla}</strong>
          </h2>
        </article>
        <article className="w-1/5">
          <h2 className="font-ralewayFont text-[20px] text-white">
            Subtotal: <strong>$ {props.subtotal} mx</strong>
          </h2>
        </article>
        <article className="w-1/5">
          <button
            className="font-ralewayFont text-[20px] text-white rounded-[5px] bg-red-500 hover:bg-red-600 flex justify-center items-center w-[110px] ml-[50px]"
            onClick={eliminarItem}
          >
            Eliminar
          </button>
          {mostrarModal &&
            (eliminado ? (
              <Modal
                mensaje="Se elimanado producto del carrito"
                color="green-600"
                cerrarModal={cerrarModal}
              />
            ) : (
              <Modal
                mensaje="No se pudo eliminar el producto"
                color="green-600"
                cerrarModal={cerrarModal}
              />
            ))}
        </article>
      </section>
    </>
  );
}

export default ItemCarrito;
