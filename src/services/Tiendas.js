import { supabase } from "../supabase/connection";

const obtenerTiendas = "gettiendas"

export const getTiendas = async () => {
  try {
    const {data,error} = await supabase.rpc(obtenerTiendas);
    if(error) console.log(error)
    return data;
  } catch (err) {
    console.log(err);
  }
};
