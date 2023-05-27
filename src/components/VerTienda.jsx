import { AiFillHome } from "react-icons/ai";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { getInformacionTienda } from "../services/Tiendas";
import Header from "./partials/Header";
import { useEffect, useState } from "react";

function VerTienda() {
  const { nombreTienda } = useParams();
  const navigate = useNavigate();
  const [negocio, setNegocio] = useState("");

  const regresar = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function verInformacionTienda() {
      const data = await getInformacionTienda(nombreTienda);
      console.log(data);
      setNegocio(data);
    }
    verInformacionTienda();
  }, [nombreTienda]);

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="flex flex-row mt-[20px] ">
          <BsArrowLeftCircleFill
            className="text-4xl ml-10 mt-[25px]"
            color="D1AC00"
            onClick={regresar}
          />

          <div className="bg-[#004643] items-center flex justify-start w-[1300px] h-[170px] rounded-[5px] mr-[60px] ml-[50px]">
            <img
              src={negocio.logo || ""}
              alt={negocio.nomNegocio}
              title={negocio.nomNegocio}
              className="ml-[40px] h-[140px] w-[220px] object-cover object-center mt-2 mb-2 rounded-sm"
            />
            <h2 className="text-white text-[50px] ml-5 font-ralewayFont font-semibold">
              {negocio.nomNegocio}
            </h2>
          </div>

          <NavLink to="/">
            <AiFillHome
              className="text-[40px] mt-[22px] ml-[40px]"
              color="004643"
            />
          </NavLink>
        </section>

        <section className="flex flex-col">
          <section class="grid divide-y divide-[#D1AC00] w-[1500px] ml-[130px] mt-8 ">
            <article class="py-5">
              <details class="group">
                <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer ">
                  <span className="text-[25px]"> Datos de la tienda</span>
                  <span class="transition group-open:rotate-180">
                    <IoIosArrowDropdownCircle color="D1AC00" className="text-[35px]"/>
                  </span>
                </summary>
                <section className="grid grid-flow-col mt-4 bg-black rounded-[5px]">
                  <article className="font-ralewayFont font-semibold text-white">
                    <label className="text-[20px]">Nombre del Negociante</label>
                    <label className="text-[20px] font-normal"></label>
                  </article>
                </section>
              </details>
            </article>

            <article class="py-5 ">
              <details class="group ">
                <summary class="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer  ">
                  <span className="text-[25px]"> Publicaciones</span>
                  <span class="transition group-open:rotate-180">
                    <IoIosArrowDropdownCircle color="D1AC00" className="text-[35px]"/>
                  </span>
                </summary>
                <div>
                  <h1>USERNAME</h1>
                </div>
              </details>
            </article>
          </section>
        </section>

        <section></section>
      </main>
    </>
  );
}

export default VerTienda;
