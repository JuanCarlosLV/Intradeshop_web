import { supabase } from "../supabase/connection";
const añadirCompra = "agregarcompra";
const añadirDetalleCompra = "agregardetallecompra";

export const procesoCompra = async (idcliente, totalcompra, estado) => {
  try {
    const { error, data } = await supabase.rpc(añadirCompra, {
      id_cliente: idcliente,
      total_compra: totalcompra,
      estado: estado,
    });
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addDetalle = async (
  idcompra,
  idproducto,
  nombreproducto,
  cantidad,
  talla,
  subtotal,
  imagen
) => {
  try {
    const { error, data } = await supabase.rpc(añadirDetalleCompra, {
      id_compra: idcompra,
      id_producto: idproducto,
      nombre_producto: nombreproducto,
      cantidad_producto: cantidad,
      talla_producto: talla,
      subtotal_producto: subtotal,
      imagenproducto: imagen,
    });
    if (error) throw error;
  } catch (err) {
    console.log(err);
  }
};
