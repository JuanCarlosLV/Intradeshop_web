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

export const modificarDatos = async (id, usuario, contraseña) => {
  try {
    const { data, error } = await supabase.rpc(updatedatos, {
      idcliente: id,
      nuevo_usuario: usuario,
      nuevacontraseña: contraseña,
    });

    const {data: dataUpdate, error: errorUpdate} = await supabase.auth.updateUser({password: contraseña})
    
    console.log(dataUpdate)

    if(error || errorUpdate ) throw error || errorUpdate ;
    return data && dataUpdate 
  } catch (err) {
    console.log(err);
  }
};
