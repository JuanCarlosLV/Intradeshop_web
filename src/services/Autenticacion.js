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

export const getTipoCuenta = async (dato) => {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("role")
      .eq("id", dato)
      .single();
    if (error) console.log(error);
    return data.role;
  } catch (err) {
    console.log(err);
  }
};

export const cerrarSesion = async () => {
  await supabase.auth.signOut();
};
