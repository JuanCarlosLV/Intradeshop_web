import React from "react";

function ItemCarrito(props) {
  return (
    <>
      <section className="flex flex-row  items-center rounded-[5px] mr-[30px] ml-[30px] h-auto mb-5  bg-[#D1AC00]">
        <article className="w-[200px] h-auto justify-center items-center">
          <img
            src={props.imagen}
            alt="imagen producto"
            className=" w-[130px] h-[140px]"
          />
        </article>
        <article className="w-1/5">
          <h2 className="font-ralewayFont text-[20px] text-white">
            {props.nombreProducto}
          </h2>
        </article>
        <article className="w-1/5 flex flex-row items-center">
          <label className="font-ralewayFont text-[20px] text-white">
            Cantidad
          </label>
          <input
            type="number"
            className="h-[28px] ml-2 w-[60px] rounded-[5px]"
            value={props.cantidad}
          />
        </article>
        <article className="w-1/5">
          <h2 className="font-ralewayFont text-[20px] text-white">
            {props.talla}
          </h2>
        </article>
        <article className="w-1/5">
          <h2 className="font-ralewayFont text-[20px] text-white">
            ${props.subtotal}.00 mx
          </h2>
        </article>
        <article className="w-1/5">
          <button className="font-ralewayFont text-[20px] text-white rounded-[5px] bg-red-500 flex justify-center items-center w-[110px]"
          onClick={props.eliminar}>
            Eliminar
          </button>
        </article>
      </section>
    </>
  );
}

export default ItemCarrito;
