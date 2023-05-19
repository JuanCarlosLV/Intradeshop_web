import { supabase } from "../supabase/connection";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";


const editBussiness = "edit_bussiness";
const getBussiness = "get_bussiness";
const getDealer = "get_iddealer";
const deleteBussiness = "delete_bussiness";
//credenciales para envio de correo
const serviceID = "service_brr8ejb";
const templateID = "template_08pt47p";
const apiKey = "wAmi1MLFEfz21fzdN";



/*export const subirLogo = async (logo) => {
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
    const idNegocio = getIdNegocio()
    guardarUrlLogo(url,idNegocio)
  }
};

export const guardarUrlLogo = async (url, id_negocio) => {
  try {
    const { error } = await supabase
      .from("Negocio")
      .update({ logo: url })
      .eq("idNegocio", id_negocio);
    if (error) throw error;
  } catch (err){
    console.error(err);
  }
}; */

export const getInfoNegocio = async () => {
  try {
    const session = await supabase.auth.getSession();
    console.log("session active", session.data.session.user.id);
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
  idNegociante,
  nombre,
  correo,
  direccion,
  descripcion,
  telefono,
  logo
) => {
  try {
    const { error } = await supabase.rpc(editBussiness, {
      id_dealer: idNegociante,
      nom_negocio: nombre,
      correo_electronico: correo,
      direccion_negocio: direccion,
      descripcion_negocio: descripcion,
      tel_negocio: telefono,
      logo_negocio: logo,
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
};
