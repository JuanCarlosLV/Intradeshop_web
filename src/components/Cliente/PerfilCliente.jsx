import { NavLink } from "react-router-dom";
import { supabase } from "../../supabase/connection";
import Header from "../partials/Header";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";

function PerfilCliente() {
  return (
    <>
      <Header />
      <main>
        <section className="flex flex-row  mt-5 ">
          <NavLink to="/">
            <AiFillHome color="004643" className="text-[40px] ml-10 mt-10" />
          </NavLink>

          <div className="bg-[#004643] rounded-[5px] flex flex-row items-center justify-between h-[120px] w-[1500px] ml-[35px]">
            <h1 className="ml-10 font-ralewayFont font-semibold text-2xl text-white">
              MI CUENTA
            </h1>
            <NavLink className="font-ralewayFont  text-2xl text-[#D1AC00] mr-10"
            to="editar-perfil">
              Editar
            </NavLink>
          </div>
        </section>

        <section className="flex flex-col">
          <div class="grid divide-y divide-[#D1AC00] w-[1500px] ml-[110px] mt-8 ">
            
            <div class="py-5">
              <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span> Mis Pedidos</span>
                  <span class="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div>
                  <h1>USERNAME</h1>
                </div>
              </details>
            </div>

            <div class="py-5">
              <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span> Mis Compras</span>
                  <span class="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shape-rendering="geometricPrecision"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div>
                  <h1>USERNAME</h1>
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PerfilCliente;
