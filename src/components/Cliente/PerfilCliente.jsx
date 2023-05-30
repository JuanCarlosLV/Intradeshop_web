import { NavLink } from "react-router-dom";
import { supabase } from "../../supabase/connection";
import Header from "../partials/Header";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { useState, useEffect } from "react";
import { obtenerCompras } from "../../services/Cliente";

function PerfilCliente(props) {
  const [session, setSession] = useState(null);
  const [username, setusername] = useState("usuario");
  const [iduser, setIdUser] = useState("");
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setusername(session.user.email);
      setIdUser(session.user.id);
    });
  }, []);

  useEffect(() => {
    if (iduser) {
      async function mostrarCompras() {
        const data = await obtenerCompras(iduser);
        console.log(data);
        setCompras(data);
      }
      mostrarCompras();
    }
  }, [iduser]);

  return (
    <>
      <Header />
      <main>
        <section className="flex flex-row  mt-5 ">
          <NavLink to="/">
            <AiFillHome color="004643" className="text-[40px] ml-10 mt-10" />
          </NavLink>

          <div className="bg-[#004643] rounded-[5px] flex flex-row items-center justify-between h-[120px] w-[1500px] ml-[35px] mr-[20px]">
            <h1 className="ml-10 font-ralewayFont font-semibold text-2xl text-white">
              MI CUENTA
            </h1>
            <NavLink
              className="font-ralewayFont  text-2xl text-[#D1AC00] mr-10"
              to={`/editar-perfil/${iduser}`}
            >
              Editar
            </NavLink>
          </div>
        </section>

        <section className="flex flex-col">
          <section class="grid divide-y divide-[#D1AC00] w-[1400px] ml-[110px]  mt-8 ">
            <article class="py-5">
              <details class="group">
                <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer list-none">
                  <span className="text-[23px] "> Mis Pedidos</span>
                  <span class="transition group-open:rotate-180">
                    <IoIosArrowDropdownCircle
                      color="D1AC00"
                      className="text-[35px]"
                    />
                  </span>
                </summary>
                <div>
                  <h1>USERNAME</h1>
                </div>
              </details>
            </article>

            <article class="py-5">
              <details class="group">
                <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer list-none">
                  <span className="text-[23px] "> Mis Compras</span>
                  <span class="transition group-open:rotate-180">
                    <IoIosArrowDropdownCircle
                      color="D1AC00"
                      className="text-[35px]"
                    />
                  </span>
                </summary>
                <section className="flex flex-col bg-[#004643] rounder-[5px]">
                  <article className=" font-ralewayFont  text-white text-[18px]">
                    
                  </article>
                </section>
              </details>
            </article>
          </section>
        </section>
      </main>
    </>
  );
}

export default PerfilCliente;
