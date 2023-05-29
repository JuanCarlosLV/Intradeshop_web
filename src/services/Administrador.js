import { supabase } from "../supabase/connection";
const obtenerDatos = "obtenerdatosadministrador";
const editarcuenta = "editardatosadministrador";

export const datosCuenta = async (idadministrador) => {
  try {
    const { data, error } = await supabase
      .rpc(obtenerDatos, {
        idadmin: idadministrador,
      })
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const editarCuenta = async (
  idadministrador,
  nombreusuario,
  contraseña
) => {
  try {
    const { data, error } = await supabase.rpc(editarcuenta, {
      idadmin: idadministrador,
      nuevousuario: nombreusuario,
      nuevacontraseña: contraseña,
    });
    const {data: dataUpdate, error: errorUpdate} = await supabase.auth.updateUser({password: contraseña})
    
    if (error || errorUpdate) throw error || errorUpdate;
    return data;
  } catch (err) {
    console.log(err);
  }
};
