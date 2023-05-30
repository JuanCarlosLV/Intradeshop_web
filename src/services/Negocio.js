import { supabase } from "../supabase/connection";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";

const agregartienda = "agregarnegocio";
let idnegocio;

const editBussiness = "edit_bussiness";
const getBussiness = "get_bussiness";
const getDealer = "get_iddealer";
const deleteBussiness = "delete_bussiness";
const getListPedidos = "get_list_pedidos";
const getDetailPedido = "get_detail_pedido";
const getPedidosRecientes = "get_pedidos_recientes";
const changeEstadoPedido = "change_status_pedido";
const getVentas = "get_list_ventas";
const getBussinessAdmin = "get_infobussiness_admin";
//credenciales para envio de correo
const serviceID = "service_brr8ejb";
const templateID = "template_08pt47p";
const apiKey = "wAmi1MLFEfz21fzdN";
const bucketLogos = "Tiendas";
export const registroNegociante = async (
  nombreNegocio,
  telefono,
  correoNegocio,
  direccion,
  descripcion,
  nombreNegociante,
  nombreUsuario,
  correo,
  contraseña
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contraseña,
    });

    const { error: profileError } = await supabase.from("Negociante").insert([
      {
        idNegociante: data.user.id,
        nombreUsuario: nombreUsuario,
        nombreNegociante: nombreNegociante,
        correoElectronico: correo,
        contraseña: contraseña,
      },
    ]);

    const { error: tiendaError, data: dato } = await supabase.rpc(agregartienda, {
      id_negociante: data.user.id,
      nombre_negocio: nombreNegocio,
      telefono: telefono,
      direccion_negocio: direccion,
      correo: correoNegocio,
      descripcion: descripcion,
    });
    if (tiendaError) console.log(tiendaError);
    idnegocio = dato;

    const { error: userError } = await supabase.from("Users").insert([
      {
        id: data.user.id,
        role: "negociante",
      },
    ]);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// proceso para subir logotipo al storage
export const subirLogo = async (logo) => {
  const nombreLogo = `${uuidv4()}-${logo.name}`;
  const { error } = await supabase.storage
    .from("Tiendas")
    .upload(nombreLogo, logo);
  if (error) {
    console.log("Error al subir la imagen: " + error.message);
  } else {
    const { data } = await supabase.storage
      .from("Tiendas")
      .getPublicUrl(nombreLogo);
    const url = data.publicUrl;
    console.log(url)
    guardarUrlLogo(url, idnegocio);
  }
};

export const guardarUrlLogo = async (url, id_negocio) => {
  try {
    const { error } = await supabase
      .from("Negocio")
      .update({ logo: url })
      .eq("idNegocio", id_negocio);
    if (error) throw error;
  } catch (err) {
    console.error(err);
  }
};

export const getInfoNegocio = async () => {
  try {
    const session = await supabase.auth.getSession();
    const { error, data } = await supabase
      .rpc(getBussiness, { id_dealer: session.data.session.user.id })
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editarInfoNegocio = async (
  nombre,
  correo,
  direccion,
  descripcion,
  telefono,
) => {

  const session = await supabase.auth.getSession();
  console.log(session.data.session.user.id);
  try {
    const { error } = await supabase.rpc(editBussiness, {
      id_dealer: session.data.session.user.id,
      nom_negocio: nombre,
      correo_electronico: correo,
      direccion_negocio: direccion,
      descripcion_negocio: descripcion,
      tel_negocio: telefono,
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const getIdDealer = async (idBussiness) => {
  try {
    const { error, data } = await supabase.rpc(getDealer, {
      id_bussiness: idBussiness,
    });
    if (error) throw error;
    let uuiDealer = data[0];
    return uuiDealer;
  } catch (error) {
    console.error(error);
  }
};

export const darDeBajaNegocio = async (idBussiness) => {
  try {
    const { error } = await supabase.rpc(deleteBussiness, {
      id_bussiness: idBussiness,
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};
//enviar el correo despues de dar de baja
export const enviarCorreo = async (form) => {
  try {
    const result = await emailjs.sendForm(serviceID, templateID, form, apiKey);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export const getAllPedidos = async () => {
  const session = await supabase.auth.getSession();
  console.log("sesion activa", session.data.session.user.id);

  try {
    const { error, data } = await supabase.rpc(getListPedidos,
      { id_dealer: session.data.session.user.id });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
}
export const getDetallePedido = async (idPedido) => {
  try {
    const { error, data } = await supabase.rpc(getDetailPedido, { id_pedido: idPedido })
    if (error) throw error

    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const eliminarImgBucket = async () => {
  try {
    const nameImg = await getUrlLogo();
    console.log(nameImg);
    const { error } = await supabase.storage.from(bucketLogos).remove([nameImg]);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}
const getUrlLogo = async () => {
  const session = await supabase.auth.getSession();
  try {
    const { error, data } = await supabase.rpc('get_url_negocio', { id_dealer: session.data.session.user.id });
    if (error) throw error;
    let nameImg = data.substring(data.lastIndexOf('/') + 1);
    return nameImg;
  } catch (error) {
    console.error(error);
  }
}
export const editarImgLogo = async (logo, idBussiness) => {
  const nombreLogo = `${uuidv4()}-${logo.name}`;
  const { error } = await supabase.storage
    .from("Tiendas")
    .upload(nombreLogo, logo);
  if (error) {
    console.log("Error al subir la imagen: " + error.message);
  } else {
    const { data } = await supabase.storage
      .from("Tiendas")
      .getPublicUrl(nombreLogo);
    const url = data.publicUrl;
    console.log(url)
    guardarUrlLogo(url, idBussiness);
  }
}
export const getListPediRecientes = async () => {
  try {
    const session = await supabase.auth.getSession();
    const { data, error } = await supabase.rpc(getPedidosRecientes, { id_dealer: session.data.session.user.id });
    if (error) throw error
    return data;
  } catch (error) {
    console.error(error);
  }
}
export const cambioEstadoPedido = async (idPedido) => {
  try {
    const { error } = await supabase.rpc(changeEstadoPedido, { id_pedido: idPedido });
    if (error) throw error;
  } catch (error) {
    console.error(error)
  }
}
export const getListVentas = async () => {
  try {
    const session = await supabase.auth.getSession();
    const { error, data } = await supabase.rpc(getVentas, { id_dealer: session.data.session.user.id });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error)
  }
}
export const getInfoBussinessAdmin = async (idBussiness) => {
  try {
    const { data, error } = await supabase.rpc('get_infobussiness_admin', {
      id_bussiness: idBussiness
    });
    if (error) throw error
    return data;
  } catch (error) {
    console.error(error);
  }
}