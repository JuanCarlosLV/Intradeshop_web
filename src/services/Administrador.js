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
  correo,
  contraseña
) => {
  try {
    const { data, error } = await supabase.rpc(editarcuenta, {
      idadmin: idadministrador,
      nuevousuario: nombreusuario,
      nuevocorreo: correo,
      nuevacontraseña: contraseña,
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};
