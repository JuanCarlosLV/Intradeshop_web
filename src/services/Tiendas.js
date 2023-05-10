import { supabase } from "../supabase/connection";

export const getTiendas = async () => {
  try {
    const { data, error } = await supabase
      .from("Negocio")
      .select("idNegocio", "nomNegocio", "logo");
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
  }
};
