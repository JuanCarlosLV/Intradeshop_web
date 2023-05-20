import { supabase } from "../supabase/connection";
import { v4 as uuidv4 } from "uuid";

const nameBucket = "Products";
const addProduct = "add_product";
const getListProducts = "get_list_products";
const getProduct = "get_product_bussiness";
const deleteProduct = "delete_product";
const editProduct = "edit_product";
const filterProduct = "filter_product";
const getProductsCategoria = "getproducts_category";
const getlastproducts = "getlastproducts";
const añadirCarrito = "insertar_carrito";
const buscarProductoCategoria = "getproductopercategoria";
const buscarProductosGeneral = "buscarproductos";
const obtenerImagenesProducto = "getimagesproduct";
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

export const getUltimosProductos = async () => {
  try {
    const { data, error } = await supabase.rpc(getlastproducts);
    if (error) console.log(error);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const buscarProductosCategoria = async (producto, categoria) => {
  try {
    const { data, error } = await supabase.rpc(buscarProductoCategoria, {
      nombre_producto: producto,
      nombre_categoria: categoria,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const buscarProductos = async (producto) => {
  try {
    const { error, data } = await supabase.rpc(buscarProductosGeneral, {
      nombre_producto: producto,
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
    console.log("sesion activa", session.data.session.user.id);

    const { error, data } = await supabase.rpc(getListProducts, {
      nom_product: nombre,
      id_dealer: session.data.session.user.id,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getImagenesProducto = async (idproducto) => {
  try {
    const { error, data } = await supabase.rpc(obtenerImagenesProducto, {
      idproducto: idproducto,
    });
    if (error) console.log(error);
    return data;
  } catch (err) {
    console.log(err);
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
      id_dealer: session.data.session.user.id,
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
    const session = await supabase.auth.getSession();
    console.log("sesion activa", session.data.session.user.id);

    const { error, data } = await supabase
      .rpc(getProduct, { id_product: id, id_dealer: session.data.session.user.id })
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

export const subirImagen = async (imagenes) => {
  const imgUrls = [];
  for (const imagen of imagenes) {
    const imagenName = `${uuidv4()}-${imagen.name}`
    const { error } = await supabase.storage
      .from("Products")
      .upload(imagenName, imagen);

    if (error) {
      console.log("Error al subir la imagen", error.message);
    } else {
      const { data } = await supabase.storage
        .from(nameBucket)
        .getPublicUrl(imagenName);
      const imgUrlUpdate = data.publicUrl;
      imgUrls.push(imgUrlUpdate);
      guardarUrlProducto(imgUrls, idProducImg);
    }
  }
};

const guardarUrlProducto = async (imgUrls, idProd) => {
  try {
    const { error } = await supabase
      .from("Producto")
      .update({ imagen: imgUrls[0] })
      .eq("idProducto", idProd);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
  if (imgUrls.length > 1) {
    const urlsToInsert = imgUrls.slice(1).map((url) => ({ imagenUrl: url, idProducto: idProd }));

    try {
      const { error } = await supabase.from("ImagenProducto").insert(urlsToInsert)
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }
};

//obtener los url de las imagenes de los productos
/*const getUrlImgProducto = async (id) => {
  try {
    const { data, error } = await supabase.rpc('get_urls', { id_product: id })
    if (error) throw error;
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i])) {
        for (let j = 0; j < data[i].length; j++) {
          const url = data[i][j];
          console.log('URL:', url)
        }
      } else {
        const url = data[i];
        console.log('URL:', url);
      }
    }
  } catch (error) {
    console.error(error);
  }
}*/
const eliminarImgBucket = async (urlImagen) => {
  try {
    const { error } = await supabase.storage.from(nameBucket).remove([urlImagen]);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}
export const getDeleteUrlImg = async (id) => {
  try {
    const { data, error } = await supabase.rpc('get_urls', { id_product: id })
    if (error) throw error;
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i])) {
        for (let j = 0; j < data[i].length; j++) {
          const url = data[i][j];
          await eliminarImgBucket(url);
        }
      } else {
        const url = data[i];
        await eliminarImgBucket(url);
      }
    }
  } catch (error) {
    console.error(error);
  }
}


