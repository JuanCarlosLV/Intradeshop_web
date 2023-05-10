import { supabase } from "../supabase/connection";

const addProduct = "add_product";
const getProducts = "get_products";
const getProduct = "get_product";
const deleteProduct = "delete_product";
const editProduct = "edit_product";
const filterProduct = "filter_product";
const getProductsCategoria = "getproducts_category";

const añadirCarrito = "insertar_carrito"




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

export const insertarACarrito = async(id,nombre,cantidad,subtotal)=>{
  try {
    const {error,data} = await supabase.rpc(insertarACarrito,{
      idProducto: id,
      nombreProducto: nombre,
      cantidad: cantidad,
      subtotal: subtotal,
    })
    if(error) throw error
    return data
  } catch (err) {
    console.log(err)
  }
}



//let idProducto;

export const getListProducto = async (nombre) => {
  try {
    const { error, data } = await supabase.rpc(getProducts, {
      nom_product: nombre,
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
  imagen,
  cantidad,
  categoria,
  descripcion,
  color,
  talla
) => {
  try {
    const { error, data } = await supabase.rpc(addProduct, {
      nom_product: nombre,
      precio_product: precio,
      cantidad_product: cantidad,
      categoria_product: categoria,
      descripcion_product: descripcion,
      color_product: color,
      talla_product: talla,
    });
    if (error) throw error;
    idProducto = data;
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
    console.error(error);
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

//no sube la imagen
/*
export const subirImgProducto = async (img) => {
  try {
    const nomImagen = `${uuidv4}-${img.name}`;

    const { data,error } = await supabase.storage
      .from("Productos").upload(nomImagen,img);
    if (error) throw error;
    const imagenUrl = data.path;
    console.log(imagenUrl);
  } catch (error) {
    console.error(error);
  }
};
*/
//Esto si guarda la url de la imagen en la tabla 
/*
const guardarImgProducto = async (imgUrl, idProd) => {
  try {
    const { error } = await supabase
      .from("Producto")
      .update({ imagen: imgUrl })
      .match({ idProducto, idProd });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};
*/