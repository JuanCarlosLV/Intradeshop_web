import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import { cerrarSesion } from "../../services/Autenticacion";
import { supabase } from "../../supabase/connection";

function HeaderAdministrador() {
  const [session, setSession] = useState(null);
  const [username, setusername] = useState("usuario");

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setusername(session.user.email);
    });
  }, []);

  const [isOpen, setisOpen] = useState(false);

  const handleOpenDropdown = () => {
    setisOpen((prev) => !prev);
  };

  return (
    <>
      <div className="bg-[#124846] h-28  flex flex-row items-center justify-between">
        <NavLink to="/home-negociante" className="flex ">
          <img
            src="/src/images/logoIntradeshop.png"
            className="ml-10 h-20 w-30"
            alt="logo de intradeshop"
          />
          <h1 className="ml-10 text-4xl mt-5 font-ralewayFont text-[#D1AC00] text-center">
            INTRADESHOP
          </h1>
        </NavLink>

        <div className="flex md:order-2 mr-10 ">
          <h1 className="font-ralewayFont text-2xl mt-2 mb-1 text-[#D1AC00]">
          {session != null ? username : "usuario"}
          </h1>
          <div className=" flex flex-col items-center w-[50px] h-[50px] rounded">
            <button
              onClick={handleOpenDropdown}
              className="mt-3 ml-4 w-full flex- items-center justify-between rounded-lg tracking-wider text-2xl text-white"
            >
              {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>

            {isOpen && (
              <>
                <div className="mt-2 mr-[60px] w-40  text-center font-ralewayFont text-2xl text-white rounded-md bg-[#D1AC00]  ">
                  <NavLink to="/perfil-administrador">Mi cuenta</NavLink>
                  <br></br>
                  <NavLink to="/login" onClick={cerrarSesion}>
                    Cerrar Sesión
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderAdministrador;
