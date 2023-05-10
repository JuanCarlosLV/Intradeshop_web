import { supabase } from "../supabase/connection";

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
  logotipo,
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

    const { error: profileNegocioError } = await supabase
      .from("Negocio")
      .insert([
        {
          nomNegocio: nombreNegocio,
          telContacto: telefono,
          idNegociante: data.user.id,
          direccion: direccion,
          correoElectronico: correoNegocio,
        },
      ]);

    const { error: userError } = await supabase.from("Users").insert([
      {
        id: data.user.id,
        role: "negociante",
      },
    ]);
    /* queda pendiente para subir logotipo al Storage
    const { data: logoNegocio, errorStorage } = await supabase.storage
      .from("Administrador/")
      .upload(`logoEmpresa-${data.user.id}`, logotipo, {
        cacheControl: "3600",
        upsert: false,
        contentType: logotipo.type,
      });

    await supabase
      .from("Negocio")
      .update({ logo: logoNegocio.publicURL })
      .eq("idNegociante", data.user.id);
      if (error || profileError || profileNegocioError || errorStorage)
      throw error || profileError || profileNegocioError || errorStorage;

  */
    
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTipoCuenta = async (dato) => {
  const { data, error } = await supabase.from("Users").select("role").eq('id',dato).single();
  if(error) console.log(error)
  return data.role
};

export const cerrarSesion = async () => {
  await supabase.auth.signOut();
};

