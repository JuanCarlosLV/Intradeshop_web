import { AiFillHome } from "react-icons/ai";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import {
  getInformacionTienda,
  getInformacionNegociante,
} from "../../services/Tiendas";
import Header from "../Administrador/HeaderAdministrador";
import CardProducto from "../../components/partials/CardProduct";
import { useEffect, useState } from "react";

function VerTienda() {
  const { nombreTienda } = useParams();
  const navigate = useNavigate();
  const [negocio, setNegocio] = useState("");
  const [negociante, setNegociante] = useState("");



  const regresar = () => {
    navigate(-1);
  };


  useEffect(() => {
    async function verInformacionTiendaYNegociante() {
      const dataTienda = await getInformacionTienda(nombreTienda);
      setNegocio(dataTienda);
      const idNegociante = dataTienda.idDealer;
      const idNegocio = dataTienda.idNegocio;
      if (idNegociante && idNegocio) {
        const dataNegociante = await getInformacionNegociante(idNegociante);
        setNegociante(dataNegociante);
      }
    }
    verInformacionTiendaYNegociante();
  }, [nombreTienda]);

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="flex flex-row mt-[20px] ">
          <NavLink>
            <BsArrowLeftCircleFill
              className="text-4xl ml-10 mt-[25px]"
              color="D1AC00"
              onClick={regresar}
            />
          </NavLink>

          <article className="bg-[#004643] items-center flex justify-start w-[1500px] h-[170px] rounded-[5px] mr-[60px] ml-[50px]">
            <img
              src={negocio.logo || ""}
              alt={negocio.nomNegocio}
              title={negocio.nomNegocio}
              className="ml-[40px] h-[140px] w-[220px] object-cover object-center mt-2 mb-2 rounded-sm"
            />
            <h2 className="text-white text-[50px] ml-5 font-ralewayFont font-semibold">
              {negocio.nomNegocio}
            </h2>
          </article>

          <NavLink to="/">
            <AiFillHome
              className="text-[40px] mt-[22px] mr-[50px]"
              color="004643"
            />
          </NavLink>
        </section>

        <section className="flex flex-col  ">
          <section className="grid divide-y w-[1450px] ml-[30px] mt-8  ">
            <article className="py-5 ">
              <details className="group border-b-2 border-[#D1AC00]">
                <summary className="flex justify-between items-center font-semibold font-ralewayFont cursor-pointer  ">
                  <span className="text-[25px]"> Datos de la tienda</span>
                  <span className="transition group-open:rotate-180">
                    <IoIosArrowDropdownCircle
                      color="D1AC00"
                      className="text-[35px]"
                    />
                  </span>
                </summary>
                <section className="grid grid-flow-col mt-4 bg-[#FAF4D3] rounded-[5px]">
                  <article className="font-ralewayFont font-semibold text-black flex flex-col justify-center ml-[15px] mt-4 mb-4">
                    <div className="flex flex-col ">
                      <label className="text-[20px]">
                        Nombre del Negociante
                      </label>
                      <label className="text-[20px] font-normal">
                        {negociante.nombreNegociante}
                      </label>
                    </div>
                    <div className="mt-3 flex flex-col">
                      <label className="text-[20px]">Correo Electrónico</label>
                      <label className="text-[20px] font-normal">
                        {negocio.correoElectronico}
                      </label>
                    </div>
                    
                  </article>

                  <article className="font-ralewayFont font-semibold text-black flex flex-col justify-center ml-[15px] mt-4 mb-4">
                    <div className="flex flex-col ">
                      <label className="text-[20px]">Número Telefonico</label>
                      <label className="text-[20px] font-normal">
                        {negocio.telContacto}
                      </label>
                    </div>
                    <div className="mt-3 flex flex-col">
                      <label className="text-[20px]">Direccion</label>
                      <label className="text-[20px] font-normal">
                        {negocio.direccion}
                      </label>
                    </div>
                  </article>

                  <article className="font-ralewayFont font-semibold text-black flex flex-col justify-center ml-[15px] mt-4 mb-4">
                    <div className="flex flex-col ">
                      <label className="text-[20px]">Descripción</label>
                      <label className="text-[20px] font-normal">
                        {negocio.descripcion}
                      </label>
                    </div>
                    <div className="mt-3 flex flex-col">
                      <label className="text-[20px]">Calificación</label>
                      <label className="text-[20px] font-normal">
                        {negocio.calificacion}
                      </label>
                    </div>
                  </article>
                </section>
              </details>
            </article>
          </section>

          <article className="py-5 flex flex-col ml-[30px] mr-[20px]">
            <section className="font-ralewayFont font-semibold">
              <span className="text-[25px]"> Comentarios y Valoracion</span>
            </section>

            
          </article>
        </section>

        <section></section>
      </main>
    </>
  );
}

export default VerTienda;
