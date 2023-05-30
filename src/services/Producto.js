import { supabase } from "../supabase/connection";
import { v4 as uuidv4 } from "uuid";

const nameBucket = "Products";
const tableProduct = "Producto";
const tableImgProduct = "ImagenProducto";
const addProduct = "add_product";
const getListProducts = "get_list_products";
const getProduct = "get_product_bussiness";
const deleteProduct = "delete_product";
const editProduct = "edit_product";
const filterProduct = "filtrar_producto";
const getProductsCategoria = "getproducts_category";
const getlastproducts = "getlastproducts";
const buscarProductoCategoria = "getproductopercategoria";
const buscarProductosGeneral = "buscarproductos";
const obtenerImagenesProducto = "getimagesproduct";
const getDetalleProducto = "getdetalleproducto";
const getDProducto = "getproducto";
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

export const obtenerProducto = async (id) => {
  try {
    const { data, error } = await supabase
      .rpc(getDProducto, {
        idproducto: id,
      })
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const obtenerDetalleProducto = async (id) => {
  try {
    const { data, error } = await supabase.rpc(getDetalleProducto, {
      idproducto: id,
    });
    if (error) console.log(error);
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
      .rpc(getProduct, {
        id_product: id,
        id_dealer: session.data.session.user.id,
      })
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
  cantidad,
  categoria,
  descripcion
) => {
  try {
    const { error } = await supabase.rpc(editProduct, {
      id_product: id,
      nom_product: nombre,
      precio_product: precio,
      cantidad_product: cantidad,
      categoria_product: categoria,
      descripcion_product: descripcion,
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const filtrarProducto = async (categoria, precio, color) => {
  try {
    const { error, data } = await supabase.rpc(filterProduct, {
      nom_categoria: categoria,
      criterion_prec: precio,
      criterion_color: color,
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
    const imagenName = `${uuidv4()}-${imagen.name}`;
    const { error } = await supabase.storage
      .from(nameBucket)
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
      .from(tableProduct)
      .update({ imagen: imgUrls[0] })
      .eq("idProducto", idProd);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
  if (imgUrls.length > 1) {
    const urlsToInsert = imgUrls
      .slice(1)
      .map((url) => ({ imagenUrl: url, idProducto: idProd }));

    try {
      const { error } = await supabase.from(tableImgProduct).insert(urlsToInsert)
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }
};

const eliminarImgBucket = async (nameImagen) => {
  try {
    const { error } = await supabase.storage.from(nameBucket).remove([nameImagen]);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}
export const eliminarImgProducto = async (id) => {
  try {
    const { data, error } = await supabase.rpc('get_urls', { id_product: id })
    if (error) throw error;
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i])) {
        for (let j = 0; j < data[i].length; j++) {
          const url = data[i][j];
          let nameImg = url.substring(url.lastIndexOf('/') + 1);
          console.log(nameImg);
          await eliminarImgBucket(nameImg);
        }
      } else {
        const url = data[i];
        let nameImg = url.substring(url.lastIndexOf('/') + 1);
        console.log(nameImg);
        await eliminarImgBucket(nameImg);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export const subirImgEditar = async (imagenes, idProd) => {
  const imgUrls = [];
  for (const imagen of imagenes) {
    const imagenName = `${uuidv4()}-${imagen.name}`
    const { error } = await supabase.storage
      .from(nameBucket)
      .upload(imagenName, imagen);

    if (error) {
      console.log("Error al subir la imagen", error.message);
    } else {
      const { data } = await supabase.storage
        .from(nameBucket)
        .getPublicUrl(imagenName);
      const imgUrlUpdate = data.publicUrl;
      imgUrls.push(imgUrlUpdate);
      editarImgProducto(imgUrls, idProd);
    }
  }
};

const editarImgProducto = async (imgUrls, idProd) => {
  //Actualiza la principal
  try {
    const { error: errActualizarPrincipal } = await supabase.from(tableProduct).update({ imagen: imgUrls[0] }).eq('idProducto', idProd);
    if (errActualizarPrincipal) throw errActualizarPrincipal;
  } catch (errActualizarPrincipal) {
    console.error(errActualizarPrincipal);
  }
  try {
    const { data: imgExistentes, error: errorImgExistentes } = await supabase.from(tableImgProduct).select('id').eq('idProducto', idProd);
    if (errorImgExistentes) throw errorImgExistentes;

    const imgExistentesId = imgExistentes.map((imagen) => imagen.id);

    //Actualizar las urls de las imagenes existentes
    for (let i = 0; i < imgExistentesId.length && i < imgUrls.length; i++) {
      try {
        const { error: errorActualizar } = await supabase.from(tableImgProduct).upsert(
          { id: imgExistentesId[i], imagenUrl: imgUrls[i], idProducto: idProd },
          { onConflict: ['id'] }
        );
        if (errorActualizar) throw errorActualizar;
      } catch (errorActualizar) {
        console.error(errorActualizar);
      }
    }
    //insertar si ingresa mas imagenes de las que tenia
    if (imgUrls.length > imgExistentesId.length) {
      const newImages = imgUrls.slice(imgExistentesId.length).map((url) => ({ imagenUrl: url, idProducto: idProd }));
      try {
        const { error: insertError } = await supabase.from(tableImgProduct).insert(newImages);
        if (insertError) throw insertError;
      } catch (insertError) {
        console.error(insertError);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

