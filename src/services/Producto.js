import { supabase } from "../supabase/connection";
import { v4 as uuidv4 } from "uuid";

const addProduct = "add_product";
const getProducts = "get_products";
const getProduct = "get_product";
const deleteProduct = "delete_product";
const editProduct = "edit_product";
const filterProduct = "filter_product";
const getProductsCategoria = "getproducts_category";

const añadirCarrito = "insertar_carrito";

let idProducImg;

export const getProductsCategory = async (categoria) => {
  try {
    const { error, data } = await supabase.rpc(getProductsCategoria, {
      nombre_categoria: categoria,
    });

    if (error) console.log(error);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const insertarACarrito = async (id, nombre, cantidad, subtotal) => {
  try {
    const { error, data } = await supabase.rpc(insertarACarrito, {
      idProducto: id,
      nombreProducto: nombre,
      cantidad: cantidad,
      subtotal: subtotal,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getListProducto = async (nombre) => {
  try {
    //tomar el idNegocio perteneciente a sesion negociante activa
    const session = await supabase.auth.getSession();
    console.log("sesion activa",session.data.session.user.id)

    const { error, data } = await supabase.rpc(getProducts, {
      nom_product: nombre,
      id_dealer: session.data.session.user.id
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const agregarProducto = async (
  nombre,
  precio,
  cantidad,
  categoria,
  descripcion,
  color,
  talla
) => {
  try {
    const session = await supabase.auth.getSession();
    const { error, data } = await supabase.rpc(addProduct, {
      nom_product: nombre,
      precio_product: precio,
      cantidad_product: cantidad,
      categoria_product: categoria,
      descripcion_product: descripcion,
      color_product: color,
      talla_product: talla,
      id_dealer: session.data.session.user.id
    });

    if (error) throw error;
    idProducImg = data;
  } catch (error) {
    console.error(error);
  }
};

export const eliminarProducto = async (id) => {
  try {
    const { error } = await supabase.rpc(deleteProduct, { id_product: id });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const getProducto = async (id) => {
  try {
    const { error, data } = await supabase
      .rpc(getProduct, { id_product: id })
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editarProducto = async (
  id,
  nombre,
  precio,
  imagen,
  cantidad,
  categoria,
  descripcion
) => {
  try {
    const { error } = await supabase.rpc(editProduct, {
      id_product: id,
      nom_product: nombre,
      precio_product: precio,
      imagen_product: imagen,
      cantidad_product: cantidad,
      categoria_product: categoria,
      descripcion_product: descripcion,
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const filtrarProducto = async (precio, color, talla) => {
  try {
    const { error, data } = await connection.rpc(filterProduct, {
      criterion_prec: precio,
      criterion_color: color,
      criterion_talla: talla,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const subirImagen = async (imagen) => {
  const imagenName = `${uuidv4()}-${imagen.name}`;
  const { error } = await supabase.storage
    .from("Products")
    .upload(imagenName, imagen);

  if (error) {
    console.log("Error al subir la imagen", error.message);
  } else {
    const { data } = await supabase.storage
      .from("Products")
      .getPublicUrl(imagenName);
    const imgUrlUpdate = data.publicUrl;
    guardarUrlProducto(imgUrlUpdate, idProducImg);
  }
};

const guardarUrlProducto = async (imgUrl, idProd) => {
  try {
    const { error } = await supabase
      .from("Producto")
      .update({ imagen: imgUrl })
      .eq("idProducto", idProd);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};
//ya obtiene el id del negocio correspondiente a la sesion activa del negociante
export const pruebaAddProducto = async () => {
  const info = await supabase.auth.getSession();
  console.log("Sesion activa", info.data.session.user.id);
  const idUser = info.data.session.user.id;
  const { data, error } = await supabase.rpc("get_prueba", {
    id_dealer: idUser,
  });
  if (error) console.log(error);
  let idBuss = data[0];
  console.log(idBuss);
};
