import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {supabase} from '../../supabase/connection'
import {datosCuenta} from '../../services/Administrador'

function CardProfile() {
  const [session, setSession] = useState(null);
  const [username, setusername] = useState("usuario");
  const [iduser, setIdUser] = useState("");

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setIdUser(session.user.id);
    });
  }, []);

  useEffect(()=>{
    async function obtenerDatos(){
      const data = await datosCuenta(iduser);
      setusername(data.nombreUsuario);
    }
    obtenerDatos()
  },[iduser])

  return (
    <>
      <main className="mt-5 ml-[50px] mr-[50px] bg-[#004643] rounded-lg h-28 flex flex-row justify-between">
        <section className="ml-[40px] mt-8">
          <h1 className="font-ralewayFont  text-4xl text-white">{username}</h1>
        </section>
        <section className=" mt-10 mr-20 ml-auto ">
          <NavLink
            to={`/editar-perfiladministrador/${iduser}`}
            className="text-[#D1AC00] font-ralewayFont text-2xl"
          >
            Editar
          </NavLink>
        </section>
      </main>
    </>
  );
}

export default CardProfile;
