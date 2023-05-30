import { supabase } from "../supabase/connection";
const añadirCarrito = "insertar_carrito";
const getItems = "getcarrito";
const eliminaproductocarrito = "eliminaritemcarrito";
const obtenerdirecciones = "obtenerdireccionesproducto";

export const insertarACarrito = async (
  idcliente,
  idproducto,
  imagen,
  nombre,
  talla,
  cantidad,
  subtotal
) => {
  try {
    const { error, data } = await supabase.rpc(añadirCarrito, {
      idcliente: idcliente,
      id_producto: idproducto,
      imagen: imagen,
      nombre_producto: nombre,
      talla_producto: talla,
      cantidad_producto: cantidad,
      subtotal_producto: subtotal,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const mostrarArticulos = async (idcliente) => {
  try {
    const { data, error } = await supabase.rpc(getItems, {
      idcliente: idcliente,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const eliminarProducto = async (idproducto, idcliente, talla_p) => {
  try {
    const { data, error } = await supabase.rpc(eliminaproductocarrito, {
      id_producto: idproducto,
      idcliente: idcliente,
      talla: talla_p,
    });
    if (error) throw error;
    console.log(data)
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const vaciarCarrito = async () => {};

export const mostrarDireccionesProducto = async (id_producto) => {
  try {
    const { data, error } = await supabase.rpc(obtenerdirecciones, {
      id_producto: id_producto,
    }).single();
    if (error) throw error;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
