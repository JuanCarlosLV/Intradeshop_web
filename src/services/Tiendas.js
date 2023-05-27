import { supabase } from "../supabase/connection";

const obtenerTiendas = "gettiendas";
const getNegocioEspecifico = "buscarnegocioespecifico";
const obtenerDatosTiendas = "obtenerdatosnegocio";

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

export const getInformacionTienda = async (nombretienda) => {
  try {
    const { data, error } = await supabase.rpc(obtenerDatosTiendas, {
      nombrenegocio: nombretienda,
    }).single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};
