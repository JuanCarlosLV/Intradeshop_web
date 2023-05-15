import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { cerrarSesion } from "../../services/Autenticacion";
import { supabase } from "../../supabase/connection";

function HeaderCliente(props) {

  const navigate = useNavigate()
  const [isOpen, setisOpen] = useState(false);

  const handleOpenDropdown = () => {
    setisOpen((prev) => !prev);
  };

  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      setSession(session);
    });
  }, []);

  return (
    <>
      <div className="bg-[#124846] h-28  flex flex-row items-center justify-between">
        <NavLink to="/" className="flex ">
          <img
            src="src\images\logoIntradeshop.png"
            className="ml-10 h-20 w-30"
            alt="logo de intradeshop"
          />
          <h1 className="ml-10 text-4xl mt-5 font-ralewayFont text-[#D1AC00] text-center">
            INTRADESHOP
          </h1>
        </NavLink>

        <div className="space-x-10 ml-auto mr-20">
          <NavLink
            className="text-2xl text-[#D1AC00] font-ralewayFont "
            to="/tiendas-asociadas"
          >
            Tiendas Asociadas
          </NavLink>
          <NavLink className="text-2xl text-[#D1AC00] font-ralewayFont" to="#">
            Carrito
          </NavLink>
        </div>

        <div className="flex md:order-2 mr-10 ">
          <h1 className="font-ralewayFont text-2xl mt-2 mb-1 text-[#D1AC00]">
            {props.nombreUsuario}
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
                  <NavLink to="/miperfil">Mi cuenta</NavLink>
                  <br></br>
                  <NavLink onClick={cerrarSesion} to="login">
                    Cerrar Sesión
                  </NavLink>
                </div>
              </>
            )}

            {session == null ?? navigate("/login")}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderCliente;
