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
            <AiFillHome color="004643" className="text-[40px] ml-10 mt-2" />
          </NavLink>

          <div className="bg-[#004643] rounded-[5px] flex flex-row items-center justify-between h-[70px] w-[1330px] ml-[35px]">
            <h1 className="ml-10 font-ralewayFont font-semibold text-2xl text-white">
              MI CUENTA
            </h1>
            <NavLink className="font-ralewayFont  text-2xl text-[#D1AC00] mr-10">
              Editar
            </NavLink>
          </div>
        </section>
        <section className="flex flex-col">
          <div class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
            <div class="py-5">
              <details class="group">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none bg-black text-white">
                  <span> Datos de la cuenta</span>
                  <span class="transition group-open:rotate-180">
                    <IoIosArrowDown />
                  </span>
                </summary>
                <div>
                  <h1></h1>
                </div>
              </details>
            </div>
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
