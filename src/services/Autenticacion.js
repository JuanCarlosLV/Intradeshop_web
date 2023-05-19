import { supabase } from "../supabase/connection";
import { v4 as uuidv4 } from "uuid";

const agregartienda = "agregarnegocio"
let idNegocio;

export const iniciarSesion = async (correo, contraseña) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contraseña,
    });
    if (error) {
      alert("La cuenta no existe");
    } else {
      return data.user.id;
    }
  } catch (error) {
    console.log(error);
  }
};

export const registroCliente = async (correo, contraseña, usuario) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contraseña,
    });

    const { error: profileError } = await supabase.from("Cliente").insert([
      {
        id: data.user.id,
        nombreUsuario: usuario,
        contraseña: contraseña,
        correoElectronico: correo,
      },
    ]);

    const { error: userError } = await supabase.from("Users").insert([
      {
        id: data.user.id,
        role: "cliente",
      },
    ]);

    if (profileError || error) throw profileError || error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

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

    const dato = await supabase.rpc(agregartienda, {
      id_negociante: data.user.id,
      nombre_negocio: nombreNegocio,
      telefono: telefono,
      direccion_negocio: direccion,
      correo: correoNegocio,
      descripcion: descripcion,
    });

    idNegocio = dato;
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
    guardarUrlLogo(url, idNegocio);
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

export const getTipoCuenta = async (dato) => {
  const { data, error } = await supabase
    .from("Users")
    .select("role")
    .eq("id", dato)
    .single();
  if (error) console.log(error);
  return data.role;
};

export const cerrarSesion = async () => {
  await supabase.auth.signOut();
};
