import { supabase } from "../supabase/connection";

const obtenerTiendas = "gettiendas";
const getNegocioEspecifico = "buscarnegocioespecifico";
const obtenerDatosTiendas = "obtenerdatosnegocio";
const obtenerDatosNegociante = "obtenerdatosnegociante";
const obtenerProductosNegocio = "obtenerproductotienda";

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
    console.log(data)
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getInformacionTienda = async (nombrenegocio) => {
  try {
    const { data, error } = await supabase
      .rpc(obtenerDatosTiendas, {
        nombrenegocio: nombrenegocio,
      })
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getInformacionNegociante = async (idnegociante) => {
  try {
    const { data, error } = await supabase
      .rpc(obtenerDatosNegociante, {
        idnegociante: idnegociante,
      })
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getProductosNegocio = async (idnegocio) => {
  try {
    const {data,error} = await supabase.rpc(obtenerProductosNegocio, {
      idnegocio: idnegocio,
    });
    if(error) throw error
    return data;
  } catch (err) {
    console.log(err);
  }
};
