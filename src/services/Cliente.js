import { supabase } from "../supabase/connection";

const getdatos = "obtenerdatoscliente";
const updatedatos = "actualizardatoscliente";

export const mostrarDatos = async (id) => {
  try {
    const { data, error } = await supabase
      .rpc(getdatos, {
        idcliente: id,
      })
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const modificarDatos = async (id, usuario, correo, contraseña) => {
  try {
    const { data, error } = await supabase.rpc(updatedatos, {
      idcliente: id,
      nuevo_usuario: usuario,
      nuevo_correo: correo,
      nueva_contraseña: contraseña,
    });

    if(error) throw error;
    return data
  } catch (err) {
    console.log(err);
  }
};
