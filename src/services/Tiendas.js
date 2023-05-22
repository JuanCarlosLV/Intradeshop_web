import { supabase } from "../supabase/connection";

const obtenerTiendas = "gettiendas";
const getNegocioEspecifico = "buscarnegocioespecifico";

export const getTiendas = async () => {
  try {
    const { data, error } = await supabase.rpc(obtenerTiendas);
    if (error) console.log(error);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const buscarTiendas = async (nombrenegocio) => {
  try {
    const { data, error } = await supabase.rpc(getNegocioEspecifico, {
      nombre_negocio: nombrenegocio,
    });
    if (error) console.log(error);
    return data;
  } catch (err) {
    console.log(err);
  }
};
